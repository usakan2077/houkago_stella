"""Country-gated promotion and ordinary completion sharing in real Edge."""
import json
import re
import urllib.request
from campaign_test_country import install

HIDDEN = "[...document.querySelectorAll('[data-japan-campaign]')].every(n=>n.hidden&&getComputedStyle(n).display==='none'&&n.getClientRects().length===0)"

def run(c,passed,out,base,mock):
    paths=['index.html','lp/index.html','lp/ai/index.html']
    paths += [f'{folder}/index.{lang}.html' for folder in ['lp','lp/ai'] for lang in ['en','zh-CN','zh-TW']]
    for path in paths:
        raw=urllib.request.urlopen(base+'/'+path).read().decode('utf-8')
        regions=re.findall(r'<[^>]*\bdata-japan-campaign\b[^>]*>',raw)
        assert regions and all(re.search(r'\bhidden(?:[\s=>])',node) for node in regions),path
        assert 'campaign.js?v=1.4.7-jp1' in raw,path
    passed('All 9 static entries start with hidden campaign regions before JavaScript or country lookup')

    c.evaluate('StellaCampaignVisibility.ready')
    assert c.evaluate('StellaCampaignVisibility.allowed')
    # A saved completion stays available overseas without advertising contest entry.
    receipt=c.evaluate('engine.bonus.clearReceipt()')
    assert '#キャンペーン応募' in c.evaluate('engine.bonus.receiptText(engine.bonus.readClearReceipt())')
    for path in paths[1:]:
        c.send('Page.navigate',{'url':base+'/'+path})
        c.wait("document.readyState==='complete'&&!!window.StellaCampaignVisibility",40)
        assert c.evaluate('StellaCampaignVisibility.ready')
        assert c.evaluate("[...document.querySelectorAll('[data-japan-campaign]')].every(n=>!n.hidden&&n.getClientRects().length>0)")
        for lang in ['ja','en','zh-CN','zh-TW']:
            c.evaluate('document.documentElement.lang='+json.dumps(lang))
            assert c.evaluate("!document.querySelector('[data-campaign-open]').hidden&&_countryRequests===1")
    passed('Japan access shows both LPs and all localized entries in every play language with one lookup per page')

    def change(body,mode='response'):
        nonlocal mock
        c.send('Page.removeScriptToEvaluateOnNewDocument',{'identifier':mock})
        mock=install(c,body,mode)

    change('loc=CN\n')
    for path in paths[1:]:
        c.send('Page.navigate',{'url':base+'/'+path+'?lang=ja'})
        c.wait("document.readyState==='complete'&&!!window.StellaCampaignVisibility",40)
        assert c.evaluate('StellaCampaignVisibility.ready') is False
        assert c.evaluate(HIDDEN),path
        c.evaluate("document.querySelector('[data-campaign-open]').click()")
        assert c.evaluate("!document.querySelector('#stella-campaign-dialog[open]')")
    passed('China access hides every LP campaign without blank space, including Japanese-language URLs; direct clicks cannot open rules')

    cases=[('loc=US\n','response'),('loc=HK\n','response'),('loc=KR\n','response'),
           ('','response'),('<html>JP</html>','response'),('loc=JP\nloc=CN\n','response'),
           ('loc=jp\n','response'),('loc=JP\n','http-error'),('loc=JP\n','error'),('loc=JP\n','timeout')]
    for body,mode in cases:
        change(body,mode)
        c.send('Page.navigate',{'url':base+'/lp/index.html?lang=ja&country=JP'})
        c.wait("document.readyState==='complete'&&!!window.StellaCampaignVisibility",40)
        assert c.evaluate('StellaCampaignVisibility.ready') is False,[body,mode]
        assert c.evaluate(HIDDEN),[body,mode]
    passed('US/HK/KR, unknown/malformed/ambiguous country, HTTP/network failure and timeout stay hidden; URL country cannot override')

    change('loc=JP\n','pending')
    c.send('Page.navigate',{'url':base+'/lp/index.en.html'})
    c.wait("document.readyState==='complete'&&!!window._resolveCountry",40)
    assert c.evaluate(HIDDEN)
    c.evaluate('_resolveCountry()')
    assert c.evaluate('StellaCampaignVisibility.ready')
    assert c.evaluate("!document.querySelector('.campaign-lp').hidden")
    assert c.evaluate("_countryOptions.credentials==='omit'&&_countryOptions.referrerPolicy==='no-referrer'&&_countryOptions.cache==='no-store'")
    passed('Pending country lookup never flashes the promotion; confirmed JP reveals it without cookies or referrer')

    change('loc=CN\n')
    c.send('Page.navigate',{'url':base+'/index.html?lang=ja'})
    c.wait("typeof engine!=='undefined'&&document.querySelector('#btn-loading-ok')?.style.visibility===''",120)
    c.click('#btn-loading-ok');c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000')
    c.wait("engine.openingMovie.phase==='idle'&&getComputedStyle(document.getElementById('title-logo-wrapper')).opacity==='1'")
    assert c.evaluate('StellaCampaignVisibility.ready') is False
    assert c.evaluate(HIDDEN)
    assert c.evaluate('engine.bonus.readClearReceipt()')==receipt
    c.evaluate('engine.bonus.refreshClearReceiptButton();engine.bonus.openClearReceipt()')
    c.wait("!!document.getElementById('bonus-receipt-modal')")
    assert c.evaluate("getComputedStyle(document.querySelector('#bonus-receipt-modal code')).display==='none'")
    share=c.evaluate("new URL(document.querySelector('#bonus-receipt-modal a').href).searchParams.get('text')")
    assert '#キャンペーン応募' not in share and receipt['clear_phrase'] not in share and receipt['code'] not in share
    assert receipt['clearedAt'] in share and '@houkago_stella' in share
    c.evaluate("navigator.clipboard.writeText=async()=>{throw new Error('Clipboard denied')}")
    c.click('#bonus-receipt-modal .bonus-clear-actions button')
    c.wait("document.querySelector('#bonus-receipt-modal [role=status]').textContent.includes('スクショ')")
    assert c.evaluate("!document.querySelector('#bonus-receipt-modal [role=status]').textContent.includes('コード')")
    c.evaluate('navigator.clipboard.writeText=async text=>{window._copiedCountryReceipt=text}')
    c.click('#bonus-receipt-modal .bonus-clear-actions button')
    c.wait("typeof _copiedCountryReceipt==='string'")
    assert c.evaluate('_copiedCountryReceipt')==share
    c.key('Escape')
    assert c.evaluate("!document.getElementById('bonus-receipt-modal')&&document.activeElement.id==='btn-bonus-receipt'")
    assert not c.errors,c.errors
    passed('Game abroad hides promotion and entry code/hashtag, preserves saved completion and generic share/copy, and closes by keyboard')
