# デバッグ報告11：再収録台本

## 2026-10-19 まひる「いったん離して」をフラットな会話調へ（v2）

ユーザーの追加指定でsoftly/embarrassedを外し、`[matter-of-fact, conversational] いったん離して。` として1本を再生成。同じYuki・eleven_v4・前後文脈を維持。ユーザーの「OK」により会話調v2も承認済み。現行ボイスはすべて確認完了。[生成記録](voice-review/mahiru-flat-v2.json)。

## 2026-10-19 現行ボイスの確認完了

ユーザーが「OK。ボイスの修正もOKです。」と確認。以下の再調整を含む現行版と、基準音量+3dBの変更を承認済みとして記録した。以下の試聴待ち表記は当時の作業経過。

## 2026-10-19 GOOD END台詞を二文に分けて生成・結合（v3）

一括softly指定のv2はユーザー試聴で「変わってない」と評価。今回は「こちらへどうぞ。」「最初の音だけ、一緒に押してみませんか。」を別々に生成し、各文へ `[quiet, restrained voice]` を指定した。配役・モデル・表示本文を維持。

公式ガイドは具体的な声質の指定を勧め、タグへの追従にはばらつきがあると説明している。[ElevenLabs公式](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#prompting-eleven-v4)。二文を独立生成して結合する手順は今回の制作上の工夫であり、効果の保証ではない。

承認済み練習台詞を参照上限にし、ピークの余裕が小さい方に合わせて両文の実効RMSを揃えた。調整後の差は約0.20dB。発話前後の無音だけを余裕を残して整理し、120msの間と4msの境界フェードを入れてMP3へ一度だけ結合エンコード。ピッチや発話速度は加工していない。聴感上の演技は試聴確認待ち。[生成・編集記録](voice-review/kotoha-goodend-split-v3.json)。

## 2026-10-19 練習台詞の承認とGOOD END台詞の抑えめ調整

ユーザーが練習台詞v3「聴いてください。次は意識して」を承認。確定した音声は変更しない。同じ一つの `[softly]` 指定で「こちらへどうぞ。最初の音だけ、一緒に押してみませんか。」を1本再生成し、前半・後半とも抑えた演技を狙う候補として登録。steadyは使用せず、表示本文・配役・モデルも維持。新しいGOOD END台詞は試聴確認待ち。[生成記録](voice-review/kotoha-goodend-subdued-v2.json)。

## 2026-10-19 演技再調整：ことはの練習台詞を二文とも抑えめに（v3）

ユーザーからsteadyを使わず前半・後半の両方を抑えたいとの指定。`[softly] 聴いてください。次は、意識して。` の一つの演技指定で全体を揃える狙いの音声を、同じLeira／eleven_v4で1本生成。表示本文は維持し、直前版も保存。この練習台詞v3はユーザー試聴で承認済み。[生成記録](voice-review/kotoha-practice-subdued-v3.json)。

## 2026-10-19 演技調整：ことは「聴いてください。次は意識して」

ユーザーから機械的なイントネーションとの試聴指摘。`[calm, steady]` を外し、`[gentle] 聴いてください。次は、意識して。` で同じLeira／eleven_v4の音声を1本生成。表示本文は維持。ピアノ演奏を聴く相手へのやさしい念押しを狙った試聴候補で、自然さの判定は未実施。前の音声も比較用に保存。[生成記録](voice-review/kotoha-practice-natural-v2.json)。

## 2026-10-19 演技調整：さくら「まだあたしの名前しかないんだよ」（v4）

ユーザー指定で後半を少し困った・残念そうなニュアンスへ寄せる試聴版。表示本文は変えず、前半を `[casual]`、後半の直前に `[a little disappointed]` を置いて同じ配役・モデルで1本再生成。前の音声も残し比較ページを更新。演技の自然さは試聴確認待ち。[生成記録](voice-review/sakura-disappointed-v4.json)。

## 2026-10-19 試聴不合格を受けた言い換え版（v3）

ユーザーより、漢字＋括弧とカタカナの3台詞はいずれも同じ誤発音と報告。旧新ファイルのSHAが異なり、8892からの配信内容も新ファイルと一致することを確認した。今回は読み指定ではなく、意味を保った言い換えに変更し、画面本文も揃えた。

- さくら：「力仕事だけでいいから。手伝いの名簿、まだあたしの名前しかないんだよ」
- ことは：「それは、その紙を回していないからでは」
- ことは：「こんなふうに。力を入れないで」

同じ配役・eleven_v4で3本を再生成し、試聴用の最新版として登録。旧版は残し、v2の記録にはユーザー試聴で改善しなかった旨を追記した。新しい3本の自然さは試聴確認待ち。[生成記録](voice-review/phrasing-v3.json)。

## 2026-10-19 追加修正：ことは「こう。力を入れないで」

再試聴で「こう」が引き続き「ちょう」に聞こえるとの指摘を受け、読み上げ冒頭を `[gentle] コウ。力を入れないで。` に変更し、同じLeira／eleven_v4で1本再生成・登録。表示本文・IDを維持し、直前版も保存。子音が意図どおりかは試聴確認待ち。今回のAPI課金文字数ヘッダー9、記録合計456（実請求額とは区別）。[生成記録](voice-review/kotoha-kou-v2.json)。

## 2026-10-19 追加修正：「担当表」「表」のアクセント

ユーザーの提案に沿い、さくらを「担当表（たんとうひょう）」、ことはを「表（ひょう）」とする読み上げ台本で各1本を再生成・登録した。画面の本文とIDは維持。同じ配役・eleven_v4を使用し、直前版と今回版を比較ページへ登録。漢字＋括弧でアクセント改善を試すもので、効果や括弧内の重複読みの有無は試聴で確認する。今回の課金文字数ヘッダー合計35、前回まで412との記録合計447（実請求額とは区別）。[追加生成記録](voice-review/table-readings-v2.json)。

## 2026-10-19 追加修正：さくら「あと十分くらい」

試聴後の指定を受け、`chapter2.chapter2_sakura_event.r013` を「一人だとここであと十分くらい過ごしちゃうから」へ変更。読み上げは `[casual] 一人だと、ここであとじゅっぷんくらい過ごしちゃうから。`。同じ配役・モデルで1本生成し登録、直前の「もうじゅっぷん」版も保存。比較ページのこの台詞は直前版と今回版を比較する。API課金文字数ヘッダーは今回16、初回396との合計412（実請求額とは区別）。発音・演技は試聴確認待ち。[追加生成記録](voice-review/sakura-tenminutes-v2.json)。

以下は初回23台詞の生成記録。

送信先：ElevenLabs（既存契約・配役・eleven_v4）。ユーザーのAPI使用承認後に23音声を生成し、レビュー版へ登録済み。TTSのtextフィールド合計902文字、前後文脈2,575文字。APIレスポンスの課金文字数ヘッダー合計396（実請求額とは区別）。

日本語の指摘19台詞と、本文訂正による日英4台詞。台詞IDを維持し、全旧音声も保存。[比較試聴](voice-review/index.html) で発音・演技・語尾を確認する。技術検査は完了、人手の試聴判定は未実施。

## ja / chapter1.chapter1_after_school_intro.r011

配役：sakura / Suzu - Cute, Clear & Calm

表示本文：え？

TTS台本：[startled] えっ？

## ja / chapter2.chapter2_lunch.r003

配役：sakura / Suzu - Cute, Clear & Calm

表示本文：開いてるって聞いたもん。実際開いてたし

TTS台本：[casual] 開いてるって聞いたもん。実際、あいてたし。

## ja / chapter2.chapter2_sakura_event.r013

配役：sakura / Suzu - Cute, Clear & Calm

表示本文：一人だとここでもう十分くらい過ごしちゃうから

TTS台本：[casual] 一人だと、ここで、もうじゅっぷんくらい過ごしちゃうから。

## ja / chapter3.chapter3_start.r028

配役：mahiru / Yuki

表示本文：そっか。ことはちゃん、昨日の本、持ってきた

TTS台本：[matter-of-fact] そっか。コトハちゃん、昨日の本、持ってきた。

## ja / chapter3.chapter3_lunch.r011

配役：mahiru / Yuki

表示本文：雲。魚だったんだよ

TTS台本：[thoughtful] くも。魚だったんだよ。

## ja / chapter4.chapter4_start.r017

配役：sakura / Suzu - Cute, Clear & Calm

表示本文：力仕事だけでいいから。担当表、まだあたしの名前しかないんだよ

TTS台本：[casual] 力仕事だけでいいから。たんとうひょう、まだあたしの名前しかないんだよ。

## ja / chapter4.chapter4_start.r018

配役：kotoha / Leira - Elegant Lady

表示本文：それは、表を回していないからでは

TTS台本：[calm] それは、ひょうを回していないからでは。

## ja / chapter7.chapter7_music_room.r024

配役：kotoha / Leira - Elegant Lady

表示本文：入れたら、呼んでもいいですか

TTS台本：[gentle] はいれたら、呼んでもいいですか。

## ja / chapter7.chapter7_rooftop.r050

配役：mahiru / Yuki

表示本文：明日も空がきれいだといいな

TTS台本：[softly] 明日も空がきれいだといいな。

## ja / route_sakura.sakura_good_end_hospital.r003

配役：sakura / Suzu - Cute, Clear & Calm

表示本文：うん。勇くんが荷物取りに戻ったとき

TTS台本：[gentle] うん。イサムくんが、荷物、取りに戻ったとき。

## ja / route_kotoha.kotoha_ch9_daily2.r005

配役：kotoha / Leira - Elegant Lady

表示本文：はい。困っています

TTS台本：[calm] はい。こまっています。

## ja / route_kotoha.kotoha_ch11_start.r041

配役：kotoha / Leira - Elegant Lady

表示本文：こう。力を入れないで

TTS台本：[gentle] こう。力を入れないで。

## ja / route_kotoha.kotoha_ch12_practice.r004

配役：kotoha / Leira - Elegant Lady

表示本文：聴いてください。次は意識して

TTS台本：[calm, steady] 聴いてください。次は意識して。

## ja / route_kotoha.kotoha_ch12_good_end.r026

配役：kotoha / Leira - Elegant Lady

表示本文：こちらへどうぞ。最初の音だけ、一緒に押してみませんか

TTS台本：[gentle, steady] こちらへどうぞ。最初の音だけ、一緒に押してみませんか。

## ja / route_mahiru.mahiru_ch9_corridor.r003

配役：mahiru / Yuki

表示本文：今日、ひとりがいい

TTS台本：[quiet, tired] きょう、ひとりがいい。

## ja / route_mahiru.mahiru_ch9_walk.r007

配役：mahiru / Yuki

表示本文：まひるは遅いもん。もう一回くらいいいでしょ

TTS台本：[casual] まひるは遅いもん。もういっかいくらい、いいでしょ。

## ja / route_mahiru.mahiru_ch12_branch.teacher_safety

配役：teacher_male / Sawaro - Japanese Actor Voice

表示本文：扉の内側にも入れるようにしておく。見回りには来るからな

TTS台本：[reassuring] 扉の内側にも、はいれるようにしておく。見回りには来るからな。

## ja / route_mahiru.mahiru_good_end_school.r016

配役：sakura / Suzu - Cute, Clear & Calm

表示本文：もう見ちゃった。あたし、髪はねてるじゃん

TTS台本：[playful] もう見ちゃった。あたし、髪、はねてるじゃん。

## ja / route_mahiru.mahiru_good_end_school.r050

配役：mahiru / Yuki

表示本文：いったん離して

TTS台本：[softly, embarrassed] いったん離して。

## ja / chapter1.chapter1_homeroom.r001

配役：teacher_male / Sawaro - Japanese Actor Voice

表示本文：座れ。まず連絡。去年の落とし物の傘が十二本、職員室にある。心当たりのある者は、今日のうちに取りに来るように

TTS台本：[matter-of-fact] 座れ。まず連絡。去年の落とし物の傘が十二本、職員室にある。心当たりのある者は、今日のうちに取りに来るように

## ja / chapter4.chapter4_corridor_end.r014

配役：mahiru / Yuki

表示本文：傘、借りに行ってくる。ノート返してくれてありがと

TTS台本：[casual] 傘、借りに行ってくる。ノート返してくれてありがと

## en / chapter1.chapter1_homeroom.r001

配役：teacher_male / Sawaro - Japanese Actor Voice

表示本文：Sit down. First announcement: twelve umbrellas left behind last year are in the staff room. If one is yours, come and collect it today.

TTS台本：[matter-of-fact] Sit down. First announcement: twelve umbrellas left behind last year are in the staff room. If one is yours, come and collect it today.

## en / chapter4.chapter4_corridor_end.r014

配役：mahiru / Yuki

表示本文：I’m going to borrow an umbrella. Thanks for giving my notebook back.

TTS台本：[casual] I’m going to borrow an umbrella. Thanks for giving my notebook back.
