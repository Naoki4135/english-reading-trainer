// English Reading Trainer - Service Worker
// キャッシュ戦略: stale-while-revalidate（キャッシュを即返しつつ裏で最新を取得）
const CACHE_NAME = 'ert-cache-v11';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './data.js',
  './listening-data.js',
  './vocab-enrichment.js',
  './articles-data.js',
  './drill-data.js',
  './ejdict.txt',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 外部リソース（音声等）はキャッシュしない

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((cached) => {
        const fetchPromise = fetch(req)
          .then((response) => {
            if (response && response.status === 200) cache.put(req, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
