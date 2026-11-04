/* Radio PWA — app-shell-only caching; never cache external live streams. */
const CACHE_NAME = 'radio-shell-2026-11-v1';
const BASE = new URL('./', self.location.href);
const INDEX = new URL('index.html', BASE).href;
const PRECACHE = ['index.html', 'radio.webp', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png'].map(path => new URL(path, BASE).href);
const STATIC_PATHS = new Set(PRECACHE);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('radio-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Do not intercept the Radio Browser API, radio streams, or remote station artwork.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          event.waitUntil(cache.put(INDEX, response.clone()));
        }
        return response;
      } catch {
        return (await caches.match(INDEX)) || Response.error();
      }
    })());
    return;
  }

  if (STATIC_PATHS.has(url.href)) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
  }
});
