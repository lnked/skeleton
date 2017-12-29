WebFontConfig = {
  google: {
    families: [
      'Open+Sans:400,600,700:cyrillic-ext',
      'Open+Sans+Condensed:700:cyrillic-ext'
    ]
  }
};

(function(d) {
  let wf = d.createElement('script'),
    s = d.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  wf.async = true;
  s.parentNode.insertBefore(wf, s);
}(document));
