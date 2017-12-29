function off(el) {
  function removeEventListener(el, eventName, handler) {
    if (el.removeEventListener) el.removeEventListener(eventName, handler);
    else el.detachEvent(`on${eventName}`, handler);
  }

  removeEventListener(el, eventName, handler);
}

function on() {
  function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent(`on${eventName}`, () => {
        handler.call(el);
      });
    }
  }

  addEventListener(el, eventName, handler);
}

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState != 'loading') fn();
    });
  }
}

function trigger() {
  if (document.createEvent) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    el.dispatchEvent(event);
  } else {
    el.fireEvent('onchange');
  }
}
