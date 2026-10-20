"""Real-browser report-12 regressions. Reuses the isolated Edge runner."""
import json,time

def run(c, passed, out):
    def start(label):
        c.evaluate('engine._startFromLabel('+json.dumps(label)+')')
    def advance_until(expression, limit=260):
        for _ in range(limit):
            if c.evaluate(expression):return
            c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.015)
        raise AssertionError((expression,c.evaluate('({label:engine.currentLabel,key:engine._curLineKey,index:engine.currentIndex})')))
    def language(lang):
        c.evaluate("(async()=>{await engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none'})()")

    assert c.evaluate('_configuredOPIdleMs===30000')
    c.evaluate('VN_CONFIG.openingMovieIdleMs=_configuredOPIdleMs;engine.openingMovie.idleSince=performance.now()-28500')
    time.sleep(.4)
    assert c.evaluate("engine.openingMovie.phase==='idle'")
    c.evaluate('engine.openingMovie.idleSince=performance.now()-30100')
    c.wait("engine.openingMovie.phase!=='idle'")
    c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000')
    c.wait("engine.openingMovie.phase==='idle'")
    passed('Actual OP idle poll waits 30 seconds; it stays idle before the threshold and replays after it')

    good=[('sakura_good_end_rooftop','route_sakura.sakura_good_end_rooftop','sakura_good_end_rooftop'),
          ('kotoha_ch12_good_end','route_kotoha.kotoha_ch12_good_end','kotoha_concert_resume'),
          ('mahiru_good_end_school','route_mahiru.mahiru_good_end_school','mahiru_good_end_school')]
    bad=[('bad_end_ending','bad_end.bad_end_ending'),('sakura_bad_end_final','route_sakura.sakura_bad_end_final'),
         ('kotoha_ch12_bad_end','route_kotoha.kotoha_ch12_bad_end'),('mahiru_bad_end','route_mahiru.mahiru_bad_end')]
    for lang in ['ja','en']:
        language(lang)
        start('chapter1_homeroom')
        advance_until("engine._curLineKey==='$chapter1.chapter1_homeroom.r001'")
        assert c.evaluate("document.getElementById('dialog-text').textContent.includes('\\n')&&getComputedStyle(document.getElementById('dialog-text')).whiteSpace==='pre-line'")
        c.shot('report12-teacher-'+lang)
        start('chapter1_lunch')
        advance_until("engine._curLineKey==='$chapter1.chapter1_lunch.pack_up'")
        advance_until("engine._curLineKey==='$chapter1.chapter1_after_school_intro.r001'")
        assert c.evaluate("engine.currentBG==='classroom_evening'")
        c.wait("getComputedStyle(document.getElementById('transition-canvas')).display==='none'")
        c.shot('report12-after-school-'+lang)
        passed(lang+': teacher line breaks explicitly; lunch packs away before classes; after-school uses evening classroom')

        for label,prefix,actual_label in good:
            start(label)
            advance_until("!!document.getElementById('ending-coda')")
            assert c.evaluate('engine.currentLabel==='+json.dumps(actual_label))
            assert c.evaluate("document.getElementById('ending-coda').textContent===engine._resolveScenarioText("+json.dumps('$'+prefix+'.coda001')+")")
            c.shot('report12-'+label+'-page1-'+lang)
            c.wait("document.getElementById('ending-coda')?.dataset.page==='2'",7)
            c.wait("document.getElementById('ending-coda')?.dataset.page==='3'",7)
            c.shot('report12-'+label+'-page3-'+lang)
            c.wait("!document.getElementById('credits-screen').classList.contains('hidden')&&!document.getElementById('ending-coda')",8)
            c.wait('!!engine._creditsAnimEnd')
            c.evaluate('engine._skipCredits()')
            advance_until("!document.getElementById('ending-screen').classList.contains('hidden')")
            passed(lang+': '+label+' runs all three timed closing pages, credits and playable epilogue to END')

        for label,prefix in bad:
            start(label)
            first='$'+prefix+'.coda001'
            advance_until('engine._curLineKey==='+json.dumps(first))
            time.sleep(.4)
            assert c.evaluate('engine._curLineKey==='+json.dumps(first)+"&&!document.getElementById('ending-coda')&&document.getElementById('credits-screen').classList.contains('hidden')")
            advance_until('engine._curLineKey==='+json.dumps('$'+prefix+'.coda003'))
            c.shot('report12-'+label+'-manual-'+lang)
            advance_until("!document.getElementById('credits-screen').classList.contains('hidden')")
            assert c.evaluate("!document.getElementById('ending-coda')")
            c.wait('!!engine._creditsAnimEnd');c.evaluate('engine._skipCredits()')
            c.wait("!document.getElementById('ending-screen').classList.contains('hidden')")
            passed(lang+': '+label+' waits for input through closing text and enters credits without an automatic text passage')

    # A second actual branch must use the same ending profile after convergence.
    language('ja');start('kotoha_relay_finished')
    advance_until("!!document.getElementById('ending-coda')")
    assert c.evaluate("engine.currentLabel==='kotoha_concert_resume'&&document.getElementById('ending-coda').dataset.page==='1'")
    c.evaluate('engine._resetGameState();engine._showTitleScreen()')
    time.sleep(1)
    assert c.evaluate("!document.getElementById('ending-coda')&&document.getElementById('credits-screen').classList.contains('hidden')")
    passed('Both Kotoha concert branches reach their closing text; reset cancels delayed pages and credits')

    # Test the reported command-boundary case and a final group with no following shared text.
    c.evaluate("(async()=>{for(const src of ['editor/js/scenario-io.js','editor/js/line-editor.js']){const s=document.createElement('script');s.src=src;document.head.append(s);await new Promise((ok,no)=>{s.onload=ok;s.onerror=no})}})()")
    fixture=r"""(()=>{const box=document.createElement('div');box.id='editor-fixture';document.body.append(box);const ja=ScenarioIO.parse('# fixture\n> $fixture.r001\n@bgm stop\nplayer: $fixture.r002\n> $fixture.tail\n@scene classroom fade\n'),en=ScenarioIO.parse('# fixture\n> $fixture.r001\n> $fixture.r001.s002\n> $fixture.r001.s003\n@bgm stop\nplayer: $fixture.r002\n> $fixture.tail\n> $fixture.tail.s002\n@scene classroom fade\n');window._edits=[];EditorLineEditor.init(box,{onTextChange:(...a)=>_edits.push(a)});EditorLineEditor.setLocales({ja:{'fixture.r001':'日本語','fixture.r002':'次へ','fixture.tail':'最後'},en:{'fixture.r001':'English','fixture.r001.s002':'Second sentence','fixture.r001.s003':'Third sentence','fixture.r002':'Next','fixture.tail':'Final','fixture.tail.s002':'Final continuation'}});EditorLineEditor.setEnglishScenario('fixture.md',en);EditorLineEditor.showLabel('fixture.md','fixture',ja,ScenarioIO.extractLabels(ja)[0]);})()"""
    c.evaluate(fixture)
    for key,index in [('fixture.r001.s002',2),('fixture.r001.s003',2),('fixture.tail.s002',5)]:
        assert c.evaluate("(()=>{const extra=document.querySelector('[data-keyfield=\""+key+"::en\"]'),command=document.querySelector('#editor-fixture [data-line-idx=\""+str(index)+"\"]');return !!extra&&!!command&&!!(extra.compareDocumentPosition(command)&Node.DOCUMENT_POSITION_FOLLOWING)})()")
    c.evaluate("(()=>{const t=document.querySelector('[data-keyfield=\"fixture.r001.s003::en\"] textarea');t.value='edited';t.dispatchEvent(new Event('input',{bubbles:true}))})()")
    assert c.evaluate("_edits.some(a=>a[0]==='fixture.r001.s003'&&a[1]==='en'&&a[2]==='edited')")
    c.evaluate("document.getElementById('editor-fixture').remove()")
    passed('English-only middle and final continuations display before BGM/scene commands and edit their unchanged keys')

    audio=c.evaluate("(async()=>{const data=await fetch('docs/voice-review/report12.json').then(r=>r.json());const context=new OfflineAudioContext(1,44100,44100);const clips=[];for(const row of data.clips){for(const version of ['before','after']){const response=await fetch(row[version].src);if(!response.ok)throw new Error(row[version].src);const buffer=await context.decodeAudioData(await response.arrayBuffer());clips.push({id:row.id,version,duration:buffer.duration})}}return clips})()")
    assert len(audio)==4 and all(r['duration']>.1 for r in audio)
    (out/'report12-audio-checks.json').write_text(json.dumps(dict(status='PASS',clips=audio,subjective_listening=False),ensure_ascii=False,indent=2),encoding='utf8')
    passed('Two new and two preserved prior retakes decode from their installed paths; subjective review remains separate')

    base=c.evaluate('location.origin')
    for page in ['emote-preview.html','message-menu.html']:
        c.send('Page.navigate',dict(url=base+'/tools/previews/'+page))
        c.wait("document.readyState==='complete'")
        assert c.evaluate("new URL(document.baseURI).pathname==='/'")
        if page=='emote-preview.html':
            c.wait("document.getElementById('portrait')?.complete&&document.getElementById('portrait').naturalWidth>0")
            assert c.evaluate("typeof VNCharacterEmote!=='undefined'")
        c.shot('report12-preview-'+page.replace('.html',''))
    passed('Moved development preview pages resolve shared scripts/images from the game root')

if __name__=='__main__':
    import sys,check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-debug-report12-20261020/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True)
    check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--report12-only')
    check_report11.main()
