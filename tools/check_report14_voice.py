"""Play shipped Japanese/English voices through the real engine and Web Audio."""
import json
import time


def run(c, passed, out):
    samples=[]

    def language(lang):
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;VN_CONFIG.settings.autoDelay=1;engine._chainMode='none';engine.voice.setVolume(.85);await engine.voice.unlock()})()")
        c.evaluate("""(()=>{
          if(window._voiceProbe?.context===engine.voice.context)return;
          const context=engine.voice.context,analyser=context.createAnalyser(),silent=context.createGain();
          analyser.fftSize=2048;silent.gain.value=0;
          engine.voice.output.connect(analyser);analyser.connect(silent);silent.connect(context.destination);
          const probe={context,analyser,data:new Float32Array(analyser.fftSize),peak:0};window._voiceProbe=probe;
          const sample=()=>{if(window._voiceProbe!==probe)return;
            analyser.getFloatTimeDomainData(probe.data);
            probe.peak=Math.max(probe.peak,Math.sqrt(probe.data.reduce((sum,value)=>sum+value*value,0)/probe.data.length));
            requestAnimationFrame(sample)};sample();
        })()""")

    def advance_to_voice(identity, limit=180):
        for _ in range(limit):
            if c.evaluate('engine._dialogVoiceId==='+json.dumps(identity)):
                return
            c.evaluate('if(engine.waitingForInput&&!engine._inputLocked){engine._stillLockUntil=0;engine._onAdvance()}')
            time.sleep(.04)
        raise AssertionError(c.evaluate('({label:engine.currentLabel,index:engine.currentIndex,voice:engine._dialogVoiceId,text:engine.currentText})'))

    def verify(identity, kind):
        c.wait('engine.voice.session?.id==='+json.dumps(identity)+'&&!!engine.voice.session.source&&engine.voice.session.started',15)
        c.wait('_voiceProbe.peak>.0001',10)
        state=c.evaluate("""(()=>{const voice=engine.voice,session=voice.session;
          return {language:voice.language,id:session?.id,src:voice.clips[session?.id]?.src,
            duration:session?.source?.buffer?.duration,channels:session?.source?.buffer?.numberOfChannels,
            context:voice.context.state,outputGain:voice.output.gain.value,peakRms:_voiceProbe.peak,
            playing:!!session?.started,indicator:document.getElementById('dialog-voice-indicator').classList.contains('is-playing')};})()""")
        assert state['id']==identity and state['playing'] and state['context']=='running' and state['outputGain']>0,state
        assert state['duration']>.05 and state['channels']>=1 and state['peakRms']>.0001,state
        assert state['src'].startswith('assets/voice/'+state['language']+'/'),state
        samples.append(dict(kind=kind,**state))

    for lang in ['ja','en']:
        language(lang)
        for label,role in [('chapter1_homeroom','teacher_male'),('chapter2_start','sakura'),
                           ('chapter1_homeroom','nobuhara'),('chapter7_music_room','kotoha'),('chapter7_rooftop_move','mahiru')]:
            target=c.evaluate("(()=>{const cmd=engine.labels["+json.dumps(label)+"].find(cmd=>cmd.cmd==='say'&&cmd.char==="+json.dumps(role)+");return {id:engine._getVoiceId(cmd),cmd}})()")
            assert target.get('id'), (lang, label, role, target)
            c.evaluate('_voiceProbe.peak=0;engine._startFromLabel('+json.dumps(label)+')')
            advance_to_voice(target['id'])
            c.wait("getComputedStyle(engine.tx.canvas).display==='none'")
            verify(target['id'],label)
        passed(lang+': shipped teacher, Sakura, Nobuhara, Kotoha and Mahiru clips start after scene entry and produce a nonzero voice waveform')

        for profile,role in [('sakura_good_end','sakura'),('kotoha_good_end','kotoha'),('mahiru_good_end','mahiru')]:
            target=c.evaluate("""(()=>{
              engine._resetGameState();engine._gameActive=true;
              document.getElementById('title-screen').classList.add('hidden');document.getElementById('game-screen').classList.remove('hidden');
              const [label,commands]=Object.entries(engine.labels).find(([key,cmds])=>cmds.some(cmd=>cmd.cmd==='ending_intro'&&cmd.profile==="""+json.dumps(profile)+"""));
              engine.currentLabel=label;engine.currentIndex=commands.findIndex(cmd=>cmd.cmd==='ending_intro'&&cmd.profile==="""+json.dumps(profile)+""")+1;
              const cmd=commands.slice(engine.currentIndex).find(cmd=>cmd.cmd==='say'&&cmd.char==="""+json.dumps(role)+""");
              engine._creditsSession=Symbol('voice epilogue check');document.getElementById('credits-screen').classList.remove('hidden');
              _voiceProbe.peak=0;engine._endCredits();return {id:engine._getVoiceId(cmd),cmd};})()""")
            advance_to_voice(target['id'])
            verify(target['id'],'epilogue-'+profile)
            assert c.evaluate("document.getElementById('credits-screen').classList.contains('hidden')")
        passed(lang+': all three playable epilogues retain real spoken dialogue after the credits handoff')

        c.evaluate("window._voiceSavedId=engine._dialogVoiceId;engine._saveToSlot(97);_voiceProbe.peak=0;engine._loadFromSlot(97)")
        identity=c.evaluate('_voiceSavedId')
        verify(identity,'save-load')
        passed(lang+': saving/loading restarts exactly the restored spoken line with its real audio')

        c.evaluate('window._voiceLogIndex=engine.currentIndex;engine._openLog();_voiceProbe.peak=0')
        c.click('.log-entry:last-child .log-voice-btn')
        verify(identity,'log-replay')
        assert c.evaluate('engine.currentIndex===_voiceLogIndex')
        c.click('#btn-log-close')
        assert c.evaluate('engine.voice.session===null')
        passed(lang+': log replay produces real voice output without advancing the story and stops on close')

        c.evaluate("""(()=>{
          const real=Object.values(engine.labels).flat().filter(cmd=>cmd.cmd==='say'&&cmd.char==='sakura'&&engine.voice.has(engine._getVoiceId(cmd)));
          window._voiceRealPair=real.slice(0,2);
          engine.labels.report14_voice_pair=[..._voiceRealPair,{cmd:'click_wait'}];
          _voiceProbe.peak=0;engine._gotoLabel('report14_voice_pair');
        })()""")
        identity=c.evaluate('engine._getVoiceId(_voiceRealPair[0])')
        verify(identity,'before-skip')
        c.evaluate('engine._toggleSkip()')
        c.wait('engine.currentIndex===3&&engine.voice.session===null')
        c.evaluate("if(engine.skipMode)engine._toggleSkip();_voiceProbe.peak=0;engine._gotoLabel('report14_voice_pair')")
        verify(identity,'after-skip')
        passed(lang+': skip silences skipped lines; stopping skip restores real dialogue playback')

        c.evaluate("_voiceProbe.peak=0;engine._gotoLabel('report14_voice_pair');engine._toggleAuto()")
        verify(identity,'auto-first')
        time.sleep(.15)
        assert c.evaluate('engine.currentIndex===1&&!!engine.voice.session?.source')
        second=c.evaluate('engine._getVoiceId(_voiceRealPair[1])')
        c.wait('engine.currentIndex===2&&engine.voice.session?.id==='+json.dumps(second),25)
        verify(second,'auto-next')
        c.evaluate('engine._toggleAuto()')
        passed(lang+': AUTO waits for the spoken clip and then plays the next actual voice')

        c.evaluate('engine._resetGameState();engine._showTitleScreen()')
        assert c.evaluate('engine.voice.session===null')
    assert not c.errors,c.errors
    (out/'voice-playback-samples.json').write_text(json.dumps(samples,ensure_ascii=False,indent=2),encoding='utf8')
    passed('No uncaught browser errors; resets and language changes stop previous voice sessions')


if __name__=='__main__':
    import sys
    import check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-debug-report14-voice-20261022/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True)
    check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--report14-voice-only')
    check_report11.main()
