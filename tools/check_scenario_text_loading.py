"""Real browser audit of every localized reference and stale/failed text recovery."""
import json
import time


def run(c, passed, out):
    keys=['chapter1.chapter1_lunch.pack_up','chapter1.chapter1_lunch.pack_up.s002']
    for lang in ['ja','en']:
        c.evaluate("engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true})")
        stats=c.evaluate("""(()=>{const refs=Object.values(engine.labels).flat().flatMap(cmd=>engine._commandTextReferences(cmd));
          const missing=engine._missingScenarioTexts();for(const ref of refs)engine._resolveScenarioText(ref);
          return {references:refs.length,unique:new Set(refs).size,missing};})()""")
        assert not stats['missing'] and stats['references']>3600,stats
        passed(lang+': all '+str(stats['references'])+' parsed main/bonus dialogue, choice and ending references resolve; no missing keys')
        c.evaluate("VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none';engine._startFromLabel('chapter1_lunch')")
        c.wait("getComputedStyle(engine.tx.canvas).display==='none'")
        for key in keys:
            for _ in range(100):
                if c.evaluate('engine._curLineKey==='+json.dumps('$'+key)):break
                c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.03)
            assert c.evaluate('engine._curLineKey==='+json.dumps('$'+key)),key
            text=c.evaluate('engine.currentText')
            assert text==c.evaluate('engine.scenarioTexts['+json.dumps(key)+']') and key not in text,text
            c.shot(lang+'-'+key.rsplit('.',1)[-1])
        passed(lang+': the two reported lunch lines display their actual story text in the real scene')

        # Return stale dictionaries first, including missing keys in another chapter.
        result=c.evaluate("""(async()=>{const original=window.fetch;const reads={};const requests=[];
          window.fetch=async (url,options)=>{const response=await original(url,options);const name=new URL(url,location.href).pathname;
            if(name.includes('/locales/scenario.')){reads[name]=(reads[name]||0)+1;requests.push({url:String(url),cache:options?.cache});
              if(reads[name]===1){const data=await response.json();for(const key of ['chapter1.chapter1_lunch.pack_up','chapter1.chapter1_lunch.pack_up.s002',...Object.keys(data).slice(0,3)])delete data[key];
                return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});}}
            return response;};
          try{return {ok:await engine._loadScenarioBundle(),reads,requests,missing:engine._missingScenarioTexts()};}finally{window.fetch=original;}})()""")
        assert result['ok'] and not result['missing'] and max(result['reads'].values())==2,result
        assert all(request['cache']=='no-store' and 'v=1.4.1' in request['url'] for request in result['requests']),result
        passed(lang+': stale dictionaries missing the reported lines and other text are detected and recovered by a fresh bundle read')

    c.evaluate("localStorage.setItem('vn_save_97','KEEP SAVE');window._textAuditFetch=window.fetch;window.fetch=(url,options)=>String(url).includes('locales/scenario.')?Promise.resolve(new Response('',{status:503})):_textAuditFetch(url,options)")
    assert c.evaluate('engine._loadScenarioBundle()') is False
    c.wait("!!document.getElementById('scenario-load-error')")
    assert c.evaluate("document.getElementById('scenario-load-message').textContent.includes('Unable to load')&&document.querySelector('#scenario-load-error button').textContent==='Reload'&&localStorage.getItem('vn_save_97')==='KEEP SAVE'&&engine._inputLocked")
    assert c.evaluate("!document.getElementById('scenario-load-error').textContent.includes('chapter1.')")
    c.shot('load-failure-retry')
    passed('Persistent HTTP failure shows a localized Reload action instead of raw IDs and preserves saved data')
    c.evaluate('window.fetch=_textAuditFetch')
    # A real in-game reload keeps the existing unsaved-progress confirmation.
    # Schedule the click so CDP can accept that dialog before awaiting reload.
    c.evaluate("setTimeout(()=>document.querySelector('#scenario-load-error button').click(),0);true")
    time.sleep(.2)
    c.send('Page.handleJavaScriptDialog',dict(accept=True))
    c.wait("typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",100)
    c.click('#btn-loading-ok')
    c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000')
    c.wait("engine.openingMovie.phase==='idle'")
    assert c.evaluate("!document.getElementById('scenario-load-error')&&engine._missingScenarioTexts().length===0&&localStorage.getItem('vn_save_97')==='KEEP SAVE'")
    passed('Reload after recovery starts with a complete validated dictionary and keeps the save untouched')


if __name__=='__main__':
    import sys
    import check_report11
    check_report11.OUT=check_report11.ROOT.parent/'stella-scenario-text-20261023/verification'
    check_report11.OUT.mkdir(parents=True,exist_ok=True)
    check_report11.h.OUT=check_report11.OUT
    sys.argv.append('--scenario-text-only')
    check_report11.main()
