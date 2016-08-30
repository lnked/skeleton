var app = app || {};

;(function(body){
    "use strict";

    var _this;

    app.sandwich = {

        config: {
            keyHooks: !1,
            selector: '.js-sandwich-menu',
            wrapper: '.layout-wrapper',
            overlay: '.overlay'
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

        isOpen: function()
        {
            return $('body').hasClass('page-visible');
        },

        hide: function()
        {
            $('body').removeClass('page-open');

            setTimeout(function(){
                $('body').removeClass('page-visible');
            }, 10);

            $(this.config.overlay).css({
                'visibility': 'hidden'
            });
        },

        toggle: function()
        {
            if ($('body').hasClass('page-visible'))
            {
                $('body').removeClass('page-open');

                setTimeout(function(){
                    $('body').removeClass('page-visible');
                }, 200);
            }
            else
            {
                $('body').addClass('page-open');

                setTimeout(function(){
                    $('body').addClass('page-visible');
                }, 10);
            }

            var visibility = 'visible';

            if (!$('body').hasClass('page-open'))
            {
                visibility = 'hidden'
            }
            
            $(_this.config.overlay).css({
                'visibility': visibility
            });
        },

        sandwichTrigger: function()
        {
            _this = this;

            if (_this.config.keyHooks)
            {
                $('body').on('keydown', function(e) {
                    if(e.keyCode == 27 && _this.isOpen())
                    {
                        _this.toggle();
                    }
                });
            };

            $('body').on('click', _this.config.selector, function(e){
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                _this.toggle();
            });
        },

        overlayTrigger: function()
        {
            _this = this;

            $('body').on('click', _this.config.overlay, function(e){
                _this.hide();
            });
        },

        init: function(config)
        {
            this.extend(config);
            this.sandwichTrigger();
            this.overlayTrigger();
        }

    };

})(document.body);