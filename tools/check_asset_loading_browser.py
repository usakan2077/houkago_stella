"""Cold startup, runtime lookahead/save restore and versioned persistent caching.
Uses a fresh headless Edge profile, stdlib only; no public site is changed.
"""
import json, subprocess, sys, threading, time, urllib.parse, urllib.request
from pathlib import Path
import check_opening_movie as h

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / 'stella-progressive-loading-check-20261026'
h.OUT = OUT
requests = []

class Handler(h.Handler):
    def do_GET(self):
        path = urllib.parse.urlsplit(self.path).path
        requests.append(self.path)
        if path == '/font-probe.html':
            body = b'<!doctype html><html lang="en"><meta charset="utf-8"><link rel="stylesheet" href="style.css"><div id="game-container"><div id="game-screen"><div id="text-area"><div id="text-box"><div id="dialog-text">MMMM WWWW iii 12345</div></div></div></div></div><script src="font-loader.js"></script></html>'
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers(); self.wfile.write(body)
            return
        if path == '/font-probe.ttf':
            time.sleep(.6)
            body = Path(r'C:\Windows\Fonts\BRITANIC.TTF').read_bytes()
            self.send_response(200)
            self.send_header('Content-Type', 'font/ttf')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            try: self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError): pass
            return
        if path == '/assets/cache-probe.bin':
            body = b'abcdef'
            self.send_response(200)
            self.send_header('Content-Type', 'application/octet-stream')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        try:
            super().do_GET()
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass

def main():
    sys.stdout.reconfigure(encoding='utf8', errors='replace')
    OUT.mkdir(exist_ok=True)
    profile = OUT / ('edge-' + str(time.time_ns()))
    log = (OUT / 'edge.log').open('w', encoding='utf8')
    server = h.http.server.ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    proc = subprocess.Popen([
        r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
        '--remote-debugging-port=0', '--user-data-dir=' + str(profile), 'about:blank',
    ], stdout=log, stderr=log, creationflags=subprocess.CREATE_NO_WINDOW)
    c = None
    checks = []
    try:
        deadline = time.monotonic() + 30
        while not (profile / 'DevToolsActivePort').exists():
            assert time.monotonic() < deadline
            time.sleep(.1)
        port = int((profile / 'DevToolsActivePort').read_text().splitlines()[0])
        pages = json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c = h.CDP(next(page['webSocketDebuggerUrl'] for page in pages if page['type'] == 'page'))
        c.send('Page.enable'); c.send('Runtime.enable'); c.send('Network.enable')
        c.send('Network.setBlockedURLs', {'urls': ['https://*']})
        c.send('Emulation.setDeviceMetricsOverride', dict(width=1280, height=720, deviceScaleFactor=1, mobile=False))
        url = f'http://127.0.0.1:{server.server_port}/index.html'
        began = time.monotonic()
        c.send('Page.navigate', {'url': url})
        c.wait("typeof engine !== 'undefined' && document.querySelector('#btn-loading-ok').style.visibility === ''", 45)
        seconds = time.monotonic() - began
        initial = [p for p in requests if urllib.parse.urlsplit(p).path.endswith(('.webp','.png','.jpg','.jpeg'))]
        initial_bytes = sum((ROOT / urllib.parse.unquote(urllib.parse.urlsplit(p).path.lstrip('/'))).stat().st_size
                            for p in set(initial) if (ROOT / urllib.parse.unquote(urllib.parse.urlsplit(p).path.lstrip('/'))).is_file())
        assert not any('/chars/' in p or '/stills/' in p for p in initial), initial
        assert len(set(initial)) <= 8, initial
        assert c.evaluate('!!navigator.serviceWorker.controller')
        initial_backgrounds = c.evaluate('Object.keys(engine.assetLoader.backgrounds)')
        checks.append('Fresh startup waits for title/opening images only; no full sprite or CG preload')
        c.shot('cold-start')

        # Same-version responses must come from CacheStorage, even when HTTP
        # cache reuse is explicitly bypassed by the fetch caller.
        probe = "stellaAssetURL('assets/cache-probe.bin')"
        assert c.evaluate(f"(async()=>await(await fetch({probe},{{cache:'reload'}})).text())()") == 'abcdef'
        before = requests.count('/assets/cache-probe.bin?_stella_v=1.4.4')
        assert c.evaluate(f"(async()=>await(await fetch({probe},{{cache:'reload'}})).text())()") == 'abcdef'
        assert requests.count('/assets/cache-probe.bin?_stella_v=1.4.4') == before
        partial = c.evaluate(f"(async()=>{{const r=await fetch({probe},{{headers:{{Range:'bytes=1-3'}}}});return {{status:r.status,text:await r.text()}}}})()")
        assert partial == dict(status=206, text='bcd'), partial
        checks.append('A repeated same-version fetch and a media Range request reuse cached bytes')

        # The background was first requested only after the SW took control.
        path = '/assets/images/bg/school_corridor_nightmare.webp?_stella_v=1.4.4'
        before = requests.count(path)
        assert before == 1, requests
        c.send('Page.navigate', {'url': url + '?visit=2'})
        c.wait("location.search === '?visit=2' && typeof engine !== 'undefined' && document.querySelector('#btn-loading-ok').style.visibility === ''", 45)
        assert requests.count(path) == before
        checks.append('A page reload reuses the previous visit’s versioned opening background')

        c.click('#btn-loading-ok')
        c.wait("engine.openingMovie.phase === 'playing' || engine.openingMovie.failed", 15)
        c.evaluate("engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000")
        c.wait("engine.openingMovie.phase === 'idle'", 10)
        c.evaluate("engine.labels.loading_probe=[{cmd:'narrate',text:'Restore probe'},{cmd:'click_wait'}];localStorage.setItem('vn_save_96',JSON.stringify({label:'loading_probe',index:0,flags:{},charState:{center:{charKey:'mahiru',expr:'sad'}},currentBG:'rooftop_dawn',currentStill:'mahiru_dawn_two',language:'ja'}));engine._loadFromSlot(96);true")
        c.wait("engine.currentLabel === 'loading_probe' && engine.waitingForInput && document.querySelector('#char-center img')?.naturalWidth > 0", 35)
        restored = c.evaluate("({bg:engine.currentBG,still:engine.currentStill,char:engine.charState.center.charKey,ext:engine._resolvedBGExt.rooftop_dawn,stillExt:engine._resolvedStillExt.mahiru_dawn_two})")
        assert restored == dict(bg='rooftop_dawn', still='mahiru_dawn_two', char='mahiru', ext='.webp', stillExt='.webp'), restored
        checks.append('A late-scene save loads its unseen background, sprite and CG before resuming text')
        c.shot('restored-scene')

        # Exercise the actual scenario lookahead with real images and jumps.
        c.evaluate("engine._startFromLabel('chapter1_morning_gate');VN_CONFIG.settings.typeSpeed=0;true")
        c.wait("engine.waitingForInput && engine.currentLabel === 'chapter1_morning_gate'", 20)
        c.wait("[...engine.assetLoader.jobs.keys()].some(k=>k.includes('/chars/sakura/'))", 20)
        checks.append('Entering a real scenario schedules upcoming character images without scanning later routes')

        version_check = c.evaluate("(async()=>{VN_CONFIG.version='1.4.5-probe';const u=stellaAssetURL('assets/cache-probe.bin');const r=await fetch(u);const text=await r.text();VN_CONFIG.version='1.4.4';return {u,text}})()")
        assert version_check['text'] == 'abcdef' and '_stella_v=1.4.5-probe' in version_check['u']
        assert '/assets/cache-probe.bin?_stella_v=1.4.5-probe' in requests
        checks.append('Changing the game version requests a separate fresh asset instead of stale cached bytes')

        # Delayed local test fonts exercise the production font gate and the
        # actual dialogue element. No external font provider is needed.
        c.evaluate('engine._gameActive=false;engine._stopTypewriter();engine.voice.stop();true')
        c.send('Page.navigate', {'url': url.replace('index.html','font-probe.html')})
        c.wait("location.pathname === '/font-probe.html' && typeof prepareStellaFonts === 'function'", 15)
        c.evaluate("""(()=>{
          document.documentElement.lang='en';document.documentElement.classList.remove('vn-system-fonts');
          window.fontTestFaces=[];
          window.deliverTestFonts=async name=>{
            const bytes=await(await fetch('/font-probe.ttf?case='+name)).arrayBuffer();
            window.fontTestFaces=[new FontFace('Shippori Mincho B1',bytes.slice(0),{weight:'400'}),new FontFace('Cormorant Garamond',bytes.slice(0),{weight:'500'})];
            fontTestFaces.forEach(face=>document.fonts.add(face));
            await Promise.all(fontTestFaces.map(face=>face.load()));return true;
          };
          window.fontGate='pending';window.fontGateBegan=performance.now();
          prepareStellaFonts({line:'MMMM WWWW iii 12345'},{stylesReady:deliverTestFonts('ready')}).then(result=>{window.fontGate=result;window.fontGateMs=performance.now()-fontGateBegan});
        })()""")
        assert c.evaluate("fontGate === 'pending'")
        c.wait("fontGate !== 'pending'", 15)
        font_result=c.evaluate("({mode:fontGate,ms:fontGateMs,faces:fontTestFaces.map(face=>({family:face.family,status:face.status}))})")
        assert font_result['mode']=='web' and all(face['status']=='loaded' for face in font_result['faces']),font_result
        checks.append('Dialogue font preparation waits for delayed font bytes, not merely an already-resolved fonts.ready')

        c.evaluate("""(()=>{
          fontTestFaces.forEach(face=>document.fonts.delete(face));
          window.fontTestFaces=[];window.fontDeliveryDone=false;
          const delivery=deliverTestFonts('late').then(value=>{window.fontDeliveryDone=true;return value});
          document.querySelector('#dialog-text').textContent='MMMM WWWW iii 12345';
          window.dialogWidth=()=>{const r=document.createRange();r.selectNodeContents(document.querySelector('#dialog-text'));return r.getBoundingClientRect().width};
          window.fontGate='pending';prepareStellaFonts({line:'MMMM WWWW iii 12345'},{stylesReady:delivery,timeout:40}).then(result=>window.fontGate=result);
        })()""")
        c.wait("fontGate === 'system'", 5)
        width_before = c.evaluate('dialogWidth()')
        c.wait("fontDeliveryDone && fontTestFaces.length===2 && fontTestFaces.every(face=>face.status === 'loaded')", 15)
        assert abs(c.evaluate('dialogWidth()') - width_before) < .01
        c.evaluate("document.documentElement.classList.remove('vn-system-fonts')")
        changed=c.evaluate("({width:dialogWidth(),font:getComputedStyle(document.querySelector('#dialog-text')).fontFamily,text:document.querySelector('#dialog-text').textContent})")
        assert abs(changed['width']-width_before)>1,dict(before=width_before,after=changed)
        checks.append('Late font arrival leaves actual dialogue width unchanged after a stable system-font fallback')
        assert not c.errors, c.errors
        report = dict(result='PASS', checks=checks, cold_start_seconds=round(seconds,3),
                      cold_image_requests=initial, cold_image_bytes=initial_bytes,
                      initial_required_backgrounds=initial_backgrounds,
                      javascript_errors=c.errors, note='Local Edge measurements; not a public-network speed benchmark')
        (OUT/'result.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf8')
        print(json.dumps(report, ensure_ascii=False), flush=True)
    except Exception:
        if c:
            c.shot('failure')
            print(c.evaluate("({ready:document.readyState,loading:document.querySelector('#loading-percent')?.textContent,errors:typeof engine==='undefined'?null:{label:engine.currentLabel,index:engine.currentIndex,waiting:engine.waitingForInput,active:engine.assetLoader?.active,queued:engine.assetLoader?.queue.length}})"), flush=True)
            print(c.errors, flush=True)
            if c.evaluate("typeof engine !== 'undefined'"):
                print(c.evaluate("({chars:engine.charState,slot:document.querySelector('#char-center').innerHTML,jobs:[...engine.assetLoader.jobs].filter(([k])=>k.includes('/mahiru/sad')).map(([k,v])=>({url:k,ok:v.ok,done:v.done}))})"), flush=True)
                print(c.evaluate("""(async()=>{const url=stellaAssetURL('assets/images/chars/mahiru/sad.png');const r=await fetch(url,{cache:'reload'});const b=await r.arrayBuffer();const digest=await crypto.subtle.digest('SHA-256',b);return {status:r.status,type:r.headers.get('Content-Type'),bytes:b.byteLength,hash:[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('')}})()"""), flush=True)
            print([p for p in requests if '/chars/' in p], flush=True)
            print([p for p in requests if 'font-probe' in p], flush=True)
            if c.evaluate("location.pathname === '/font-probe.html'"):
                print(c.evaluate("""(async()=>{try{const r=await fetch('/font-probe.ttf?case=diagnostic',{signal:AbortSignal.timeout(3000)});const b=await r.arrayBuffer();return {status:r.status,bytes:b.byteLength,head:[...new Uint8Array(b.slice(0,8))]}}catch(e){return {error:String(e)}}})()"""), flush=True)
        raise
    finally:
        if c:
            try: c.send('Browser.close')
            except Exception: pass
            c.sock.close()
        try: proc.wait(timeout=5)
        except subprocess.TimeoutExpired: proc.terminate()
        server.shutdown(); server.server_close(); log.close()

if __name__ == '__main__': main()
