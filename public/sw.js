const expectedCaches = [ 'static-v1' ]

const urlsToCache = ["/appShell.html"];

const self = this;


//1. Instalation of SW
  self.addEventListener('install', (event) => {
     self.skipWaiting();
      event.waitUntil(
         caches.open("static-v1")
          .then( cache => cache.addAll(urlsToCache)
              .then(() => console.log("caches are ready..."))
           )
      )
  })



// 2. Listen for requests

 self.addEventListener('fetch', (event) => {
 event.respondWith(
    caches.match(event.request)
     .then(response => response || caches.match("/appShell.html"))
     .catch( () => {
            return caches.match("/appShell.html")
     })
 )
 });




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