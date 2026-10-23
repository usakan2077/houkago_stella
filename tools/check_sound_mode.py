"""Verify the real audio meter, scene slideshow, downloads and lifecycle in Edge."""
import hashlib
import json
import time


def run(c, passed, out):
    c.evaluate("engine.soundMode.unlock();engine._showTitleScreen();window._sm=engine.soundMode;true")
    c.click('#btn-sound')
    c.wait("!!document.querySelector('.sound-scene.is-visible [data-background]')")
    assert c.evaluate("!document.getElementById('sound-download').hasAttribute('href')&&getComputedStyle(document.querySelector('.sound-inner')).backdropFilter.includes('blur')")
    assert c.evaluate("(()=>{const p=document.querySelector('.sound-inner');return p.scrollHeight<=p.clientHeight+1})()"), 'Desktop panel must include its footer without scrolling'
    passed('Sound Mode opens with a background and translucent panel; current-track download waits for selection')

    scenes=c.evaluate("""(async()=>{const tracks=VN_CONFIG.soundTracks;
      if(!tracks.every(track=>VN_CONFIG.soundScenes[track.id]?.length>=3))throw new Error('Missing track scenes');
      const keys=[...new Set(Object.values(VN_CONFIG.soundScenes).flat())];
      return await Promise.all(keys.map(async key=>{if(!VN_CONFIG.backgrounds[key])throw new Error(key);
        const img=new Image();img.src='assets/images/bg/'+key+(engine._resolvedBGExt[key]||'.webp');await img.decode();return key}));})()""")
    passed(f'Every one of the 36 tracks has related scenery; all {len(scenes)} unique background images decode')
    c.click('[data-sound-filter="bgm"]')
    c.click('[data-track="title"]')
    c.wait('_sm.visuals.context?.state===\'running\'&&_sm.visuals.level>.0001',30)
    c.wait('_sm.visuals.levels.some(value=>value>.08)')
    assert c.evaluate("_sm.visuals.source.mediaElement===_sm.audio&&new Set(_sm.visuals.levels).size>8&&_sm.visuals.frame!==null&&_sm.audio.currentTime>0")
    c.evaluate('window._smContext=_sm.visuals.context;window._smSource=_sm.visuals.source;true')
    time.sleep(.4)
    c.shot('01-live-bgm-meter')
    passed('Real MediaElementSource produces a nonzero waveform and changing spectrum without replacing the music player')
    c.evaluate('_sm.audio.volume=0')
    c.wait('_sm.visuals.level===0&&_sm.visuals.levels.every(value=>value<.02)')
    c.evaluate('_sm.audio.volume=.65;_sm.audio.muted=true')
    c.wait('_sm.visuals.level===0')
    c.evaluate('_sm.audio.muted=false')
    c.wait('_sm.visuals.level>.0001')
    c.evaluate('_sm.audio.pause()')
    assert c.evaluate('_sm.visuals.frame===null&&_sm.visuals.levels.every(value=>value===0)')
    c.evaluate('_sm.audio.play()')
    c.wait('_sm.visuals.level>.0001')
    passed('Volume zero, mute and pause quiet the meter; playback resumes with the same audio graph')

    c.evaluate("_sm.play(VN_CONFIG.soundTracks.find(t=>t.id==='piano_resonance'))")
    c.wait("document.querySelector('.sound-scene.is-visible [data-background]')?.dataset.background==='music_room_evening'")
    assert c.evaluate("document.querySelector('.sound-scene.is-visible > div').getAnimations().some(animation=>animation.playState==='running')")
    time.sleep(2.3)
    c.shot('02-piano-scenery')
    c.wait("document.querySelector('.sound-scene.is-visible [data-background]')?.dataset.background==='music_room'",18)
    assert c.evaluate("getComputedStyle(document.querySelector('.sound-scene')).transitionDuration==='2.2s'")
    passed('Piano music selects music-room scenery, slowly pans/zooms, and naturally crossfades to the next slide')

    downloads=out/'downloads'
    downloads.mkdir(exist_ok=True)
    c.send('Browser.setDownloadBehavior',dict(behavior='allow',downloadPath=str(downloads)))
    for lang,identity,category in [('ja','title','bgm'),('en','op','songs')]:
        if lang=='en':
            c.click('#btn-sound-close')
            c.evaluate("engine._setLanguage('en',{returnToTitle:true})")
            c.click('#btn-sound')
            assert c.evaluate("document.querySelector('#sound-download [data-i18n]').textContent==='Download track'")
        c.click('[data-sound-filter='+json.dumps(category)+']')
        c.click('[data-track='+json.dumps(identity)+']')
        c.wait('_sm.visuals.level>.0001')
        info=c.evaluate("(()=>{const a=document.querySelector('[data-download-track="+json.dumps(identity)+"]');return {filename:a.download,href:a.getAttribute('href'),time:_sm.audio.currentTime}})()")
        target=downloads/info['filename']
        if target.exists():target.unlink()
        c.click('[data-download-track='+json.dumps(identity)+']')
        deadline=time.monotonic()+20
        while not target.exists() or target.stat().st_size==0:
            assert time.monotonic()<deadline,'Download did not complete'
            time.sleep(.1)
        source=__import__('pathlib').Path(__file__).resolve().parents[1]/info['href']
        # Chromium may briefly keep the completed file open while finalizing.
        while True:
            try:
                equal=hashlib.sha256(target.read_bytes()).digest()==hashlib.sha256(source.read_bytes()).digest()
                if equal:break
            except OSError:pass
            assert time.monotonic()<deadline,'Downloaded bytes differ from the original MP3'
            time.sleep(.1)
        assert c.evaluate('_sm.audio.currentTime>'+str(info['time'])+'&&!_sm.audio.paused')
        assert c.evaluate("document.getElementById('sound-download').download==="+json.dumps(info['filename']))
        passed(lang+': MP3 download has the correct filename and exact original bytes while music keeps playing')

    for category,count in [('songs',4),('bgm',32)]:
        c.click('[data-sound-filter='+json.dumps(category)+']')
        assert c.evaluate("(()=>{const links=[...document.querySelectorAll('#sound-tracks a[download]')];return links.length==="+str(count)+"&&links.every(a=>a.download.endsWith('.mp3')&&new URL(a.href).origin===location.origin&&!!a.getAttribute('aria-label'))})()")
    passed('Every OP/ED and BGM row has its own accessible same-origin MP3 download link')

    c.send('Emulation.setEmulatedMedia',dict(features=[dict(name='prefers-reduced-motion',value='reduce')]))
    c.evaluate("document.body.offsetWidth;matchMedia('(prefers-reduced-motion: reduce)').matches")
    try:
        c.wait('_sm.visuals.motion.matches&&_sm.visuals.frame===null&&_sm.visuals.slideTimer===null')
    except AssertionError:
        print(c.evaluate("({motion:_sm.visuals.motion.matches,fresh:matchMedia('(prefers-reduced-motion: reduce)').matches,frame:_sm.visuals.frame,timer:_sm.visuals.slideTimer,open:_sm.isOpen})"),flush=True)
        raise
    assert c.evaluate("!_sm.audio.paused&&document.querySelectorAll('.sound-scene > div').length===2&&[...document.querySelectorAll('.sound-scene > div')].every(el=>el.getAnimations().length===0)")
    passed('Reduced motion stops spectrum/slideshow animation while music continues')
    c.send('Emulation.setEmulatedMedia',dict(features=[dict(name='prefers-reduced-motion',value='no-preference')]))
    c.evaluate("document.body.offsetWidth;matchMedia('(prefers-reduced-motion: reduce)').matches")
    c.wait('_sm.visuals.frame!==null&&_sm.visuals.slideTimer!==null')
    c.click('#btn-sound-close')
    c.wait('_sm.visuals.context.state===\'suspended\'')
    assert c.evaluate('_sm.visuals.frame===null&&_sm.visuals.slideTimer===null&&_sm.audio.paused&&engine.currentBGM===VN_CONFIG.titleBGM')
    c.click('#btn-sound')
    c.click('#sound-tracks button')
    c.wait('_sm.visuals.level>.0001')
    assert c.evaluate('_sm.visuals.context===_smContext&&_sm.visuals.source===_smSource')
    passed('Closing stops timers and suspends analysis; reopening reuses the source and restores audible playback')
    c.evaluate("_sm.visuals.showScene('music_room_evening');engine._resetGameState();engine._showTitleScreen()")
    time.sleep(.2)
    assert c.evaluate("!_sm.isOpen&&_sm.visuals.slideTimer===null&&!document.querySelector('.sound-scene.is-visible')")
    passed('Reset cancels image handoffs, slideshow, meter and playback')

    c.send('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
    time.sleep(.5)
    c.click('#btn-sound')
    c.click('[data-sound-filter="bgm"]')
    c.click('[data-track="title"]')
    c.wait('_sm.visuals.level>.0001')
    c.shot('03-phone-landscape')
    assert c.evaluate("(()=>{const p=document.querySelector('.sound-inner');return p.scrollWidth<=p.clientWidth+1&&!!document.querySelector('#sound-tracks a[download]').getClientRects().length})()")
    c.click('#btn-sound-close')
    passed('Landscape phone layout fits the meter, glass panel and download controls; no browser exceptions')


if __name__=='__main__':
    import sys
    import check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-sound-mode-visuals-20261023/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True)
    check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--sound-mode-only')
    check_report11.main()
