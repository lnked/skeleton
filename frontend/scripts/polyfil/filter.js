function filter(selector, filterFn) {
  const elements = document.querySelectorAll(selector);
  const out = [];
  for (let i = elements.length; i--;) {
    if (filterFn(elements[i])) {
      out.unshift(elements[i]);
    }
  }
  return out;
}

// filter(selector, filterFn);
