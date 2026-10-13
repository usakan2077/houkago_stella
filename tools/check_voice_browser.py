"""Local Edge integration checks with synthetic audio, never production voices.

Run: python tools/check_voice_browser.py
Uses the existing standard-library CDP helper; no third-party packages.
"""
import io
import json
import math
from pathlib import Path
import struct
import subprocess
import threading
import time
import urllib.request
import wave
import http.server

import check_opening_movie as browser

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / 'stella-voice-integration-check'


def tone():
    data = io.BytesIO()
    with wave.open(data, 'wb') as output:
        output.setparams((1, 2, 16000, 0, 'NONE', 'not compressed'))
        output.writeframes(b''.join(struct.pack('<h', int(2000 * math.sin(i * math.tau * 440 / 16000)))
                                   for i in range(16000)))
    return data.getvalue()


class Handler(browser.Handler):
    audio_requests = []
    audio = tone()

    def do_GET(self):
        # Isolate synthetic fixtures from production voice registrations.
        if self.path in ('/assets/voice/ja/manifest.json', '/assets/voice/en/manifest.json'):
            language = self.path.split('/')[3]
            data = json.dumps(dict(language=language, clips={})).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        if self.path.startswith('/__voice-test__/'):
            self.audio_requests.append(self.path)
            if 'slow' in self.path:
                time.sleep(1)
            self.send_response(200)
            self.send_header('Content-Type', 'audio/wav')
            self.send_header('Content-Length', str(len(self.audio)))
            self.end_headers()
            try:
                self.wfile.write(self.audio)
            except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
                pass
        else:
            super().do_GET()


def main():
    OUT.mkdir(exist_ok=True)
    browser.OUT = OUT
    profile = OUT / ('edge-profile-' + str(time.time_ns()))
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    startup = subprocess.STARTUPINFO()
    startup.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    startup.wShowWindow = 0
    log = (OUT / 'edge.log').open('w')
    proc = subprocess.Popen([
        'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        '--headless=new', '--guest', '--disable-gpu', '--in-process-gpu', '--no-first-run',
        '--no-default-browser-check', '--disable-background-networking', '--mute-audio',
        '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0',
        '--remote-allow-origins=*', '--user-data-dir=' + str(profile), 'about:blank',
    ], startupinfo=startup, creationflags=subprocess.CREATE_NO_WINDOW,
       stdout=subprocess.DEVNULL, stderr=log)
    client = None
    checks = []

    def passed(name):
        checks.append(name)
        print('PASS: ' + name, flush=True)

    try:
        deadline = time.monotonic() + 25
        while True:
            assert time.monotonic() < deadline, 'Edge start timeout'
            try:
                port = int((profile / 'DevToolsActivePort').read_text().splitlines()[0])
                break
            except (OSError, ValueError, IndexError):
                time.sleep(.1)
        targets = json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        client = browser.CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type'] == 'page'))
        client.send('Page.enable')
        client.send('Runtime.enable')
        client.send('Emulation.setDeviceMetricsOverride', dict(width=1280, height=800, deviceScaleFactor=1, mobile=False))
        client.send('Emulation.setFocusEmulationEnabled', dict(enabled=True))
        client.send('Network.enable')
        client.send('Network.setBlockedURLs', dict(urls=['https://*']))
        base = f'http://127.0.0.1:{server.server_port}'
        client.send('Page.navigate', dict(url=base + '/index.html'))
        client.wait("document.querySelector('#btn-loading-ok')?.style.visibility === ''", 90)
        assert Handler.audio_requests == []
        assert client.evaluate("engine.voice.language === 'ja' && Object.keys(engine.voice.clips).length === 0")
        passed('Normal startup with empty manifests downloads no voice audio')
        client.click('#btn-loading-ok')
        client.key('Escape')
        client.wait("!document.getElementById('title-screen').classList.contains('hidden')")
        client.evaluate("""(() => {
          engine._resetGameState(); engine._gameActive = true; engine.openingMovie.resetIdle();
          document.getElementById('title-screen').classList.add('hidden');
          document.getElementById('game-screen').classList.remove('hidden');
          VN_CONFIG.settings.typeSpeed = 0; VN_CONFIG.settings.autoDelay = 1;
          window.voiceTestCommands = Array.from({length:6}, (_, i) => ({cmd:'say',char:'sakura',text:'$voice_test.v'+i}));
          for (let i=0;i<6;i++) {
            engine.scenarioTexts['voice_test.v'+i] = '試聴' + i;
            engine.voice.clips['voice_test.v'+i] = {src:'__voice-test__/line'+i+'.wav'};
          }
          engine.labels.__voice_test = [...voiceTestCommands,
            {cmd:'say',char:'player',text:'主人公'}, {cmd:'narrate',text:'地の文'}, {cmd:'click_wait'}];
          engine._gotoLabel('__voice_test');
        })()""")
        client.wait('!!engine.voice.session?.source')
        client.wait('engine.voice.cache.size===4')
        assert client.evaluate("!document.getElementById('dialog-voice-indicator').hidden && document.getElementById('dialog-voice-indicator').classList.contains('is-playing')")
        client.shot('voice-message-meter')
        client.wait('engine.voice.session === null')
        assert client.evaluate("!document.getElementById('dialog-voice-indicator').hidden && !document.getElementById('dialog-voice-indicator').classList.contains('is-playing')")
        client.evaluate('engine.voice.setVolume(0)')
        assert client.evaluate("!document.getElementById('dialog-voice-indicator').hidden && document.getElementById('dialog-voice-indicator').classList.contains('is-muted')")
        client.evaluate('engine.voice.setVolume(.85)')
        passed('Message voice meter animates during playback and remains visible when ended or muted')
        assert len(Handler.audio_requests) == 4, Handler.audio_requests
        passed('Real Web Audio playback decodes WAV and loads current plus three lines')
        client.evaluate('engine._toggleSkip()')
        client.wait('engine.currentIndex === 9')
        assert client.evaluate("document.getElementById('dialog-voice-indicator').hidden")
        assert client.evaluate('engine.voice.session === null')
        assert len(Handler.audio_requests) == 4, Handler.audio_requests
        passed('Skipping advances all lines without downloading or playing skipped audio')

        client.evaluate('engine._openLog()')
        assert client.evaluate("document.querySelectorAll('.log-voice-btn').length") == 6
        assert client.evaluate("[...document.querySelectorAll('.log-voice-btn')].every(b=>b.querySelector('svg') && b.textContent==='' && b.getAttribute('aria-label').includes('ボイス再生'))")
        position = client.evaluate('engine.currentIndex')
        client.click('.log-voice-btn')
        client.wait("engine.voice.session?.id === 'voice_test.v0'")
        client.click('.log-entry:nth-child(2) .log-voice-btn')
        client.wait("engine.voice.session?.id === 'voice_test.v1'")
        assert client.evaluate('engine.currentIndex') == position
        assert client.evaluate("document.querySelectorAll('.log-voice-btn[aria-pressed=\"true\"]').length") == 1
        assert client.evaluate("document.querySelector('.log-voice-btn[aria-pressed=\"true\"]').getAttribute('aria-label').includes('再生停止')")
        client.shot('voice-log')
        client.click('#btn-log-close')
        assert client.evaluate('engine.voice.session === null')
        passed('Log replay switches voices, omits protagonist/narration, and stops on close')

        client.evaluate("engine.voice.cache.clear(); engine.voice.clips['voice_test.v0'].src='__voice-test__/slow.wav'; engine._openLog()")
        client.click('.log-voice-btn')
        client.click('#btn-log-close')
        time.sleep(1.1)
        assert client.evaluate('engine.voice.session === null')
        client.evaluate("engine.voice.clips['voice_test.v0'].src='__voice-test__/line0.wav'")
        passed('Closing the log during a slow download prevents delayed playback')

        client.evaluate('engine._openSettings()')
        client.evaluate("const slider=document.getElementById('voice-volume-slider'); slider.value=25; slider.dispatchEvent(new Event('input'))")
        assert client.evaluate("engine.voice.output.gain.value === .25 && localStorage.getItem('vn_voice_volume') === '0.25'")
        client.shot('voice-settings')
        client.click('#btn-settings-close')
        passed('CONFIG changes the Web Audio output gain and persists voice volume')

        client.evaluate("engine._gotoLabel('__voice_test'); engine._toggleAuto()")
        client.wait('!!engine.voice.session?.source')
        time.sleep(.3)
        assert client.evaluate('engine.currentIndex') == 1
        client.wait('engine.currentIndex === 2')
        client.evaluate('engine._toggleAuto()')
        passed('Auto waits for audible duration instead of cutting off the line')

        client.evaluate("engine._saveToSlot('voice_test'); engine._executeNext(); engine._loadFromSlot('voice_test')")
        client.wait("engine.voice.session?.id === 'voice_test.v1'")
        passed('Existing save format restores the dialogue and starts only its matching voice')
        client.evaluate("engine._setLanguage('en', {returnToTitle:true})")
        assert client.evaluate("engine.voice.language === 'en' && !engine.voice.has('voice_test.v1') && engine.voice.session === null")
        passed('Changing language clears old audio and does not fall back to Japanese voices')
        client.send('Page.reload')
        client.wait("typeof engine !== 'undefined' && engine.voice.volume === .25")
        passed('Saved voice volume survives a page reload')
        assert not client.errors, client.errors
        report = dict(result='PASS', checks=checks, javascript_errors=client.errors,
                      audio_requests=Handler.audio_requests, audio_listening=False)
        (OUT / 'result.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    except Exception:
        if client:
            client.shot('failure')
        raise
    finally:
        if client:
            client.sock.close()
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
        server.shutdown()
        log.close()


if __name__ == '__main__':
    main()
