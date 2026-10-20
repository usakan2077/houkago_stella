"""Report 13 regressions against the actual engine, DOM and media clock."""
import json
import time


def run(c, passed, out):
    assert c.evaluate('_report13Clicks.length===0'), c.evaluate('_report13Clicks')
    c.click('#btn-title-settings')
    assert c.evaluate('_report13Clicks.length===1&&_report13Clicks[0]===VN_CONFIG.clickSE')
    c.click('#btn-settings-close')
    c.evaluate('engine._playSE=_report13PlaySE')
    passed('Loading OK has no click SE; normal buttons retain their click sound')
    assert c.evaluate("VN_CONFIG.releaseNotes.every(n=>n.ja.length>=1&&n.ja.length<=3&&n.en.length>=1&&n.en.length<=3)&&document.querySelector('#title-version').textContent==='ver 1.3.4'")
    passed('Game shows the new version and concise bilingual patch notes')

    def language(lang):
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none'})()")

    # Real still lock and real timeout: no override of the minimum hold.
    c.evaluate("""engine.labels.report13_still=[
      {cmd:'still',image:'kotoha_piano_side',effect:'fade_in'},
      {cmd:'narrate',text:'report13 first'},
      {cmd:'still_hide',effect:'fade_out'},
      {cmd:'narrate',text:'report13 second'},
      {cmd:'click_wait'}];engine._startFromLabel('report13_still')""")
    c.wait("engine.currentText==='report13 first'")
    c.evaluate('engine._onAdvance()')
    assert c.evaluate("engine.currentText==='report13 first'&&engine._stillLockUntil>Date.now()")
    c.evaluate('window._stillSkipAt=performance.now();engine._toggleSkip()')
    c.wait("engine.currentText==='report13 second'&&engine.currentIndex===5",1)
    assert c.evaluate("performance.now()-_stillSkipAt<900&&!engine.currentStill&&!engine._stillHideWaitTimer")
    passed('Ordinary reading retains the CG hold; enabling skip bypasses it without stopping')

    c.evaluate("engine._startFromLabel('report13_still');engine._executeNext()")
    assert c.evaluate('!!engine._stillHideWaitTimer')
    c.evaluate('engine._toggleSkip()')
    c.wait("engine.currentText==='report13 second'&&engine.currentIndex===5",1)
    time.sleep(2.3)
    assert c.evaluate("engine.currentIndex===5&&!engine._stillHideWaitTimer")
    passed('Enabling skip during a pending CG hide cancels the old timer and advances exactly once')

    c.evaluate("engine.labels.report13_reset=[{cmd:'narrate',text:'reset sentinel'},{cmd:'click_wait'}];engine._startFromLabel('report13_still');engine._executeNext();engine._startFromLabel('report13_reset')")
    time.sleep(2.3)
    assert c.evaluate("engine.currentText==='reset sentinel'&&engine.currentIndex===1")
    passed('Leaving a scene cancels its pending CG timeout')

    c.evaluate("engine._startFromLabel('report13_reset');engine.skipMode=true;engine._gotoLabel('report13_still');window._skippedCGVisible=engine.currentStill==='kotoha_piano_side'&&!document.getElementById('still-layer').classList.contains('hidden');window._activeSkipAt=performance.now()")
    assert c.evaluate('_skippedCGVisible&&engine._stillLockUntil===0')
    c.wait("engine.currentText==='report13 second'&&engine.currentIndex===5",1)
    assert c.evaluate('performance.now()-_activeSkipAt<900')
    passed('An already active skip still displays each CG and proceeds without a minimum hold')

    # Exercise the actual route entry in both languages, including the
    # asynchronous credits outro. Ordinary ending body holds are unrelated
    # to this check; only those are bypassed to reach the reported boundary.
    routes=[('kotoha_ch12_good_end','kotoha_good_end','street_plaza_summer',13),
            ('mahiru_good_end_school','mahiru_good_end','commute_road_autumn_evening',14)]
    def reach_coda(label):
        c.evaluate('engine._startFromLabel('+json.dumps(label)+')')
        for _ in range(220):
            if c.evaluate("!!document.getElementById('ending-coda')"): return
            c.evaluate('engine._stillLockUntil=0;engine._onAdvance()')
            time.sleep(.012)
        raise AssertionError('Did not reach ending coda: '+label)

    for lang in ['ja','en']:
        language(lang)
        for label,profile,bg,onset in routes:
            reach_coda(label)
            assert c.evaluate("document.getElementById('ending-coda').dataset.page==='1'")
            # Pause the real media clock: captions and the ED must not run
            # ahead while a browser is buffering or playback is suspended.
            c.evaluate('engine.bgmAudio.pause();window._pausedIntroTime=engine.bgmAudio.currentTime')
            time.sleep(.4)
            assert c.evaluate("document.getElementById('ending-coda').dataset.page==='1'&&!engine._creditsSession")
            c.evaluate('engine.bgmAudio.play()')
            c.wait("document.getElementById('ending-coda')?.dataset.page==='2'",7)
            c.wait("document.getElementById('ending-coda')?.dataset.page==='3'",7)
            c.shot('report13-coda-'+profile+'-'+lang)
            c.wait('!!engine._creditsAnimEnd',8)
            media_time=c.evaluate('engine.bgmAudio.currentTime')
            assert onset-.2<=media_time<onset+1.6,(lang,profile,media_time)
            first_cue='lyrics[0].text[0]' if lang=='ja' else 'lyricsEn[0][0]'
            c.wait("document.getElementById('credits-lyrics').textContent.includes(VN_CONFIG.creditsProfiles["+json.dumps(profile)+"]."+first_cue+")")
            c.shot('report13-credits-'+profile+'-'+lang)
            # The next cue is relative to vocal entry; absolute seeking and
            # pausing cannot shift it by the former 18-second intro value.
            c.evaluate('engine.bgmAudio.pause();engine.bgmAudio.currentTime='+str(onset+VN_CUE[profile]+.15))
            c.wait("document.getElementById('credits-lyrics').textContent.includes(VN_CONFIG.creditsProfiles["+json.dumps(profile)+"]."+('lyrics[1].text[0]' if lang=='ja' else 'lyricsEn[1][0]')+")")
            if lang=='en' and profile=='mahiru_good_end':
                c.evaluate("document.getElementById('credits-roll').dispatchEvent(new AnimationEvent('animationend',{animationName:'creditsScroll'}))")
            else:
                c.evaluate('engine._skipCredits()')
            c.wait('engine.currentBG==='+json.dumps(bg)+"&&engine.waitingForInput")
            c.wait("getComputedStyle(document.getElementById('transition-canvas')).display==='none'")
            assert c.evaluate("getComputedStyle(document.getElementById('background')).backgroundImage.includes("+json.dumps(bg)+")&&!engine._creditsSession&&!engine.currentStill")
            c.shot('report13-epilogue-'+profile+'-'+lang)
            passed(lang+': '+profile+' shows all closing pages, enters credits at '+str(round(media_time,2))+'s, follows song cues and opens its clean epilogue')

    # Skip on the first visible frame, then again during the 820ms outro.
    language('ja')
    for phase in ['first-frame','outro']:
        reach_coda('kotoha_ch12_good_end')
        begin="engine._clearEndingIntro();window._oldCreditsText=engine.currentText;engine._showCredits('きみと触れる音.mp3','kotoha_good_end');"
        skip='engine._skipCredits();window._epilogueIndex=engine.currentIndex;engine._skipCredits()'
        if phase=='outro':
            c.evaluate(begin+'void 0')
            c.wait("document.getElementById('still-layer').classList.contains('ending-intro-out')")
            c.evaluate(skip)
        else:
            c.evaluate(begin+skip)
        time.sleep(1.5)
        assert c.evaluate("engine.currentIndex===_epilogueIndex&&engine.currentBG==='street_plaza_summer'&&engine.currentText!==_oldCreditsText&&!engine.currentStill&&!engine._creditsSession&&document.getElementById('credits-screen').classList.contains('hidden')&&getComputedStyle(document.getElementById('background')).backgroundImage.includes('street_plaza_summer')&&engine.currentBGM==='epilogue_sunset_for_each.mp3'")
        c.shot('report13-early-skip-'+phase)
        passed('Skipping credits at '+phase+' cannot revive old visuals or music, or advance the epilogue twice')

    reach_coda('mahiru_good_end_school')
    c.evaluate("engine._clearEndingIntro();engine._showCredits('理由のない明日へ.mp3','mahiru_good_end');void 0")
    c.wait("document.getElementById('still-layer').classList.contains('ending-intro-out')")
    c.evaluate("engine.labels.report13_reset=[{cmd:'narrate',text:'reset sentinel'},{cmd:'click_wait'}];engine._startFromLabel('report13_reset');engine._showStill('sakura_epilogue','instant')")
    time.sleep(1.2)
    assert c.evaluate("engine.currentText==='reset sentinel'&&engine.currentStill==='sakura_epilogue'&&document.getElementById('still-layer').style.backgroundImage.includes('sakura_epilogue')&&document.getElementById('credits-screen').classList.contains('hidden')")
    passed('Reset during the credits outro cannot erase the next scene CG')


VN_CUE={'kotoha_good_end':14,'mahiru_good_end':26}

if __name__=='__main__':
    import sys,check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-debug-report13-20261021/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True)
    check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--report13-only')
    check_report11.main()
