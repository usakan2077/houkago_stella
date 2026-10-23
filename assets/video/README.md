# OPムービー

`stella-op.mp4` は、承認済み完成版 `放課後のステラ_OP_完成版_1080p.mp4` をそのまま収録したものです。

- 1920×1080、30fps、102.866667秒
- H.264 / AAC、81,372,031バイト
- SHA-256: `22bd0a27edaaf96805a671b3ef275020e0e9112acb441546605900b4295024ca`

再生の設定は `config.js` の `openingMovie` / `openingMovieIdleMs`、制御は `opening-movie.js` にあります。NEW GAME後の導入動画 `assets/images/bg/title.mp4` とは用途が異なります。

## おまけの隕石動画

`bonus-meteor.mp4` はユーザー指定の [隕石衝突動画](https://www.youtube.com/watch?v=MRNLgJSQKMQ) を取得し、H.264 / AACを再エンコードせずfaststart付きMP4へ再梱包したもの。0秒から全編再生する。

- 約53.15秒、424×240、約29.97fps、2,308,827バイト
- SHA-256: `7c8cf826a11baaf3093af9c1ad58e55075b4af4cc4f0c32f51dbed9c15e50f0e`
- 出典と取得情報：`bonus-meteor.source.json`
- 取得原本：素材リポジトリの `assets-src/bonus_video_20261018/`
- 再生制御：`bonus-scenario.js`。HTML5 videoで再生し、終了・スキップで会話へ復帰する。再生中のBGM/SEは停止し、動画の音量はBGM設定に従う。
