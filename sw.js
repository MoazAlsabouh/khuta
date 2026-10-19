const CACHE_NAME = 'khuta-pwa-v7';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './subjects.html',
  './subject.html',
  './weekly.html',
  './exams.html',
  './channels.html',
  './tools.html',
  './admin.html',
  './login.html',
  './register.html',
  './forgot-password.html',
  './reset-password.html',
  './verify.html',
  './style.css',
  './login.css',
  './frontend.js',
  './firebase-init.js',
  './login.js',
  './register.js',
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
            console.log('Deleting obsolete cache:', key);
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

  // Network-First for HTML navigation / document requests (guarantees fresh updates when online)
  if (req.mode === 'navigate' || (req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to cache when offline
        return caches.match(req).then((cached) => cached || caches.match('./index.html'));
      })
    );
    return;
  }

  // Stale-While-Revalidate for other static assets (CSS, JS, images, SVG)
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
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
