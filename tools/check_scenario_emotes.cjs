// Explore branch alternatives with the production parser and presentation state.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const scope = vm.createContext({console});
vm.runInContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8') + '\nthis.config=VN_CONFIG;', scope);
vm.runInContext(fs.readFileSync(path.join(root, 'parser.js'), 'utf8') + '\nthis.Parser=ScriptParser;', scope);
const canonical = key => scope.config.characters[key]?.speakerKey || key;
const positions = ['left','center','right'];
const heldText = new Set(['chapter3.chapter3_start.r008','chapter3.chapter3_start.r025']);
for (const language of ['ja','en']) {
  const labels = {};
  for (const file of scope.config.scenarioFilesByLanguage[language]) Object.assign(labels, new scope.Parser().parse(fs.readFileSync(path.join(root,file),'utf8')));
  test(language + ': every branch emote has a visible target, no covering still, and bounded posture', () => {
    const queue = [['start',0,[null,null,null],null]], seen = new Set(), reached = new Set();
    for (let q=0;q<queue.length;q++) {
      const [label,index,initial,cg] = queue[q], stamp = JSON.stringify(queue[q]);
      if (seen.has(stamp)) continue;
      seen.add(stamp); assert.ok(seen.size < 100000, 'Traversal must converge');
      const command = labels[label]?.[index]; if (!command) continue;
      const state = initial.map(p => p && {...p}); let still=cg;
      const target = p => p && (p.char===command.target || canonical(p.char)===command.target);
      const clear = () => state.forEach(p => {if (p) p.held=null;});
      switch(command.cmd) {
        case 'show': state[positions.indexOf(command.pos)]={char:command.char,expr:command.expr,held:null};break;
        case 'hide_all': state.fill(null);break;
        case 'hide': state.forEach((p,i)=>{if (p?.char===command.target || positions[i]===command.target)state[i]=null;});break;
        case 'expr': state.forEach(p=>{if(p?.char===command.char && p.expr!==command.expr){p.expr=command.expr;p.held=null;}});break;
        case 'move': {const i=state.findIndex(p=>p?.char===command.char);if(i>=0){const p=state[i];state[i]=null;p.held=null;state[positions.indexOf(command.pos)]=p;}break;}
        case 'scene': clear();break;
        case 'still': still=command.image;clear();break;
        case 'still_hide': still=null;break;
        case 'emote': {
          const selected=state.filter((p,i)=>target(p)||p && (command.target==='all'||command.target===positions[i]));
          assert.ok(selected.length>0,`${label}:${index} targets a hidden character`);
          if(command.name!=='clear') {
            assert.equal(cg,null,`${label}:${index} is covered by ${cg}`);
            assert.ok(command.strength>=.35 && command.strength<=.5,'Story movement remains restrained');
            reached.add(label+':'+index);
          }
          selected.forEach(p=>p.held=['slump','fall'].includes(command.name)?command.name:null);
          break;
        }
      }
      if(command.text && state.some(p=>p?.held)) {
        assert.ok(heldText.has(command.text.slice(1)), `Held posture leaks into ${command.text}`);
      }
      if(command.cmd==='end'||command.cmd==='choice')assert.ok(!state.some(p=>p?.held),'No held posture at branch or ending');
      let destinations;
      if(command.cmd==='jump')destinations=[[command.to,0]];
      else if(command.cmd==='if')destinations=[[command.to,0],[label,index+1]];
      else if(command.cmd==='choice')destinations=command.options.map(v=>[v.next,0]);
      else if(command.cmd==='end')destinations=command.next?[[command.next,0]]:[];
      else destinations=[[label,index+1]];
      for(const [next,i] of destinations)queue.push([next,i,state,still]);
    }
    const expected=Object.values(labels).reduce((n,commands)=>n+commands.filter(c=>c.cmd==='emote' && c.name!=='clear').length,0);
    assert.ok(expected>0,'Story contains emotes');assert.equal(reached.size,expected,'Every authored cue is reachable');
  });
  test(language + ': heavy scenes and Bad Ends keep comic effects out', () => {
    const heavy=/bad_end|interlude|chapter1_last_classroom|chapter5_mahiru_window|chapter7_sakura_break|chapter7_rooftop$|chapter8_(sakura_crisis|kotoha_crisis|mahiru_missing|branch)|sakura_ch10_outside|sakura_ch11_hospital|kotoha_ch10_start|kotoha_ch11_start|mahiru_ch(9|10|11)|mahiru_good_end_dawn/;
    for(const [label,commands] of Object.entries(labels))if(heavy.test(label))assert.ok(!commands.some(c=>c.cmd==='emote' && c.name!=='clear'),label);
    for(const commands of Object.values(labels))for(const c of commands)if(c.cmd==='emote')assert.ok(!['anger','heart','joy','fall','sigh','tremble'].includes(c.name),'Keep ornamental and dramatic presets out of this direction pass');
  });
}
