const APP_VERSION = '1.0.9';
const CACHE_NAME = `resuspro-bloodgas-v${APP_VERSION}`;
const OFFLINE_INDEX = './index.html';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './logo.png',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(APP_SHELL.map(async url => {
      const response = await fetch(new Request(`${url}?v=${APP_VERSION}`, { cache: 'reload' }));
      if (response.ok) await cache.put(url, response);
    }));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) client.postMessage({ type: 'APP_UPDATED', version: APP_VERSION });
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Always ask the network first. The cache is only an offline fallback.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: 'no-store' });
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        const cacheKey = request.mode === 'navigate' ? OFFLINE_INDEX : request;
        await cache.put(cacheKey, response.clone());
      }
      return response;
    } catch (_) {
      const cached = await caches.match(request.mode === 'navigate' ? OFFLINE_INDEX : request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        return new Response('BloodGas is offline and has not yet cached this version.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
      throw _;
    }
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
