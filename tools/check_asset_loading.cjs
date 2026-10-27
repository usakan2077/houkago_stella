const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const tick = () => new Promise(resolve => setImmediate(resolve));

function loaderEnvironment(options = {}) {
  const requests = [], pending = [];
  const config = { version: '1.4.4', characters: { sakura: {} }, backgrounds: {}, gradientOnlyBGs: new Set(['gradient']), backgroundExtOverrides: { late: '.png' }, stillRevisions: { memory: 'r2' } };
  const context = vm.createContext({ URL, document: { baseURI: 'https://example.com/game/index.html' }, navigator: {}, VN_CONFIG: config, setTimeout, clearTimeout });
  vm.runInContext(fs.readFileSync(path.join(root, 'asset-loader.js'), 'utf8') + ';globalThis.Loader=VNAssetLoader;globalThis.assetURL=stellaAssetURL;', context);
  const loader = new context.Loader(config, { ...options, createImage: () => ({ set src(value) { if (!value) return; requests.push(value); pending.push(() => this.onload?.()); } }) });
  return { loader, context, config, requests, pending };
}

test('startup asset URLs are scoped, versioned and preserve individual CG revisions', () => {
  const e = loaderEnvironment();
  assert.equal(e.context.assetURL('assets/images/a.webp?v=r1'), 'https://example.com/game/assets/images/a.webp?v=r1&_stella_v=1.4.4');
  assert.equal(e.context.assetURL('https://other.test/assets/a.png'), 'https://other.test/assets/a.png');
  e.config.version = '1.4.5';
  assert.ok(e.context.assetURL('assets/a.png').endsWith('_stella_v=1.4.5'));
});

test('image concurrency is bounded and a foreground request passes queued lookahead', async () => {
  const e = loaderEnvironment();
  const a = e.loader.image('assets/a.png'), b = e.loader.image('assets/b.png');
  const c = e.loader.image('assets/c.png'), d = e.loader.image('assets/d.png');
  const foreground = e.loader.image('assets/d.png', 10);
  assert.equal(d, foreground);
  assert.equal(e.requests.length, 2);
  e.pending.shift()();
  assert.match(e.requests[2], /d\.png/);
  e.pending.shift()();
  while (e.pending.length) e.pending.shift()();
  assert.deepEqual(await Promise.all([a,b,c,d]), [true,true,true,true]);
});

test('extension overrides and gradient-only backgrounds survive deferred loading', async () => {
  const e = loaderEnvironment();
  assert.equal(await e.loader.resolve('bg', 'gradient'), true);
  assert.equal(e.requests.length, 0);
  const loading = e.loader.resolve('bg', 'late');
  assert.match(e.requests[0], /late\.png/);
  e.pending.shift()();
  assert.equal(await loading, true);
  assert.equal(e.loader.backgrounds.late, '.png');
  const still = e.loader.resolve('still', 'memory');
  assert.match(e.requests[1], /memory\.webp\?v=r2&_stella_v=/);
  e.pending.shift()(); await still;
});

test('lookahead follows a jump and warms short branch prefixes without scanning entire routes', () => {
  const e = loaderEnvironment();
  const seen = [];
  e.loader.command = cmd => { if (cmd.cmd === 'show') seen.push(cmd.expr); return Promise.resolve(true); };
  const route = Array.from({ length: 100 }, (_, i) => ({ cmd: 'show', char: 'sakura', expr: String(i) }));
  e.loader.lookAhead({ start: [{ cmd: 'jump', to: 'choice' }], choice: [{ cmd: 'choice', options: [{ next: 'route' }] }], route }, 'start');
  assert.equal(seen.length, 12);
});

test('stalled images time out and can be retried instead of blocking story progression', async () => {
  const e = loaderEnvironment({ timeout: 10 });
  assert.equal(await e.loader.image('assets/stalled.png'), false);
  const retried = e.loader.image('assets/stalled.png');
  e.pending.pop()();
  assert.equal(await retried, true);
});

function workerEnvironment(blockStorage = false) {
  const handlers = {}, storage = new Map(), network = [];
  const caches = { open: async name => {
    if (blockStorage) throw new Error('Storage denied');
    if (!storage.has(name)) storage.set(name, new Map());
    const entries = storage.get(name);
    return { match: async request => entries.get(request.url)?.clone(), put: async (request, response) => { entries.set(request.url, response.clone()); } };
  } };
  const context = vm.createContext({ URL, Request, Response, Headers, caches,
    self: { registration: { scope: 'https://example.com/game/' }, addEventListener: (name, handler) => { handlers[name] = handler; } },
    fetch: async request => { network.push(request.url); return new Response('abcdef', { status: request.url.includes('missing') ? 404 : 200 }); },
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'asset-cache-worker.js'), 'utf8'), context);
  async function request(source, headers = {}) {
    const tasks = []; let response;
    handlers.fetch({ request: new Request('https://example.com/game/' + source, { headers }), waitUntil: task => tasks.push(task), respondWith: task => { response = task; } });
    if (!response) return null;
    const result = await response; await Promise.all(tasks); return result;
  }
  return { request, network, storage };
}

test('worker reuses same-version bytes, refetches a new version and never captures program files', async () => {
  const e = workerEnvironment();
  assert.equal(await (await e.request('assets/a.webp?_stella_v=1')).text(), 'abcdef');
  await e.request('assets/a.webp?_stella_v=1');
  assert.equal(e.network.length, 1);
  await e.request('assets/a.webp?_stella_v=2');
  assert.equal(e.network.length, 2);
  assert.equal(await e.request('config.js?_stella_v=1'), null);
  assert.equal(await e.request('assets/a.webp'), null);
  assert.equal(await e.request('assets/video/op.mp4?_stella_v=1'), null);
});

test('cached full media serves open, suffix and bounded ranges without a second download', async () => {
  const e = workerEnvironment();
  const src = 'assets/audio/bgm/test.mp3?_stella_v=1';
  await e.request(src);
  for (const [range, expected] of [['bytes=1-3','bcd'],['bytes=4-','ef'],['bytes=-2','ef']]) {
    const response = await e.request(src, { Range: range });
    assert.equal(response.status, 206); assert.equal(await response.text(), expected);
  }
  assert.equal((await e.request(src, { Range: 'bytes=99-' })).status, 416);
  assert.equal(e.network.length, 1);
});

test('storage denial falls back to the network; missing assets never poison the cache', async () => {
  const blocked = workerEnvironment(true);
  assert.equal((await blocked.request('assets/a.png?_stella_v=1')).status, 200);
  const e = workerEnvironment();
  await e.request('assets/missing.png?_stella_v=1'); await e.request('assets/missing.png?_stella_v=1');
  assert.equal(e.network.length, 2);
});

test('a delayed image command cannot resume after a title return or another jump', async () => {
  const context = vm.createContext({ VN_CONFIG: {}, console, setTimeout, clearTimeout });
  vm.runInContext(fs.readFileSync(path.join(root, 'game.js'), 'utf8').replace(/const engine = new VNEngine\(\);/, '') + ';globalThis.Engine=VNEngine;', context);
  const engine = Object.create(context.Engine.prototype);
  let finish, shown = false;
  engine._advanceToken = 1;
  engine.assetLoader = { command: () => new Promise(resolve => { finish = resolve; }) };
  engine._commandTextReferences = () => [];
  engine._showChar = () => { shown = true; };
  engine._executeNext = () => {};
  engine._processCommand({ cmd: 'show', char: 'sakura' });
  engine._advanceToken++;
  finish(true); await tick();
  assert.equal(shown, false);
});
