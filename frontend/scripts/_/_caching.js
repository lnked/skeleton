// /*
//  * CHALLANGE:
//  * Cache `index.html` file using service worker.
//  *
//  * This bit of code is included in <script> tag of index.html
//  * if (navigator.serviceWorker) {
//  *   navigator.serviceWorker.register('serviceworker.js', {scope: '/'})
//  * }
//  *
//  */

// var CACHE_NAME = 'version_01'
// var URLS = [               // Add URL you want to cache in this list.
//   '/',                     // If you have separate JS/CSS files,
//   '/index.html'            // add path to those files here
// ]

// // Respond with cached resources
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (request) {
//       return request || fetch(event.request)
//     })
//   )
// })

// // Cache resources
// self.addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(URLS)
//     })
//   )
// })

// // Delete outdated caches
// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     caches.keys().then(function (keyList) {
//       return Promise.all(keyList.map(function (key, i) {
//         if (key !== CACHE_NAME) {
//           return caches.delete(keyList[i])
//         }
//       }))
//     })
//   )
// })

// // ------------------------------ //

// var filesToCache = [
//   '.',
//   'style/main.css',
//   'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
//   'images/still_life-1600_large_2x.jpg',
//   'images/still_life-800_large_1x.jpg',
//   'images/still_life_small.jpg',
//   'images/still_life_medium.jpg',
//   'index.html',
//   'pages/offline.html',
//   'pages/404.html'

// ];

// var staticCacheName = 'pages-cache-v1';

// self.addEventListener('install', function(event) {
//   console.log('Attempting to install service worker and cache static assets');
//   event.waitUntil(
//     caches.open(staticCacheName)
//     .then(function(cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// //
// //
// //
// //

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return cache.addAll(
//         [
//           '/css/bootstrap.css',
//           '/css/main.css',
//           '/js/bootstrap.min.js',
//           '/js/jquery.min.js',
//           '/offline.html'
//         ]
//       );
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request));
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(fetch(event.request));
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   );
// });

// document.querySelector('.cache-article').addEventListener('click', function(event) {
//   event.preventDefault();
//   var id = this.dataset.articleId;
//   caches.open('mysite-article-' + id).then(function(cache) {
//     fetch('/get-article-urls?id=' + id).then(function(response) {
//       // /get-article-urls returns a JSON-encoded array of
//       // resource URLs that a given article depends on
//       return response.json();
//     }).then(function(urls) {
//       cache.addAll(urls);
//     });
//   });
// });

// var networkDataReceived = false;

// startSpinner();

// // fetch fresh data
// var networkUpdate = fetch('/data.json').then(function(response) {
//   return response.json();
// }).then(function(data) {
//   networkDataReceived = true;
//   updatePage(data);
// });

// // fetch cached data
// caches.match('/data.json').then(function(response) {
//   if (!response) throw Error("No data");
//   return response.json();
// }).then(function(data) {
//   // don't overwrite newer network data
//   if (!networkDataReceived) {
//     updatePage(data);
//   }
// }).catch(function() {
//   // we didn't get cached data, the network is our last hope:
//   return networkUpdate;
// }).catch(showErrorMessage).then(stopSpinner());

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return fetch(event.request).then(function(response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     // Try the cache
//     caches.match(event.request).then(function(response) {
//       // Fall back to network
//       return response || fetch(event.request);
//     }).catch(function() {
//       // If both fail, show a generic fallback:
//       return caches.match('/offline.html');
//       // However, in reality you'd have many different
//       // fallbacks, depending on URL & headers.
//       // Eg, a fallback silhouette image for avatars.
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     // Try the cache
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request).then(function(response) {
//         if (response.status === 404) {
//           return caches.match('pages/404.html');
//         }
//         return response
//       });
//     }).catch(function() {
//       // If both fail, show a generic fallback:
//       return caches.match('/offline.html');
//     })
//   );
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           // Return true if you want to remove this cache,
//           // but remember that caches are shared across
//           // the whole origin
//         }).map(function(cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });
