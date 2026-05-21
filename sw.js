const CACHE = 'lyon-mouvement-v1';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(url.hostname.includes('workers.dev')||url.hostname.includes('grandlyon')||url.hostname.includes('openstreetmap')||url.hostname.includes('unpkg')||url.hostname.includes('fonts')||url.hostname.includes('data.gouv')) { e.respondWith(fetch(e.request)); return; }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});
