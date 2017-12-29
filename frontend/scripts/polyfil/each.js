function forEachElement(selector, fn) {
  const elements = document.querySelectorAll(selector);

  for (let i = 0; i < elements.length; i++) {
    fn(elements[i], i);
  }
}

// forEachElement(selector, function(el, i){

// });

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) fn(array[i], i);
}

// forEach(array, function(item, i){

// });

function map(arr, fn) {
  const results = [];
  for (let i = 0; i < arr.length; i++) results.push(fn(arr[i], i));
  return results;
}

map(array, (value, index) => {});
