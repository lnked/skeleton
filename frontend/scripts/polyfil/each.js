function forEachElement(selector, fn) {
    var elements = document.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
        fn(elements[i], i);
    }
}

// forEachElement(selector, function(el, i){

// });

function forEach(array, fn) {
  for (var i = 0; i < array.length; i++)
    fn(array[i], i);
}

// forEach(array, function(item, i){

// });

function map(arr, fn) {
  var results = [];
  for (var i = 0; i < arr.length; i++)
    results.push(fn(arr[i], i));
  return results;
}

map(array, function(value, index){

});