const CACHE_NAME = 'car-bundle-v2';
const urlsToCache = [
  './index.html',
  './sql-wasm.js',
  './sql-wasm.wasm',
  './manifest.json',
  './icon512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});