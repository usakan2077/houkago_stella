// Regression paths through the production scenario parser; no dependencies.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const scope = vm.createContext({console});
vm.runInContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8') + '\nthis.config = VN_CONFIG;', scope);
vm.runInContext(fs.readFileSync(path.join(root, 'parser.js'), 'utf8') + '\nthis.Parser = ScriptParser;', scope);
const parser = new scope.Parser();
test('saved classroom background restores old and current saves without the unused asset', async () => {
  let save;
  const restore = vm.createContext({
    localStorage: { getItem: () => JSON.stringify(save) },
    document: { getElementById: () => ({ classList: { add() {}, remove() {} } }) },
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'game.js'), 'utf8').replace('const engine = new VNEngine();', 'this.Engine = VNEngine;'), restore);
  for (const language of ['ja', 'en']) for (const background of ['classroom_late_afternoon', 'classroom_evening', 'classroom']) {
    save = { label: 'chapter1_after_school_intro', index: 4, currentBG: background, language, flags: { sakura_favor: 3 } };
    const engine = Object.create(restore.Engine.prototype);
    Object.assign(engine, { currentLanguage: language, _advanceToken: 0,
      _pauseForVoiceModal() {}, _stopTypewriter() {}, _resetGameState() {}, _setWindowColor() {},
      _trackEvent() {}, _trackProgress() {}, _executeNext() {},
      _changeBackground(key, effect) { this.currentBG = key; assert.equal(effect, 'instant'); },
    });
    await engine._loadFromSlot(1);
    assert.equal(engine.currentBG, background === 'classroom_late_afternoon' ? 'classroom_evening' : background);
    assert.equal(engine.currentLabel, save.label);
    assert.equal(engine.currentIndex, save.index);
    assert.equal(engine.flags.sakura_favor, 3);
  }
});
function walk(language, start, decisions = {}, initialFlags = {}, stop = null) {
  const labels = {};
  for (const file of scope.config.scenarioFilesByLanguage[language]) {
    const parsed = parser.parse(fs.readFileSync(path.join(root, file), 'utf8'));
    for (const [name, commands] of Object.entries(parsed)) if (name !== '__preamble__') labels[name] = commands;
  }
  let label = start, index = 0;
  const seen = [], texts = [], presentation = [], portraits = {left:null, center:null, right:null}, flags = {...initialFlags};
  for (let steps = 0; steps < 15000; steps++) {
    if (index === 0) { seen.push(label); if (label === stop) return {seen, texts, flags, presentation}; }
    const command = labels[label]?.[index++];
    assert.ok(command, 'No continuation at ' + label);
    const go = target => { assert.ok(labels[target], target); label = target; index = 0; };
    if (command.text) {
      const id = command.text.replace(/^\$/, '');
      texts.push(id);
      presentation.push({id, speaker:command.char, portraits:JSON.parse(JSON.stringify(portraits))});
    }
    switch (command.cmd) {
      case 'show': portraits[command.pos] = {char:command.char, expr:command.expr}; break;
      case 'hide_all': for (const pos of Object.keys(portraits)) portraits[pos] = null; break;
      case 'hide': for (const pos of Object.keys(portraits)) if (pos === command.target || portraits[pos]?.char === command.target) portraits[pos] = null; break;
      case 'expr': for (const portrait of Object.values(portraits)) if (portrait?.char === command.char) portrait.expr = command.expr; break;
      case 'move': for (const pos of Object.keys(portraits)) if (portraits[pos]?.char === command.char) {const portrait = portraits[pos]; portraits[pos] = null; portraits[command.pos] = portrait; break;} break;
      case 'flag': flags[command.name] = command.value; break;
      case 'flag_add': flags[command.name] = (Number(flags[command.name]) || 0) + command.amount; break;
      case 'flag_sub': flags[command.name] = (Number(flags[command.name]) || 0) - command.amount; break;
      case 'jump': go(command.to); break;
      case 'if': {
        const f = flags[command.flag], v = command.value;
        const condition = command.op === '==' ? String(f) === String(v)
          : command.op === '!=' ? String(f) !== String(v)
          : command.op === '>=' ? Number(f) >= Number(v)
          : command.op === '>' ? Number(f) > Number(v)
          : command.op === '<=' ? Number(f) <= Number(v) : Number(f) < Number(v);
        if (condition) go(command.to);
        break;
      }
      case 'choice': {
        const key = command.options[0].text.replace(/^\$/, '');
        const option = command.options[decisions[key] ?? 1];
        assert.ok(option, key);
        for (const modifier of option.flags) {
          const n = Number(flags[modifier.name]) || 0;
          flags[modifier.name] = n + (modifier.op === '+' ? modifier.amount : -modifier.amount);
        }
        go(option.next); break;
      }
      case 'end':
        if (command.next) go(command.next);
        else return {seen, texts, flags, presentation, end: command.title};
    }
  }
  assert.fail('Scenario path did not terminate');
}
for (const language of ['ja', 'en']) {
  test(language + ': library skip receives the common book without recalling an unheard confession', () => {
    const missed = walk(language, 'chapter3_library', {'chapter3.chapter3_library.r007': 1}, {}, 'chapter4_corridor');
    const heard = walk(language, 'chapter3_library', {'chapter3.chapter3_library.r007': 0}, {}, 'chapter4_corridor');
    for (const route of [missed, heard]) assert.equal(route.texts.filter(k => k === 'chapter3.chapter3_library_talk.r028').length, 1);
    assert.ok(missed.texts.includes('chapter4.chapter4_music_room.first_question'));
    assert.ok(!missed.texts.includes('chapter4.chapter4_music_room.r010'));
    assert.ok(heard.texts.includes('chapter4.chapter4_music_room.r010'));
    assert.ok(!heard.texts.includes('chapter4.chapter4_music_room.first_question'));
  });
  test(language + ': route threshold respects the selected attempted visit', () => {
    for (const heroine of ['sakura', 'kotoha', 'mahiru']) {
      const low = walk(language, 'chapter8_to_' + heroine, {}, {[heroine + '_favor']: 7});
      assert.ok(low.texts.includes('chapter8.chapter8_to_' + heroine + '.missed'));
      assert.ok(low.seen.includes('bad_end_ending'));
      const high = walk(language, 'chapter8_to_' + heroine, {}, {[heroine + '_favor']: 8}, heroine + '_interlude');
      assert.equal(high.seen.at(-1), heroine + '_interlude');
      assert.ok(!high.texts.some(k => k.endsWith('.missed')));
    }
  });
  test(language + ': either relay decision can reach either Kotoha ending', () => {
    for (const race of [0, 1]) for (const presence of [0, 1]) {
      const route = walk(language, 'kotoha_ch10_relay', {
        'route_kotoha.kotoha_ch10_relay.r008': race,
        'route_kotoha.kotoha_ch10_decide.stay': presence,
      });
      assert.ok(route.seen.includes(presence === 0 ? 'kotoha_concert_resume' : 'kotoha_ch12_bad_end'));
      if (presence === 0) assert.ok(route.texts.includes('route_kotoha.kotoha_ch12_good_end.' + (race === 0 ? 'relay_result' : 'training_result')));
      else assert.ok(!route.seen.includes('kotoha_ch11_start'));
    }
  });
  test(language + ': friend invitation is recalled only when chosen', () => {
    for (const invite of [0, 1]) {
      const route = walk(language, 'chapter7_rooftop_move', {'chapter7.chapter7_rooftop_move.r016': invite}, {}, 'chapter7_rooftop');
      assert.equal(route.texts.includes('chapter7.chapter7_mahiru_resume.invitation'), invite === 0);
    }
  });
  test(language + ': Mahiru both actions reach their own ending and messages are narration', () => {
    for (const action of [0, 1]) {
      const route = walk(language, 'mahiru_ch10_monologue', {'route_mahiru.mahiru_ch10_monologue.r005': action});
      assert.ok(route.seen.includes(action === 0 ? 'mahiru_good_end_school' : 'mahiru_bad_end'));
    }
    const file = scope.config.scenarioFilesByLanguage[language].find(f => f.endsWith('/route_mahiru.md'));
    const labels = parser.parse(fs.readFileSync(path.join(root, file), 'utf8'));
    for (const commands of Object.values(labels)) for (const command of commands) {
      if (['$route_mahiru.mahiru_ch9_start.r003', '$route_mahiru.mahiru_ch9_start.r006', '$route_mahiru.mahiru_bad_end.r023'].includes(command.text)) assert.equal(command.cmd, 'narrate');
    }
  });
}

for (const language of ['ja', 'en']) {
  test(language + ': homework check precedes the late-May time jump', () => {
    const route = walk(language, 'chapter3_sakura', {}, {}, 'chapter4_start');
    assert.ok(route.texts.indexOf('chapter3.chapter3_end.r004') < route.texts.indexOf('chapter3.chapter3_end.r001'));
  });
  test(language + ': library talk returns the shelf copy before taking out and lending a private copy', () => {
    for (const talk of [0, 1]) {
      const route = walk(language, 'chapter3_library', {'chapter3.chapter3_library.r007': talk}, {}, 'chapter3_mahiru_photo');
      const own = route.texts.indexOf('chapter3.chapter3_music_room.private_copy');
      const loan = route.texts.indexOf('chapter3.chapter3_library_talk.r022');
      assert.ok(own >= 0 && own < loan);
      const returned = route.texts.indexOf('chapter3.chapter3_library_talk.shelf_return');
      if (talk === 0) assert.ok(returned >= 0 && returned < own);
      else assert.equal(returned, -1);
    }
  });
  test(language + ': declining relay reaches the library on the next day', () => {
    const route = walk(language, 'kotoha_ch10_bad', {}, {}, 'kotoha_ch10_decide');
    assert.ok(route.texts.includes('route_kotoha.kotoha_ch10_bad.next_day'));
  });
  test(language + ': overnight safety instructions are teacher dialogue, not quoted narration', () => {
    const file = language === 'ja' ? 'scenarios/route_mahiru.md' : 'scenarios/en/route_mahiru.md';
    const commands = parser.parse(fs.readFileSync(path.join(root, file), 'utf8')).mahiru_ch12_branch;
    const command = commands.find(c => c.text === '$route_mahiru.mahiru_ch12_branch.teacher_safety');
    assert.ok(command);
    assert.equal(command.cmd, 'say');
    assert.equal(command.char, 'teacher_male');
  });
}

function portraitAt(route, id, character) {
  const row = route.presentation.find(v => v.id === id);
  assert.ok(row, id);
  const portrait = Object.values(row.portraits).find(v => v?.char === character);
  assert.ok(portrait, character + ' at ' + id);
  return portrait.expr;
}
for (const language of ['ja', 'en']) {
  test(language + ': opening Nobuhara calms after placing the papers, and the rewritten voice uses the new recording', () => {
    const route = walk(language, 'chapter1_morning_gate', {}, {}, 'chapter1_homeroom');
    for (const key of ['r003','r006']) assert.equal(portraitAt(route, 'chapter1.chapter1_morning_gate.' + key, 'nobuhara'), 'panic');
    assert.equal(portraitAt(route, 'chapter1.chapter1_morning_gate.r008', 'nobuhara'), 'relieved');
    for (const key of ['r009','r011']) assert.equal(portraitAt(route, 'chapter1.chapter1_morning_gate.' + key, 'nobuhara'), 'happy');
    const manifest = JSON.parse(fs.readFileSync(path.join(root,'assets/voice',language,'manifest.json'),'utf8'));
    assert.ok(manifest.clips['chapter1.chapter1_morning_gate.r009'].src.endsWith('.full-v2.mp3'));
  });
  test(language + ': checking an injury and reassuring the junior have distinct faces on the sports portrait', () => {
    const route = walk(language, 'sakura_ch10_gym', {}, {}, 'sakura_ch10_after_practice');
    assert.equal(portraitAt(route, 'route_sakura.sakura_ch10_gym.r006', 'sakura_sports'), 'serious');
    assert.equal(portraitAt(route, 'route_sakura.sakura_ch10_gym.r010', 'sakura_sports'), 'normal');
  });
  test(language + ': Mahiru cries as her voice breaks, before the next scene', () => {
    const route = walk(language, 'mahiru_ch10_rooftop', {}, {}, 'mahiru_ch11_start');
    assert.equal(portraitAt(route, 'route_mahiru.mahiru_ch10_rooftop.r017', 'mahiru_no_camera'), 'crying');
  });
  test(language + ': apron expression and a listening Sakura change on their actual portraits', () => {
    const cafe = walk(language, 'chapter8_sakura_cafe', {}, {}, 'chapter8_music_room');
    assert.equal(portraitAt(cafe, 'chapter8.chapter8_sakura_cafe.r017', 'sakura_apron'), 'normal');
    const roof = walk(language, 'chapter7_rooftop', {}, {}, 'chapter7_evening_classroom');
    assert.equal(portraitAt(roof, 'chapter7.chapter7_rooftop.r013', 'sakura'), 'normal');
    assert.equal(portraitAt(roof, 'chapter7.chapter7_rooftop.r054', 'sakura'), 'happy');
  });
}
