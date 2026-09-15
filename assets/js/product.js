/* ============================================================
   MALVIA — 商品紹介ページの動き
   ・ヒーロー写真のクロスフェード（[data-hero] の中の .pr-hero__layer）
   ・写真スライダー（[data-gallery]：自動送り／←→／ドット）
   ============================================================ */
(function () {

  /* ---------- ヒーローのクロスフェード ---------- */
  var hero = document.querySelector('[data-hero]');
  if (hero) {
    var layers = hero.querySelectorAll('.pr-hero__layer');
    if (layers.length > 1) {
      var hi = 0;
      layers[0].classList.add('is-on');
      setInterval(function () {
        layers[hi].classList.remove('is-on');
        hi = (hi + 1) % layers.length;
        layers[hi].classList.add('is-on');
      }, 5600);
    } else if (layers.length === 1) {
      layers[0].classList.add('is-on');
    }
  }

  /* ---------- 写真スライダー ---------- */
  var gal = document.querySelector('[data-gallery]');
  if (!gal) return;

  var track = gal.querySelector('.pr-gal__track');
  var dots = gal.querySelectorAll('.pr-gal__dot');
  var COUNT = Number(gal.getAttribute('data-count') || 5);      // 実際の写真枚数
  var AUTO = Number(gal.getAttribute('data-auto') || 0);        // 自動送りの間隔(ms)。0で停止
  var STEP = 14.2857;                                           // 1コマの幅（トラック比）
  var shot = 0;
  var timer = null, snapTimer = null;

  function paint() {
    track.style.transform = 'translateX(-' + (shot * STEP).toFixed(4) + '%)';
    var active = shot % COUNT;
    dots.forEach(function (d, i) { d.classList.toggle('is-on', i === active); });
  }

  function advance() {
    clearTimeout(snapTimer);
    track.classList.remove('is-snap');
    shot += 1;
    paint();
    if (shot >= COUNT) {
      // 複製したコマへ進んだので、アニメーションなしで先頭に戻す
      snapTimer = setTimeout(function () {
        track.classList.add('is-snap');
        shot = 0;
        paint();
      }, 960);
    }
  }

  function goTo(i) {
    clearTimeout(snapTimer);
    clearInterval(timer);
    timer = null;
    track.classList.remove('is-snap');
    shot = ((i % COUNT) + COUNT) % COUNT;
    paint();
  }

  gal.addEventListener('click', function (e) {
    if (e.target.closest('[data-next]')) { goTo((shot % COUNT) + 1); return; }
    if (e.target.closest('[data-prev]')) { goTo((shot % COUNT) - 1); return; }
    var dot = e.target.closest('.pr-gal__dot');
    if (dot) goTo(Number(dot.getAttribute('data-go')));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goTo((shot % COUNT) + 1);
    else if (e.key === 'ArrowLeft') goTo((shot % COUNT) - 1);
  });

  paint();
  if (AUTO > 0) timer = setInterval(advance, AUTO);
})();
