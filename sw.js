self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch',(event) =>{
  if(event.request.url.includes('firestore.googleapis.com')||
event.request.url.includes('identitytoolkit.googleapis.com')||
event.request.url.includes('gstatic.com')){
  return;
}
event.respondWith(
  fetch(event.request)
  .then((response)=>{
    const responseClone = response.clone();
    caches.open('app-cache').then((cache)=>{
      cache.put(event.request,responseClone);
    });
    return response;
  })
  .catch(()=>{
    return caches.match(event.request);
  })
);
});