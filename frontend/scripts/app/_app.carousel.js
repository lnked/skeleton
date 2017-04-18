var app = app || {};

(function(body){
    "use strict";

    app.carousel = {

        init: function() {
            if ($('.j-carousel').length && $('.j-carousel').find('.slick-slide').length)
            {
                var count = 4, classname = 'carousel';

                $('.j-carousel').each(function(){
                    count = 4;
                    classname = 'carousel';

                    if ($(this).data('viewcount'))
                    {
                        count = parseInt($(this).data('viewcount'));
                    }

                    if ($(this).data('classname'))
                    {
                        classname = $(this).data('classname');
                    }

                    $(this).slick({
                        infinite: true,
                        dots: false,
                        draggable: true,
                        speed: 170,
                        slidesToShow: count,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        prevArrow: '<button type="button" class="'+classname+'__control _prev slick-prev"></button>',
                        nextArrow: '<button type="button" class="'+classname+'__control _next slick-next"></button>',
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
                });
            }
        }

    };

})(document.body);