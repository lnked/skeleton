;(function ($) {
	"use strict";

	$.app = $.app || {};

	var map, _this;

	$.app.map = {
		
		google: function( mapid )
		{
			var map = new google.maps.Map(d.getElementById( 'map-conteiner-' + mapid ), {
				zoom: 14,
				zoomControl: !1,
				panControl: !1,
				scrollwheel: !1,
				navigationControl: !1,
				mapTypeControl: !1,
				scaleControl: !1,
				draggable: !0,
				disableDoubleClickZoom: !0,
				center: new google.maps.LatLng(45.053548,39.016056)
			});

			var mapOptions = {
			zoom: 17,
			zoomControl: !1,
			panControl: !1,
			scrollwheel: !1,
			navigationControl: !1,
			mapTypeControl: !1,
			scaleControl: !1,
			draggable: !0,
			disableDoubleClickZoom: !1,
			streetViewControl: !1,
			overviewMapControl: !1,
			center: new google.maps.LatLng(latitude, longitude)
			};

			var image = {
			url: '/images/marker@2x.png',
			size: new google.maps.Size(26, 32),
			origin: new google.maps.Point(0, 0),
			scaledSize: new google.maps.Size(26, 32),
			anchor: new google.maps.Point(26, 32)
			};

			var map = new google.maps.Map($(container), mapOptions);

			var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			icon: image,
			flat: true,
			title: 'г. Москва, Тессинский переулок, вл. 2-6, 19'
			});

			function toggleBounce()
			{
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);

				setTimeout(function(){
					marker.setAnimation(null);
				}, 2000);
			}
			}

			marker.addListener('click', toggleBounce);
		},

		yandex: function(data)
		{
			map = {
				ymap: null,

				draw: function()
				{
					this.ymap = new ymaps.Map(data.container, {
						center: [data.latitude, data.longitude],
						zoom: 14
					}, {
						searchControlProvider: 'yandex#map'
					});
				},

				controls: function()
				{
					// this.ymap.link.controls
					//     .add('smallZoomControl', { right: 10, top: 15 })
					//     .add(new ymaps.control.ScaleLine())
					//     .add('searchControl', { left: 20, top: 20 });
				},

				placemark: function()
				{
					// var GeoObject = new ymaps.GeoObject({
					// 	// Описание геометрии.
					// 	geometry: {
					// 		type: "Point",
					// 		coordinates: [data.latitude, data.longitude]
					// 	},
					// 	// Свойства.
					// 	properties: {
					// 		// Контент метки.
					// 		iconContent: 'Я тащусь',
					// 		hintContent: 'Ну давай уже тащи'
					// 	}
					// }, {
					// 	// Опции.
					// 	// Иконка метки будет растягиваться под размер ее содержимого.
					// 	preset: 'islands#blackStretchyIcon',
					// 	// Метку можно перемещать.
					// 	draggable: false
					// });

					this.ymap.geoObjects
						// .add(GeoObject)
						.add(new ymaps.Placemark([data.latitude, data.longitude], {
							balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
						}, {
							preset: 'islands#icon',
							iconColor: '#0095b6'
						}))

					// this.ymap.link.geoObjects.add(
					// 	new ymaps.Placemark( [data.latitude, data.longitude], {}, {
			  //               iconImageHref: '/images/marker.png',
			  //               iconImageSize: [26, 32],
			  //               iconImageOffset: [-3, -42]
			  //           })
					// );
				},

				init: function()
				{
					this.draw();
					this.controls();
					this.placemark();
				}
			};

			ymaps.ready(function(){
				map.init();
			});
		},

		paste: function(data)
		{
			this[data.provider](data);
		},

		load: function()
		{
			_this = this;

			if (body.find('.js-load-map').length)
			{
				body.find('.js-load-map').each(function() {
					console.log($(this));
					if ($(this).data('latitude') && $(this).data('longitude') && $(this).data('provider') && $(this).data('container'))
					{
						_this.paste({
							container	: $(this).data('container'),
							provider 	: $(this).data('provider'),
							latitude	: $(this).data('latitude'),
							longitude	: $(this).data('longitude')
						});
					}
				});
			}
		}
	};

	// window.initialize = $.app.map.load;

	$.app.map.load();

})(jQuery);