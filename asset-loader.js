/* Bounded scenario lookahead. Downloaded bytes live in the browser cache;
 * only a small window of decoded images is retained in this page. */
function stellaAssetURL(source) {
  if (!source) return source;
  const base = new URL('.', document.baseURI);
  const url = new URL(source, base);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname + 'assets/')) return source;
  url.searchParams.set('_stella_v', String(VN_CONFIG.assetCacheVersion || VN_CONFIG.version));
  return url.href;
}

const stellaCacheReady = (async () => {
  try {
    if (!('serviceWorker' in navigator)) return false;
    const registration = await navigator.serviceWorker.register(
      new URL('asset-cache-worker.js', document.baseURI), { updateViaCache: 'none' }
    );
    if (navigator.serviceWorker.controller) return true;
    return await new Promise(resolve => {
      const done = () => { clearTimeout(timer); navigator.serviceWorker.removeEventListener('controllerchange', changed); resolve(!!navigator.serviceWorker.controller); };
      const changed = () => { if (navigator.serviceWorker.controller) done(); };
      const timer = setTimeout(done, 1200);
      navigator.serviceWorker.addEventListener('controllerchange', changed);
      if (registration.active && navigator.serviceWorker.controller) done();
    });
  } catch (_) { return false; } // Embedded portals/private browsing may forbid SWs.
})();

class VNAssetLoader {
  constructor(config, options = {}) {
    this.config = config;
    this.limit = options.concurrency || 2;
    this.timeout = options.timeout || 8000;
    this.foregroundTimeout = options.foregroundTimeout || Math.max(this.timeout, 30000);
    this.createImage = options.createImage || (() => new Image());
    this.url = options.url || stellaAssetURL;
    this.backgrounds = {};
    this.stills = {};
    this.jobs = new Map();
    this.images = new Map();
    this.queue = [];
    this.active = 0;
  }

  image(source, priority = 0) {
    const url = this.url(source);
    const existing = this.jobs.get(url);
    if (existing) { existing.priority = Math.max(existing.priority, priority); return existing.promise; }
    const job = { url, priority, done: false };
    job.promise = new Promise(resolve => { job.resolve = resolve; });
    this.jobs.set(url, job);
    this.queue.push(job);
    this._pump();
    return job.promise;
  }

  _pump() {
    this.queue.sort((a, b) => b.priority - a.priority);
    while (this.active < this.limit && this.queue.length) {
      const job = this.queue.shift();
      const image = this.createImage();
      this.active++;
      let finished = false;
      const finish = ok => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        image.onload = image.onerror = null;
        job.done = true;
        job.ok = ok;
        this.active--;
        if (ok) {
          this.images.set(job.url, image);
          while (this.images.size > 16) this.images.delete(this.images.keys().next().value);
        } else {
          // A temporary network failure must be retryable on the next visit.
          this.jobs.delete(job.url);
        }
        job.resolve(ok);
        this._pump();
      };
      const timer = setTimeout(() => { image.src = ''; finish(false); }, job.priority > 0 ? this.foregroundTimeout : this.timeout);
      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.src = job.url;
    }
  }

  async resolve(kind, key, priority = 0) {
    const map = kind === 'bg' ? this.backgrounds : this.stills;
    if (!key || map[key]) return true;
    if (kind === 'bg' && this.config.gradientOnlyBGs?.has(key)) return true;
    const override = (kind === 'bg' ? this.config.backgroundExtOverrides : this.config.stillExtOverrides)?.[key];
    const extensions = [...new Set([override, '.webp', '.png', '.jpg', '.jpeg'].filter(Boolean))];
    const folder = kind === 'bg' ? 'bg' : 'stills';
    const revision = kind === 'still' && this.config.stillRevisions?.[key];
    for (const ext of extensions) {
      const source = `assets/images/${folder}/${key}${ext}${revision ? '?v=' + encodeURIComponent(revision) : ''}`;
      if (await this.image(source, priority)) { map[key] = ext; return true; }
    }
    return false;
  }

  character(charKey, expression = 'normal', priority = 0) {
    const cfg = this.config.characters[charKey];
    if (!cfg) return Promise.resolve(false);
    return this.image(cfg.images?.[expression] || `assets/images/chars/${charKey}/${expression}.png`, priority);
  }

  borrowImage(source) {
    const image = this.images.get(this.url(source));
    return image?.complete && image.naturalWidth > 0 && !image.parentNode ? image : null;
  }

  command(command, priority = 0, charState = {}) {
    switch (command.cmd) {
      case 'scene': return this.resolve('bg', command.bg, priority);
      case 'show': return this.character(command.char, command.expr, priority);
      case 'expr': {
        const actor = this.config.characters[command.char] ? command.char : charState[command.char]?.charKey;
        return actor ? this.character(actor, command.expr, priority) : Promise.resolve(true);
      }
      case 'still': return this.resolve('still', command.image, priority);
      default: return Promise.resolve(true);
    }
  }

  // Follow ordinary jumps, but stop at a player decision/conditional. Warm a
  // short prefix of each possible branch instead of downloading whole routes.
  lookAhead(labels, label, index = 0, charState = {}, budget = 40, seen = new Set()) {
    if (seen.has(label) || seen.size >= 8 || budget <= 0) return;
    seen.add(label);
    const commands = labels[label] || [];
    for (let i = index; i < commands.length && budget-- > 0; i++) {
      const cmd = commands[i];
      void this.command(cmd, 0, charState);
      if (cmd.cmd === 'jump' || (cmd.cmd === 'end' && cmd.next)) {
        this.lookAhead(labels, cmd.to || cmd.next, 0, charState, budget, seen); return;
      }
      if (cmd.cmd === 'if') {
        this.lookAhead(labels, cmd.to, 0, charState, Math.min(budget, 12), seen);
        // The fall-through path is also possible; do not speculate beyond it.
      }
      if (cmd.cmd === 'choice' || cmd.cmd === 'route_select') {
        const targets = cmd.options?.map(option => option.next)
          || [...(cmd.routes || []).map(route => route.label), cmd.fallback];
        for (const target of targets.filter(Boolean)) this.lookAhead(labels, target, 0, charState, 12, seen);
        return;
      }
      if (cmd.cmd === 'end' || cmd.cmd === 'credits') return;
    }
  }
}
