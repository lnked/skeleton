(function($) {
    "use strict";

    $.navigation = {
        options:
        {
            menu: '',
            link: '',
            anchor: '',
            currentClass: '',
            menuHeight: 0,
            lastId: '',
            scrollItems: [],
            menuItems: [],
            menuPosition: 0
        },

        change: function(scrollTop)
        {
            scrollTop += $.navigation.options.menuHeight;
            
            var cur = $.navigation.options.scrollItems.map(function(){
                if ($(this).offset().top < scrollTop)
                {
                    return this;
                }
            });
            
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            
            if ($.navigation.options.lastId !== id)
            {
                var section = id.replace($.navigation.options.anchor, ''),
                    $item = $.navigation.options.menuItems.filter('[href="#'+section+'"]');

                $.navigation.options.lastId = id;
                $.navigation.options.menuItems.removeClass($.navigation.options.currentClass);
                $item.addClass($.navigation.options.currentClass);

                location.hash = section;
            }
        },

        calc: function()
        {
            var $item;

            $.navigation.options.scrollItems = $.navigation.options.menuItems.map(function(){
                $item = $(this.hash + $.navigation.options.anchor);
                
                if ($item.length)
                {
                    return $item;
                }
            });
        },

        scrollSection: function(hash, animate)
        {
            hash = hash + $.navigation.options.anchor;
            
            var $target = $(hash);

            if ($target.length)
            {
                var top = $target.offset().top - 15;
                
                if (animate) {
                    $('html,body').stop().animate({ 'scrollTop': top }, 'fast', 'easeInOutCirc');
                }
                else {
                    $('html,body').scrollTop(top);
                }
            }
        },

        init: function(options)
        {
            $.navigation.options = $.extend(options);
            
            var $menu = $($.navigation.options.menu);

            if ($menu.length)
            {
                $.navigation.options.menuHeight = $menu.outerHeight();
               
                $.navigation.options.menuItems = $($.navigation.options.link);
                $.navigation.options.menuPosition = $menu.position().top;
                 
                $.navigation.calc();
    
                $.navigation.options.menuItems.on('click', function(e) {
                    $.navigation.scrollSection(this.hash, true);
                });
        
                $.navigation.change($(document).scrollTop());

                $(window).scroll(function(){
                    $.navigation.change($(document).scrollTop());
                });

                $(window).resize(function(){
                    $.navigation.calc();
                });

                setTimeout(function(){
                    if (window.location.hash.length > 1)
                    {
                        $.navigation.scrollSection(window.location.hash, false);
                    }
                }, 150);
            }
        }
    }

    $.navigation.init({
        menu: '#navigation',
        link: '.j-navigation',
        anchor: '-anchor',
        currentClass: 'current'
    });
})(jQuery);