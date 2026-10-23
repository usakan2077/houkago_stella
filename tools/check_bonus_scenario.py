"""Isolated real-browser checks of the bonus unlock, branches, presentation, saves and video."""
from pathlib import Path
import importlib.util
import json
import subprocess
import threading
import time
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / 'stella-bonus-implementation-20261018' / 'verification'
spec = importlib.util.spec_from_file_location('op_check', ROOT / 'tools/check_opening_movie.py')
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)
helper.OUT = OUT


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    profile = OUT / ('edge-profile-' + str(time.time_ns()))
    server = helper.http.server.ThreadingHTTPServer(('127.0.0.1', 0), helper.Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    startup = subprocess.STARTUPINFO()
    startup.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    startup.wShowWindow = 0
    log = (OUT/'edge.log').open('w')
    process = subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        '--headless=new', '--guest', '--disable-gpu', '--in-process-gpu', '--no-first-run',
        '--no-default-browser-check', '--disable-background-networking', '--mute-audio',
        '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0', '--remote-allow-origins=*',
        '--user-data-dir='+str(profile), 'about:blank'], startupinfo=startup,
        creationflags=subprocess.CREATE_NO_WINDOW, stdout=subprocess.DEVNULL, stderr=log)
    c = None
    checks = []
    def passed(name):
        checks.append(name)
        print('PASS:', name, flush=True)
    try:
        deadline = time.monotonic()+30
        while True:
            assert time.monotonic()<deadline, 'Edge startup timeout'
            try:
                port = int((profile/'DevToolsActivePort').read_text().splitlines()[0])
                break
            except (OSError,IndexError,ValueError):
                time.sleep(.1)
        pages = json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c = helper.CDP(next(p['webSocketDebuggerUrl'] for p in pages if p['type']=='page'))
        c.send('Page.enable'); c.send('Runtime.enable'); c.send('Network.enable')
        c.send('Network.setBlockedURLs', dict(urls=['https://*']))
        c.send('Emulation.setDeviceMetricsOverride', dict(width=1280,height=720,deviceScaleFactor=1,mobile=False))
        c.send('Emulation.setFocusEmulationEnabled', dict(enabled=True))
        base = f'http://127.0.0.1:{server.server_port}'
        c.send('Page.navigate',dict(url=base+'/index.html'))
        c.wait("typeof engine!=='undefined' && document.querySelector('#btn-loading-ok')?.style.visibility === ''",90)
        c.click('#btn-loading-ok')
        c.evaluate('engine.openingMovie.finish(); VN_CONFIG.openingMovieIdleMs=3600000; VN_CONFIG.settings.typeSpeed=0; engine._chainMode="none"')
        c.wait("engine.openingMovie.phase==='idle'")
        import sys
        if '--story-entry-only' in sys.argv:
            from check_bonus_story_entry import run
            run(c,passed,OUT)
            (OUT/'story-entry-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--voice-only' in sys.argv:
            from check_bonus_voice import run
            run(c,passed,OUT)
            (OUT/'bonus-voice-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        assert c.evaluate("!document.getElementById('btn-bonus') && !engine.bonus.active")
        import sys
        if '--debug-only' in sys.argv:
            assert c.evaluate("engine.bonus.debugEnabled && !location.search && !engine._hasAllGoodEndsSeen() && document.getElementById('btn-debug').style.display==='none'")
            assert c.evaluate('engine.bonus.start()') is False
            c.evaluate("localStorage.setItem('vn_save_1','KEEP MAIN SAVE')")
            c.key('F2')
            assert c.evaluate("document.getElementById('btn-debug').style.display!== 'none' && !document.getElementById('btn-bonus')")
            c.shot('13-local-debug-title')
            c.click('#btn-debug')
            c.shot('23-bonus-debug-menu')
            for key in ['bonus_start','bonus_library','bonus_table','bonus_board','bonus_yukkuri','bonus_aa','bonus_nobuhara_round','bonus_apology']:
                c.evaluate("if(!document.getElementById('debug-jump-overlay'))engine._openDebugMenu()")
                assert c.evaluate("document.querySelectorAll('[data-bonus-debug]').length===8")
                c.evaluate("document.querySelector("+json.dumps(f'[data-bonus-debug="{key}"]')+").click()")
                c.wait(f"engine.bonus.active && engine.currentLabel==='{key}'")
                if key=='bonus_nobuhara_round':
                    for _ in range(12):
                        if c.evaluate("engine.currentStill==='bonus_07_tetsuya_luck'"):break
                        c.evaluate('engine._stillLockUntil=0;engine._onAdvance()')
                    c.wait("engine.currentStill==='bonus_07_tetsuya_luck'")
                    time.sleep(1.1)
                    c.shot('17-tetsuya-revised')
            c.shot('14-local-debug-scene')
            c.evaluate("engine._startFromLabel('chapter2_start');engine._openDebugMenu()")
            c.evaluate("document.querySelector('[data-bonus-debug=bonus_start]').click()")
            c.wait("engine.bonus.active && engine.currentLabel==='bonus_start'")
            c.evaluate("engine._resetGameState();engine._showTitleScreen();VN_CONFIG.settings.debug=false;history.replaceState(null,'','?debug=1&isDebug=1')")
            assert c.evaluate("!document.getElementById('btn-bonus') && !engine.bonus.debugEnabled")
            assert c.evaluate('engine.bonus.start()') is False
            assert c.evaluate('engine.bonus.startDebug()') is False
            c.evaluate('engine._openDebugMenu()')
            assert c.evaluate("document.querySelectorAll('[data-bonus-debug]').length===0")
            c.evaluate("document.getElementById('debug-jump-overlay').remove()")
            assert c.evaluate("!engine._hasAllGoodEndsSeen() && !localStorage.getItem('vn_seen_good_ends') && localStorage.getItem('vn_save_1')==='KEEP MAIN SAVE'")
            c.evaluate("engine.seenGoodEnds=new Set(['sakura','kotoha','mahiru']);engine._showTitleScreen()")
            assert c.evaluate("engine._hasAllGoodEndsSeen() && !document.getElementById('btn-bonus') && !document.getElementById('title-menu').innerText.includes('おまけ')")
            c.shot('25-all-cleared-title-without-bonus')
            assert not c.errors,c.errors
            passed('F2 and DEBUG JUMP expose all eight bonus shortcuts without URL parameters; no title bonus exists even after all endings; entry works from main game')
            passed('Disabling debug removes bonus shortcuts and rejects debug entry even with URL parameters; end records/main save unchanged; no browser exceptions')
            (OUT/'debug-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        c.evaluate("engine.seenGoodEnds=new Set(['sakura','kotoha'])")
        assert c.evaluate("!document.getElementById('btn-bonus')")
        assert c.evaluate('engine.bonus.start()') is False
        c.evaluate("engine._markGoodEndSeen('mahiru');engine._showTitleScreen()")
        assert c.evaluate("!document.getElementById('btn-bonus')")
        c.shot('01-title-without-bonus')
        passed('Title has no bonus entry at 0/3, 2/3 or 3/3 endings; locked direct start rejected')
        endcards_seen=set()
        def reach_endcard():
            for _ in range(55):
                if c.evaluate("!!document.getElementById('bonus-endcard')"):
                    return
                c.evaluate('engine._stillLockUntil=0;engine._onAdvance()')
                time.sleep(.1)
            raise AssertionError('Closing photo-exhibition scene did not reach the endcard')
        def close_endcard(lang):
            reach_endcard()
            c.wait("document.querySelector('#bonus-endcard img')?.complete&&document.querySelector('#bonus-endcard img').naturalWidth===1920")
            assert c.evaluate("engine._inputLocked&&!engine.autoMode&&!engine.skipMode&&getComputedStyle(document.getElementById('ui-layer')).visibility==='hidden'&&engine.currentBGM==='evening_gentle.mp3'&&engine.bonus.layer.getAttribute('aria-hidden')!=='true'")
            index=c.evaluate('engine.currentIndex')
            c.evaluate('engine._onAdvance();engine._onAdvance()')
            assert c.evaluate('engine.currentIndex')==index
            assert c.evaluate("document.getElementById('bonus-endcard-back').textContent==="+json.dumps('タイトルへ' if lang=='ja' else 'Return to title'))
            if lang not in endcards_seen:
                time.sleep(1.3);c.shot('27-endcard-'+lang);endcards_seen.add(lang)
            c.click('#bonus-endcard-back')
            assert c.evaluate("!engine.bonus.active&&!document.getElementById('bonus-endcard')&&!engine._inputLocked&&!engine.waitingForInput&&document.getElementById('title-screen').classList.contains('hidden')===false")

        # Real local media playback with all external HTTPS requests blocked.
        c.evaluate("(()=>{const preload=engine.bonus.preload.bind(engine.bonus);engine.bonus.preload=async()=>{try{return await preload()}catch(error){window._bonusLoadFailure=String(error);throw error}}})()")
        started=c.evaluate('engine.bonus.start()')
        assert started, c.evaluate("({active:engine._gameActive,unlocked:engine.bonus.canStart,titleHidden:document.getElementById('title-screen').classList.contains('hidden'),modal:document.querySelector('.modal:not(.hidden)')?.id,labels:!!engine.labels.bonus_start,ready:engine.bonus.ready,loadError:window._bonusLoadFailure,epoch:engine.bonus.epoch,opening:engine.openingMovie.phase,toasts:document.body.innerText.slice(-400)})")
        c.wait('engine.bonus.active')
        c.evaluate("engine._gotoLabel('bonus_apology')")
        for _ in range(18):
            if c.evaluate('!!document.getElementById("bonus-video")'):break
            if c.evaluate("engine.currentText.includes('正直スマソ')"):
                time.sleep(.8)
                assert c.evaluate("getComputedStyle(document.querySelector('#char-center .char-sprite')).transform!=='none'")
                c.shot('12-apology-bow')
            c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.03)
        c.wait("!!document.getElementById('bonus-video-player')")
        c.wait("(()=>{const v=document.getElementById('bonus-video-player');return v&&v.readyState>=3&&!v.paused&&v.currentTime>.2&&v.currentTime<10&&v.videoWidth>0})()",25)
        media=c.evaluate("(()=>{const v=document.getElementById('bonus-video-player');return {src:v.currentSrc,time:v.currentTime,duration:v.duration,width:v.videoWidth,height:v.videoHeight,paused:v.paused,audioBytes:v.webkitAudioDecodedByteCount,iframe:!!document.querySelector('#bonus-video iframe'),link:!!document.querySelector('#bonus-video a')}})()")
        assert media['src'].endswith('/assets/video/bonus-meteor.mp4') and 50<media['duration']<60,media
        assert not media['iframe'] and not media['link'],media
        c.shot('18-local-meteor-video')
        (OUT/'local-video.json').write_text(json.dumps(media,ensure_ascii=False,indent=2),encoding='utf8')
        passed('Bundled MP4 plays from the beginning with external network blocked; no iframe or external link')
        c.evaluate("window._bonusFinishedVideo=engine.bonus.videoElement;engine.bonus.videoElement.currentTime=engine.bonus.videoElement.duration-.5")
        c.wait('!document.getElementById("bonus-video")',10)
        assert c.evaluate("engine.currentText.includes('爆発') && !engine._inputLocked && _bonusFinishedVideo.paused && !_bonusFinishedVideo.getAttribute('src')")
        passed('Native video ended event resumes the punchline and releases media resources')
        reach_endcard()
        close_endcard('ja')
        c.evaluate('engine._resetGameState();engine._showTitleScreen()')
        if '--video-only' in sys.argv:return

        data = c.evaluate("(()=>{const p=engine.parser.parse(VN_BONUS.script);return {labels:Object.keys(p).filter(k=>k!=='__preamble__').length,ja:Object.keys(VN_BONUS.texts.ja).sort(),en:Object.keys(VN_BONUS.texts.en).sort(),unknown:Object.values(p).flat().filter(c=>c.cmd==='unknown'),targets:Object.values(p).flat().flatMap(c=>c.cmd==='jump'?[c.to]:c.cmd==='choice'?c.options.map(o=>o.next):[]).filter(t=>!p[t])}})()")
        assert data['ja']==data['en'] and not data['unknown'] and not data['targets'],data
        passed(f"Bilingual text parity and all label targets ({data['labels']} labels, {len(data['ja'])} text/choice lines)")
        c.evaluate("localStorage.setItem('vn_save_1',JSON.stringify({label:'start',index:0,preview:'KEEP MAIN SAVE'}))")
        c.evaluate('engine.bonus.start()')
        c.wait("engine.currentLabel==='bonus_start' && engine.bonus.active")

        def step_to_choice():
            c.evaluate("(async()=>{for(let i=0;i<15;i++){if(!document.getElementById('choices-overlay').classList.contains('hidden'))return;engine._stillLockUntil=0;engine._onAdvance();await new Promise(r=>setTimeout(r,15))}throw Error('No choice')})()")
        step_to_choice()
        c.shot('02-world-warning')
        c.click('#choices-container button:first-child')
        assert c.evaluate("!engine.bonus.active && !engine._gameActive && !document.getElementById('title-screen').classList.contains('hidden')")
        passed('World-breaking warning has a working decline route')

        shot_predicates = {
            '03-library-pc': "engine.flags.bonus_flash==='gonorego'",
            '04-mahjong-gekiga': "engine.currentStill==='bonus_05_no_flow'",
            '05-gunya': "engine.currentStill==='bonus_08_gunya_sakura'",
            '06-yukkuri': "engine.currentLabel==='bonus_yukkuri'&&engine.charState.right?.charKey==='bonus_yukkuri_kotoha'",
            '19-sakura-boon': "engine.charState.center?.charKey==='bonus_yaruo'&&engine.charState.center?.expr==='boon'",
            '07-yaruo': "engine.currentLabel==='bonus_aa'&&engine.charState.right?.charKey==='bonus_yaranaio'",
            '15-bakuhai-discard': "engine.currentText==='爆牌！'&&!!document.querySelector('.bonus-bakuhai')",
            '16-furiten-reveal': "engine.currentText==='あ、それフリテンだよ。'",
            '08-purchase-right': "engine.currentLabel==='bonus_rights'&&engine.charState.center?.charKey==='bonus_opuuna'",
            '20-teacher-intrusion': "engine.currentLabel==='bonus_teacher_intrusion'&&engine.currentText==='話は聞かせてもらった。人類は滅亡する！'&&engine.charState.center?.charKey==='teacher_male'",
        }
        visited=set()
        story_seen=[]
        english_flash_seen=set()
        boards_seen=set()
        newspapers_seen=set()
        label_order=[]
        def walk(menu, ending, take_shots=False):
            c.evaluate('engine.bonus.start()')
            c.wait("engine.currentLabel==='bonus_start' && engine.bonus.active")
            for i in range(800):
                state=c.evaluate("({active:engine.bonus.active,label:engine.currentLabel,index:engine.currentIndex,video:!!document.getElementById('bonus-video'),choice:!document.getElementById('choices-overlay').classList.contains('hidden'),still:engine.currentStill,text:engine.currentText,language:engine.currentLanguage,flash:engine.flags.bonus_flash,board:engine.flags.bonus_board,mode:engine.flags.bonus_mode})")
                visited.add(state['label'])
                if state['language']=='ja' and (not label_order or label_order[-1]!=state['label']):label_order.append(state['label'])
                if state['language']=='ja' and (not story_seen or story_seen[-1]!=state['text']): story_seen.append(state['text'])
                if state.get('mode')=='newspaper' and state['language'] not in newspapers_seen:
                    c.wait("document.querySelector('.bonus-newspaper-picture')?.complete&&document.querySelector('.bonus-newspaper-picture').naturalWidth===1200")
                    assert c.evaluate("(()=>{const img=document.querySelector('.bonus-newspaper-picture');return img.src.endsWith('bonus_newspaper_"+state['language']+".svg')&&img.getBoundingClientRect().bottom<document.getElementById('text-box').getBoundingClientRect().top})()")
                    c.shot('26-newspaper-'+state['language'])
                    newspapers_seen.add(state['language'])
                if state.get('board') and (state['language'],state['board']) not in boards_seen:
                    c.wait("(()=>{const img=document.querySelector('.bonus-board-picture');return img?.complete&&img.naturalWidth===1200})()")
                    assert c.evaluate("(()=>{const img=document.querySelector('.bonus-board-picture');return img.src.endsWith('bonus_board_"+state['language']+'_'+state['board']+".svg')&&img.getBoundingClientRect().bottom<document.getElementById('text-box').getBoundingClientRect().top})()")
                    c.shot('24-board-'+state['language']+'-'+state['board'])
                    boards_seen.add((state['language'],state['board']))
                if state['language']=='en' and state['label']=='bonus_library' and state.get('flash') in ['gonorego','perry'] and state['flash'] not in english_flash_seen:
                    title,caption={'gonorego':('All Your Base','All your base are belong to us.'),'perry':('Badgers','Mushroom. Snake. Repeat.')}[state['flash']]
                    panel=c.evaluate("document.querySelector('.bonus-pc').innerText")
                    assert title in panel and caption in panel and not any(text in panel for text in ['ゴノレゴ','ペリー','Perry','open the country']),panel
                    assert ('space villain' if state['flash']=='gonorego' else 'rows of badgers') in state['text'],state
                    time.sleep(1.05)
                    c.shot('21-english-all-your-base' if state['flash']=='gonorego' else '22-english-badgers')
                    english_flash_seen.add(state['flash'])
                if state['video']:return
                assert state['active'],state
                if take_shots:
                    for name,predicate in list(shot_predicates.items()):
                        if c.evaluate(predicate):
                            time.sleep(.18 if name=='15-bakuhai-discard' else 1.05);c.shot(name);del shot_predicates[name]
                if state['choice']:
                    option={'bonus_start':1,'bonus_meeting':menu,'bonus_teacher_intrusion':ending}[state['label']]
                    c.evaluate(f'document.querySelectorAll("#choices-container button")[{option}].click()')
                else:c.evaluate('engine._stillLockUntil=0;engine._onAdvance()')
                time.sleep(.012)
            raise AssertionError('Walk did not reach video')

        for i in range(3):
            walk(i,i,take_shots=i==0)
            source=c.evaluate('document.querySelector("#bonus-video-player").currentSrc')
            assert source.endswith('/assets/video/bonus-meteor.mp4'),source
            assert c.evaluate('engine._inputLocked && !engine.autoMode && !engine.skipMode')
            c.evaluate('engine._onAdvance()')
            assert c.evaluate('!!document.getElementById("bonus-video")')
            if i==0:c.shot('09-local-video-from-beginning')
            c.click('#bonus-video-skip')
            for _ in range(5):
                if not c.evaluate('engine.bonus.active'):break
                c.evaluate('engine._onAdvance()');time.sleep(.02)
            close_endcard('ja')
            assert c.evaluate("!engine.bonus.active&&!document.querySelector('#bonus-video')&&!document.getElementById('game-screen').classList.contains('bonus-running')&&!engine._inputLocked")
        assert all(label in visited for label in ['bonus_isamu_round','bonus_kotoha_round','bonus_mahiru_round','bonus_teacher_intrusion','bonus_protect','bonus_stop_pc','bonus_apology']),visited
        assert not shot_predicates,shot_predicates
        order=[label_order.index(label) for label in ['bonus_board','bonus_aa','bonus_rights','bonus_yukkuri','bonus_teacher_intrusion']]
        assert order==sorted(order),label_order
        cursor=0
        for beat in ['ネットで聞こうぜ','詳細キボンヌ','ギコねこ','返信の顔文字','顔写真を丸く切り抜いた','ゆっくりしていってね！']:
            cursor=next(i+1 for i in range(cursor,len(story_seen)) if beat in story_seen[i])
        passed('Board consultation -> thread slang -> AA faces -> cropped portraits -> Yukkuri -> teacher follow in order')
        assert c.evaluate("JSON.parse(localStorage.getItem('vn_save_1')).preview==='KEEP MAIN SAVE'")
        passed('All choices traverse every mahjong parody and reach the local video; skip/cleanup work offline; main save preserved')
        # Verify the intended causal order in the dialogue actually executed by the browser.
        expected=['悪い流れ','麻雀に流れなんてないよ','爆牌！','あ、それロン。','さくらさんの手','御無礼。ロンです。','あ、それフリテンだよ。','チョンボ。決めたとおり満貫払い','言い方、練習したのに']
        cursor=0
        for beat in expected:
            cursor=next(i+1 for i in range(cursor,len(story_seen)) if beat in story_seen[i])
        passed('Flow claim -> reasoned discard -> ron -> gunya; confident ron -> furiten evidence -> penalty -> gunya appear in order')
        cursor=0
        for beat in ['人類は滅亡する！', 'な・・・なんだってー！！', '生成AIでパロディなど', '突然何を言い出すんだ', '先生も、さっき思いっきりやってたよね？', '出し物の用紙は今日中']:
            cursor=next(i+1 for i in range(cursor,len(story_seen)) if beat in story_seen[i])
        passed('Teacher intrusion, group reaction, AI parody scolding, retorts and deadline exit appear in order')

        c.evaluate('engine.bonus.start()');c.wait('engine.bonus.active')
        c.evaluate("engine._gotoLabel('bonus_aa')")
        time.sleep(.15)
        c.evaluate("engine._saveToSlot(2);engine._resetGameState();engine._showTitleScreen()")
        c.evaluate('engine._loadFromSlot(2)')
        assert c.evaluate("engine.bonus.active && engine.flags.bonus_mode==='aa' && document.getElementById('game-screen').dataset.bonusMode==='aa' && engine.charState.left.charKey==='bonus_yaruo'")
        passed('Bonus save/load restores its format, actor images and running state')

        c.evaluate("engine._gotoLabel('bonus_board')")
        for _ in range(80):
            if c.evaluate("engine.flags.bonus_board==='thread'"):break
            c.evaluate('engine._onAdvance()');time.sleep(.02)
        c.wait("engine.flags.bonus_board==='thread'")
        c.evaluate("engine._saveToSlot(3);engine._resetGameState();engine._showTitleScreen();engine._loadFromSlot(3)")
        c.wait("engine.flags.bonus_mode==='board' && engine.flags.bonus_board==='thread' && document.querySelector('.bonus-board-picture')?.complete")
        assert c.evaluate("document.querySelector('.bonus-board-picture').src.endsWith('bonus_board_ja_thread.svg')")
        passed('Board save/load restores the current thread illustration and presentation mode')

        c.evaluate("engine._gotoLabel('bonus_yukkuri')")
        for _ in range(80):
            if c.evaluate("engine.flags.bonus_mode==='newspaper'"):break
            c.evaluate('engine._onAdvance()');time.sleep(.02)
        c.wait("engine.flags.bonus_mode==='newspaper'")
        c.evaluate("engine._saveToSlot(4);engine._resetGameState();engine._showTitleScreen();engine._loadFromSlot(4)")
        c.wait("engine.flags.bonus_mode==='newspaper'&&document.querySelector('.bonus-newspaper-picture')?.complete")
        assert c.evaluate("document.querySelector('.bonus-newspaper-picture').src.endsWith('bonus_newspaper_ja.svg')")
        passed('Newspaper save/load restores the school extra with its embedded cheating photograph')

        c.evaluate("engine._setLanguage('en',{returnToTitle:true})")
        assert c.evaluate("engine.currentLanguage==='en' && engine._resolveScenarioText('$bonus.r001').startsWith('For you')")
        walk(0,2)
        assert newspapers_seen=={'ja','en'},newspapers_seen
        passed('Both newspaper images load in the correct language and fit above the dialogue')
        assert english_flash_seen=={'gonorego','perry'},english_flash_seen
        assert boards_seen=={('ja','index'),('ja','thread'),('en','index'),('en','thread')},boards_seen
        passed('All four board illustrations load in the correct language and fit above the dialogue')
        passed('English library dialogue and PC panels use All Your Base and Badgers in place of Japanese Flash references')
        assert c.evaluate("document.querySelector('#bonus-video-skip').textContent==='Skip video'")
        c.click('#bonus-video-skip')
        reach_endcard()
        close_endcard('en')
        assert endcards_seen=={'ja','en'},endcards_seen
        passed('Meteor end/skip leads to the full-screen ensemble end card; normal advance cannot dismiss it; localized return button cleans up in both languages')
        assert c.evaluate("!engine.bonus.active && !document.querySelector('.modal:not(.hidden)') && !engine.waitingForInput")
        passed('English language reload reinstalls bonus script/text; extra input after the ending stays on title')

        c.evaluate("engine._resetGameState();engine._showTitleScreen();engine._beginGame()")
        assert c.evaluate("!engine.bonus.active && !engine.flags.bonus_run && !document.getElementById('game-screen').classList.contains('bonus-running') && !engine.currentLabel.startsWith('bonus_')")
        passed('Starting the normal game removes bonus presentation and run flags')

        c.evaluate("engine._resetGameState();engine._showTitleScreen();engine._resetProgress()")
        assert c.evaluate("!document.getElementById('btn-bonus') && !engine.bonus.canStart")
        passed('Reset progress re-locks the extra')
        # Check layout and reduced-motion behavior on a mobile landscape viewport.
        c.send('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
        c.send('Emulation.setEmulatedMedia',dict(features=[dict(name='prefers-reduced-motion',value='reduce')]))
        mobile_start=c.evaluate("engine.seenGoodEnds=new Set(['sakura','kotoha','mahiru']);engine._showTitleScreen();engine.bonus.start()")
        assert mobile_start, c.evaluate("({active:engine._gameActive,starting:engine.bonus.starting,unlocked:engine._hasAllGoodEndsSeen(),modal:document.querySelector('.modal:not(.hidden)')?.id,titleHidden:document.getElementById('title-screen').classList.contains('hidden'),epoch:engine.bonus.epoch})")
        c.wait('engine.bonus.active')
        c.evaluate("engine._gotoLabel('bonus_aa')")
        time.sleep(.8)
        assert c.evaluate("(()=>{const r=document.getElementById('game-container').getBoundingClientRect();return r.width<=innerWidth+1&&r.height<=innerHeight+1})()")
        c.evaluate("engine.bonus.impact('gunya')")
        assert c.evaluate('engine.bonus.animations.size===0')
        c.shot('10-mobile-landscape-reduced-motion')
        passed('Mobile landscape fits its viewport; reduced-motion disables added movement')
        assert not c.errors,c.errors
        passed('No uncaught browser JavaScript exceptions')
        (OUT/'checks.json').write_text(json.dumps(dict(status='PASS',checks=checks,visited=sorted(visited),base_url=base),ensure_ascii=False,indent=2),encoding='utf8')
    finally:
        if c:
            try:c.sock.close()
            except OSError:pass
        process.terminate()
        try:process.wait(timeout=10)
        except subprocess.TimeoutExpired:process.kill()
        server.shutdown();log.close()


if __name__=='__main__':main()
