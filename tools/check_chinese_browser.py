"""Exercise Chinese game/LP flows locally in headless Edge with external URLs blocked."""
import http.server,json,mimetypes,subprocess,threading,time,urllib.request
from pathlib import Path
import check_opening_movie as browser

OUT=browser.ROOT.parent/'stella-chinese-check-20261117'
browser.OUT=OUT

def main():
    OUT.mkdir(exist_ok=True)
    profile=OUT/('edge-profile-'+str(time.time_ns()))
    mimetypes.init()
    class Server(http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),browser.Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'edge.log').open('w')
    proc=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--no-proxy-server','--guest','--disable-gpu','--no-first-run','--disable-background-networking','--mute-audio','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    checks=[];c=None
    def passed(value):checks.append(value);print('PASS: '+value,flush=True)
    try:
        deadline=time.monotonic()+25
        while True:
            assert time.monotonic()<deadline,'Edge startup timeout'
            try:
                port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'));break
            except (OSError,IndexError,ValueError):time.sleep(.1)
        c=browser.CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable')
        c.send('Network.setBlockedURLs',dict(urls=['https://*','http://www.*']))
        base=f'http://127.0.0.1:{server.server_port}'
        c.send('Page.addScriptToEvaluateOnNewDocument',dict(source="localStorage.setItem('vn_language','zh-CN')"))
        for page in ['/lp/','/lp/ai/']:
            c.send('Page.navigate',dict(url=base+page));c.wait("document.readyState==='complete'",40)
            for lang in ['zh-CN','zh-TW','en','ja','zh-TW']:
                c.evaluate("(()=>{const s=document.querySelector('.stella-language-select');s.value="+json.dumps(lang)+";s.dispatchEvent(new Event('change',{bubbles:true}));})()")
                c.wait('document.documentElement.lang==='+json.dumps(lang))
                assert c.evaluate('document.title.length>0 && localStorage.getItem("vn_language")==='+json.dumps(lang))
                if lang.startswith('zh-'):
                    remaining=c.evaluate("[...document.querySelectorAll('[data-en]')].filter(n=>/[ぁ-ゖァ-ヺ]/.test(n.textContent)).map(n=>n.textContent)")
                    assert not remaining,remaining
                    assert c.evaluate("document.title.includes('星光')")
                passed(page+' switches to '+lang)
            for width in [390,320]:
                c.send('Emulation.setDeviceMetricsOverride',dict(width=width,height=844,deviceScaleFactor=1,mobile=True))
                assert c.evaluate("document.documentElement.scrollWidth<=innerWidth+1"),[page,width,c.evaluate('document.documentElement.scrollWidth')]
                c.shot(page.strip('/').replace('/','-')+'-zh-TW-'+str(width))
            c.send('Emulation.clearDeviceMetricsOverride')
        c.send('Page.navigate',dict(url=base+'/index.html'))
        c.wait("typeof engine!=='undefined' && engine.scenarioTexts && Object.keys(engine.scenarioTexts).length>3700",100)
        c.wait("document.querySelector('#btn-loading-ok')?.style.visibility===''",100)
        c.click('#btn-loading-ok');c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000')
        c.wait("engine.openingMovie.phase==='idle'",30)
        for lang in ['zh-CN','zh-TW','ja','en','zh-TW']:
            c.evaluate('engine._setLanguage('+json.dumps(lang)+',{returnToTitle:true})')
            assert c.evaluate('engine.currentLanguage==='+json.dumps(lang)+' && document.documentElement.lang==='+json.dumps(lang))
            assert c.evaluate('engine._missingScenarioTexts().length===0')
            assert c.evaluate("engine.voice.language==="+json.dumps('en' if lang=='en' else 'ja'))
            if lang.startswith('zh-'):
                assert c.evaluate("engine.voice.has('chapter1.chapter1_morning_gate.r003',engine.currentLanguage)")
                c.evaluate("VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine._startFromLabel('chapter1_morning_gate')")
                c.wait("getComputedStyle(engine.tx.canvas).display==='none'",30)
                c.wait("!!engine.currentText && !/[ぁ-ゖァ-ヺ]/.test(engine.currentText)")
                assert c.evaluate("!engine.currentText.includes('chapter1.')")
                c.shot('game-'+lang)
                c.evaluate('engine._saveToSlot(91)')
                save=c.evaluate("JSON.parse(localStorage.getItem('vn_save_91'))")
                assert save and save.get('language')==lang,save
                c.evaluate("engine._setLanguage('en',{returnToTitle:true})")
                c.evaluate('engine._loadFromSlot(91)')
                assert c.evaluate('engine.currentLanguage==='+json.dumps(lang)+" && engine.voice.language==='ja' && engine._missingScenarioTexts().length===0")
                passed(lang+': loading a Chinese save from English restores Chinese text and Japanese voice')
            passed('game '+lang+': complete story/bonus text, language and matching voice metadata')
        assert not c.errors,c.errors
        (OUT/'result.json').write_text(json.dumps({'checks':checks,'exceptions':c.errors},ensure_ascii=False,indent=2),encoding='utf-8')
    finally:
        if c:c.sock.close()
        proc.terminate();proc.wait(timeout=10);server.shutdown();log.close()

if __name__=='__main__':main()
