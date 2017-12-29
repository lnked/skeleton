function next(el) {
  // nextSibling can include text nodes
  function nextElementSibling(el) {
    do {
      el = el.nextSibling;
    } while (el && el.nodeType !== 1);
    return el;
  }

  return el.nextElementSibling || nextElementSibling(el);
}

function prev(el) {
  // prevSibling can include text nodes
  function previousElementSibling(el) {
    do {
      el = el.previousSibling;
    } while (el && el.nodeType !== 1);
    return el;
  }

  return el.previousElementSibling || previousElementSibling(el);
}
