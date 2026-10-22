"""Real-canvas coverage, blackout timing and persistent message transparency."""
import json,time

def run(c, passed, out):
    # Exercise the actual drawing code on landscape, portrait and ultrawide canvases.
    coverage=c.evaluate("""(()=>{
      const results=[];
      for(const [w,h] of [[1280,720],[720,1280],[844,390],[390,844],[2560,1080],[320,240]]){
        const canvas=document.createElement('canvas');canvas.id='coverage-fixture';document.body.append(canvas);
        const tx=new TransitionCanvas(canvas.id);canvas.width=w;canvas.height=h;
        const fullBlack=()=>{let failures=0;const pixels=tx.ctx.getImageData(0,0,w,h).data;
          for(let i=0;i<pixels.length;i+=4)if(pixels[i]||pixels[i+1]||pixels[i+2]||pixels[i+3]!==255)failures++;
          return failures};
        const samples=[];let swaps=0,done=0;
        tx._animate=(duration,frame,finish)=>{
          for(const t of [0,.2,.437499,.4375,.5,.5625,.8,1]){
            frame(t);if(t>=.437499&&t<=.5625)samples.push({t,uncovered:fullBlack()});
          }finish();
        };
        tx.diamond(1200,()=>swaps++,()=>done++);
        results.push({w,h,samples,swaps,done,hidden:canvas.style.display==='none'});canvas.remove();
      }
      return results;
    })()""")
    for row in coverage:
        assert all(s['uncovered']==0 for s in row['samples']),row
        assert row['swaps']==1 and row['done']==1 and row['hidden'],row
    (out/'transition-coverage.json').write_text(json.dumps(coverage,indent=2),encoding='utf8')
    passed('Six canvas aspect ratios cover every pixel before and throughout the full-black hold; swap and completion fire once')

    c.evaluate("engine._startFromLabel('chapter1_after_school_intro')")
    c.wait("getComputedStyle(document.getElementById('transition-canvas')).display==='none'")
    timing=c.evaluate("""(async()=>{
      const tx=engine.tx,canvas=tx.canvas,ctx=tx.ctx,start=performance.now();
      const black=[];let swap=null,done=false,blackAtSwap=false;
      const opaque=()=>[[0,0],[canvas.width-1,0],[0,canvas.height-1],[canvas.width-1,canvas.height-1],[canvas.width>>1,canvas.height>>1]]
        .every(([x,y])=>{const p=ctx.getImageData(x,y,1,1).data;return p[0]===0&&p[1]===0&&p[2]===0&&p[3]===255});
      const monitor=()=>{if(opaque())black.push(performance.now()-start);if(!done)requestAnimationFrame(monitor)};
      requestAnimationFrame(monitor);
      await new Promise(resolve=>tx.diamond(1200,()=>{swap=performance.now()-start;blackAtSwap=opaque()},()=>{done=true;resolve()}));
      return {swap,total:performance.now()-start,blackAtSwap,blackFrames:black.length,blackSpan:black.length?black.at(-1)-black[0]:0};
    })()""")
    assert timing['blackAtSwap'] and timing['blackFrames']>=3 and timing['blackSpan']>=75,timing
    assert 500<=timing['swap']<=1000 and 1150<=timing['total']<=1800,timing
    (out/'transition-timing.json').write_text(json.dumps(timing,indent=2),encoding='utf8')
    passed('Real 1.2-second transition holds black across multiple frames and swaps while fully opaque: '+str(timing))

    # Disable only color interpolation so the following checks read settled slider targets.
    c.evaluate("const testStyle=document.createElement('style');testStyle.id='settled-settings-test';testStyle.textContent='#text-box,#char-name-box,.quick-menu-btn{transition:none!important}';document.head.append(testStyle)")
    def state():
        return c.evaluate("""(()=>{const text=getComputedStyle(document.getElementById('text-box')),name=getComputedStyle(document.getElementById('char-name-box')),sample=getComputedStyle(document.getElementById('window-opacity-sample'));
          return {text:text.backgroundColor,name:name.backgroundColor,sample:sample.backgroundColor,opacity:text.opacity,letters:getComputedStyle(document.getElementById('dialog-text')).opacity,blur:text.backdropFilter,stored:localStorage.getItem('vn_window_opacity'),value:document.getElementById('window-opacity-value').textContent}})()""")
    def alpha(color):
        return float(color.rstrip(')').split(',')[-1]) if color.startswith('rgba') else 1
    assert c.evaluate("localStorage.getItem('vn_window_opacity')===null&&Math.abs(engine._windowOpacity-.5)<.001")
    c.shot('game-default-transparency-50')
    c.evaluate('engine._openSettings()')
    assert c.evaluate("document.getElementById('window-opacity-slider').value==='50'")
    c.send('DOM.enable');c.send('CSS.enable')
    root=c.send('DOM.getDocument')['root']['nodeId']
    buttons={key:c.send('DOM.querySelector',dict(nodeId=root,selector='#'+key))['nodeId']
             for key in ['btn-quick-save','btn-quick-load','btn-auto','btn-skip']}
    for transparency in [0,50,70,100,65]:
        c.evaluate("(()=>{const s=document.getElementById('window-opacity-slider');s.value="+str(transparency)+";s.dispatchEvent(new Event('input',{bubbles:true}))})()")
        s=state();expected=round(1-transparency/100,2)
        assert all(abs(alpha(s[key])-expected)<.001 for key in ['text','name','sample']),s
        assert s['opacity']=='1' and s['letters']=='1' and abs(float(s['stored'])-expected)<.001,s
        assert s['value']==str(transparency)+'%',s
        if transparency==100:assert s['blur']=='blur(0px)',s
        for key,node in buttons.items():
            for mode in ['normal','hover','focus-visible','active']:
                c.send('CSS.forcePseudoState',dict(nodeId=node,forcedPseudoClasses=[mode] if mode in ['hover','focus-visible'] else []))
                c.evaluate("document.getElementById("+json.dumps(key)+").classList.toggle('active',"+json.dumps(mode=='active')+")")
                button=c.evaluate("(()=>{const el=document.getElementById("+json.dumps(key)+"),s=getComputedStyle(el);return {image:s.backgroundImage,opacity:s.opacity,color:s.color,blur:s.backdropFilter,shadow:s.boxShadow}})()")
                import re
                colors=re.findall(r'rgba?\([^)]+\)',button['image'])
                assert len(colors)==2 and all(abs(alpha(color)-expected)<.001 for color in colors),(key,mode,transparency,button)
                assert button['opacity']=='1' and alpha(button['color'])>.8,button
                if transparency==100:
                    assert button['blur']=='blur(0px)' and all(alpha(color)==0 for color in re.findall(r'rgba?\([^)]+\)',button['shadow'])),button
            c.evaluate("document.getElementById("+json.dumps(key)+").classList.remove('active')")
            c.send('CSS.forcePseudoState',dict(nodeId=node,forcedPseudoClasses=[]))
    c.shot('settings-transparency-ja')
    passed('Default transparency is 50%; slider updates message, preview and all four quick buttons in normal/hover/focus/active states at 0/50/70/100/65%, preserves text and saves the value')

    for palette in ['default','navy','forest','sepia','black']:
        c.evaluate("document.querySelector('#palette-options [data-palette="+palette+"]').click()")
        assert abs(alpha(state()['text'])-.35)<.001,state()
    for color in ['sakura','kotoha','mahiru','reset']:
        c.evaluate('engine._setWindowColor('+json.dumps(color)+')')
        assert all(abs(alpha(state()[key])-.35)<.001 for key in ['text','name','sample']),state()
    c.evaluate("engine._setWindowColor('reset');document.getElementById('btn-settings-close').click();engine._setLanguage('en',{returnToTitle:true})")
    c.evaluate('engine._openSettings()')
    assert c.evaluate("document.querySelector('label[for=\"window-opacity-slider\"]').textContent==='Window Transparency'&&document.getElementById('window-opacity-slider').value==='65'")
    c.shot('settings-transparency-en')
    passed('All palettes, character colors and English settings preserve the selected transparency')

    c.send('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
    c.evaluate("document.getElementById('window-opacity-preview').scrollIntoView({block:'center',behavior:'instant'})")
    bounds=c.evaluate("(()=>{const r=document.getElementById('window-opacity-preview').getBoundingClientRect(),m=document.querySelector('#settings-modal .modal-inner');return {left:r.left,right:r.right,w:innerWidth,overflow:m.scrollWidth>m.clientWidth}})()")
    assert bounds['left']>=0 and bounds['right']<=bounds['w'] and not bounds['overflow'],bounds
    c.shot('settings-transparency-mobile')
    passed('Transparency controls and preview fit the mobile settings panel')

    # Return to title so the game's beforeunload confirmation does not
    # suspend JavaScript execution during this persistence check.
    c.evaluate('engine._resetGameState();engine._showTitleScreen();window._settingsBeforeReload=true')
    c.sock.settimeout(90)
    c.send('Page.reload',dict(ignoreCache=True))
    # Do not mistake the previous document's already-visible loading button
    # for completion of the new navigation.
    time.sleep(.5)
    c.wait("!window._settingsBeforeReload&&typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",150)
    c.click('#btn-loading-ok');c.evaluate("engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000")
    c.wait("engine.openingMovie.phase==='idle'")
    c.evaluate('engine._openSettings()')
    assert c.evaluate("document.getElementById('window-opacity-slider').value==='65'&&Math.abs(VN_CONFIG.settings.windowOpacity-.35)<.001")
    assert abs(alpha(state()['text'])-.35)<.001,state()
    c.evaluate("engine._resetGameState();engine._showTitleScreen()")
    assert c.evaluate("localStorage.getItem('vn_window_opacity')==='0.35'"),state()
    passed('Saved transparency restores after an actual page reload and survives game reset')

if __name__=='__main__':
    import sys,check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-display-settings-20261021/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True);check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--display-settings-only');check_report11.main()
