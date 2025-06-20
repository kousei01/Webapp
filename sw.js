const CACHE_NAME = 'shift-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    'https://unpkg.com/dexie@3/dist/dexie.js'
];

// インストール時にキャッシュを作成
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// fetchイベントでキャッシュを返す
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // キャッシュがあればそれを返す
                if (response) {
                    return response;
                }
                // なければネットワークから取得
                return fetch(event.request);
            })
    );
});