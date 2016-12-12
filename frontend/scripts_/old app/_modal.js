/*
$.modal.init('.trigger-popup');
$.modal.open('popup-choose-photo-source');
$.modal.open('popup-choose-photo-source/nested-tab');
*/

;(function ($) {
	"use strict";
	
	var _this, body = $('body'), win = $(window), doc = $(document), popup = null, noty = null, temp = null, nested = [], dialog = '', trigger = '', selector_cache, notify_timeout, resizeTimeout;

	$.modal = function(power) {
	// $.modal = {
		
		// _config: {
		// 	wrapper			: 	'body',
		// 	popup 			: 	'.popup',
		// 	trigger 		: 	'.js-open-popup',
		// 	dialog 			: 	'.js-popup-dialog',
		// 	speed 			: 	550,
		// 	overlay 		: 	{
		// 		enable	: !0,
		// 		element	: '#overlay'
		// 	},
		// 	overlayclose	: 	!0,
		// 	cssPosition		: 	!0,
		// 	bodyclass		: 	!0,
		// 	hashCheck		: 	!0,
		// 	hashChange		: 	!0,
		// 	keyHooks		: 	!0,
		// 	template		: 	{
		// 		error: 'tmpl-popup-error',
		// 		message: 'tmpl-popup-message',
		// 		notification: 'tmpl-notification'
		// 	}
		// },

		// _extend: function(config)
		// {
		// 	if (typeof config !== 'undefined')
	 //    	{
	 //    		var x;
	 //    		for (x in config)
	 //    		{
	 //    			if (typeof _this._config[x] !== 'undefined')
	 //    				_this._config[x] = config[x];
	 //    		}
	 //    	}
		// },

		// private: {
		// 	open: function()
		// 	{

		// 	},

		// 	preload: function()
		// 	{},
			
		// 	_getPopup: function(selector)
		// 	{},

		// 	_getPosition: function(popup)
		// 	{},

		// 	_changePosition: function(selector)
		// 	{},

		// 	_checkScroll: function(popup)
		// 	{

		// 	},

		// 	close: function(element, callback)
		// 	{

		// 	},

		// 	initWrapClose: function()
	 //    	{
	 //    	},

		// 	hooks: function()
	 //        {

	 //        },

		// 	show: function(selector, overlay, bodyclass)
		// 	{

		// 	},

		// 	clicks: function(trigger)
		// 	{

		// 	}
		// },

		// public: {
		// 	open: function(selector, overlay, bodyclass)
		// 	{
			
		// 	},

		// 	notification: function(title, message)
		// 	{

		// 	},

		// 	message: function(title, message, btn)
		// 	{

		// 	},

		// 	error: function(title, message)
		// 	{

		// 	}
		// },

		// open: function()
		// {

		// },
	
		// init: function(trigger, config)
		// {
		// 	_this = this;
		// 	_this._extend(config);
		// }
	};

	$.modal({
		//'.js-open-popup'
		cssPosition: false,
		wrapper: '.layout-wrapper'
	});


})(jQuery);