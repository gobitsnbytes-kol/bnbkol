import { createSplitFlap } from './split-flap.js';
import { startRouter, nextRoute } from './router.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const stackedCards = matchMedia('(min-width: 1101px)');
const SVG = 'http://www.w3.org/2000/svg';
const C = {
  taxi: '#F2B705', magenta: '#FF2E88', violet: '#7B2CFF', rice: '#FBF7EE',
  paper: '#F3EAD3', night: '#0B0B12', ink: '#141414', sindoor: '#D7261E',
};
const wait = s => new Promise(r => setTimeout(r, s * 1000));
// stroke-draw prep. Lengths are scaled to screen space: the truss uses non-scaling strokes, whose
// dash pattern is measured in screen pixels, so a user-space length would leave the line unfinished.
const dash = paths => paths.forEach(p => {
  const m = p.getScreenCTM();
  const l = p.getTotalLength() * (m ? Math.max(Math.hypot(m.a, m.b), Math.hypot(m.c, m.d)) : 1) + 2;
  p.style.strokeDasharray = l; p.style.strokeDashoffset = l;
});

/* ================= shell ================= */

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollToEl = t => lenis ? lenis.scrollTo(t, { duration: 1.2 }) : (typeof t === 'number' ? scrollTo(0, t) : t.scrollIntoView());
const jumpTo = y => { lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); };

const view = $('#view');
const blind = $('.blind');
const menuBtn = $('.nav__menu'), sheet = $('#sheet');

function closeSheet(returnFocus = true) {
  if (sheet.hidden) return;
  sheet.hidden = true;
  view.inert = $('footer').inert = $('.nextstop').inert = false;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.textContent = 'Menu';
  lenis?.start();
  if (returnFocus) menuBtn.focus();
}
menuBtn.addEventListener('click', () => {
  if (!sheet.hidden) return closeSheet();
  sheet.hidden = false;
  view.inert = $('footer').inert = $('.nextstop').inert = true;
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.textContent = 'Close';
  lenis?.stop();
  $('a', sheet).focus();
  if (!reduced) gsap.fromTo($$('a', sheet), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: 'expo.out' });
});
addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

// magnetic CTAs, delegated so routed pages need no wiring
if (finePointer && !reduced) {
  let mag = null;
  const pull = (b, x, y) => gsap.to(b, { '--mx': `${x}px`, '--my': `${y}px`, duration: 0.4, ease: 'power3', overwrite: true });
  addEventListener('pointermove', e => {
    const b = e.target.closest?.('.magnetic');
    if (mag && mag !== b) { pull(mag, 0, 0); mag = null; }
    if (!b) return;
    mag = b;
    const r = b.getBoundingClientRect();
    pull(b, (e.clientX - r.left - r.width / 2) * 0.25, (e.clientY - r.top - r.height / 2) * 0.35);
  }, { passive: true });
}

// custom cursor: a soft notched dart. The tip is the hotspot; the body turns to face the
// direction of travel with a little momentum, then settles back to a normal pointer's lean.
if (finePointer && !reduced) {
  const cur = document.createElement('div');
  cur.className = 'cursor';
  cur.setAttribute('aria-hidden', 'true');
  cur.innerHTML = `<svg viewBox="-29 -16 32 32">
    <path class="c-a" d="M0 0 L-24 -12 L-16 0 Z"/><path class="c-b" d="M0 0 L-16 0 L-24 12 Z"/>
    <path class="c-edge" d="M0 0 L-24 -12 L-16 0 L-24 12 Z"/></svg>`;
  document.body.append(cur);
  document.documentElement.classList.add('has-cursor');
  const REST = -122;                       // tip up-left, like a system arrow
  let x = -100, y = -100, lx = null, ly = null, vx = 0, vy = 0, ang = REST, still = 99, s = 1, sTarget = 1;
  addEventListener('pointermove', e => {
    if (lx !== null) { vx = vx * 0.5 + (e.clientX - lx) * 0.5; vy = vy * 0.5 + (e.clientY - ly) * 0.5; }
    lx = x = e.clientX; ly = y = e.clientY;
    still = 0;
    cur.classList.add('is-on');
  }, { passive: true });
  gsap.ticker.add(() => {
    const speed = Math.hypot(vx, vy);
    still++;
    const target = speed > 1.5 && still < 8 ? Math.atan2(vy, vx) * 180 / Math.PI : REST;
    const diff = ((target - ang + 540) % 360) - 180;
    ang += diff * (target === REST ? 0.09 : 0.22);
    vx *= 0.82; vy *= 0.82;
    const stretch = Math.min(speed / 45, 0.28);
    s += (sTarget - s) * 0.25;
    cur.style.transform = `translate3d(${x}px,${y}px,0) rotate(${ang.toFixed(2)}deg) scale(${(s * (1 + stretch)).toFixed(3)},${(s * (1 - stretch * 0.45)).toFixed(3)})`;
  });
  document.addEventListener('pointerover', e => {
    const el = e.target.closest?.('a[href], button, summary');
    const led = !el && e.target.closest?.('.pivot__leds, .sayhi__leds');
    cur.classList.toggle('is-link', !!el);
    cur.classList.toggle('is-led', !!led);
    sTarget = el ? 1.22 : 1;
  });
  document.addEventListener('pointerdown', () => { sTarget *= 0.8; });
  document.addEventListener('pointerup', () => { sTarget = cur.classList.contains('is-link') ? 1.22 : 1; });
  document.documentElement.addEventListener('pointerleave', () => cur.classList.remove('is-on'));
}

$('.foot__up').addEventListener('click', () => { scrollToEl(0); $('.nav__brand').focus({ preventScroll: true }); });

function setChrome(route, page) {
  document.title = page.dataset.title;
  $('meta[name="description"]').content = page.dataset.desc || '';
  $$('.nav__tabs a, .sheet > a, .foot__cols a').forEach(a => {
    const u = new URL(a.href);
    if (u.origin === location.origin && u.pathname === route.path) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const next = nextRoute(route), ns = $('.nextstop');
  ns.href = next.path;
  $('.nextstop__no', ns).textContent = next.no;
  $('b', ns).textContent = next.name;
  $('.nextstop__bn', ns).textContent = next.bn;
  document.documentElement.dataset.page = route.page;
}

/* ---------- alpona loader (first visit per session) ---------- */
function buildAlpona(svg) {
  const add = (tag, attrs) => { const el = document.createElementNS(SVG, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); svg.appendChild(el); return el; };
  const line = { fill: 'none', stroke: C.rice, 'stroke-width': 2.2, 'stroke-linecap': 'round' };
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * 360;
    add('path', { ...line, d: 'M0 -38 C16 -54 14 -76 0 -88 C-14 -76 -16 -54 0 -38Z', transform: `rotate(${a})` });
    add('path', { ...line, d: 'M0 -50 C6 -58 6 -66 0 -72', transform: `rotate(${a})` });
    add('circle', { fill: C.taxi, r: 3.4, cy: -94, transform: `rotate(${a + 22.5})` });
  }
  add('circle', { ...line, r: 36, stroke: C.taxi, 'stroke-dasharray': '1 7' });
}

function runLoader() {
  const loader = $('.loader');
  let seen = false;
  try { seen = sessionStorage.getItem('bnb-seen') === '1'; sessionStorage.setItem('bnb-seen', '1'); } catch (e) {}
  if (seen || reduced) { loader.remove(); return Promise.resolve(); }
  const svg = $('.alpona');
  buildAlpona(svg);
  const strokes = $$('path, circle[fill="none"]', svg);
  dash(strokes);
  lenis?.stop();
  return new Promise(resolve => {
    gsap.timeline({ onComplete: () => loader.remove() })
      .from('.loader__logo', { scale: 0.4, rotate: -40, opacity: 0, duration: 0.9, ease: 'back.out(1.8)' })
      .to(strokes, { strokeDashoffset: 0, duration: 1.1, stagger: 0.02, ease: 'expo.out' }, 0.15)
      .from($$('circle[fill]:not([fill="none"])', svg), { scale: 0, transformOrigin: 'center', duration: 0.5, stagger: 0.03, ease: 'back.out(3)' }, 0.6)
      .to('.loader__word', { opacity: 1, y: -6, duration: 0.6, ease: 'expo.out' }, 0.7)
      .to(svg, { rotate: 45, duration: 1.6, ease: 'expo.out' }, 0.25)
      .to(loader, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', onStart: () => setTimeout(resolve, 350) }, '+=0.2')
      .from('.nav', { y: -30, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.3');
  });
}

/* ---------- transition: destination blind ---------- */
function leave(route) {
  closeSheet(false);
  lenis?.stop();
  $('.blind__no').textContent = route.no;
  $('.blind__to').textContent = route.name;
  $('.blind__bn').textContent = route.bn;
  if (reduced) return gsap.fromTo(blind, { autoAlpha: 0, yPercent: 0 }, { autoAlpha: 1, duration: 0.15 });
  return gsap.timeline()
    .fromTo(blind, { autoAlpha: 1, yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: 'expo.inOut' })
    .fromTo('.blind__plate > *', { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: 'expo.out' }, '-=0.25');
}
function reveal() {
  if (reduced) return gsap.to(blind, { autoAlpha: 0, duration: 0.15 });
  return gsap.timeline()
    .to('.blind__plate > *', { yPercent: -130, opacity: 0, stagger: 0.03, duration: 0.3, ease: 'power3.in' }, 0.05)
    .to(blind, { yPercent: 100, duration: 0.7, ease: 'expo.inOut' }, 0.15)
    .set(blind, { autoAlpha: 0 });
}

/* ================= page lifecycle ================= */

let pageCtx = null;
const cleanups = [];
const onCleanup = fn => cleanups.push(fn);
function unmount() {
  while (cleanups.length) cleanups.pop()();
  pageCtx?.revert();
  pageCtx = null;
  $('.route__stops').innerHTML = '';
}

function mount(page) {
  let intro;
  const has = s => page.querySelector(s);
  pageCtx = gsap.context(() => {
    intro = gsap.timeline({ paused: true });
    buildRoute(page);
    if (has('.hero')) hero(page, intro);
    if (has('.livery')) livery(page);
    if (has('.pivot')) pivot(page);
    if (has('.mast')) mast(page, intro);
    if (has('.seal')) seal(page, intro);
    if (has('.stack')) cards(page);
    if (has('.departures__board')) departures(page);
    if (has('.lost')) lost(page, intro);
    if (has('.voice')) voice(page);
    if (has('.stops')) stops(page);
    if (has('.tickets')) tickets(page);
    if (has('.checks')) checks(page);
    if (has('.hello')) hello(page);
    if (has('.sayhi')) sayhi(page, intro);
    boards(page);
    counters(page);
    reveals(page);
    footer();
  }, page);
  return intro;
}

async function enter(route, html, { first, hash, y }) {
  unmount();
  view.innerHTML = html;
  const page = view.firstElementChild;
  setChrome(route, page);
  jumpTo(0);
  const intro = mount(page);
  lenis?.resize();
  ScrollTrigger.refresh();
  const target = hash && page.querySelector(hash);
  if (target) jumpTo(target.getBoundingClientRect().top + scrollY);
  else if (y) jumpTo(y);

  if (first) await loaderDone;
  else { reveal(); await wait(0.3); }
  reduced ? intro.progress(1) : intro.play();
  lenis?.start();
  if (!first) {
    const h1 = page.querySelector('h1') || view;
    h1.tabIndex = -1;
    h1.focus({ preventScroll: true });
    $('#announcer').textContent = `${route.name} page`;
  }
}

/* ================= features ================= */

/* ---------- route rail ---------- */
function buildRoute(page) {
  gsap.fromTo($('.progress'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  const rail = $('.route'), list = $('.route__stops');
  const sections = $$('section[data-stop]', page);
  rail.hidden = sections.length < 3;
  if (rail.hidden) return;
  sections.forEach((s, i) => {
    const li = document.createElement('li');
    li.style.top = `${(i / (sections.length - 1)) * 100}%`;
    li.innerHTML = `<a href="#"><i></i><span>${s.dataset.stop}<b lang="bn">${s.dataset.bn}</b></span></a>`;
    li.querySelector('a').addEventListener('click', e => { e.preventDefault(); scrollToEl(s); });
    list.appendChild(li);
    ScrollTrigger.create({
      trigger: s, start: 'top 55%', end: 'bottom 55%',
      onToggle: self => li.classList.toggle('here', self.isActive),
      onEnter: () => li.classList.add('on'),
      onLeaveBack: () => li.classList.remove('on'),
    });
  });
  gsap.fromTo($('.route__fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.4 } });
}

/* ---------- home: Howrah bridge hero ---------- */
function buildBridge(svg) {
  const DECK = 290, T1 = 380, T2 = 1060, MID = 720;
  const ease = t => t * t * (3 - 2 * t);
  const chord = x => {
    if (x <= T1) return 236 - ease(x / T1) * 186;          // anchor → tower top
    if (x >= T2) return 236 - ease((1440 - x) / (1440 - T2)) * 186;
    const d = Math.abs(x - MID) / (MID - T1);              // dip toward the middle
    return 150 - (d * d) * 100;
  };
  const line = (d, cls = 'b') => { const p = document.createElementNS(SVG, 'path'); p.setAttribute('d', d); p.setAttribute('class', cls); svg.appendChild(p); return p; };
  const xs = []; for (let x = 20; x <= 1420; x += 35) xs.push(x);
  line(xs.map((x, i) => `${i ? 'L' : 'M'}${x} ${chord(x).toFixed(1)}`).join(' '), 'b b--heavy');
  line(`M0 ${DECK} H1440`, 'b b--deck');
  line(`M0 ${DECK + 14} H1440`, 'b');
  xs.forEach((x, i) => {
    line(`M${x} ${chord(x).toFixed(1)} V${DECK}`);
    if (i < xs.length - 1) {
      const n = xs[i + 1];
      line(`M${x} ${chord(x).toFixed(1)} L${n} ${DECK} M${n} ${chord(n).toFixed(1)} L${x} ${DECK}`);
    }
  });
  [T1, T2].forEach(t => {
    line(`M${t - 16} ${DECK} V36 M${t + 16} ${DECK} V36 M${t - 22} 36 H${t + 22}`, 'b b--heavy');
    for (let y = 60; y < DECK - 20; y += 46) line(`M${t - 16} ${y} L${t + 16} ${y + 46} M${t + 16} ${y} L${t - 16} ${y + 46}`);
  });
  // right bank: ghat steps, hatching, street lamps (drawn in with the truss)
  line('M1290 340 V331 H1312 V322 H1334 V313 H1356 V304 H1440', 'b b--heavy');
  for (let x = 1294; x < 1440; x += 6) {
    const top = x < 1312 ? 331 : x < 1334 ? 322 : x < 1356 ? 313 : 304;
    line(`M${x} ${top + 2} V340`, 'b b--hatch');
  }
  [1318, 1402].forEach(x => line(`M${x} ${DECK - 2} V${DECK - 52} M${x} ${DECK - 52} h8 M${x + 8} ${DECK - 52} v4 M${x - 3} ${DECK - 2} h6`, 'b'));
  line(`M0 ${DECK - 78} H1440`, 'b b--wire');                     // the tram's overhead wire

  const defs = document.createElementNS(SVG, 'defs');
  defs.innerHTML = `<linearGradient id="taxiPaint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD84A"/><stop offset=".55" stop-color="#F2B705"/><stop offset="1" stop-color="#C99404"/></linearGradient>
    <linearGradient id="tramPaint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5AA2EA"/><stop offset="1" stop-color="#2F74C0"/></linearGradient>`;
  svg.prepend(defs);
  const place = (cls, markup, y) => {
    const g = document.createElementNS(SVG, 'g'); g.setAttribute('class', cls);
    g.innerHTML = `<g transform="translate(0 ${y})">${markup}</g>`;
    svg.appendChild(g); return g;
  };
  const wheel = (x, r) => `<circle class="tyre" cx="${x}" cy="${-r}" r="${r}"/><g class="hub"><circle class="hubcap" cx="${x}" cy="${-r}" r="${r * 0.47}"/><path class="spoke" d="M${x - r * 0.47} ${-r} H${x + r * 0.47} M${x} ${-r * 1.47} V${-r * 0.53}"/></g>`;
  const lamps = svg.appendChild(document.createElementNS(SVG, 'g'));
  lamps.innerHTML = [1318, 1402].map(x => `<circle class="lantern" cx="${x + 8}" cy="${DECK - 45}" r="3.4"/>`).join('');

  // Ambassador taxi, facing right
  const taxi = place('taxi', `
    <ellipse class="v-shadow" cx="45" cy="1" rx="41" ry="2"/>
    <path class="taxi__body" d="M3 -9 V-16.5 Q3 -21 8 -21.4 L19.5 -22.2 L27 -32.6 Q29 -35.4 33 -35.4 H52 Q56 -35.4 58.2 -32.6 L65.5 -23 L80.5 -21.6 Q86.4 -21 87.2 -15.5 V-9 Z"/>
    <path class="taxi__sill" d="M3.8 -13.4 H86.4 V-9.8 H3.8 Z"/>
    <path class="glass" d="M23.6 -24 L29.4 -32 H41 V-24 Z M43 -24 V-32 H55.4 L61.2 -24 Z"/>
    <path class="glint" d="M31.5 -30.5 L28.6 -26.2 M47.5 -31 L45 -26.5"/>
    <path class="v-lines" d="M22 -23 V-10 M42 -24 V-10 M62.5 -23 V-10 M65.5 -22.6 Q76 -21.6 86.6 -17.4"/>
    <rect class="ink-fill" x="36" y="-20.6" width="4" height="1.3" rx=".6"/><rect class="ink-fill" x="56.6" y="-20.6" width="4" height="1.3" rx=".6"/>
    <text class="taxi__text" x="32" y="-15.4" text-anchor="middle">NO</text><text class="taxi__text" x="52" y="-15.4" text-anchor="middle">REFUSAL</text>
    <rect class="chrome" x=".4" y="-12.6" width="4.6" height="3.2" rx="1"/><rect class="chrome" x="85.4" y="-12.6" width="4.6" height="3.2" rx="1"/>
    <circle class="lamp-front" cx="85.8" cy="-17.6" r="1.8"/><rect class="lamp-rear" x="3.3" y="-19" width="1.9" height="3.6"/>
    ${wheel(17, 6.6)}${wheel(71.5, 6.6)}`, DECK - 2);

  // Kolkata tram, facing left: cream upper, blue lower, trolley pole on the wire
  const win = Array.from({ length: 8 }, (_, i) => 12 + i * 16.4);
  const pax = [1, 2, 4, 5, 7];
  const tram = place('tram', `
    <ellipse class="v-shadow" cx="75" cy="1" rx="74" ry="2"/>
    <path class="pole" d="M112 -49 L72 -75.6"/><circle class="ink-fill" cx="72" cy="-75.6" r="1.8"/>
    <rect class="tram__roof" x="5" y="-50" width="140" height="6.5" rx="3.2"/>
    <rect class="tram__body" x="0" y="-45" width="150" height="36" rx="6"/>
    <rect class="tram__cream" x="2.4" y="-43" width="145.2" height="16.5" rx="4"/>
    <rect class="tram__pin" x="2" y="-25.8" width="146" height="2.2"/>
    ${win.map(x => `<rect class="glass" x="${x}" y="-41.2" width="11.6" height="11.6" rx="1.6"/>`).join('')}
    ${pax.map(i => `<circle class="pax" cx="${win[i] + 5.8}" cy="-34.4" r="2.3"/><path class="pax" d="M${win[i] + 1.6} -29.6 Q${win[i] + 5.8} -33 ${win[i] + 10} -29.6 Z"/>`).join('')}
    <path class="glint" d="M15 -39.6 L13.4 -36.4 M64.2 -39.6 L62.6 -36.4 M113.4 -39.6 L111.8 -36.4"/>
    <rect class="tram__door" x="60" y="-23.4" width="11" height="14.2"/><rect class="tram__door" x="126" y="-23.4" width="11" height="14.2"/>
    <rect class="ink-fill" x="4" y="-49.2" width="22" height="5.8" rx="1.2"/><rect class="tram__led" x="6" y="-47.2" width="18" height="1.8"/>
    <circle class="lamp-front" cx="3.4" cy="-16.4" r="2.1"/>
    <circle class="chrome" cx="96" cy="-16.6" r="4.4"/><text class="tram__no" x="96" y="-14.6" text-anchor="middle">5</text>
    <rect class="ink-fill" x="14" y="-10.4" width="38" height="4.4" rx="1.6"/><rect class="ink-fill" x="98" y="-10.4" width="38" height="4.4" rx="1.6"/>
    <path class="ink-fill" d="M0 -10 L-4.5 -3.6 H7 V-10 Z"/>
    ${wheel(22, 4.3)}${wheel(44, 4.3)}${wheel(106, 4.3)}${wheel(128, 4.3)}`, DECK - 2);

  // nouka (country boat) drifting on the river
  const boat = place('nouka', `
    <path class="pole" d="M54 -2 L63 -24"/>
    <path class="nouka__roof" d="M17 -2 Q32 -15.5 47 -2 Z"/>
    <path class="v-lines" d="M22 -5.5 Q32 -13 42 -5.5 M27 -8.6 Q32 -11.2 37 -8.6"/>
    <path class="ink-fill" d="M0 -3 Q32 7.5 68 -3 Q63 3.2 34 5.4 Q6 3.4 0 -3 Z"/>`, 338);

  const taxi2 = svg.insertBefore(taxi.cloneNode(true), tram);
  return { paths: $$('path.b', svg), taxis: [taxi, taxi2], tram, boat };
}

function hero(page, intro) {
  const bridge = buildBridge($('.bridge__svg', page));
  dash(bridge.paths);
  intro
    .to(bridge.paths, { strokeDashoffset: 0, duration: 1.6, stagger: { amount: 0.9, from: 'center' }, ease: 'expo.out' }, 0)
    .from('.hero__title .line', { yPercent: 110, duration: 1.1, stagger: 0.09, ease: 'expo.out' }, 0.15)
    .from('.hero__bn, .hero__lede, .hero__ctas', { y: 24, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' }, 0.5)
    .from('.sticker', { scale: 0, rotate: -30, duration: 0.7, stagger: 0.08, ease: 'back.out(2.2)' }, 0.8);
  if (reduced) return;
  // traffic: each vehicle makes a trip in a random direction at a random speed, rests off-screen, goes again
  let alive = true;
  const R = gsap.utils.random;
  const trip = (v, len, faces, [dMin, dMax], [wMin, wMax]) => {
    if (!alive) return;
    const dir = Math.random() < 0.5 ? 1 : -1;               // 1 = drives right
    const inner = v.firstElementChild, y = 288;
    inner.setAttribute('transform', dir === faces ? `translate(0 ${y})` : `translate(${len} ${y}) scale(-1 1)`);
    const [from, to] = dir > 0 ? [-len - 40, 1480] : [1480, -len - 40];
    gsap.fromTo(v, { x: from }, { x: to, duration: R(dMin, dMax), ease: 'none', delay: R(wMin, wMax),
      onComplete: () => trip(v, len, faces, [dMin, dMax], [wMin, wMax]) });
  };
  bridge.taxis.forEach((t, i) => trip(t, 90, 1, [6.5, 10.5], i ? [3, 7] : [1.2, 2.4]));
  trip(bridge.tram, 150, -1, [14, 20], [2, 5]);
  gsap.fromTo(bridge.boat, { x: 1180 }, { x: -90, duration: 70, repeat: -1, ease: 'none' });
  gsap.to(bridge.taxis.flatMap(t => $$('.hub', t)), { rotation: 360, transformOrigin: '50% 50%', duration: 0.32, repeat: -1, ease: 'none' });
  gsap.to($$('.hub', bridge.tram), { rotation: -360, transformOrigin: '50% 50%', duration: 0.3, repeat: -1, ease: 'none' });
  onCleanup(() => { alive = false; gsap.killTweensOf([...bridge.taxis, bridge.tram]); });
  gsap.to('.bridge', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ---------- counters ---------- */
function countUp(el) {
  const end = +el.dataset.count;
  if (reduced) { el.textContent = end.toLocaleString('en-IN'); return; }
  const o = { v: 0 };
  gsap.to(o, { v: end, duration: end > 50 ? 1.8 : 1.1, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-IN'); } });
}
function counters(page) {
  $$('[data-count]', page).forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => countUp(el) }));
}

/* ---------- livery marquee (scroll-velocity) ---------- */
function livery(page) {
  const rows = $$('.livery__row', page).map((row, i) => {
    const track = $('.livery__track', row);
    track.innerHTML += track.innerHTML;
    return { track, dir: i ? 1 : -1, x: 0 };
  });
  if (reduced) return;
  let boost = 0, skew = 0;
  ScrollTrigger.create({ onUpdate: s => { boost = gsap.utils.clamp(-14, 14, s.getVelocity() / 260); } });
  const tick = (t, dt) => {
    boost *= 0.92; skew += (boost * 0.6 - skew) * 0.1;
    rows.forEach(r => {
      const half = r.track.scrollWidth / 2;
      r.x = gsap.utils.wrap(-half, 0, r.x + r.dir * 0.06 * dt * (1 + Math.abs(boost)));
      r.track.style.transform = `translate3d(${r.x}px,0,0) skewX(${skew.toFixed(2)}deg)`;
    });
  };
  gsap.ticker.add(tick);
  onCleanup(() => gsap.ticker.remove(tick));
}

/* ---------- LED dot-light (Chandannagar) ---------- */
function ledField(canvas, lines, opts = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const palette = [C.taxi, C.magenta, C.violet, C.rice];
  const state = { p: 0, mx: -1e4, my: -1e4 };
  let W = 0, H = 0, dots = [], step = 8, raf = 0, visible = false, rt;
  function sample() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    if (!W || !H) { dots = []; return; }
    canvas.width = W * dpr; canvas.height = H * dpr;
    step = Math.max(6, Math.round(W / (opts.cols || 120)));
    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const o = off.getContext('2d');
    const size = Math.min(W * (opts.scale || 0.17), H * (opts.maxH || 0.32));
    o.font = `900 ${size}px "Big Shoulders Display"`;
    o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillStyle = '#000';
    lines.forEach((l, i) => o.fillText(l, W / 2, H / 2 + (i - (lines.length - 1) / 2) * size * 0.92 + (opts.dy || 0) * H));
    const data = o.getImageData(0, 0, W, H).data;
    dots = [];
    for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) {
      if (data[((y | 0) * W + (x | 0)) * 4 + 3] > 128) {
        dots.push({ x, y, t: (x / W) * 0.8 + Math.random() * 0.2, c: palette[(Math.random() * palette.length) | 0], ph: Math.random() * 6.28 });
      }
    }
  }
  function draw(time) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    const r = step * 0.34;
    for (const d of dots) {
      const lit = gsap.utils.clamp(0, 1, (state.p - d.t * 0.85) * 7);
      if (lit <= 0) continue;
      const near = Math.max(0, 1 - Math.hypot(d.x - state.mx, d.y - state.my) / 140);
      const a = lit * (reduced ? 1 : 0.78 + 0.22 * Math.sin(time * 3 + d.ph));
      ctx.fillStyle = d.c;
      ctx.globalAlpha = a * (0.16 + near * 0.3);
      ctx.beginPath(); ctx.arc(d.x, d.y, r * (2.4 + near * 1.6), 0, 6.283); ctx.fill();
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(d.x, d.y, r * (1 + near * 0.5), 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  const loop = t => { draw(t / 1000); raf = visible ? requestAnimationFrame(loop) : 0; };
  canvas.addEventListener('pointermove', e => { const b = canvas.getBoundingClientRect(); state.mx = e.clientX - b.left; state.my = e.clientY - b.top; });
  canvas.addEventListener('pointerleave', () => { state.mx = state.my = -1e4; });
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); });
  const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(sample, 150); });
  io.observe(canvas); ro.observe(canvas);
  sample();
  onCleanup(() => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); clearTimeout(rt); });
  return state;
}

function pivot(page) {
  const stage = $('.pivot__stage', page);
  const narrow = innerWidth < 700;
  const leds = ledField($('.pivot__leds', page), narrow ? ['CITY OF', 'BUIL-', 'DERS.'] : ['CITY OF', 'BUILDERS.'], { cols: narrow ? 70 : 130, scale: narrow ? 0.3 : 0.17, dy: 0.03 });
  if (reduced) {
    leds.p = 1.2;
    gsap.set(stage, { backgroundColor: C.night });
    gsap.set('.pivot__joy', { opacity: 0 });
    gsap.set('.pivot__line', { color: C.rice, opacity: 1 });
    return;
  }
  gsap.timeline({ scrollTrigger: { trigger: '.pivot', start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    .to(stage, { backgroundColor: C.night, duration: 0.18, ease: 'power2.inOut' }, 0.04)
    .to('.pivot__joy', { scale: 0.42, yPercent: narrow ? -330 : -150, color: C.rice, opacity: 0.55, duration: 0.3, ease: 'power3.inOut' }, 0.06)
    .to(leds, { p: 1.2, duration: 0.5, ease: 'none' }, 0.1)
    .fromTo('.pivot__line', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.12, ease: 'expo.out' }, 0.62)
    .to({}, { duration: 0.08 });
}

/* ---------- signboards ---------- */
const boardIn = b => gsap.timeline()
  .fromTo(b, { clipPath: 'inset(0 100% 0 0)', rotate: -3 }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'expo.out' })
  .to(b, { rotate: -1.2, duration: 0.8, ease: 'back.out(3)' }, 0.55);

function boards(page) {
  if (reduced) return;
  $$('.board', page).filter(b => !b.closest('.mast')).forEach(b => {
    const tl = boardIn(b).pause();
    ScrollTrigger.create({ trigger: b, start: 'top 85%', once: true, onEnter: () => tl.play() });
  });
}

/* ---------- page mastheads ---------- */
function mast(page, intro) {
  const m = $('.mast', page);
  intro
    .add(boardIn($('.board', m)), 0.05)
    .from($$('.mast__lede, .mast__note', m), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0.2);
  const cells = $$('.meter__cell', m);
  if (cells.length) intro.from(cells, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.45);
}

function seal(page, intro) {
  const s = $('.seal', page);
  intro.from(s, { scale: 1.8, rotate: -40, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.35);
  if (reduced) return;
  gsap.to($('.seal__ring', s), { rotate: 360, duration: 40, repeat: -1, ease: 'none' });
  gsap.to(s, { rotate: 24, yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.mast', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ---------- home: five ways stack ---------- */
function cards(page) {
  const list = $$('.stack .card', page);
  list.forEach((c, i) => {
    c.style.setProperty('--i', i);
    const next = list[i + 1];
    if (next && stackedCards.matches && !reduced) {
      gsap.to(c, { scale: 0.94 + i * 0.01, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: `top ${13 + (i + 1) * 3}%`, scrub: true } });
    }
  });
  // build night: typing URL + a running 48h clock
  const url = $('.urlbar__text', page), full = url.dataset.type, clock = $('[data-clock]', page);
  let timer = 0;
  ScrollTrigger.create({ trigger: '.c-taxi', start: 'top 70%', once: true, onEnter: () => {
    if (reduced) return;
    const o = { n: 0 };
    gsap.to(o, { n: full.length, duration: 1.6, ease: 'none', onUpdate: () => { url.textContent = full.slice(0, Math.round(o.n)); } });
    let s = 48 * 3600;
    const p = n => String(n).padStart(2, '0');
    timer = setInterval(() => {
      s = s > 0 ? s - 1 : 48 * 3600;
      clock.textContent = `${p(s / 3600 | 0)}:${p((s % 3600) / 60 | 0)}:${p(s % 60)}`;
    }, 1000);
  }});
  // AI card: a small LED wave
  const mini = $('.mini-leds', page), mc = mini.getContext('2d');
  let live = false, raf = 0;
  function wave(t) {
    const w = mini.width = mini.clientWidth, h = mini.height = mini.clientHeight, g = 16;
    mc.globalCompositeOperation = 'lighter';
    for (let x = g / 2; x < w; x += g) for (let y = g / 2; y < h; y += g) {
      const v = Math.sin(x * 0.03 + t / 500) * Math.cos(y * 0.04 - t / 700);
      mc.fillStyle = v > 0.35 ? C.magenta : v > -0.2 ? C.violet : C.taxi;
      mc.globalAlpha = Math.max(0.08, (v + 1) / 2);
      mc.beginPath(); mc.arc(x, y, 3.2, 0, 6.283); mc.fill();
    }
    raf = live && !reduced ? requestAnimationFrame(wave) : 0;
  }
  const io = new IntersectionObserver(([e]) => { live = e.isIntersecting; if (live && !raf) raf = requestAnimationFrame(wave); });
  io.observe(mini);
  onCleanup(() => { clearInterval(timer); io.disconnect(); cancelAnimationFrame(raf); });
}

/* ---------- split-flap boards ---------- */
function departures(page) {
  const narrow = innerWidth < 640;
  const board = createSplitFlap($('.departures__board', page), {
    cols: narrow ? 14 : 22, rows: 5,
    pages: narrow
      ? [['BITS&BYTES', 'KOLKATA', '', 'NEXT EVENT', 'TBA'], ['', 'WE ARE', 'COOKING', 'SOMETHING', 'HERE'], ['', 'JOIN THE', 'ADDA TO', 'BOARD FIRST', '']]
      : [['BITS&BYTES KOLKATA', '', 'NEXT DEPARTURE', '', 'TO BE ANNOUNCED'],
         ['', 'NO EVENTS LISTED', '', 'WE ARE COOKING', 'SOMETHING HERE'],
         ['', 'JOIN THE ADDA', 'TO BOARD FIRST', '', '']],
    accentWords: ['ANNOUNCED', 'TBA', 'COOKING', 'ADDA'],
    ink: C.rice, accent: C.taxi, tile: '#1b1a22',
    autoplay: !reduced, playWhenVisible: true, loop: true, startDelay: 150, flipDuration: 55,
  });
  if (reduced) board.showPage(0);
  onCleanup(() => board.destroy());
}

function lost(page, intro) {
  const board = createSplitFlap($('.lost__board', page), {
    cols: 12, rows: 3, pages: [['PLATFORM 404', 'NO SERVICE', 'TO THIS STOP']], accentWords: ['404'],
    ink: C.rice, accent: C.taxi, tile: '#1b1a22', autoplay: false, playWhenVisible: false, loop: false,
  });
  intro
    .from('.lost__title', { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0)
    .call(() => (reduced ? board.showPage(0) : board.play()), null, 0.3)
    .from('.lost__lede, .lost .btn', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.5);
  onCleanup(() => board.destroy());
}

/* ---------- home: voice ---------- */
function voice(page) {
  if (reduced) return;
  const split = new SplitText($('.voice blockquote p', page), { type: 'words', mask: 'words' });
  gsap.timeline({ scrollTrigger: { trigger: '.voice', start: 'top 70%', once: true } })
    .from(split.words, { yPercent: 105, duration: 1, stagger: 0.035, ease: 'expo.out' })
    .from('.voice figcaption', { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5');
}

/* ---------- about: route stops ---------- */
function stops(page) {
  const list = $('.stops', page), items = $$('li', list);
  if (reduced) { list.style.setProperty('--drawn', 1); items.forEach(li => li.classList.add('lit')); return; }
  ScrollTrigger.create({
    trigger: list, start: 'top 75%', end: 'bottom 55%', scrub: true,
    onUpdate: s => {
      list.style.setProperty('--drawn', s.progress.toFixed(3));
      items.forEach((li, i) => li.classList.toggle('lit', s.progress >= i / items.length + 0.02));
    },
  });
}

/* ---------- join: fork + tickets ---------- */
function tickets(page) {
  const paths = $$('.fork path', page);
  if (!reduced) {
    dash(paths);
    gsap.timeline({ scrollTrigger: { trigger: '.tickets', start: 'top 85%', once: true } })
      .to(paths[0], { strokeDashoffset: 0, duration: 0.35, ease: 'power2.in' })
      .from('.fork circle', { scale: 0, transformOrigin: 'center', duration: 0.4, ease: 'back.out(3)' })
      .to(paths.slice(1), { strokeDashoffset: 0, duration: 0.8, ease: 'expo.out' }, '<')
      .from('.ticket', { y: 90, opacity: 0, rotate: i => (i ? 3 : -3), duration: 1, stagger: 0.12, ease: 'expo.out' }, '-=0.5')
      .from('.ticket__stamp', { scale: 2.4, opacity: 0, duration: 0.45, stagger: 0.15, ease: 'back.out(2.5)' }, '-=0.3');
  }
  if (!finePointer || reduced) return;
  $$('.ticket', page).forEach(t => {
    const rx = gsap.quickTo(t, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(t, 'rotationY', { duration: 0.5, ease: 'power3' });
    gsap.set(t, { transformPerspective: 900 });
    t.addEventListener('pointermove', e => { const b = t.getBoundingClientRect(); ry(((e.clientX - b.left) / b.width - 0.5) * 6); rx(-((e.clientY - b.top) / b.height - 0.5) * 6); });
    t.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

function checks(page) {
  const items = $$('.checks li', page);
  if (reduced) return items.forEach(li => li.classList.add('ticked'));
  ScrollTrigger.create({ trigger: '.checks', start: 'top 75%', once: true,
    onEnter: () => items.forEach((li, i) => gsap.delayedCall(i * 0.28, () => li.classList.add('ticked'))) });
}

/* ---------- home: closing CTA ---------- */
function hello(page) {
  if (reduced) return;
  gsap.timeline({ scrollTrigger: { trigger: '.hello', start: 'top 65%', once: true } })
    .from('.hello__title .line', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'expo.out' })
    .from($$('.hello__bn, .hello__lede, .hello .hero__ctas', page), { y: 24, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'expo.out' }, '-=0.6');
}

/* ---------- contact: LED hello ---------- */
function sayhi(page, intro) {
  const narrow = innerWidth < 700;
  const leds = ledField($('.sayhi__leds', page), narrow ? ['SAY', 'HELLO.'] : ['SAY HELLO.'],
    { cols: narrow ? 64 : 140, scale: narrow ? 0.34 : 0.16, maxH: narrow ? 0.3 : 0.5 });
  intro
    .to(leds, { p: 1.2, duration: 1.8, ease: 'power2.out' }, 0.1)
    .from($$('.sayhi__copy > *', page), { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0.7);
}

/* ---------- generic reveals ---------- */
function reveals(page) {
  if (reduced) return;
  const groups = ['.plate', '.hoardings article', '.chan', '.events__side .pass', '.departures', '.stops li', '.join__lower > *']
    .map(s => $$(s, page).filter(el => !el.closest('.mast')));
  groups.forEach(els => {
    if (!els.length) return;
    gsap.set(els, { y: 50, opacity: 0 });
    ScrollTrigger.batch(els, { start: 'top 90%', once: true,
      onEnter: b => gsap.to(b, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'expo.out' }) });
  });
  const meter = $$('.sponsor .meter__cell', page);
  if (meter.length) {
    gsap.set(meter, { y: 40, opacity: 0 });
    ScrollTrigger.create({ trigger: meter[0], start: 'top 90%', once: true, onEnter: () => gsap.to(meter, { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'expo.out' }) });
  }
}

function footer() {
  if (reduced) return;
  const word = $('.foot__word');
  gsap.timeline({ scrollTrigger: { trigger: word, start: 'top 95%', once: true } })
    .fromTo($$('span', word), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'expo.out' })
    .fromTo($('.foot__logo'), { xPercent: -260, rotate: -300, scale: 0.6 }, { xPercent: 0, rotate: 0, scale: 1, duration: 1.3, ease: 'back.out(1.4)' }, 0.1);
}

/* ================= boot ================= */
let loaderDone;
document.fonts.ready.then(() => {
  loaderDone = runLoader();
  startRouter({ leave, enter, scrollTo: hash => { const el = hash && $(hash, view); el ? scrollToEl(el) : scrollToEl(0); } });
});
