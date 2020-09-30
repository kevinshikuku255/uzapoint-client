console.log("service worker")

const expectedCaches = [
   'static-v1'
]

const urlsToCache = ["/offline.html", "/index.html"];

const self = this;
//events
//1. Instalation of SW
  self.addEventListener('install', (event) => {
      event.waitUntil(
         caches.open("static-v1")
          .then( cache => cache.addAll(urlsToCache))
      )
  })



//2. Listen for requests
 self.addEventListener('fetch', (event) => {

const url = new URL(event.request.url);

 event.respondWith(
    caches.match(event.request)
     .then(response => response || fetch(event.request))
     .catch( () => {
        if(event.request.mode == "navigate"){
            return caches.match("/offline.html")
        }
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