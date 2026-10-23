// Verify the shipped voice manifest against every NPC line parsed from the game scripts.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),scope=vm.createContext({console});
vm.runInContext(fs.readFileSync(path.join(root,'config.js'),'utf8')+'\nthis.config=VN_CONFIG;',scope);vm.runInContext(fs.readFileSync(path.join(root,'parser.js'),'utf8')+'\nthis.Parser=ScriptParser;',scope);
const bonusProductionPath=path.join(root,'assets/voice/bonus-production.json');
const bonusProduction=fs.existsSync(bonusProductionPath)?JSON.parse(fs.readFileSync(bonusProductionPath,'utf8')):null;
if(bonusProduction)vm.runInContext(fs.readFileSync(path.join(root,'bonus-scenario-data.js'),'utf8')+'\nthis.bonus=VN_BONUS;',scope);
for(const language of ['ja','en'])test(language+': every NPC line has a real voice, and unvoiced text is excluded',()=>{
 const voiced=new Set(),unvoiced=new Set();
 for(const file of scope.config.scenarioFilesByLanguage[language])for(const commands of Object.values(new scope.Parser().parse(fs.readFileSync(path.join(root,file),'utf8'))))for(const c of commands){
  if(c.cmd==='say'){const role=scope.config.characters[c.char]?.speakerKey||c.char;(role==='player'?unvoiced:voiced).add(c.text.slice(1));}
  if(c.cmd==='narrate')unvoiced.add(c.text.slice(1));
 }
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/voice',language,'manifest.json'),'utf8'));
 if(bonusProduction){
  const crypto=require('node:crypto');
  for(const commands of Object.values(new scope.Parser().parse(scope.bonus.script)))for(const c of commands){
   if(c.cmd==='narrate'||(c.cmd==='say'&&c.char==='player'))unvoiced.add(c.text.slice(1));
   else if(c.cmd==='say'){
    const id=c.text.slice(1),metadata=bonusProduction.clips[language+':'+id];
    assert.ok(metadata,id);assert.equal(metadata.character,c.char);voiced.add(id);
    const text=scope.bonus.texts[language][id.slice('bonus.'.length)];
    assert.equal(metadata.source_text_sha256,crypto.createHash('sha256').update(text).digest('hex'),'Bonus voice text changed: '+id);
    assert.equal(metadata.src,manifest.clips[id]?.src);assert.equal(metadata.gainDb,manifest.clips[id]?.gainDb);
    assert.equal(metadata.sha256,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,metadata.src))).digest('hex'));
   }
  }
 }
 assert.equal(manifest.language,language);assert.ok(voiced.size>1000);assert.deepEqual(new Set(Object.keys(manifest.clips)),voiced);
 for(const [id,clip]of Object.entries(manifest.clips)){
  assert.ok(!unvoiced.has(id));assert.ok(clip.src.startsWith('assets/voice/'+language+'/'));const absolute=path.resolve(root,clip.src);
  assert.ok(absolute.startsWith(path.join(root,'assets','voice',language)+path.sep));assert.ok(fs.statSync(absolute).size>=1024,id);
  assert.ok(Number.isFinite(clip.gainDb)&&clip.gainDb>=-12&&clip.gainDb<=12,id);
 }
});
