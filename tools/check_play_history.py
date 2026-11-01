"""Deterministic time accounting and actual skip controls in a real browser."""
def run(c, passed, out):
    result = c.evaluate("""(()=>{
      let time=0, visible=true;
      const entries=new Map();
      const storage={getItem:k=>entries.get(k)||null,setItem:(k,v)=>entries.set(k,v)};
      const make=priorProgress=>new VNPlayHistory({priorProgress,storage,now:()=>time,visible:()=>visible,autoStart:false});
      const h=make(false);
      time=2000;h.sample();
      if(h.snapshot().play_time_seconds!==0)throw Error('Title time counted');
      h.setRunning(true);time+=2500;h.sample();
      visible=false;h.sample();time+=4000;h.sample();
      visible=true;h.sample();time+=1500;h.sample();
      if(h.snapshot().play_time_seconds!==4)throw Error('Visibility boundary lost or hidden time counted');
      time+=60000;h.sample();
      if(h.snapshot().play_time_seconds!==4)throw Error('Sleep counted');
      h.markAllSkip();h.markUnreadSkip();h.markUnreadSkip();h.setRunning(false);time+=1000;
      const reloaded=make(false);
      if(reloaded.snapshot().play_time_seconds!==4||reloaded.snapshot().all_skip_used!==1)throw Error('Reload lost history');
      if(reloaded.snapshot().unread_skip_count!==2)throw Error('Reload lost unread skip count');
      reloaded.setRunning(true);time+=2000;reloaded.setRunning(false);
      if(reloaded.snapshot().play_time_seconds!==6)throw Error('New play did not accumulate');
      if(h.snapshot().play_time_seconds!==6||h.snapshot().all_skip_used!==1)throw Error('Older tab overwrote record');
      reloaded.markUnreadSkip();reloaded.snapshot();h.markUnreadSkip();
      if(h.snapshot().unread_skip_count!==4||reloaded.snapshot().unread_skip_count!==4)throw Error('Tabs lost or duplicated unread skips');
      const blocked=new VNPlayHistory({storage:{getItem:()=>{throw Error('blocked')},setItem:()=>{throw Error('blocked')}},now:()=>time,visible:()=>true,autoStart:false});
      blocked.setRunning(true);time+=1000;blocked.markAllSkip();
      const b=blocked.snapshot();
      if(b.play_time_seconds!==1||b.all_skip_used!==1||b.play_history_partial!==1)throw Error('Blocked storage stopped in-memory tracking');
      const previous=new VNPlayHistory({priorProgress:true,storage:{getItem:()=>null,setItem:()=>{}},autoStart:false});
      if(previous.snapshot().play_history_partial!==1)throw Error('Existing players marked as complete history');
      const damaged=new VNPlayHistory({storage:{getItem:()=>JSON.stringify({totalMs:-1}),setItem:()=>{}},autoStart:false});
      if(damaged.snapshot().play_history_partial!==1)throw Error('Damaged record marked as complete history');
      const legacy=new VNPlayHistory({storage:{getItem:()=>JSON.stringify({totalMs:7000,allSkipUsed:true,trackingStartedAt:'2026-10-30T00:00:00Z',partial:false}),setItem:()=>{}},autoStart:false});
      const l=legacy.snapshot();
      if(l.play_time_seconds!==7||l.all_skip_used!==1||l.unread_skip_count!==0||l.play_history_partial!==1)throw Error('Legacy record migration lost data or fabricated a complete count');
      return true;
    })()""")
    assert result
    passed('Time excludes title, hidden tab and sleep; accumulates across reloads; stale tabs retain skip flags; blocked storage degrades safely')

    c.evaluate("""window._originalHistory=engine.playHistory;
      localStorage.removeItem('vn_play_history');
      engine.playHistory=new VNPlayHistory({autoStart:false});
      engine._inputLocked=false;engine._skipLocked=false;engine.typewriterTimer=null;
      engine.waitingForInput=false;engine._waitTimer=null;engine._stillHideWaitTimer=null;
      engine._skipReadOnly=true;engine.skipMode=false;
      engine._toggleSkip();engine._toggleSkip();""")
    assert c.evaluate('engine.playHistory.snapshot().all_skip_used') == 0
    c.evaluate("engine._skipReadOnly=false")
    assert c.evaluate('engine.playHistory.snapshot().all_skip_used') == 0
    c.evaluate('engine._toggleSkip();engine._toggleSkip()')
    assert c.evaluate('engine.playHistory.snapshot().all_skip_used') == 1
    c.evaluate('engine._resetGameState();engine._showTitleScreen();engine._resetProgress()')
    assert c.evaluate('engine.playHistory.snapshot().all_skip_used') == 1
    passed('Read-only skip and merely selecting all-skip do not flag; using all-skip does, and progress reset cannot erase it')

    c.evaluate("engine.playHistory=_originalHistory;engine._gameActive=true")
    assert c.evaluate('engine.playHistory.running')
    c.evaluate('engine._showTitleScreen()')
    assert c.evaluate('!engine.playHistory.running')
    assert not c.errors, c.errors
    passed('Actual engine play/title transitions start and stop the timer')
