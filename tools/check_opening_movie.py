"""Local Edge integration checks. Run with Python; no third-party packages.

Uses an isolated profile and writes evidence outside the game repository.
"""
import base64,http.server,json,os,socket,struct,subprocess,threading,time,urllib.parse,urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'stella-op-integration-check'

class CDP:
    def __init__(self,url):
        u=urllib.parse.urlparse(url);self.sock=socket.create_connection((u.hostname,u.port),timeout=30);self.i=0;self.errors=[]
        key=base64.b64encode(os.urandom(16)).decode()
        self.sock.sendall(f'GET {u.path} HTTP/1.1\r\nHost: {u.hostname}:{u.port}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'.encode())
        header=b''
        while not header.endswith(b'\r\n\r\n'):header+=self.sock.recv(1)
        assert b'101' in header.splitlines()[0]
    def read(self,n):
        data=b''
        while len(data)<n:
            chunk=self.sock.recv(n-len(data))
            if not chunk:raise RuntimeError('CDP closed')
            data+=chunk
        return data
    def send(self,method,params=None):
        self.i+=1;identity=self.i;data=json.dumps(dict(id=identity,method=method,params=params or {})).encode();n=len(data);mask=os.urandom(4)
        prefix=bytes([129,128|n]) if n<126 else bytes([129,254])+struct.pack('!H',n) if n<65536 else bytes([129,255])+struct.pack('!Q',n)
        self.sock.sendall(prefix+mask+bytes(c^mask[i%4] for i,c in enumerate(data)))
        while True:
            a,z=self.read(2);n=z&127
            if n==126:n=struct.unpack('!H',self.read(2))[0]
            elif n==127:n=struct.unpack('!Q',self.read(8))[0]
            mask=self.read(4) if z&128 else None;data=self.read(n)
            if mask:data=bytes(c^mask[i%4] for i,c in enumerate(data))
            if a&15==8:raise RuntimeError('CDP closed')
            if a&15!=1:continue
            response=json.loads(data)
            if response.get('method')=='Runtime.exceptionThrown':self.errors.append(response['params'])
            if response.get('id')==identity:
                assert 'error' not in response,response
                return response.get('result',{})
    def evaluate(self,code):
        r=self.send('Runtime.evaluate',dict(expression=code,awaitPromise=True,returnByValue=True))
        assert 'exceptionDetails' not in r,r
        return r['result'].get('value')
    def wait(self,condition,timeout=20):
        deadline=time.monotonic()+timeout
        while time.monotonic()<deadline:
            if self.evaluate(condition):return
            time.sleep(.1)
        raise AssertionError('Timed out: '+condition)
    def click(self,selector):
        self.evaluate(f"(()=>{{const el=document.querySelector({json.dumps(selector)});const r=el.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)el.scrollIntoView({{block:'center',behavior:'instant'}})}})()")
        time.sleep(.25)
        p=self.evaluate(f"(()=>{{const r=document.querySelector({json.dumps(selector)}).getBoundingClientRect();return {{x:r.x+r.width/2,y:r.y+r.height/2}}}})()")
        self.send('Input.dispatchMouseEvent',dict(type='mousePressed',button='left',clickCount=1,**p))
        self.send('Input.dispatchMouseEvent',dict(type='mouseReleased',button='left',clickCount=1,**p))
    def key(self,key):
        self.send('Input.dispatchKeyEvent',dict(type='keyDown',key=key,code=key))
        self.send('Input.dispatchKeyEvent',dict(type='keyUp',key=key,code=key))
    def shot(self,name):
        data=self.send('Page.captureScreenshot',dict(format='png'))
        (OUT/(name+'.png')).write_bytes(base64.b64decode(data['data']))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
    def log_message(self,*args):pass
    def send_head(self):
        self.remaining=None
        path=Path(self.translate_path(self.path));requested=self.headers.get('Range','')
        if path.is_file() and requested.startswith('bytes='):
            size=path.stat().st_size
            start,end=requested[6:].split('-',1);start=int(start);end=min(int(end) if end else size-1,size-1)
            if start>end:
                self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.end_headers();return None
            stream=path.open('rb');stream.seek(start);self.remaining=end-start+1
            self.send_response(206);self.send_header('Content-Type',self.guess_type(str(path)))
            self.send_header('Accept-Ranges','bytes');self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
            self.send_header('Content-Length',str(self.remaining));self.end_headers();return stream
        return super().send_head()
    def copyfile(self,*args):
        try:
            if self.remaining is None:super().copyfile(*args)
            else:
                source,dest=args
                while self.remaining:
                    data=source.read(min(65536,self.remaining))
                    if not data:break
                    dest.write(data);self.remaining-=len(data)
        except (ConnectionAbortedError,ConnectionResetError,BrokenPipeError):pass

def main():
    OUT.mkdir(exist_ok=True);profile=OUT/('edge-profile-'+str(time.time_ns()))
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
    log=(OUT/'edge.log').open('w')
    proc=subprocess.Popen([edge,'--headless=new','--guest','--disable-gpu','--in-process-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--mute-audio','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[]
    def passed(name):checks.append(name);print('PASS: '+name,flush=True)
    try:
        deadline=time.monotonic()+25
        while not (profile/'DevToolsActivePort').exists():
            assert time.monotonic()<deadline,'Edge start timeout';time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c=CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Emulation.setDeviceMetricsOverride',dict(width=1280,height=800,deviceScaleFactor=1,mobile=False))
        c.send('Emulation.setFocusEmulationEnabled',dict(enabled=True))
        c.send('Network.enable');c.send('Network.setBlockedURLs',dict(urls=['https://*']))
        base=f'http://127.0.0.1:{server.server_port}'
        c.send('Page.navigate',dict(url=base+'/index.html'))
        c.wait("document.querySelector('#btn-loading-ok')?.style.visibility === ''",90)
        assert c.evaluate("document.getElementById('title-screen').classList.contains('hidden')")
        c.click('#btn-loading-ok')
        c.wait("engine.openingMovie.phase==='playing' && document.getElementById('op-movie').currentTime>.5")
        meta=c.evaluate("(()=>{const v=engine.openingMovie.video;return {width:v.videoWidth,height:v.videoHeight,duration:v.duration,muted:v.muted,volume:v.volume,titleHidden:document.getElementById('title-screen').classList.contains('hidden'),bgm:engine.currentBGM}})()")
        assert meta['width']==1920 and meta['height']==1080 and not meta['muted'] and meta['titleHidden'] and not meta['bgm'],meta
        c.shot('startup-op');passed('Loading OK starts the final OP with audio enabled and no title BGM')
        c.key('Enter');c.key('Enter')
        assert c.evaluate("engine.openingMovie.phase==='fading' && document.getElementById('title-screen').classList.contains('hidden')")
        c.wait("engine.openingMovie.phase==='idle'")
        assert c.evaluate("!document.getElementById('title-screen').classList.contains('hidden') && engine.currentBGM===VN_CONFIG.titleBGM")
        c.shot('title-after-op');passed('Repeated skip produces one fade through black and returns to title')
        # Exercise the real ten-second timeout, then reset it with actual pointer input.
        time.sleep(8)
        c.send('Input.dispatchMouseEvent',dict(type='mouseMoved',x=50,y=50))
        time.sleep(3)
        assert c.evaluate("engine.openingMovie.phase==='idle'")
        c.wait("engine.openingMovie.phase==='playing'",10)
        passed('Title replays after ten seconds; pointer activity resets the countdown')
        c.key('Escape');c.wait("engine.openingMovie.phase==='idle'")
        # Shorten subsequent idle waits, leaving the production default untouched.
        c.evaluate('VN_CONFIG.openingMovieIdleMs=1000')
        for button,modal,close in [('btn-title-settings','settings-modal','btn-settings-close'),('btn-gallery','gallery-modal','btn-gallery-close'),('btn-continue','save-load-modal','btn-modal-close')]:
            c.click('#'+button);time.sleep(1.5)
            assert c.evaluate(f"engine.openingMovie.phase==='idle' && !document.getElementById('{modal}').classList.contains('hidden')"),modal
            c.click('#'+close)
            c.wait(f"document.getElementById('{modal}').classList.contains('hidden')")
        passed('CONFIG, gallery and load dialogs suspend attract playback')
        c.evaluate("window.dispatchEvent(new Event('blur'))")
        time.sleep(1.5);assert c.evaluate("engine.openingMovie.phase==='idle'")
        c.evaluate("window.dispatchEvent(new Event('focus'))")
        c.click('#btn-newgame')
        time.sleep(1.5)
        assert c.evaluate("engine.openingMovie.phase==='idle' && !document.getElementById('intro-video-screen').classList.contains('hidden')")
        c.click('#intro-video-screen');c.wait("!document.getElementById('opening-screen').classList.contains('hidden')")
        c.key('Escape');c.wait('engine._gameActive')
        time.sleep(1.5);assert c.evaluate("engine.openingMovie.phase==='idle'")
        passed('Unfocused window, NEW GAME intro and active gameplay do not replay the OP')
        c.evaluate('VN_CONFIG.openingMovieIdleMs=10000; engine._returnFromEndingToTitle(); VN_CONFIG.settings.bgmVolume=.27; engine.openingMovie.play()')
        c.wait("engine.openingMovie.video.currentTime>.2")
        assert abs(c.evaluate('engine.openingMovie.video.volume')-.27)<.01
        c.evaluate('engine.openingMovie.video.currentTime=engine.openingMovie.video.duration-.2')
        c.wait("engine.openingMovie.phase==='idle'")
        passed('Natural video ending fades to title and respects configured BGM volume')
        c.evaluate("window.originalOPPlay=engine.openingMovie.video.play;engine.openingMovie.video.play=()=>Promise.reject(new DOMException('blocked','NotAllowedError'));engine.openingMovie.play()")
        c.wait('!engine.openingMovie.playButton.hidden')
        c.evaluate('engine.openingMovie.video.play=window.originalOPPlay')
        c.click('#op-movie-play');c.wait('engine.openingMovie.video.currentTime>.2')
        c.click('#op-movie-skip');c.wait("engine.openingMovie.phase==='idle'")
        passed('Autoplay denial offers an actionable play button; click skip works')
        c.evaluate("engine.openingMovie.play();engine.openingMovie.video.src='assets/video/missing-test.mp4';engine.openingMovie.video.load()")
        c.wait("engine.openingMovie.failed && engine.openingMovie.phase==='idle'")
        c.evaluate('VN_CONFIG.openingMovieIdleMs=500');time.sleep(1)
        assert c.evaluate("engine.openingMovie.phase==='idle' && !document.getElementById('title-screen').classList.contains('hidden')")
        passed('Missing movie falls back to title without a retry loop')
        c.send('Page.navigate',dict(url=base+'/lp/'))
        c.wait("!!document.querySelector('#update-op') && !!document.querySelector('.language-toggle')")
        ja=c.evaluate("document.querySelector('#update-op').innerText")
        assert '10' in ja
        c.click('.language-toggle')
        c.wait("document.documentElement.lang==='en'")
        assert 'Opening Movie Added' in c.evaluate("document.querySelector('#update-op').innerText")
        assert 'supporting characters' in c.evaluate("document.querySelector('#update-v11').innerText")
        c.evaluate("document.querySelector('#updates').scrollIntoView({behavior:'instant'})")
        time.sleep(1)
        c.shot('lp-updates-en');passed('LP update notes and previous release notes work in Japanese and English')
        assert not c.errors,c.errors
        report=dict(result='PASS',checks=checks,video=meta,javascript_errors=c.errors,audio_listening=False)
        (OUT/'result.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    except Exception:
        if c:
            c.shot('failure')
            print(c.evaluate("({visible:document.visibilityState,focus:document.hasFocus(),loading:document.querySelector('#loading-percent')?.innerText,phase:typeof engine==='undefined'?null:engine.openingMovie?.phase,time:document.querySelector('#op-movie')?.currentTime,paused:document.querySelector('#op-movie')?.paused,error:document.querySelector('#op-movie')?.error?.message})"),flush=True)
            print(c.errors,flush=True)
        raise
    finally:
        if c:
            try:c.send('Browser.close')
            except Exception:pass
            c.sock.close()
        try:proc.wait(timeout=5)
        except subprocess.TimeoutExpired:proc.terminate()
        server.shutdown();server.server_close();log.close()

if __name__=='__main__':main()
