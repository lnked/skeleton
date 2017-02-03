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
                });

                // "fullscreenControl" - кнопка разворачивания карты на весь экран control.FullscreenControl;
                // "geolocationControl" - кнопка определения местоположения пользователя control.GeolocationControl;
                // "routeEditor" - кнопка включения и отключения поведения "редактор маршрута" control.RouteEditor;
                // "rulerControl" - кнопка включения и отключения поведения "линейка" control.RulerControl;
                // "searchControl" - панель поиска control.SearchControl;
                // "trafficControl" - панель пробок control.TrafficControl;
                // "typeSelector" - панель переключения типа карты control.TypeSelector;
                // "zoomControl" - ползунок масштаба control.ZoomControl;
                // "smallMapDefaultSet" - базовый набор элементов управления, оптимизированный для карт небольшого размера и экранов телефонов. Состоит из элементов управления "zoomControl", "searchControl", "typeSelector", "geolocationControl" и "fullscreenControl". В этом наборе все элементы управления минимизированы до кнопок с пиктограммами.
                // "mediumMapDefaultSet" - набор элементов управления, оптимизированный для карт среднего размера и экранов планшетов. Помимо базового набора элементов управления (см. выше), добавляет дополнительно элементы управления "rulerControl" и "trafficControl".
                // "largeMapDefaultSet" - набор элементов управления, оптимизированный для карт большого размера и экранов десктопных компьютеров. Отличается от набора "mediumMapDefaultSet" наличием элемента управления "routeEditor" и отсутствием элемента управления "fullScreen";
                // "default" - набор элементов управления по умолчанию; синоним для набора "mediumMapDefaultSet".

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