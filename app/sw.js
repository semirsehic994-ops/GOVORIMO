/* Govorimo service worker: rad bez interneta i automatsko ažuriranje.
   VERSION mijenja tools/release.mjs pri svakoj novoj verziji; promjena ovog fajla pokreće ažuriranje kod svih korisnika. */
const VERSION = '1.3.3';
const CACHE = 'govorimo-' + VERSION;
const CORE = [
  './', 'index.html', 'styles.css', 'app.js', 'i18n.js', 'data/course.js', 'data/daily.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'fonts/nunito-latin-400-normal.woff2', 'fonts/nunito-latin-ext-400-normal.woff2',
  'fonts/nunito-latin-700-normal.woff2', 'fonts/nunito-latin-ext-700-normal.woff2',
  'fonts/nunito-latin-800-normal.woff2', 'fonts/nunito-latin-ext-800-normal.woff2',
  'fonts/nunito-latin-900-normal.woff2', 'fonts/nunito-latin-ext-900-normal.woff2',
  'fonts/baloo-bhaijaan-2-arabic-400-normal.woff2', 'fonts/baloo-bhaijaan-2-arabic-700-normal.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE.map((u) => new Request(u, { cache: 'reload' })));
    // Fotografije: spremi one koje postoje, greške ne zaustavljaju instalaciju.
    try {
      const r = await fetch('photos.json', { cache: 'reload' });
      if (r.ok) {
        await c.put('photos.json', r.clone());
        const photos = await r.json();
        await Promise.all(Object.values(photos).map((p) => c.add(new Request(p.file, { cache: 'reload' })).catch(() => {})));
      }
    } catch (err) { /* bez fotografija */ }
  })());
});

self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('govorimo-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // version.json i feedback.json uvijek s mreže (bez interneta: posljednja sačuvana kopija)
  if (url.pathname.endsWith('/version.json') || url.pathname.endsWith('/feedback.json')) {
    const name = url.pathname.split('/').pop();
    e.respondWith(fetch(e.request).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(name, copy)); } return res; }).catch(() => caches.match(name)));
    return;
  }
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(e.request);
      if (res.ok && (url.pathname.includes('/img/') || url.pathname.endsWith('photos.json'))) {
        const c = await caches.open(CACHE); c.put(e.request, res.clone());
      }
      return res;
    } catch (err) {
      if (e.request.mode === 'navigate') return caches.match('index.html');
      throw err;
    }
  })());
});
