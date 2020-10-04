const expectedCaches = [
   'static-v1'
]

const urlsToCache = ["/appShell.html"];

const self = this;
//events
//1. Instalation of SW
  self.addEventListener('install', (event) => {
   //   self.skipWaiting();
      event.waitUntil(
         caches.open("static-v1")
          .then( cache => cache.addAll(urlsToCache))
      )
  })



// 2. Listen for requests
 self.addEventListener('fetch', (event) => {
 event.respondWith(
    caches.match(event.request)
     .then(response => response || fetch(event.request))
     .catch( () => {
            return caches.match("/appShell.html")
     })
 )
 });




// self.addEventListener('fetch', function(event) {

//     event.respondWith(async function() {
//         const cache = await caches.open('cache-v1');
//         console.log(cahce)
//         const cachedResponse = await cache.match(event.request);
//         const fetchPromise = fetch(event.request);

//         const networkResponse = await fetchPromise;
//         console.log(networkResponse)
//         event.waitUntil(async function () {

//             // Update the cache with a newer version
//             await cache.put(event.request, networkResponse.clone());
//         }());

//         // The response contains cached data, if available
//         return cachedResponse || networkResponse
//     }());
// });




































//3. Activate the srvice worker
 self.addEventListener('activate', (event)=>{

 event.waitUntil(
    caches.keys().then(cacheNames => {
       return Promise.all(
          cacheNames.map(cacheName => {
             if(!expectedCaches.includes(cacheName)){
                return caches.delete(cacheName);
             }
          })
       )
    })
  )
 });