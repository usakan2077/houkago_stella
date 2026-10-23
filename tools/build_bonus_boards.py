"""Draw readable, fictional period-board inserts as native SVG artwork."""
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/bonus'
WIDTH, HEIGHT = 1200, 470


def text(x, y, value, size=18, color='#000', family='MS PGothic, Meiryo, sans-serif', bold=False, underline=False):
    return (f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" '
            f'fill="{color}"' + (' font-weight="bold"' if bold else '')
            + (' text-decoration="underline"' if underline else '') + f'>{escape(value)}</text>')


def rect(x, y, w, h, fill, stroke='none'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}"/>'


def save(name, parts, description):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">'
           f'<title>{escape(description)}</title>' + ''.join(parts) + '</svg>\n')
    (OUT / f'bonus_board_{name}.svg').write_text(svg, encoding='utf8')


def vip_header():
    parts = [rect(0, 0, WIDTH, HEIGHT, '#efefef'),
             '<defs><pattern id="brick" width="90" height="32" patternUnits="userSpaceOnUse">'
             '<rect width="90" height="32" fill="#d8c5ad"/><path d="M0 0H90M0 16H90M45 0V16M0 16V32M90 16V32" stroke="#f4eadc"/></pattern></defs>',
             rect(0, 0, WIDTH, 86, 'url(#brick)'), rect(350, 9, 500, 65, '#fff', '#45458a'),
             text(370, 32, '文化祭実行委員 募集 !!', 23, '#5254a0', bold=True),
             text(370, 56, '※ノルマはありません　※出し物はまだ決まっていません', 15, '#5254a0'),
             rect(7, 92, 1186, 122, '#ccffcc', '#0000cc'),
             text(20, 116, 'ニュース速報(VIP)＠２ちゃんねる', 18, '#0000cc', underline=True),
             text(20, 148, '特別な板、ニュー速VIPへようこそ', 29, '#000066', bold=True),
             text(20, 178, '■掲示板一覧　■スレッド一覧　■新規スレッド作成　■リロード', 17, '#0000cc', underline=True),
             text(20, 201, '書き込む前に読んでね ｜ ２ちゃんねるガイド', 16, '#0000cc', underline=True)]
    return parts


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    titles = [
        '曙「残像だ」',
        '俺の車がボーナスステージで壊されていた',
        'マーメイドのマーってなんだ？',
        'シーフードドリアのシーフーってなんだ？',
        '全ての罪深き人々に神の裁きを。歌丸です。',
        'だけどﾅﾑｱﾐﾀﾞが出ちゃう。住職だもん',
        'ごはんですよはごはんじゃないですよ',
        'パンはパンでも奴はとんでもないものをルパンルパーン',
        'さーてライジングサザエさんはー？',
        'ユニクロ店員「さっそく装備していくかい？」',
        'フネ「お父さんそれは残像ですよ」',
        '立てば芍薬、座れば牡丹、歩く姿はｶﾘﾌﾗﾜ――(ﾟ∀ﾟ)――!!!!',
        'しずか「キャー！のび太ｻﾝﾄﾞｳｨｯｼﾞ！」',
        '萌える絵の描き方教えてくれ',
        'しょこたんと愉快な仲間たちパートスレ',
        '【急募】文化祭の出し物が決まらない件',
    ]
    reply_counts = {'萌える絵の描き方教えてくれ': 17,
                    'しょこたんと愉快な仲間たちパートスレ': 24,
                    '【急募】文化祭の出し物が決まらない件': 98}
    parts = vip_header()
    for i, title in enumerate(titles):
        col, row = divmod(i, 8)
        replies = reply_counts.get(title, [82,164,31,53,120,76,98][i % 7])
        parts.append(text(20 + col * 592, 241 + row * 26,
                          f'{i+1}: {title} ({replies})',
                          14 if len(title) > 28 else 16, '#b00000' if title.startswith('【急募】') else '#0000cc', underline=True))
    parts.append(text(20, 459, '全部読む　最新50　1-100　掲示板に戻る　スレッドを立てる', 16, '#0000cc', underline=True))
    save('ja_index', parts, '文化祭用の架空VIP板スレッド一覧')

    parts = [rect(0, 0, WIDTH, HEIGHT, '#efefef'),
             text(20, 28, 'ニュース速報(VIP)　全部読む　最新50　掲示板に戻る', 16, '#0000cc', underline=True),
             text(20, 68, '【急募】文化祭の出し物が決まらない件', 29, '#cc0000', bold=True)]
    posts = [
        ('1', '以下、名無しにかわりましてVIPがお送りします', '1UsamI', ['喫茶店・お化け屋敷・写真展で揉めてる。締切は今日。', 'コーヒー係はいない。実況席だけある。助けて。']),
        ('2', '以下、名無しにかわりましてVIPがお送りします', 'k1BoNn', ['詳細キボンヌ']),
        ('3', '以下、名無しにかわりましてVIPがお送りします', 'G1k0AA', ['   ∧ ∧', '  (,,ﾟДﾟ) ＜ まず提出用紙を埋めろｺﾞﾙｧ!!']),
        ('4', '以下、名無しにかわりましてVIPがお送りします', 'NaNaSh', ['>>1　出し物がないなら顔芸でいいだろｗｗｗ']),
    ]
    y = 105
    for number, name, identity, body in posts:
        parts.append(text(22, y, f'{number} 名前：{name} ：放課後 ID:{identity}', 16, '#008000', bold=True))
        y += 27
        for line in body:
            parts.append(text(44, y, line, 20, family='MS PGothic, Meiryo, monospace'))
            y += 25
        y += 17
    parts.extend([rect(20, 422, 1160, 35, '#fff', '#888'), text(32, 446, '名前：名無しさん　 E-mail：sage　 [ 書き込む ]', 17)])
    save('ja_thread', parts, '文化祭の相談スレ：キボンヌとギコねこ')

    def chan_header(thread=False):
        parts = [rect(0, 0, WIDTH, HEIGHT, '#ffffee'),
                 text(14, 23, '[ /a/ /b/ /c/ /v/ /co/ /g/ ]   [ Home ]', 15, '#800000', family='Times New Roman, serif'),
                 text(600, 64, '/b/ - Random', 33, '#800000', family='Times New Roman, serif', bold=True),
                 rect(10, 82, 1180, 1, '#b7a7a3'),
                 text(435, 109, '[ Return ]   [ New Thread ]   [ Refresh ]' if thread else '[ New Thread ]   [ Normal View ]   [ Refresh ]', 17, '#0000ee', family='Times New Roman, serif', underline=True)]
        return parts

    parts = chan_header()
    topics = [
        ('All your base are belong to us', 'The invasion has reached the school computer.', '>>1001  For great justice.', 'BASE'),
        ('School festival ideas. Help.', '>need a cafe / >nobody can make coffee', '>>1002  pics or it didn\'t happen', 'HELP'),
        ('Badger loop still going', 'I have been waiting for this to end since lunch.', '>>1003  The snake will be back.', 'LOOP'),
        ('You are the man now, dog', 'Post your ancient bookmarks.', '>>1004  This thread needs more cats.', 'CAT'),
    ]
    for i, (title, body, reply, thumb) in enumerate(topics):
        y = 135 + i * 81
        parts.extend([text(18, y, f'{title}   Anonymous   No.{1001+i}   [Reply]', 18, '#117743', family='Times New Roman, serif', bold=True),
                      rect(20, y+9, 70, 47, '#dad1b5', '#b7a7a3'), text(27, y+37, thumb, 15, '#806848'),
                      text(104, y+25, body, 18, '#789922' if body.startswith('>') else '#800000', family='Times New Roman, serif'),
                      rect(101, y+34, 1078, 28, '#f0e0d6'), text(112, y+54, reply, 17, '#800000', family='Times New Roman, serif')])
    save('en_index', parts, 'Fictional early imageboard thread index')

    parts = chan_header(True)
    parts.extend([text(22, 142, 'School festival ideas. Help.   Anonymous   No.1002', 21, '#117743', family='Times New Roman, serif', bold=True),
                  rect(23, 155, 118, 83, '#dad1b5', '#b7a7a3'), text(36, 195, 'NO PLAN', 19, '#806848'),
                  text(161, 174, '>need a school festival attraction', 21, '#789922', family='Times New Roman, serif'),
                  text(161, 201, '>spent the budget meeting playing mahjong', 21, '#789922', family='Times New Roman, serif'),
                  text(161, 228, '>still no one to make the coffee', 21, '#789922', family='Times New Roman, serif')])
    replies = [('1005', 'pics or it didn\'t happen'), ('1006', '>>1002  Lurk moar. Also, put sage in the email field.'),
               ('1007', '>>1002  Post faces. That can be your entire attraction.')]
    for i, (number, body) in enumerate(replies):
        y = 258 + i * 60
        parts.extend([text(20, y+23, '>>', 19, '#b7a7a3'), rect(48, y, 1128, 54, '#f0e0d6'),
                      text(60, y+20, f'Anonymous   No.{number}', 17, '#117743', family='Times New Roman, serif', bold=True),
                      text(62, y+44, body, 20, '#800000', family='Times New Roman, serif')])
    parts.append(text(20, 459, '[ Name: Anonymous ]  [ E-mail: sage ]  [ Comment ]  [ Submit ]', 17, '#800000', family='Times New Roman, serif'))
    save('en_thread', parts, 'Fictional Anonymous festival thread with greentext and replies')
    print('Built four bilingual board illustrations (1200 x 470 SVG).')


if __name__ == '__main__':
    build()
