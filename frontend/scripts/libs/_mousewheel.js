// (function($) {
//     var optionDevice = Cgs_ss_parmas.device,
//         optionSize = parseInt(Cgs_ss_parmas.size),
//         optionSpeed = parseInt(Cgs_ss_parmas.speed),
//         optionEasingCheck = Cgs_ss_parmas.easingCheck,
//         optionEasing = Cgs_ss_parmas.easing;
//     if (optionEasingCheck == "easing_ok" && optionEasing == "")
//         optionEasing = "easeOutQuart";
//     if (optionEasingCheck == "") optionEasing = "swing";

//     if (optionDevice == "disable") return;
//     if (optionDevice == "all_device") cgs_smoothwheel_scroll();
//     if (optionDevice == "no_mac") {
//         var pcFilter = "mac|macintel";
//         if (pcFilter.indexOf(navigator.platform.toLowerCase()) < 0)
//             cgs_smoothwheel_scroll();
//     }

//     function cgs_smoothwheel_scroll() {
//         "use strict";
//         if (
//             navigator.userAgent.toLowerCase().indexOf("msie 8") != -1 ||
//             navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 ||
//             navigator.userAgent.toLowerCase().indexOf("msie 6") != -1 ||
//             navigator.userAgent.toLowerCase().indexOf("firefox") != -1
//         ) {
//             return;
//         }
//         var mouseWheel = {
//             addEvent: function() {
//                 if (window.addEventListener)
//                     window.addEventListener(
//                         "DOMMouseScroll",
//                         mouseWheel.wheel,
//                         false
//                     );
//                 window.onmousewheel = document.onmousewheel = mouseWheel.wheel;
//             },
//             wheel: function(event) {
//                 var delta = 0;
//                 if (!event) event = window.event;
//                 if (event.wheelDelta) {
//                     delta = event.wheelDelta / 120;
//                     if (window.opera) delta = delta * -1;
//                 } else if (event.detail) {
//                     delta = event.detail / 3 * -1;
//                 }
//                 if (delta) mouseWheel.handle(delta);
//             },
//             handle: function(delta) {
//                 var windowScrollTop = $(window).scrollTop();
//                 var smoothWheel = {
//                     size: optionSize,
//                     speed: optionSpeed,
//                     easing: optionEasing,
//                     target: $("html, body"),
//                     move: function() {
//                         smoothWheel.target.stop().animate(
//                             {
//                                 scrollTop: windowScrollTop + smoothWheel.size
//                             },
//                             smoothWheel.speed,
//                             smoothWheel.easing
//                         );
//                     }
//                 };
//                 if (delta == -1) {
//                     smoothWheel.size =
//                         smoothWheel.size < 0
//                             ? smoothWheel.size * -1
//                             : smoothWheel.size;
//                     smoothWheel.move();
//                 }
//                 if (delta == 1) {
//                     smoothWheel.size =
//                         smoothWheel.size < 0
//                             ? smoothWheel.size
//                             : smoothWheel.size * -1;
//                     smoothWheel.move();
//                 }
//                 event.preventDefault();
//             }
//         };
//         mouseWheel.addEvent();
//     }
// })(jQuery);
