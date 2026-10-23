"""Compose bilingual school-newspaper inserts from the existing cheating photo."""
from base64 import b64encode
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/bonus'
PHOTO = ROOT / 'assets/images/stills/bonus_07_tetsuya_luck.webp'


def text(x, y, value, size=22, bold=False):
    return (f'<text x="{x}" y="{y}" font-family="Yu Mincho, MS Mincho, Georgia, serif" '
            f'font-size="{size}" fill="#201e19" font-weight="{700 if bold else 400}">'
            f'{escape(value)}</text>')


def build():
    photo = 'data:image/webp;base64,' + b64encode(PHOTO.read_bytes()).decode('ascii')
    OUT.mkdir(parents=True, exist_ok=True)
    for lang in ['ja', 'en']:
        ja = lang == 'ja'
        parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="470" viewBox="0 0 1200 470">',
                 '<title>' + ('学園新聞号外・延原のいかさま発覚' if ja else 'School newspaper extra: Nobuhara caught cheating') + '</title>',
                 '<rect width="1200" height="470" fill="#f1ecdc"/>',
                 '<path d="M18 62H1182M18 67H1182M18 117H1182M599 128V438M18 447H1182" stroke="#28251e" stroke-width="2"/>',
                 text(24, 46, '学 園 新 聞' if ja else 'THE SCHOOL CHRONICLE', 38, True),
                 text(650, 42, '放課後発行 / 校内掲示用' if ja else 'AFTER SCHOOL / NOTICEBOARD COPY', 17),
                 '<rect x="1066" y="12" width="110" height="43" fill="#28251e"/>',
                 '<text x="1121" y="43" text-anchor="middle" fill="#f1ecdc" font-family="serif" font-size="28" font-weight="bold">' + ('号外' if ja else 'EXTRA') + '</text>',
                 text(24, 104, '実況者、選手転向直後に不正' if ja else 'COMMENTATOR CAUGHT CHEATING ON DEBUT', 39 if ja else 32, True),
                 f'<image x="24" y="128" width="560" height="288" preserveAspectRatio="xMidYMid slice" href="{photo}"/>',
                 '<rect x="24" y="128" width="560" height="288" fill="none" stroke="#28251e"/>',
                 text(24, 437, '決定的瞬間：手牌と牌山に伸びる両手　撮影・まひる' if ja else 'CAUGHT IN THE ACT: hands on the wall. Photo: Mahiru.', 16),
                 text(618, 157, '牌山すり替え未遂、カメラは見ていた' if ja else 'Tile-wall switch foiled by camera', 25, True)]
        lines = ([
            '「俺なら切らねえ」と自信を見せた実況者が、',
            '選手席へ移った直後、牌山に両手を伸ばした。',
            '正面のカメラが、その一部始終を捉えていた。',
            '本人は写真削除の対価に五百円を提示。',
        ] if ja else [
            'After claiming he would never deal in, the',
            'commentator took a seat and reached for the wall.',
            'A camera directly in front of him caught it all.',
            'He offered 500 yen to have the photograph deleted.',
        ])
        for i, line in enumerate(lines):
            parts.append(text(618, 195 + i * 29, line, 21 if ja else 19))
        parts += ['<path d="M618 305H1176" stroke="#28251e"/>',
                  text(618, 337, '本人談「博奕打ちは嘘をつく」' if ja else 'His own words: “Gamblers tell lies.”', 24, True),
                  text(618, 373, 'なお、文化祭の出し物は依然として未定。' if ja else 'The festival attraction remains undecided.', 21),
                  text(618, 408, '写真・構成：まひる ／ 取材場所：教室' if ja else 'Photo & layout: Mahiru / Reporting from the classroom', 17),
                  text(24, 464, '文化祭準備特別号　｜　紙面は完成。提出用紙は白紙。' if ja else 'FESTIVAL PREP SPECIAL | The paper is finished. The proposal is blank.', 14),
                  '</svg>']
        (OUT / f'bonus_newspaper_{lang}.svg').write_text(''.join(parts) + '\n', encoding='utf8')
    print('Built Japanese and English newspaper images with the original cheating photo embedded.')


if __name__ == '__main__':
    build()
