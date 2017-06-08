// 'use strict';

function declOfNum(n, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    n = Math.abs(n);
    return [n, titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]]].join(' ');
}

// var i = 1;
// setTimeout(function run() {
//     func(i);
//     setTimeout(run, 100);
// }, 100);

// ;((d => {
//     function template(id, data) {
//         if (d.getElementById(id) !== null) {
//             return Template7.compile(d.getElementById(id).innerHTML)(data || {});
//         }
//         return '';
//     }
//     window.template = template;
// }))(document);

// const addEvent = ((() => {
//    const filter = (el, type, fn) => {
//       for (let i = 0, len = el.length; i < len; i++) {
//          addEvent(el[i], type, fn);
//       }
//    };
//    if (document.addEventListener) {
//       return (el, type, fn) => {
//          if (el && el.nodeName || el === window) {
//             el.addEventListener(type, fn, false);
//          } else if (el && el.length) {
//             filter(el, type, fn);
//          }
//       };
//    }
 
//    return (el, type, fn) => {
//       if (el && el.nodeName || el === window) {
//          el.attachEvent(`on${type}`, () => fn.call(el, window.event));
//       } else if (el && el.length) {
//          filter(el, type, fn);
//       }
//    };
// }))();

// // addEvent(document.getElementsByTagName('a'), 'click', fn);

// const $ = el => document.querySelectorAll(el);

// // $('.box');

// const lazyload = (container, settings) => {
//    const lazyClass = 'js-lazyload-images';
//    require(['jquery', 'lib/jquery.lazyload'], $ => {
//       const node = $(container);
//       const $lazyNode = $(`.${lazyClass}`, node);
//       $lazyNode.lazyload(settings).removeClass(lazyClass);
//       node.scroll();
//    });
// };

// /*
// window.addEventListener('popstate', e => {
//    const state = e.state;
//    if(!state) return;
//    if(state.layer) {
//       create_layer(state.layer, JSON.parse(state.settings));
//    }
// }, false);
// */

// function fullPresent(elem)
// {
//   var docViewTop = $(window).scrollTop(),
//   docViewBottom = docViewTop + $(window).height(),
//   elemTop = $(elem).offset().top,
//   elemBottom = elemTop + $(elem).height();

//   return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }


// function youTubeGetId(url) {
//     const expression = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be[.]?\/|youtube\.com[.]?\/(?:embed\/|v\/|watch\/?\?(?:\S+=\S*&)*v=))([\w-]{11})\S*$/;
//     return url.match(expression) ? RegExp.$1 : undefined;
// }

// function isInt(n){
//     return Number(n) === n && n % 1 === 0;
// }

// function isFloat(n){
//     return Number(n) === n && n % 1 !== 0;
// }
