const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8'),json=name=>JSON.parse(read(name));
function setup(){
  const scope=vm.createContext({navigator:{language:'ko-KR'},setTimeout,clearTimeout,AbortController});
  vm.runInContext(read('chinese-locales.js')+read('korean-locales.js')+read('config.js')+';this.config=VN_CONFIG;',scope);
  vm.runInContext(read('game.js').replace('const engine = new VNEngine();','this.Engine=VNEngine;'),scope);
  return scope;
}
test('Korean browser locales select Korean and existing four language normalizations remain available',()=>{
  const s=setup();
  for(const value of ['ko','ko-KR','ko_KR','KO-kr','ko-KP'])assert.equal(s.StellaI18n.normalize(value),'ko');
  for(const [value,expected] of [['ja-JP','ja'],['en-US','en'],['zh-HK','zh-TW'],['zh-SG','zh-CN']])assert.equal(s.StellaI18n.normalize(value),expected);
  assert.equal(s.StellaI18n.browserLanguage(),'ko');
  assert.ok(s.config.i18n.supportedLanguages.includes('ko'));
});
test('Korean interface covers all Japanese config labels including placeholders, names and opening text',()=>{
  const s=setup(),i18n=s.StellaI18n;
  function check(value){for(const v of Object.values(value)){if(v&&typeof v==='object')check(v);else if(typeof v==='string'){
    assert.ok(Object.hasOwn(i18n.dictionaries.ko,v),'Missing Korean label: '+v);
    assert.deepEqual(i18n.text(v,'ko').match(/\{\w+\}/g)||[],v.match(/\{\w+\}/g)||[]);
  }}}
  check(s.config.i18n.labels.ja);
  assert.equal(i18n.text('桜咲さくら','ko'),'사쿠라자키 사쿠라');
  assert.equal(i18n.text('桐島 勇','ko'),'키리시마 이사무');
  for(const v of s.config.openingLinesByLanguage.ja)assert.notEqual(i18n.text(v,'ko'),v);
});
test('Every main and extra text ID has authored Korean text with unchanged variables and markup',()=>{
  for(const [kind,count] of [['scenario',3460],['bonus',285]]){
    const ja=json(`locales/${kind}.ja.json`),ko=json(`locales/${kind}.ko.json`);
    assert.equal(Object.keys(ko).length,count);assert.deepEqual(Object.keys(ko).sort(),Object.keys(ja).sort());
    for(const [id,value] of Object.entries(ko)){
      assert.equal(typeof value,'string');assert.ok(value.trim());assert.doesNotMatch(value,/[ぁ-ゖァ-ヺ]/u,id);
      assert.deepEqual(value.match(/\{\w+\}/g)||[],ja[id].match(/\{\w+\}/g)||[],id);
      assert.deepEqual(value.match(/<\/?\w+[^>]*>/g)||[],ja[id].match(/<\/?\w+[^>]*>/g)||[],id);
    }
  }
});
test('Korean shares original story commands, uses native media and has 16 subtitle cues',()=>{
  const s=setup();assert.deepEqual(Array.from(s.config.scenarioFilesByLanguage.ko),Array.from(s.config.scenarioFilesByLanguage.ja));
  assert.equal(s.config.scenarioTextFiles.ko,'locales/scenario.ko.json');
  assert.equal(s.config.voice.manifests.ko,'assets/voice/ko/manifest.json');
  assert.ok(fs.existsSync(path.join(root,s.config.titleLogos.ko.src)));
  assert.match(s.config.openingMovies.ko,/stella-op-ko-v148\.mp4$/);
  assert.equal((read('assets/video/subtitles/op.ko-v1.vtt').match(/ --> /g)||[]).length,16);
  for(const name of ['manifest.ko.webmanifest','lp/site.ko.webmanifest']){const data=json(name);assert.equal(data.lang,'ko');assert.match(data.start_url,/lang=ko/);}
});
test('All NPC Korean clips match current story IDs, hashes, roles and decoded levels',()=>{
  const s=setup();vm.runInContext(read('parser.js')+';this.Parser=ScriptParser;'+read('bonus-scenario-data.js')+';this.bonus=VN_BONUS;',s);
  const voiced=new Map();
  for(const script of [...s.config.scenarioFilesByLanguage.ko.map(read),s.bonus.script])for(const cmds of Object.values(new s.Parser().parse(script)))for(const c of cmds)if(c.cmd==='say'){
    const role=s.config.characters[c.char]?.speakerKey||c.char;if(role!=='player')voiced.set(c.text.slice(1),role);
  }
  const manifest=json('assets/voice/ko/manifest.json'),audit=json('docs/korean-voice-audit.json');
  assert.equal(manifest.language,'ko');assert.equal(voiced.size,1196);assert.deepEqual(new Set(Object.keys(manifest.clips)),new Set(voiced.keys()));
  assert.equal(Object.keys(manifest.clips).filter(k=>k.startsWith('bonus.')).length,156);
  const entries=new Map(audit.entries.map(v=>[v.id,v])),measured=new Map(audit.clips.map(v=>[v.audio_key,v]));
  const texts={...json('locales/scenario.ko.json'),...Object.fromEntries(Object.entries(json('locales/bonus.ko.json')).map(([k,v])=>['bonus.'+k,v]))};
  const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
  for(const [id,clip] of Object.entries(manifest.clips)){
    const e=entries.get(id),m=measured.get(e.audio_key);assert.equal(e.character,voiced.get(id));assert.equal(e.source_text_sha256,hash(texts[id]),id);
    assert.equal(clip.src,m.src);assert.match(clip.src,/^assets\/voice\/ko\/korean-v1-20261118\//);
    assert.equal(hash(fs.readFileSync(path.join(root,clip.src))),m.sha256);
    assert.ok(Number.isFinite(clip.gainDb)&&clip.gainDb>=-12&&clip.gainDb<=12);
    assert.ok(m.peakDbFS+clip.gainDb<=-1);assert.ok(m.duration>.1&&m.duration<60);assert.ok(Number.isFinite(m.activeRmsDbFS));
  }
});
