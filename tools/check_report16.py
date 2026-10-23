"""Report16: existing transitions/music plus revised bonus continuity in a real browser."""
import json
import sys


def run(c, passed, out):
    from check_report14 import run as transitions
    from check_report15 import run as sound_and_chapters
    if '--continuity-only' not in sys.argv:
        sound_and_chapters(c, passed, out)
        transitions(c, passed, out)
    c.evaluate('engine.openingMovie.finish();VN_CONFIG.openingMovieIdleMs=3600000')
    for language in ['ja', 'en']:
        c.evaluate('(async()=>{await engine._setLanguage('+json.dumps(language)+",{returnToTitle:true});VN_CONFIG.settings.typeSpeed=0;engine._chainMode='none'})()")
        c.evaluate("(async()=>{engine._resetGameState();engine._showTitleScreen();engine.seenGoodEnds=new Set(['sakura','kotoha','mahiru']);await engine.bonus.start();engine._gotoLabel('bonus_board')})()")
        c.wait("engine.currentBG==='library_evening'&&engine.waitingForInput&&getComputedStyle(engine.tx.canvas).display==='none'")
        c.shot('board-library-'+language)
        assert c.evaluate("engine.currentText===VN_BONUS.texts[engine.currentLanguage].r277")
        passed(language+': board research starts at the library after packing away mahjong')
        c.evaluate("engine._gotoLabel('bonus_yukkuri')")
        c.wait("engine.currentBG==='classroom_evening'&&engine.waitingForInput&&getComputedStyle(engine.tx.canvas).display==='none'")
        c.shot('return-classroom-'+language)
        passed(language+': photo presentation returns to the classroom')
        assert c.evaluate("VN_BONUS.endcard.endsWith('bonus_endcard_v3.webp')&&Object.keys(VN_BONUS.texts[engine.currentLanguage]).length===285")
        passed(language+': revised ending and third endcard are present with all original dialogue IDs')
    assert c.evaluate("VN_BONUS.texts.ja.r034==='勇、そっちの机持って！'&&VN_BONUS.texts.ja.r040==='まひるも参加！　あと一人！'&&VN_BONUS.texts.ja.r044==='四人目、ことは呼んでこよ！'")
    passed('Sakura’s approved familiar forms of address remain unchanged')


if __name__ == '__main__':
    import sys
    import check_report11
    check_report11.OUT = check_report11.ROOT.parent/'stella-debug-report16-20261023/verification'
    check_report11.OUT.mkdir(parents=True, exist_ok=True)
    check_report11.h.OUT = check_report11.OUT
    sys.argv.append('--report16-only')
    check_report11.main()
