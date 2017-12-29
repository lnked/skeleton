WebFontConfig = {
  google: {
    families: [
      'Roboto Condensed:700:cyrillic',
      'Roboto:300,400,500,700,900:cyrillic-ext'
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

/*
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
    WebFont.load({
        google: {
            families: ['Droid Sans', 'Droid Serif']
            families: ['Open Sans Condensed:300,700']
            families: ['Open Sans Condensed:300,700:latin,greek']
            families: ['My Font', 'My Other Font:n4,i4,n7'],
            text: 'abcdefghijklmnopqrstuvwxyz!'
        },
        timeout: 2000
    });
</script>

<script>
   WebFontConfig = {
      typekit: { id: 'xxxxxx' }
   };

    WebFontConfig = {
        loading: function() {},
        active: function() {},
        inactive: function() {},
        fontloading: function(familyName, fvd) {},
        fontactive: function(familyName, fvd) {},
        fontinactive: function(familyName, fvd) {}
    };

   (function(d) {
      var wf = d.createElement('script'), s = d.scripts[0];
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
      wf.async = true;
      s.parentNode.insertBefore(wf, s);
   })(document);
</script>
*/
