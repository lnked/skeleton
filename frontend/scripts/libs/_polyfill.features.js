// Create a list of the features this browser needs.
// Beware of overly simplistic detects!
var features = [];
('Promise' in window) || features.push('Promise');
('IntersectionObserver' in window) || features.push('IntersectionObserver');
('after' in Element.prototype) || features.push('Element.prototype.after');

// If any features need to be polyfilled, construct
// a script tag to load the polyfills and append it
// to the document
if (features.length) {
  var s = document.createElement('script');

  // Include a `ua` argument set to a supported browser to skip UA identification
  // (improves response time) and avoid being treated as unknown UA (which would
  // otherwise result in no polyfills, even with `always`, if UA is unknown)
  s.src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features='+features.join(',')+'&flags=gated,always&ua=chrome/50&callback=main';
  s.async = true;
  document.head.appendChild(s);
} else {

    // If no polyfills are required, invoke the app
    // without delay
    main();
}

function main() {
    console.log('Now to do the cool stuff...');
}
