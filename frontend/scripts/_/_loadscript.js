// // Load a single JavaScript file and execute a callback when it finishes.
// LazyLoad.js('http://example.com/foo.js', function () {
//   alert('foo.js has been loaded');
// });

// // Load multiple JS files and execute a callback when they've all finished.
// LazyLoad.js(['foo.js', 'bar.js', 'baz.js'], function () {
//   alert('all files have been loaded');
// });

// // Load a CSS file and pass an argument to the callback function.
// LazyLoad.css('foo.css', function (arg) {
//   alert(arg);
// }, 'foo.css has been loaded');

// // Load a CSS file and execute the callback in a different scope.
// LazyLoad.css('foo.css', function () {
//   alert(this.foo); // displays 'bar'
// }, null, {foo: 'bar'});
