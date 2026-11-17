const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
function setup() {
  const scope = vm.createContext({ navigator: { language: 'zh-HK' }, setTimeout, clearTimeout, AbortController });
  vm.runInContext(read('chinese-locales.js') + read('config.js') + ';this.config=VN_CONFIG;', scope);
  vm.runInContext(read('game.js').replace('const engine = new VNEngine();', 'this.Engine=VNEngine;'), scope);
  return scope;
}
test('Chinese browser locales select a regional script and preserve Japanese/English', () => {
  const { StellaI18n: i18n } = setup();
  for (const value of ['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh-Hant-HK', 'zh_TW']) assert.equal(i18n.normalize(value), 'zh-TW');
  for (const value of ['zh', 'zh-CN', 'zh-SG', 'zh-Hans', 'zh-Hans-CN']) assert.equal(i18n.normalize(value), 'zh-CN');
  assert.equal(i18n.normalize('en-US'), 'en');
  assert.equal(i18n.normalize('ja-JP'), 'ja');
  assert.equal(i18n.normalize('ko-KR'), 'ja');
  assert.equal(i18n.browserLanguage(), 'zh-TW');
});
test('both Chinese settings cover all Japanese interface labels and preserve placeholders', () => {
  const scope = setup();
  const strings = value => typeof value === 'string' ? [value] : Object.values(value).flatMap(strings);
  for (const lang of ['zh-CN', 'zh-TW']) {
    const dict = scope.StellaI18n.dictionaries[lang];
    for (const source of strings(scope.config.i18n.labels.ja)) {
      if (!/[ぁ-ヿ一-龯]/u.test(source)) continue;
      assert.ok(Object.hasOwn(dict, source), `${lang} missing UI label: ${source}`);
      assert.deepEqual(dict[source].match(/\{\w+\}/g) || [], source.match(/\{\w+\}/g) || []);
    }
    const engine = Object.create(scope.Engine.prototype);
    engine.currentLanguage = lang;
    assert.equal(engine._tf('saveOverwrite', { slot: 3 }).includes('3'), true);
    assert.equal(engine._getCharacterDisplayName('kotoha'), lang === 'zh-CN' ? '花园琴叶' : '花園琴葉');
    assert.equal(scope.StellaI18n.text('そういうことはあります', lang), 'そういうことはあります');
    assert.deepEqual(Array.from(engine._getScenarioFiles()), Array.from(scope.config.scenarioFilesByLanguage.ja));
    assert.equal(engine._getScenarioTextFile(), `locales/scenario.${lang}.json`);
  }
});
test('Chinese dialogue, prefetch and log replay use the matching Chinese manifest', async () => {
  const scope = setup();
  vm.runInContext(read('voice.js') + ';this.Player=VNVoicePlayer;', scope);
  const requests = [];
  const player = new scope.Player(scope.config.voice, { fetch: async url => {
    requests.push(url);
    return { ok: true, json: async () => ({ language: url.includes('zh-TW') ? 'zh-TW' : 'zh-CN', clips: { sample: { src: 'sample.mp3' } } }) };
  } });
  for (const lang of ['zh-CN', 'zh-TW']) {
    await player.loadManifest(lang, scope.config.voice.manifests[lang]);
    assert.equal(player.language, lang);
    assert.equal(player.has('sample', lang), true);
    assert.equal(player.has('sample', 'ja'), false);
    assert.equal(player.has('sample', lang === 'zh-CN' ? 'zh-TW' : 'zh-CN'), false);
    assert.equal(player.has('sample', 'en'), false);
  }
  assert.deepEqual(requests, ['assets/voice/zh-CN/manifest.json', 'assets/voice/zh-TW/manifest.json']);
});

test('both Chinese editions contain every main/bonus text ID and keep filenames and variables intact', () => {
  for (const kind of ['scenario', 'bonus']) {
    const japanese = JSON.parse(read(`locales/${kind}.ja.json`));
    for (const language of ['zh-CN', 'zh-TW']) {
      const translated = JSON.parse(read(`locales/${kind}.${language}.json`));
      assert.deepEqual(Object.keys(translated).sort(), Object.keys(japanese).sort());
      for (const [id, value] of Object.entries(translated)) {
        assert.equal(typeof value, 'string');
        assert.ok(value.trim(), `${language} empty ${id}`);
        assert.doesNotMatch(value, /[ぁ-ゖァ-ヺ]/u, `${language} untranslated kana ${id}`);
        assert.notEqual(value, id);
        assert.deepEqual(value.match(/\{\w+\}/g) || [], japanese[id].match(/\{\w+\}/g) || []);
      }
    }
  }
});
