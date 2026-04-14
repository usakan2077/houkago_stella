/**
 * config.js - ゲーム設定ファイル
 * キャラクター・背景・サウンド設定を定義します
 */
const VN_CONFIG = {

  // ===========================================================
  // キャラクター設定
  // images: 画像が存在しない場合はプレースホルダーを表示
  // 画像パス: assets/images/chars/{id}/{expression}.png
  // 例: assets/images/chars/sakura/happy.png
  // ===========================================================
  characters: {
    player: {
      name: '桐島 勇',
      nameColor: '#aac8ff',
      charColor: 'rgba(140, 180, 255, 0.6)',
    },
    sakura: {
      name: '桜咲さくら',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      expressions: ['normal', 'happy', 'excited', 'sad', 'crying', 'surprised', 'angry', 'shy', 'thinking', 'blank'],
    },
    sakura_sports: {
      name: '桜咲さくら',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      // バドミントン部スポーツウェア衣装。画像パス: assets/images/chars/sakura_sports/{expr}.png
      expressions: ['normal', 'happy', 'excited', 'shy', 'serious', 'thinking'],
    },
    sakura_swimsuit: {
      name: '桜咲さくら',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      // スクール水着衣装。画像パス: assets/images/chars/sakura_swimsuit/{expr}.png
      expressions: ['normal', 'happy', 'excited', 'surprised', 'thinking', 'blank'],
    },
    kotoha: {
      name: '花園ことは',
      nameColor: '#88aaff',
      charColor: 'rgba(100, 140, 240, 0.75)',
      expressions: ['normal', 'happy', 'sad', 'crying', 'surprised', 'thinking', 'shy', 'angry'],
    },
    kotoha_swimsuit: {
      name: '花園ことは',
      nameColor: '#88aaff',
      charColor: 'rgba(100, 140, 240, 0.75)',
      // スクール水着衣装。画像パス: assets/images/chars/kotoha_swimsuit/{expr}.png
      expressions: ['normal', 'surprised', 'thinking'],
    },
    mahiru: {
      name: '月夜野まひる',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      expressions: ['normal', 'happy', 'sad', 'crying', 'surprised', 'thinking', 'shy'],
    },
    mahiru_sports: {
      name: '月夜野まひる',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      // 体操服衣装。画像パス: assets/images/chars/mahiru_sports/{expr}.png
      expressions: ['normal', 'happy'],
    },
    mahiru_private: {
      name: '月夜野まひる',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      // 私服衣装。画像パス: assets/images/chars/mahiru_private/{expr}.png
      expressions: ['normal', 'happy', 'sad', 'surprised', 'thinking'],
    },
  },

  // ===========================================================
  // 背景設定
  // 画像パス: assets/images/bg/{key}.jpg または .png
  // 画像がない場合は gradient が使われます
  // ===========================================================
  backgrounds: {
    // ── 校門 ──────────────────────────────────────────────
    school_gate:                 'linear-gradient(180deg, #87CEEB 0%, #b8d8f0 40%, #c8e0c0 70%, #90b860 100%)',
    school_gate_evening:         'linear-gradient(180deg, #ff8040 0%, #ffb060 30%, #ffd090 60%, #e8c890 100%)',
    // 季節別
    school_gate_spring:          'linear-gradient(180deg, #b0d8f0 0%, #d8c8e0 40%, #f0d0e0 70%, #e8b8d0 100%)',
    school_gate_spring_evening:  'linear-gradient(180deg, #8040a0 0%, #c06080 30%, #e08090 60%, #f0b0c0 100%)',
    school_gate_summer:          'linear-gradient(180deg, #1e90ff 0%, #87CEEB 40%, #c8e8a0 70%, #80c040 100%)',
    school_gate_summer_evening:  'linear-gradient(180deg, #ff6010 0%, #ff9030 30%, #ffb850 60%, #e8a040 100%)',
    school_gate_autumn:          'linear-gradient(180deg, #f0a830 0%, #e89028 30%, #d07820 60%, #c06010 100%)',
    school_gate_autumn_evening:  'linear-gradient(180deg, #6030a0 0%, #c05020 30%, #e07830 60%, #d09040 100%)',
    school_gate_rainy:           'linear-gradient(180deg, #506070 0%, #708090 30%, #90a0a8 60%, #a0b0a0 100%)',

    // ── 教室 ──────────────────────────────────────────────
    classroom:             'linear-gradient(180deg, #87CEEB 0%, #e8dcc0 50%, #d0c090 100%)',
    classroom_evening:     'linear-gradient(180deg, #ff7020 0%, #ffa030 30%, #ffd080 60%, #e8c890 100%)',
    classroom_night:       'linear-gradient(180deg, #050815 0%, #0a1228 30%, #0d1535 60%, #080f20 100%)',
    classroom_rainy:       'linear-gradient(180deg, #6080a0 0%, #8090b0 40%, #a0a8b8 70%, #c0c4c8 100%)',
    classroom_festival_prep: 'linear-gradient(180deg, #87CEEB 0%, #d0c890 40%, #c8c080 70%, #b8b070 100%)',
    classroom_cafe:          'linear-gradient(180deg, #87CEEB 0%, #f0e0a0 40%, #ffe0b0 70%, #f0d090 100%)',
    classroom_cafe_rainy:    'linear-gradient(180deg, #6080a0 0%, #8090b0 40%, #d0c0a0 70%, #c0b090 100%)',

    // ── 通学路 ────────────────────────────────────────────
    commute_road_spring_morning: 'linear-gradient(180deg, #a8c8e0 0%, #c0d4e0 20%, #d0ccc0 45%, #b8b4a8 65%, #888078 85%, #706860 100%)',
    commute_road_spring:         'linear-gradient(180deg, #87CEEB 0%, #b0d0e0 30%, #d0d8d0 60%, #c0c8b8 100%)',
    commute_road_spring_evening: 'linear-gradient(180deg, #ff6020 0%, #ff9040 30%, #ffb860 60%, #e8a050 100%)',
    commute_road_summer:         'linear-gradient(180deg, #1e90ff 0%, #87CEEB 30%, #c8e890 60%, #90c850 100%)',
    commute_road_summer_evening: 'linear-gradient(180deg, #ff5010 0%, #ff8030 30%, #ffa050 60%, #e09040 100%)',
    commute_road_autumn_evening: 'linear-gradient(180deg, #c05020 0%, #e08030 30%, #f0a840 60%, #c89050 100%)',
    commute_road_winter:         'linear-gradient(180deg, #a0b8d0 0%, #b8cce0 30%, #d0e0f0 60%, #e8f0f8 100%)',
    commute_road_winter_evening: 'linear-gradient(180deg, #804060 0%, #a06080 30%, #c09090 60%, #d0b0a8 100%)',

    // ── 廊下 ──────────────────────────────────────────────
    corridor:              'linear-gradient(180deg, #d8d0b8 0%, #c0b8a0 50%, #b0a888 100%)',
    corridor_evening:      'linear-gradient(180deg, #c06020 0%, #d08040 30%, #e0a060 60%, #c89060 100%)',
    corridor_festival_rainy:     'linear-gradient(180deg, #d8d0b8 0%, #f0e0b0 40%, #ffe8b8 70%, #f0d8a0 100%)',

    // ── 屋上 ──────────────────────────────────────────────
    rooftop:               'linear-gradient(180deg, #4a90e2 0%, #87CEEB 50%, #c0e890 80%, #70aa50 100%)',
    rooftop_evening:       'linear-gradient(180deg, #ff5010 0%, #ff8030 30%, #ffb060 60%, #ffd090 100%)',
    rooftop_night:         'linear-gradient(180deg, #0a0820 0%, #1a1040 30%, #2a1a50 60%, #1a1030 100%)',
    rooftop_predawn:       'linear-gradient(180deg, #080418 0%, #180830 30%, #280c48 60%, #180828 100%)',
    rooftop_dawn:          'linear-gradient(180deg, #1a0838 0%, #6020a0 20%, #d04080 50%, #ff8040 80%, #ffc060 100%)',

    // ── 図書室 ────────────────────────────────────────────
    library:               'linear-gradient(180deg, #6b5030 0%, #8b6840 30%, #c09060 70%, #d8a870 100%)',
    library_evening:       'linear-gradient(180deg, #7a3010 0%, #a05020 30%, #c87040 60%, #d89060 100%)',

    // ── 音楽準備室 ────────────────────────────────────────
    music_room:            'linear-gradient(180deg, #87CEEB 0%, #d8c890 40%, #c8b878 70%, #b8a868 100%)',
    music_room_evening:    'linear-gradient(180deg, #d04010 0%, #e06020 30%, #f09050 60%, #e8a068 100%)',

    // ── その他 ────────────────────────────────────────────
    gymnasium:             'linear-gradient(180deg, #c0b090 0%, #d0c0a0 40%, #e0d0b0 70%, #f0e0c0 100%)',
    gymnasium_evening:     'linear-gradient(180deg, #3a2810 0%, #5a4020 30%, #7a5830 60%, #6a4820 100%)',
    stage:                 'linear-gradient(180deg, #1a0808 0%, #2a1010 30%, #3a1818 60%, #280f0f 100%)',
    protagonist_room_night:  'linear-gradient(180deg, #050810 0%, #0a1020 30%, #0d1530 60%, #080f1e 100%)',
    protagonist_room_morning:'linear-gradient(180deg, #fde8c8 0%, #fdf0d8 30%, #fff8ec 60%, #fffdf8 100%)',

    // ── 食堂 ──────────────────────────────────────────────
    cafeteria:             'linear-gradient(180deg, #87CEEB 0%, #f5ead0 40%, #ede0c0 70%, #ddd0a8 100%)',

    // ── タイトル ──────────────────────────────────────────
    title_bg:              'linear-gradient(135deg, #0d0020 0%, #1a0040 30%, #2a1050 60%, #0d0020 100%)',

    // ── 階段 ──────────────────────────────────────────────
    staircase:             'linear-gradient(180deg, #c8c0a8 0%, #b8b098 50%, #a8a088 100%)',
    staircase_evening:     'linear-gradient(180deg, #c06030 0%, #d08050 30%, #e0a070 60%, #c89060 100%)',
    staircase_night:       'linear-gradient(180deg, #080c18 0%, #101828 30%, #181f30 60%, #0c1220 100%)',

    // ── 校舎外 ────────────────────────────────────────────
    school_exterior_night: 'linear-gradient(180deg, #040810 0%, #080f1e 30%, #0c1428 60%, #060a14 100%)',

    // ── 空・屋外 ──────────────────────────────────────────
    overcast_sky:          'linear-gradient(180deg, #8090a0 0%, #a0b0c0 30%, #b8c4cc 60%, #c8d0d8 100%)',
    overcast_night:        'linear-gradient(180deg, #2a3040 0%, #363d50 20%, #404855 45%, #353c4a 70%, #282e3a 100%)',

    // ── 屋外・市街 ────────────────────────────────────────
    gymnasium_back:    'linear-gradient(180deg, #909090 0%, #a0a0a0 30%, #c0c0b8 60%, #a8a89a 100%)',
    street_plaza_summer:       'linear-gradient(180deg, #87CEEB 0%, #c8d4d8 30%, #d0ccc0 60%, #c8c4b8 100%)',
    riverbank_evening: 'linear-gradient(180deg, #ff8040 0%, #ffb060 30%, #ffd090 60%, #c8e0b8 100%)',

    // ── プール ────────────────────────────────────────────
    pool_outdoor:      'linear-gradient(180deg, #87CEEB 0%, #60b8e0 30%, #40a0d0 60%, #a0d8f0 100%)',

    // ── モノローグ（内面独白・回想）────────────────────────
    'monologe-bg':         'linear-gradient(180deg, #08060f 0%, #0f0a1a 30%, #160d20 60%, #0a0810 100%)',
    'school_corridor_nightmare': 'linear-gradient(180deg, #04080f 0%, #06101c 20%, #081420 45%, #050d18 70%, #030a12 100%)',
  },

  // ===========================================================
  // ゲーム設定
  // ===========================================================
  settings: {
    typeSpeed:   30,      // タイプライター速度 (ms/文字) ← 小さいほど速い
    autoDelay:   2000,    // オートモード: 文字表示完了後の待機時間 (ms)
    bgmVolume:   0.65,    // BGM音量 (0.0 〜 1.0)
    seVolume:    0.85,    // SE音量  (0.0 〜 1.0)
    fadeTime:    400,     // 背景フェード時間 (ms)
    charFadeTime:500,     // キャラクターフェード時間 (ms)

    // ----------------------------------------------------------
    // デバッグモード
    //   true  : デバッグパネル (F2) ・チャプタージャンプボタンを有効化
    //   false : デバッグ機能を一切表示しない（公開時は false に）
    // ----------------------------------------------------------
    debug: true,
  },

  // ===========================================================
  // CGギャラリー スチル一覧 (登場順)
  // key: @still コマンドで使うファイル名 (拡張子なし)
  // label: ギャラリー上の表示名 (未閲覧時は「？？？」)
  // ===========================================================
  cgList: [
    { key: 'kotoha_window_ch1',         label: 'ことは・窓際の午後'              },
    { key: 'sakura_blank_moment',       label: 'さくら・笑顔の裂け目'            },
    { key: 'mahiru_notebook_drop',      label: 'まひる・ノートを落とす'           },
    { key: 'kotoha_library_headphones', label: 'ことは・図書室のヘッドホン'       },
    { key: 'mahiru_rooftop_photo',      label: 'まひる・屋上の写真'              },
    { key: 'mahiru_rooftop_friends_photo', label: 'まひる・屋上の集合写真プリント'  },
    { key: 'library_hands_overlap',     label: 'ことは・手が触れる'              },
    // Ch.4 外イベント
    { key: 'sakura_after_match',        label: 'さくら・試合後の裏側'            },
    { key: 'kotoha_street_piano',       label: 'ことは・街角のピアノ'            },
    { key: 'mahiru_riverbank',          label: 'まひる・兄の場所'                },
    { key: 'evening_walk_two',          label: '二人の夕暮れ散歩'                },
    { key: 'evening_walk_private',      label: '二人の夕暮れ散歩（夏）'           },
    // Ch.6 プール
    { key: 'pool_sakura_kotoha',        label: 'さくらとことは・水面の午後'       },
    { key: 'pool_mahiru_window',        label: 'まひる・窓越しの水面'            },
    { key: 'sakura_corner_resting',     label: 'さくら・教室の隅で'              },
    { key: 'mahiru_evening_rooftop',    label: 'まひる・夕方の屋上'              },
    { key: 'kotoha_music_door',         label: 'ことは・音楽室の扉'              },
    { key: 'sakura_crying_gym',         label: 'さくら・体育館での涙'            },
    { key: 'kotoha_frozen_piano_sound', label: 'ことは・ピアノの音に立ち止まる'   },
    { key: 'rooftop_shooting_star',     label: '屋上・流れ星の瞬間'              },
    { key: 'rooftop_four_wishes',       label: '屋上・四人の願い'                },
    { key: 'mahiru_rooftop_reach',      label: 'まひる・届かない手'              },
    { key: 'rain_festival_day',         label: '雨の文化祭'                      },
    { key: 'sakura_cant_smile',         label: 'さくら・笑えない夜'              },
    { key: 'kotoha_piano_trembling',    label: 'ことは・震える指'                },
    { key: 'mahiru_rooftop_night',      label: 'まひる・屋上の夜'               },
    { key: 'night_sky_no_stars',        label: '星のない夜空'                    },
    { key: 'kotoha_one_note',           label: 'ことは・最初の一音'              },
    { key: 'mahiru_notebook_one_line',  label: 'まひる・最後の一行'              },
    { key: 'bad_end_empty_classroom',   label: 'バッドエンド・空白の教室'         },
    { key: 'mahiru_seen_from_below',    label: 'まひる・見上げた先に'            },
    { key: 'kotoha_performance1',       label: 'ことは・演奏'                    },
    { key: 'kotoha_performance2',       label: 'ことは・演奏（後）'              },
    { key: 'sakura_embrace',            label: 'さくら・抱きしめた夜'            },
    { key: 'sakura_good_end_rooftop1',  label: 'さくら・屋上の約束'              },
    { key: 'mahiru_dawn_two',           label: 'まひる・夜明けの二人'            },
    { key: 'sakura_good_end_rooftop2',  label: 'さくら・ふたりの朝'              },
    { key: 'kotoha_piano_side',         label: 'ことは・隣で聴く'                },
  ],

  // ===========================================================
  // シナリオファイル一覧 (読み込み順)
  // ===========================================================
  scenarioFiles: [
    'scenarios/chapter1.md',
    'scenarios/chapter2.md',
    'scenarios/chapter3.md',
    'scenarios/chapter4.md',
    'scenarios/chapter5.md',
    'scenarios/chapter6.md',
    'scenarios/chapter7.md',
    'scenarios/chapter8.md',
    'scenarios/bad_end.md',
    'scenarios/route_sakura.md',
    'scenarios/route_kotoha.md',
    'scenarios/route_mahiru.md',
  ],

  // ===========================================================
  // タイトル画面から最初に始まるラベル名
  // ===========================================================
  startLabel: 'start',

  // ===========================================================
  // タイトル画面BGM
  // assets/audio/bgm/ に置いたファイル名を指定
  // 例: titleBGM: 'title.mp3'
  // BGMなしにする場合は null に設定
  // ===========================================================
  titleBGM: 'title.mp3',

  // ===========================================================
  // ボタンクリック音
  // assets/audio/se/ に置いたファイル名を指定
  // なしにする場合は null に設定
  // ===========================================================
  clickSE: 'click.mp3',

  // ===========================================================
  // NEW GAME 時に再生するオープニング動画
  // assets/images/bg/ に置いたファイル名を指定
  // なしにする場合は null に設定
  // ===========================================================
  introVideo: 'assets/images/bg/title.mp4',

  // ===========================================================
  // オープニングモノローグ設定
  // モノローグ → 動画 → chapter1 の順で再生されます
  // ===========================================================

  // BGM: assets/audio/bgm/ に置いたファイル名 (null でなし)
  openingBGM: 'opening_piano.mp3',

  // 背景: backgrounds キー名 (null で title_bg を使用)
  openingBG: 'monologe-bg',

  // モノローグ テキスト行 (HTMLタグ使用可: <br> <strong> など)
  // 空配列 [] にするとモノローグをスキップして動画へ
  // ===========================================================
  // エンディングクレジット
  // type: 'game-title' | 'heading' | 'name' | 'sub' | 'spacer' | 'thanks'
  // ===========================================================
  credits: [
    { type: 'game-title', text: '放課後のステラ' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'heading', text: '製作' },
    { type: 'name',    text: 'うさかんファクトリー' },
    { type: 'spacer' },
    { type: 'heading', text: 'シナリオ・企画・演出' },
    { type: 'name',    text: 'うさかんファクトリー' },
    { type: 'spacer' },
    { type: 'heading', text: 'キャラクターデザイン・イラスト' },
    { type: 'name',    text: 'うさかんファクトリー' },
    { type: 'spacer' },
    { type: 'heading', text: 'プログラム' },
    { type: 'name',    text: 'うさかんファクトリー' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'heading', text: '使用楽曲・効果音' },
    { type: 'name',    text: 'OtoLogic' },
    { type: 'sub',     text: 'https://otologic.jp  /  CC BY 4.0' },
    { type: 'spacer' },
    { type: 'name',    text: '彩音 ～Taira Komori～' },
    { type: 'sub',     text: 'https://taira-komori.net' },
    { type: 'spacer' },
    { type: 'name',    text: '効果音ラボ' },
    { type: 'sub',     text: 'https://soundeffect-lab.info' },
    { type: 'spacer' },
    { type: 'name',    text: 'DOVA-SYNDROME' },
    { type: 'sub',     text: 'https://dova-s.jp' },
    { type: 'spacer' },
    { type: 'name',    text: 'Springin\' Sound Stock' },
    { type: 'sub',     text: 'https://www.springin.org/sound-stock' },
    { type: 'spacer' },
    { type: 'name',    text: '音人 ～On-Jin～' },
    { type: 'sub',     text: 'https://on-jin.com' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'heading', text: 'Special Thanks' },
    { type: 'name',    text: 'Claude (Anthropic)' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'thanks',  text: 'Thank you for playing.' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'logo',    text: 'team-logo.png' },
    { type: 'spacer' },
    { type: 'spacer' },
  ],

  openingLines: [
    '遠くで見上げれば、星はあんなに美しく見えるのに。',
    '手を伸ばせば届きそうな距離で、<br>私たちはいつも、見えない<strong>境界線（バウンドリー）</strong>を引いて立っている。',
    '「大丈夫」',
    'その言葉は、自分を守るための盾で。<br>同時に、誰かを拒絶するための、優しい嘘だった。',
    '傷つかないように。<br>壊してしまわないように。',
    '踏み込めない空白を、私たちは「日常」と呼んでやり過ごす。',
    '――本当は、気づいてほしかった。<br>――本当は、この手を掴んでほしかった。',
    '言葉にできない願いは、<br>降り注ぐ光の中に溶けて、夜の底へと沈んでいく。',
    'それでも。<br>この夜が明ける前に、一歩だけ。',
    '私は、君の引いた境界線を越えてみたい。',
  ],
};
