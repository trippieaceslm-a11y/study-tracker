const CACHE_NAME = 'study-tracker-v10'; // Change this number every time you update!
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install event: save files to cache
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event: serve from cache if offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).catch(() => {
        // If both cache and network fail, you could return a fallback page here
        console.log("Offline and resource not in cache");
      });
    })
  );
});