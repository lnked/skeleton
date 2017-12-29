function position(el, relative) {
  if (relative) {
    return el.getBoundingClientRect();
  }
  return { left: el.offsetLeft, top: el.offsetTop };
}
