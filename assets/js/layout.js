/* ============================================================
   MALVIA — 共通ヘッダー / フッター（全ページ共通）

   使い方：どのHTMLでも、</body> の直前にこの1行を書くだけ。

     <script src="../assets/js/layout.js"></script>     ← products/ の中
     <script src="assets/js/layout.js"></script>        ← トップ階層

   ・ヘッダーとフッターの置き場所（#site-header / #site-footer）が無くても、
     自動で <body> の先頭と末尾に作ります。
   ・共通CSSも自動で読み込みます（<link> を書き忘れても崩れません）。
   ・今どのページか、階層の深さも自動で判定します。

   → 新しいHTMLに差し替えるときも、この1行さえ残っていれば
     ヘッダーとフッターは消えません。
   ============================================================ */
(function () {

  /* ---------- 1. このスクリプトの場所からサイトのルートを求める ---------- */
  var self = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();
  var root = self.src.replace(/assets\/js\/layout\.js.*$/, '');   // 例 https://…/malvia-site/

  /* ---------- 2. 今どのページかを自動判定 ---------- */
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var inProducts = /\/products\//.test(location.pathname);
  var page =
    inProducts ? 'product' :
    (file === '' || file === 'index.html') ? 'home' :
    file === 'about.html' ? 'about' :
    file === 'company.html' ? 'company' : 'product';
  document.body.setAttribute('data-page', page);

  /* ---------- 3. 共通CSSを自動で読み込む（書き忘れ対策） ---------- */
  function needCss(path) {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if ((links[i].getAttribute('href') || '').indexOf(path) !== -1) return false;
    }
    return true;
  }
  function addCss(path) {
    if (!needCss(path)) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = root + path;
    document.head.insertBefore(l, document.head.firstChild);   // ページ独自のCSSを邪魔しない
  }
  addCss('assets/css/style.css');
  if (page === 'product') addCss('assets/css/product.css');

  /* ============================================================
     4. メニュー定義 — ここを直せば全ページのヘッダー／フッターが変わります
     ============================================================ */
  var MENU = [
    { key: 'home',    label: 'HOME',    href: root + 'index.html' },
    { key: 'about',   label: 'ABOUT',   href: root + 'about.html' },
    { key: 'company', label: 'COMPANY', href: root + 'company.html' }
  ];

  var PRODUCTS = [
    { label: 'MALIBU', href: root + 'products/malibu.html' },
    { label: 'VENICE', href: root + 'products/venice.html' },
    { label: 'RINCON', href: root + 'products/rincon.html' }
  ];

  var INSTAGRAM = 'https://www.instagram.com/malviafootwearjapan/';
  var TAGLINE = 'Crafting timeless elegance through innovative design and uncompromising quality.';
  /* ========================================================== */

  function navLinks(cls) {
    return MENU.map(function (m) {
      var active = m.key === page ? ' is-active' : '';
      return '<a class="' + cls + active + '" href="' + m.href + '">' + m.label + '</a>';
    }).join('');
  }

  var headerHtml = ''
    + '<div class="hd__in">'
    +   '<a class="hd__logo" href="' + root + 'index.html">MALVIA</a>'
    +   '<nav class="hd__nav" aria-label="メインメニュー">' + navLinks('hd__link') + '</nav>'
    + '</div>';

  var footerHtml = ''
    + '<div>'
    +   '<div class="ft__brand">MALVIA</div>'
    +   '<p class="ft__about">' + TAGLINE + '</p>'
    +   '<a class="ft__ig" href="' + INSTAGRAM + '" target="_blank" rel="noopener">'
    +     '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>'
    +     'INSTAGRAM'
    +   '</a>'
    + '</div>'
    + '<div class="ft__col">'
    +   '<div class="ft__label">EXPLORE</div>'
    +   navLinks('')
    + '</div>'
    + '<div class="ft__col">'
    +   '<div class="ft__label">COLLECTION</div>'
    +   PRODUCTS.map(function (p) { return '<a href="' + p.href + '">' + p.label + '</a>'; }).join('')
    + '</div>';

  /* ---------- 5. 置き場所が無ければ自分で作って差し込む ---------- */
  var h = document.getElementById('site-header');
  if (!h) {
    h = document.createElement('header');
    h.id = 'site-header';
    document.body.insertBefore(h, document.body.firstChild);
  }
  h.className = 'hd';
  h.innerHTML = headerHtml;

  var f = document.getElementById('site-footer');
  if (!f) {
    f = document.createElement('footer');
    f.id = 'site-footer';
    document.body.appendChild(f);
  }
  f.className = 'ft';
  f.innerHTML = footerHtml;

  /* ---------- 6. スクロールでふわっと表示（.reveal が付いた要素） ---------- */
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  Array.prototype.forEach.call(targets, function (el, i) {
    el.style.transitionDelay = ((i % 4) * 0.08) + 's';
    io.observe(el);
  });
})();
