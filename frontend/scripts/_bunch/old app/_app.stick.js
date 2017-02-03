;(function ($) {
	"use strict";

	$.app = $.app || {};

	var body = $('body'), _this, _scrollTop, _timeout;

	$.app.stick = {

		config: {
			delay: 10,
			element: '.js-stick'
		},

		cache: [],

		calc: function()
		{
			_this = this;

			if ($(_this.config.element).length)
			{
				$(_this.config.element).map(function(index) {
					$(this).addClass('js-stick-' + index);
					_this.cache[index] = $(this).offset().top;
				});
			}
		},

		check: function()
		{
			_this = this;

			_scrollTop = $(window).scrollTop();

			var x, stick;

			for(x in _this.cache)
			{
				stick = $('.js-stick-' + x);

				if (_scrollTop >= _this.cache[x])
				{
					if (!stick.hasClass('sticked'))
					{
						stick.addClass('sticked');
					}
				}
				else
				{
					if (stick.hasClass('sticked'))
					{
						stick.removeClass('sticked');
					}
				}
			}
		},

		initScroll: function()
		{
			_this = this;

			$(window).on('scroll', function(e){

				clearTimeout(_timeout);

				_timeout = setTimeout(function() {

					_this.check();

				}, _this.config.delay);
				
			});
		},

		init: function()
		{
			this.calc();
			this.check();
			
			this.initScroll();
		}

	};

})(jQuery);