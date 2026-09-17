# MALVIA サイト（静的サイト / GitHub Pages 用）

ヘッダーとフッターを全ページ共通にした、リンクでつながる 1 つのサイトです。

## フォルダ構成

```
site/
├── index.html              ← ホーム（ヒーロー／コンセプト／COLLECTIONS）
├── about.html              ← ABOUT（Moccasin / Material / Sole / Made in Japan）
├── company.html            ← COMPANY（会社概要）
├── products/
│   ├── malibu.html         ← 商品紹介ページ（ヒーロー／スライダー／スペック）
│   ├── venice.html
│   └── rincon.html
├── .nojekyll               ← GitHub Pages 用（消さないでください）
└── assets/
    ├── css/style.css       ← 全ページ共通のCSS
    ├── css/product.css     ← 商品ページ専用のCSS
    ├── js/layout.js        ← 共通ヘッダー／フッターを差し込むJS
    ├── js/product.js       ← 商品ページのヒーロー切替＋スライダー
    ├── img/                ← ヒーロー・ロゴ・COMPANY用の写真
    └── img/products/       ← 商品写真（malibu / venice / rincon 各9点）
```

## 共通パーツのしくみ（重要）

ヘッダーとフッターは **`assets/js/layout.js` が自動で差し込みます**。
ページ側に必要なのは、`</body>` の直前の **この1行だけ**です。

```html
<script src="assets/js/layout.js"></script>      <!-- トップ階層のページ -->
<script src="../assets/js/layout.js"></script>   <!-- products/ の中のページ -->
```

この1行があれば、

- ヘッダー／フッターの置き場所（`<header id="site-header">` など）が無くても**自動で作ります**
- 共通CSS（`style.css` / 商品ページは `product.css`）も**自動で読み込みます**
- 今どのページか（メニューの金色ハイライト）も**自動で判定します**

### 別で作ったHTMLに差し替えるとき

**やることは1つだけ。`</body>` の直前に上の1行を貼る。**

```html
  ...ページの中身...
  <script src="../assets/js/layout.js"></script>   <!-- ← これを足す -->
</body>
</html>
```

これを忘れるとヘッダーとフッターが消えます（前回消えたのはこれが原因です）。
逆に、この1行さえあれば中身をまるごと書き換えても大丈夫です。

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

新しいページを作るときは `company.html` をコピーして、中身を変えるのが一番簡単です。

---

## プレビューの確認方法（プッシュは不要です）

**結論：見た目の確認にプッシュは要りません。プッシュは「世界に公開するとき」だけ。**

| やりたいこと | 方法 | 反映まで |
| --- | --- | --- |
| 自分で確認したい | ローカルの Live Server | 保存した瞬間 |
| 公開ページを更新したい | GitHub にアップロード（コミット） | 30〜60秒 |

### 方法A：Live Server（いちばん速い・おすすめ）

1. VS Code に拡張機能 **Live Server** をインストール
2. VS Code で **`site` フォルダを開く**（ファイル → フォルダーを開く）
3. `index.html` を右クリック → **Open with Live Server**
4. ブラウザが開きます。以降は **ファイルを保存するだけで自動リロード**

商品ページを直すときは `products/malibu.html` を編集して保存 → ブラウザが勝手に更新されます。
何度でも試して、納得できたらまとめてアップロードすればOKです。

> ※ HTMLファイルをダブルクリックして開く（`file://`）方法でも一応見られますが、
> Live Server のほうが公開後の状態に近いので、こちらを使ってください。

### 方法B：GitHub 上で直接編集してプレビュー

PCを使えないときはこちら。

1. GitHub でファイルを開く → 鉛筆アイコン
2. **Preview** タブで大まかな確認（※CSSは効かないので文章チェック向け）
3. **Commit changes** → 30〜60秒後に公開ページへ反映

### 更新の流れ（ふだんの作業）

```
ローカルで編集 → 保存 → Live Server で確認 → OKなら GitHub にアップロード → 公開
```

公開ページが変わらないときは **Ctrl/⌘ + Shift + R** で強制再読み込み。
それでも古いままなら、リポジトリの **Actions** タブでデプロイが終わっているか確認してください。

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
| ヘッダーが出ない | ページに `<script src="…/assets/js/layout.js"></script>` が無い、または `assets/js/layout.js` が上がっていない |
| 商品ページの画像が動かない | `<script src="../assets/js/product.js"></script>` が無い |

### 注意

- ファイル名・フォルダ名はすべて**小文字**、日本語やスペースは使わない
- リンクは `/about.html` ではなく `about.html` のような**相対パス**で書く（サブディレクトリ公開でも壊れません）

---

## どこを直せば何が変わるか（編集ガイド）

| 直したいもの | ファイル | 探す目印 |
| --- | --- | --- |
| ヘッダー／フッターのメニュー | `assets/js/layout.js` | `var MENU = [` |
| フッターの紹介文・Instagram | `assets/js/layout.js` | `TAGLINE` / `INSTAGRAM` |
| ホームのキャッチコピー | `index.html` | `class="hero__msg"` |
| ホームのコンセプト文 | `index.html` | `class="concept__body"` |
| ホームの商品カード（名前・説明・リンク先） | `index.html` | `class="card"` |
| ABOUT の4項目 | `about.html` | `01` 〜 `04` の `MALVIA STANDARD` |
| ABOUT の写真枠（現在は空） | `about.html` | `background:#F4EDE1` の `<div>` |
| 会社概要の表 | `company.html` | `<dl` の中の `<dt>` / `<dd>` |
| 商品名・キャッチ | `products/◯◯.html` | `class="pr-hero__t"` / `pr-hero__lead` |
| 商品の仕様表（Upper / Sole / Size / Price） | `products/◯◯.html` | `class="pr-spec"` |
| 商品ページの配色 | `products/◯◯.html` | `<main class="pr" style="--navy:…">` の1行 |
| 全ページ共通の見た目 | `assets/css/style.css` | 先頭の `:root{ }` に色をまとめてあります |
| 商品ページの見た目 | `assets/css/product.css` | — |

### 画像を差し替える

1. 新しい画像を `assets/img/products/` に入れる（ファイル名は半角英数、小文字）
2. HTML内の `../assets/img/products/malibu-03.webp` の部分を新しいファイル名に書き換える

写真の枚数を変えたときは、同じHTML内の `data-count="5"` の数字と、
`pr-gal__dot` ボタンの数も合わせてください（5枚→5個）。

## 外部依存はありません

このサイトは **同梱のファイルだけで動きます**。
外部のCDN・Webフォント・Shopifyの画像などは一切読み込んでいません。
インターネットに繋がっていないPCでも、そのまま表示できます。

## 商品ページの色

商品ページは `<main class="pr" style="--navy:…; --accent:…">` の CSS 変数で配色を切り替えています。
色を変えたいときはこの1行だけ編集すれば、そのページ全体に反映されます。
