(function($) {
    "use strict";

    var that, top, changeItem, scrollToAnchor, $target, $element, $current, $navigationMap, $navigation = $('#navigation'), $hasScroll = $('html, body');
    var is_mobile = $(window).width() <= 667;

    $navigationMap = $('.j-section').map(function(){
        return {
            offset: $(this).offset().top,
            element: $(this)
        }
    });

    changeItem = function(scrollTop) {
        $element = null;

        $navigationMap.map(function(){
            that = $(this)[0];
            if (that.offset < scrollTop) {
                $element = that.element; 
            }
        })

        if ($element !== null && $element.data('screen')) {
            $current = $navigation.find('.j-navigation[href="#' + $element.data('screen') + '"]');

            if (!$current.hasClass('current')) {
                $navigation.find('.j-navigation.current').removeClass('current');
                $current.addClass('current');
            }
        }
    }

    scrollToAnchor = function(hash, animate) {
        $target = $(hash + '-anchor');

        if ($target.length)
        {
            is_mobile = $(window).width() <= 667;
            top = $target.offset().top;

            if (is_mobile) {
                top = top - 100
            }

            if (animate) {
                $hasScroll.stop().animate({ 'scrollTop': top }, 'medium', 'easeInOutCirc');
            }
            else {
                $hasScroll.scrollTop(top);
            }
        }
    }

    $('.j-navigation').on('click', function(e) {
        scrollToAnchor(this.hash, animate);
    });

    setTimeout(function(){
        if (window.location.hash.length > 1) {
            scrollToAnchor(window.location.hash, animate);
        }
    }, 150);

    $(window).scroll(function(){
        changeItem($(window).scrollTop())
    });
})(jQuery);