// node --test tools/check_voice.cjs (no dependencies)
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const tick = () => new Promise(resolve => setImmediate(resolve));
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function environment(options = {}) {
  const requests = [];
  const sources = [];
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      classList: { remove() {}, add() {}, toggle() {}, contains: () => true },
      style: { setProperty() {} }, textContent: '', scrollTop: 0, scrollHeight: 0,
      setAttribute(name, value) { this[name] = value; },
    });
    return elements.get(id);
  }
  const document = {
    hidden: false, activeElement: null,
    getElementById: element,
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  const context = {
    state: 'running', destination: {}, resume: async () => {},
    createGain: () => ({ gain: { value: 1 }, connect() {}, disconnect() {} }),
    createDynamicsCompressor: () => ({
      threshold: {}, knee: {}, ratio: {}, attack: {}, release: {}, connect() {},
    }),
    decodeAudioData: async () => ({ duration: 1, length: 100, numberOfChannels: 1 }),
    createBufferSource: () => {
      const source = { connect() {}, disconnect() {}, start() { this.started = true; }, stop() { this.stopped = true; } };
      sources.push(source);
      return source;
    },
  };
  const fetcher = (url, { signal } = {}) => new Promise((resolve, reject) => {
    const request = { url, signal, resolve, reject };
    requests.push(request);
    signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  });
  const scope = vm.createContext({ console, setTimeout, clearTimeout, setInterval, clearInterval,
    AbortController, document, window: {}, HTMLElement: class {}, requestAnimationFrame: fn => fn() });
  vm.runInContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8'), scope);
  vm.runInContext(fs.readFileSync(path.join(root, 'voice.js'), 'utf8') + '\nthis.Voice = VNVoicePlayer;', scope);
  vm.runInContext(fs.readFileSync(path.join(root, 'game.js'), 'utf8').replace('const engine = new VNEngine();', 'this.Engine = VNEngine;'), scope);
  const player = new scope.Voice({ loadTimeout: 100, ...options }, { fetch: fetcher, createContext: () => context });
  player.language = 'ja';
  for (let i = 0; i < 20; i++) player.clips['v' + i] = { src: 'voice' + i + '.mp3' };
  const engine = Object.create(scope.Engine.prototype);
  Object.assign(engine, {
    voice: player, _dialogVoicePromise: Promise.resolve(false), _autoScheduleToken: 0,
    _advanceToken: 1, currentText: '', currentLanguage: 'ja', currentLabel: 'a', currentIndex: 0,
    labels: {}, skipMode: false, autoMode: false, waitingForInput: true,
    _getCharacterDisplayName: () => 'Test', _highlightChar() {}, _clearCharHighlights() {},
    _markLineRead() {}, readLines: new Set(), textLog: [], _chainMode: 'none',
  });
  vm.runInContext('VN_CONFIG.settings.autoDelay = 1; VN_CONFIG.settings.typeSpeed = 0;', scope);
  const respond = (index, ok = true) => requests[index].resolve({ ok, arrayBuffer: async () => new ArrayBuffer(8) });
  return { player, engine, requests, sources, context, document, scope, respond };
}

test('startup manifest loads metadata only; mismatched language is ignored', async () => {
  const { player, requests } = environment();
  const loading = player.loadManifest('en', '/en.json');
  assert.equal(requests.length, 1);
  requests[0].resolve({ ok: true, json: async () => ({ language: 'ja', clips: { v0: { src: 'ja.mp3' } } }) });
  await loading;
  assert.equal(player.has('v0'), false);
  assert.equal(requests.length, 1);
});

test('base boost preserves per-clip correction and the user volume, including mute', async () => {
  const { player, scope, respond } = environment();
  player.options.baseGainDb = vm.runInContext('VN_CONFIG.voice.baseGainDb', scope);
  player.setVolume(0.5);
  player.clips.v0.gainDb = -2;
  const playing = player.play('v0'); await tick(); respond(0); await tick();
  assert.ok(Math.abs(player.input.gain.value - 10 ** (3 / 20)) < 0.000001);
  assert.ok(Math.abs(player.session.gain.gain.value - 10 ** (-2 / 20)) < 0.000001);
  assert.equal(player.output.gain.value, 0.5);
  player.setVolume(0.25);
  assert.equal(player.output.gain.value, 0.25);
  player.setVolume(0);
  assert.equal(player.output.gain.value, 0);
  assert.equal(await playing, false);
});

test('cancelled downloads and stale responses cannot start old audio', async () => {
  const { player, requests, sources, respond } = environment();
  const playing = player.play('v0');
  await tick();
  player.stop(); player.retainWindow([]);
  assert.equal(requests[0].signal.aborted, true);
  respond(0); await tick();
  assert.equal(await playing, false);
  assert.equal(sources.length, 0);
});

test('a second voice stops the first; cached replay does not refetch', async () => {
  const { player, sources, requests, respond } = environment();
  const first = player.play('v0'); await tick(); respond(0); await tick();
  assert.equal(sources[0].started, true);
  const second = player.play('v1'); await tick();
  assert.equal(await first, false);
  assert.equal(sources[0].stopped, true);
  respond(1); await tick(); sources[1].onended();
  assert.equal(await second, true);
  const replay = player.play('v0'); await tick();
  assert.equal(requests.length, 2);
  sources[2].onended(); assert.equal(await replay, true);
});

test('missing, failing, muted, and wrong-language voices fail without hanging', async () => {
  const { player, requests, respond } = environment();
  assert.equal(await player.play('missing'), false);
  assert.equal(await player.play('v0', 'en'), false);
  const failed = player.play('v0'); await tick(); respond(0, false);
  assert.equal(await failed, false);
  assert.equal(await player.play('v0'), false);
  player.setVolume(0); player.retainWindow(['v1']);
  assert.equal(await player.play('v1'), false);
  assert.equal(requests.length, 1);
});

test('network stalls and suspended audio do not block auto indefinitely', async () => {
  const { player, context } = environment({ loadTimeout: 15 });
  assert.equal(await player.play('v0'), false);
  context.state = 'suspended'; context.resume = () => new Promise(() => {});
  assert.equal(await player.play('v1'), false);
  player.reset();
});

test('cache has both entry and decoded byte limits', async () => {
  const { player, requests, respond } = environment({ cacheEntries: 3, cacheBytes: 800 });
  await player.unlock();
  for (let i = 0; i < 6; i++) {
    player.retainWindow(['v' + i]); respond(requests.length - 1); await tick();
    assert.ok(player.cache.size <= 3);
    assert.ok([...player.cache.values()].reduce((n, e) => n + e.bytes, 0) <= 800);
  }
  player.reset(); assert.equal(player.cache.size, 0);
});

test('preload stops at branches and excludes protagonist and narration', async () => {
  const { engine, player, requests } = environment();
  await player.unlock();
  engine._dialogVoiceId = 'v0';
  engine.labels.a = [
    { cmd: 'narrate', text: '$v7' }, { cmd: 'say', char: 'player', text: '$v8' },
    { cmd: 'say', char: 'sakura', text: '$v1' }, { cmd: 'if' },
    { cmd: 'say', char: 'sakura', text: '$v2' },
  ];
  engine._preloadUpcomingVoices();
  assert.deepEqual(requests.map(r => r.url), ['voice0.mp3', 'voice1.mp3']);
  engine.skipMode = true; engine._preloadUpcomingVoices();
  assert.ok(requests.every(r => r.signal.aborted));
  engine._preloadUpcomingVoices(); assert.equal(requests.length, 2);
});

test('lookahead is limited to three future eligible dialogue lines', async () => {
  const { engine, player, requests } = environment();
  await player.unlock(); engine._dialogVoiceId = 'v0';
  engine.labels.a = Array.from({ length: 10 }, (_, i) => ({ cmd: 'say', char: 'kotoha', text: '$v' + (i + 1) }));
  engine._preloadUpcomingVoices(); assert.equal(requests.length, 4);
  player.reset();
});

test('auto waits for voice and obsolete auto callbacks cannot advance twice', async () => {
  const { engine } = environment();
  let finish; let advances = 0;
  engine.autoMode = true;
  engine._executeNext = () => { advances++; engine._advanceToken++; };
  engine._dialogVoicePromise = new Promise(resolve => { finish = resolve; });
  engine._scheduleAutoAdvance(); await sleep(10); assert.equal(advances, 0);
  engine._scheduleAutoAdvance(); await sleep(10); finish(true); await tick();
  assert.equal(advances, 1);
});

test('opening a modal disables auto and skip, stops voice, and cancels preload', async () => {
  const { engine, player, requests } = environment();
  const playing = player.play('v0'); await tick();
  engine.autoMode = true; engine.skipMode = true;
  engine._dialogVoicePromise = playing; engine._scheduleAutoAdvance();
  let advances = 0; engine._executeNext = () => advances++;
  engine._pauseForVoiceModal(); await sleep(10);
  assert.equal(engine.autoMode, false); assert.equal(engine.skipMode, false);
  assert.equal(requests[0].signal.aborted, true); assert.equal(advances, 0);
});

test('skip during typewriter remains enabled and advances without fetching', async () => {
  const { engine, requests } = environment();
  engine.typewriterTimer = setInterval(() => {}, 1000);
  let advances = 0; engine._executeNext = () => advances++;
  engine._toggleSkip();
  assert.equal(engine.skipMode, true); assert.equal(advances, 1);
  assert.equal(engine.typewriterTimer, null); assert.equal(requests.length, 0);
});

test('unread dialogue exits read-only skip and starts its own voice', async () => {
  const { engine, player, requests } = environment();
  await player.unlock(); engine.skipMode = true; engine._skipReadOnly = true;
  engine._curLineKey = '$v0'; engine._displayDialog('sakura', 'test');
  await tick(); assert.equal(engine.skipMode, false);
  assert.equal(requests[0].url, 'voice0.mp3');
  assert.equal(engine.textLog[0].voiceId, 'v0');
  player.reset();
});

test('protagonist and narration never receive voice replay IDs', () => {
  const { engine } = environment();
  engine._curLineKey = '$v0'; engine._displayDialog('player', 'test');
  engine._displayDialog(null, 'narration');
  assert.ok(engine.textLog.every(entry => entry.voiceId === null));
});


test('outfit identity highlights the speaker without changing voice character keys', () => {
  const { engine, document } = environment();
  delete engine._highlightChar;
  const state = new Map();
  for (const pos of ['left', 'center', 'right']) {
    document.getElementById('char-' + pos).classList = {
      contains: () => true,
      toggle: (name, on) => state.set(pos + ':' + name, on),
    };
  }
  for (const [speaker, outfit] of [
    ['sakura', 'sakura_swimsuit'], ['sakura', 'sakura_sports'], ['sakura', 'sakura_apron'],
    ['kotoha', 'kotoha_swimsuit'], ['mahiru', 'mahiru_no_camera'],
    ['mahiru', 'mahiru_private'], ['mahiru', 'mahiru_sports'],
    ['nobuhara', 'nobuhara_nobag'], ['nobuhara', 'nobuhara_sports'], ['nobuhara', 'nobuhara_private'],
  ]) {
    engine.charState = { left: { charKey: outfit }, center: { charKey: 'teacher_male' }, right: { charKey: 'kotoha' } };
    engine._highlightChar(speaker);
    assert.equal(state.get('left:highlighted'), true, outfit);
    assert.equal(state.get('left:dimmed'), false, outfit);
    assert.equal(state.get('center:dimmed'), true, outfit);
    engine._highlightChar('teacher_male');
    assert.equal(state.get('left:dimmed'), true, outfit);
    assert.equal(state.get('center:highlighted'), true, outfit);
  }
});
