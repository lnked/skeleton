;( function( $ ) {
	"use strict";

	window.body = $('body');
	window._this = null;

	$.app = {
		
		initSandwich: function()
		{
			this.sandwich.init({
				keyHooks: !0,
				selector: '.js-sandwich-menu',
				wrapper: '.layout-wrapper',
				overlay: '#menu-overlay'
			});
		},

		initSlider: function()
		{
			this.slider.init({
				slider 	: '#slider',
				item 	: '.js-slider-slide',
				timeout : 6000
			});
		},
		
		initSelectTrigger: function()
		{
			body.on('select.close', function(e, select){
				if ($(select).closest('.form__group').length)
				{
					var index = 1, group = $(select).closest('.form__group');

					group.css('z-index', 1);

					if (group.closest('.form__group_items').length)
					{
						group = group.closest('.form__group_items');

						group.css('z-index', 1);
					}
				}
			});

			body.on('select.open', function(e, select){
				if ($(select).closest('.form__group').length)
				{
					var group = $(select).closest('.form__group');

					group.css('z-index', 10000);

					if (group.closest('.form__group_items').length)
					{
						group = group.closest('.form__group_items');

						group.css('z-index', 10000);
					}
				}
			});

			body.on('change', '.js-form-select', function(e){
				if ($(this).closest('.error').length)
				{
					$(this).closest('.error').removeClass('error');
				}
			});
		},

		initSelect: function(group)
		{
			if (typeof(group) == 'undefined')
			{
				$('select').not('.is-system').selectbox();
			}
			else
			{
				group.find('select').not('.is-system').selectbox();
			}

			this.initSelectTrigger();
		},

		initMask: function()
		{
			$(".js-date-watcher").mask("99/99/9999");
			$(".js-phone-watcher").mask("+ 7 (999) 999-99-99");
			$(".js-cartnumber-watcher").mask("999-999-999");
		},
		
		initFastclick: function()
		{
			FastClick.attach(document.body);
		},

		initPopup: function()
		{
			$.popup.init('.js-open-popup', {
				cssPosition: false,
				wrapper: '.layout-wrapper'
			});
		},
		
		initMagnific: function()
		{ 
			if ($('.zoom-group').length)
			{
				$('.zoom-group').find('.zoom-list').each(function(){
					$(this).magnificPopup({
						delegate: '.zoom',
						type: 'image',
				 		preloader: true,
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							tCounter: '%curr% of %total%'
						},
						zoom: {
							enabled: true,
							duration: 300,
							easing: 'ease-in-out',
							opener: function(openerElement) {
								return openerElement.is('img') ? openerElement : openerElement.find('img');
							}
						},
					 	closeOnContentClick: true
					});
				});
			}
			else
			{
				$('.zoom').magnificPopup({
				 	type:'image',
				 	preloader: true,
					gallery: {
						enabled: true
					},
					zoom: {
						enabled: true,
						duration: 300,
						easing: 'ease-in-out',
						opener: function(openerElement) {
							return openerElement.is('img') ? openerElement : openerElement.find('img');
						}
					},
				 	closeOnContentClick: true
				});
			}
		},

		initFancyBox: function()
		{
			if (!is_undefined($.fn.fancybox))
			{
				$('.fancybox').fancybox({
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});

				$('.fancybox-media').fancybox({
					openEffect  : 'none',
					closeEffect : 'none',
					helpers : {
						media : {},
						overlay: {
						  locked: false
						}
					}
				});

				$(".iframe").fancybox({
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					'autoScale'     	: false,
					'type'				: 'iframe',
					'width'				: 500,
					'height'			: 500,
					'scrolling'   		: 'no'
				});
				
				$(".various").fancybox({
					maxWidth	: 800,
					maxHeight	: 600,
					fitToView	: false,
					width		: '70%',
					height		: '70%',
					autoSize	: false,
					closeClick	: false,
					openEffect	: 'none',
					closeEffect	: 'none',
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});
			}
		},

		slickCarousel: function()
		{
			if ($('.js-carousel').length && $('.js-carousel').find('.slick-slide').length)
			{
				var count = 4, classname = 'carousel';

				$('.js-carousel').each(function(){
					count = 4;
					classname = 'carousel';

					if ($(this).data('viewcount'))
					{
						count = parseInt($(this).data('viewcount'));
					}

					if ($(this).data('classname'))
					{
						classname = $(this).data('classname');
					}

					$(this).slick({
						infinite: true,
						dots: false,
						draggable: true,
						speed: 170,
						slidesToShow: count,
						slidesToScroll: 1,
						prevArrow: '<button type="button" class="'+classname+'__navigation '+classname+'__navigation_prev slick-prev"></button>',
						nextArrow: '<button type="button" class="'+classname+'__navigation '+classname+'__navigation_next slick-next"></button>',
						responsive: [
							{
								breakpoint: 1024,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3,
									infinite: true,
									dots: true
								}
							},
							{
								breakpoint: 600,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2
								}
							},
							{
								breakpoint: 480,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			}
		},

		slickSlider: function()
		{
			if ($('.js-slider').length && $('.js-slider').find('.slick-slide').length)
			{
				var count = 4, classname = 'slider', $slider = '', width = $(window).width(), options = {};

				$('.js-slider').each(function(){
					count = 4;
					classname = 'slider';

					options = {
						infinite: !0,
						dots: !1,
						draggable: !1,
						speed: 300,
						fade: !1,
						autoplay: !1,
						autoplaySpeed: 4500,
						pauseOnHover: !1,
						useTransform: !1,
						variableWidth: !0,
						cssEase: 'ease'
					};
					
					$slider = $(this);

					if ($slider.data('viewcount'))
					{
						count = parseInt($slider.data('viewcount'));
					}

					if ($slider.hasClass('js-slider-calc'))
					{
					 	$slider.find('.slick-slide').css({
					 		'width': width + 'px'
					 	});
					}

					if ($slider.data('classname'))
					{
						classname = $slider.data('classname');
					}
					
					if (!$slider.hasClass('js-disable-navigation'))
					{
						options['prevArrow'] = '<button type="button" class="slider__navigation slider__navigation_prev slick-prev"></button>';
						options['nextArrow'] = '<button type="button" class="slider__navigation slider__navigation_next slick-next"></button>';
					}
					else
					{
						options['arrows'] = !1;
					}

					$slider.slick(options);
				});
			}
		},

		disableHover: function()
		{
			var timer;
			window.addEventListener('scroll', function() {
				clearTimeout(timer);
				
				if(!body.hasClass('disable-hover')) {
					body.addClass('disable-hover');
				}

				timer = setTimeout(function(){
					body.removeClass('disable-hover');
				},500);
			}, false);
		},

		initTooltip: function()
		{
			var tooltip, item;

			body.on('click', function(e){
				if (!$(e.target).hasClass('tooltip') && !$(e.target).hasClass('js-tooltip') && $('.tooltip.show').length)
				{
					$('.tooltip.show').removeClass('animate');

					setTimeout(function(){
						$('.tooltip.show').removeClass('show');
					}, 300);
				}
			});

			body.on('click', '.js-tooltip', function(e){
				e.preventDefault();
				
				item = $(this);

				if ((item.data('tooltip') || item.find('.tooltip').length) && !$(e.target).hasClass('tooltip'))
				{
					tooltip = item.data('tooltip');

					if (!item.find('.tooltip').length)
					{
						var span = document.createElement('span');
						span.className = 'tooltip';
						span.innerHTML = tooltip;

						item.append(span);
					}

					if (item.find('.tooltip').hasClass('show'))
					{
						item.find('.tooltip').removeClass('animate');

						setTimeout(function(){
							item.find('.tooltip').removeClass('show');
						}, 200);
					}
					else
					{
						item.find('.tooltip').addClass('show');

						setTimeout(function(){
							item.find('.tooltip').addClass('animate');
						}, 10);
					}
				}
			});
		},

		toggle: function()
		{
			var selector, block, target, button;

			$('.js-toggle-trigger').each(function(){
				if ($($(this).data('toggle')).length)
				{
					selector = $(this).data('toggle');
					button = $(this);
					block = $(selector);

					body.on('click', function(e){
						target = $(e.target);

						if (!target.closest(selector).length && !target.closest('.js-toggle-trigger').length && block.hasClass('active'))
						{
							button.removeClass('animate');
							block.removeClass('transform');

							setTimeout(function(){
								block.removeClass('active');
							}, 135);
						}
					});		
				}
			});

			body.on('click', '.js-toggle-trigger', function(e){
				e.preventDefault();

				if ($(this).data('toggle'))
				{
					block = $($(this).data('toggle'));
					button = $(this);

					if (block.length)
					{
						if (!block.hasClass('active'))
						{
							button.addClass('animate');
							block.addClass('active');

							setTimeout(function(){
								block.addClass('transform');
							}, 5);
						}
						else
						{
							button.removeClass('animate');
							block.removeClass('transform');

							setTimeout(function(){
								block.removeClass('active');
							}, 135);
						}
					}
					
				}

			});
		},
		
		findJumpElement: function(hash)
		{
			hash = hash.substr(1);

			if ($('a[name="' + hash + '"]').length)
			{
				return $('a[name="' +hash+ '"]').eq(0);
			}
			
			if ($('#' + hash).length)
			{
				return $('#' +hash).eq(0);
			}

			if ($('.screen[data-screen="' + hash + '"]').length)
			{
				return $('.screen[data-screen="' + hash + '"]').eq(0);
			}

			return null;
		},

		hashJump: function()
		{
			_this = this;

			var $jumpto = null;

			if (window.location.hash)
			{
				var hash = window.location.hash;

				$jumpto = _this.findJumpElement(hash + '-anchor');

				if ($jumpto !== null)
				{
					$scrollWrapper.stop().animate({ scrollTop: ($jumpto.offset().top + 25) + 'px' }, 'fast');
				}
			}

			body.on('click', '.j-jumpto', function(e){

				if ($(this).data('anchor'))
				{
					$jumpto = _this.findJumpElement($(this).data('anchor'));
				}
				else if($(this).attr('href'))
				{
					$jumpto = _this.findJumpElement($(this).attr('href'));
				}
				
				if ($jumpto !== null)
				{
					$scrollWrapper.stop().animate({ scrollTop: $jumpto.offset().top + 'px' }, 'medium');
					
					if ($(this).hasClass('j-navigation'))
					{
						$('#navigation').find('.current').removeClass('current');
						$(this).addClass('current');
					}
				}
			});
		},

		updateImage: function()
		{
			body.on('click', '.js-update-image', function(e){
				e.preventDefault();
				$(this).find('img').attr('src', $(this).find('img').attr('src').split('?')[0] + '?u=' + Math.random());
			});
		},

		zoomit: function()
		{
			var wrapper, holder, image;

			body.on('click', '.js-zoom-image', function(e){
				
				e.preventDefault();

				image = $(this).attr('href');

				if ($(this).closest('.js-zoom-wrapper').length)
				{
					wrapper = $(this).closest('.js-zoom-wrapper');
					
					if (wrapper.find('.js-zoom-holder').length)
					{
						holder = wrapper.find('.js-zoom-holder');

						holder.html('');

						wrapper.find('.current').removeClass('current');


						holder.html('<img src="' + image + '" alt="">');

						$(this).addClass('current');
					}
				}

				return !1;
			});
		},

		suggestionsInit: function()
		{
			var api_key = '5ac2fbf1f640b75b78f5d4214ff005ff5303eac8', input = null;

			if ($('.js-suggestions').length)
			{
				$('.js-suggestions').each(function(){
					input = $(this);
					
					if (input.data('type'))
					{
						input.suggestions({
						    serviceUrl: "https://dadata.ru/api/v2",
						    token: api_key,
						    type: input.data('type'),
						    count: 5,
						    onSelect: function(suggestion) {
						        console.log(suggestion);
						    }
						});
					}
				});
			}
		},

		initForm: function()
		{
			body.on('focus', 'input.error', function(){
				$(this).removeClass('error');
			});

			$(".integer").on('keypress', function (e) {
				if ([0, 8, 13, 38, 40].indexOf( e.which ) < 0 && (e.which < 48 || e.which > 57))
				{
					return !1;
				}
			});

			$(".ignore-paste").on('keydown', function (e){
				if ((e.metaKey || e.ctrlKey) && e.keyCode == 86)
				{
					return !1;
				}
			});

			$(".float").on('keypress', function (e) {
				if ( [0, 8, 13, 38, 40, 44, 46].indexOf( e.which ) < 0 && ( e.which < 48 || e.which > 57 ) )
				{
					return !1;
				}
			});
		},

		initSidebar: function()
		{
			var $content = $('#sidebar').find('.j-sidebar-content');

			$('body').on('click', '.j-sidebar-trigger', function(){
				if ($content.hasClass('animate'))
				{
					$(this).removeClass('animate');
					$content.removeClass('animate');
					
					setTimeout(function(){
						$content.removeClass('active');
					}, 250);
				}
				else
				{
					$(this).addClass('animate');
					$content.addClass('active');

					setTimeout(function(){
						$content.addClass('animate');
					}, 5);
				}
			});
		},

		init: function()
		{
			this.disableHover();

			this.initFastclick();

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();

			this.ajaxForm.init();
			this.cart.init();

			browser.init();

			lazyLoadImages();
		}

	};

})( jQuery );