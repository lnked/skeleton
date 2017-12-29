const app = app || {};

((body) => {
  app.google = {
    id: 'map-conteiner',

    coords: [45.046996, 39.030319],

    style: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36
          },
          {
            color: '#000000'
          },
          {
            lightness: 40
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on'
          },
          {
            color: '#000000'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
          {
            visibility: 'on'
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'labels.icon',
        stylers: [
          {
            saturation: '-100'
          },
          {
            lightness: '-54'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
          {
            visibility: 'on'
          },
          {
            lightness: '0'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [
          {
            saturation: '-89'
          },
          {
            lightness: '-55'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'on'
          },
          {
            saturation: '-100'
          },
          {
            lightness: '-51'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 17
          }
        ]
      }
    ],

    draw() {
      const _this_ = this;
      const coords = _this_.coords;

      const mapOptions = {
        zoom: 17,
        zoomControl: !1,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        panControl: !1,
        panControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scrollwheel: !1,
        navigationControl: !1,
        mapTypeControl: !1,
        scaleControl: !0,
        draggable: !0,
        disableDoubleClickZoom: !1,
        styles: _this_.style,
        center: new google.maps.LatLng(coords[0], coords[1])
      };

      const map = new google.maps.Map(
        document.getElementById(_this_.id),
        mapOptions
      );

      const image = {
        url: '/images/ico/marker.svg',
        size: new google.maps.Size(18, 27),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(18, 27),
        anchor: new google.maps.Point(18, 27)
      };

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(coords[0], coords[1]),
        map,
        icon: image,
        flat: true
      });

      google.maps.event.addListener(marker, 'click', () => {
        if (infowindow) {
          infowindow.close();
        }
        infowindow.open(map, marker);
      });
    }
  };
})(document.body);
