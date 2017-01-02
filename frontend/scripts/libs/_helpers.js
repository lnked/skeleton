const addEvent = ((() => {
   const filter = (el, type, fn) => {
      for (let i = 0, len = el.length; i < len; i++) {
         addEvent(el[i], type, fn);
      }
   };
   if (document.addEventListener) {
      return (el, type, fn) => {
         if (el && el.nodeName || el === window) {
            el.addEventListener(type, fn, false);
         } else if (el && el.length) {
            filter(el, type, fn);
         }
      };
   }
 
   return (el, type, fn) => {
      if (el && el.nodeName || el === window) {
         el.attachEvent(`on${type}`, () => fn.call(el, window.event));
      } else if (el && el.length) {
         filter(el, type, fn);
      }
   };
}))();

// addEvent(document.getElementsByTagName('a'), 'click', fn);

const $ = el => document.querySelectorAll(el);

// $('.box');

var lazyload = function(container, settings) {
   var lazyClass = 'js-lazyload-images';
   require(['jquery', 'lib/jquery.lazyload'], function($) {
      var node = $(container);
      var $lazyNode = $('.' + lazyClass, node);
      $lazyNode.lazyload(settings).removeClass(lazyClass);
      node.scroll();
   });
};

/*
window.addEventListener('popstate', function(e){
   var state = e.state;
   if(!state) return;
   if(state.layer) {
      create_layer(state.layer, JSON.parse(state.settings));
   }
}, false);
*/