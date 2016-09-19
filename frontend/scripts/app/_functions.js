"use strict";

function sprintf(v) {
  var split = v.toString().split('.'), pad = "00", time = [], x = null;

  for (x in split) {
    time.push(pad.substring(0, 2 - split[x].toString().length) + split[x]);
  }

  return time.join('.');
}

var load = (function() {
  // Function which returns a function: https://davidwalsh.name/javascript-functions
  function _load(tag) {
    return function(url) {
      // This promise will be used by Promise.all to determine success or failure
      return new Promise(function(resolve, reject) {
        var element = document.createElement(tag);
        var parent = 'body';
        var attr = 'src';

        // Important success and error for the promise
        element.onload = function() {
          resolve(url);
        };
        element.onerror = function() {
          reject(url);
        };

        // Need to set different attributes depending on tag type
        switch(tag) {
          case 'script':
            element.async = true;
            break;
          case 'link':
            element.type = 'text/css';
            element.rel = 'stylesheet';
            attr = 'href';
            parent = 'head';
        }

        // Inject into document to kick off loading
        element[attr] = url;
        document[parent].appendChild(element);
      });
    };
  }
  
  return {
    css: _load('link'),
    js: _load('script'),
    img: _load('img')
  }
})();

// Usage:  Load different file types with one callback
Promise.all([
    load.js('lib/highlighter.js'), 
    load.js('lib/main.js'), 
    load.css('lib/highlighter.css'),
    load.img('images/logo.png')
  ]).then(function() {
    console.log('Everything has loaded!');
  }).catch(function() {
    console.log('Oh no, epic failure!');
  });
