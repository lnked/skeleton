;(function ( $, window, document ) {
    "use strict";

    var viewport = 0,
        wheight = $(window).height(),
        scrollTop;

    $.fn.viewport = function ( options ) {
        options = $.extend( {}, $.fn.viewport.options, options );

        $.fn.viewport.options.items = this;

        if (!$.fn.viewport.options.elements.length)
        {
            $.fn.viewport.calculate();
        }

        if ($.fn.viewport.options.elements.length)
        {
            $.fn.viewport.animate();
        }

        $(window).scroll(function(){
            $.fn.viewport.animate();
        });

        $(window).resize(function(){
            $.fn.viewport.calculate();
        });
    };

    $.fn.viewport.options = {
        items: {},
        elements: {}
    };

    $.fn.viewport.calculate = function() {
        $.fn.viewport.options.elements = $.fn.viewport.options.items.map(function(){
            if ($(this).length) {
                return $(this);
            }
        });
    }

    $.fn.viewport.animate = function() {
        scrollTop = $(window).scrollTop();

        $.fn.viewport.options.elements.map(function(){
            viewport = scrollTop + wheight;

            if ($(this).offset().top <= viewport && !$(this).hasClass('animate'))
            {
                $(this).addClass('animate');
            }
        });
    }

    $('.j-scroll-animate').viewport();

})( jQuery, window, document );