// function googleMap()
// {
// 	var mapOptions = {
// 		zoom: 16,
// 		zoomControl: !0,
// 		zoomControlOptions: {
// 			style: google.maps.ZoomControlStyle.LARGE,
// 			position: google.maps.ControlPosition.RIGHT_TOP
// 		},
// 		panControl: !0,
// 		panControlOptions: {
// 			position: google.maps.ControlPosition.RIGHT_BOTTOM
// 		},
// 		scrollwheel: !1,
// 		navigationControl: !1,
// 		mapTypeControl: !1,
// 		scaleControl: !0,
// 		draggable: !0,
// 		disableDoubleClickZoom: !1
// 	};

// 	var coords, arr = {}, temp, x, map_id = '';

// 	if ($('#map-conteiner').length)
// 	{
// 		coords = $('#map-conteiner').data('coords');
		
// 		coords = coords.split('|');

// 		if (coords.length)
// 		{
// 			for (x in coords)
// 			{
// 				temp = coords[x].split(':');

// 				arr[x] = {
// 					'system': temp[0],
// 					'coords': temp[1].split(',')
// 				}
// 			}
// 		}

// 		mapOptions['center'] = new google.maps.LatLng(arr[0].coords[0], arr[0].coords[1]);
// 	}

// 	if ($('#location-map').length)
// 	{
// 		coords = $('#location-map').data('coords');
	
// 		coords = coords.split(',');

// 		mapOptions['center'] = new google.maps.LatLng(coords[0], coords[1]);
// 	}
	
// 	if ($('#map-conteiner').length)
// 	{
// 		map_id = 'map-conteiner';
// 	}
// 	else if ($('#location-map').length)
// 	{
// 		map_id = 'location-map';
// 	}

// 	var map = new google.maps.Map(document.getElementById(map_id), mapOptions);
// 	var markers = {};

// 	function addMarker(ar, map)
// 	{
// 		if ($('#map-conteiner').length)
// 		{
// 			var image = {
// 				url: '/images/ico/marker-' + ar.system + '.svg',
// 				size: new google.maps.Size(44, 55),
// 				origin: new google.maps.Point(0, 0),
// 				scaledSize: new google.maps.Size(44, 55),
// 				anchor: new google.maps.Point(44, 55)
// 			};
			
// 			var marker = new google.maps.Marker({
// 				position: new google.maps.LatLng( ar.coords[0], ar.coords[1] ),
// 				map: map,
// 				icon: image,
// 				flat: true
// 			});

// 			if (typeof (markers[ar.system]) == 'undefined')
// 			{
// 				markers[ar.system] = [];
// 			}

// 			markers[ar.system].push(marker);
// 		}
// 		else if ($('#location-map').length)
// 		{
// 			var image = {
// 				url: '/images/ico/marker.svg',
// 				size: new google.maps.Size(16, 22),
// 				origin: new google.maps.Point(0, 0),
// 				scaledSize: new google.maps.Size(16, 22),
// 				anchor: new google.maps.Point(16, 22)
// 			};

// 			var marker = new google.maps.Marker({
// 				position: new google.maps.LatLng( ar[0], ar[1] ),
// 				map: map,
// 				icon: image,
// 				flat: true
// 			});
// 		}

// 		google.maps.event.addListener(marker, 'click', function() {
// 			if (infowindow)
// 			{
// 				infowindow.close();
// 			}

// 			infowindow.open(map, marker);
// 		});
// 	}
	
// 	if ($('#map-conteiner').length)
// 	{
// 		for (x in arr)
// 		{
// 			addMarker(arr[x], map);
// 		}
// 	}
// 	else if ($('#location-map').length)
// 	{
// 		addMarker(coords, map);
// 	}
	
// 	var center = [], category = '', x = null, w = null;

// 	$('body').on('click', '.j-marker', function(e){
// 		e.preventDefault();
// 		$('#map-markers').find('.active').removeClass('active');
// 		$(this).addClass('active');

// 		category = $(this).data('category');
// 		center = $(this).data('center').split(',');

// 		for (x in center)
// 		{
// 			center[x] = parseFloat(center[x]);
// 		}

// 		map.setCenter({lat: center[0], lng: center[1] });

// 		for (x in markers)
// 		{
// 			for (w in markers[x])
// 			{
// 				markers[x][w].setIcon({
// 		            url: '/images/ico/marker-' + x + '.svg'
// 		        });

// 		        markers[x][w].setZIndex(10);
// 			}
// 		}

// 		var markers_arr = markers[category];

// 		for (x in markers_arr)
// 		{
// 			markers_arr[x].setIcon({
// 	            url: '/images/ico/marker-' + category + '-active.svg'
// 	        });

// 	        markers_arr[x].setZIndex(99999999);
// 		}
// 	});
// }