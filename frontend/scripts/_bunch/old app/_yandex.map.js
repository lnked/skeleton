if ($('.j-map-coords').length)
{
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=initYmap','ym');

    var _t = $('.j-map-coords').data('coords'), _x = null, _c = null, _n = null, _b = null, _key_ = null, _arr_ = null, coords = [], center = [];
    
    if (!is_undefined(_t))
    {
        if (_t.indexOf('|') >= 0)
        {
            _c = _t.split('|');

            for (_x in _c)
            {
                if (_c[_x].indexOf(':') >= 0)
                {
                    _b = _c[_x].split(':');

                    _key_ = _b[0];
                    _arr_ = _b[1];

                    if (is_undefined(coords[_key_]))
                    {
                        coords[_key_] = [];
                    }

                    _n = _arr_.split(',');

                    if (!is_undefined(_n[0]) && !is_undefined(_n[1]))
                    {
                        coords[_key_].push([trim(_n[0]), trim(_n[1])]);

                        if (!center.length)
                        {
                            center = [trim(_n[0]), trim(_n[1])];
                        }
                    }
                }
                else if (_c[_x].indexOf(',') >= 0)
                {
                    _b = _c[_x].split(',');

                    for (_n in _b)
                    {
                        coords[_x][_n] = trim(_b[_n]);
                    }
                }
            }
        }
        else if (_t.indexOf(';') >= 0)
        {
            _c = _t.split(';');

            for (_x in _c)
            {
                coords[_x] = trim(_c[_x]);
            }

            center = coords;
        }
        else if (_t.indexOf(',') >= 0)
        {
            _c = _t.split(',');

            for (_x in _c)
            {
                coords[_x] = trim(_c[_x]);
            }

            center = coords;
        }
    }

    function GPlacemark(point, icon)
    {
        if (!is_undefined(point) && point.length)
        {
            if (is_undefined(icon))
            {
                icon = '/images/ico/marker-icon.svg';
            }

            return new ymaps.Placemark([point[0], point[1]], {}, {
                iconLayout: 'default#image',
                iconImageHref: icon,
                iconImageSize: [34, 44],
                iconImageOffset: [-17, -44]
            });
        }
    }

    function initYmap()
    {
        var YMap, YPlacemark, YZoom;

        ymaps.ready(function(){
            YZoom = 17;

            if (is_undefined(coords[0]))
            {
                YZoom = 14;
            }
            
            if (!is_undefined(center))
            {
                YMap = new ymaps.Map("location-map", {
                    center: [center[0], center[1]],
                    zoom: YZoom,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                YMap.behaviors.disable('scrollZoom');

                YMap.controls.get('zoomControl').options.set('size', 'small');
                YMap.controls.get('zoomControl').options.set('position', { right: 10, top: 50 });
            }

            if (is_undefined(coords[0]))
            {
                var _x_, _u_, _cat_, placemarks = {};

                for (_x_ in coords)
                {
                    if (coords[_x_].length)
                    {
                        _cat_ = coords[_x_];

                        for (_u_ in _cat_)
                        {
                            if (is_undefined(placemarks[_x_]))
                            {
                                placemarks[_x_] = {};
                            }

                            placemarks[_x_][_u_] = GPlacemark([_cat_[_u_][0], _cat_[_u_][1]], '/images/ico/marker-' + _x_ + '.svg');
                            YMap.geoObjects.add(placemarks[_x_][_u_]);
                        }
                    }
                }

                $('body').on('click', '.j-marker', function(e){
                    e.preventDefault();

                    if (!$(this).hasClass('active'))
                    {
                        $('#map-markers').find('.active').removeClass('active');
                        $(this).addClass('active');

                        var cat = $(this).data('category'),
                            cnt = $(this).data('center').split(','), x = null, c = null;

                        for (x in cnt)
                        {
                            cnt[x] = trim(cnt[x]);
                        }

                        YMap.setCenter([cnt[0], cnt[1]]);
                        
                        // Default Icon

                        for (x in placemarks)
                        {
                            if (x !== cat)
                            {
                                for (c in placemarks[x])
                                {
                                    placemarks[x][c].options.set({
                                        zIndex: 10,
                                        iconImageHref: '/images/ico/marker-' + x + '.svg'
                                    });
                                }
                            }
                        }

                        // Change icon
                        for (x in placemarks[cat])
                        {
                            placemarks[cat][x].options.set({
                                zIndex: 99999999,
                                iconImageHref: '/images/ico/marker-' + cat + '-active.svg'
                            });
                        }
                    }
                });
            }
            else
            {
                YMap.geoObjects.add(GPlacemark([coords[0], coords[1]]));
            }
        });
    }
}