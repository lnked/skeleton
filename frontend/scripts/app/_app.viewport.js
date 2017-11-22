// function checkOpacity (elements, scrollTop, direction) {
//     elements.forEach((item) => {
//         ((element) => {
//             if (angular.element(element.item).hasClass('co-scroll-animate--latest')) {
//                 if (direction === 'down') {
//                     if (scrollTop > element.to) {
//                         angular.element(element.item).addClass('co-scroll-fade-in');
//                         angular.element(element.item).removeClass('co-scroll-animate--latest');
//                         // angular.element(element.item).find('.co-animate-transform').addClass('is-animate');
//                     }
//                 }
//                 // } else if (direction === 'up') {
//                 //     if (scrollTop < element.from) {
//                 //         angular.element(element.item).find('.co-animate-transform').removeClass('is-animate')
//                 //         angular.element(element.item).removeClass('co-scroll-fade-in');
//                 //         angular.element(element.item).removeClass('co-scroll-animate--latest');
//                 //     }
//                 // }
//             }
//         })(item);
//     });
// }

// function changeEffect ($timeout, elements, scrollTop, direction) {
//     elements.forEach((item) => {
//         ((element) => {
//             if (scrollTop >= element.from) {
//                 const current = angular.element(element.item);

//                 if (!current.hasClass('co-scroll-animate--latest')) {
//                     current.addClass('co-scroll-animate--latest');
//                 }

//                 current.addClass('co-scroll-fade-in');

//                 $timeout(() => {
//                     current.find('.co-animate-transform').addClass('is-animate');
//                 }, 10);
//             }
//         })(item);
//     });

//     checkOpacity(elements, scrollTop, direction);
// }

// let time = Number(Date.now());
// let uptime = 0;

// function debounce (fn, delay) {
//     uptime = Number(Date.now());
//     const difference = Number(Math.abs(uptime - time));

//     if (difference >= delay) {
//         time = Number(Date.now());
//         fn();
//     }
// }

// function initScroll ($timeout, $window, $rootScope) {
//     let itemsProcessed = 0;

//     const width = angular.element($window).width();
//     const wheight = angular.element($window).height() - (angular.element($window).height() / 6);
//     const animate = document.querySelectorAll('.co-scroll-animate');
//     const length = animate.length;

//     angular.element($window).unbind('scroll.animation');

//     function callback () {
//         let last = 0;

//         angular.element($window).bind('scroll.animation', () => {
//             let direction = null;
//             const scrollTop = angular.element($window).scrollTop();

//             if (scrollTop > last) {
//                 direction = 'down';
//             } else {
//                 direction = 'up';
//             }

//             debounce(() => {
//                 changeEffect($timeout, $rootScope.elements, (scrollTop + wheight), direction);
//             }, 15);

//             last = scrollTop;
//         });

//         $rootScope.$apply();
//     }

//     if (width >= 480) {
//         animate.forEach((item) => {
//             itemsProcessed++;

//             const ptop = angular.element(item).offset().top;
//             const height = angular.element(item).height();

//             $rootScope.elements.push({
//                 item: angular.element(item),
//                 from: ptop,
//                 to: ptop + height,
//                 h: height
//             });

//             if (itemsProcessed === length) {
//                 callback();
//             }
//         });
//     }
// }
