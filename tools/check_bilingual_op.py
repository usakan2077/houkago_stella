"""Language-specific OP playback, persisted startup, failure recovery and audio."""
import json
import time

def run(c,passed,out):
    results=[]
    for language in ['ja','en']:
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(language)+",{returnToTitle:true});VN_CONFIG.settings.bgmVolume=.27;engine.openingMovie.play()})()")
        c.wait("engine.openingMovie.phase==='playing'&&engine.openingMovie.video.currentTime>.4",25)
        state=c.evaluate("(()=>{const o=engine.openingMovie,v=o.video;return {language:engine.currentLanguage,source:v.currentSrc,width:v.videoWidth,height:v.videoHeight,duration:v.duration,time:v.currentTime,volume:v.volume,audioBytes:v.webkitAudioDecodedByteCount}})()")
        assert state['source'].endswith('stella-op-'+language+'-v143.mp4'),state
        assert state['width']==1920 and state['height']==1080 and abs(state['duration']-102.8667)<.1,state
        assert abs(state['volume']-.27)<.01 and state['audioBytes']>0,state
        c.evaluate('engine.openingMovie.video.currentTime=95')
        c.wait('engine.openingMovie.video.currentTime>=95&&engine.openingMovie.video.readyState>=2')
        time.sleep(.15);c.shot('opening-title-'+language)
        results.append(state)
        c.key('Escape');c.wait("engine.openingMovie.phase==='idle'")
        assert c.evaluate("!document.getElementById('title-screen').classList.contains('hidden')&&engine.currentBGM===VN_CONFIG.titleBGM")
        passed(language+': matching 1080p OP has real video/audio, follows BGM volume and skips back to title')
    c.evaluate("localStorage.setItem('vn_language','en');window._opBeforeReload=true;engine._resetGameState();engine._showTitleScreen()")
    c.send('Page.reload',dict(ignoreCache=True));time.sleep(.5)
    c.wait("!window._opBeforeReload&&typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",150)
    assert c.evaluate("engine.currentLanguage==='en'&&engine.openingMovie.currentSource===VN_CONFIG.openingMovies.en")
    c.click('#btn-loading-ok')
    c.wait("engine.openingMovie.phase==='playing'&&engine.openingMovie.video.currentTime>.4",25)
    assert c.evaluate("engine.openingMovie.video.currentSrc.endsWith('stella-op-en-v143.mp4')&&document.getElementById('op-movie-skip').textContent==='Skip to title'")
    c.key('Escape');c.wait("engine.openingMovie.phase==='idle'")
    c.evaluate('VN_CONFIG.openingMovieIdleMs=3600000')
    passed('Persisted English starts the English OP immediately after loading, including English skip controls')
    c.evaluate("VN_CONFIG.openingMovies.ja='assets/video/op-intentionally-missing.mp4';engine.currentLanguage='ja';engine.openingMovie.play()")
    c.wait("engine.openingMovie.failed&&engine.openingMovie.phase==='idle'",25)
    c.evaluate('VN_CONFIG.openingMovieIdleMs=500')
    time.sleep(1)
    assert c.evaluate("engine.openingMovie.phase==='idle'")
    passed('A missing language-specific movie falls back to the title without a retry loop')
    c.evaluate("engine.currentLanguage='en';VN_CONFIG.openingMovieIdleMs=3600000;engine.openingMovie.play()")
    c.wait("engine.openingMovie.phase==='playing'&&engine.openingMovie.video.currentTime>.3",25)
    assert c.evaluate("!engine.openingMovie.failed&&engine.openingMovie.video.currentSrc.endsWith('stella-op-en-v143.mp4')")
    c.key('Escape');c.wait("engine.openingMovie.phase==='idle'")
    passed('Switching languages recovers from another language’s failed movie and plays the available OP')
    (out/'bilingual-op-media.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8')

if __name__=='__main__':
    import sys,check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-camera-op-20261023/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True);check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--bilingual-op-only');check_report11.main()
