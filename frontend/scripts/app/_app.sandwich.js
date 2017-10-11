var app = app || {};

;(function(body){
    "use strict";

    const $body = $('body');

    app.sandwich = {

        config: {
            keyHooks: !1,
            selector: '.js-sandwich-menu',
            wrapper: '.layout-wrapper',
            overlay: '.overlay'
        },

        extend (config)
        {
            const _this = this;

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

        isOpen ()
        {
            return $body.hasClass('page-visible');
        },

        hide ()
        {
            const _this = this;
            $body.removeClass('page-open');

            setTimeout(function(){
                $body.removeClass('page-visible');
            }, 200);

            if (_this.config.overlay) {
                $(_this.config.overlay).css({
                    'visibility': 'hidden'
                });
            }
        },

        show () {
            const _this = this;
            $body.addClass('page-open');

            setTimeout(function(){
                $body.addClass('page-visible');
            }, 10);
            
            if (_this.config.overlay) {
                $(_this.config.overlay).css({
                    'visibility': 'visible'
                });
            }
        },

        toggle ()
        {
            const _this = this;

            if ($body.hasClass('page-visible')) {
                _this.hide();
            }
            else {
                _this.show();
            }
        },

        sandwichTrigger ()
        {
            const _this = this;

            if (_this.config.keyHooks)
            {
                $body.on('keydown', function(e) {
                    if(e.keyCode == 27 && _this.isOpen())
                    {
                        _this.toggle();
                    }
                });
            };

            $body.on('click', _this.config.selector, function(e){
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                _this.toggle();
            });
        },

        overlayTrigger ()
        {
            const _this = this;

            if (_this.config.overlay) {
                $body.on('click', _this.config.overlay, function(e){
                    _this.hide();
                });   
            }
        },

        events ()
        {
            const _this = this;

            var hammertime = new Hammer(document.body, {
                enable: true,
                recognizers: [
                    [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
                ]
            });

            hammertime.on('swipeleft', function(ev) {
                _this.hide();
            });

            hammertime.on('swiperight', function(ev) {
                _this.show();
            });
        },

        init ()
        {
            this.extend({
                keyHooks: !0,
                selector: '.j-sandwich-menu',
                wrapper: '.layout-wrapper',
                overlay: false
            });

            this.events();
            this.sandwichTrigger();
            this.overlayTrigger();
        }
    };

})(document.body);