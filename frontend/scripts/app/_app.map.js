var app = app || {};

(function(body){
    "use strict";

    app.map = {
        
        _mapObject: null,

        _geoObject: null,

        getData: function($element) {
            var x, wrap_id = null, coords = null;

            if ($element.data('coords')) {
                coords = $element.data('coords').split(',');

                for (x in coords) {
                    coords[x] = $.trim(coords[x]);
                }

                if (coords.length !== 2) {
                    coords = null;
                }
            }

            if ($element.attr('id')) {
                wrap_id = $element.attr('id');
            }

            return {
                id: wrap_id,
                coords: coords
            }
        },

        drowMap: function($element) {
            
            var that = this, data = this.getData($element);

            ymaps.ready(function(){

                that._mapObject = new ymaps.Map(data.id, {
                    center: [data.coords[0], data.coords[1]],
                    zoom: 13,
                    controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl']
                }),

                that._mapObject.behaviors.disable('scrollZoom');

                that._mapObject.controls.get('zoomControl').options.set('size', 'small');
                that._mapObject.controls.get('zoomControl').options.set('position', { right: 10, top: 50 });

                that._mapObject.geoObjects
                    .add(new ymaps.Placemark([data.coords[0], data.coords[1]], {}, {
                        preset: 'islands#dotIcon',
                        iconColor: '#735184'
                    }))

            });

        },

        init: function() {
            var that = this;

            if ($('.j-map').length) {
                $('.j-map').each(function(){
                    that.drowMap($(this));
                });
            }
        }

    };

})(document.body);