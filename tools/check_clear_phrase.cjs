const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { words, make } = vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../clear-phrase.js'), 'utf8')
  + ';({words:VN_CLEAR_PHRASE_WORDS,make:vnCreateClearPhrase})');

test('all word banks use unique entries with the promised mora counts', () => {
  for (const [name, count] of Object.entries({ first: 5, subject: 3, verb: 3, last: 5 })) {
    assert.equal(words[name].length, 32);
    assert.equal(new Set(words[name]).size, 32);
    for (const word of words[name]) {
      assert.match(word, /^[ぁ-ん]+$/);
      assert.doesNotMatch(word, /[ぁぃぅぇぉゃゅょゎ]/);
      assert.equal([...word].length, count, word);
    }
  }
  assert.equal(Object.values(words).reduce((n, bank) => n * bank.length, 1), 1048576);
});

test('all middle-line combinations are seven mora; all generated parts stay five-seven-five', () => {
  const middles = new Set();
  for (let a = 0; a < 32; a++) for (let b = 0; b < 32; b++) {
    const phrase = make(new Uint8Array([a, a, b, b]));
    assert.deepEqual(phrase.split('／').map(line => [...line].length), [5, 7, 5]);
    middles.add(phrase.split('／')[1]);
  }
  assert.equal(middles.size, 1024);
});

test('the same receipt bytes retain the same phrase; highest bytes wrap without missing words', () => {
  assert.equal(make(new Uint8Array(16)), 'ねこのぱん／ぷりんがはしる／またあした');
  const bytes = new Uint8Array(16).fill(255);
  assert.equal(make(bytes), 'ほしのもち／さくらがまねる／よるのそら');
  assert.equal(make(bytes), make(bytes));
});
