# SOUND MODE の演出とダウンロード

2026-10-23、バージョン1.4のサウンドモードを拡張。

## 画面と背景

透明なパネルの背後に、本編の背景を表示する。`config.js` の `soundScenes` に全36曲それぞれ3枚を指定。ピアノ曲は音楽室、さくらの曲は体育館、まひるの曲は屋上や河川敷、日常曲は教室など、曲の場面に合わせる。イベントCGは使用しない。

11秒ごとに背景を切り替え、2.2秒のクロスフェードと14.5秒の緩やかなパン・拡大縮小を組み合わせる。画像読み込みの完了を待って表示し、曲変更・閉じる操作・ゲームのリセット後に古い読み込みが表示を上書きしないよう取り消す。画像が読めない場合は設定済みの背景グラデーションを使用する。

## 実音声メーター

`sound-mode-visuals.js` が既存の音楽プレーヤーを `MediaElementAudioSourceNode → AnalyserNode → destination` で接続し、実際の周波数成分を32本のバーとピーク表示へ描画する。音量・ミュート・一時停止も反映する。別の音源を同時再生したり、音楽そのものに加工を加えたりしない。

音声ノードは最初の曲選択時に1回だけ作成し、再び開いたときも再利用する。閉じると描画と背景タイマーを止め、解析用AudioContextをsuspendし、タイトルBGMへ戻る。Web Audioが使えない環境でも既存の音楽再生は維持する。

非表示タブでは描画・背景の動きのみ待機する。OSの「動きを減らす」設定ではスライドショーとメーターの連続アニメーションを停止し、音楽再生・ダウンロードは利用できる。

APIの確認元: [createMediaElementSource](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource)、[AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)。

## ダウンロード

全BGM32曲とOP・ED4曲の各行に「↓」リンクを表示。選択中の曲は画面下の「この曲をダウンロード／Download track」からも保存できる。元のMP3を同一オリジンの `download` リンクで渡し、再エンコードせず、再生中の音楽も止めない。保存名は `Stella - 曲名.mp3`。表示言語に応じて説明とアクセシビリティラベルを切り替える。

曲を選ぶ前は画面下のダウンロードを無効にし、曲一覧からは選択前でも保存できる。ブラウザーの保存動作は利用環境の設定に従う。仕様の確認元: [HTML download属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download)。

## 検証

`py tools/check_sound_mode.py` で音声の実出力、メーターの反応、背景の自然切り替え、実MP3ダウンロードの原本一致、日英表示、ミュート・一時停止・再入場、動きを減らす設定、リセット、スマートフォン横向き表示を確認する。既存の全曲再生・解放条件は `py tools/check_report15.py` で確認する。

結果・画面は `D:/AI/stella-sound-mode-visuals-20261023/verification/` に保存する。

確認結果：専用の実ブラウザー検証12項目、既存サウンドモード・章切り替え検証14項目、音声・シナリオのNode検証45項目、LP両版の日英検証が成功。日本語BGMと英語OPの保存ファイルは原本のSHA-256と一致し、全36曲の個別リンクと42枚の背景画像の実読込も確認した。
