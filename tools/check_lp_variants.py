"""Check both LPs, translations, mobile layout and comparison events in Edge."""
import json,mimetypes,subprocess,threading,time,urllib.request
from pathlib import Path
import check_opening_movie as browser

OUT=browser.ROOT.parent/'stella-lp-variants-check'
browser.OUT=OUT

def main():
    OUT.mkdir(exist_ok=True);profile=OUT/('edge-profile-'+str(time.time_ns()))
    mimetypes.init()
    # Edge opens many asset connections together; avoid Windows' small backlog.
    class Server(browser.http.server.ThreadingHTTPServer):
        request_queue_size=64
    server=Server(('127.0.0.1',0),browser.Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'edge.log').open('w')
    proc=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--no-proxy-server','--guest','--disable-gpu','--in-process-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--mute-audio','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[];existing_image_warnings=[]
    def passed(message):checks.append(message);print('PASS: '+message,flush=True)
    try:
        deadline=time.monotonic()+25
        while not (profile/'DevToolsActivePort').exists():
            assert time.monotonic()<deadline;time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0])
        targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c=browser.CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable')
        c.send('Network.setBlockedURLs',dict(urls=['https://*']))
        c.send('Emulation.setFocusEmulationEnabled',dict(enabled=True))
        c.send('Page.addScriptToEvaluateOnNewDocument',dict(source="localStorage.setItem('vn_language','ja')"))
        base=f'http://127.0.0.1:{server.server_port}'
        for path,variant in [('/lp/','story'),('/lp/ai/','ai_solo')]:
            c.send('Emulation.setDeviceMetricsOverride',dict(width=1440,height=1000,deviceScaleFactor=1,mobile=False))
            c.send('Page.navigate',dict(url=base+path))
            c.wait("document.readyState==='complete'",40)
            c.wait("window.dataLayer && Array.from(dataLayer).some(e=>e[0]==='event' && e[1]==='lp_view')")
            assert c.evaluate(f"Array.from(dataLayer).filter(e=>e[0]==='event' && e[1]==='lp_view').length===1 && document.body.dataset.lpVariant==='{variant}'")
            if variant=='ai_solo':
                c.wait("[...document.images].filter(i=>i.loading!=='lazy').every(i=>i.complete && i.naturalWidth>0)")
            else:
                existing_image_warnings=c.evaluate("[...document.images].filter(i=>i.complete && !i.naturalWidth).map(i=>new URL(i.src).pathname)")
                if existing_image_warnings:print('WARN: existing LP image requests failed locally: '+str(existing_image_warnings),flush=True)
            c.shot(variant+'-desktop-ja')
            if variant=='ai_solo':
                assert c.evaluate("document.querySelector('video').preload==='none' && document.querySelector('video').paused && !performance.getEntriesByType('resource').some(r=>r.name.includes('stella-op.mp4'))")
                # Every internal section link resolves; no dead placeholder CTA.
                assert c.evaluate("[...document.querySelectorAll('a[href^=\"#\"]')].every(a=>document.querySelector(a.getAttribute('href')))")
            c.evaluate("document.addEventListener('click', e=>{const a=e.target.closest('a[href]');if(a && new URL(a.href).pathname==='/index.html')e.preventDefault()})")
            selector='[data-cta="hero"]' if variant=='ai_solo' else '.hero .button-primary'
            c.click(selector)
            assert c.evaluate(f"Array.from(dataLayer).some(e=>e[1]==='lp_play_click' && e[2].lp_variant==='{variant}' && e[2].cta_position==='hero' && e[2].language==='ja')")
            c.click('.language' if variant=='ai_solo' else '.language-toggle')
            assert c.evaluate("document.documentElement.lang==='en'")
            if variant=='ai_solo':assert c.evaluate("document.querySelector('h1').innerText.includes('One creator.')")
            for width in [390,320]:
                c.send('Emulation.setDeviceMetricsOverride',dict(width=width,height=844,deviceScaleFactor=1,mobile=False))
                c.evaluate("window.scrollTo({top:0,behavior:'instant'})")
                time.sleep(.2)
                assert c.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(variant,width,'overflow')
                c.shot(f'{variant}-mobile-{width}-en')
            if variant=='ai_solo':
                c.click('.language')
                assert c.evaluate("document.documentElement.lang==='ja' && document.querySelector('.lead br')!==null")
                c.send('Emulation.setDeviceMetricsOverride',dict(width=390,height=844,deviceScaleFactor=1,mobile=False))
                c.shot('ai_solo-mobile-ja')
                c.click('[data-cta="footer"]')
                assert c.evaluate("Array.from(dataLayer).some(e=>e[1]==='lp_play_click' && e[2].cta_position==='footer')")
                c.send('Emulation.setDeviceMetricsOverride',dict(width=1440,height=1000,deviceScaleFactor=1,mobile=False))
                c.evaluate("document.querySelector('#making').scrollIntoView({behavior:'instant'})")
                c.shot('ai_solo-making')
                c.evaluate("document.querySelector('#film').scrollIntoView({behavior:'instant'})")
                c.shot('ai_solo-film')
                c.evaluate("document.querySelector('#story').scrollIntoView({behavior:'instant'})")
                c.wait("[...document.images].every(i=>i.complete && i.naturalWidth>0)")
                c.shot('ai_solo-story')
                c.evaluate("document.querySelector('video').muted=true;document.querySelector('video').play()")
                c.wait("document.querySelector('video').currentTime>.2")
                c.evaluate("document.querySelector('video').pause();document.querySelector('video').play()")
                c.wait("document.querySelector('video').currentTime>.4")
                assert c.evaluate("Array.from(dataLayer).filter(e=>e[1]==='lp_op_play').length===1")
                c.evaluate("document.querySelector('video').pause()")
                passed('AI LP: Japanese/English, responsive layout, deferred OP playback and once-only OP event')
            else:
                assert c.evaluate("!!document.querySelector('#update-1-2') && !!document.querySelector('#update-op')")
                passed('Original LP: layout, languages, existing release notes and hero-click event preserved')
        assert not c.errors,c.errors
        report=dict(result='PASS' if not existing_image_warnings else 'PASS_WITH_EXISTING_IMAGE_WARNINGS',checks=checks,existing_image_warnings=existing_image_warnings,javascript_errors=c.errors,analytics='Local dataLayer events verified; remote collection blocked for this test')
        (OUT/'result.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    except Exception:
        if c:
            c.shot('failure');print(c.errors,flush=True)
            print(c.evaluate("[...document.images].filter(i=>!i.complete || !i.naturalWidth).map(i=>({src:i.src,complete:i.complete}))"),flush=True)
        raise
    finally:
        if c:
            try:c.send('Browser.close')
            except Exception:pass
            c.sock.close()
        proc.wait(timeout=10);server.shutdown();server.server_close();log.close()

if __name__=='__main__':main()
