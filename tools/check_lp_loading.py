"""Ensure LPs paint before a stalled locale script and avoid eager lower-page media."""
import http.server,json,subprocess,threading,time,urllib.request
from pathlib import Path
import check_opening_movie as browser
from campaign_test_country import install
OUT=browser.ROOT.parent/'lp-performance-20261118/checks'
def main():
    OUT.mkdir(exist_ok=True);browser.OUT=OUT;gate=threading.Event()
    class Handler(browser.Handler):
        def do_GET(self):
            if '/chinese-locales.js' in self.path:gate.wait(30)
            super().do_GET()
    class Server(http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
    profile=OUT/('profile-'+str(time.time_ns()));log=(OUT/'edge.log').open('w')
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    proc=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--disable-gpu','--no-first-run','--disable-background-networking','--mute-audio','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[]
    try:
        deadline=time.monotonic()+30
        while True:
            assert time.monotonic()<deadline
            try:
                port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);tabs=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'));break
            except (OSError,ValueError,IndexError):time.sleep(.1)
        c=browser.CDP(next(t['webSocketDebuggerUrl'] for t in tabs if t['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable');c.send('Network.setCacheDisabled',{'cacheDisabled':True})
        c.send('Network.setBlockedURLs',{'urls':['https://*']});install(c)
        for folder in ['lp','lp/ai']:
            for lang in ['ja','ko']:
                gate.clear();path=folder+'/index'+('' if lang=='ja' else '.ko')+'.html?lang='+lang
                url=f'http://127.0.0.1:{server.server_port}/'+path
                c.send('Page.navigate',{'url':url})
                c.wait("location.href==="+json.dumps(url)+"&&!!document.querySelector('#hero-title')&&performance.getEntriesByName('first-contentful-paint').length>0",10)
                assert c.evaluate("typeof StellaI18n==='undefined'&&getComputedStyle(document.querySelector('#hero-title')).visibility==='visible'")
                assert c.evaluate("[...document.querySelectorAll('[data-japan-campaign]')].every(n=>n.hidden)")
                gate.set();c.wait("document.readyState==='complete'&&document.documentElement.lang==='"+lang+"'",40)
                assert c.evaluate("!document.querySelector('script[src*=\"platform.twitter.com/widgets.js\"]')")
                eager=c.evaluate("performance.getEntriesByType('resource').filter(v=>/\\.(mp3|mp4)(?:\\?|$)/.test(v.name)&&v.encodedBodySize>0).map(v=>({name:v.name,bytes:v.encodedBodySize}))")
                assert not eager,eager
                assert c.evaluate("[...document.querySelectorAll('img')].filter(i=>!i.closest('.hero,.site-header,.header')).every(i=>i.loading==='lazy')")
                hero=c.evaluate("document.querySelector('.hero-poster,.poster-frame img').src")
                if lang=='ja':assert hero.endswith('poster-v1.webp'),hero
                if folder=='lp':
                    c.evaluate("document.querySelector('.x-embed-shell').scrollIntoView({block:'center'})")
                    c.wait("document.querySelectorAll('script[src*=\"platform.twitter.com/widgets.js\"]').length===1")
                label=path+': visible before locale script finishes; no eager media payload or X; lower images lazy'
                checks.append(label);print('PASS',label,flush=True)
        assert not c.errors,c.errors
        (OUT/'result.json').write_text(json.dumps({'checks':checks,'javascript_errors':c.errors},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    finally:
        gate.set()
        if c:c.sock.close()
        proc.terminate();proc.wait(timeout=10);server.shutdown();log.close()
if __name__=='__main__':main()
