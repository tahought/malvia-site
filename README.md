# MALVIA サイト（静的サイト / GitHub Pages 用）

ヘッダーとフッターを全ページ共通にした、リンクでつながる 1 つのサイトです。

## フォルダ構成

```
site/
├── index.html              ← ホーム（ヒーロー／コンセプト／COLLECTIONS）
├── about.html              ← ABOUT（10 COMMITMENTS）
├── company.html            ← COMPANY（会社概要）
├── products/
│   ├── malibu.html         ← 商品紹介ページ（ヒーロー／スライダー／スペック）
│   ├── venice.html
│   └── rincon.html
└── assets/
    ├── css/style.css       ← 全ページ共通のCSS
    ├── js/layout.js        ← 共通ヘッダー／フッターを差し込むJS
    ├── css/product.css     ← 商品ページ専用のCSS
    ├── js/product.js       ← 商品ページのヒーロー切替＋スライダー
    └── img/                ← ヒーロー画像・ロゴ
```

## 共通パーツのしくみ

`header.html` を fetch する方法は、ローカルでファイルを直接開くと動きません。
そのため **`assets/js/layout.js` がヘッダーとフッターを書き出す方式**にしています（どの環境でも動きます）。

各ページに必要なのは次の 3 つだけです。

```html
<body data-page="home" data-root="">   <!-- data-page: home / about / company / product -->
  <header id="site-header"></header>   <!-- ここにヘッダーが入る -->
  ...
  <footer id="site-footer"></footer>   <!-- ここにフッターが入る -->
  <script src="assets/js/layout.js"></script>
</body>
```

- `data-root` … トップ階層は `""`、`products/` の中は `"../"`
- `data-page` … 現在のページ。ヘッダーメニューの現在地（金色）が自動で付きます

### メニューを増やしたいとき

`assets/js/layout.js` の先頭にある `MENU` 配列に 1 行足すだけで、
**全ページのヘッダーとフッター**にリンクが増えます。

```js
var MENU = [
  { key: 'home',    label: 'HOME',    href: root + 'index.html' },
  { key: 'about',   label: 'ABOUT',   href: root + 'about.html' },
  { key: 'company', label: 'COMPANY', href: root + 'company.html' },
  { key: 'contact', label: 'CONTACT', href: root + 'contact.html' }  // ← 追加例
];
```

新しいページを作るときは `company.html` をコピーして、`data-page` と中身を変えるのが一番簡単です。

## ローカルで確認する（VS Code / Live Server）

1. VS Code で拡張機能「Live Server」をインストール
2. `site` フォルダを VS Code で開く
3. `index.html` を右クリック →「Open with Live Server」

## GitHub Pages で公開する（ブラウザだけで完結する手順）

### 1. リポジトリを作る
1. https://github.com/new を開く
2. **Repository name** に `malvia-site` と入力
3. **Public** を選ぶ（Private だと無料プランで Pages が使えません）
4. 「Add a README file」は**チェックしない**
5. **Create repository** をクリック

### 2. ファイルをアップロードする
1. 作ったリポジトリのページで **uploading an existing file** をクリック
   （すでにファイルがある場合は **Add file → Upload files**）
2. ダウンロードした zip を解凍し、**`site` フォルダの中身をすべて**選んでドラッグ＆ドロップ
   - 正しい形： リポジトリ直下に `index.html` `about.html` `company.html` `products/` `assets/`
   - 間違い： リポジトリ直下に `site/` フォルダがある状態（URL が1階層深くなります）
   - ※ フォルダごとドラッグすれば `products/` `assets/` の中身も一緒に上がります
3. 下の **Commit changes** をクリック

### 3. Pages を有効にする
1. リポジトリの **Settings** タブ → 左メニューの **Pages**
2. **Source** を `Deploy from a branch`
3. **Branch** を `main` ／ フォルダは `/ (root)` にして **Save**
4. 1〜2分待ってページを再読み込みすると、上部に公開URLが出ます

   `https://<ユーザー名>.github.io/malvia-site/`

### 4. 直したいとき
- 小さな修正： GitHub 上でファイルを開き、鉛筆アイコン → 編集 → **Commit changes**
- まとめて差し替え： **Add file → Upload files** で同名ファイルを上げると上書きされます
- コミットから30〜60秒ほどで公開ページに反映されます（反映されないときは Ctrl/⌘ + Shift + R で再読み込み）

### うまく表示されないとき
| 症状 | 原因と対処 |
| --- | --- |
| 404 になる | `index.html` がリポジトリ直下にない。`site` フォルダごと上げていないか確認 |
| 文字だけで崩れている | `assets` フォルダが上がっていない |
| 画像が出ない | `assets/img/products/` の中身が上がっていない（ファイル名の大文字小文字も区別されます） |
| ヘッダーが出ない | `assets/js/layout.js` が上がっていない |

### 注意

- ファイル名・フォルダ名はすべて**小文字**、日本語やスペースは使わない
- リンクは `/about.html` ではなく `about.html` のような**相対パス**で書く（サブディレクトリ公開でも壊れません）

## 画像について

- 商品写真は `assets/img/products/` に入っています（リポジトリに含まれるので外部依存なし）
- ABOUT のヒーロー写真だけ Shopify の CDN を参照しています。差し替える場合は画像を
  `assets/img/` に置き、`about.html` の `https://malviafootwear.com/cdn/...` を書き換えてください

## 商品ページの色

商品ページは `<main class="pr" style="--navy:…; --accent:…">` の CSS 変数で配色を切り替えています。
色を変えたいときはこの1行だけ編集すれば、そのページ全体に反映されます。
