"""Real-browser regressions for scene handoff, credits and chapter entry."""
import json
import time


def run(c, passed, out):
    c.evaluate("""window._report14Events=[];window._report14Diamonds=0;
      window._report14Command=engine._processCommand;
      window._report14Diamond=engine.tx.diamond;
      engine.tx.diamond=function(...args){_report14Diamonds++;return _report14Diamond.apply(this,args)};
      engine._processCommand=function(cmd){
        if(['show','say','narrate'].includes(cmd.cmd)){
          const tx=this.tx,w=tx.canvas.width,h=tx.canvas.height;
          const black=tx.canvas.style.display!=='none'&&[[0,0],[w-1,h-1],[w>>1,h>>1]].every(([x,y])=>{
            const p=tx.ctx.getImageData(x,y,1,1).data;return p[0]===0&&p[1]===0&&p[2]===0&&p[3]===255});
          _report14Events.push({cmd:cmd.cmd,text:cmd.text,black,credits:!document.getElementById('credits-screen').classList.contains('hidden')});
        }
        return _report14Command.call(this,cmd);
      };
      engine.labels.report14_scene=[
        {cmd:'scene',bg:'classroom',effect:'instant'},
        {cmd:'show',char:'nobuhara',pos:'left',expr:'normal',effect:'instant'},
        {cmd:'narrate',text:'report14 old scene'},
        {cmd:'scene',bg:'library_evening',effect:'fade'},
        {cmd:'hide_all',effect:'instant'},
        {cmd:'show',char:'sakura',pos:'right',expr:'normal',effect:'instant'},
        {cmd:'narrate',text:'report14 new scene'},
        {cmd:'click_wait'}];
      engine.labels.report14_sentinel=[{cmd:'scene',bg:'classroom',effect:'instant'},
        {cmd:'narrate',text:'report14 reset sentinel'},{cmd:'click_wait'}];
      window._report14Fixtures={report14_scene:engine.labels.report14_scene,report14_sentinel:engine.labels.report14_sentinel};
    """)
    c.evaluate("engine._startFromLabel('report14_scene');_report14Events=[];engine._onAdvance()")
    time.sleep(.2)
    assert c.evaluate("!_report14Events.length && !engine.charState.right && engine.charState.left.charKey==='nobuhara'")
    c.wait("engine.currentText==='report14 new scene' && getComputedStyle(engine.tx.canvas).display==='none'")
    assert c.evaluate("_report14Events.filter(e=>e.cmd==='show'||e.text==='report14 new scene').every(e=>e.black)")
    c.shot('scene-prepared-under-black')
    passed('Incoming sprite and message wait for full blackout; old scene stays intact during closing')

    c.evaluate("engine._startFromLabel('report14_scene');engine._onAdvance()")
    time.sleep(.15)
    c.evaluate("engine._startFromLabel('report14_sentinel')")
    time.sleep(1.3)
    assert c.evaluate("engine.currentText==='report14 reset sentinel'&&engine.currentBG==='classroom'&&getComputedStyle(engine.tx.canvas).display==='none'&&document.getElementById('background').style.backgroundImage.includes('/classroom.')")
    passed('Reset during scene closing cancels old animation, background swap and continuation')

    for lang in ['ja', 'en']:
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none'})()")
        c.evaluate('Object.assign(engine.labels,_report14Fixtures)')
        for profile in ['sakura_good_end','kotoha_good_end','mahiru_good_end']:
            # Use the real parsed script immediately after its ending_intro,
            # then enter and end the real credits presentation.
            c.evaluate("""(()=>{
              engine._startFromLabel('report14_sentinel');
              const [label,commands]=Object.entries(engine.labels).find(([key,cmds])=>cmds.some(cmd=>cmd.cmd==='ending_intro'&&cmd.profile==="""+json.dumps(profile)+"""));
              engine.currentLabel=label;
              engine.currentIndex=commands.findIndex(cmd=>cmd.cmd==='ending_intro'&&cmd.profile==="""+json.dumps(profile)+""" )+1;
              window._report14ExpectedBG=commands.slice(engine.currentIndex).find(cmd=>cmd.cmd==='scene').bg;
              void engine._showCredits(null,"""+json.dumps(profile)+""");
            })()""")
            c.wait('!!engine._creditsAnimEnd',25)
            c.evaluate('_report14Events=[];_report14Diamonds=0;engine._skipCredits()')
            c.wait('engine.waitingForInput&&engine.currentBG===_report14ExpectedBG')
            assert c.evaluate("_report14Diamonds===0&&_report14Events.some(e=>['narrate','say'].includes(e.cmd)&&e.credits)&&document.getElementById('credits-screen').classList.contains('hidden')&&getComputedStyle(engine.tx.canvas).display==='none'")
            c.shot('epilogue-'+profile+'-'+lang)
            passed(lang+': '+profile+' prepares epilogue under credits and reveals it without another blackout')

        # Keep the actual star-pan chapter animation, rather than replacing it.
        c.evaluate("engine._startFromLabel('report14_sentinel');_report14Diamonds=0;engine._displayEnding('Chapter 2','chapter2_start')")
        c.wait("engine.currentLabel==='chapter2_start'&&engine.waitingForInput&&getComputedStyle(engine.tx.canvas).display==='none'",25)
        assert c.evaluate("_report14Diamonds===1&&engine.currentBG==='classroom'&&document.getElementById('background').style.backgroundImage.includes('/classroom.')")
        c.shot('chapter-entry-'+lang)
        passed(lang+': real chapter title reveals the next scene with one opening transition')

    c.evaluate("engine._startFromLabel('report14_sentinel');engine._displayEnding('Cancelled chapter','chapter2_start')")
    time.sleep(.1)
    c.evaluate("engine._startFromLabel('report14_sentinel')")
    time.sleep(1)
    assert c.evaluate("engine.currentLabel==='report14_sentinel'&&getComputedStyle(engine.tx.canvas).display==='none'&&getComputedStyle(document.getElementById('background')).opacity==='1'")
    passed('Reset cancels a pending chapter-entry timer')

    # Existing setting checks also verify opacity rendering, character colors,
    # all quick-menu states and an actual reload preserving saved settings.
    c.evaluate('engine._resetGameState();engine._showTitleScreen()')
    from check_display_settings import run as display_checks
    display_checks(c, passed, out)


if __name__ == '__main__':
    import sys
    import check_report11
    check_report11.OUT = check_report11.ROOT.parent/'stella-debug-report14-20261022/verification'
    check_report11.OUT.mkdir(parents=True, exist_ok=True)
    check_report11.h.OUT = check_report11.OUT
    sys.argv.append('--report14-only')
    check_report11.main()
