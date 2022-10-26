---
title: 開発の手引き
author:
  - name: xiupos
    url: https://twitter.com/xiupos
---

# {{ $frontmatter.title }}

言サHPの開発に興味を持っていただき，ありがとうございます．
開発に必要な知識と手順について，
最低限がてきとーに書いてありますので，
参考になれば嬉しいです．

## 前提知識

TODO

## 簡易的な編集

TODO

## 環境構築

開発に必要な道具をインストールします．
公平性のため複数種類挙げてますが，
よくわからなかったら1番目のやつをいれとけば大丈夫です．

::: warning
筆者はWindowsもmacOSも使っていないため，
これらのOSに関する情報は全て未検証です．
有識者の加筆訂正をお待ちしております．
:::

### CLI環境とGit

言サHPは[Git](https://git-scm.com/)を用いて管理されているので，
開発に参加するにはGitをインストールする必要があります．

::: details Windows

いくつか選択肢がありますが，
今は惰性でなんとかなると思います．
困ったら[先生に質問](https://www.google.com/search?q=windows+git+%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)してください．

#### 1. winget を使う場合

[winget (公式サイト)](https://docs.microsoft.com/en-us/windows/package-manager/winget/)

[Microsoft Store](https://www.microsoft.com/p/app-installer/9nblggh4nns1)でwingetをインストールしてください．
以下，**Windowsターミナル** やコマンドプロンプトなどで作業を行います．

```powershell
# gitのインストール
winget install -e --id Git.Git
```

#### 2. 公式の手順にしたがう場合

[公式サイト](https://git-scm.com/download/win)から **64-bit Git for Windows Setup** をダウンロードして起動，
エディタは自分が使っているものを選択して `Next` を連打してください．

以下，**Git Bash** で作業を行います．

#### 3. WSL を使う場合

[Windows Subsystem for Linux (公式サイト)](https://docs.microsoft.com/en-us/windows/wsl/)

[公式ドキュメント](https://docs.microsoft.com/ja-jp/windows/wsl/install)にしたがってWSLをインストールし，
インストールしたディストリビューションごとの方法にしたがってgitをインストールしてください．規定ではUbuntuがインストールされますが，
ディストリビューションを変更することもできます．
このドキュメントではUbuntu/Debian，Arch Linuxでのインストール方法を紹介していますので，
これらも参考にしてください．

以下，**Windowsターミナル** などで作業を行います．

:::

::: details macOS

いくつか選択肢がありますが，
今は惰性でなんとかなると思います．
困ったら[先生に質問](https://www.google.com/search?q=macos+git+%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)してください．

#### 1. Homebrew から導入する場合

[Homebrew (公式サイト)](https://brew.sh/)

以下，**ターミナル** で作業を行います．

```bash
# Homebrewのインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# gitのインストール
brew install git
```

#### 2. App Store から導入する場合

[App Store](https://apps.apple.com/us/app/xcode/id497799835)
で **Xcode** をインストールすればgitが付属しています．
以下，**ターミナル** で作業を行います．

:::

::: details Ubuntu/Debian

普通にいれます．

```bash
sudo apt install git
```

:::

::: details Arch Linux

普通にいれます．

```bash
sudo pacman -S git
```

:::

### GitHubアカウントの作成

[GitHub (公式サイト)](https://github.com/)

言サHPのリポジトリ [hulinguistics/huling](https://github.com/hulinguistics/huling) はGitHubにあります．
開発に参加するにはGitHubアカウントの作成が必要ですので，
思想に関わらず登録をお願いします．
登録手順などは[公式ドキュメント](https://docs.github.com/get-started/quickstart/hello-world)を参考にしてください．

アカウントを作成したら手元のgitにユーザー名とメールアドレスを登録します．

```bash
git config --global user.name "YourName"
git config --global user.email "your_email@example.com"
```

### 公開鍵の生成

手元のgitからGitHubにアクセスするためには公開鍵の登録が必要です．

#### 1. Ed25519 を使う場合

```bash
# 鍵の作成
# 指示にしたがってpassを登録してください
ssh-keygen -t ed25519 -C "your_email@example.com"

# 公開鍵の表示
# Windowsの場合はHomeにある.ssh/id_ed25519.pubをエクスプローラーから直接開くのが無難です
# 表示された公開鍵をコピーしてください
cat ~/.ssh/id_ed25519.pub
```

::: details 2. RSA-4096 を使う場合

```bash
# 鍵の作成
# 指示にしたがってpassを登録してください
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 公開鍵の表示
# Windowsの場合はHomeにある.ssh/id_rsa.pubをエクスプローラーから直接開くのが無難です
# 表示された公開鍵をコピーしてください
cat ~/.ssh/id_rsa.pub
```

:::

### 公開鍵をGitHubに登録

GitHubにログインしてメニューから
**Settings** → **SSH and GPG keys** → **New SSH key**
でTitleは適当に(PCの名前とか)付け，
Keyに先程コピーした公開鍵を貼り付けて **Add SSH key** を押してください．

正常に登録できたか確認する際は以下を実行してください．

```bash
ssh git@github.com
# passを入力後，ユーザー名が表示されれば成功
```

### Node.jsのバージョン管理ツール

言サHPは[vuepress](https://vuepress.vuejs.org/)で作られているので，
これを実行するためにはnodejsが必要です．

nodejsは直接インストールすることも可能ですが，
バージョン違いによる不具合が多いため，
バージョン管理ツールを用いる必要があります．

::: tip
hulinguistics/huling はVoltaの使用を前提として開発しております．
特段理由が無い場合はVoltaを用いることをお勧めします．
以下，Voltaの利用を前提に解説します．
:::

#### 1. Volta を使う場合(強く推奨)

[Volta (公式サイト)](https://volta.sh/)

Unix(macOS, Ubuntu/Debian, Arch Linuxなど)の場合は以下を実行してください．

```bash
curl https://get.volta.sh | bash

# Arch Linuxの場合はAURのvolta-binも利用できます(自己責任)
yay -S volta-bin
```

Windowsの場合は[公式ドキュメント](https://docs.volta.sh/guide/getting-started)を参考にインストールしてください．

::: details 2. その他の選択肢

- [nvm](https://github.com/nvm-sh/nvm) (mac/linux)
- [n](https://github.com/tj/n) (win/mac/linux)
- [nodenv](https://github.com/nodenv/nodenv) (mac/linux)
- [fnm](https://github.com/Schniz/fnm) (win/mac/linux)

他にもバージョン管理ツールがあります．
これらを利用する場合は，
[package.json](https://github.com/hulinguistics/huling/blob/dev/package.json)を確認し，
適切なバージョンのnodeとyarnをインストールしてください．

:::

### エディタ(任意)

書ければなんでもいいです．
好きなエディタを使ってください．

#### 1. VSCode を使う場合

[Visual Studio Code (公式サイト)](https://code.visualstudio.com/)

インストール方法は[公式ドキュメント](https://code.visualstudio.com/docs/setup/setup-overview)を読んでください．
使い方も載っています．
OSSの[Codium](https://vscodium.com/)という選択肢もあります．

::: tip
生協の書店にvscodeに関連する書籍が平積みされていました．
こういった本に課金するのもアリとは思いますが，
公式ドキュメントをはじめ，
様々な情報がネットだけで手に入ります．
まずは[先生に相談してください](https://www.google.com/search?q=vscode+%E4%BD%BF%E3%81%84%E6%96%B9)．
:::

#### 2. Atom を使う場合

[Atom (公式サイト)](https://atom.io/)

インストール方法は[公式ドキュメント](https://flight-manual.atom.io/getting-started/sections/installing-atom/)を読んでください．
使い方も載っています．

::: warning
Atomは開発終了が発表されています．
2022年12月15日にすべてのプロジェクトがアーカイブされる予定ですので，
注意してください．
:::

#### 3. Sublime Text を使う場合

[Sublime Text (公式サイト)](https://www.sublimetext.com/)

拡張機能が豊富で広く使われていた．

#### 4. Vim/Emacsなどその他

エディタの選択は個人の自由です．

## 手順

### リポジトリをFork

開発するために，
GitHubでリポジトリをForkします．
[hulinguistics/huling](https://github.com/hulinguistics/huling)
にアクセスし，
[Fork](https://github.com/hulinguistics/huling/fork)
を押して
**Create fork** を押します．

### ローカルにclone

フォークしましたら，リポジトリをローカルにcloneします．

```bash
# usernameを自分のユーザー名に書き換える
git clone git@github.com:username/huling.git
# passを入力後hulingディレクトリができる
```

クローンされたものをエディタで確認してみましょう．

::: tip
vscode を使っている場合，
**File** → **Open Folder...** でクローンしたhulingディレクトリを選択すると，
EXPLOREにファイルツリーが表示されます．
atom も同様の機能があるかもしれません．
よく知りません．
:::

### ビルドしてみる

試しにビルドしてみましょう．
hulingディレクトリを端末で開きます．
`yarn dev` でローカルサーバーが立てられ，
リアルタイムで確認しながら編集することができます．

```bash
yarn install
yarn dev
```

ブラウザで
`http://localhost:3001/`
にアクセスすると言サHPが表示されるはずです．

実際に最終生成物を確認したい場合は，

```bash
yarn build
```

で `src/.vuepress/dist` が生成されます．

::: warning
Voltaを使用している場合は `yarn` を実行するだけで，
自動でnodejsとyarnがインストールされます．
その他のバージョン管理ツールを使用している場合は，
`package.json` を確認して，
適切なバージョンのnodeとyarnをインストールしてください．
:::

### Issuesで取り組む内容を選ぶ

[Issues · hulinguistics/huling](https://github.com/hulinguistics/huling/issues)

Issuesには言サHPに関係したタスクが積まれています．
この中から自分にできそうなものを探しましょう．
やりたいものが無い場合は，
自分でIssueを作成するのもアリです．
Issueを作成するだけで自分で直さないのもアリです．

::: tip Issue選びのヒント
Issueにはタグを付けています．

| タグ | 意味 |
| :-: | :-- |
| ✍article | あたらしい記事や内容の修正について |
| 🎨design | デザインについて |
| 💻feature | ソースの構造や新機能について |

これらのタグも参考にして，
自分にできそうなものを探してみてください．
:::

### ブランチを切る

Issueを選んだら，
開発するためのブランチを切ります．

あなたのリポジトリのページから，
**branch** → **New branch**
で適当なブランチ名を付けます．

- `3-deploy`
- `18-開発ドキュメントの整備`

など，`(issue番号)-(issueタイトルなど)`にすると良いです．
`(タグ)/(issue番号)-(issueタイトルなど)`
でも良いと思います．
本音ではこっちに統一したいですね．

ブランチを切ったらローカルリポジトリでブランチを切り替えます．

```bash
# n-branch_nameをブランチ名に書き換える
git fetch origin
git checkout n-branch_name
```

### 編集

コード編集や執筆をします．

一つの修正が終わったり，
記事を一つ書き終えたときには，
こまめに編集内容をcommitします．

```bash
git add .
git commit -m "なにをどうしたかコメント"
```

### リモートにpush

編集が一段落したら，
リモートリポジトリにpushします．

```bash
# n-branch_nameをブランチ名に書き換える
git push -u origin n-branch_name

# 2度目以降は以下のみでも可
git push
```

### Pull requestsを投げる

[Pull requests · hulinguistics/huling](https://github.com/hulinguistics/huling/pulls)

編集を終えたら，
hulinguistics/huling にPRを投げます．
これは，
あなたの編集を言サHPにmergeしてほしいという要請です．
他の人の確認が行われた後，
問題が無ければmergeされて作業終了となります．

おつかれさまでした．

## 逆引きリファレンス

TODO
