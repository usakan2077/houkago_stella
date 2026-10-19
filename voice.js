/** Dialogue audio only. No synthesis/API credentials are used in the browser. */
class VNVoicePlayer {
  constructor(options = {}, dependencies = {}) {
    this.options = { baseGainDb: 0, cacheEntries: 12, cacheBytes: 32 * 1024 * 1024, loadTimeout: 8000, ...options };
    this.fetch = dependencies.fetch || ((...args) => fetch(...args));
    this.createContext = dependencies.createContext || (() => {
      const Context = window.AudioContext || window.webkitAudioContext;
      return Context ? new Context() : null;
    });
    this.context = null;
    this.input = null;
    this.output = null;
    this.volume = 0.85;
    this.language = '';
    this.clips = {};
    this.cache = new Map();
    this.session = null;
    this.manifestToken = 0;
  }

  async unlock() {
    try {
      if (!this.context) {
        this.context = this.createContext();
        if (!this.context) return false;
        this.output = this.context.createGain();
        this.output.gain.value = this.volume;
        this.output.connect(this.context.destination);
        // Boost dialogue before peak control; keep the user's volume after it
        // so lowering the slider does not change the compression or clip balance.
        this.input = this.context.createGain();
        const baseGainDb = Number(this.options.baseGainDb);
        this.input.gain.value = 10 ** ((Number.isFinite(baseGainDb) ? Math.max(-12, Math.min(12, baseGainDb)) : 0) / 20);
        this.peakControl = this.context.createDynamicsCompressor();
        this.peakControl.threshold.value = -6;
        this.peakControl.knee.value = 0;
        this.peakControl.ratio.value = 20;
        this.peakControl.attack.value = 0.003;
        this.peakControl.release.value = 0.1;
        // Reserve headroom for the compressor's automatic makeup gain and
        // brief transients. Quiet dialogue stays close to the configured boost.
        this.headroom = this.context.createGain();
        this.headroom.gain.value = 10 ** (-3.5 / 20);
        this.input.connect(this.peakControl);
        this.peakControl.connect(this.headroom);
        this.headroom.connect(this.output);
      }
      if (this.context.state !== 'running') await this.context.resume();
      return this.context.state === 'running';
    } catch (_) { return false; }
  }

  async loadManifest(language, url) {
    const token = ++this.manifestToken;
    this.manifestController?.abort();
    this.reset();
    this.language = language;
    this.clips = {};
    if (!url) return;
    const controller = new AbortController();
    this.manifestController = controller;
    const timeout = setTimeout(() => controller.abort(), this.options.loadTimeout);
    try {
      const response = await this.fetch(url, { signal: controller.signal });
      if (!response.ok) return;
      const manifest = await response.json();
      if (token === this.manifestToken && manifest.language === language && manifest.clips) {
        this.clips = manifest.clips;
      }
    } catch (_) { /* Missing manifests must never prevent reading the story. */ }
    finally { clearTimeout(timeout); }
  }

  has(id, language = this.language) {
    return language === this.language && typeof this.clips[id]?.src === 'string';
  }

  setVolume(value) {
    this.volume = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.85;
    if (this.output) this.output.gain.value = this.volume;
    if (this.volume === 0) { this.stop(); this.retainWindow([]); }
    this.onStateChange?.();
  }

  stop() {
    if (this.session) this.session.finish(false);
  }

  reset() {
    this.stop();
    for (const entry of this.cache.values()) entry.controller.abort();
    this.cache.clear();
  }

  // Abort obsolete downloads; retain only a bounded LRU of decoded audio.
  retainWindow(ids) {
    const wanted = new Set(ids);
    for (const [id, entry] of this.cache) {
      if (!entry.settled && !wanted.has(id)) {
        entry.controller.abort();
        this.cache.delete(id);
      }
    }
    if (this.volume > 0 && this.context?.state === 'running') {
      for (const id of wanted) if (this.has(id)) void this._load(id);
    }
  }

  _trimCache() {
    let bytes = [...this.cache.values()].reduce((sum, entry) => sum + (entry.bytes || 0), 0);
    for (const [id, entry] of this.cache) {
      if (this.cache.size <= this.options.cacheEntries && bytes <= this.options.cacheBytes) break;
      if (id === this.session?.id) continue;
      entry.controller.abort();
      bytes -= entry.bytes || 0;
      this.cache.delete(id);
    }
  }

  _load(id) {
    const cached = this.cache.get(id);
    if (cached) {
      this.cache.delete(id);
      this.cache.set(id, cached);
      return cached.promise;
    }
    if (!this.has(id) || !this.context) return Promise.resolve(null);
    const entry = { controller: new AbortController(), settled: false, bytes: 0 };
    this.cache.set(id, entry);
    entry.promise = (async () => {
      const timeout = setTimeout(() => entry.controller.abort(), this.options.loadTimeout);
      try {
        const response = await this.fetch(this.clips[id].src, { signal: entry.controller.signal });
        if (!response.ok) throw new Error('Unavailable voice');
        const data = await response.arrayBuffer();
        if (entry.controller.signal.aborted || data.byteLength > this.options.cacheBytes) return null;
        const buffer = await this.context.decodeAudioData(data);
        if (entry.controller.signal.aborted || this.cache.get(id) !== entry) return null;
        const bytes = buffer.length * buffer.numberOfChannels * 4;
        if (bytes > this.options.cacheBytes) return null;
        entry.bytes = bytes;
        return buffer;
      } catch (_) { return null; }
      finally {
        clearTimeout(timeout);
        entry.settled = true;
        this._trimCache();
      }
    })();
    this._trimCache();
    return entry.promise;
  }

  play(id, language = this.language) {
    this.stop();
    if (this.volume === 0 || !this.has(id, language)) return Promise.resolve(false);
    return new Promise(resolve => {
      const session = { id, source: null, gain: null, timer: null };
      session.finish = (played) => {
        if (this.session !== session) return;
        this.session = null;
        clearTimeout(session.timer);
        if (session.source) {
          session.source.onended = null;
          try { session.source.stop(); } catch (_) {}
          session.source.disconnect();
        }
        session.gain?.disconnect();
        this.onStateChange?.();
        resolve(played);
      };
      this.session = session;
      // Also bounds resume/decode waits, not only the network request.
      session.timer = setTimeout(() => session.finish(false), this.options.loadTimeout);
      void (async () => {
        try {
          if (!await this.unlock() || this.session !== session) return session.finish(false);
          const buffer = await this._load(id);
          if (this.session !== session) return;
          if (!buffer) return session.finish(false);
          session.source = this.context.createBufferSource();
          session.source.buffer = buffer;
          session.gain = this.context.createGain();
          const gainDb = Number(this.clips[id]?.gainDb || 0);
          // Per-file production correction is optional; default is unity gain.
          session.gain.gain.value = 10 ** (Math.max(-12, Math.min(12, gainDb || 0)) / 20);
          session.source.connect(session.gain);
          session.gain.connect(this.input);
          session.source.onended = () => session.finish(true);
          clearTimeout(session.timer);
          session.timer = setTimeout(() => session.finish(false), buffer.duration * 1000 + 2000);
          session.source.start();
          session.started = true;
          this.onStateChange?.();
        } catch (_) { session.finish(false); }
      })();
    });
  }
}
