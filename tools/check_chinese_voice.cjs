const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const json=name=>JSON.parse(read(name));
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const scope=vm.createContext({console});
vm.runInContext(read('config.js')+';this.config=VN_CONFIG;',scope);
vm.runInContext(read('parser.js')+';this.Parser=ScriptParser;',scope);
vm.runInContext(read('bonus-scenario-data.js')+';this.bonus=VN_BONUS;',scope);
const audit=json('docs/chinese-voice-audit.json');
const measurements=new Map(audit.clips.map(clip=>[clip.audio_key,clip]));
for(const language of ['zh-CN','zh-TW'])test(language+': every NPC has a decoded, measured Chinese clip matching the current text',()=>{
  const voiced=new Map(),silent=new Set();
  const scripts=[...scope.config.scenarioFilesByLanguage[language].map(read),scope.bonus.script];
  for(const script of scripts)for(const commands of Object.values(new scope.Parser().parse(script)))for(const command of commands){
    if(command.cmd==='say'){
      const role=scope.config.characters[command.char]?.speakerKey||command.char;
      if(role==='player')silent.add(command.text.slice(1));
      else voiced.set(command.text.slice(1),role);
    }else if(command.cmd==='narrate')silent.add(command.text.slice(1));
  }
  const manifest=json(scope.config.voice.manifests[language]);
  assert.equal(manifest.language,language);
  assert.equal(voiced.size,1196);
  assert.deepEqual(new Set(Object.keys(manifest.clips)),new Set(voiced.keys()));
  const entries=new Map(audit.entries.filter(s=>s.language===language).map(s=>[s.id,s]));
  assert.equal(entries.size,1196);
  const text={...json(`locales/scenario.${language}.json`),...Object.fromEntries(Object.entries(json(`locales/bonus.${language}.json`)).map(([key,value])=>['bonus.'+key,value]))};
  for(const [id,clip] of Object.entries(manifest.clips)){
    assert.equal(silent.has(id),false,id);
    const entry=entries.get(id),measurement=measurements.get(entry.audio_key);
    assert.equal(entry.character,voiced.get(id));
    assert.equal(entry.source_text_sha256,hash(text[id]),id+' text changed');
    assert.equal(clip.src,measurement.src);
    assert.equal(clip.gainDb,measurement.gainDb);
    assert.ok(clip.src.startsWith('assets/voice/zh/chinese-v1-20261117/'));
    assert.equal(hash(fs.readFileSync(path.join(root,clip.src))),measurement.sha256);
    assert.ok(measurement.duration>0.1 && measurement.duration<60);
    assert.ok(Number.isFinite(clip.gainDb)&&clip.gainDb>=-12&&clip.gainDb<=12);
    assert.ok(measurement.peakDbFS+clip.gainDb<=-1);
    assert.ok(Number.isFinite(measurement.activeRmsDbFS));
  }
});
test('Chinese manifests share identical takes and preserve original Japanese/English manifests',()=>{
  assert.equal(audit.unique_audio_count,1240);
  assert.equal(measurements.size,1240);
  assert.equal(audit.entries.length,2392);
  const paths=new Set(['zh-CN','zh-TW'].flatMap(l=>Object.values(json(`assets/voice/${l}/manifest.json`).clips).map(c=>c.src)));
  assert.equal(paths.size,1240);
  for(const language of ['ja','en'])assert.equal(hash(fs.readFileSync(path.join(root,`assets/voice/${language}/manifest.json`))),audit.original_manifests_sha256[language]);
  assert.equal(scope.config.voice.languageMap?.['zh-CN'],undefined);
  assert.equal(scope.config.voice.languageMap?.['zh-TW'],undefined);
  assert.equal(audit.subjective_listening,false);
});
