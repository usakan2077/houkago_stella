"""Isolated-browser verification of report-11 presentation, editor and ending transitions."""
from pathlib import Path
import importlib.util,json,subprocess,threading,time,urllib.request
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'verification' if ROOT.name=='review' else ROOT.parent/'stella-debug-report11-20261019/verification'
spec=importlib.util.spec_from_file_location('browser_helper',ROOT/'tools/check_opening_movie.py')
h=importlib.util.module_from_spec(spec);spec.loader.exec_module(h);h.ROOT=ROOT;h.OUT=OUT

def main():
    OUT.mkdir(exist_ok=True)
    profile=OUT/('edge-profile-'+str(time.time_ns()))
    class Server(h.http.server.ThreadingHTTPServer):
        request_queue_size=64
    server=Server(('127.0.0.1',0),h.Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'edge.log').open('w')
    process=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--disable-gpu','--in-process-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--mute-audio','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    c=None;checks=[]
    def passed(text):checks.append(text);print('PASS:',text,flush=True)
    try:
        deadline=time.monotonic()+45
        while not (profile/'DevToolsActivePort').exists():
            assert time.monotonic()<deadline,'Edge startup timeout';time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);pages=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        c=h.CDP(next(p['webSocketDebuggerUrl'] for p in pages if p['type']=='page'))
        c.send('Page.enable');c.send('Runtime.enable');c.send('Network.enable')
        c.send('Network.setBlockedURLs',dict(urls=['https://*']))
        c.send('Emulation.setDeviceMetricsOverride',dict(width=1280,height=720,deviceScaleFactor=1,mobile=False))
        c.send('Emulation.setFocusEmulationEnabled',dict(enabled=True))
        base=f'http://127.0.0.1:{server.server_port}'
        c.send('Page.navigate',dict(url=base+'/index.html'))
        c.wait("typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",100)
        c.click('#btn-loading-ok');c.evaluate('engine.openingMovie.finish();window._configuredOPIdleMs=VN_CONFIG.openingMovieIdleMs;VN_CONFIG.openingMovieIdleMs=3600000;VN_CONFIG.settings.typeSpeed=0;engine._chainMode="none"')
        c.wait("engine.openingMovie.phase==='idle'")
        import sys
        if '--display-settings-only' in sys.argv:
            from check_display_settings import run
            run(c, passed, OUT)
            assert not c.errors,c.errors
            (OUT/'display-settings-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--report12-only' in sys.argv:
            from check_report12 import run
            run(c, passed, OUT)
            assert not c.errors,c.errors
            (OUT/'report12-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--summer-drink-only' in sys.argv:
            c.evaluate("window._transitions=[];window._originalDiamond=engine.tx.diamond;engine.tx.diamond=function(duration,onSwap,onDone){const sample={duration,start:performance.now()};_transitions.push(sample);return _originalDiamond.call(this,duration,()=>{sample.swap=performance.now()-sample.start;onSwap()},()=>{sample.end=performance.now()-sample.start;if(onDone)onDone()})}")
            for lang in ['ja','en']:
                c.evaluate("(async()=>{await engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';window._transitions=[];engine._startFromLabel('chapter6_kotoha_piano')})()")
                c.wait("_transitions.length===1&&!!_transitions[0].end")
                timing=c.evaluate('_transitions[0]')
                assert timing['duration']==1200 and 1100<=timing['end']<=2200,timing
                assert 500<=timing['swap']<=1000,timing
                passed(lang+': normal scene closes and opens in 1.2 seconds: '+str(timing))
                prefix='$chapter6.chapter6_kotoha_piano.'
                def advance_to(key,limit=40):
                    for _ in range(limit):
                        if c.evaluate('engine._curLineKey==='+json.dumps(key)):return
                        c.evaluate('engine._onAdvance()');time.sleep(.02)
                    raise AssertionError((lang,key,c.evaluate('engine._curLineKey')))
                advance_to(prefix+'r010')
                reply=c.evaluate('engine._resolveScenarioText('+json.dumps(prefix+'r010')+')')
                assert ('一本もらう' if lang=='ja' else "I'll take one") in reply,reply
                c.shot('summer-drink-accept-'+lang)
                advance_to(prefix+'r011')
                advance_to(prefix+'plaza_approach')
                bridge=c.evaluate('engine._resolveScenarioText('+json.dumps(prefix+'plaza_approach')+')')
                assert ('店先で買ったジュース' if lang=='ja' else "bought at his shop") in bridge,bridge
                c.shot('summer-drink-purchased-'+lang)
                c.evaluate("engine._gotoLabel('chapter6_end')")
                advance_to('$chapter6.chapter6_end.r005')
                ending=c.evaluate("engine._resolveScenarioText('$chapter6.chapter6_end.r005')")
                assert ('家で飲む分' if lang=='ja' else 'for home') in ending,ending
                passed(lang+': accepts Nobuhara\'s offer, buys juice at his shop, then forgets the supply for home')
            assert not c.errors,c.errors
            (OUT/'summer-drink-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--chapter2-evening-only' in sys.argv:
            for lang in ['ja','en']:
                c.evaluate("(async()=>{await engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine._startFromLabel('chapter2_after_school')})()")
                c.wait("engine.currentBG==='classroom_evening'&&getComputedStyle(document.getElementById('background')).backgroundImage.includes('classroom_evening.webp')")
                c.wait("getComputedStyle(document.getElementById('transition-canvas')).display==='none'")
                for _ in range(40):
                    if c.evaluate("!document.getElementById('choices-overlay').classList.contains('hidden')"):break
                    c.evaluate('engine._onAdvance()');time.sleep(.015)
                c.click('#choices-overlay .choice-btn')
                c.wait("engine.currentLabel==='chapter2_sakura_event'")
                assert c.evaluate("engine.currentBG==='classroom_evening'&&getComputedStyle(document.getElementById('background')).backgroundImage.includes('classroom_evening.webp')")
                c.shot('chapter2-sakura-evening-'+lang)
                passed(lang+': after-school scene and Sakura choice branch both use the corrected evening classroom')
            assert not c.errors,c.errors
            (OUT/'chapter2-evening-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--mahiru-run-only' in sys.argv:
            expected=['school_exterior_night','school_entrance_shoebox_night','staircase_night','mahiru_run_stairs_night','rooftop_door_closed_night','rooftop_door_open_night','rooftop_night']
            c.evaluate("window._rushScenes=[];window._rushTimes={};window._revealEvents=[];window._originalChangeBackground=engine._changeBackground;engine._changeBackground=function(...args){_rushScenes.push(args[0]);_rushTimes[args[0]]=performance.now();return _originalChangeBackground.apply(this,args)};window._originalRushBGM=engine._playBGM;engine._playBGM=function(...args){_revealEvents.push({type:'bgm',key:args[0],time:performance.now()});return _originalRushBGM.apply(this,args)};window._originalRushStill=engine._showStill;engine._showStill=function(...args){_revealEvents.push({type:'still',key:args[0],time:performance.now()});return _originalRushStill.apply(this,args)}")
            for lang in ['ja','en']:
                c.evaluate("(async()=>{await engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';window._rushScenes=[];window._rushTimes={};window._revealEvents=[];engine._openDebugMenu();const button=[...document.querySelectorAll('#debug-jump-overlay button')].find(b=>b.textContent==='まひる Ch10 — 屋上へ走る演出');if(!button)throw new Error('Missing rooftop debug shortcut');button.click()})()")
                for suffix,bg in [('r001','school_exterior_night'),('r002','school_entrance_shoebox_night'),('landing','staircase_night'),('r008','mahiru_run_stairs_night'),('r009.s002','rooftop_door_closed_night')]:
                    target='$route_mahiru.mahiru_ch10_run.'+suffix
                    for _ in range(100):
                        if c.evaluate('engine._curLineKey==='+json.dumps(target)):break
                        c.evaluate('engine._onAdvance()');time.sleep(.015)
                    assert c.evaluate('engine._curLineKey==='+json.dumps(target)+'&&engine.currentBG==='+json.dumps(bg)),(lang,target,bg)
                    c.wait("getComputedStyle(document.getElementById('background')).backgroundImage.includes("+json.dumps(bg+'.webp')+")")
                    assert c.evaluate("!!engine._backgroundMotion&&getComputedStyle(document.getElementById('text-area')).transform==='none'")
                    if lang=='ja':c.shot('rush-'+bg)
                c.evaluate('engine._onAdvance()')
                c.wait("engine.currentBG==='rooftop_door_open_night'",3)
                if lang=='ja':c.shot('rush-rooftop-door-open')
                c.wait("engine.currentLabel==='mahiru_ch10_rooftop'&&engine.currentBG==='rooftop_night'",4)
                assert c.evaluate('JSON.stringify(_rushScenes)===JSON.stringify('+json.dumps(expected)+')')
                assert c.evaluate("!engine._backgroundMotion&&engine.seAudios.every(a=>!a.src.includes('running_school'))")
                pause=c.evaluate('_rushTimes.rooftop_night-_rushTimes.rooftop_door_open_night')
                assert 1050<=pause<=2200,pause
                assert c.evaluate("document.getElementById('still-layer').classList.contains('effect-fade_in_slow')&&document.getElementById('still-layer').getAnimations().some(a=>a.effect.getTiming().duration===1600)")
                timing=c.evaluate("(()=>{const music=_revealEvents.find(e=>e.type==='bgm'&&e.key==='predawn_tension.mp3'),still=_revealEvents.find(e=>e.type==='still'&&e.key==='mahiru_rooftop_night');return {music:music.time,still:still.time}})()")
                assert abs(timing['music']-timing['still'])<50,timing
                time.sleep(.35)
                alpha=c.evaluate("Number(getComputedStyle(document.getElementById('still-layer')).opacity)")
                assert 0<alpha<1,alpha
                if lang=='ja':c.shot('rush-rooftop-reveal-fading')
                c.wait("Number(getComputedStyle(document.getElementById('still-layer')).opacity)===1",3)
                if lang=='ja':c.shot('rush-rooftop-reveal-complete')
                passed(lang+': door pauses for '+str(round(pause))+'ms, CG fades in over 1600ms and BGM starts in the same frame')
                passed(lang+': exterior, entrance, stairs, running insert, closed door, hand opening door and rooftop execute in order; running audio and motion stop on arrival')
            c.evaluate("engine.skipMode=true;engine._changeBackground('staircase_night','rush')")
            assert c.evaluate('!engine._backgroundMotion')
            c.evaluate('engine.skipMode=false')
            c.send('Emulation.setEmulatedMedia',dict(features=[dict(name='prefers-reduced-motion',value='reduce')]))
            c.evaluate("engine._changeBackground('staircase_night','rush')")
            assert c.evaluate('!engine._backgroundMotion')
            c.send('Emulation.setEmulatedMedia',dict(features=[dict(name='prefers-reduced-motion',value='no-preference')]))
            c.evaluate("engine._changeBackground('staircase_night','rush');window._motionBeforeReset=engine._backgroundMotion;engine._resetGameState()")
            assert c.evaluate("_motionBeforeReset.playState==='idle'&&!engine._backgroundMotion&&document.getElementById('background').getAnimations().length===0")
            passed('Skip and reduced-motion settings disable the push; reset cancels all retained background motion')
            decoded=c.evaluate("(async()=>{const context=new OfflineAudioContext(1,44100,44100);const response=await fetch('assets/audio/se/running_school.mp3');const buffer=await context.decodeAudioData(await response.arrayBuffer());return {duration:buffer.duration,channels:buffer.numberOfChannels}})()")
            assert decoded['duration']>.1 and not c.errors,(decoded,c.errors)
            (OUT/'mahiru-rooftop-run-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks,running_audio=decoded,subjective_listening=False),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--retakes-only' in sys.argv:
            record=json.loads((ROOT/'docs/voice-review/clips.json').read_text(encoding='utf8'))
            decoded=c.evaluate("""(async()=>{const record=await fetch('docs/voice-review/clips.json').then(r=>r.json());const context=new OfflineAudioContext(1,44100,44100),out=[];for(const lang of ['ja','en']){const manifest=await fetch('assets/voice/'+lang+'/manifest.json').then(r=>r.json());if(Object.keys(manifest.clips).length!==1040)throw new Error('clip count');for(const row of record.clips.filter(r=>r.language===lang)){const clip=manifest.clips[row.id];if(clip.src!==row.after.src||clip.gainDb!==row.after.gainDb)throw new Error('stale manifest '+row.id);for(const version of ['before','after']){const response=await fetch(row[version].src);if(!response.ok)throw new Error(row[version].src);const audio=await context.decodeAudioData(await response.arrayBuffer());out.push({key:row.key,version,src:row[version].src,duration:audio.duration,channels:audio.numberOfChannels})}}}return out})()""")
            assert len(decoded)==46 and all(r['duration']>.1 for r in decoded)
            passed('All 23 retakes are registered in JA/EN manifests; all 46 old/new audio files decode from served paths')
            c.send('Page.navigate',dict(url=base+'/docs/voice-review/index.html'))
            c.wait("document.querySelectorAll('article').length===23")
            c.click('article button:nth-child(2)');c.wait("document.querySelector('#status').textContent.includes('を再生中')")
            assert c.evaluate("document.querySelector('article button:nth-child(2)').getAttribute('aria-pressed')==='true'")
            c.click('#stop');assert c.evaluate("document.querySelector('article button:nth-child(2)').getAttribute('aria-pressed')==='false'")
            c.evaluate("document.querySelector('#language').value='en';document.querySelector('#language').dispatchEvent(new Event('input'))")
            assert c.evaluate("document.querySelectorAll('article').length===2")
            c.click('article button:nth-child(2)');c.wait("document.querySelector('#status').textContent.includes('を再生中')")
            assert c.evaluate("(()=>{document.querySelector('#volume').value='.5';document.querySelector('#volume').dispatchEvent(new Event('input'));return Math.abs(gain.gain.value-10**(currentClip.gainDb/20)*.5)<.00001&&currentClip.src.includes('/en/')})()")
            c.click('#stop')
            c.evaluate("document.querySelector('#language').value='';document.querySelector('#language').dispatchEvent(new Event('input'));document.querySelector('#search').value='kotoha_ch12_practice';document.querySelector('#search').dispatchEvent(new Event('input'))")
            assert c.evaluate("document.querySelectorAll('article').length===1")
            expected_tail_flag=next(row['needs_tail_listening'] for row in record['clips'] if row['key']=='ja:route_kotoha.kotoha_ch12_practice.r004')
            assert c.evaluate("!!document.querySelector('.flag')")==expected_tail_flag
            c.shot('06-retake-comparison');passed('Audition page plays and stops a retake, filters languages/text, and reflects the latest measured tail indicator')
            assert not c.errors,c.errors
            (OUT/'retake-playback-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks,decoded=decoded,subjective_listening=False),ensure_ascii=False,indent=2),encoding='utf8')
            return
        if '--voice-paths-only' in sys.argv:
            decoded=[]
            for lang in ['ja','en']:
                c.evaluate("engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true})")
                data=c.evaluate("(async()=>{const manifest=await fetch('assets/voice/"+lang+"/manifest.json').then(r=>r.json());const clips=Object.values(manifest.clips);const context=new OfflineAudioContext(1,44100,44100);const result=[];for(const i of [0,Math.floor(clips.length/2),clips.length-1]){const clip=clips[i],response=await fetch(clip.src);if(!response.ok)throw new Error(clip.src);const audio=await context.decodeAudioData(await response.arrayBuffer());result.push({src:clip.src,duration:audio.duration,channels:audio.numberOfChannels})}return {count:clips.length,decoded:result}})()")
                assert data['count']==1040 and len(data['decoded'])==3,data
                assert all(row['duration']>.1 and row['src'].count('/')>=4 for row in data['decoded']),data
                decoded.append(dict(language=lang,**data))
            passed('Moved JA/EN manifests retain 1040 clips each; six representative MP3s decode successfully from chapter folders')
            assert not c.errors,c.errors
            (OUT/'voice-path-checks.json').write_text(json.dumps(dict(status='PASS',checks=checks,audio=decoded),ensure_ascii=False,indent=2),encoding='utf8')
            return
        assert c.evaluate("document.getElementById('title-version').textContent==='ver '+VN_CONFIG.version")
        c.click('#title-version');assert c.evaluate("document.getElementById('title-updates').open&&document.querySelector('#title-updates-panel a').getAttribute('href')==='lp/index.html'")
        c.shot('01-title-updates')
        c.key('Escape');assert not c.evaluate("document.getElementById('title-updates').open")
        c.evaluate("engine.seenGoodEnds=new Set(['sakura','kotoha','mahiru']);engine._showTitleScreen()")
        c.shot('02-cleared-title-version')
        colors=c.evaluate("(()=>{const s=getComputedStyle(document.getElementById('title-version'));return {color:s.color,bg:s.backgroundColor}})()")
        import re
        channels=[int(n)/255 for n in re.findall(r'\d+',colors['bg'])[:3]]
        linear=[n/12.92 if n<=.04045 else ((n+.055)/1.055)**2.4 for n in channels]
        contrast=1.05/(sum(n*w for n,w in zip(linear,[.2126,.7152,.0722]))+.05)
        assert colors['color']=='rgb(255, 255, 255)' and contrast>=7,(colors,contrast)
        c.evaluate("engine._setLanguage('en',{returnToTitle:true})")
        c.click('#title-version');assert c.evaluate("document.getElementById('title-updates-heading').textContent==='Update history'")
        passed('Accessible title history, English labels, website link and contrast-safe version on cleared background')
        c.evaluate("engine._setLanguage('ja',{returnToTitle:true});engine._beginGame()")
        for label,expected in [('chapter1_after_school_intro','classroom_evening'),('chapter2_after_school','classroom_evening'),('chapter4_music_room','corridor_rainy'),('chapter6_sakura_talk','gymnasium_back_day'),('mahiru_ch9_reason','school_gate_autumn_late_afternoon')]:
            c.evaluate('engine._gotoLabel('+json.dumps(label)+')');c.wait('engine.currentBG==='+json.dumps(expected));time.sleep(.7)
            c.shot('scene-'+label)
        assert c.evaluate("engine._resolveScenarioText('$chapter1.chapter1_after_school_intro.r001').includes('六時間目')")
        assert c.evaluate("engine._resolveScenarioText('$chapter1.chapter1_library_pass.r004.cable').includes('コードが張って')")
        passed('Reported scene backgrounds and narrative bridges execute with correct references')
        c.evaluate("engine._gotoLabel('chapter2_lunch')")
        for _ in range(150):
            if c.evaluate("engine._curLineKey==='$chapter2.chapter2_lunch.r046.s002'"):break
            c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.008)
        assert c.evaluate("Object.values(engine.charState).some(s=>s?.charKey==='kotoha'&&s.expr==='thinking')")
        c.shot('03-kotoha-lunch-expression');passed('Kotoha has a reserved expression during lunch and a thinking expression at the awkward pause')
        # BAD END closing text is manually advanced as of report 12.
        for label in ['sakura_good_end_rooftop']:
            c.evaluate('engine._resetGameState();engine._gameActive=true;document.getElementById("title-screen").classList.add("hidden");document.getElementById("game-screen").classList.remove("hidden");engine._gotoLabel('+json.dumps(label)+')')
            for _ in range(180):
                if c.evaluate("!!document.getElementById('ending-coda')"):break
                c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.012)
            c.wait("document.getElementById('ending-coda')?.dataset.page==='1'")
            assert c.evaluate("Number(getComputedStyle(document.getElementById('ending-coda')).zIndex)>Number(getComputedStyle(document.getElementById('still-layer')).zIndex)")
            c.shot('ending-'+label+'-page1')
            c.wait("document.getElementById('ending-coda')?.dataset.page==='2'",7)
            c.wait("document.getElementById('ending-coda')?.dataset.page==='3'",7)
            c.shot('ending-'+label+'-page3')
            c.wait("!document.getElementById('credits-screen').classList.contains('hidden')&&!document.getElementById('ending-coda')",12)
        passed('Good ending coda advances through all three pages without clicks and enters credits')
        c.evaluate('engine._resetGameState();engine._showTitleScreen()')
        assert c.evaluate("!document.getElementById('ending-coda')&&!document.getElementById('game-screen').classList.contains('ending-coda-active')&&engine._endingCodaTimers.length===0")
        c.evaluate("(async()=>{await engine._setLanguage('en',{returnToTitle:true});engine._gameActive=true;document.getElementById('title-screen').classList.add('hidden');document.getElementById('game-screen').classList.remove('hidden');engine.currentLabel='kotoha_ch12_good_end';engine._startEndingIntro(null,'kotoha_good_end',3000)})()")
        c.wait("document.getElementById('ending-coda')?.textContent.startsWith('We lifted')")
        c.evaluate('engine._resetGameState();engine._showTitleScreen()');time.sleep(1.1)
        assert c.evaluate("!document.getElementById('ending-coda')&&document.getElementById('credits-screen').classList.contains('hidden')")
        passed('English coda text resolves correctly; reset cancels caption timers and prevents delayed credits')
        # Run editor modules on a real DOM with an English-only continuation fixture.
        c.evaluate("(async()=>{for(const src of ['editor/js/scenario-io.js','editor/js/line-editor.js']){const s=document.createElement('script');s.src=src;document.head.append(s);await new Promise((ok,no)=>{s.onload=ok;s.onerror=no})}})()")
        fixture="""(()=>{const box=document.createElement('div');box.id='editor-fixture';box.style.cssText='position:fixed;inset:0;background:white;z-index:9999;overflow:auto;padding:20px;width:850px';document.body.append(box);const css=document.createElement('style');css.textContent='#editor-fixture .text-field{width:350px}#editor-fixture textarea{display:block;width:100%;box-sizing:border-box;font:16px/1.8 sans-serif}';document.head.append(css);const ja=ScenarioIO.parse('# fixture\\n> $fixture.r001\\nplayer: $fixture.r002\\n'),en=ScenarioIO.parse('# fixture\\n> $fixture.r001\\n> $fixture.r001.s002\\nplayer: $fixture.r002\\n');window._editorEdits=[];EditorLineEditor.init(box,{onTextChange:(...a)=>_editorEdits.push(a)});EditorLineEditor.setLocales({ja:{'fixture.r001':'日本語の行','fixture.r002':'次へ'},en:{'fixture.r001':'English line','fixture.r001.s002':'This English continuation is deliberately much longer than the Japanese sentence. '.repeat(12),'fixture.r002':'Next'}});EditorLineEditor.setEnglishScenario('fixture.md',en);EditorLineEditor.showLabel('fixture.md','fixture',ja,ScenarioIO.extractLabels(ja)[0]);})()"""
        c.evaluate(fixture);time.sleep(.5)
        assert c.evaluate("document.querySelectorAll('#editor-fixture .locale-continuation textarea').length===1")
        assert c.evaluate("(()=>{const t=document.querySelector('#editor-fixture .locale-continuation textarea');return t.clientHeight+2>=t.scrollHeight&&t.clientHeight>100})()")
        c.evaluate("(()=>{const t=document.querySelector('#editor-fixture .locale-continuation textarea');t.value='edited';t.dispatchEvent(new Event('input',{bubbles:true}))})()")
        assert c.evaluate("_editorEdits.some(a=>a[0]==='fixture.r001.s002'&&a[1]==='en'&&a[2]==='edited')")
        c.shot('04-editor-english-continuation');c.evaluate("document.getElementById('editor-fixture').remove()")
        passed('Editor exposes English-only continuations, fits long text after layout, and edits the correct unchanged key')
        c.send('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
        c.click('#title-version');time.sleep(.3)
        bounds=c.evaluate("(()=>{const r=document.getElementById('title-updates-panel').getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,w:innerWidth,h:innerHeight}})()")
        assert bounds['left']>=0 and bounds['right']<=bounds['w']+1 and bounds['top']>=0 and bounds['bottom']<=bounds['h']+1,bounds
        c.shot('05-mobile-title-updates');passed('History panel fits a mobile landscape viewport')
        assert not c.errors,c.errors;passed('No uncaught browser JavaScript exceptions')
        (OUT/'checks.json').write_text(json.dumps(dict(status='PASS',checks=checks,base='bdd5ebc8069ddf87d821c49f87dc7b217be7c4a3'),ensure_ascii=False,indent=2),encoding='utf8')
    except BaseException:
        if c:
            try:c.shot('failure')
            except Exception:pass
        raise
    finally:
        if c:
            try:c.send('Browser.close')
            except Exception:pass
            c.sock.close()
        try:process.wait(timeout=5)
        except subprocess.TimeoutExpired:process.terminate()
        server.shutdown();server.server_close();log.close()

if __name__=='__main__':main()
