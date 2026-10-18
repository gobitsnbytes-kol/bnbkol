// History-API router: clean URLs → HTML fragments in /pages, swapped into the shell.
export const ROUTES = [
  { path: '/',        page: 'home',    name: 'Home',    bn: 'শুরু',     no: '01' },
  { path: '/about',   page: 'about',   name: 'About',   bn: 'আমরা',     no: '02' },
  { path: '/events',  page: 'events',  name: 'Events',  bn: 'ইভেন্ট',    no: '03' },
  { path: '/join',    page: 'join',    name: 'Join',    bn: 'যোগ দাও',  no: '04' },
  { path: '/contact', page: 'contact', name: 'Contact', bn: 'নমস্কার',   no: '05' },
];
const NOT_FOUND = { path: null, page: '404', name: 'Lost', bn: 'ভুল পথ', no: '404' };

const clean = p => p.replace(/\/index\.html$/, '/').replace(/(.)\/+$/, '$1');
export const routeFor = pathname => ROUTES.find(r => r.path === clean(pathname)) || NOT_FOUND;
export const nextRoute = route => ROUTES[(ROUTES.indexOf(route) + 1) % ROUTES.length];

const cache = new Map();
function load(route) {
  if (!cache.has(route.page)) {
    const req = fetch(`/pages/${route.page}.html`).then(r => {
      if (!r.ok) throw new Error(`${r.status} ${route.page}`);
      return r.text();
    });
    req.catch(() => cache.delete(route.page));
    cache.set(route.page, req);
  }
  return cache.get(route.page);
}

/**
 * hooks.leave(route)                  → Promise, runs while the next page downloads
 * hooks.enter(route, html, { first, hash, y })  → Promise, swaps and reveals
 * hooks.scrollTo(hash)                → same-page anchor jumps
 */
export function startRouter(hooks) {
  let current = null, busy = false, queued = null;
  history.scrollRestoration = 'manual';

  async function go(href, { push = true, y = 0 } = {}) {
    const url = new URL(href, location.href);
    const route = routeFor(url.pathname);
    if (current && route === current) {
      if (push) history.pushState({ y: 0 }, '', url.pathname + url.hash);
      hooks.scrollTo(url.hash);
      return;
    }
    if (busy) { queued = url.href; return; }
    busy = true;
    if (push) {
      history.replaceState({ y: scrollY }, '');
      history.pushState({ y: 0 }, '', url.pathname + url.search + url.hash);
    }
    const first = !current;
    try {
      const [, html] = await Promise.all([first ? null : hooks.leave(route), load(route)]);
      current = route;
      await hooks.enter(route, html, { first, hash: url.hash, y });
    } catch (err) {
      console.error(err);
      if (!first) location.assign(url.href); // fall back to a full load
    } finally {
      busy = false;
    }
    // a click or back/forward press that landed mid-transition
    if (queued) { const next = queued; queued = null; go(next); }
    else if (routeFor(location.pathname) !== current) go(location.href, { push: false, y: history.state?.y || 0 });
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /\.\w+$/.test(url.pathname)) return;
    e.preventDefault();
    go(url.href);
  });

  // warm the cache on intent
  document.addEventListener('pointerover', e => {
    const a = e.target.closest?.('a[href^="/"]');
    if (a) load(routeFor(new URL(a.href).pathname)).catch(() => {});
  }, { passive: true });

  addEventListener('popstate', e => { queued = null; go(location.href, { push: false, y: e.state?.y || 0 }); });

  go(location.href, { push: false });
  return { go };
}
