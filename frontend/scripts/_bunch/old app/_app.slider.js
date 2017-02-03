;(function ($) {
	"use strict";

	$.app = $.app || {};

	var _this, _slider, _timer, current, next, slider_interval;

	$.app.slider = {

		config: {
			slider: '.slider',
			item: '.js-slider-slide',
			nav: '.js-slider-nav',
			active: 'active',
			timeout: 3000,
			delay: 4000
		},

		extend: function(config)
		{
			_this = this;

			if (typeof config !== 'undefined')
        	{
        		var x;
        		for (x in config)
        		{
        			if (typeof _this.config[x] !== 'undefined')
        				_this.config[x] = config[x];
        		}
        	}
		},

		_getCurrent: function()
		{
			return _slider.find(_this.config.item + '.' + _this.config.active);
		},

		_getPrev: function(current)
		{	
			if (current.prev(_this.config.item).length)
			{
				next = current.prev(_this.config.item);    
			}
			else
			{
				next = _slider.find(_this.config.item).last();
			}

			return next;
		},

		_getNext: function(current)
		{	
			if (current.next(_this.config.item).length)
			{
				next = current.next(_this.config.item);    
			}
			else
			{
				next = _slider.find(_this.config.item).eq(0);
			}

			return next;
		},
		
		animateSlider: function(current, next)
		{
			current = _this._getCurrent();
			next = _this._getNext(current);

			if (typeof(next) !== 'undefined')
			{
				next.addClass(_this.config.active);
				current.removeClass(_this.config.active);
			}
		},

		initNavigation: function()
		{
			$('body').on('click', _this.config.nav, function(){
				var direction = $(this).data('direction');

				clearInterval(slider_interval);
				current = _this._getCurrent();

				if (direction == 'prev')
				{
					next = _this._getPrev(current);
				}
				else if (direction == 'next')
				{
					next = _this._getNext(current);
				}

				_this.animateSlider(current, next);

				_this.startInterval();
			});
		},
		
		startInterval: function()
		{
			if (_this.config.delay < _this.config.timeout)
			{
				current = _this._getCurrent();
				next = _this._getNext(current);

				next.addClass(_this.config.active);
				current.removeClass(_this.config.active);
			}

			slider_interval = setInterval(function(){
				_this.animateSlider(current, next);
			}, _this.config.timeout );
		},

		initSlider: function()
		{
			_this = this;

			_slider = $(_this.config.slider);

			if (_slider.find(_this.config.item).length > 1)
			{

				clearInterval(slider_interval);

				_this.startInterval();

				_this.initNavigation();
			}
		},

		init: function(config)
		{
			_this = this;

			this.extend(config);
			this.initSlider();
		}

	};

})(jQuery);