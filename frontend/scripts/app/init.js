;(function(cb) {
   return (function(callback){
      if(callback && typeof callback === 'function'){
         if((!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie') !== 'ie') {
            document.addEventListener("DOMContentLoaded", function() {
               return callback();
            });
         } else {
            document.attachEvent("onreadystatechange", function() {
               if(document.readyState === "complete") {
                  return callback();
               }
            });
         }
      } else {
         console.error('The callback is not a function!');
      }
   })(cb);
})(function(){app.init()});