# オマケの音声制作

1.4.2で、まひるの「牌」とことはの「河」「Ｎ原くん」を演技台本付きで録り直した。音声用の読みは「ハイ」「ホー」「エヌハラくん」。表示原文と配役を維持。制作・検証は [デバッグ報告16対応記録](debug-report16-status.md) を参照。

2026-10-22。`feat/bonus-scenario-20261018` のオマケを対象に、本編と同じ5役で日英各156台詞を収録。主人公・地の文・選択肢は本編の仕様に合わせて無音。

| 役 | 声 | 演技の軸 |
| --- | --- | --- |
| さくら | Suzu | 明るい提案、得意顔、狼狽、開き直り。麻雀の申告は明瞭に、AAの語尾だけで別人にしない。 |
| ことは | Leira | 落ち着いた声を基本に、短い決め台詞と失敗後の気まずさを分ける。常時ささやかない。 |
| まひる | Yuki | 穏やかな日常声。勝負と購入権でだけ控えめな威厳を出し、写真の追い打ちは無邪気に。 |
| 延原 | Kou Sudo | 軽口、真顔の時代換算、実況、いかさま発覚後の懇願を区別。 |
| 先生 | Sawaro | 古いネット口調を楽しむ照れ、大仰な宣告、普段の注意、気まずい退場を分ける。 |

## 演技台本

音声制作側の `acting-scripts/bonus-v2-20261022/` に保存。

- [日本語の演技台本](../../houkago-stella-voice/acting-scripts/bonus-v2-20261022/acting-script.ja.md)
- [英語の演技台本](../../houkago-stella-voice/acting-scripts/bonus-v2-20261022/acting-script.en.md)
- [台詞ごとの演出原稿](../../houkago-stella-voice/acting-scripts/bonus-v2-20261022/direction.tsv)
- [英語独自ネタの演出](../../houkago-stella-voice/acting-scripts/bonus-v2-20261022/english-overrides.json)

全156台詞に相手・目的・間・語尾・感情変化を個別指定。英語版はAll Your Base／Badgersやpics／sageなど、翻案に応じて別の演技を指定した。各台詞には表示原文、前後の文脈、音声用本文も併記。人向けの詳細指示は朗読本文へ入れず、音声用本文には選んだ短い演技タグと読み補正だけを渡す。

例えば、ことはの「爆牌！」は鋭く短く、直後のさくら「あ、それロン。」は何気なく返して落差を作る。まひるの「ゲームを買う権利をやる！」は控えめな威厳から、否定されると普段の素直な代案へ戻る。ゆっくり場面でも本人の声を維持し、他作品の声優の声真似や機械的なピッチ加工はしない。

## 制作・登録

制作入口は音声制作側の `bonus-voice.py`。`samples/bonus-v2-20261022/` にモデル・配役のAPI照合、原文と演出入力のハッシュ、確定payload、request ID、原音・測定値を保存。初期の一律タグ版 `bonus-v1-20261022` は未生成の草稿として保管し、収録には使っていない。

`eleven_v4`、stability 0.5、similarity_boost 0.75、日英のlanguage_code、MP3 44.1kHz/128kbpsは本編の制作設定を継承。既存残高の範囲で生成し、結果不明なPOSTは自動再送しない。仕様は [音声生成API](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) と [残高API](https://elevenlabs.io/docs/api-reference/user/subscription/get) を照合した。

音声は `assets/voice/{ja,en}/bonus/*.bonus-v2.mp3` に版付きで書き出し、既存の言語別manifestへ `bonus.rNNN` を登録する。本編の既存エントリーを保持。ゲームから生成APIへアクセスせず、既存の音声再生・先読み・ログ再生を使う。

`assets/voice/bonus-production.json` に話者・表示原文ハッシュ・音声ハッシュ・補正ゲインを記録し、`tools/check_full_voice.cjs` で現在の台詞との一致を検査する。オマケは生成時の連番IDなので、改稿でIDや本文が変わったら音声をそのまま流用せず、該当言語の再収録・再登録を行う。

## 完了・検証結果

日英各156件、計312件を生成して登録。全件をWeb Audioでデコードして有声音RMS・サンプルピーク・長さを測定し、本編の役／言語別基準へ個別ゲインを補正した。合計1024.4秒、最短0.48秒、最長8.48秒、MP3合計16,727,456バイト。補正後の最大サンプルピークは約-1.02 dBFS。

- `py tools/check_bonus_voice.py`：5項目PASS。日英各16台詞を実際のエンジンで再生し、音声専用の出力で非ゼロの波形を確認。5役、麻雀の決め台詞、AA、ゆっくり、先生、謝罪を含む。さらに日英のロード・ログ再生、スキップとリセット、本編の先生の音声への復帰を確認。
- `node --test tools/check_voice.cjs tools/check_full_voice.cjs`：16テストPASS。本編とオマケの全NPC台詞、原文・話者・音声ハッシュ、配置・ゲイン、再生制御を確認。今回はVS Code内蔵Nodeで実行。
- `py tools/check_scenarios_i18n.py`、`git diff --check`：PASS。

ブラウザー検証はミュート環境で波形を測定しており、発音・芝居の主観的な全件試聴とは分けている。[原音の試聴ページ](../../houkago-stella-voice/samples/bonus-v2-20261022/audition.html) では台詞・演技指示を読みながら再生できる。原音・生成記録・測定値は同フォルダー、ブラウザーの波形記録は `../stella-bonus-implementation-20261018/verification/bonus-voice-samples.json` に保存。

## コトハ／マージャンの録り直し（2026-10-23）

ユーザーの発音指摘に合わせ、日本語の音声用本文を「ことは」→「コトハ」、「まあじゃん／麻雀」→「マージャン」にした6件を録り直した。表示原文・話者・既存の個別演技指示は維持し、前後の音声用文脈も同じ読みへ揃えた。

| ID | 役 | 対象語 |
| --- | --- | --- |
| bonus.r031 | 延原 | 麻雀で勝ったやつの案 |
| bonus.r044 | さくら | ことは呼んでこよ |
| bonus.r100 | ことは | 麻雀に流れなんてないよ |
| bonus.r130 | さくら | 麻雀って楽しいよね |
| bonus.r192 | さくら | ことはと司会やる |
| bonus.r249 | 延原 | 麻雀 |

制作入口は `retake-bonus-readings.py`。収録計画・原音・測定値・演技台本を `samples/bonus-readings-v3-20261023/` に保存し、ゲームへ `*.bonus-readings-v3.mp3` で登録。日本語の対象6件以外と英語のmanifestは一致を検査して保護した。登録台詞数は日英312件のまま。v2の原音・配信ファイルも保管している。

v2の試聴ページは前のテイクの記録。最新6件は [新旧比較ページ](../../houkago-stella-voice/samples/bonus-readings-v3-20261023/comparison.html) で確認できる。

差し替え後のNode16テストとブラウザーの音声検証5項目がPASS。録り直した6台詞も再生対象へ追加し、新音声の波形、ログ、ロード、本編への復帰を確認した。

## ことはの断言を元気に変更（2026-10-23）

bonus.r100「麻雀に流れなんてないよ。」は、ユーザーの指定でdrylyから、元気はつらつで自信のある言い切りへ再収録。音声用本文は `[excited][confidently] マージャンに流れなんてないよ！`。目的・語尾・明るさを個別に記した演技台本を `samples/bonus-kotoha-confident-v4-20261023/` に保存し、表示原文は維持した。

API認証の有効化後に1件を生成・デコード・音量補正し、`bonus.r100.bonus-kotoha-confident-v4.mp3` へ差し替え。対象外の日本語・英語は維持。旧テイクも保管し、[新旧比較](../../houkago-stella-voice/samples/bonus-kotoha-confident-v4-20261023/comparison.html)で確認できる。

その後「もっと真剣が必要」との指定を受け、明るく弾む調子を抑え、勝負の論理を信じる真剣な確信へ変更。音声用本文は `[serious][confidently] マージャンに流れなんてないよ。`。演技台本で相手へのまっすぐな視線、芯のある発声、低めに落とす語尾を指定し、v5を収録・測定して登録した。対象は同じ1件だけで、v4も保管。[元気なv4と真剣なv5の比較](../../houkago-stella-voice/samples/bonus-kotoha-serious-v5-20261023/comparison.html)。

2026-10-23、ユーザーが真剣なv5を採用。ゲームのmanifestがv5を参照していることを再確認し、これを現行の採用テイクとする。
