var app = app || {};

(function(body){
    "use strict";

    app.slider = {

        init: function() {
            if ($('.j-slider').length && $('.j-slider').find('.slick-slide').length)
            {
                var count = 1, classname = 'slider', $slider = '', width = $(window).width(), options = {};

                $('.j-slider').each(function(){
                    count = 1;
                    classname = 'slider';

                    options = {
                        fade: true,
                        dots: false,
                        speed: 500,
                        infinite: true,
                        autoplay: false,
                        draggable: false,
                        autoplaySpeed: 6500,
                        pauseOnHover: false,
                        useTransform: false,
                        variableWidth: false,
                        cssEase: 'linear' // ease
                    };
                    
                    $slider = $(this);

                    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                        var $current = $(slick.$slides[currentSlide]);
                        var $next = $(slick.$slides[nextSlide]);
                        console.log(currentSlide, nextSlide);
                    });

                    $slider.on('afterChange', function(event, slick, currentSlide){
                        var $current = $(slick.$slides[currentSlide]);
                        console.log(currentSlide);
                    });

                    if ($slider.data('viewcount'))
                    {
                        count = parseInt($slider.data('viewcount'));
                    }

                    if ($slider.hasClass('j-slider-calc'))
                    {
                        $slider.find('.slick-slide').css({
                            'width': width + 'px'
                        });
                    }

                    if ($slider.data('classname'))
                    {
                        classname = $slider.data('classname');
                    }
                    
                    if (!$slider.hasClass('j-disable-navigation'))
                    {
                        options['prevArrow'] = '<button type="button" class="slider__nav _prev slick-prev"></button>';
                        options['nextArrow'] = '<button type="button" class="slider__nav _next slick-next"></button>';
                    }
                    else
                    {
                        options['arrows'] = false;
                    }

                    $slider.slick(options);
                });
            }
        }

    };

})(document.body);