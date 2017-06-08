(function($) {
    "use strict";

    var that, top, changeItem, scrollToAnchor, $target, $element, $current, $navigationMap, $navigation = $('#navigation'), $hasScroll = $('html, body');
    var is_mobile = $(window).width() <= 667;

    $navigationMap = $('.j-section').map(function(){
        return {
            offset: $(this).offset().top - 0,
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

        if ($element !== null && $element.attr('id')) {
           
            $current = $navigation.find('.j-navigation[href="#' + $element.attr('id').split('-')[0] + '-section"]');

            if (!$current.hasClass('is-current')) {
                $navigation.find('.j-navigation.is-current').removeClass('is-current');
                $current.addClass('is-current');
            }
        }
    }

    scrollToAnchor = function(hash, animate) {
        hash = hash.replace('-section', '').split('?')[0];

        $target = $(hash + '-anchor');

        if ($target.length)
        {
            top = $target.offset().top - 0;
            is_mobile = $(window).width() <= 667;

            if (animate) {
                $hasScroll.stop().animate({ 'scrollTop': top }, 'medium', function(){
                    $navigation.removeClass('is-disabled');
                });
            }
            else {
                $hasScroll.scrollTop(top);
            }
        }
    }

    $('body').on('click', '.j-navigation', function(e) {
        $navigation.addClass('is-disabled');
        scrollToAnchor(this.hash, true);
    });

    setTimeout(function(){
        if (window.location.hash.length > 1) {
            $navigation.addClass('is-disabled');
            scrollToAnchor(window.location.hash, false);
        }
    }, 50);

    $(window).scroll(function(){
        changeItem($(window).scrollTop())
    });
})(jQuery);