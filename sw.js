const CACHE_NAME = 'stylegram-pwa-v5';
const CORE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './styles.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './js/fonts.js',
  './js/textStyles.js',
  './js/bgStyles.js',
  './js/renderer.js',
  './js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isLocalCode =
    event.request.mode === 'navigate' ||
    (url.origin === self.location.origin &&
      /\.(html|js|css|json)$/i.test(url.pathname));

  // Network-First for HTML/JS/CSS/JSON so code updates apply immediately
  if (isLocalCode) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => {
          if (response && response.status === 200) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return response;
        })
        .catch(async () => (await caches.match(event.request)) || caches.match('./offline.html'))
    );
    return;
  }

  // Cache-First with background refresh for fonts & images
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && (response.status === 200 || response.type === 'opaque')) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
