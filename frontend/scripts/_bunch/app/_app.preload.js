var app = app || {};

(function(body){
    "use strict";

    app.preload = {

        preload: function($image)
        {
            var url = $image.data('preload'), image = null;

            try {
                image = new Image();
                image.onload = function() {
                    $image.attr('src', url);
                };
                image.src = url;
            }
            catch (e) {
                $image.attr('src', url);
            }
            
            $image.removeAttr('width height');
            $image.data('preload', '');
        },

        init: function()
        {
            if ($('img[data-preload]').length)
            {
                var _this = this;
            
                $('img[data-preload]').each(function(){
                    (function($image){
                        _this.preload($image);
                    })($(this))
                });
            }
        }

    };

})(document.body);