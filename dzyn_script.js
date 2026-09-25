// ===== LANGUAGE SWITCH (UZ / RU) =====
const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = 'uz';
try { currentLang = localStorage.getItem('dzyn-lang') || 'uz'; } catch (e) {}

function setLang(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-uz]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text != null) el.innerHTML = text;
  });
  langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  // The tab carries the brand on its own — a suffix got truncated into view
  // instead of the name.
  document.title = 'DZYN';
  try { localStorage.setItem('dzyn-lang', lang); } catch (e) {}
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// ===== HERO LIVE CLOCK (Tashkent) =====
const heroTimeEl = document.getElementById('heroTime');
if (heroTimeEl) {
  const updateHeroTime = () => {
    heroTimeEl.textContent = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tashkent',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date()) + ' (GMT+5)';
  };
  updateHeroTime();
  setInterval(updateHeroTime, 1000);
}

setLang(currentLang);

// ===== HEADER SCROLL STATE =====
const header = document.getElementById('header');
const progressBar = document.getElementById('progressBar');

function onScroll(){
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 40);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// ===== HERO SCROLLYTELLING (sticky pin: 3D rotates + captions appear one-by-one) =====
const heroSection = document.querySelector('.hero');
const heroPin = document.getElementById('heroPin');
const heroStages = Array.from(document.querySelectorAll('.hero-stage'));

function updateHeroProgress(){
  if (!heroSection || !heroPin) return;
  const pinHeight = heroPin.offsetHeight || window.innerHeight;
  const scrollDistance = heroSection.offsetHeight - pinHeight;
  const rect = heroSection.getBoundingClientRect();
  const scrolledIntoHero = -rect.top;
  const progress = scrollDistance > 0
    ? Math.min(Math.max(scrolledIntoHero / scrollDistance, 0), 1)
    : 0;

  window.__heroProgress = progress;

  // Ease the hero out as it hands the screen over, without ever going fully blank.
  const tail = progress <= 0.8 ? 0 : (progress - 0.8) / 0.2;
  heroPin.style.opacity = 1 - tail * 0.45;
  heroPin.style.transform = `scale(${1 - tail * 0.06})`;

  // Reveal one stage caption at a time as the user scrolls through the pin.
  const stageCount = heroStages.length;
  if (stageCount) {
    const activeIndex = Math.min(stageCount - 1, Math.floor(progress * stageCount * 1.15));
    heroStages.forEach((el, i) => el.classList.toggle('active', i === activeIndex && progress > 0.02 && progress < 0.97));
  }
}
window.addEventListener('scroll', updateHeroProgress, { passive:true });
window.addEventListener('resize', updateHeroProgress);
updateHeroProgress();

// ===== PORTFOLIO DEPTH TUNNEL =====
// cosmos.studio places each case at a fixed point in 3D space and moves the
// camera forward as you scroll: a project appears as a speck at the vanishing
// point, grows along a true perspective curve (w = K / depth), then passes by.
// Same idea here — one world position per project, one shared camera.
const WORK_PERSPECTIVE = 1000;   // matches the CSS `perspective` on the stage
// The tunnel is a loop: a work that sweeps past the lens re-enters at the far
// end, so the constellation is never half empty — cosmos keeps a full field of
// works on screen the whole way through.
const WORK_NEAR = 940;                 // depth at which a work has swept past
const WORK_SPACING = 780;              // gap between consecutive works
const WORK_Z0 = -240;                  // depth of the nearest work at rest
// The loop always holds one slot more than there are works. That spare slot is
// what keeps the near zone empty when the section opens, so nothing is caught
// mid-sweep and clipped by the screen edge before the visitor has scrolled.
// Both are recomputed in buildWorkTunnel(), because the admin panel can add or
// remove works at any time — a fixed span would stack two of them on one spot.
let workSpan = 0;
let workCamTravel = 0;
// The section opens on the heading alone; the works fade up out of the depth
// field, and only then does the camera start flying.
const WORK_TEXT_HOLD = 0.05;   // heading has the screen to itself
const WORK_ENTER = 0.09;       // works fade up over this stretch
const WORK_INTRO = WORK_TEXT_HOLD + WORK_ENTER;
// Two layouts, because the exit route depends on the shape of the screen.
// Landscape: a work is pushed far enough sideways that it leaves through the
// left or right edge before it wraps, so the loop point is never visible.
const WORK_REF_LANDSCAPE = { w: 1440, h: 900 };
const WORK_REF_PORTRAIT  = { w: 390,  h: 844 };
// Depth comes from the list position, so these carry only the sightline and the
// frame size. Twelve slots, because a repeat puts two works on one sightline.
const WORK_TUNNEL = [
  { x: -520, y: -110, w: 620, ar: 0.72 },
  { x:  540, y:  140, w: 560, ar: 1.05 },
  { x: -500, y:  180, w: 600, ar: 0.68 },
  { x:  520, y: -190, w: 560, ar: 0.75 },
  { x: -560, y:  -40, w: 610, ar: 0.66 },
  { x:  530, y:  200, w: 540, ar: 0.80 },
  { x: -510, y: -200, w: 580, ar: 1.02 },
  { x:  545, y:   60, w: 600, ar: 0.72 },
  { x: -535, y:  125, w: 570, ar: 0.78 },
  { x:  515, y: -145, w: 630, ar: 0.70 },
  { x: -495, y:  -75, w: 545, ar: 0.95 },
  { x:  565, y:  185, w: 590, ar: 0.74 }
];

// Portrait: a phone has no width to spare, so a work leaves through the top or
// the bottom instead. Same depth ladder, rotated a quarter turn.
const WORK_TUNNEL_PORTRAIT = [
  { x: -70, y: -250, w: 280, ar: 0.72 },
  { x:  80, y:  260, w: 260, ar: 1.05 },
  { x: -60, y: -270, w: 275, ar: 0.68 },
  { x:  75, y:  255, w: 260, ar: 0.75 },
  { x: -80, y: -260, w: 285, ar: 0.66 },
  { x:  65, y:  265, w: 255, ar: 0.80 },
  { x: -75, y: -255, w: 270, ar: 1.02 },
  { x:  70, y:  250, w: 275, ar: 0.72 },
  { x: -55, y: -285, w: 265, ar: 0.78 },
  { x:  88, y:  240, w: 290, ar: 0.70 },
  { x: -85, y: -235, w: 270, ar: 0.95 },
  { x:  58, y:  280, w: 265, ar: 0.74 }
];

function workLayout(){
  return window.innerWidth < window.innerHeight
    ? { table: WORK_TUNNEL_PORTRAIT, ref: WORK_REF_PORTRAIT }
    : { table: WORK_TUNNEL, ref: WORK_REF_LANDSCAPE };
}

let workTunnel = [];
let workTunnelCleared = false;

let workLayoutIsPortrait = null;

function buildWorkTunnel(){
  const { table } = workLayout();
  workLayoutIsPortrait = window.innerWidth < window.innerHeight;
  const cards = [...document.querySelectorAll('#workGrid .work-card')];

  // One spare slot beyond the works themselves, whatever the count.
  workSpan = (cards.length + 1) * WORK_SPACING;
  workCamTravel = workSpan;

  workTunnel = cards.map((el, i) => {
    const spot = table[i % table.length];
    // Past the end of the style table the placements repeat, so nudge each
    // extra lap sideways — otherwise two works would sit on the same sightline.
    const lap = Math.floor(i / table.length);
    const drift = lap === 0 ? 0 : (lap % 2 ? 1 : -1) * 260 * Math.ceil(lap / 2);
    // The frame size belongs to the layout, so it has to be re-applied whenever
    // the layout swaps — not just once when the cards are created.
    el.style.setProperty('--bw', spot.w + 'px');
    return {
      el,
      x: spot.x + (workLayoutIsPortrait ? drift * 0.25 : drift),
      y: spot.y + (workLayoutIsPortrait ? drift : drift * 0.25),
      w: spot.w,
      ar: spot.ar,
      // Depth comes from the position in the list, never from the style table,
      // so works never share a spot however many there are.
      z: WORK_Z0 - WORK_SPACING * i
    };
  });

  // A longer list needs a longer runway or the fly-through turns into a blur.
  const sec = document.querySelector('.work.scrolly');
  if (sec) sec.style.setProperty('--work-runway', (cards.length * 30) + 'vh');
}

// Rotating the device swaps which edge the works exit through.
window.addEventListener('resize', () => {
  if (!workTunnel.length) return;
  if ((window.innerWidth < window.innerHeight) !== workLayoutIsPortrait) buildWorkTunnel();
});

function clearWorkTunnel(){
  const head = document.querySelector('.work .scrolly-pin .work-head');
  if (head) { head.style.opacity = ''; head.style.transform = ''; }
  workTunnel.forEach(({ el }) => {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.zIndex = '';
  });
}

// Each layout is authored for its own reference stage; scale the composition to
// the real screen so the near card never spills off the edge.
function workScaleFactor(){
  const { ref } = workLayout();
  return Math.min(1.25, Math.max(0.35, Math.min(window.innerWidth / ref.w, window.innerHeight / ref.h)));
}

function drawWorkTunnel(progress){
  const k = workScaleFactor();
  const grid = document.getElementById('workGrid');
  if (grid) grid.style.setProperty('--work-k', k);

  // The heading holds the screen on its own, then shrinks away once the works
  // have arrived — never while one is sweeping across it.
  const head = document.querySelector('.work .scrolly-pin .work-head');
  if (head) {
    const shrink = Math.min(progress / 0.45, 1);
    head.style.transform = `scale(${1 - shrink * 0.45})`;
    head.style.opacity = String(progress < 0.20 ? 1 : Math.max(0, 1 - (progress - 0.20) / 0.18));
  }

  // One-time entrance, then the works stay fully lit for the whole flight.
  const entrance = progress <= WORK_TEXT_HOLD
    ? 0
    : Math.min(1, (progress - WORK_TEXT_HOLD) / WORK_ENTER);
  // The camera stays parked until the entrance has finished.
  const camProgress = progress <= WORK_INTRO
    ? 0
    : (progress - WORK_INTRO) / (1 - WORK_INTRO);

  const wrapMin = WORK_NEAR - workSpan;
  workTunnel.forEach(({ el, x, y, z }) => {
    // Wrap into the loop instead of culling: a work that passes the lens comes
    // back around at the far end. Every work stays fully lit, near or far —
    // cosmos never fades one.
    let depth = (z + camProgress * workCamTravel - wrapMin) % workSpan;
    if (depth < 0) depth += workSpan;
    depth += wrapMin;

    el.style.opacity = String(entrance);
    el.style.transform = `translate(-50%,-50%) translate3d(${x * k}px, ${y * k}px, ${depth}px)`;
    el.style.zIndex = String(Math.round((depth + workCamTravel + 600) / 100));
  });
}

function updateWorkTunnel(progress){
  if (!workTunnel.length) return;

  // Very short screens (landscape phones) have no room to pin a full stage.
  if (workTunnelOffMQ.matches) {
    if (!workTunnelCleared) { clearWorkTunnel(); workTunnelCleared = true; }
    return;
  }
  workTunnelCleared = false;

  // Driven straight off the scroll position. An eased camera lagged behind
  // whenever requestAnimationFrame was throttled (background tab, fast scroll),
  // leaving the tunnel rendered at a stale position.
  drawWorkTunnel(progress);
}

// ===== SECTION SCROLLYTELLING (every section builds itself up, one step at a time) =====
// Mirrors the CSS breakpoint where pinning is switched off (see .scrolly in style.css).
const unpinnedMQ = window.matchMedia('(max-width:900px), (max-height:640px)');
// The portfolio keeps its pinned fly-through everywhere except screens too
// short to hold a stage at all.
const workTunnelOffMQ = window.matchMedia('(max-height:640px)');
const scrollySections = Array.from(document.querySelectorAll('.scrolly')).map(sec => {
  const steps = Array.from(sec.querySelectorAll('.scrolly-step'));
  sec.style.setProperty('--steps', steps.length);
  return { sec, pin: sec.querySelector('.scrolly-pin'), steps };
});

// Steps also carry the work/testimonial cards, which are injected later by the API.
function refreshScrollySteps(){
  scrollySections.forEach(entry => {
    entry.steps = Array.from(entry.sec.querySelectorAll('.scrolly-step'));
    entry.sec.style.setProperty('--steps', entry.steps.length);
  });
  updateScrolly();
}

function updateScrolly(){
  scrollySections.forEach(({ sec, pin, steps }) => {
    if (!pin || !steps.length) return;
    const rect = sec.getBoundingClientRect();
    // The media query, not the measured height, decides whether the pin is live.
    const isWork = sec.classList.contains('work');
    const unpinned = isWork ? workTunnelOffMQ.matches : unpinnedMQ.matches;
    const pinned = !unpinned && sec.offsetHeight > pin.offsetHeight;
    let progress;

    if (pinned) {
      // Pinned: progress runs across the section's own scroll range.
      progress = (-rect.top) / (sec.offsetHeight - pin.offsetHeight);
    } else {
      // Unpinned (phones / short screens): progress runs from the moment the
      // block starts entering until it has travelled most of the way up.
      const vh = window.innerHeight;
      progress = (vh * 0.8 - rect.top) / (vh * 0.3 + rect.height || 1);
    }
    progress = Math.min(Math.max(progress, 0), 1);

    if (sec.classList.contains('work')) updateWorkTunnel(progress);

    steps.forEach((el, i) => {
      // Spread the arrivals over the first 70%, leaving a beat to read the finished composition.
      const trigger = steps.length > 1 ? (i / steps.length) * 0.7 : 0;
      const on = progress >= trigger;
      if (on && !el.classList.contains('on')) {
        el.classList.add('on');
        const num = el.querySelector('.stat-num');
        if (num) animateCount(num);
      } else if (!on) {
        el.classList.remove('on');
      }
    });
  });
}
window.addEventListener('scroll', updateScrolly, { passive:true });
window.addEventListener('resize', updateScrolly);
window.addEventListener('load', updateScrolly);
updateScrolly();

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function closeMobileMenu(){
  mobileMenu.classList.remove('open');
  menuBtn.classList.remove('active');
  document.body.style.overflow = '';
}
function openMobileMenu(){
  mobileMenu.classList.add('open');
  menuBtn.classList.add('active');
  document.body.style.overflow = 'hidden';
}

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
});

// The custom cursor dot was removed — it drew a white circle wherever the
// pointer sat, which read as a stray full stop on top of the headline.

// ===== SCROLL REVEAL (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // trigger stat counters when stats section appears
      if (entry.target.classList.contains('stat')) {
        animateCount(entry.target.querySelector('.stat-num'));
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -8% 0px'
});

function observeReveal(el){
  revealObserver.observe(el);
}

document.querySelectorAll('.reveal-up, .reveal-fade, .hero, .hero-intro').forEach(observeReveal);

// hero reveals immediately on load (not scroll-dependent)
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  requestAnimationFrame(() => hero.classList.add('in-view'));
});

// ===== STAT COUNTER ANIMATION =====
function animateCount(el){
  if (!el) return;
  const target = parseInt(el.getAttribute('data-count'), 10) || 0;
  const suffix = el.textContent.replace(/[0-9]/g, '');
  const duration = 1400;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== SMOOTH ANCHOR SCROLL OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior:'smooth' });
    }
  });
});

// ===== DYNAMIC CONTENT: PORTFOLIO =====
// Give the frame the artwork's own proportions so the image fills it exactly
// and no blurred backdrop shows through.
function fitCardToImage(card){
  const img = card.querySelector('.media-fg');
  if (!img) return;
  const apply = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    card.style.setProperty('--ar', img.naturalWidth + ' / ' + img.naturalHeight);
  };
  if (img.complete) apply();
  img.addEventListener('load', apply);
}

async function loadPortfolio(){
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  try {
    const res = await fetch('/api/portfolio');
    const items = await res.json();
    grid.innerHTML = '';
    items.forEach((item, i) => {
      const hasGallery = Array.isArray(item.gallery_images) && item.gallery_images.length > 0;
      const hasLink = !hasGallery && !!item.behance_url;
      const card = document.createElement(hasLink ? 'a' : 'div');
      card.className = 'work-card scrolly-step';
      // Placeholder until the image reports its real proportions — a slot ratio
      // that disagrees with the artwork leaves blurred filler bars around it.
      // buildWorkTunnel() sets --bw, since that belongs to the active layout.
      card.style.setProperty('--ar', '1 / ' + WORK_TUNNEL[i % WORK_TUNNEL.length].ar);
      if (hasLink) {
        card.href = item.behance_url;
        card.target = '_blank';
        card.rel = 'noopener';
      }
      if (hasGallery) card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="work-media">
          <img class="media-bg" src="${item.image}" alt="" aria-hidden="true" loading="lazy">
          <!-- Eager: inside the 3D tunnel the browser's lazy-load heuristics
               never fire for the deeper cards, leaving empty frames. Only eight. -->
          <img class="media-fg" src="${item.image}" alt="${escapeHtml(item.title)}" loading="eager" decoding="async">
        </div>
        <div class="work-info">
          <div class="work-info-text">
            <h3>${escapeHtml(item.title)}</h3>
            <span data-uz="${escapeAttr(item.category_uz)}" data-ru="${escapeAttr(item.category_ru)}">${escapeHtml(item.category_uz)}</span>
          </div>
          ${hasLink ? '<span class="view-link">Behance ↗</span>' : ''}
          ${hasGallery ? `<span class="view-link" data-uz="Ko'rish" data-ru="Смотреть">Ko'rish</span>` : ''}
        </div>
      `;
      if (hasGallery) {
        card.addEventListener('click', () => openCaseModal(item, item.gallery_images));
      }
      grid.appendChild(card);
      fitCardToImage(card);
    });
    renderHeroFan(items);
    setLang(currentLang);
    buildWorkTunnel();
    refreshScrollySteps();
  } catch (e) {
    // API unavailable (e.g. static preview without the backend running) — leave grid empty.
  }
}

// ===== HERO FANNED PORTFOLIO CARDS =====
const HERO_FAN_LAYOUT = [
  { tx: -320, rot: -14, scale: .84, z: 1 },
  { tx: -195, rot: -7,  scale: .92, z: 2 },
  { tx: -66,  rot: -2,  scale: 1,   z: 4 },
  { tx: 66,   rot: 3,   scale: 1,   z: 4 },
  { tx: 195,  rot: 8,   scale: .92, z: 2 },
  { tx: 320,  rot: 15,  scale: .84, z: 1 }
];

function renderHeroFan(items){
  const fan = document.getElementById('heroFan');
  if (!fan || !items.length) return;
  fan.innerHTML = '';
  const picks = items.slice(0, HERO_FAN_LAYOUT.length);

  picks.forEach((item, i) => {
    const layout = HERO_FAN_LAYOUT[i];
    const card = document.createElement('div');
    card.className = 'hero-fan-card';
    card.style.setProperty('--tx', layout.tx + 'px');
    card.style.setProperty('--rot', layout.rot + 'deg');
    card.style.setProperty('--fan-delay', (i * 0.07) + 's');
    card.style.setProperty('--scale', layout.scale);
    card.style.zIndex = layout.z;
    card.innerHTML = `<img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">`;
    fan.appendChild(card);

    // small floating name badge on two of the middle cards
    if (i === 2 || i === 4) {
      const badge = document.createElement('div');
      badge.className = 'hero-fan-badge';
      badge.style.setProperty('--fan-delay', (i * 0.07 + 0.3) + 's');
      badge.style.left = i === 2 ? '30%' : '72%';
      badge.style.top = i === 2 ? '6%' : '14%';
      badge.innerHTML = `<img src="${item.image}" alt="">${escapeHtml(item.title.split(' ')[0])}`;
      fan.appendChild(badge);
    }
  });

  layoutHeroFan();
}

// The fan spreads ~790px wide at full size; squeeze it so the outer cards are
// never cut off by the screen edge, and reclaim the space the scaling frees up.
function layoutHeroFan(){
  const fan = document.getElementById('heroFan');
  if (!fan || !fan.children.length) return;
  const NATURAL_WIDTH = 790;
  const NATURAL_HEIGHT = 260;
  const scale = Math.min(1, (window.innerWidth - 28) / NATURAL_WIDTH);
  fan.style.transform = `scale(${scale})`;
  fan.style.marginBottom = Math.round(-NATURAL_HEIGHT * (1 - scale)) + 'px';
}
window.addEventListener('resize', layoutHeroFan);

// ===== PORTFOLIO CASE VIEWER (on-site gallery, no external link needed) =====
const caseModalOverlay = document.getElementById('caseModalOverlay');
const caseModalClose = document.getElementById('caseModalClose');
const caseModalScroll = document.getElementById('caseModalScroll');
const caseModalTitle = document.getElementById('caseModalTitle');

function openCaseModal(item, images){
  if (!caseModalOverlay) return;
  caseModalTitle.textContent = item.title;
  // A gallery may now hold PDFs (brand books, presentations). An <img> would
  // render those as a broken tile, so they get their own opener instead.
  caseModalScroll.innerHTML = images.map((src) => {
    if (/\.pdf(\?|$)/i.test(src)) {
      // The stored name is a generated id, so label the tile with the case.
      return `<a class="case-pdf" href="${src}" target="_blank" rel="noopener">
                <span class="case-pdf-mark">PDF</span>
                <span class="case-pdf-name">${escapeHtml(item.title)}</span>
                <span class="case-pdf-cta">Ochish ↗</span>
              </a>`;
    }
    return `<img src="${src}" alt="${escapeHtml(item.title)}" loading="lazy">`;
  }).join('');
  caseModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCaseModal(){
  if (!caseModalOverlay) return;
  caseModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  caseModalScroll.scrollTop = 0;
}
if (caseModalClose) caseModalClose.addEventListener('click', closeCaseModal);
if (caseModalOverlay) {
  caseModalOverlay.addEventListener('click', (e) => {
    if (e.target === caseModalOverlay) closeCaseModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && caseModalOverlay && caseModalOverlay.classList.contains('open')) {
    closeCaseModal();
  }
});

// ===== DYNAMIC CONTENT: TESTIMONIALS (TEXT + VIDEO) =====
async function loadTestimonials(){
  const videoGrid = document.getElementById('videoTestiGrid');
  const textGrid = document.getElementById('testiGrid');
  if (!videoGrid && !textGrid) return;
  try {
    const res = await fetch('/api/testimonials');
    const data = await res.json();

    if (videoGrid) {
      videoGrid.innerHTML = '';
      data.video.forEach((v, i) => {
        const el = document.createElement('div');
        el.className = 'video-testi scrolly-step';
        el.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(v.youtube_id)}" title="${escapeAttr(v.title || 'Mijoz video-sharhi')}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoGrid.appendChild(el);
      });
    }

    if (textGrid) {
      textGrid.innerHTML = '';
      data.text.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'testi-card scrolly-step';
        const quoteUz = `"${t.quote_uz}"`;
        const quoteRu = t.quote_ru ? `«${t.quote_ru}»` : quoteUz;
        card.innerHTML = `
          <p data-uz="${escapeAttr(quoteUz)}" data-ru="${escapeAttr(quoteRu)}">${escapeHtml(quoteUz)}</p>
          <div class="testi-author">
            <strong>${escapeHtml(t.author)}</strong>
            <span data-uz="${escapeAttr(t.role_uz)}" data-ru="${escapeAttr(t.role_ru)}">${escapeHtml(t.role_uz)}</span>
          </div>
        `;
        textGrid.appendChild(card);
      });
    }

    setLang(currentLang);
    refreshScrollySteps();
  } catch (e) {
    // API unavailable — leave sections empty.
  }
}

function escapeHtml(str){
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function escapeAttr(str){ return escapeHtml(str); }

loadPortfolio();
loadTestimonials();

// ===== PROJECT / LEAD MODAL =====
const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalClose = document.getElementById('projectModalClose');

function openProjectModal(){
  if (!projectModalOverlay) return;
  projectModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeProjectModal(){
  if (!projectModalOverlay) return;
  projectModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.js-project-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openProjectModal();
  });
});

if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
if (projectModalOverlay) {
  projectModalOverlay.addEventListener('click', (e) => {
    if (e.target === projectModalOverlay) closeProjectModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModalOverlay && projectModalOverlay.classList.contains('open')) {
    closeProjectModal();
  }
});

// ===== LEAD FORM (shared logic for the modal AND the inline footer form) =====
function setupLeadForm(block){
  const form = block.querySelector('.js-lead-form');
  if (!form) return;
  const body = block.querySelector('.pm-body');
  const success = block.querySelector('.pm-success');
  const error = form.querySelector('.form-error');
  const budgetGrid = form.querySelector('.pm-budget-grid');
  const isModal = block.classList.contains('project-modal');
  let selectedBudget = '';

  if (budgetGrid) {
    budgetGrid.querySelectorAll('.pm-budget-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const alreadyActive = btn.classList.contains('active');
        budgetGrid.querySelectorAll('.pm-budget-btn').forEach((b) => b.classList.remove('active'));
        if (alreadyActive) {
          selectedBudget = '';
        } else {
          btn.classList.add('active');
          selectedBudget = btn.dataset.value;
        }
      });
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (error) error.textContent = '';
    const submitBtn = form.querySelector('.pm-submit');
    const fd = new FormData(form);
    submitBtn.disabled = true;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          phone: fd.get('phone'),
          message: fd.get('message'),
          budget: selectedBudget
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Xatolik yuz berdi.');

      if (body) body.classList.add('hidden');
      if (success) success.classList.remove('hidden');
      form.reset();
      if (budgetGrid) budgetGrid.querySelectorAll('.pm-budget-btn').forEach((b) => b.classList.remove('active'));
      selectedBudget = '';

      setTimeout(() => {
        if (isModal) closeProjectModal();
        if (body) body.classList.remove('hidden');
        if (success) success.classList.add('hidden');
      }, isModal ? 2600 : 3200);
    } catch (err) {
      if (error) error.textContent = err.message;
    } finally {
      submitBtn.disabled = false;
    }
  });
}

document.querySelectorAll('.lead-form-block').forEach(setupLeadForm);
