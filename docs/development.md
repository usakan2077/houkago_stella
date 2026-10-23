# 開発と素材管理の運用

## リポジトリの役割

本流のブランチ名は既存の `master` を使う。2026-10-11 から、ゲームと編集用元素材を別のリポジトリで管理する。

| 置き場 | 管理するもの |
| --- | --- |
| `houkago-stella/` | ゲームコード、シナリオ、公開用の `assets/`、開発文書 |
| `houkago-stella-assets/assets-src/` | 背景・立ち絵・スチルの編集用元素材、従来の制作資料 |
| `houkago-stella-voice/` | ボイス制作仕様、生成ツール、比較用音声。現時点では Git 管理外 |

素材リポジトリはゲームリポジトリの隣に配置する。素材リポジトリのリモートは未設定。リモート保存先を用意するときは非公開リポジトリを使う。

ゲーム側の `/assets-src/` は `.gitignore` で除外し、既存の追跡も解除する。以前の素材はゲームリポジトリの過去のコミットに残るため、今回の切り替えで履歴の容量は減らない。

## 作業を始める

作業ツリーが空であることを確認し、最新の本流から用途別のブランチを作る。未コミットの変更があるときは、先に現在の作業ブランチへ保存する。

```powershell
git status --short
git switch master
git pull --ff-only origin master
git switch -c feat/scenario-direction-review
```

ブランチ名は作業内容に応じて `feat/*`、`fix/*`、`docs/*` などにする。長期の `assets-dev` を次の作業に再利用しない。

## 元素材からゲームへ反映する

元素材は `houkago-stella-assets/assets-src/` で編集し、素材リポジトリでコミットする。変換済みファイルはゲーム側の `assets/` に書き出す。

```powershell
# ゲームリポジトリから実行
py tools/convert_bg.py
py tools/convert_new_bg.py
py tools/convert_title_logo.py
```

各ツールは対応する素材を実際に書き出す。元素材の配置を変える場合は、実行するシェルでディレクトリを指定する。

```powershell
$env:STELLA_ASSETS_SRC = 'E:\stella-assets\assets-src'
py tools/convert_bg.py
```

ゲームのローカルサーバーは `houkago-stella/` をルートにする。素材リポジトリは配信対象に含めない。

## 作業を統合する

必要な確認を実行し、対象のファイルを選んで作業ブランチへコミットする。シナリオ変更時は `py tools/check_scenarios_i18n.py`、ボイス制御変更時は `node --test tools/check_voice.cjs` を使う。

GitHub で PR を使う場合は **Squash and merge** を選ぶ。ローカルで統合する場合は次の手順を使う。

```powershell
git switch master
git pull --ff-only origin master
git merge --squash feat/scenario-direction-review
git diff --cached --stat
git diff --cached --check
git commit -m "Revise scenario and scene direction"
```

競合があれば解決して必要な確認を行ってからコミットする。公開用の push はリリースのタイミングで行う。

squash merge では作業ブランチのコミット自体は本流の祖先にならない。そのため `git branch -d` が拒否することがある。PR が統合済み、または本流に変更が取り込まれたことを確認してから、その作業ブランチだけを `git branch -D <作業ブランチ>` で削除する。GitHub の PR 統合後はその PR のブランチ削除機能を使ってもよい。未統合のブランチをまとめて削除しない。

同じ作業ブランチを次の開発に使い回すと、squash された変更が再び差分に現れたり競合しやすくなる。次の作業は再び最新の `master` から作る。

## 公開する変更履歴

- ゲーム内・LPの変更履歴は、1バージョンにつき3行以内（最大3項目、各項目は短い1文を基本）にまとめる。画面幅による折り返しは行数に含めない。
- 追加した機能や直した不具合が分かる具体的な表現にする。「表示・操作性を改善」のような抽象的な一文だけで済ませない。
- プレイヤーに必要な変更を優先し、制作中のやり取り・実装の詳細・開発資料の整理は載せない。詳細はCHANGELOGや対応記録に残す。
- ゲームとLPで内容を揃え、日本語・英語の両方を更新する。
- 更新履歴には、本編・おまけの具体的な台詞、ネタ、場面展開や結末を載せない。発音修正も具体的な用語を避けて記載し、詳細は開発用の対応記録に残す。CHANGELOGにも同じ方針を適用する。

## 旧運用からの切り替え

素材339ファイルを別リポジトリにコピーし、SHA-256 の一致を確認済み。コピーには未コミットだった `stills_re/sakura_blank_moment_smile.png` も含む。元の `houkago-stella/assets-src/` は切り替え時の控えとして残し、今後の編集先には使わない。

素材管理・ブランチ運用の変更を `master` に保存し、旧ローカル `assets-dev` は退役済み。途中のボイス実装は新しい `feat/voice-implementation` に保存し、本流にはまだ統合しない。シナリオ・演出の見直しとボイス化の続きをこの開発ブランチで進め、公開可能な状態になった変更だけを本流へ統合する。ゲーム側の `assets-src` をマージのたびに削除する手順は廃止する。

切り替え後は次を確認する。

```powershell
git ls-files assets-src
# 出力が空ならゲーム側での追跡解除が完了
git check-ignore assets-src/README.md
# assets-src/README.md が表示されれば除外設定が有効
```

古い履歴の表示が複雑な場合は、本流の履歴を `git log --first-parent --oneline master` で確認できる。新しい squash merge の運用は今後の履歴を整理するもので、既存のマージ履歴はそのまま残る。
