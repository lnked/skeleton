var deepExtend = function(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];

    if (!obj) continue;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') { out[key] = deepExtend(out[key], obj[key]); } else out[key] = obj[key];
      }
    }
  }

  return out;
};

deepExtend({}, objA, objB);

const extend = function(out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    for (const key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
    }
  }

  return out;
};

extend({}, objA, objB);
