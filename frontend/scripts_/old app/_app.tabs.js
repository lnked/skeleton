;(function ($) {
    "use strict";

    $.app = $.app || {};

    $.app.tabs = {

        config: {
            mouseevent:   'click',
            attribute:    'href',
            animation:    false,
            autorotate:   false,
            pauseonhover: true,
            delay:        2000,
            active:       1,
            container:    false,
            controls:     {
                prev: '.prev',
                next: '.next'
            }
        },

        extend: function(config)
        {
            _this = this;

            if (typeof config !== 'undefined')
            {
                var x;
                for (x in config)
                {
                    if (typeof _this.config[x] !== 'undefined')
                        _this.config[x] = config[x];
                }
            }
        },

        init: function(config)
        {
            this.extend(config);
        }

    };

})(jQuery);