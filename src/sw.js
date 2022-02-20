/**
 * My Service Worker
 */

/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const DEBUG = false;

const OFFLINE_URL = 'offline.html';
const CACHE_NAME = 'v10';

self.addEventListener('install', (e) => {
  if (DEBUG) console.log('[Serviceworker] installed');

  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      })
      .then(() => {
        if (DEBUG) console.log('Cached assets: ', OFFLINE_URL);
      })
      .catch((error) => console.log(error)),
  );
});

self.addEventListener('activate', (e) => {
  if (DEBUG) console.log('[Serviceworker] is active & ready to handle fetches.');

  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName.indexOf(CACHE_NAME) === 0) {
          return null;
        }
        return caches.delete(cacheName);
      }),
    )),
  );
});

self.addEventListener('fetch', (e) => {
  if (DEBUG) console.log('[Serviceworker] fetching', e.request.url);

  e.respondWith(
    fetch(e.request).catch((error) => {
      if (DEBUG) console.log('Fetch failes; returning offline page instead', error);
      return caches.match(OFFLINE_URL);
    }),
  );
});
