/* ============================================================
   MALVIA — 共通ヘッダー / フッターの読み込み
   各ページの <body> に data-page と data-root を書いておくだけで、
   このファイルがヘッダーとフッターを自動で差し込みます。
     data-page : 現在のページ名（home / about / company / product）
     data-root : サイトのトップまでの相対パス（トップ階層は "" 、products/ の中は "../"）
   ============================================================ */
(function () {
  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var page = body.getAttribute('data-page') || '';

  // ---- メニュー定義（ここを増やせば全ページのメニューが増えます） ----
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

  function navLinks(cls) {
    return MENU.map(function (m) {
      var active = m.key === page ? ' is-active' : '';
      return '<a class="' + cls + active + '" href="' + m.href + '">' + m.label + '</a>';
    }).join('');
  }

  // ---- ヘッダー ----
  var header = ''
    + '<div class="hd__in">'
    +   '<a class="hd__logo" href="' + root + 'index.html">MALVIA</a>'
    +   '<nav class="hd__nav" aria-label="メインメニュー">' + navLinks('hd__link') + '</nav>'
    + '</div>';

  // ---- フッター ----
  var footer = ''
    + '<div>'
    +   '<div class="ft__brand">MALVIA</div>'
    +   '<p class="ft__about">Crafting timeless elegance through innovative design and uncompromising quality.</p>'
    +   '<a class="ft__ig" href="https://www.instagram.com/malviafootwearjapan/" target="_blank" rel="noopener">'
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

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) { h.className = 'hd'; h.innerHTML = header; }
  if (f) { f.className = 'ft'; f.innerHTML = footer; }

  // ---- スクロールで要素をふわっと表示 ----
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (el, i) {
    el.style.transitionDelay = ((i % 4) * 0.08) + 's';
    io.observe(el);
  });
})();
