"""Verify real shipped bonus dialogue through the production voice output."""
import json
import time


def run(c, passed, out):
    samples=[]
    for lang in ['ja','en']:
        c.evaluate('(async()=>{engine._resetGameState();engine._showTitleScreen();await engine._setLanguage('+json.dumps(lang)+",{returnToTitle:true});engine.seenGoodEnds=new Set(['sakura','kotoha','mahiru']);await engine.bonus.start();VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine.voice.setVolume(.85);await engine.voice.unlock()})()")
        c.evaluate("""(()=>{
          if(window._bonusVoiceProbe?.context===engine.voice.context)return;
          const context=engine.voice.context,analyser=context.createAnalyser(),silent=context.createGain();
          analyser.fftSize=2048;silent.gain.value=0;engine.voice.output.connect(analyser);analyser.connect(silent);silent.connect(context.destination);
          const probe={context,analyser,data:new Float32Array(analyser.fftSize),peak:0};window._bonusVoiceProbe=probe;
          const tick=()=>{if(window._bonusVoiceProbe!==probe)return;analyser.getFloatTimeDomainData(probe.data);probe.peak=Math.max(probe.peak,Math.sqrt(probe.data.reduce((s,v)=>s+v*v,0)/probe.data.length));requestAnimationFrame(tick)};tick();
        })()""")
        def verify(identity):
            c.wait('engine.voice.session?.id==='+json.dumps(identity)+'&&!!engine.voice.session.source&&engine.voice.session.started',15)
            c.wait('_bonusVoiceProbe.peak>.0001',10)
            state=c.evaluate("(()=>{const s=engine.voice.session;return {id:s?.id,src:engine.voice.clips[s?.id]?.src,duration:s?.source?.buffer?.duration,context:engine.voice.context.state,peak:_bonusVoiceProbe.peak,volume:engine.voice.output.gain.value}})()")
            assert state['id']==identity and state['context']=='running' and state['peak']>.0001 and state['duration']>.1 and state['volume']>0,state
            assert state['src'].startswith('assets/voice/'+lang+'/bonus/'),state
            samples.append(dict(language=lang,**state))
        retakes=c.evaluate("fetch('assets/voice/bonus-production.json').then(r=>r.json()).then(m=>[...(m.reading_revision?.ids||[]),...(m.report16_revision?.ids||[])])") if lang=='ja' else []
        suffixes=[identity.removeprefix('bonus.') for identity in retakes]+['r006','r013','r051','r079','r104','r107','r112','r126','r129','r166','r195','r217','r220','r234','r252','r272']
        for suffix in suffixes:
            identity='bonus.'+suffix
            c.evaluate("(()=>{const entry=Object.entries(engine.labels).find(([label,cmds])=>label.startsWith('bonus_')&&cmds.some(cmd=>cmd.cmd==='say'&&cmd.text==="+json.dumps('$'+identity)+"));engine._stopTypewriter();engine.currentLabel=entry[0];engine.currentIndex=entry[1].findIndex(cmd=>cmd.cmd==='say'&&cmd.text==="+json.dumps('$'+identity)+");engine._inputLocked=false;engine._skipLocked=false;engine.skipMode=engine.autoMode=false;_bonusVoiceProbe.peak=0;engine._executeNext()})()")
            verify(identity)
        passed(lang+': five bonus roles, mahjong calls, AA dialogue, Yukkuri and teacher intrusion play real MP3s and produce nonzero voice output')
        identity='bonus.r272'
        c.evaluate('engine._saveToSlot(96);_bonusVoiceProbe.peak=0;engine._loadFromSlot(96)')
        verify(identity)
        c.evaluate('engine._openLog();_bonusVoiceProbe.peak=0;window._bonusVoiceIndex=engine.currentIndex')
        c.click('.log-entry:last-child .log-voice-btn');verify(identity)
        assert c.evaluate('engine.currentIndex===_bonusVoiceIndex')
        c.click('#btn-log-close');assert c.evaluate('engine.voice.session===null')
        passed(lang+': bonus save/load and log replay use the correct actual clip without changing story progress')
        c.evaluate("engine.labels.__bonus_voice_skip=[{cmd:'say',char:'sakura',text:'$bonus.r006'},{cmd:'click_wait'}];engine.skipMode=true;_bonusVoiceProbe.peak=0;engine._gotoLabel('__bonus_voice_skip')")
        time.sleep(.1);assert c.evaluate('engine.voice.session===null')
        c.evaluate('engine._resetGameState();engine._showTitleScreen()')
    c.evaluate("(async()=>{await engine._setLanguage('ja',{returnToTitle:true});engine._startFromLabel('chapter1_homeroom')})()")
    for _ in range(120):
        if c.evaluate("engine._dialogVoiceId==='chapter1.chapter1_homeroom.r001'"):break
        c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.04)
    c.wait("engine.voice.session?.id==='chapter1.chapter1_homeroom.r001'&&!!engine.voice.session.source",15)
    assert not c.errors,c.errors
    passed('Skipping/reset stops bonus voices; returning to the main game retains the existing teacher voice; no browser exceptions')
    (out/'bonus-voice-samples.json').write_text(json.dumps(samples,ensure_ascii=False,indent=2),encoding='utf8')


if __name__=='__main__':
    import sys
    import check_bonus_scenario
    sys.argv.append('--voice-only')
    check_bonus_scenario.main()
