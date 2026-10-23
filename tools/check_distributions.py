"""Check extracted portal builds in Edge, including an itch-style iframe."""
from pathlib import Path
import argparse,base64,hashlib,importlib.util,json,subprocess,threading,time,urllib.parse,urllib.request

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('browser',ROOT/'tools/check_opening_movie.py')
h=importlib.util.module_from_spec(spec);spec.loader.exec_module(h)

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--build',type=Path,required=True);parser.add_argument('--profile',choices=['plicy','itchio'],required=True)
    args=parser.parse_args();dest=args.build/args.profile;out=args.build/'verification'/args.profile;out.mkdir(parents=True,exist_ok=True)
    files={p.relative_to(dest).as_posix() for p in dest.rglob('*') if p.is_file()};missing=[]
    h.ROOT=dest;h.OUT=out
    class Handler(h.Handler):
        protocol_version='HTTP/1.1'
        def handle(self):
            try:super().handle()
            except (ConnectionResetError,ConnectionAbortedError,BrokenPipeError):pass
        def send_head(self):
            path=urllib.parse.unquote(urllib.parse.urlparse(self.path).path).lstrip('/')
            if path=='frame.html':
                self.remaining=None
                data=b'<!doctype html><meta charset="utf-8"><link rel="icon" href="icon.png"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden}iframe{width:100%;height:100%;border:0}</style><iframe src="index.html" allow="autoplay;fullscreen" sandbox="allow-scripts allow-same-origin allow-downloads allow-pointer-lock"></iframe>'
                import io
                self.send_response(200);self.send_header('Content-Type','text/html');self.send_header('Content-Length',str(len(data)));self.end_headers();return io.BytesIO(data)
            if path and path not in files:
                missing.append(path);self.send_error(404);return None
            return super().send_head()
    class Server(h.http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
    profile=out/('edge-'+str(time.time_ns()));log=(out/'edge.log').open('w')
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    proc=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--no-proxy-server','--disable-gpu','--in-process-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--mute-audio','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[];voices=[]
    def passed(message):checks.append(message);print('PASS',args.profile,message,flush=True)
    try:
        deadline=time.monotonic()+40
        while not (profile/'DevToolsActivePort').exists():
            assert time.monotonic()<deadline;time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);pages=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c=h.CDP(next(p['webSocketDebuggerUrl'] for p in pages if p['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable');c.send('Network.setBlockedURLs',dict(urls=['https://*']))
        c.send('Emulation.setDeviceMetricsOverride',dict(width=1280,height=720,deviceScaleFactor=1,mobile=False));c.send('Emulation.setFocusEmulationEnabled',dict(enabled=True))
        framed=args.profile=='itchio'
        c.send('Page.navigate',dict(url=f'http://127.0.0.1:{server.server_port}/'+('frame.html' if framed else 'index.html')))
        def evaluate(code):return c.evaluate('document.querySelector("iframe").contentWindow.eval('+json.dumps(code)+')') if framed else c.evaluate(code)
        def wait(code,timeout=25):
            end=time.monotonic()+timeout
            while time.monotonic()<end:
                try:
                    if evaluate(code):return
                except AssertionError:
                    if not framed:raise
                time.sleep(.12)
            raise AssertionError('Timed out: '+code)
        def click(selector):
            # User activation must come from a real input event, including the iframe.
            evaluate('document.querySelector('+json.dumps(selector)+').scrollIntoView({block:"center",behavior:"instant"})')
            rect=evaluate('(()=>{const r=document.querySelector('+json.dumps(selector)+').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()')
            c.send('Input.dispatchMouseEvent',dict(type='mousePressed',button='left',clickCount=1,**rect));c.send('Input.dispatchMouseEvent',dict(type='mouseReleased',button='left',clickCount=1,**rect))
        print('Loading',args.profile,flush=True)
        wait("typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",240)
        boot=evaluate("({failedCharacters:engine._preloadedCharImgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),missingBackgrounds:Object.keys(VN_CONFIG.backgrounds).filter(k=>!VN_CONFIG.gradientOnlyBGs.has(k)&&!engine._resolvedBGExt[k]),missingStills:VN_CONFIG.cgList.filter(c=>!engine._resolvedStillExt[c.key]).map(c=>c.key)})")
        (out/'boot.json').write_text(json.dumps(boot,ensure_ascii=False,indent=2),encoding='utf8')
        assert not any(boot.values()),boot
        passed('Every configured background, event CG and character expression loads with external requests blocked')
        click('#btn-loading-ok');wait("engine.openingMovie.phase==='playing'&&engine.openingMovie.video.currentTime>.4",30)
        media=evaluate("(()=>{const v=engine.openingMovie.video;return {source:v.currentSrc,width:v.videoWidth,height:v.videoHeight,duration:v.duration,audio:v.webkitAudioDecodedByteCount}})()")
        assert (media['width'],media['height'])==((1280,720) if framed else (1920,1080)) and media['audio']>0 and abs(media['duration']-102.8667)<.1,media
        evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000');wait("engine.openingMovie.phase==='idle'")
        if not framed:
            wait("document.querySelector('canvas').id==='plicy-thumbnail'&&document.querySelector('canvas').dataset.ready==='true'")
            data=evaluate("document.querySelector('canvas').toDataURL('image/png').split(',')[1]")
            (out/'plicy-thumbnail.png').write_bytes(base64.b64decode(data))
            passed('First canvas supplies a 1280x720 real-game thumbnail without replacing the HTML renderer')
        passed('Japanese opening plays real video/audio at the profile resolution and returns to the title')
        # Exercise main and bonus voice storage, including approved retakes, in both languages.
        for language in ['ja','en']:
            evaluate('(async()=>{engine._resetGameState();engine._showTitleScreen();await engine._setLanguage('+json.dumps(language)+',{returnToTitle:true});await engine.voice.unlock();engine.voice.setVolume(.85)})()')
            if language=='en':
                evaluate('engine.openingMovie.play()');wait("engine.openingMovie.video.currentTime>.3&&engine.openingMovie.video.currentSrc.endsWith('stella-op-en-v143.mp4')",30)
                assert evaluate('engine.openingMovie.video.videoWidth==='+str(1280 if framed else 1920)+'&&engine.openingMovie.video.webkitAudioDecodedByteCount>0')
                evaluate('engine.openingMovie.finish()');wait("engine.openingMovie.phase==='idle'")
            for identity in ['chapter1.chapter1_morning_gate.r003','bonus.r045','bonus.r100','bonus.r212']:
                evaluate('engine.voice.play('+json.dumps(identity)+');true')
                wait('engine.voice.session?.id==='+json.dumps(identity)+'&&engine.voice.session.started',25)
                state=evaluate("(()=>{const s=engine.voice.session,b=s.source.buffer,a=b.getChannelData(0);let peak=0;for(let i=0;i<a.length;i++)peak=Math.max(peak,Math.abs(a[i]));return {id:s.id,duration:b.duration,peak,context:engine.voice.context.state,gain:s.gain.gain.value}})()")
                assert state['peak']>.0001 and state['duration']>.1 and state['context']=='running',state
                voices.append(dict(language=language,**state));evaluate('engine.voice.stop()')
            awaitable='(async()=>{await engine.bonus.preload();return engine.bonus.ready})()'
            assert evaluate(awaitable)
        passed('Japanese/English main and bonus MP3s decode and play, including selected voice retakes; all bonus art loads')
        evaluate("(async()=>{await engine._setLanguage('ja',{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine._startFromLabel('chapter2_library')})()")
        wait("engine.currentStill==='kotoha_library_headphones'&&engine.waitingForInput")
        time.sleep(2.4);c.shot('library-and-voice')
        before=evaluate('({label:engine.currentLabel,index:engine.currentIndex,still:engine.currentStill})')
        evaluate('engine._saveToSlot(96);engine._loadFromSlot(96)');time.sleep(.5)
        assert evaluate('({label:engine.currentLabel,index:engine.currentIndex,still:engine.currentStill})')==before
        evaluate('engine._openLog()');wait("document.querySelectorAll('.log-entry').length>0")
        click('#btn-log-close')
        passed('Actual story CG, save/load and text log work in the packaged build')
        evaluate('engine._resetGameState();engine._showTitleScreen();engine.soundMode.unlock()');click('#btn-sound');click('[data-sound-filter="bgm"]');click('[data-track="piano_resonance"]')
        wait('engine.soundMode.audio.currentTime>.2&&engine.soundMode.visuals.level>.0001',30)
        path=evaluate("document.getElementById('sound-download').getAttribute('href')")
        assert (dest/path).is_file()
        c.shot('sound-mode');click('#btn-sound-close')
        c.send('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
        time.sleep(.5)
        assert evaluate('document.documentElement.scrollWidth<=innerWidth+1')
        c.shot('mobile-title')
        passed('Sound Mode plays with a real meter and a local download target; landscape mobile layout fits')
        assert not missing,sorted(set(missing))
        assert not c.errors,c.errors
        result=dict(status='PASS',profile=args.profile,embedded=framed,checks=checks,media=media,voices=voices,missing_assets=missing)
        (out/'result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    finally:
        if c:c.sock.close()
        proc.terminate()
        try:proc.wait(timeout=15)
        except subprocess.TimeoutExpired:proc.kill()
        server.shutdown();server.server_close();log.close()

if __name__=='__main__':main()
