"""Real Korean game/LP/OP checks in isolated Edge; no remote translation or analytics."""
import argparse,http.server,json,subprocess,threading,time,urllib.request
from pathlib import Path
import check_opening_movie as browser
from campaign_test_country import install
ROOT=browser.ROOT
OUT=ROOT.parent/'stella-korean-check-20261118'

def main(text_only=False):
    OUT.mkdir(exist_ok=True);browser.OUT=OUT;profile=OUT/('edge-profile-'+str(time.time_ns()))
    class Server(http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),browser.Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'edge.log').open('w');process=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--disable-gpu','--no-first-run','--disable-background-networking','--mute-audio','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[]
    def passed(value):checks.append(value);print('PASS',value,flush=True)
    try:
        deadline=time.monotonic()+35
        while True:
            assert time.monotonic()<deadline,'Edge startup timeout'
            try:
                port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'));break
            except (OSError,IndexError,ValueError):time.sleep(.1)
        c=browser.CDP(next(v['webSocketDebuggerUrl'] for v in targets if v['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable');c.send('Network.setBlockedURLs',{'urls':['https://*']})
        install(c);c.send('Page.addScriptToEvaluateOnNewDocument',{'source':"localStorage.setItem('vn_language','en')"})
        base=f'http://127.0.0.1:{server.server_port}'
        for folder in ['lp','lp/ai']:
            url=base+'/'+folder+'/index.ko.html';raw=urllib.request.urlopen(url).read().decode('utf-8')
            assert 'lang="ko"' in raw and '127.0.0.1' not in raw and 'og.ko-v1.png' in raw
            c.send('Page.navigate',{'url':url});c.wait("document.readyState==='complete'&&document.documentElement.lang==='ko'",60)
            c.wait("[...document.querySelectorAll('img[data-stella-media]')].filter(i=>i.loading!=='lazy').every(i=>i.complete&&i.naturalWidth>0)",40)
            assert c.evaluate("document.title.includes('방과 후의 스텔라')")
            remaining=c.evaluate("[...document.querySelectorAll('[data-en]')].map(n=>n.textContent.replaceAll('#放課後のステラ','')).filter(v=>/[ぁ-ゖァ-ヺ]/.test(v))")
            assert not remaining,remaining
            assert c.evaluate("document.querySelector('.campaign-lp').hidden&&!StellaCampaignVisibility.allowed")
            c.evaluate("document.querySelector('[data-campaign-open]').click()")
            assert c.evaluate("!document.querySelector('#stella-campaign-dialog[open]')")
            assert c.evaluate("document.querySelector('[data-stella-media=poster]').src.includes('poster.ko-v1.webp')")
            data=json.load(urllib.request.urlopen(c.evaluate("document.querySelector('link[rel=manifest]').href")))
            assert data['lang']=='ko' and 'lang=ko' in data['start_url']
            assert c.evaluate("[...document.querySelectorAll('.hero a[href],.closing a[href],.final-cta a[href]')].filter(a=>new URL(a.href).pathname.endsWith('/index.html')).every(a=>new URL(a.href).searchParams.get('lang')==='ko')")
            if not text_only:
                c.click('.voice-play');c.wait("document.querySelector('.voice-play').dataset.state==='playing'",30);c.click('.voice-play')
                c.evaluate("(()=>{const v=document.querySelector('#lp-op');v.muted=true;return v.play()})()")
                c.wait("document.querySelector('#lp-op').currentTime>.3&&document.querySelector('#lp-op track').readyState===2",40)
                assert c.evaluate("document.querySelector('#lp-op').currentSrc.includes('stella-op-ko-v148.mp4')&&document.querySelector('#lp-op track').srclang==='ko'&&document.querySelector('#lp-op track').track.cues.length===16")
                c.evaluate("document.querySelector('#lp-op').pause()")
            for width in [390,320]:
                c.send('Emulation.setDeviceMetricsOverride',{'width':width,'height':844,'deviceScaleFactor':1,'mobile':True});assert c.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),[folder,width]
                c.evaluate('scrollTo(0,0)');c.shot(folder.replace('/','-')+'-ko-'+str(width))
            c.send('Emulation.clearDeviceMetricsOverride')
            for lang in ['ja','en','zh-CN','zh-TW','ko']:
                c.evaluate("(()=>{const s=document.querySelector('.stella-language-select');s.value="+json.dumps(lang)+";s.dispatchEvent(new Event('change',{bubbles:true}))})()")
                c.wait('document.documentElement.lang==='+json.dumps(lang));assert c.evaluate('localStorage.getItem("vn_language")==='+json.dumps(lang))
                if lang=='ko':assert c.evaluate("document.title.includes('방과 후의 스텔라')&&document.querySelector('.campaign-lp').hidden")
            passed(folder+': Korean static metadata/images, manifest, language handoff, five-language roundtrip, mobile widths and hidden campaign'+('' if text_only else ', real voice/OP/subtitles'))
        if text_only:return
        c.send('Page.navigate',{'url':base+'/index.html?lang=ko'})
        c.wait("typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",120)
        c.click('#btn-loading-ok');c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000');c.wait("engine.openingMovie.phase==='idle'")
        assert c.evaluate("engine.currentLanguage==='ko'&&engine.voice.language==='ko'&&engine._missingScenarioTexts().length===0")
        assert c.evaluate("document.querySelector('#title-logo-img').src.includes('title_logo_ko-v1.webp')&&document.querySelector('[data-campaign-open]').hidden")
        c.evaluate("VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine._startFromLabel('chapter1_morning_gate')")
        c.wait("!!engine.currentText&&/[가-힣]/.test(engine.currentText)")
        c.evaluate('engine._saveToSlot(91)');assert c.evaluate("JSON.parse(localStorage.getItem('vn_save_91')).language==='ko'")
        c.evaluate("engine._setLanguage('en',{returnToTitle:true})");c.evaluate('engine._loadFromSlot(91)')
        assert c.evaluate("engine.currentLanguage==='ko'&&engine.voice.language==='ko'&&engine._missingScenarioTexts().length===0")
        c.evaluate("engine.voice.setVolume(.85);engine.labels.__korean_audio_check=[{cmd:'say',char:'sakura',text:'$chapter1.chapter1_morning_gate.r016'},{cmd:'click_wait'}];engine._gotoLabel('__korean_audio_check')")
        c.wait("engine.voice.session?.id==='chapter1.chapter1_morning_gate.r016'&&!!engine.voice.session?.source",30)
        c.shot('game-ko');c.evaluate('engine._openLog()');c.click('.log-voice-btn');c.wait("!!engine.voice.session?.source",30);c.click('#btn-log-close')
        passed('Game Korean text/NPC voice/log and English-to-Korean save restoration')
        c.evaluate('engine._resetGameState();engine._showTitleScreen();engine.openingMovie.play()')
        c.wait("engine.openingMovie.phase==='playing'&&engine.openingMovie.video.currentTime>.4",40)
        c.wait("engine.openingMovie.video.querySelector('track').readyState===2",40)
        state=c.evaluate("(()=>{const v=engine.openingMovie.video,t=v.querySelector('track');return {src:v.currentSrc,width:v.videoWidth,height:v.videoHeight,cues:t.track.cues.length,language:t.srclang,audio:v.webkitAudioDecodedByteCount}})()")
        assert state['src'].split('?',1)[0].endswith('stella-op-ko-v148.mp4') and state['width']==1920 and state['height']==1080 and state['audio']>0 and state['language']=='ko' and state['cues']==16,state
        c.key('Escape');c.wait("engine.openingMovie.phase==='idle'");passed('Korean 1080p OP/audio/subtitles and keyboard skip')
        assert not c.errors,c.errors
        (OUT/'result.json').write_text(json.dumps({'checks':checks,'media':state,'javascript_errors':c.errors},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    finally:
        if c:c.sock.close()
        process.terminate();process.wait(timeout=10);server.shutdown();log.close()

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--text-only',action='store_true');a=p.parse_args();main(a.text_only)
