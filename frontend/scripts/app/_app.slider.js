var app = app || {};

(function(body){
    "use strict";

    app.slider = {

        init: function() {
            if ($('.j-slider').length && $('.j-slider').find('.slick-slide').length)
            {
                var count = 1, classname = 'slider', prefix = 'slider', $slider = '', width = $(window).width(), options = {};

                $('.j-slider').each(function(){
                    count = 1;
                    classname = 'slider';

                    if ($(this).data('prefix')) {
                        prefix = $(this).data('prefix');
                    }

                    options = {
                        fade: true,
                        dots: true,
                        speed: 500,
                        infinite: true,
                        autoplay: false,
                        draggable: false,
                        autoplaySpeed: 6500,
                        pauseOnHover: false,
                        useTransform: false,
                        variableWidth: false,
                        cssEase: 'linear',
                        responsive: [
                            {
                                breakpoint: 950,
                                settings: {
                                    dots: false,
                                    autoplay: true,
                                    draggable: true
                                }
                            }
                        ]
                    };
                    
                    $slider = $(this);

                    if ($slider.data('viewcount'))
                    {
                        count = parseInt($slider.data('viewcount'));
                    }

                    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                        console.log(currentSlide, nextSlide);
                        
                        var $current = $(slick.$slides[currentSlide]);
                        var $next = $(slick.$slides[nextSlide]);
                        // $next.find('.j-after-slide').removeClass('is-show is-animate');
                    });

                    $slider.on('afterChange', function(event, slick, currentSlide){
                        var $current = $(slick.$slides[currentSlide]);
                        $current.find('.j-after-slide').addClass('is-show');
                        
                        setTimeout(function(){
                            $current.find('.j-after-slide').addClass('is-animate');
                        }, 10);
                    });

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
                        options['prevArrow'] = '<button type="button" class="' + prefix + '__nav _prev slick-prev"></button>';
                        options['nextArrow'] = '<button type="button" class="' + prefix + '__nav _next slick-next"></button>';
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