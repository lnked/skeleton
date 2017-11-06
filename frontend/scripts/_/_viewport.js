// function inViewport (el) {

//     var r, html;
//     if ( !el || 1 !== el.nodeType ) { return false; }
//     html = document.documentElement;
//     r = el.getBoundingClientRect();

//     return ( !!r
//       && r.bottom >= 0
//       && r.right >= 0
//       && r.top <= html.clientHeight
//       && r.left <= html.clientWidth
//     );

// }

// function elementInViewport(el) {
//     var top = el.offsetTop;
//     var left = el.offsetLeft;
//     var width = el.offsetWidth;
//     var height = el.offsetHeight;

//     while(el.offsetParent) {
//         el = el.offsetParent;
//         top += el.offsetTop;
//         left += el.offsetLeft;
//     }

//     return (
//         top >= window.pageYOffset &&
//         left >= window.pageXOffset &&
//         (top + height) <= (window.pageYOffset + window.innerHeight) &&
//         (left + width) <= (window.pageXOffset + window.innerWidth)
//     );
// }

// function elementInViewport2(el) {
//     var top = el.offsetTop;
//     var left = el.offsetLeft;
//     var width = el.offsetWidth;
//     var height = el.offsetHeight;

//     while(el.offsetParent) {
//         el = el.offsetParent;
//         top += el.offsetTop;
//         left += el.offsetLeft;
//     }

//     return (
//         top < (window.pageYOffset + window.innerHeight) &&
//         left < (window.pageXOffset + window.innerWidth) &&
//         (top + height) > window.pageYOffset &&
//         (left + width) > window.pageXOffset
//     );
// }

// // --------------------------------------------------------
// // --------------------------------------------------------
// // --------------------------------------------------------

// function isElementInViewport (el) {

//     //special bonus for those using jQuery
//     if (typeof jQuery === "function" && el instanceof jQuery) {
//         el = el[0];
//     }

//     var rect = el.getBoundingClientRect();

//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
//     );
// }

// // function onVisibilityChange(el, callback) {
// //     var old_visible;
// //     return function () {
// //         var visible = isElementInViewport(el);
// //         if (visible != old_visible) {
// //             old_visible = visible;
// //             if (typeof callback == 'function') {
// //                 callback();
// //             }
// //         }
// //     }
// // }

// // var handler = onVisibilityChange(el, function() {
// //     /* your code go here */
// // });

// /* TODO: this looks like a very bad code */
// setInterval(handler, 600);

// // //jQuery
// // $(window).on('DOMContentLoaded load resize scroll', handler);

// /* //non-jQuery
// if (window.addEventListener) {
//     addEventListener('DOMContentLoaded', handler, false);
//     addEventListener('load', handler, false);
//     addEventListener('scroll', handler, false);
//     addEventListener('resize', handler, false);
// } else if (window.attachEvent)  {
//     attachEvent('onDOMContentLoaded', handler); // IE9+ :(
//     attachEvent('onload', handler);
//     attachEvent('onscroll', handler);
//     attachEvent('onresize', handler);
// }
// */
