const CACHE_NAME = 'car-bundle-v4';
const urlsToCache = [
  './index.html',
  './sql-wasm.js',
  './sql-wasm.wasm'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Navigare (deschidere app) → întotdeauna index.html din cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(response => response || fetch(event.request))
    );
    return;
  }
  // Restul resurselor: cache-first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
