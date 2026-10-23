// Production parser, text loader and resolver: stale or failed data never leaks IDs.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

function setup(language = 'ja', intercept = () => null) {
  const requests = [], warnings = [];
  const scope = vm.createContext({console: {warn: (...args) => warnings.push(args)},
    fetch: async (url, options) => {
      const file = url.split('?')[0];
      requests.push({url, options, file});
      const response = intercept(file, requests);
      if (response) return response;
      return {ok: true, json: async () => JSON.parse(read(file)), text: async () => read(file)};
    },
  });
  vm.runInContext(read('config.js') + '\nthis.config=VN_CONFIG;', scope);
  vm.runInContext(read('parser.js') + '\nthis.Parser=ScriptParser;', scope);
  vm.runInContext(read('bonus-scenario-data.js'), scope);
  vm.runInContext(read('bonus-scenario.js') + '\nthis.Bonus=BonusScenario;', scope);
  vm.runInContext(read('game.js').replace('const engine = new VNEngine();', 'this.Engine=VNEngine;'), scope);
  const engine = Object.create(scope.Engine.prototype);
  Object.assign(engine, {currentLanguage: language, parser: new scope.Parser(), labels: {}, scenarioTexts: {},
    _showScenarioLoadError() { this.failed = true; },
  });
  engine.bonus = {install: () => scope.Bonus.prototype.install.call({engine, english: language === 'en'})};
  return {engine, scope, requests, warnings};
}

for (const language of ['ja', 'en']) {
  test(language + ': every actual main/bonus dialogue, choice, ending and coda resolves to text', async () => {
    const {engine, requests, scope} = setup(language);
    assert.equal(await engine._loadScenarioBundle(), true);
    assert.equal(engine._missingScenarioTexts().length, 0);
    let count = 0;
    for (const commands of Object.values(engine.labels)) for (const cmd of commands) {
      for (const ref of engine._commandTextReferences(cmd)) {
        const text = engine._resolveScenarioText(ref);
        assert.equal(typeof text, 'string');
        assert.notEqual(text, ref.slice(1));
        count++;
      }
    }
    assert.ok(count > 3600);
    for (const suffix of ['pack_up', 'pack_up.s002']) {
      const text = engine._resolveScenarioText('$chapter1.chapter1_lunch.' + suffix);
      assert.match(text, language === 'ja' ? /チャイム|教科書/ : /bell|textbook/);
    }
    assert.ok(requests.every(({url, options}) => options.cache === 'no-store' && url.endsWith('v=' + scope.config.version)));
  });
}

test('stale dictionaries missing the reported lines AND other chapter references are reloaded', async () => {
  let reads = 0;
  const {engine, requests} = setup('ja', file => {
    if (file !== 'locales/scenario.ja.json') return null;
    const data = JSON.parse(read(file));
    if (reads++ === 0) {
      for (const key of ['chapter1.chapter1_lunch.pack_up', 'chapter1.chapter1_lunch.pack_up.s002', ...Object.keys(data).slice(0, 3)]) delete data[key];
    }
    return {ok: true, json: async () => data};
  });
  assert.equal(await engine._loadScenarioBundle(), true);
  assert.equal(reads, 2);
  assert.equal(engine.failed, undefined);
  assert.equal(engine._missingScenarioTexts().length, 0);
  assert.equal(requests.filter(r => r.file === 'scenarios/chapter1.md').length, 2);
});

for (const failure of ['HTTP failure', 'malformed JSON', 'empty JSON', 'ID as text value']) {
  test(failure + ' retries once and recovers without displaying a key', async () => {
    let count = 0;
    const {engine} = setup('ja', file => {
      if (file !== 'locales/scenario.ja.json' || count++ > 0) return null;
      if (failure === 'HTTP failure') return {ok: false, status: 503};
      if (failure === 'malformed JSON') return {ok: true, json: async () => {throw new SyntaxError('invalid JSON');}};
      const data = failure === 'empty JSON' ? {} : {'chapter1.start.r001': 'chapter1.start.r001'};
      return {ok: true, json: async () => data};
    });
    assert.equal(await engine._loadScenarioBundle(), true);
    assert.equal(engine.failed, undefined);
  });
}

test('persistent missing text is blocked after two attempts instead of rendering raw IDs', async () => {
  let count = 0;
  const {engine} = setup('ja', file => {
    if (file !== 'locales/scenario.ja.json') return null;
    count++;
    const data = JSON.parse(read(file));
    delete data['chapter1.chapter1_lunch.pack_up'];
    return {ok: true, json: async () => data};
  });
  assert.equal(await engine._loadScenarioBundle(), false);
  assert.equal(count, 2);
  assert.equal(engine.failed, true);
  assert.throws(() => engine._resolveScenarioText('$chapter1.chapter1_lunch.pack_up'), /Missing scenario text/);
  engine.failed = false;
  engine._processCommand({cmd: 'narrate', text: '$chapter1.chapter1_lunch.pack_up'});
  assert.equal(engine.failed, true);
});
