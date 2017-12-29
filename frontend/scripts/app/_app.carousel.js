var app = app || {};

(function(body) {
  app.carousel = {
    init() {
      if ($('.j-carousel').length) {
        $('.j-carousel').each(function() {
          const $carousel = $(this);

          if ($carousel.find('.slick-slide').length) {
            const count = 4;

            $carousel.slick({
              infinite: true,
              dots: false,
              draggable: true,
              speed: 170,
              slidesToShow: count,
              slidesToScroll: 1,
              swipeToSlide: true,
              prevArrow:
                                '<button type="button" class="carousel__control _prev slick-prev"></button>',
              nextArrow:
                                '<button type="button" class="carousel__control _next slick-next"></button>',
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });
          }
        });
      }
    }
  };
}(document.body));
