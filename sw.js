const CACHE_NAME = 'khuta-pwa-v1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './subjects.html',
  './subject.html',
  './weekly.html',
  './exams.html',
  './channels.html',
  './tools.html',
  './login.html',
  './register.html',
  './forgot-password.html',
  './reset-password.html',
  './admin.html',
  './style.css',
  './login.css',
  './frontend.js',
  './firebase-init.js',
  './manifest.json',
  './icon.svg',
  './logo.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests and external API / Firestore / Auth calls
  if (req.method !== 'GET') return;
  if (url.origin !== self.location.origin) {
    // For external static CDN files (like Firebase JS or Google Fonts)
    if (url.hostname.includes('gstatic.com') || url.hostname.includes('googleapis.com')) {
      event.respondWith(
        caches.match(req).then((cached) => {
          return cached || fetch(req).then((res) => {
            if (res.status === 200) {
              const resClone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
            }
            return res;
          }).catch(() => cached);
        })
      );
    }
    return;
  }

  // Same-origin requests: Stale-While-Revalidate with offline fallback
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });
        }
        return networkResponse;
      }).catch((fetchErr) => {
        // If offline and requesting an HTML page, fallback to cached page or index
        if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
          return cachedResponse || caches.match('./index.html');
        }
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
