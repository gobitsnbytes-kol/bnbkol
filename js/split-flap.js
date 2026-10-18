/* Split-flap board — ported from 2d-assets-anim/split-flap.html (createComponent → createSplitFlap). */
export function createSplitFlap(container, config = {}) {

  const cfg = Object.assign({
    cols:        20,
    rows:        5,
    pages: [
      ['     DEPARTURES', '', 'LONDON       09:40', 'TOKYO        11:15', 'NEW YORK  BOARDING'],
      ['', '   LAUNCH  DAY', '', '  ALL SYSTEMS  GO', ''],
      ['    REVENUE', '', '   UP 312 PERCENT', '', '   SINCE  MONDAY'],
    ],
    accentWords: ['BOARDING', 'GO', '312'],
    charset:     ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-/%&!?',
    ink:         '#f0ede6',
    accent:      '#ff9500',
    tile:        '#1f1d1b',

    flipDuration: 70,           // ms per single flap step
    maxFlips:    14,            // cap per cell — long jumps start nearer the target
    colStagger:  38,            // ms ripple between columns
    rowStagger:  90,            // ms ripple between rows
    jitter:      120,           // ms random extra delay per cell (mechanical unevenness)
    holdDuration: 2600,         // ms each page rests once settled
    startDelay:  400,

    seed:        5,
    autoplay:        true,
    playWhenVisible: true,
    loop:            true,
    onComplete:      null
  }, config);

  /* ------------------------- helpers ------------------------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const CS = cfg.charset.toUpperCase();
  const L = CS.length;
  const idxOf = (ch) => { const i = CS.indexOf(ch.toUpperCase()); return i < 0 ? 0 : i; };
  const pad = (s) => (s || '').toUpperCase().padEnd(cfg.cols, ' ').slice(0, cfg.cols);

  /* ------------------------- DOM ------------------------- */
  const root = document.createElement('div');
  root.className = 'sf-root';
  root.style.setProperty('--sf-ink', cfg.ink);
  root.style.setProperty('--sf-accent', cfg.accent);
  root.style.setProperty('--sf-tile', cfg.tile);
  const sr = document.createElement('div');
  sr.className = 'sf-sr';
  sr.setAttribute('aria-live', 'polite');
  const grid = document.createElement('div');
  grid.className = 'sf-grid';
  root.append(sr, grid);
  container.appendChild(root);

  const cells = [];
  for (let r = 0; r < cfg.rows; r++) {
    const row = document.createElement('div');
    row.className = 'sf-row';
    for (let c = 0; c < cfg.cols; c++) {
      const el = document.createElement('div');
      el.className = 'sf-cell';
      el.innerHTML =
        '<div class="sf-half sf-top"><span></span></div>' +
        '<div class="sf-half sf-bottom"><span></span></div>' +
        '<div class="sf-flap sf-flap-top"><span></span><i class="shade"></i></div>' +
        '<div class="sf-flap sf-flap-bottom"><span></span><i class="shade"></i></div>';
      row.appendChild(el);
      const q = (s) => el.querySelector(s);
      cells.push({
        el, r, c,
        top: q('.sf-top span'), bot: q('.sf-bottom span'),
        ft: q('.sf-flap-top'), fb: q('.sf-flap-bottom'),
        ftT: q('.sf-flap-top span'), fbT: q('.sf-flap-bottom span'),
        ftS: q('.sf-flap-top .shade'), fbS: q('.sf-flap-bottom .shade'),
        last: '',
      });
    }
    grid.appendChild(row);
  }

  function size() {
    const avail = Math.max(120, container.clientWidth || 800);
    // padding = 0.45 cell each side, gap 4px
    const w = Math.floor((avail - 4 * (cfg.cols - 1)) / (cfg.cols + 0.9));
    root.style.setProperty('--sf-cell-w', `${w}px`);
    root.style.setProperty('--sf-cell-h', `${Math.round(w * 1.42)}px`);
  }
  size();

  /* ------------------------- schedule ------------------------- */
  // per page: target chars, accent mask, per-cell start offsets; page i flips
  // FROM page i-1 (page 0 flips from blanks)
  const pages = cfg.pages.map(lines => {
    const rows = [];
    for (let r = 0; r < cfg.rows; r++) rows.push(pad(lines[r]));
    const accent = rows.map(line => {
      const m = new Array(cfg.cols).fill(false);
      (cfg.accentWords || []).forEach(w => {
        const W = w.toUpperCase();
        let at = line.indexOf(W);
        while (at >= 0) {
          // whole-word match only
          const pre = line[at - 1], post = line[at + W.length];
          if ((!pre || pre === ' ') && (!post || post === ' ')) for (let k = 0; k < W.length; k++) m[at + k] = true;
          at = line.indexOf(W, at + 1);
        }
      });
      return m;
    });
    return { rows, accent };
  });

  const rand = mulberry32(cfg.seed);
  const jit = cells.map(() => rand() * cfg.jitter);
  const blank = { rows: new Array(cfg.rows).fill(' '.repeat(cfg.cols)), accent: [] };

  // page timing: settle time = latest cell start + its flip count × duration
  const plan = [];
  let t0 = cfg.startDelay;
  pages.forEach((pg, pi) => {
    const prev = pi === 0 ? blank : pages[pi - 1];
    const seqs = cells.map((cell, i) => {
      const a = idxOf(prev.rows[cell.r][cell.c]), b = idxOf(pg.rows[cell.r][cell.c]);
      let steps = (b - a + L) % L;
      let from = a;
      if (steps > cfg.maxFlips) { from = (b - cfg.maxFlips + L) % L; steps = cfg.maxFlips; }
      return { from, steps, a, start: cell.c * cfg.colStagger + cell.r * cfg.rowStagger + jit[i] };
    });
    const settle = Math.max(...seqs.map(s => s.start + (s.steps + 1) * cfg.flipDuration));
    plan.push({ t0, seqs, pg, prev, settle });
    t0 += settle + cfg.holdDuration;
  });
  const total = t0;

  /* ------------------------- render (pure function of time) ------------------------- */
  function setGlyphs(cell, cur, nxt, p, accent) {
    const key = cur + nxt + (p > 0 ? Math.round(p * 40) : 0) + (accent ? 'a' : '');
    if (key === cell.last) return;
    cell.last = key;
    cell.el.classList.toggle('accent', accent);
    if (p <= 0) {
      cell.top.textContent = cur; cell.bot.textContent = cur;
      cell.ft.style.visibility = 'hidden'; cell.fb.style.visibility = 'hidden';
      return;
    }
    // static halves: next on top (revealed as the flap falls), current on bottom
    cell.top.textContent = nxt; cell.bot.textContent = cur;
    cell.ftT.textContent = cur; cell.fbT.textContent = nxt;
    if (p < 0.5) {
      const k = p / 0.5;                      // top flap falls 0 → -90°
      cell.ft.style.visibility = 'visible';
      cell.ft.style.transform = `rotateX(${-90 * k}deg)`;
      cell.ftS.style.opacity = (0.55 * k).toFixed(3);
      cell.fb.style.visibility = 'hidden';
    } else {
      const k = (p - 0.5) / 0.5;              // bottom flap lands 90 → 0°
      cell.ft.style.visibility = 'hidden';
      cell.fb.style.visibility = 'visible';
      cell.fb.style.transform = `rotateX(${90 * (1 - k)}deg)`;
      cell.fbS.style.opacity = (0.45 * (1 - k)).toFixed(3);
    }
  }

  let lastPage = -1;
  function render(ms) {
    let pi = 0;
    while (pi < plan.length - 1 && ms >= plan[pi + 1].t0) pi++;
    const P = plan[pi];
    const local = ms - P.t0;
    cells.forEach((cell, i) => {
      const s = P.seqs[i];
      const acc = !!(P.pg.accent[cell.r] && P.pg.accent[cell.r][cell.c]);
      const tt = local - s.start;
      if (local < 0 || tt < 0) {                 // not started: previous page glyph
        const prevAcc = !!(P.prev.accent[cell.r] && P.prev.accent[cell.r][cell.c]);
        setGlyphs(cell, P.prev.rows[cell.r][cell.c], '', 0, prevAcc);
        return;
      }
      if (s.steps === 0) { setGlyphs(cell, CS[s.a], '', 0, acc); return; }
      // the first flip goes from the previous glyph to the capped start glyph
      const step = Math.floor(tt / cfg.flipDuration);
      if (step >= s.steps + (s.from !== s.a ? 1 : 0)) { setGlyphs(cell, CS[(s.from + s.steps) % L], '', 0, acc); return; }
      const p = (tt % cfg.flipDuration) / cfg.flipDuration;
      const jump = s.from !== s.a;
      const curI = jump ? (step === 0 ? s.a : (s.from + step - 1) % L) : (s.from + step) % L;
      const nxtI = jump ? (step === 0 ? s.from : (s.from + step) % L) : (s.from + step + 1) % L;
      setGlyphs(cell, CS[curI], CS[nxtI], Math.max(0.001, p), acc);
    });
    if (pi !== lastPage) { lastPage = pi; sr.textContent = P.pg.rows.join(' ').replace(/\s+/g, ' ').trim(); }
  }

  /* ------------------------- clock ------------------------- */
  let clock = 0, playing = false, raf = 0, last = 0, done = false;
  function tick(now) {
    const dt = Math.min(64, now - last); last = now;
    clock += dt;
    if (clock >= total) {
      if (cfg.loop) clock %= total;
      else {
        clock = total; playing = false; render(clock);
        if (!done) { done = true; if (typeof cfg.onComplete === 'function') cfg.onComplete(); }
        return;
      }
    }
    render(clock);
    raf = requestAnimationFrame(tick);
  }
  function start() { cancelAnimationFrame(raf); playing = true; done = false; last = performance.now(); raf = requestAnimationFrame(tick); }
  render(0);

  let ro = null;
  if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(size); ro.observe(container); }

  /* ------------------------- controls ------------------------- */
  let io = null;
  const api = {
    play()    { if (!playing) start(); return api; },
    pause()   { playing = false; cancelAnimationFrame(raf); return api; },
    reset()   { api.pause(); clock = 0; render(0); return api; },
    restart() { clock = 0; render(0); start(); return api; },
    seek(p)   { api.pause(); clock = Math.max(0, Math.min(1, p)) * total; render(clock); return api; },
    /* jump straight to a page's settled state */
    showPage(i) { api.pause(); const P = plan[Math.max(0, Math.min(plan.length - 1, i))]; clock = P.t0 + P.settle; render(clock); return api; },
    get duration() { return total; },
    destroy() {
      api.pause();
      if (io) { io.disconnect(); io = null; }
      if (ro) { ro.disconnect(); ro = null; }
      if (root.parentNode) root.parentNode.removeChild(root);
      return api;
    },
    el: root
  };

  if (cfg.autoplay) {
    if (cfg.playWhenVisible && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { api.play(); io.disconnect(); io = null; } });
      }, { threshold: 0.35 });
      io.observe(root);
    } else {
      api.play();
    }
  }

  return api;
}
