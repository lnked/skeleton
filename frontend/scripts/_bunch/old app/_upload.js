;( function( $ ){
	"use strict";

	$.app = $.app || {};

	var _this, body = $('body');

	$.app.upload = {

		config: {
			size: [120, 120],
			selector: '.js-file-preview',
			container: '.js-file-container',
			wrapper: '.js-file-wrapper',
			image: '.js-file-image'
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

		_load: function(evt)
		{
			// im.width = 111;
			// im.height = 109;

			// $.app.canvasmask.mask(im, '../images/hex-mask.png', {
			// 	w: 111, h: 109
			// });
		},

		initUpload: function()
		{
			_this = this;

			body.on('change', _this.config.selector, function(e){
				
				var wrapper = $(this).closest(_this.config.wrapper),
					container = wrapper.find(_this.config.container),
					preview, reader, file, image, width, height, sourceX, sourceY, destX, destY, canvas, context;
					
				if (container.find(_this.config.image).length)
				{
					container.find(_this.config.image).remove();
				}
			
				preview 				= document.createElement('img');
				preview.className		= 'profile-picture__image__src' + _this.config.image.replace('.', ' ');

				canvas = document.createElement('canvas');
				context = canvas.getContext('2d');
			
				if ($(this).prop('files'))
				{
					file = $(this).prop('files')[0];

					if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) 
					{
						image = new Image();
						image.src = URL.createObjectURL(file);

						image.onload = function()
						{
							if (image.width > _this.config.size[0])
							{
								width = Math.ceil( (image.width * _this.config.size[0]) / image.height );
								height = _this.config.size[0];
							}
							else
							{
								height = Math.ceil( (image.height * _this.config.size[0]) / image.width );
								width = _this.config.size[0];
							}

							canvas.width  = width;
							canvas.height = height;

							sourceX = Math.ceil(_this.config.size[0]/2 - width/2);
							sourceY =  Math.ceil(_this.config.size[1]/2 - height/2);

							destX = canvas.width / 2 - image.width / 2;
							destY = canvas.height / 2 - image.height / 2;

					        context.drawImage(image, 0,0, image.width, image.height, 0,0, width, height);

							preview.width  = width;
							preview.height = height;
							preview.src = canvas.toDataURL();

							container.append(preview);
						}

						// image.onload = function()
						// {
						// 	preview.src = URL.createObjectURL(file);
							
						// 	reader = new FileReader();

						// 	reader.onload = (function (im) {
						// 		return function (evt) {
						// 			im.src = evt.target.result;
						// 			_this._load(im);
						// 		};
						// 	}(preview));

						// 	reader.readAsDataURL(file);

						// 	console.log(preview, file);
						// }
					}
				}
			});

		},

		init: function(config)
		{
			this.extend(config);
			this.initUpload();
		}

	};

})( jQuery );