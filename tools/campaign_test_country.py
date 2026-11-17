"""Deterministic country responses for isolated CDP tests, never production overrides."""
import json

def install(c, body='loc=JP\n', mode='response'):
    source = """(()=>{
      const original=window.fetch;
      window._countryRequests=0;
      window.fetch=function(input,options){
        const url=typeof input==='string'?input:input.url;
        if(url!=='https://www.cloudflare.com/cdn-cgi/trace')return original.call(this,input,options);
        window._countryRequests++;window._countryOptions=options;
        const mode=MODE,body=BODY;
        if(mode==='error')return Promise.reject(new TypeError('Country lookup blocked'));
        if(mode==='pending')return new Promise(resolve=>{window._resolveCountry=()=>resolve(new Response(body))});
        if(mode==='timeout')return new Promise(()=>{});
        if(mode==='http-error')return Promise.resolve(new Response(body,{status:503}));
        return Promise.resolve(new Response(body));
      };
    })()""".replace('MODE',json.dumps(mode)).replace('BODY',json.dumps(body))
    return c.send('Page.addScriptToEvaluateOnNewDocument',{'source':source})['identifier']
