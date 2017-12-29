function yandexMap() {
  ymaps.ready(() => {
    let YMap,
      myPlacemark,
      is_mobile = $(window).width() <= 667;

    YMap = new ymaps.Map('location-map', {
      center: [44.97093, 38.934538],
      zoom: 18,
      controls: ['zoomControl', 'fullscreenControl']
    });

    YMap.behaviors.disable('multiTouch');
    YMap.behaviors.disable('scrollZoom');
    YMap.controls.get('zoomControl').options.set('size', 'small');
    YMap.controls
      .get('zoomControl')
      .options.set('position', { right: 10, top: 50 });

    if (is_mobile) {
      YMap.behaviors.disable('drag');
    }

    myPlacemark = new ymaps.Placemark(
      YMap.getCenter(),
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '/images/ico/location-pin.svg',
        iconImageSize: [29, 40],
        iconImageOffset: [-29, -40]
      }
    );

    YMap.geoObjects.add(myPlacemark);
  });
}
