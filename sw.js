const CACHE = 'bills-tracker-v1';
const SHELL = ['/', '/index.html', '/manifest.json', '/firebase-config.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for Firebase and CDN resources
  if (e.request.url.includes('firebase') ||
      e.request.url.includes('googleapis') ||
      e.request.url.includes('cdnjs') ||
      e.request.url.includes('jsdelivr')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // Cache-first for app shell
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      });
    }).catch(() => caches.match('/index.html'))
  );
});
