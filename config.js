/**
 * config.js - ゲーム設定ファイル
 * キャラクター・背景・サウンド設定を定義します
 */
const VN_CONFIG = {

  analytics: {
    enabled: true,
    measurementId: 'G-FFXERBV0T5',
    progressCheckpointInterval: 25,
  },

  i18n: {
    defaultLanguage: 'ja',
    supportedLanguages: ['ja', 'en'],
    labels: {
      ja: {
        titleNewGame: 'NEW  GAME',
        titleContinue: 'CONTINUE',
        titleGallery: 'CG GALLERY',
        close: '閉じる',
        yes: 'はい',
        no: 'いいえ',
        textLog: 'テキストログ',
        saveOverwrite: 'SLOT {slot} に上書きしますか？',
        saveDone: '{slotLabel} にセーブしました',
        loadDone: '{slotLabel} しました',
        returnTitleConfirm: 'タイトルに戻りますか？\n（未セーブのデータは失われます）',
        languageSwitchConfirm: '言語を切り替えるとタイトルへ戻ります。\nよろしいですか？',
        loadError: 'スクリプト読み込みエラー: {file} — start.bat でサーバーを起動してください。',
        galleryEmpty: 'スチル画像がありません',
        loadingGameTitle: '放課後のステラ',
        loadingNotice: 'このゲームは音楽・効果音が流れます。<br>あらかじめ音量をご確認ください。',
        loadingOk: 'OK',
        settings: {
          language: '言語',
          autoSpeed: 'オート速度',
          typeSpeed: '文字速度',
          bgmVolume: 'BGM音量',
          seVolume: 'SE音量',
          fontSize: '文字サイズ',
          chainMode: '２行表示',
          windowColor: 'ウィンドウ色',
          slow: '遅め',
          normal: '普通',
          fast: '速め',
          instantFast: '爆速',
          instant: '瞬間',
          small: '小',
          large: '大',
          chainNone: 'しない',
          chainDialogue: 'セリフのみ',
          chainAll: 'すべて',
        },
      },
      en: {
        titleNewGame: 'NEW  GAME',
        titleContinue: 'CONTINUE',
        titleGallery: 'CG GALLERY',
        close: 'Close',
        yes: 'Yes',
        no: 'No',
        textLog: 'Text Log',
        saveOverwrite: 'Overwrite SLOT {slot}?',
        saveDone: 'Saved to {slotLabel}',
        loadDone: '{slotLabel} loaded',
        returnTitleConfirm: 'Return to the title screen?\nUnsaved progress will be lost.',
        languageSwitchConfirm: 'Changing language returns you to the title screen.\nContinue?',
        loadError: 'Failed to load script: {file} — please run the local server first.',
        galleryEmpty: 'No still images yet',
        loadingGameTitle: 'After School Stella',
        loadingNotice: 'This game plays music and sound effects.<br>Please check your volume before starting.',
        loadingOk: 'OK',
        settings: {
          language: 'Language',
          autoSpeed: 'Auto Speed',
          typeSpeed: 'Text Speed',
          bgmVolume: 'BGM Volume',
          seVolume: 'SE Volume',
          fontSize: 'Text Size',
          chainMode: 'Two-line Text',
          windowColor: 'Window Color',
          slow: 'Slow',
          normal: 'Normal',
          fast: 'Fast',
          instantFast: 'Very Fast',
          instant: 'Instant',
          small: 'Small',
          large: 'Large',
          chainNone: 'Off',
          chainDialogue: 'Dialogue',
          chainAll: 'All',
        },
      },
    },
  },

  // ===========================================================
  // キャラクター設定
  // images: 画像が存在しない場合はプレースホルダーを表示
  // 画像パス: assets/images/chars/{id}/{expression}.png
  // 例: assets/images/chars/sakura/happy.png
  // ===========================================================
  characters: {
    player: {
      name: '桐島 勇',
      nameEn: 'Yu Kirishima',
      nameColor: '#aac8ff',
      charColor: 'rgba(140, 180, 255, 0.6)',
    },
    sakura: {
      name: '桜咲さくら',
      nameEn: 'Sakura Sakurazaki',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      expressions: ['normal', 'happy', 'excited', 'sad', 'crying', 'surprised', 'angry', 'shy', 'thinking', 'blank', 'no_light_eyes'],
    },
    sakura_sports: {
      name: '桜咲さくら',
      nameEn: 'Sakura Sakurazaki',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      // バドミントン部スポーツウェア衣装。画像パス: assets/images/chars/sakura_sports/{expr}.png
      expressions: ['normal', 'happy', 'excited', 'shy', 'serious', 'thinking', 'surprised', 'crying'],
    },
    sakura_swimsuit: {
      name: '桜咲さくら',
      nameEn: 'Sakura Sakurazaki',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      // スクール水着衣装。画像パス: assets/images/chars/sakura_swimsuit/{expr}.png
      expressions: ['normal', 'happy', 'excited', 'surprised', 'thinking', 'blank'],
    },
    kotoha: {
      name: '花園ことは',
      nameEn: 'Kotoha Hanazono',
      nameColor: '#88aaff',
      charColor: 'rgba(100, 140, 240, 0.75)',
      expressions: ['normal', 'happy', 'sad', 'crying', 'surprised', 'thinking', 'shy', 'angry'],
    },
    kotoha_swimsuit: {
      name: '花園ことは',
      nameEn: 'Kotoha Hanazono',
      nameColor: '#88aaff',
      charColor: 'rgba(100, 140, 240, 0.75)',
      // スクール水着衣装。画像パス: assets/images/chars/kotoha_swimsuit/{expr}.png
      expressions: ['normal', 'surprised', 'thinking'],
    },
    mahiru: {
      name: '月夜野まひる',
      nameEn: 'Mahiru Tsukiyono',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      expressions: ['normal', 'happy', 'sad', 'crying', 'surprised', 'thinking', 'shy'],
    },
    mahiru_sports: {
      name: '月夜野まひる',
      nameEn: 'Mahiru Tsukiyono',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      // 体操服衣装。画像パス: assets/images/chars/mahiru_sports/{expr}.png
      expressions: ['normal', 'happy'],
    },
    mahiru_private: {
      name: '月夜野まひる',
      nameEn: 'Mahiru Tsukiyono',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      // 私服衣装。画像パス: assets/images/chars/mahiru_private/{expr}.png
      expressions: ['normal', 'happy', 'sad', 'surprised', 'thinking'],
    },
    mahiru_no_camera: {
      name: '月夜野まひる',
      nameEn: 'Mahiru Tsukiyono',
      nameColor: '#88ddaa',
      charColor: 'rgba(80, 190, 130, 0.75)',
      // カメラなし制服衣装。画像パス: assets/images/chars/mahiru_no_camera/{expr}.png
      expressions: ['normal', 'happy', 'sad', 'crying', 'surprised', 'thinking'],
    },
    sakura_apron: {
      name: '桜咲さくら',
      nameEn: 'Sakura Sakurazaki',
      nameColor: '#ff88aa',
      charColor: 'rgba(255, 140, 170, 0.75)',
      // カフェエプロン衣装。画像パス: assets/images/chars/sakura_apron/{expr}.png
      expressions: ['normal', 'happy', 'excited', 'blank'],
    },
  },

  speakerNames: {
    '橋本': {
      ja: '橋本',
      en: 'Hashimoto-senpai',
    },
    'クラスメイト': {
      ja: 'クラスメイト',
      en: 'Classmate',
    },
  },

  // ===========================================================
  // 背景設定
  // 画像パス: assets/images/bg/{key}.webp / .png / .jpg
  // 画像がない場合は gradient が使われます
  // ===========================================================

  // 画像ファイルが存在しない（グラデーション専用）BGキーの一覧
  // ここに列挙するとプリロード時の404を回避できます
  gradientOnlyBGs: new Set([
    'school_gate',
    'school_gate_evening',
    'school_gate_rainy',
  ]),

  // 一部の差し替え素材は、WebP変換前のPNGを優先して使う
  backgroundExtOverrides: {
    staircase_rainy: '.png',
  },

  stillExtOverrides: {
    evening_walk_private: '.png',
  },

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
    school_gate_autumn_rainy:    'linear-gradient(180deg, #404850 0%, #506070 30%, #607080 60%, #506070 100%)',
    school_gate_rainy:           'linear-gradient(180deg, #506070 0%, #708090 30%, #90a0a8 60%, #a0b0a0 100%)',
    school_gate_june_rainy:      'linear-gradient(180deg, #485860 0%, #607080 30%, #809090 60%, #708090 100%)',

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
    commute_road_june:           'linear-gradient(180deg, #7090a8 0%, #90a8b8 30%, #b0c0c8 60%, #a8b8b8 100%)',
    commute_road_june_evening:   'linear-gradient(180deg, #607090 0%, #8090a8 30%, #a0b0b8 60%, #9098a8 100%)',
    commute_road_summer:         'linear-gradient(180deg, #1e90ff 0%, #87CEEB 30%, #c8e890 60%, #90c850 100%)',
    commute_road_summer_evening: 'linear-gradient(180deg, #ff5010 0%, #ff8030 30%, #ffa050 60%, #e09040 100%)',
    commute_road_autumn_evening: 'linear-gradient(180deg, #c05020 0%, #e08030 30%, #f0a840 60%, #c89050 100%)',
    commute_road_winter:         'linear-gradient(180deg, #a0b8d0 0%, #b8cce0 30%, #d0e0f0 60%, #e8f0f8 100%)',
    commute_road_winter_evening: 'linear-gradient(180deg, #804060 0%, #a06080 30%, #c09090 60%, #d0b0a8 100%)',

    // ── 廊下 ──────────────────────────────────────────────
    corridor:              'linear-gradient(180deg, #d8d0b8 0%, #c0b8a0 50%, #b0a888 100%)',
    corridor_evening:      'linear-gradient(180deg, #c06020 0%, #d08040 30%, #e0a060 60%, #c89060 100%)',
    corridor_night:        'linear-gradient(180deg, #080c18 0%, #101828 30%, #181f30 60%, #0c1220 100%)',
    corridor_rainy:        'linear-gradient(180deg, #8090a0 0%, #909aa8 40%, #a0a8b0 70%, #9098a0 100%)',
    corridor_festival_rainy:     'linear-gradient(180deg, #d8d0b8 0%, #f0e0b0 40%, #ffe8b8 70%, #f0d8a0 100%)',

    // ── 屋上 ──────────────────────────────────────────────
    rooftop:               'linear-gradient(180deg, #4a90e2 0%, #87CEEB 50%, #c0e890 80%, #70aa50 100%)',
    rooftop_evening:       'linear-gradient(180deg, #ff5010 0%, #ff8030 30%, #ffb060 60%, #ffd090 100%)',
    rooftop_night:         'linear-gradient(180deg, #0a0820 0%, #1a1040 30%, #2a1a50 60%, #1a1030 100%)',
    rooftop_predawn:       'linear-gradient(180deg, #080418 0%, #180830 30%, #280c48 60%, #180828 100%)',
    rooftop_dawn:          'linear-gradient(180deg, #1a0838 0%, #6020a0 20%, #d04080 50%, #ff8040 80%, #ffc060 100%)',
    rooftop_rainy:         'linear-gradient(180deg, #404850 0%, #505860 30%, #606870 60%, #505860 100%)',

    // ── 図書室 ────────────────────────────────────────────
    library:               'linear-gradient(180deg, #6b5030 0%, #8b6840 30%, #c09060 70%, #d8a870 100%)',
    library_evening:       'linear-gradient(180deg, #7a3010 0%, #a05020 30%, #c87040 60%, #d89060 100%)',

    // ── 音楽準備室 ────────────────────────────────────────
    music_room:            'linear-gradient(180deg, #87CEEB 0%, #d8c890 40%, #c8b878 70%, #b8a868 100%)',
    music_room_evening:    'linear-gradient(180deg, #d04010 0%, #e06020 30%, #f09050 60%, #e8a068 100%)',

    // ── その他 ────────────────────────────────────────────
    gymnasium:             'linear-gradient(180deg, #c0b090 0%, #d0c0a0 40%, #e0d0b0 70%, #f0e0c0 100%)',
    gymnasium_evening:     'linear-gradient(180deg, #3a2810 0%, #5a4020 30%, #7a5830 60%, #6a4820 100%)',
    gymnasium_storage_room: 'linear-gradient(180deg, #171c24 0%, #2b3037 34%, #5a4a38 68%, #2a2420 100%)',
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
    staircase_rainy:       'linear-gradient(180deg, #687888 0%, #788898 40%, #8898a8 70%, #708090 100%)',

    // ── 校舎外 ────────────────────────────────────────────
    school_exterior_night: 'linear-gradient(180deg, #040810 0%, #080f1e 30%, #0c1428 60%, #060a14 100%)',

    // ── 空・屋外 ──────────────────────────────────────────
    overcast_sky:          'linear-gradient(180deg, #8090a0 0%, #a0b0c0 30%, #b8c4cc 60%, #c8d0d8 100%)',
    overcast_night:        'linear-gradient(180deg, #2a3040 0%, #363d50 20%, #404855 45%, #353c4a 70%, #282e3a 100%)',

    // ── 屋外・市街 ────────────────────────────────────────
    gymnasium_back:         'linear-gradient(180deg, #909090 0%, #a0a0a0 30%, #c0c0b8 60%, #a8a89a 100%)',
    gymnasium_back_school:  'linear-gradient(180deg, #c06020 0%, #d08030 30%, #e0a050 60%, #c89040 100%)',
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
    chainMode:   'dialogue', // 連続2行表示: 'none' | 'dialogue' | 'all'
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
    { key: 'kotoha_window_ch1',         label: 'ことは・窓際の午後',             labelEn: 'Kotoha: Afternoon by the Window' },
    { key: 'sakura_blank_moment',       label: 'さくら・笑顔の裂け目',           labelEn: 'Sakura: A Crack in Her Smile' },
    { key: 'mahiru_notebook_drop',      label: 'まひる・ノートを落とす',         labelEn: 'Mahiru: The Dropped Notebook' },
    { key: 'kotoha_library_headphones', label: 'ことは・図書室のヘッドホン',     labelEn: 'Kotoha: Headphones in the Library' },
    { key: 'mahiru_rooftop_photo',      label: 'まひる・屋上の写真',             labelEn: 'Mahiru: Rooftop Photograph' },
    { key: 'mahiru_rooftop_friends_photo', label: 'まひる・屋上の集合写真プリント', labelEn: 'Mahiru: Rooftop Group Photo Print' },
    { key: 'library_hands_overlap',     label: 'ことは・手が触れる',             labelEn: 'Kotoha: Hands Overlap' },
    // Ch.4 外イベント
    { key: 'sakura_after_match',        label: 'さくら・試合後の裏側',           labelEn: 'Sakura: Behind the Match' },
    { key: 'kotoha_street_piano',       label: 'ことは・街角のピアノ',           labelEn: 'Kotoha: Street-Corner Piano' },
    { key: 'mahiru_riverbank',          label: 'まひる・兄の場所',               labelEn: "Mahiru: Her Brother's Place" },
    { key: 'evening_walk_two',          label: '二人の夕暮れ散歩',               labelEn: 'An Evening Walk for Two' },
    { key: 'evening_walk_private',      label: '二人の夕暮れ散歩（夏）',         labelEn: 'An Evening Walk for Two (Summer)' },
    // Ch.6 プール
    { key: 'pool_sakura_kotoha',        label: 'さくらとことは・水面の午後',     labelEn: 'Sakura and Kotoha: Afternoon on the Water' },
    { key: 'pool_mahiru_window',        label: 'まひる・窓越しの水面',           labelEn: 'Mahiru: Water Beyond the Window' },
    { key: 'sakura_corner_resting',     label: 'さくら・教室の隅で',             labelEn: 'Sakura: In the Corner of the Classroom' },
    { key: 'mahiru_evening_rooftop',    label: 'まひる・夕方の屋上',             labelEn: 'Mahiru: Rooftop at Evening' },
    { key: 'kotoha_music_door',         label: 'ことは・音楽室の扉',             labelEn: 'Kotoha: The Music Room Door' },
    { key: 'sakura_crying_gym',         label: 'さくら・体育館での涙',           labelEn: 'Sakura: Tears in the Gym' },
    { key: 'kotoha_frozen_piano_sound', label: 'ことは・ピアノの音に立ち止まる', labelEn: 'Kotoha: Stopped by the Piano' },
    { key: 'rooftop_shooting_star',     label: '屋上・流れ星の瞬間',             labelEn: 'Rooftop: The Moment of a Shooting Star' },
    { key: 'rooftop_four_wishes',       label: '屋上・四人の願い',               labelEn: 'Rooftop: Four Wishes' },
    { key: 'mahiru_rooftop_reach',      label: 'まひる・届かない手',             labelEn: 'Mahiru: A Hand That Cannot Reach' },
    { key: 'rain_festival_day',         label: '雨の文化祭',                     labelEn: 'The Rainy School Festival' },
    { key: 'sakura_cant_smile',         label: 'さくら・笑えない夜',             labelEn: 'Sakura: The Night She Cannot Smile' },
    { key: 'kotoha_piano_trembling',    label: 'ことは・震える指',               labelEn: 'Kotoha: Trembling Fingers' },
    { key: 'mahiru_rooftop_night',      label: 'まひる・屋上の夜',               labelEn: 'Mahiru: Night on the Rooftop' },
    { key: 'night_sky_no_stars',        label: '星のない夜空',                   labelEn: 'A Starless Night Sky' },
    { key: 'kotoha_one_note',           label: 'ことは・最初の一音',             labelEn: 'Kotoha: The First Note' },
    { key: 'mahiru_notebook_one_line',  label: 'まひる・最後の一行',             labelEn: 'Mahiru: The Last Line' },
    { key: 'bad_end_empty_classroom',   label: 'バッドエンド・空白の教室',       labelEn: 'Bad End: An Empty Classroom' },
    { key: 'mahiru_seen_from_below',    label: 'まひる・見上げた先に',           labelEn: 'Mahiru: Looking Up at Her' },
    { key: 'kotoha_performance1',       label: 'ことは・演奏',                   labelEn: 'Kotoha: Performance' },
    { key: 'kotoha_performance2',       label: 'ことは・演奏（後）',             labelEn: 'Kotoha: Performance, Afterward' },
    { key: 'sakura_embrace',            label: 'さくら・抱きしめた夜',           labelEn: 'Sakura: The Night of the Embrace' },
    { key: 'sakura_good_end_rooftop1_pre1', label: 'さくら・髪をほどく前',       labelEn: 'Sakura: Before Letting Her Hair Down' },
    { key: 'sakura_good_end_rooftop1_pre2', label: 'さくら・髪に手を添える',     labelEn: 'Sakura: A Hand to Her Hair' },
    { key: 'sakura_good_end_rooftop1_pre3', label: 'さくら・照れながらほどく',   labelEn: 'Sakura: Letting It Down, Embarrassed' },
    { key: 'sakura_good_end_rooftop1',  label: 'さくら・屋上の約束',             labelEn: 'Sakura: A Promise on the Rooftop' },
    { key: 'mahiru_dawn_two',           label: 'まひる・夜明けの二人',           labelEn: 'Mahiru: Two at Dawn' },
    { key: 'sakura_good_end_rooftop2',  label: 'さくら・ふたりの朝',             labelEn: 'Sakura: Morning for Two' },
    { key: 'kotoha_piano_side',         label: 'ことは・隣で聴く',               labelEn: 'Kotoha: Listening Beside Her' },
    { key: 'sakura_epilogue',           label: 'さくら・エピローグ',             labelEn: 'Sakura: Epilogue' },
    { key: 'kotoha_epilogue',           label: 'ことは・エピローグ',             labelEn: 'Kotoha: Epilogue' },
    { key: 'mahiru_epilogue',           label: 'まひる・エピローグ',             labelEn: 'Mahiru: Epilogue' },
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

  scenarioFilesByLanguage: {
    ja: [
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
    en: [
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
  },

  scenarioTextFiles: {
    ja: 'locales/scenario.ja.json',
    en: 'locales/scenario.en.json',
  },

  titleLogos: {
    ja: {
      src: 'assets/images/bg/title_logo.webp',
      alt: '放課後のステラ',
    },
    en: {
      src: 'assets/images/bg/title_logo_en.webp',
      alt: 'Houkago Stella',
    },
  },

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
    { type: 'game-title', text: 'エンディングクレジット', textEn: 'Ending Credits' },
    
    { type: 'spacer' },
    { type: 'game-title', text: '（制作・使用ツール）', textEn: '(Production / Tools Used)' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'heading', text: '企画', textEn: 'Planning' },
    { type: 'name',    text: 'うさかんファクトリー', textEn: 'Usakan Factory' },
    { type: 'sub',     text: '（ChatGPT 5.4）', textEn: '(ChatGPT 5.4)' },
    { type: 'spacer' },
    { type: 'heading', text: 'キャラクター原案・プロット原案', textEn: 'Character Concept / Plot Concept' },
    { type: 'name',    text: 'うさかんファクトリー', textEn: 'Usakan Factory' },
    { type: 'sub',     text: '（Claude Code / 4.6 Sonnet）', textEn: '(Claude Code / 4.6 Sonnet)' },
    { type: 'spacer' },
    { type: 'heading', text: 'シナリオ', textEn: 'Scenario' },
    { type: 'name',    text: 'ChatGPT 5.4' },
    { type: 'spacer' },
    { type: 'heading', text: 'スクリプト・演出設計', textEn: 'Scripting / Direction Design' },
    { type: 'name',    text: 'Claude Code（4.6 Sonnet）', textEn: 'Claude Code (4.6 Sonnet)' },
    { type: 'spacer' },
    { type: 'heading', text: 'プログラム・全体設計', textEn: 'Programming / Overall Design' },
    { type: 'name',    text: 'Claude Code（4.6 Sonnet）', textEn: 'Claude Code (4.6 Sonnet)' },
    { type: 'name',    text: 'Codex（ChatGPT 5.4）', textEn: 'Codex (ChatGPT 5.4)' },
    { type: 'spacer' },
    { type: 'heading', text: 'UIデザイン', textEn: 'UI Design' },
    { type: 'name',    text: 'ChatGPT / Claude Code' },
    { type: 'spacer' },
    { type: 'heading', text: '背景・キャラクター・イベント画像制作', textEn: 'Background, Character, and Event Artwork' },
    { type: 'name',    text: 'Google Gemini（Nano Banana2）', textEn: 'Google Gemini (Nano Banana2)' },
    { type: 'name',    text: 'Adobe Firefly' },
    { type: 'spacer' },
    { type: 'heading', text: '音楽（BGM）', textEn: 'Music (BGM)' },
    { type: 'name',    text: 'SUNO AI（v5.5）', textEn: 'SUNO AI (v5.5)' },
    { type: 'spacer' },
    { type: 'heading', text: '音楽ディレクション', textEn: 'Music Direction' },
    { type: 'name',    text: 'うさかんファクトリー', textEn: 'Usakan Factory' },
    { type: 'spacer' },
    { type: 'heading', text: '効果音', textEn: 'Sound Effects' },
    { type: 'name',    text: 'OtoLogic' },
    { type: 'sub',     text: 'https://otologic.jp  /  CC BY 4.0' },
    { type: 'spacer' },
    { type: 'name',    text: '彩音 ～Taira Komori～', textEn: 'Ayane - Taira Komori -' },
    { type: 'sub',     text: 'https://taira-komori.net' },
    { type: 'spacer' },
    { type: 'name',    text: '効果音ラボ', textEn: 'Sound Effect Lab' },
    { type: 'sub',     text: 'https://soundeffect-lab.info' },
    { type: 'spacer' },
    { type: 'name',    text: 'DOVA-SYNDROME' },
    { type: 'sub',     text: 'https://dova-s.jp' },
    { type: 'spacer' },
    { type: 'name',    text: 'Springin\' Sound Stock' },
    { type: 'sub',     text: 'https://www.springin.org/sound-stock' },
    { type: 'spacer' },
    { type: 'name',    text: '音人 ～On-Jin～', textEn: 'On-Jin' },
    { type: 'sub',     text: 'https://on-jin.com' },
    { type: 'spacer' },
    { type: 'heading', text: 'プロンプト設計', textEn: 'Prompt Design' },
    { type: 'name',    text: 'うさかんファクトリー', textEn: 'Usakan Factory' },
    { type: 'spacer' },
    { type: 'heading', text: 'テストプレイ・デバッグ', textEn: 'Test Play / Debugging' },
    { type: 'name',    text: 'ねじりん', textEn: 'Nejirin' },
    { type: 'name',    text: '毎日グルミク', textEn: 'Mainichi Gurumiku' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'thanks',  text: 'Thank you for playing.' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'logo',    text: 'team-logo.png' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'thanks',  text: '本作は複数のAI技術を活用して制作されています。', textEn: 'This work was created using multiple AI technologies.' },
  ],

  // ===========================================================
  // グッドエンド専用クレジット演出
  // - themeTrack: クレジット開始時に再生する専用曲
  // - themeTitle / themeCredit: 画面上部に表示する曲情報
  // - memoryStills: 思い出スチルとして順番に流す CG key 一覧
  // - lyrics: 画面下部に順番表示するテキスト
  // ===========================================================
  creditsProfiles: {
    sakura_good_end: {
      themeTrack: 'そのままで、咲ける.mp3',
      themeTitle: 'Ending Theme「そのままで、咲ける」',
      themeCredit: 'Sakura Good End Memorial Roll',
      scrollSpeed: 55,
      memoryStills: [
        'sakura_blank_moment',
        'sakura_after_match',
        'pool_sakura_kotoha',
        'sakura_corner_resting',
        'sakura_cant_smile',
        'sakura_embrace',
        'sakura_good_end_rooftop1_pre1',
        'sakura_good_end_rooftop1_pre2',
        'sakura_good_end_rooftop1_pre3',
        'sakura_good_end_rooftop1',
        'sakura_good_end_rooftop2',
      ],
      lyrics: [
        { time: 1,   text: ['夕暮れが　ほどけてく', 'かばん揺れて　影ものびる', 'ひと駅ぶん　遠回り', '誰にも　気づかれないまま'] },
        { time: 28,  text: ['「平気だよ」って', 'くせみたいに　笑ってた', '胸の奥で　きしむ音', '聞こえないふりをしてた'] },
        { time: 42,  text: ['晴れた日ほど', '涙　出そうで　困ってた', '当たり前の　幸せが', '遠くに　見えてたんだ'] },
        { time: 56,  text: ['ひとりで　抱えた荷物', '持ち方さえ　忘れてた', '立ち止まる理由さえ', '許せなかった　あの日'] },
        { time: 69,  text: ['そのままで　咲けるって', 'あなたが　何気なく　言うから', 'ぎゅっと結んでた　心の紐が', 'するり　ほどけてく'] },
        { time: 82,  text: ['「大丈夫」言わなくていい', '言葉より　近い　ぬくもりで', '雨上がりみたいな　空の下', 'やっと　息をつけた'] },
        { time: 99,  text: ['少しだけね', '弱音こぼす　帰り道', '歩幅そろう　そのリズム', '涙のあと　笑えてくる'] },
        { time: 113, text: ['ちゃんと痛い', 'その気持ちを　抱きしめて', '隠さないで　見せること', '逃げることじゃ　ないんだね'] },
        { time: 127, text: ['「ごめんね」って　言いかけたら', '首を横に　振るあなた', '何もしてないよって', 'そんな顔で　そばにいる'] },
        { time: 140, text: ['そのままで　咲けるよと', '風みたいに　やさしい声で', '言い聞かせるように　なぞる言葉が', '胸に　根をおろす'] },
        { time: 153, text: ['強くなくて　かまわない', '揺れながら　伸びていけばいい', '少し泣いたあとの　静けさに', '小さな光がさす'] },
        { time: 171, text: ['無理して笑うたび', '色褪せていった世界が', 'あなたといる今日だけ', 'すこし　あたたかい'] },
        { time: 184, text: ['うまく泣ける日も', 'うまく笑えない日も', '並んで歩けたなら', 'それで　いいよね (うん)'] },
        { time: 197, text: ['そのままで　咲けるから', '今はただ　ここにいてほしい', '言葉足りないまま　見つめ合っても', 'ちゃんと　届いてる'] },
        { time: 211, text: ['「大丈夫」いらない夜', '重ねあう　静かな鼓動で', '夕暮れのつづきの　この道を', '二人で　帰ろうか'] },
        { time: 228, text: ['雨上がりの　匂いだけ', '頬を撫でて　通り過ぎる', 'ほどけたままの　心で', 'そっと　明日を　待てる気がした'] },
        { time: 246, text: [' '] },
      ],
      lyricsRomaji: [
        ['Yuugure ga hodokete ku', 'Kaban yurete kage mo nobiru', 'Hitoeki bun toomawari', 'Dare ni mo kizukarenai mama'],
        ['"Heiki da yo" tte', 'Kuse mitai ni waratteta', 'Mune no oku de kishimu oto', 'Kikoenai furi wo shiteta'],
        ['Hareta hi hodo', 'Namida desou de komatteta', 'Atarimae no shiawase ga', 'Tooku ni mieteta nda'],
        ['Hitori de kakaeta nimotsu', 'Mochikata sae wasureteta', 'Tachidomaru riyuu sae', 'Yurusenakatta ano hi'],
        ['Sono mama de sakeru tte', 'Anata ga nanigenaku iu kara', 'Gyutto musundeta kokoro no himo ga', 'Sururi hodokete ku'],
        ['"Daijoubu" iwanakute ii', 'Kotoba yori chikai nukumori de', 'Ameagari mitai na sora no shita', 'Yatto iki wo tsuketa'],
        ['Sukoshi dake ne', 'Yowane kobosu kaerimichi', 'Hohaba sorou sono rizumu', 'Namida no ato waraete kuru'],
        ['Chanto itai', 'Sono kimochi wo dakishimete', 'Kakusanai de miseru koto', 'Nigeru koto ja nai nda ne'],
        ['"Gomen ne" tte iikaketara', 'Kubi wo yoko ni furu anata', 'Nani mo shitenai yo tte', 'Sonna kao de soba ni iru'],
        ['Sono mama de sakeru yo to', 'Kaze mitai ni yasashii koe de', 'Ii-kikaseru you ni nazoru kotoba ga', 'Mune ni ne wo orosu'],
        ['Tsuyoku nakute kamawanai', 'Yure nagara nobite ikeba ii', 'Sukoshi naita ato no shizukesa ni', 'Chiisana hikari ga sasu'],
        ['Muri shite warau tabi', 'Iroasete itta sekai ga', 'Anata to iru kyou dake', 'Sukoshi atatakai'],
        ['Umaku nakeru hi mo', 'Umaku waraenai hi mo', 'Narande aruketa nara', 'Sore de ii yo ne (un)'],
        ['Sono mama de sakeru kara', 'Ima wa tada koko ni ite hoshii', 'Kotoba tarinai mama mitsumeatte mo', 'Chanto todoiteru'],
        ['"Daijoubu" iranai yoru', 'Kasaneau shizuka na kodou de', 'Yuugure no tsuzuki no kono michi wo', 'Futari de kaerou ka'],
        ['Ameagari no nioi dake', 'Hoo wo nadete toorisugiru', 'Hodoketa mama no kokoro de', 'Sotto ashita wo materu ki ga shita'],
        [' '],
      ],
      lyricsEn: [
        ['The evening light comes undone', 'My bag sways, and shadows grow long', 'One station out of the way', 'Without anyone noticing'],
        ['"I am fine," I said', 'Smiling like a habit', 'The sound creaking deep in my chest', 'I pretended not to hear it'],
        ['The brighter the clear day was', 'The closer I felt to tears', 'Ordinary happiness', 'Looked so far away'],
        ['The burden I carried alone', 'I had forgotten how to hold it', 'Even the reason to stop', 'I could not forgive that day'],
        ['You told me I can bloom as I am', 'So casually, so gently', 'The string around my heart', 'Quietly slips loose'],
        ['I do not have to say I am fine', 'In a warmth closer than words', 'Under a sky after rain', 'I could finally breathe'],
        ['Just a little', 'I let weakness spill on the way home', 'Our footsteps find the same rhythm', 'And after tears, I start to smile'],
        ['This pain is real', 'So I will hold that feeling close', 'Showing it without hiding', 'Is not the same as running away'],
        ['When I almost said sorry', 'You shook your head', 'With a face that said you did nothing', 'You simply stayed beside me'],
        ['You said I can bloom as I am', 'In a voice as gentle as the wind', 'Those words traced over me', 'And took root in my chest'],
        ['I do not have to be strong', 'I can grow while trembling', 'In the quiet after crying', 'A small light begins to shine'],
        ['Every time I forced a smile', 'The world lost a little color', 'But today, with you beside me', 'Feels a little warm'],
        ['On days I can cry well', 'On days I cannot smile well', 'If we can walk side by side', 'That is enough, right? (Yeah)'],
        ['I can bloom as I am', 'So for now, please stay here', 'Even when words are not enough', 'This reaches you properly'],
        ['On a night that needs no "I am fine"', 'With quiet heartbeats overlapping', 'Along this road after sunset', 'Shall we go home together?'],
        ['Only the scent after rain', 'Passes by and brushes my cheek', 'With my heart left unknotted', 'I felt I could softly wait for tomorrow'],
        [' '],
      ],
    },
    kotoha_good_end: {
      themeTrack: 'きみと触れる音.mp3',
      themeTitle: 'Ending Theme「きみと触れる音」',
      themeCredit: 'Kotoha Good End Memorial Roll',
      scrollSpeed: 55,
      memoryStills: [
        'kotoha_window_ch1',
        'kotoha_library_headphones',
        'library_hands_overlap',
        'kotoha_street_piano',
        'kotoha_music_door',
        'kotoha_frozen_piano_sound',
        'kotoha_piano_trembling',
        'kotoha_one_note',
        'kotoha_performance1',
        'kotoha_performance2',
        'kotoha_piano_side',
      ],
      lyrics: [
        { time: 0,   text: ['静寂が落ちる', '夕方の教室', '閉じられたふたに', '指先が迷う'] },
        { time: 14,  text: ['ひと押しの重さ', '記憶が鳴りだす', '笑い声　涙', 'まぶたのうしろ'] },
        { time: 27,  text: ['怖いのは', '音よりも', 'あの日の', 'わたしで'] },
        { time: 42,  text: ['きみと触れる音', 'ほどけていく傷あと', 'まだ震える手のひらに', 'あたたかい影が重なる'] },
        { time: 57,  text: ['きみと触れる音', '少しだけ世界が', 'やわらかい色を取り戻す', 'ここで　また始めてもいいかな (ねえ)'] },
        { time: 87,  text: ['誰もいない廊下', '靴音が遠く', '図書室の窓に', '夕陽がひろがる'] },
        { time: 102, text: ['開きかけた譜面', '書き直したはずの', '消えきらない鉛筆の', 'かすかな余白'] },
        { time: 116, text: ['怖いのは', '間違いと', '黙りこむ', '自分で'] },
        { time: 129, text: ['きみと触れる音', 'ひそやかな再生', 'ほどけないと思っていた', '固い結び目がゆるんでく'] },
        { time: 145, text: ['きみと触れる音', '息を合わせるたび', 'あの日とは違う景色で', '同じメロディをなぞってる'] },
        { time: 161, text: ['音が止むたび', '赦されていくようで', '沈黙さえも', 'やさしい手触り'] },
        { time: 175, text: ['「大丈夫」と', '声にしないままで', '隣にいることだけ', '教えてくれる'] },
        { time: 189, text: ['きみと触れる音', '怖さごと抱きしめて', 'ほどよく揺れる不安さえ', '今は進むためのリズム'] },
        { time: 205, text: ['きみと触れる音', '最後まで聴いていて', 'かすれたこの一音から', 'わたしはもう一度　生まれる'] },
        { time: 217, text: ['[ピアノソロ]'] },
      ],
      lyricsRomaji: [
        ['Seijaku ga ochiru', 'Yuugata no kyoushitsu', 'Tojirareta futa ni', 'Yubisaki ga mayou'],
        ['Hito-oshi no omosa', 'Kioku ga naridasu', 'Waraigoe namida', 'Mabuta no ushiro'],
        ['Kowai no wa', 'Oto yori mo', 'Ano hi no', 'Watashi de'],
        ['Kimi to fureru oto', 'Hodokete iku kizuato', 'Mada furueru tenohira ni', 'Atatakai kage ga kasanaru'],
        ['Kimi to fureru oto', 'Sukoshi dake sekai ga', 'Yawarakai iro wo torimodosu', 'Koko de mata hajimete mo ii kana (nee)'],
        ['Dare mo inai rouka', 'Kutsuoto ga tooku', 'Toshoshitsu no mado ni', 'Yuuhi ga hirogaru'],
        ['Hirakikaketa fumen', 'Kakinaoshita hazu no', 'Kiekiranai enpitsu no', 'Kasuka na yohaku'],
        ['Kowai no wa', 'Machigai to', 'Damarikomu', 'Jibun de'],
        ['Kimi to fureru oto', 'Hisoyaka na saisei', 'Hodokenai to omotteita', 'Katai musubime ga yurunde ku'],
        ['Kimi to fureru oto', 'Iki wo awaseru tabi', 'Ano hi to wa chigau keshiki de', 'Onaji melody wo nazotteru'],
        ['Oto ga yamu tabi', 'Yurusarete iku you de', 'Chinmoku sae mo', 'Yasashii tezawari'],
        ['"Daijoubu" to', 'Koe ni shinai mama de', 'Tonari ni iru koto dake', 'Oshiete kureru'],
        ['Kimi to fureru oto', 'Kowasa goto dakishimete', 'Hodo yoku yureru fuan sae', 'Ima wa susumu tame no rizumu'],
        ['Kimi to fureru oto', 'Saigo made kiite ite', 'Kasureta kono ichi-on kara', 'Watashi wa mou ichido umareru'],
        ['[Piano solo]'],
      ],
      lyricsEn: [
        ['Silence falls', 'In the classroom at dusk', 'Before the closed lid', 'My fingertips hesitate'],
        ['The weight of one press', 'Sets memory ringing', 'Laughter and tears', 'Behind my eyelids'],
        ['What scares me', 'More than the sound', 'Is the me', 'From that day'],
        ['The sound I touch with you', 'Loosens the scars left behind', 'Over my still-trembling palm', 'A warm shadow overlaps'],
        ['The sound I touch with you', 'Restores the world', 'Just a little softer in color', 'Can I begin again here? (Hey)'],
        ['An empty hallway', 'Footsteps fading far away', 'At the library window', 'Sunset spreads wide'],
        ['A score half-opened', 'Supposedly rewritten', 'The pencil marks that will not vanish', 'Leave a faint margin'],
        ['What scares me', 'Is making mistakes', 'And the self', 'That falls silent'],
        ['The sound I touch with you', 'A quiet kind of rebirth', 'The knot I thought would never loosen', 'Starts to come undone'],
        ['The sound I touch with you', 'Every time our breathing matches', 'In scenery unlike that day', 'We trace the same melody'],
        ['Each time the sound stops', 'It feels like I am being forgiven', 'Even silence', 'Has a gentle texture'],
        ['Without saying', '"I am fine" out loud', 'You teach me simply', 'By staying beside me'],
        ['The sound I touch with you', 'Holding even fear close', 'Even this softly swaying unease', 'Is now a rhythm for moving forward'],
        ['The sound I touch with you', 'Please listen until the end', 'From this one hoarse note', 'I am born once more'],
        ['[Piano solo]'],
      ],
    },
    mahiru_good_end: {
      themeTrack: '理由のない明日へ.mp3',
      themeTitle: 'Ending Theme「理由のない明日へ」',
      themeCredit: 'Mahiru Good End Memorial Roll',
      scrollSpeed: 55,
      memoryStills: [
        'mahiru_notebook_drop',
        'mahiru_rooftop_photo',
        'mahiru_riverbank',
        'pool_mahiru_window',
        'mahiru_evening_rooftop',
        'rooftop_shooting_star',
        'rooftop_four_wishes',
        'mahiru_notebook_one_line',
        'mahiru_seen_from_below',
        'mahiru_rooftop_reach',
        'mahiru_rooftop_night',
        'night_sky_no_stars',
        'mahiru_dawn_two',
        'mahiru_rooftop_friends_photo',
      ],
      lyrics: [
        { time: 0,   text: ['夕焼け　川沿いの道', '少し冷たい　横顔の影', 'ミラーレスのカメラ　ぶらさげたまま', '今日は　シャッターも　あまり押さないね'] },
        { time: 26,  text: ['ノートには　昨日の続き', '余白ばかりが　増えてゆくページ', '「生きてる理由」なんて　書けなくなっても', '並んだ足音だけは　ちゃんと残ってる'] },
        { time: 52,  text: ['風がページをめくるたび', '言葉がひとつ　こぼれ落ちて', '拾えないまま　笑ってみる', 'それで　いいのかな'] },
        { time: 66,  text: ['理由のない明日へ', 'きみと歩いてゆく', '何も起きない今日が', 'なぜか　少しだけ　愛しくなる'] },
        { time: 80,  text: ['空の色　変わってく', '写真じゃ追いつけない', '「それでも生きていく」を', 'となりで　小さく　確かめてる'] },
        { time: 97,  text: ['川面に　ほどける光', '風に揺れてる　ふたりの影', '静けさの中に　まぎれた言い訳', '言わなくても　伝わる気がしてる'] },
        { time: 117, text: ['理由を　数え疲れて', '手帳の端っこ　折りたたむたび', '消えそうな一行　きみの名前だけ', 'どうしてか　消しゴムが　動かないんだ'] },
        { time: 136, text: ['息を合わせて歩くたび', '世界がすこし　柔らかくて', '「大丈夫かな」って　つぶやく声', '風が　持っていく'] },
        { time: 150, text: ['理由のない明日へ', 'きみと歩いてゆく', '何も決めないまま', '同じ景色を　ただ眺めてる'] },
        { time: 164, text: ['空を切る　飛行機雲', '写真に残せなくても', 'ここにあるぬくもりが', '胸のどこかを　そっと埋める'] },
        { time: 178, text: ['言えなかったさよなら', '書けなかったありがとう', 'ノートのすみで　丸めた文字たち', 'きみといる今日だけは', '捨てられずに　抱きしめている'] },
        { time: 205, text: ['理由のない明日へ', 'きみと歩いてゆく', '「意味なんて　なくても」', '風にまぎれて　つぶやいてみる'] },
        { time: 219, text: ['帰り道　伸びてゆく', 'ふたつ分の影法師', 'いつか消えてしまっても', 'たしかに　ここを　歩いていたね'] },
        { time: 234, text: ['最後のページ　閉じる音', '空に溶けてく　かえりみち', '理由は増えなくても', 'きみと並んで　それでも生きていく'] },
        { time: 263, text: [' '] },
      ],
      lyricsRomaji: [
        ['Yuuyake kawazoi no michi', 'Sukoshi tsumetai yokogao no kage', 'Mirrorless no camera burasageta mama', 'Kyou wa shutter mo amari osanai ne'],
        ['Note ni wa kinou no tsuzuki', 'Yohaku bakari ga fuete yuku page', '"Ikiteru riyuu" nante kakenaku natte mo', 'Naranda ashioto dake wa chanto nokotteru'],
        ['Kaze ga page wo mekuru tabi', 'Kotoba ga hitotsu koboreochite', 'Hiroenai mama waratte miru', 'Sore de ii no kana'],
        ['Riyuu no nai ashita e', 'Kimi to aruite yuku', 'Nani mo okinai kyou ga', 'Nazeka sukoshi dake itoshiku naru'],
        ['Sora no iro kawatte ku', 'Shashin ja oitsukenai', '"Sore demo ikite iku" wo', 'Tonari de chiisaku tashikameteru'],
        ['Kawamo ni hodokeru hikari', 'Kaze ni yureteru futari no kage', 'Shizukesa no naka ni magireta iiwake', 'Iwanakute mo tsutawaru ki ga shiteru'],
        ['Riyuu wo kazoe tsukarete', 'Techou no hashikko oritatamu tabi', 'Kiesou na ichigyou kimi no namae dake', 'Doushite ka keshigomu ga ugokanai nda'],
        ['Iki wo awasete aruku tabi', 'Sekai ga sukoshi yawarakakute', '"Daijoubu kana" tte tsubuyaku koe', 'Kaze ga motte iku'],
        ['Riyuu no nai ashita e', 'Kimi to aruite yuku', 'Nani mo kimenai mama', 'Onaji keshiki wo tada nagameteru'],
        ['Sora wo kiru hikoukigumo', 'Shashin ni nokosenakute mo', 'Koko ni aru nukumori ga', 'Mune no dokoka wo sotto umeru'],
        ['Ienakatta sayonara', 'Kakenakatta arigatou', 'Note no sumi de marumeta mojitachi', 'Kimi to iru kyou dake wa', 'Suterarezu ni dakishimete iru'],
        ['Riyuu no nai ashita e', 'Kimi to aruite yuku', '"Imi nante nakute mo"', 'Kaze ni magirete tsubuyaite miru'],
        ['Kaerimichi nobite yuku', 'Futatsu bun no kageboushi', 'Itsuka kiete shimatte mo', 'Tashika ni koko wo aruite ita ne'],
        ['Saigo no page tojiru oto', 'Sora ni tokete ku kaerimichi', 'Riyuu wa fuenakute mo', 'Kimi to narande soredemo ikite iku'],
        [' '],
      ],
      lyricsEn: [
        ['Sunset on the river road', 'A profile shaded a little cold', 'Your mirrorless camera still hanging there', 'Today you barely press the shutter'],
        ['In your notebook, yesterday continues', 'Pages with only margins keep growing', 'Even when you cannot write a reason to live', 'Our side-by-side footsteps still remain'],
        ['Each time the wind turns a page', 'One word spills out', 'I smile without picking it up', 'Is that enough?'],
        ['Toward a tomorrow without a reason', 'I walk there with you', 'A day where nothing happens', 'Somehow becomes a little precious'],
        ['The color of the sky changes', 'Too quickly for a photograph', 'Beside you, I quietly confirm', 'That we still go on living'],
        ['Light unravels on the river', 'Our two shadows sway in the wind', 'An excuse hidden inside the quiet', 'Feels like it gets across without words'],
        ['Tired of counting reasons', 'Each time you fold the corner of your planner', 'Only your name on a fading line', 'Somehow the eraser will not move'],
        ['Each time we walk in the same breath', 'The world feels a little softer', 'The voice whispering "Will it be okay?"', 'Is carried away by the wind'],
        ['Toward a tomorrow without a reason', 'I walk there with you', 'Deciding nothing at all', 'Only looking at the same scenery'],
        ['A contrail cuts across the sky', 'Even if it cannot stay in a photo', 'The warmth here beside me', 'Softly fills somewhere in my chest'],
        ['The goodbye I could not say', 'The thank you I could not write', 'Words crumpled in the corner of a notebook', 'Only today, while I am with you', 'I hold them without throwing them away'],
        ['Toward a tomorrow without a reason', 'I walk there with you', '"Even without meaning"', 'I try whispering into the wind'],
        ['On the way home, stretching longer', 'Two shadows side by side', 'Even if they disappear someday', 'We surely walked here'],
        ['The sound of the final page closing', 'The road home melts into the sky', 'Even if reasons do not increase', 'Beside you, I still go on living'],
        [' '],
      ],
    },
  },

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

  openingLinesByLanguage: {
    ja: [
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
    en: [
      'Stars look so beautiful when you gaze up at them from far away.',
      'Even when they seem close enough to reach,<br>we are always standing behind an invisible <strong>boundary</strong>.',
      '"I am fine."',
      'Those words were a shield to protect ourselves.<br>And at the same time, a gentle lie to keep someone else away.',
      'So we would not be hurt.<br>So we would not break anything.',
      'We learned to call the empty space we could not cross "everyday life."',
      'I wanted someone to notice.<br>I wanted someone to take my hand.',
      'Wishes that could not become words<br>melted into the falling light and sank into the bottom of the night.',
      'Even so.<br>Before this night gives way to morning, just one step.',
      'I want to cross the boundary you drew.',
    ],
  },
};
