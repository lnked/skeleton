;( function( $ ){
	"use strict";

	/*
		$.app.canvasmask.init();
		$.app.canvasmask.canvasmask.mask($(this)[0], '../images/hex-mask.png');
	*/

	var imagecanvas, imagecontext, mask, img;

	$.app.canvasmask = {

		mask: function(image, mask_src)
		{
			img = document.createElement('img');
			img.src = image.src;
	      	
	      	img.onload = function() {
	      		var width = img.width, height = img.height;

	      		mask = document.createElement('img');
				mask.src = mask_src;

				mask.onload = function() {
					imagecanvas.width  = width;
					imagecanvas.height = height;

					imagecontext.drawImage(mask, 0, 0, width, height);
					imagecontext.globalCompositeOperation = 'source-atop';
					imagecontext.drawImage(img, 0, 0);

					image.src = imagecanvas.toDataURL();

					$(image).addClass('is-masked');
	      		}
	      	}

		},

		init: function(debug)
		{
			imagecanvas = document.createElement('canvas');
			imagecontext = imagecanvas.getContext('2d');

			if (debug)
			{
				document.body.appendChild(imagecanvas);
			}
		}

	};

})( jQuery );