"""Real-media audit of EN/CN/TW landing pages, all four OPs and manifests."""
import argparse,http.server,json,re,subprocess,threading,time,urllib.request
from pathlib import Path
import check_opening_movie as browser
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'stella-multilingual-completion-20261117'

def main(pages_only=False):
    OUT.mkdir(exist_ok=True);browser.OUT=OUT;profile=OUT/('edge-profile-'+str(time.time_ns()))
    class Server(http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),browser.Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'edge.log').open('w')
    process=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--disable-gpu','--no-first-run','--disable-background-networking','--mute-audio','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[];media=[]
    def passed(value):checks.append(value);print('PASS',value,flush=True)
    try:
        deadline=time.monotonic()+30
        while not (profile/'DevToolsActivePort').exists():assert time.monotonic()<deadline;time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c=browser.CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable');c.send('Network.setBlockedURLs',{'urls':['https://*']})
        c.send('Page.addScriptToEvaluateOnNewDocument',{'source':"localStorage.setItem('vn_language','ja')"})
        base=f'http://127.0.0.1:{server.server_port}'
        for folder in ['lp','lp/ai']:
            for lang in ['en','zh-CN','zh-TW']:
                path=f'{folder}/index.{lang}.html';raw=urllib.request.urlopen(base+'/'+path).read().decode('utf-8')
                assert re.search(r'<html[^>]*lang="'+lang+'"',raw)
                assert 'og.'+lang+'-v1.png' in re.search(r'<meta property="og:image"[^>]*>',raw)[0]
                assert '127.0.0.1' not in raw
                c.send('Page.navigate',{'url':base+'/'+path});c.wait("document.readyState==='complete' && document.documentElement.lang==="+json.dumps(lang),60)
                c.wait("[...document.querySelectorAll('img[data-stella-media]')].filter(i=>i.loading!=='lazy').every(i=>i.complete&&i.naturalWidth>0)",40)
                assert c.evaluate("document.querySelector('[data-stella-media=poster]').src.includes('poster."+lang+"-v1.webp')")
                manifest=c.evaluate("document.querySelector('link[rel=manifest]').href")
                data=json.load(urllib.request.urlopen(manifest));assert data['lang']==lang and 'lang='+lang in data['start_url']
                if lang=='en':
                    assert c.evaluate("document.title.includes('After School Stella')")
                    remaining=c.evaluate("[...document.querySelectorAll('[alt],[aria-label],[title]')].flatMap(n=>['alt','aria-label','title'].map(a=>n.getAttribute(a)||'')).filter(s=>/[ぁ-ゖァ-ヺ]/.test(s))")
                    assert not remaining,remaining
                c.click('.voice-play');c.wait("document.querySelector('.voice-play').dataset.state==='playing'",30);c.click('.voice-play')
                for width in [390,320]:
                    c.send('Emulation.setDeviceMetricsOverride',{'width':width,'height':844,'deviceScaleFactor':1,'mobile':True})
                    assert c.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),[folder,lang,width]
                    c.evaluate('scrollTo(0,0)');c.shot(folder.replace('/','-')+'-'+lang+'-'+str(width))
                c.send('Emulation.clearDeviceMetricsOverride')
                if not pages_only:
                    c.evaluate("(()=>{const v=document.querySelector('#lp-op');v.muted=true;return v.play()})()")
                    c.wait("document.querySelector('#lp-op').currentTime>.3 && document.querySelector('#lp-op track')?.readyState===2",40)
                    assert c.evaluate("document.querySelector('#lp-op').currentSrc.includes('stella-op-"+lang+"-')")
                    assert c.evaluate("document.querySelector('#lp-op track').srclang==="+json.dumps(lang)+" && document.querySelector('#lp-op track').track.cues.length===16")
                    c.evaluate("document.querySelector('#lp-op').pause()")
                for target in ['ja','en','zh-TW',lang]:
                    c.evaluate("(()=>{const s=document.querySelector('.stella-language-select');s.value="+json.dumps(target)+";s.dispatchEvent(new Event('change',{bubbles:true}))})()")
                    c.wait('document.documentElement.lang==='+json.dumps(target))
                    if target=='en':assert c.evaluate("[...document.querySelectorAll('[data-en]')].every(n=>n.textContent===n.dataset.en)")
                passed(path+': static share metadata, artwork, app language, voice preview, mobile layout'+('' if pages_only else ', OP and 16 subtitle cues'))
        if pages_only:
            assert not c.errors,c.errors
            (OUT/'pages-result.json').write_text(json.dumps({'checks':checks,'javascript_errors':c.errors},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
            return
        c.send('Page.navigate',{'url':base+'/index.html?lang=en'})
        c.wait("document.querySelector('#btn-loading-ok')?.style.visibility===''",120)
        c.click('#btn-loading-ok');c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000');c.wait("engine.openingMovie.phase==='idle'")
        for lang in ['ja','en','zh-CN','zh-TW']:
            c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(lang)+',{returnToTitle:true});engine.openingMovie.play()})()')
            c.wait("engine.openingMovie.phase==='playing' && engine.openingMovie.video.currentTime>.4",40)
            if lang.startswith('zh-'):
                assert c.evaluate("!/[ぁ-ゖァ-ヺ]/.test(engine.openingMovie.skipButton.textContent+engine.openingMovie.playButton.textContent+engine.openingMovie.screen.getAttribute('aria-label'))")
            if lang=='ja':
                assert c.evaluate("engine.openingMovie.video.querySelector('track').track.mode==='disabled'")
                c.click('#op-movie-captions')
            c.wait("engine.openingMovie.video.querySelector('track').readyState===2",40)
            state=c.evaluate("(()=>{const v=engine.openingMovie.video,t=v.querySelector('track');return {language:engine.currentLanguage,src:v.currentSrc,width:v.videoWidth,height:v.videoHeight,duration:v.duration,audioBytes:v.webkitAudioDecodedByteCount,subtitleLanguage:t.srclang,cues:t.track.cues.length,mode:t.track.mode}})()")
            assert state['src'].split('?',1)[0].endswith('stella-op-'+lang+('-v147.mp4' if lang.startswith('zh-') else '-v143.mp4'))
            assert [state['width'],state['height']]==[1920,1080] and abs(state['duration']-102.866667)<.1
            assert state['audioBytes']>0 and state['subtitleLanguage']==lang and state['cues']==16
            assert state['mode']=='showing'
            c.evaluate("engine.openingMovie.video.currentTime=18;engine.openingMovie.captionsButton.focus()")
            before=c.evaluate('engine.openingMovie.video.textTracks[0].mode');c.key('Enter')
            assert c.evaluate("engine.openingMovie.phase==='playing' && engine.openingMovie.video.textTracks[0].mode!=="+json.dumps(before))
            if c.evaluate("engine.openingMovie.video.textTracks[0].mode!=='showing'"):c.click('#op-movie-captions')
            c.wait("engine.openingMovie.video.textTracks[0].activeCues.length===1")
            c.shot('op-subtitles-'+lang);media.append(state)
            c.key('Escape');c.wait("engine.openingMovie.phase==='idle'")
            manifest=c.evaluate("document.querySelector('link[rel=manifest]').href");data=json.load(urllib.request.urlopen(manifest));assert data['lang']==lang
            passed('game '+lang+': 1080p OP/audio, localized 16-cue subtitles, keyboard toggle/skip and app language')
        assert not c.errors,c.errors
        (OUT/'result.json').write_text(json.dumps({'checks':checks,'media':media,'javascript_errors':c.errors},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    finally:
        if c:c.sock.close()
        process.terminate();process.wait(timeout=10);server.shutdown();log.close()

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--pages-only',action='store_true');args=parser.parse_args();main(args.pages_only)
