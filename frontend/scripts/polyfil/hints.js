function add_hint(type, url) {
  if (!type || !url) return;

  const el = document.createElement('link');
  el.setAttribute('rel', type);
  el.setAttribute('href', url);
  document.getElementsByTagName('head')[0].appendChild(el);
}

// add_hind('prefetch', 'http://ya.ru');

// document.addEventListener("mousemove", function (e) {
//     if (!e.target.href ||
//         e.target.href.indexOf(location.host) == -1 ||
//         e.target.hintAdded) return;

//     // функция описана выше
//     add_hint('prerender', e.target.href);
//     e.target.hintAdded =  true;
// });

// (function () {
//     var o = document.createElement('object'),
//         url = "/style/next.css";

//     if (navigator.appName.indexOf('Microsoft') === 0) {
//         new Image().src = url;
//     } else {
//         o.data = url;
//         o.width  = 0;
//         o.height = 0;

//         document.body.appendChild(o);
//     }
// })();
