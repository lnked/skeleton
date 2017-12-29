function text(el, content) {
  if (content) {
    if (el.textContent !== undefined) el.textContent = content;
    else el.innerText = content;
  } else {
    return el.textContent || el.innerText;
  }
}
