const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, 'distribution/asset-packs.js'), 'utf8');

function setup(fetch, index = {
  packs: { p0: { src: 'assets/voice-packs/p0.bin', bytes: 6 } },
  clips: { 'assets/voice/a.mp3': { pack: 'p0', offset: 0, length: 3 },
    'assets/voice/b.mp3': { pack: 'p0', offset: 3, length: 3 } },
}) {
  const context = { VN_PACK_INDEX: index, fetch, document: { baseURI: 'https://example.invalid/nested/game/index.html' },
    URL, AbortController, DOMException, Response, setTimeout, clearTimeout };
  vm.runInNewContext(source, context);
  return context.VN_PORTAL_VOICE_FETCH;
}

test('two clips share one fetch; nested paths and original MP3 bytes are preserved', async () => {
  const calls = [];
  const load = setup(async url => { calls.push(String(url)); return new Response(Uint8Array.from([1,2,3,4,5,6])); });
  const [a,b] = await Promise.all([load('assets/voice/a.mp3'), load('assets/voice/b.mp3')]);
  assert.deepEqual([...new Uint8Array(await a.arrayBuffer())], [1,2,3]);
  assert.deepEqual([...new Uint8Array(await b.arrayBuffer())], [4,5,6]);
  assert.deepEqual(calls, ['https://example.invalid/nested/game/assets/voice-packs/p0.bin']);
});

test('cancelling one clip does not cancel another clip sharing its pending pack', async () => {
  let complete, aborted = false;
  const load = setup((url, init) => new Promise(resolve => {
    complete = () => resolve(new Response(Uint8Array.from([1,2,3,4,5,6])));
    init.signal.addEventListener('abort', () => { aborted = true; });
  }));
  const controller = new AbortController();
  const a = load('assets/voice/a.mp3', { signal: controller.signal });
  const b = load('assets/voice/b.mp3');
  controller.abort();
  await assert.rejects(a, { name: 'AbortError' });
  assert.equal(aborted, false);
  complete();
  assert.equal((await b).status, 200);
});

test('cancelling the last consumer releases the request, and the pack can be retried', async () => {
  let calls = 0, underlyingAborted = false;
  const load = setup((url, init) => {
    calls++;
    if (calls > 1) return Promise.resolve(new Response(Uint8Array.from([1,2,3,4,5,6])));
    return new Promise((_, reject) => init.signal.addEventListener('abort', () => {
      underlyingAborted = true; reject(new DOMException('Cancelled', 'AbortError'));
    }));
  });
  const controller = new AbortController();
  const pending = load('assets/voice/a.mp3', { signal: controller.signal });
  controller.abort();await assert.rejects(pending, { name: 'AbortError' });
  assert.equal(underlyingAborted, true);
  assert.equal((await load('assets/voice/a.mp3')).status, 200);
  assert.equal(calls, 2);
});

test('truncated packs are rejected and a later successful request recovers', async () => {
  let calls = 0;
  const load = setup(async () => new Response(Uint8Array.from(++calls === 1 ? [1,2] : [1,2,3,4,5,6])));
  await assert.rejects(load('assets/voice/a.mp3'), /Incomplete voice pack/);
  assert.equal((await load('assets/voice/a.mp3')).status, 200);
});

test('non-voice requests retain ordinary fetch semantics, and pre-aborted voices do not download', async () => {
  const calls = [];
  const load = setup(async (...args) => { calls.push(args); return new Response('{}'); });
  const controller = new AbortController();
  await load('assets/voice/en/manifest.json', { signal: controller.signal });
  assert.equal(calls[0][0], 'assets/voice/en/manifest.json');
  assert.equal(calls[0][1].signal, controller.signal);
  controller.abort();
  await assert.rejects(load('assets/voice/a.mp3', { signal: controller.signal }), { name: 'AbortError' });
  assert.equal(calls.length, 1);
});

test('compressed pack cache evicts old data after its memory budget is exceeded', async () => {
  const index = { packs: {}, clips: {} }, calls = [];
  for (let i=0; i<14; i++) {
    index.packs['p'+i] = { src: 'packs/'+i+'.bin', bytes: 1024*1024 };
    index.clips['voices/'+i+'.mp3'] = { pack: 'p'+i, offset: 0, length: 4 };
  }
  const load = setup(async url => { calls.push(String(url)); return new Response(new Uint8Array(1024*1024)); }, index);
  for (let i=0; i<14; i++) await load('voices/'+i+'.mp3');
  await load('voices/0.mp3');
  assert.equal(calls.length, 15);
});
