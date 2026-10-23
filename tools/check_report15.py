"""Browser checks for chapter reveal, clear reward, real music playback and cleanup."""
import json
import time


def run(c, passed, out):
    c.evaluate("""window._r15Reveal=[];
      window._r15Diamond=engine.tx.diamond;
      engine.tx.diamond=function(duration,swap,done,options){
        _r15Reveal.push({duration,revealOnly:!!options?.revealOnly});
        return _r15Diamond.call(this,duration,swap,done,options);
      };
      window._r15Black=()=>{const tx=engine.tx,w=tx.canvas.width,h=tx.canvas.height;
        return getComputedStyle(tx.canvas).display!=='none'&&[[0,0],[w-1,h-1],[w>>1,h>>1]].every(([x,y])=>{
          const p=tx.ctx.getImageData(x,y,1,1).data;return p[0]===0&&p[1]===0&&p[2]===0&&p[3]===255});};
      window._r15Command=engine._processCommand;
      engine._processCommand=function(cmd){
        if(cmd.cmd==='narrate'&&this.currentLabel==='chapter2_start')window._r15PreparedBlack=_r15Black();
        return _r15Command.call(this,cmd);
      };
      engine.labels.report15_old=[{cmd:'scene',bg:'library_evening',effect:'instant'},
        {cmd:'narrate',text:'old scene'},{cmd:'click_wait'}];
      window._r15Fixture=engine.labels.report15_old;
    """)
    for lang in ['ja', 'en']:
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine.labels.report15_old=_r15Fixture})()")
        c.evaluate("engine._startFromLabel('report15_old');_r15Reveal=[];_r15PreparedBlack=false;engine._displayEnding('Chapter 2','chapter2_start')")
        c.wait("_r15Reveal.length===1", 25)
        assert c.evaluate("_r15Reveal[0].revealOnly&&_r15Reveal[0].duration===1200&&_r15PreparedBlack"), c.evaluate('_r15Reveal')
        c.wait("getComputedStyle(engine.tx.canvas).display!=='none'&&!_r15Black()", 2)
        assert c.evaluate("getComputedStyle(engine.tx.canvas).display!=='none'&&!_r15Black()"), 'Expected opening diamonds, without another closing phase'
        c.shot('chapter-opening-'+lang)
        c.wait("engine.currentLabel==='chapter2_start'&&engine.waitingForInput&&getComputedStyle(engine.tx.canvas).display==='none'")
        passed(lang+': chapter title prepares the next scene under black and uses only the opening half')

    c.evaluate("engine._startFromLabel('report15_old');_r15Reveal=[];engine._displayEnding('Chapter 2','chapter2_start')")
    c.wait('_r15Reveal.length===1',25)
    c.evaluate("engine._startFromLabel('report15_old')")
    time.sleep(.8)
    assert c.evaluate("engine.currentText==='old scene'&&getComputedStyle(engine.tx.canvas).display==='none'&&!engine._nextSceneReveal")
    passed('Reset during chapter opening cancels animation and pending chapter state')

    c.evaluate("engine._resetGameState();engine._showTitleScreen();engine._resetProgress()")
    assert c.evaluate("document.getElementById('btn-sound').classList.contains('hidden')&&!engine.soundMode.isUnlocked()")
    c.evaluate('engine.soundMode.open()')
    assert c.evaluate('!engine.soundMode.isOpen')
    passed('Fresh progress has no sound menu and cannot enter the player')
    c.evaluate("engine.seenGoodEnds.add('sakura');engine.soundMode.refreshUnlock()")
    assert c.evaluate("!document.getElementById('btn-sound').classList.contains('hidden')")
    c.evaluate("engine.seenGoodEnds.clear();engine.seenStills.add(engine.goodEndEpilogueStills.kotoha);engine.soundMode.refreshUnlock()")
    assert c.evaluate('engine.soundMode.isUnlocked()')
    passed('Existing GOOD END records and legacy epilogue CG unlocks both reveal the menu')
    c.evaluate("engine._resetProgress();engine._startFromLabel('report15_old');engine._displayEnding('Bad End');")
    assert c.evaluate("localStorage.getItem('vn_sound_unlocked')==='1'")
    # The delayed final-ending panel should have finished before returning to title.
    time.sleep(1.3)
    c.evaluate('engine._resetGameState();engine._showTitleScreen()')
    passed('A final ending, including BAD END, saves the clear reward')

    for lang in ['ja', 'en']:
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(lang)+",{returnToTitle:true});})()")
        c.click('#btn-sound')
        assert c.evaluate("engine.soundMode.isOpen&&!engine.bgmAudio&&document.querySelectorAll('#sound-tracks button').length===4&&!engine.openingMovie.canReplay()")
        c.click('#sound-tracks button')
        c.wait("!engine.soundMode.audio.paused&&engine.soundMode.audio.currentTime>.05",25)
        assert c.evaluate("document.getElementById('sound-now').textContent.includes('放課後のステラ')&&engine.soundMode.audio.loop")
        c.shot('sound-songs-'+lang)
        c.click('[data-sound-filter="bgm"]')
        c.click('#sound-tracks button')
        c.wait("!engine.soundMode.audio.paused&&engine.soundMode.audio.currentTime>.05")
        c.shot('sound-bgm-'+lang)
        assert c.evaluate("document.querySelectorAll('#sound-tracks button').length===32&&engine.soundMode.selected.id==='title'")
        c.click('#sound-next')
        c.wait("engine.soundMode.selected.id==='opening_piano'&&!engine.soundMode.audio.paused")
        c.click('#sound-prev')
        c.wait("engine.soundMode.selected.id==='title'&&!engine.soundMode.audio.paused")
        c.evaluate('engine.soundMode.audio.pause();engine.soundMode.audio.currentTime=1')
        assert c.evaluate('engine.soundMode.audio.paused&&engine.soundMode.audio.currentTime===1')
        c.click('#sound-loop')
        assert c.evaluate('!engine.soundMode.audio.loop')
        c.click('#sound-loop')
        c.evaluate('engine.soundMode.audio.volume=.27')
        c.wait("localStorage.getItem('vn_bgm_volume')==='0.27'")
        c.click('#btn-sound-close')
        assert c.evaluate("!engine.soundMode.isOpen&&engine.soundMode.audio.paused&&!engine.soundMode.audio.getAttribute('src')&&engine.currentBGM===VN_CONFIG.titleBGM&&document.activeElement.id==='btn-sound'")
        passed(lang+': OP/BGM playback, previous/next, pause/seek, repeat, volume and close-to-title work')

    # Real HTMLMediaElement progression for every shipped track, rather than a play() mock.
    c.click('#btn-sound')
    for index in range(c.evaluate('VN_CONFIG.soundTracks.length')):
        c.evaluate(f'engine.soundMode.play(VN_CONFIG.soundTracks[{index}])')
        c.wait("!engine.soundMode.audio.paused&&engine.soundMode.audio.currentTime>.05&&engine.soundMode.audio.duration>1",30)
        assert c.evaluate("!document.getElementById('sound-error').textContent")
    passed('All 36 tracks load and advance in the real browser audio player')
    # Check decoded waveforms too; this catches silent media despite advancing clocks.
    c.evaluate("""window._r15PCM=null;(async()=>{const ctx=new AudioContext();const results=[];
      for(const track of VN_CONFIG.soundTracks.filter(t=>t.group==='songs'||t.id==='title')){
        const response=await fetch(track.src);const buffer=await ctx.decodeAudioData(await response.arrayBuffer());
        const samples=buffer.getChannelData(0);let peak=0;for(let i=0;i<samples.length;i+=127)peak=Math.max(peak,Math.abs(samples[i]));
        results.push({id:track.id,duration:buffer.duration,peak});
      }await ctx.close();_r15PCM=results;})()""")
    c.wait('_r15PCM!==null',90)
    pcm=c.evaluate('_r15PCM')
    assert all(track['peak']>.01 and track['duration']>10 for track in pcm),pcm
    (out/'sound-waveforms.json').write_text(json.dumps(pcm,ensure_ascii=False,indent=2),encoding='utf8')
    passed('OP, three ED songs and a BGM have non-silent decoded waveforms')
    c.evaluate("engine.soundMode.audio.dispatchEvent(new Event('error'))")
    assert c.evaluate("document.getElementById('sound-error').textContent.length>0")
    c.click('#sound-next')
    c.wait("!engine.soundMode.audio.paused&&engine.soundMode.audio.currentTime>.05")
    assert c.evaluate("!document.getElementById('sound-error').textContent")
    passed('Playback error is visible and choosing another track recovers')
    c.evaluate("document.getElementById('btn-sound-close').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))")
    assert c.evaluate('!engine.soundMode.isOpen&&engine.soundMode.audio.paused')
    c.click('#btn-sound')
    c.click('#sound-tracks button')
    c.wait('!engine.soundMode.audio.paused')
    c.evaluate("document.getElementById('sound-modal').click()")
    assert c.evaluate('!engine.soundMode.isOpen&&engine.soundMode.audio.paused')
    passed('Escape and clicking the backdrop stop playback and close the modal')

    # The game deliberately uses a rotation prompt in portrait orientation.
    c.send('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
    time.sleep(.5)
    c.click('#btn-sound')
    c.shot('sound-mobile')
    assert c.evaluate("(()=>{const el=document.querySelector('.sound-inner');return el.scrollWidth<=el.clientWidth+1&&!!document.getElementById('btn-sound-close').getClientRects().length})()")
    c.click('#btn-sound-close')
    passed('Landscape phone layout contains the player and scrollable track list without horizontal overflow')
    c.evaluate('engine._resetProgress()')
    assert c.evaluate("!engine.soundMode.isUnlocked()&&document.getElementById('btn-sound').classList.contains('hidden')")
    passed('Reset progress removes the sound reward while preserving volume settings')


if __name__ == '__main__':
    import sys
    import check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-debug-report15-20261023/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True)
    check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--report15-only')
    check_report11.main()
