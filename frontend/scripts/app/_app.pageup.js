var app = app || {};

(function(body){
    "use strict";

    app.pageup = {

        element: null,

        click: function()
        {
            this.element.on('click', function(e){
                e.preventDefault();
                
                $('html, body').stop().animate({ scrollTop: 0 }, "fast");

                return !1;
            });
        },

        check: function(sctop)
        {
            var _this = this;

            if (sctop > 150)
            {
                if (!_this.element.hasClass('is-show'))
                {
                    _this.element.addClass('is-show');
                }

                if (!_this.element.hasClass('is-animate'))
                {
                    setTimeout(function(){
                        _this.element.addClass('is-animate');
                    }, 10);
                }
            }
            else
            {
                _this.element.removeClass('is-animate');

                setTimeout(function(){
                    _this.element.removeClass('is-show');
                }, 150);
            }
        },

        init: function()
        {
            var _this = this;

            _this.element = $('.j-page-up');

            _this.check($(window).scrollTop());

            $(window).on('scroll', function(){
                _this.check($(window).scrollTop());
            });

            _this.click();
        }

    };

})(document.body);