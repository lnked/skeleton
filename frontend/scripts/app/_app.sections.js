// // _section.js

// ;( function( $ ){
//     "use strict";

//     var body = $('body'),
//         $htmlbody = $('html, body'),
//         $active, $next,
//         started = false,
//         init_shadow = false,
//         popup_is_open = false,
//         index = 0,
//         min,
//         v_height = $(window).height(),
//         openPopup = null,
//         section_class = 'js-section',
//         section = '.' + section_class,
//         sections = {},
//         scrollPosition,
//         scrolltoSection,
//         container,
//         keyinterval,
//         background;

//     app.section = {

//         _checkPopup: function()
//         {
//             openPopup = null;
//             popup_is_open = false;

//             if ($('.popup.is-open').length)
//             {
//                 popup_is_open = true;
//                 openPopup = $('.popup.is-open');
//             }
//         },

//         _getPosition: function()
//         {
//             $(section).map(function(index) {
//                 $(this).attr('id', 'section-' + index);
//                 sections[index] = $(this).offset().top;
//             });
//         },

//         resize: function()
//         {
//             var _this = this;
//             var resize_timeout;

//             $(window).on('resize', function(){
//                 resize_timeout = setTimeout(function () {
//                     clearTimeout(resize_timeout);

//                     scrollPosition = body.scrollTop();

//                     $(section).map(function(index) {
//                         sections[index] = $(this).offset().top; // + scrollPosition;
//                     });

//                     _this.calculate();

//                     if ((v_height !== $(window).height()) || is_availableSize())
//                     {
//                         var items = [];

//                         for (var x in sections)
//                         {
//                             items.push(Math.abs(sections[x] - scrollPosition));
//                         }

//                         min = Math.min.apply(null, items),

//                         scrolltoSection = items.indexOf(min);

//                         setTimeout(function(){
//                             started = true;
//                             $next = $(section).eq(scrolltoSection);

//                             $htmlbody
//                                 .stop()
//                                 .animate({
//                                     scrollTop: sections[scrolltoSection]
//                                 }, 'fast', function(){
//                                     $('.' + section_class + '.active').removeClass('active');
//                                     $next.addClass('active');
//                                     started = false;
//                                 });
//                         }, 300);
//                     }
//                 }, 300);
//             });

//         },

//         _setActive: function()
//         {
//             scrollPosition = body.scrollTop();

//             $(section).map(function(index) {
//                 sections[index] = $(this).offset().top;
//             });

//             $(section).removeClass('active');

//             var items = [];

//             for (var x in sections)
//             {
//                 items.push(Math.abs(sections[x] - scrollPosition));
//             }

//             scrolltoSection = items.indexOf(Math.min.apply(null, items));

//             $(section).eq(scrolltoSection).addClass('active');
//         },

//         calculate: function()
//         {
//             var _this = this;

//             if (is_availableSize())
//             {
//                 if (!$(section).hasClass('initialized'))
//                 {
//                     v_height = $(window).height();

//                     $(section).addClass('initialized');

//                     $(section).css({ 'height': v_height });

//                     _this._setActive();
//                     _this._getPosition();
//                     _this._checkPopup();
//                 }
//             }
//             else
//             {
//                 if ($(section).hasClass('initialized'))
//                 {
//                     $(section).removeClass('initialized');
//                     $(section).css({ 'height': 'auto' });
//                     $(section).removeClass('active');
//                 }
//             }

//         },

//         init: function()
//         {
//             var _this = this;

//             $.app.BrowserDetect.init();

//             var scrollingPause = 600,
//             scrollingSpeed = 200,
//             prevTime = new Date().getTime(),
//             curTime,
//             timeDiff,
//             debounce,
//             history,
//             history_count = 0,
//             delta;

//             _this.calculate();

//             _this.resize();

//             var _container = body, _background = body.find('.js-shadow-background');

//             function checkHeader()
//             {
//                 var scrollTop = 0;

//                 if ($.app.BrowserDetect.browser == 'Explorer')
//                 {
//                     scrollTop = $(window).scrollTop();
//                 }
//                 else {
//                     scrollTop = _container.scrollTop();
//                 }

//                 if (scrollTop > _background.height())
//                 {
//                     if (!_background.hasClass('active'))
//                     {
//                         setTimeout(function(){
//                             _background.addClass('active');
//                         }, 10);
//                     }
//                 }
//                 else
//                 {
//                     if (_background.hasClass('active'))
//                     {
//                         setTimeout(function(){
//                             _background.removeClass('active');
//                         }, 10);
//                     }
//                 }
//             }

//             if (body.find('.js-shadow').length && is_availableSize())
//             {

//                 body.on('keyup', function(e){
//                     if ([38, 40].indexOf(e.keyCode) >= 0)
//                     {
//                         keyinterval = setTimeout(function(){

//                             checkHeader();

//                         }, 100);
//                     }
//                 });
//             }

//             if (!body.hasClass('is-scroll'))
//             {
//                 checkHeader();
//             }

//             function mousescroll(e)
//             {
//                 clearTimeout(keyinterval);

//                 if (!body.hasClass('popup-open') && !body.hasClass('page-open') && $(section).length > 1)
//                 {
//                     if (is_availableSize())
//                     {
//                         e.preventDefault ? e.preventDefault() : e.returnValue = false;

//                         curTime = new Date().getTime();

//                         debounce = setTimeout(function () {

//                             if (!started)
//                             {
//                                 timeDiff = curTime-prevTime;

//                                 $active = $('.' + section_class + '.active');

//                                 if (timeDiff > scrollingPause && $active.length && $active.hasClass(section_class))
//                                 {
//                                     started = true;

//                                     delta = (e.detail<0) ? 1 : (e.wheelDelta>0) ? 1 : -1;

//                                     if (delta != history) // || history_count <= 1
//                                     {
//                                         started = false;
//                                         history_count++;
//                                         prevTime = curTime;
//                                     }
//                                     else
//                                     {
//                                         history_count = 0;
//                                         $next = (delta < 0) ? $active.next(section) : $active.prev(section);

//                                         if ($next.length)
//                                         {
//                                             index = parseInt($next.attr('id').split('-')[1]);

//                                             $htmlbody
//                                                 .stop()
//                                                 .animate({
//                                                     scrollTop: sections[index]
//                                                 }, 'medium', function(){
//                                                     $active.removeClass('active');
//                                                     $next.addClass('active');

//                                                     setTimeout(function(){
//                                                         started = false;
//                                                         prevTime = curTime;
//                                                     }, 300);
//                                                 });
//                                         }
//                                         else {
//                                             started = false;
//                                         }
//                                     }

//                                     history = delta;
//                                 }
//                             }

//                             clearTimeout(debounce);

//                         }, scrollingSpeed);
//                     }
//                 }
//                 else
//                 {
//                     debounce = setTimeout(function () {
//                         _this._checkPopup();

//                         if (body.find('.js-shadow').length && !popup_is_open)
//                         {
//                             if (is_availableSize())
//                             {
//                                 init_shadow = true;
//                             }
//                         }

//                         if (popup_is_open || init_shadow)
//                         {
//                             if (init_shadow && !popup_is_open)
//                             {
//                                 container = body;
//                                 background = body.find('.js-shadow-background');
//                             }
//                             else
//                             {
//                                 container = openPopup.find('.js-shadow-container');
//                                 background = openPopup.find('.js-shadow-background');
//                             }

//                             var scrollTop = 0;

//                             if ($.app.BrowserDetect.browser == 'Explorer')
//                             {
//                                 scrollTop = $(window).scrollTop();
//                             }
//                             else {
//                                 scrollTop = container.scrollTop();
//                             }

//                             if (scrollTop > background.height())
//                             {
//                                 if (!background.hasClass('active'))
//                                 {
//                                     setTimeout(function(){
//                                         background.addClass('active');
//                                     }, 10);
//                                 }
//                             }
//                             else
//                             {
//                                 if (background.hasClass('active'))
//                                 {
//                                     setTimeout(function(){
//                                         background.removeClass('active');
//                                     }, 10);
//                                 }
//                             }
//                         }

//                         clearTimeout(debounce);
//                     }, 150);

//                 }
//             };

//             if ($.app.BrowserDetect.browser == 'Explorer')
//             {
//                 document.body.addEventListener( 'mousewheel', mousescroll, false );
//             }
//             else
//             {
//                 document.body.addEventListener( 'mousewheel', mousescroll, false );     // Chrome/Safari/Opera
//                 document.body.addEventListener( 'DOMMouseScroll', mousescroll, false ); // Firefox
//             }
//         }

//     };

// })( jQuery );
