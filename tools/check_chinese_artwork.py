"""Check localized artwork, static share pages and language handoff in real Edge."""
import http.server
import json
import re
import subprocess
import threading
import time
import urllib.request
from pathlib import Path
import check_opening_movie as browser

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'stella-chinese-artwork-check-20261117'

def main():
    OUT.mkdir(exist_ok=True);browser.OUT=OUT
    profile=OUT/('check-profile-'+str(time.time_ns()))
    class Server(http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),browser.Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'check-edge.log').open('w')
    process=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--disable-gpu','--no-first-run','--disable-background-networking','--mute-audio','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[]
    def passed(message):checks.append(message);print('PASS',message,flush=True)
    try:
        deadline=time.monotonic()+30
        while not (profile/'DevToolsActivePort').exists():assert time.monotonic()<deadline;time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c=browser.CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable');c.send('Network.setBlockedURLs',{'urls':['https://*']})
        c.send('Page.addScriptToEvaluateOnNewDocument',{'source':"localStorage.setItem('vn_language','en')"})
        from campaign_test_country import install
        install(c)
        base=f'http://127.0.0.1:{server.server_port}'
        for folder in ['lp','lp/ai']:
            for language in ['zh-CN','zh-TW']:
                relative=f'{folder}/index.{language}.html'
                raw=urllib.request.urlopen(base+'/'+relative).read().decode('utf-8')
                assert re.search(r'<html[^>]*lang="'+language+'"',raw)
                assert f'og.{language}-v1.png' in re.search(r'<meta property="og:image"[^>]*>',raw)[0]
                assert ('放学后的星光' if language=='zh-CN' else '放學後的星光') in re.search(r'<title>(.*?)</title>',raw,re.S)[1]
                assert '127.0.0.1' not in raw,'Local build URL leaked into static page'
                c.send('Page.navigate',{'url':base+'/'+relative})
                c.wait("document.readyState==='complete' && document.documentElement.lang==="+json.dumps(language),40)
                c.wait("[...document.querySelectorAll('[data-stella-media=poster], [data-stella-media=logo]')].every(i=>i.complete&&i.naturalWidth>0)")
                assert c.evaluate("document.querySelector('[data-stella-media=poster]').src.includes('poster."+language+"-v1.webp')")
                assert c.evaluate("[...document.querySelectorAll('.hero a[href],.closing a[href],.final-cta a[href]')].filter(a=>new URL(a.href).pathname.endsWith('/index.html')).every(a=>new URL(a.href).searchParams.get('lang')==="+json.dumps(language)+")")
                c.click('.voice-play')
                c.wait("document.querySelector('.voice-play').dataset.state==='playing'",30)
                c.click('.voice-play')
                assert c.evaluate("document.querySelector('.voice-status').textContent===''")
                c.evaluate('scrollTo(0,0)')
                c.shot(folder.replace('/','-')+'-'+language+'-desktop')
                assert c.evaluate("document.querySelector('.campaign-lp').hidden")
                c.evaluate("document.querySelector('[data-campaign-open]').click()")
                assert c.evaluate("!document.querySelector('#stella-campaign-dialog[open]')")
                for target in ['en','zh-TW','ja',language]:
                    c.evaluate("(()=>{const s=document.querySelector('.stella-language-select');s.value="+json.dumps(target)+";s.dispatchEvent(new Event('change',{bubbles:true}))})()")
                    c.wait('document.documentElement.lang==='+json.dumps(target))
                    if target.startswith('zh-'):
                        assert c.evaluate("[...document.querySelectorAll('[data-en]')].every(n=>n.textContent===StellaI18n.text(StellaI18n.sourceFor(n).text,"+json.dumps(target)+"))")
                    if target=='ja':assert c.evaluate("document.title.includes('放課後のステラ')")
                for width in [390,320]:
                    c.send('Emulation.setDeviceMetricsOverride',{'width':width,'height':844,'deviceScaleFactor':1,'mobile':True})
                    assert c.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),[relative,width]
                    c.evaluate('scrollTo(0,0)');c.shot(folder.replace('/','-')+'-'+language+'-'+str(width))
                c.send('Emulation.clearDeviceMetricsOverride')
                passed(relative+': static Chinese text/OG, artwork, four-language roundtrip, hidden campaign, game link and mobile widths')
        c.send('Page.navigate',{'url':base+'/index.html?lang=zh-CN'})
        c.wait("document.querySelector('#btn-loading-ok')?.style.visibility===''",100)
        c.click('#btn-loading-ok');c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000')
        c.wait("engine.openingMovie.phase==='idle'")
        assert c.evaluate("engine.currentLanguage==='zh-CN'"),'Explicit game URL lost to saved English'
        for language in ['zh-CN','zh-TW','ja','en']:
            c.evaluate('engine._setLanguage('+json.dumps(language)+',{returnToTitle:true})')
            expected='title_logo_'+language+'-v1.webp' if language.startswith('zh-') else 'title_logo_en.webp' if language=='en' else 'title_logo.webp'
            c.wait("document.querySelector('#title-logo-img').src.includes("+json.dumps(expected)+") && document.querySelector('#title-logo-img').complete && document.querySelector('#title-logo-img').naturalWidth>0")
            assert c.evaluate("new URL(location.href).searchParams.get('lang')==="+json.dumps(language))
            if language.startswith('zh-'):
                c.send('Emulation.setDeviceMetricsOverride',{'width':390,'height':844,'deviceScaleFactor':1,'mobile':True})
                assert c.evaluate("!/[ぁ-ゖァ-ヺ]/.test(document.querySelector('#rotate-overlay').textContent)")
                c.shot('game-rotate-'+language)
                c.send('Emulation.setDeviceMetricsOverride',{'width':844,'height':390,'deviceScaleFactor':1,'mobile':True})
                c.wait("(()=>{const r=document.querySelector('#title-logo-img').getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1&&r.height>0})()",10)
                c.shot('game-title-'+language);c.send('Emulation.clearDeviceMetricsOverride')
            passed('game '+language+': correct title artwork and explicit language URL')
        assert not c.errors,c.errors
        (OUT/'result.json').write_text(json.dumps({'checks':checks,'javascript_errors':c.errors},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    finally:
        if c:c.sock.close()
        process.terminate();process.wait(timeout=10);server.shutdown();log.close()

if __name__=='__main__':main()
