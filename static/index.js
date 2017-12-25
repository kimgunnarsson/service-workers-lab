if('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker
			.register('../service-worker.js')
			.then(function(registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function(err) {
				console.log('ServiceWorker registration failed: ', err);
			});

			navigator.serviceWorker
				.register('../scoped-test/service-worker.js')
				.then(function(registration) {
					console.log('ServiceWorker registration successful with scope: ', registration.scope);
				}, function(err) {
					console.log('ServiceWorker registration failed: ', err);
				});

	});
}