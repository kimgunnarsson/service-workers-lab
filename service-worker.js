var CACHE_NAME = 'demo-site-cache-v1';
var urlsToCache = ['arb-file.txt'];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
		.open(CACHE_NAME)
		.then(function(cache){
			console.log('Open cache');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function(event) {
	var whitelist = ['file-cache-v1'];
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promises.all(
				cacheNames.map(function(cacheName) {
					if(whitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				if(response) {
					return response;
				}

				var fetchRequest = event.request.clone();
				return fetch(fetchRequest).then(
					function(response) {
						if(!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						var responseForCache = response.clone();
						caches.open(CACHE_NAME)
						.then(function(cache) {
							cache.put(event.request, responseForCache);
						});

						return response;
					}
				);
			})
	);
});