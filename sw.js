self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If we are online, save a copy of the file to the phone
        const responseClone = response.clone();
        caches.open('app-cache').then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // If we are offline, pull the file from the phone's memory
        return caches.match(event.request);
      })
  );
});     