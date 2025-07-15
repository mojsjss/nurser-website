self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("nursery-cache").then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./MOJS/v mohamed.js",
        "./validate.js"
      ]);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
