const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const tick = () => new Promise(resolve => setImmediate(resolve));
function environment(load) {
  const classes = new Set(), requests = [];
  const document = {
    documentElement: { classList: { contains: name => classes.has(name), add: name => classes.add(name) } },
    getElementById: () => ({ textContent: 'かな漢字ABC' }),
    fonts: { ready: Promise.resolve(), load: (font, text) => { requests.push({ font, text }); return load(font, text); } },
  };
  const scope = vm.createContext({ document, setTimeout, clearTimeout });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../font-loader.js'), 'utf8'), scope);
  return { prepare: scope.prepareStellaFonts, classes, requests };
}

test('font stylesheet and actual dialogue glyphs are loaded before startup finishes', async () => {
  let style, release;
  const stylesheet = new Promise(resolve => { style = resolve; });
  const font = new Promise(resolve => { release = resolve; });
  const e = environment(() => font);
  let result;
  const pending = e.prepare({ line: '稀な台詞Ω' }, { stylesReady: stylesheet }).then(value => { result = value; });
  await tick(); assert.equal(e.requests.length, 0);
  style(true); await tick();
  assert.equal(e.requests.length, 2);
  assert.ok(e.requests.every(request => request.text.includes('稀') && request.text.includes('Ω')));
  assert.equal(result, undefined);
  release([{}]); await pending;
  assert.equal(result, 'web'); assert.equal(e.classes.size, 0);
});

test('late fonts never undo the stable fallback chosen at the deadline', async () => {
  let release;
  const delayed = new Promise(resolve => { release = resolve; });
  const e = environment(() => delayed);
  assert.equal(await e.prepare({}, { stylesReady: Promise.resolve(true), timeout: 10 }), 'system');
  release([{}]); await tick();
  assert.ok(e.classes.has('vn-system-fonts'));
  const before = e.requests.length;
  assert.equal(await e.prepare({ another: '次の章' }), 'system');
  assert.equal(e.requests.length, before);
});

test('missing definitions, failed stylesheets and failed font files use a stable fallback', async () => {
  for (const [load, stylesReady] of [
    [() => Promise.resolve([]), Promise.resolve(true)],
    [() => Promise.resolve([{}]), Promise.resolve(false)],
    [() => Promise.reject(new Error('offline')), Promise.resolve(true)],
  ]) {
    const e = environment(load);
    assert.equal(await e.prepare({}, { stylesReady }), 'system');
    assert.ok(e.classes.has('vn-system-fonts'));
  }
});
