"""Exercise the unlocked in-story extra choice without debug or a title-menu entry."""
import json
import time


def run(c, passed, out):
    def advance_until(condition, limit=120):
        for _ in range(limit):
            if c.evaluate(condition):return
            c.evaluate('engine._stillLockUntil=0;engine._onAdvance()');time.sleep(.04)
        raise AssertionError(c.evaluate('({label:engine.currentLabel,index:engine.currentIndex,key:engine._curLineKey,locked:engine._inputLocked})'))

    def begin(cleared):
        c.evaluate("engine._resetGameState();engine._showTitleScreen();engine.seenStills=new Set();engine.seenGoodEnds=new Set("+json.dumps(cleared)+");engine._startFromLabel('chapter4_start');engine.flags.entry_test=73")
        c.wait("getComputedStyle(engine.tx.canvas).display==='none'")
        advance_until("!document.getElementById('choices-overlay').classList.contains('hidden')||engine._curLineKey==='$chapter4.chapter4_start.r006'")

    for lang in ['ja','en']:
        c.evaluate("(async()=>{engine._resetGameState();engine._showTitleScreen();await engine._setLanguage("+json.dumps(lang)+",{returnToTitle:true});VN_CONFIG.settings.debug=false;VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none'})()")
        for cleared in [[],['sakura','kotoha']]:
            begin(cleared)
            assert c.evaluate("!engine.bonus.active&&document.getElementById('choices-overlay').classList.contains('hidden')&&engine._curLineKey==='$chapter4.chapter4_start.r006'")
        passed(lang+': 0/3 and 2/3 GOOD endings continue Chapter 4 without the extra choice')

        begin(['sakura','kotoha','mahiru'])
        labels=c.evaluate("[...document.querySelectorAll('#choices-container button')].map(b=>b.textContent)")
        assert len(labels)==2 and labels[1]==('いっそ、好きにやってみるか' if lang=='ja' else "Let's just do whatever we want."),labels
        assert c.evaluate("!engine.bonus.active&&!VN_CONFIG.settings.debug&&!document.getElementById('btn-bonus')&&!engine.autoMode&&!engine.skipMode")
        c.click('#choices-container button:first-child')
        assert c.evaluate("!engine.bonus.active&&engine.flags.entry_test===73&&engine._curLineKey==='$chapter4.chapter4_start.r006'")
        passed(lang+': all three GOOD endings unlock the in-story choice; ordinary preparation resumes at the next line')

        begin(['sakura','kotoha','mahiru'])
        before=c.evaluate('({chars:JSON.stringify(engine.charState),bg:engine.currentBG,color:engine.windowColor})')
        c.shot('28-story-entry-'+lang)
        c.click('#choices-container button:last-child')
        c.wait("engine.bonus.active&&engine.currentLabel==='bonus_start'")
        assert c.evaluate("!VN_CONFIG.settings.debug&&engine.flags.bonus_return.label==='chapter4_start'&&engine.flags.bonus_return.flags.entry_test===73")
        c.evaluate('engine._saveToSlot(98);engine._resetGameState();engine._showTitleScreen();engine._loadFromSlot(98)')
        advance_until("!document.getElementById('choices-overlay').classList.contains('hidden')")
        c.click('#choices-container button:first-child')
        assert c.evaluate("!engine.bonus.active&&!engine.flags.bonus_run&&!engine.flags.bonus_return&&engine._curLineKey==='$chapter4.chapter4_start.r006'&&engine.flags.entry_test===73")
        assert c.evaluate('JSON.stringify(engine.charState)')==before['chars']
        assert c.evaluate('engine.currentBG')==before['bg']
        assert c.evaluate('engine.windowColor')==before['color']
        passed(lang+': entering without debug shows the warning; declining after save/load restores main-story progress, flags, background and characters')

        begin(['sakura','kotoha','mahiru'])
        c.click('#choices-container button:last-child')
        c.wait("engine.currentLabel==='bonus_start'&&engine.bonus.active")
        advance_until("!document.getElementById('choices-overlay').classList.contains('hidden')")
        c.click('#choices-container button:last-child')
        assert c.evaluate("engine.currentLabel==='bonus_meeting'&&engine.bonus.active&&!VN_CONFIG.settings.debug")
        passed(lang+': accepting the warning enters the voiced bonus meeting from the main story')

    begin(['sakura','kotoha','mahiru'])
    c.evaluate("window._entryPreload=engine.bonus.preload;engine.bonus.preload=()=>Promise.reject(Error('Expected entry load failure'))")
    c.click('#choices-container button:last-child')
    c.wait("!engine._inputLocked&&!engine.bonus.starting&&!document.getElementById('choices-overlay').classList.contains('hidden')")
    c.evaluate('engine.bonus.preload=_entryPreload')
    c.click('#choices-container button:first-child')
    assert c.evaluate("engine._curLineKey==='$chapter4.chapter4_start.r006'&&!engine.bonus.active")
    passed('A failed extra preload restores the choice and allows the ordinary story to continue')

    begin(['sakura','kotoha','mahiru'])
    c.evaluate('engine.bonus.preload=()=>new Promise(resolve=>window._releaseEntryPreload=resolve)')
    c.click('#choices-container button:last-child')
    c.evaluate('engine._resetGameState();engine._showTitleScreen();_releaseEntryPreload();engine.bonus.preload=_entryPreload')
    time.sleep(.1)
    assert c.evaluate("!engine.bonus.active&&!engine._gameActive&&!engine._inputLocked&&!document.getElementById('title-screen').classList.contains('hidden')&&!document.getElementById('btn-bonus')")
    assert not c.errors,c.errors
    passed('Reset during asynchronous entry cancels the handoff; no title extra entry or browser exceptions')


if __name__=='__main__':
    import sys
    import check_bonus_scenario
    sys.argv.append('--story-entry-only')
    check_bonus_scenario.main()
