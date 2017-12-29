function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    const classes = el.className.split(' ');
    let existingIndex = -1;
    for (let i = classes.length; i--;) {
      if (classes[i] === className) existingIndex = i;
    }

    if (existingIndex >= 0) classes.splice(existingIndex, 1);
    else classes.push(className);

    el.className = classes.join(' ');
  }
}
