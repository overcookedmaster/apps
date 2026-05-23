const CACHE = 'clock-teacher-v1';
const URLS  = ['/toy-clock/', '/toy-clock/index.html', '/toy-clock/manifest.json'];

self.addEventListener('install', e => 
  e.waitUntil( 
    caches.open(CACHE).then(c => c.addAll(URLS))
  )
);

self.addEventListener('activate', e => 
  e.waitUntil( 
    caches.keys().then(keys => Promise.all( 
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  )
);

self.addEventListener('fetch', e => 
  e.respondWith(
    caches.match(e.request)
      .then(r => r || fetch(e.request))
  )
);
