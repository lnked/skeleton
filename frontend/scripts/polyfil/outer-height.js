function outerHeight(el, margin) {
  if (margin) {
    let height = el.offsetHeight;
    const style = el.currentStyle || getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }
  return el.offsetHeight;
}

// outerHeight(el);

function outerWidth(el, margin) {
  if (margin) {
    let width = el.offsetWidth;
    const style = el.currentStyle || getComputedStyle(el);

    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  }
  return el.offsetWidth;
}

outerWidth(el);
