"""Render local English and Chinese LP entries with static text/OG tags and working language switches.

Uses isolated headless Edge; external requests are blocked. No translation services.
"""
import html
import http.server
import json
import posixpath
import re
import subprocess
import threading
import time
import urllib.request
from pathlib import Path
import check_opening_movie as browser

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT.parent/'stella-chinese-artwork-check-20261117'
SNAPSHOT="""(()=>{
  StellaI18n.captureDocument();
  const copy=document.documentElement.cloneNode(true);
  const selector='[data-en], img[alt], [aria-label], [title]';
  const live=[...document.querySelectorAll(selector)],saved=[...copy.querySelectorAll(selector)];
  live.forEach((node,i)=>{
    const original=StellaI18n.sourceFor(node),target=saved[i];
    if(!original)return;
    if(node.hasAttribute('data-en'))target.dataset.ja=original.html;
    for(const [key,field] of [['jaAlt','alt'],['jaLabel','label'],['jaTitle','title']])
      if(original[field]!==null)target.dataset[key]=original[field];
  });
  const select=copy.querySelector('.stella-language-select');
  for(const option of select.options)option.toggleAttribute('selected',option.value===document.documentElement.lang);
  copy.querySelector('#stella-campaign-dialog')?.remove();
  // A generated entry must never publish a country decision from the build machine.
  copy.querySelectorAll('[data-japan-campaign]').forEach(node=>node.hidden=true);
  // Embedded social widgets load separately at runtime; never freeze their iframe state.
  copy.querySelectorAll('iframe').forEach(node=>node.remove());
  return '<!doctype html>\\n'+copy.outerHTML+'\\n';
})()"""

def main():
    OUT.mkdir(exist_ok=True)
    profile=OUT/('build-profile-'+str(time.time_ns()))
    class Server(http.server.ThreadingHTTPServer):request_queue_size=64
    server=Server(('127.0.0.1',0),browser.Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=0
    log=(OUT/'build-edge.log').open('w')
    process=subprocess.Popen(['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','--headless=new','--guest','--disable-gpu','--no-first-run','--disable-background-networking','--mute-audio','--remote-debugging-port=0','--remote-allow-origins=*','--user-data-dir='+str(profile),'about:blank'],startupinfo=startup,creationflags=subprocess.CREATE_NO_WINDOW,stdout=subprocess.DEVNULL,stderr=log)
    client=None
    try:
        deadline=time.monotonic()+30
        while not (profile/'DevToolsActivePort').exists():assert time.monotonic()<deadline;time.sleep(.1)
        port=int((profile/'DevToolsActivePort').read_text().splitlines()[0]);targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json/list'))
        client=browser.CDP(next(t['webSocketDebuggerUrl'] for t in targets if t['type']=='page'))
        client.send('Page.enable');client.send('Runtime.enable');client.send('Network.enable')
        client.send('Network.setBlockedURLs',{'urls':['https://*']})
        base=f'http://127.0.0.1:{server.server_port}'
        for folder in ['lp','lp/ai']:
            source=(ROOT/folder/'index.html').read_text(encoding='utf-8')
            ja_title=html.unescape(re.search(r'<title>(.*?)</title>',source,re.S)[1])
            ja_description=html.unescape(re.search(r'<meta name="description" content="([^"]*)"',source)[1])
            for language in ['en','zh-CN','zh-TW','ko']:
                client.send('Page.navigate',{'url':base+'/'+folder+'/?lang='+language})
                client.wait("document.readyState==='complete' && document.documentElement.lang==="+json.dumps(language),60)
                client.wait("document.querySelector('meta[property=\"og:image\"]').content.includes('og."+language+"-v1.png')")
                client.evaluate('document.documentElement.dataset.pageLanguage='+json.dumps(language))
                client.evaluate('document.documentElement.dataset.jaTitle='+json.dumps(ja_title))
                client.evaluate('document.documentElement.dataset.jaDescription='+json.dumps(ja_description))
                content=client.evaluate(SNAPSHOT)
                def relative(match):
                    value=html.unescape(match[2])
                    if value.startswith(base+'/'):value=value[len(base):]
                    if value.startswith('/') and not value.startswith('//'):
                        path,sep,suffix=value.partition('?')
                        value=posixpath.relpath(path.lstrip('/'),folder)+(sep+suffix if sep else '')
                    return match[1]+html.escape(value,quote=True)+match[3]
                content=re.sub(r'((?:src|href|poster)=["\'])(.*?)(["\'])',relative,content)
                content=re.sub(r'<html([^>]*)>',r'<html\1 data-generated-from="index.html">',content,count=1)
                target=ROOT/folder/f'index.{language}.html';target.write_text(content,encoding='utf-8')
                print('BUILT',target.relative_to(ROOT),flush=True)
        assert not client.errors,client.errors
    finally:
        if client:client.sock.close()
        process.terminate();process.wait(timeout=10);server.shutdown();log.close()

if __name__=='__main__':main()
