isArray = Array.isArray || function(arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

isArray(arr);

// 
// 
// 
var parseHTML = function(str) {
  var el = document.createElement('div');
  el.innerHTML = str;
  return el.children;
};

parseHTML(htmlString);

// 
// 
// 
// 
function trim () {
    string.replace(/^\s+|\s+$/g, '');    
}
