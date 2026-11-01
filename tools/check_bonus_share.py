"""Completion receipts, analytics failures, sharing and recovery in a real browser."""
import json
import time


def run(c, passed, out):
    c.evaluate("window._clearEvents=[];window.gtag=(...args)=>_clearEvents.push(args);localStorage.removeItem('vn_bonus_clear_receipt')")
    c.evaluate("engine._resetGameState();engine._showTitleScreen();engine.bonus.active=true;engine.flags.bonus_run=true;engine.currentLabel='bonus_leave';engine.bonus.run('finish')")
    assert c.evaluate("!engine.bonus.readClearReceipt()&&_clearEvents.filter(e=>e[1]==='bonus_clear').length===0")
    passed('Leaving the extra early does not issue a receipt or send a clear event')

    legacy = dict(code='ST-00000000-00000000-00000000-00000000', clearedAt='2026-10-30T00:00:00.000Z')
    c.evaluate('localStorage.setItem("vn_bonus_clear_receipt",'+json.dumps(json.dumps(legacy))+')')
    upgraded = c.evaluate('engine.bonus.readClearReceipt()')
    assert upgraded['code'] == legacy['code'] and upgraded['clearedAt'] == legacy['clearedAt']
    assert list(map(len, upgraded['clear_phrase'].split('／'))) == [5, 7, 5]
    assert c.evaluate('engine.bonus.readClearReceipt()') == upgraded
    assert c.evaluate("_clearEvents.filter(e=>e[1]==='bonus_clear_phrase_assigned').length") == 1
    assert c.evaluate("_clearEvents.filter(e=>e[1]==='bonus_clear').length") == 0
    c.evaluate('engine.flags.bonus_clear_receipt='+json.dumps(legacy))
    assert c.evaluate('engine.bonus.clearReceipt()') == upgraded
    assert c.evaluate("_clearEvents.filter(e=>e[1]==='bonus_clear_phrase_assigned').length") == 1
    passed('Stored legacy codes and save flags gain a stable poem without changing the ID/time or issuing another clear event')

    def finish(lang):
        c.evaluate("(async()=>{engine._resetGameState();engine._showTitleScreen();await engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true});engine.seenGoodEnds=new Set(['sakura','kotoha','mahiru']);await engine.bonus.start();engine._gotoLabel('bonus_apology')})()")
        for _ in range(95):
            if c.evaluate("!!document.getElementById('bonus-endcard')"):
                break
            c.evaluate("if(engine.bonus.videoFinish)engine.bonus.videoFinish();engine._stillLockUntil=0;engine._onAdvance()")
            time.sleep(.06)
        c.wait("document.querySelector('#bonus-endcard img')?.naturalWidth===1920")
        time.sleep(1.3)

    previous = None
    for lang in ['ja', 'en']:
        finish(lang)
        receipt = c.evaluate('engine.flags.bonus_clear_receipt')
        assert receipt['code'] != previous
        previous = receipt['code']
        assert c.evaluate("engine.bonus.validClearReceipt(engine.flags.bonus_clear_receipt)")
        assert c.evaluate('engine.bonus.readClearReceipt()') == receipt
        events = c.evaluate("_clearEvents.filter(e=>e[1]==='bonus_clear')")
        assert len(events) == (1 if lang == 'ja' else 2)
        assert events[-1][2]['clear_code'] == receipt['code']
        assert events[-1][2]['clear_phrase'] == receipt['clear_phrase']
        assert list(map(len, receipt['clear_phrase'].split('／'))) == [5, 7, 5]
        assert events[-1][2]['cleared_at'] == receipt['clearedAt']
        for key in ['play_time_seconds', 'all_skip_used', 'unread_skip_count', 'play_tracking_started_at', 'play_history_partial']:
            assert events[-1][2][key] == receipt[key]
        assert receipt['play_time_seconds'] >= 0
        assert c.evaluate('!engine.playHistory.running')
        assert c.evaluate('engine.bonus.clearReceipt()') == receipt
        assert c.evaluate("_clearEvents.filter(e=>e[1]==='bonus_clear').length") == len(events)
        share = c.evaluate("(()=>{const a=document.querySelector('#bonus-endcard .bonus-clear-actions a');const u=new URL(a.href);return {host:u.host,text:u.searchParams.get('text'),target:a.target,rel:a.rel}})()")
        assert share['host'] == 'twitter.com' and receipt['clear_phrase'] in share['text'] and receipt['code'] not in share['text'] and receipt['clearedAt'] in share['text']
        assert '@houkago_stella' in share['text'] and '#放課後のステラ' in share['text']
        assert share['target'] == '_blank' and 'noopener' in share['rel']
        assert c.evaluate("(()=>{const a=document.querySelector('#bonus-endcard .bonus-clear-actions a').getBoundingClientRect(),b=document.getElementById('bonus-endcard-back').getBoundingClientRect();return a.right<=b.left&&a.bottom<=innerHeight})()")
        c.shot('campaign-endcard-'+lang)
        assert c.evaluate("(()=>{const i=document.querySelector('#bonus-endcard img').getBoundingClientRect(),c=document.getElementById('bonus-endcard').getBoundingClientRect();return Math.abs(i.width-c.width)<1&&Math.abs(i.height-c.height)<1})()")
        c.click('#bonus-endcard-toggle')
        assert c.evaluate("document.getElementById('bonus-endcard-toggle').getAttribute('aria-expanded')==='false'&&getComputedStyle(document.getElementById('bonus-endcard-info')).display==='none'")
        assert c.evaluate('engine.flags.bonus_clear_receipt') == receipt
        c.shot('campaign-endcard-image-only-'+lang)
        c.click('#bonus-endcard-toggle')
        assert c.evaluate("document.getElementById('bonus-endcard-toggle').getAttribute('aria-expanded')==='true'&&getComputedStyle(document.getElementById('bonus-endcard-info')).display!=='none'")
        c.click('#bonus-endcard-back')
        c.click('#btn-bonus-receipt')
        assert c.evaluate("document.querySelector('#bonus-receipt-modal code').textContent") == receipt['clear_phrase']
        c.key('Escape')
        assert c.evaluate("!document.getElementById('bonus-receipt-modal')&&document.activeElement.id==='btn-bonus-receipt'")
        passed(lang+': real final scene issues one receipt/event, safe editable X link, screenshot and title recovery')

    # Failure modes must not prevent completion or advertise successful GA4 delivery.
    c.evaluate("window.gtag=(...args)=>{if(args[1]==='bonus_clear')throw Error('blocked analytics')}")
    finish('ja')
    assert c.evaluate("!!document.querySelector('#bonus-endcard code')")
    c.evaluate("window._storageSet=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw Error('storage unavailable')};delete engine.flags.bonus_clear_receipt")
    assert c.evaluate('engine.bonus.validClearReceipt(engine.bonus.clearReceipt())')
    c.evaluate('Storage.prototype.setItem=_storageSet')
    c.evaluate("window._clipboardWrite=navigator.clipboard.writeText.bind(navigator.clipboard);navigator.clipboard.writeText=()=>Promise.reject(Error('denied'))")
    c.click('#bonus-endcard .bonus-clear-actions button')
    c.wait("document.querySelector('#bonus-endcard [role=status]').textContent.includes('スクショ')")
    c.evaluate("navigator.clipboard.writeText=async text=>{window._copiedReceipt=text}")
    c.click('#bonus-endcard .bonus-clear-actions button')
    c.wait("document.querySelector('#bonus-endcard [role=status]').textContent.includes('コピーしました')")
    assert c.evaluate("_copiedReceipt.includes(document.querySelector('#bonus-endcard code').textContent)")
    c.evaluate('navigator.clipboard.writeText=_clipboardWrite')
    assert c.evaluate("(()=>{const old={code:'ST-00000000-00000000-00000000-00000000',clearedAt:'2026-10-30T00:00:00.000Z'};return engine.bonus.receiptText(old).includes(old.code)&&engine.bonus.createReceiptPanel(old).querySelector('code').textContent===old.code})()")
    passed('Blocked analytics/storage do not stop completion; clipboard denial and success both give feedback')

    c.click('#bonus-endcard-back')
    stored = c.evaluate('engine.bonus.readClearReceipt()')
    c.evaluate('window._receiptReloadSentinel=true')
    c.send('Page.reload')
    c.wait("!window._receiptReloadSentinel&&typeof engine!=='undefined'&&!!document.getElementById('btn-bonus-receipt')", 90)
    assert c.evaluate('engine.bonus.readClearReceipt()') == stored
    assert not c.errors, c.errors
    passed('The most recent completion record survives a page reload')
