const CACHE_NAME = 'cmorton-blog-v1';
const urlsToCache = [
  '/',
  '/about/',
  '/assets/main.css',
  '/manifest.json'
];

// Install event - cache key resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim clients immediately after cleanup
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Only cache GET requests for html, css, js, and images
          if (event.request.method === 'GET') {
            const url = new URL(event.request.url);
            const extension = url.pathname.split('.').pop();
            const cacheableExtensions = ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'json'];
            
            if (cacheableExtensions.includes(extension) || !extension) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
          }

          return response;
        }).catch(() => {
          // Network request failed, try to serve offline page if available
          return caches.match('/offline.html');
        });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
