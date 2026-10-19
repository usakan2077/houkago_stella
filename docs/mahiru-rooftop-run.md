# まひるを見つけて屋上へ走る演出

`mahiru_ch10_start` で屋上にまひるを見つけ、既存の選択肢から「走る」を選んだ先の `mahiru_ch10_run` を強化した。日本語・英語で同じ順序になる。

確認はタイトルのDEBUGから「まひる Ch10 — 屋上を発見」または「まひる Ch10 — 屋上へ走る演出」を選ぶ。F2はフラグモニター用で、ジャンプメニューはタイトルのDEBUGボタン。

1. 校舎外観：走り出し、心音と足音。
2. 夜の玄関・靴箱：上履きに替えず通り抜ける。
3. 夜の階段：踊り場で腕をぶつけ、父と慎の記憶が重なる。
4. 階段を駆け上がる勇の背中：OP原画の夜差分。
5. 閉じた屋上扉：最後の段を上がって肩が当たる。
6. 手で扉を開ける：OP原画の夜差分を700ms表示して自動で屋上へ。
7. 屋上：走る音とカメラの動きを止め、風音とまひるのCGへつなぐ。

`@scene <背景> rush` は背景だけを820msで前進・上下動させる。文字と操作ボタンは動かさない。次の背景・リセットでアニメーションをキャンセルし、スキップとOSの動きを減らす設定では動かさない。

靴箱の描写が階段背景で表示されていた箇所を整理した。階段の踊り場の文は新しい地の文ID `.landing` に置き、玄関の続きには「靴箱の向こうに、階段が見えた。」を入れた。旧IDを削除・改名せず、会話の音声と分岐は維持した。

ゲーム画像：`assets/images/bg/` の `school_entrance_shoebox_night.webp`、`mahiru_run_stairs_night.webp`、`rooftop_door_closed_night.webp`、`rooftop_door_open_night.webp`。

PNG原本とプロンプトは隣接素材リポジトリの [素材案内](../../houkago-stella-assets/assets-src/mahiru_rooftop_rush_20261019/README.md)。内蔵 image_gen で新規生成・編集し、Pillowで1920×1080のWebPに書き出した。OP動画・原画は変更していない。

走る足音は既存 `assets/audio/se/footsteps.mp3` から `atempo=1.6` と冒頭8msのフェードを適用して作成した `running_school.mp3`。音声APIは使用していない。

検証：`python tools/check_scenarios_i18n.py` と `python tools/check_report11.py --mahiru-run-only`。後者は日英の背景順序、扉の自動切り替え、到着時の音・動きの終了、スキップ・動きを減らす設定・リセットを実際のブラウザーで確認する。記録・画面は `../stella-debug-report11-20261019/verification/`。
