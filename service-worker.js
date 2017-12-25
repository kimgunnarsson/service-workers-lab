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