var app = app || {};

(function(body){
    "use strict";

    app.fixmenu = {
        
        fixMenu: function($menu, t) {

            if (t >= (159)) {
                if (!$menu.hasClass('_sticked')) {
                    $menu.addClass('_sticked');
                }
            }
            else {
                if ($menu.hasClass('_sticked')) {
                    $menu.removeClass('_sticked');
                }
            }
            
        },

        init: function() {
            var $element = $('#navigation'),
                that = this;

            that.fixMenu($element, $(window).scrollTop());

            $(window).on('scroll', function(){
                that.fixMenu($element, $(window).scrollTop());
            });
        }

    };

})(document.body);