let app = app || {};

((body => {
    "use strict";

    app.scroll = {

        disableHover () {
            var timer;
            window.addEventListener('scroll', function() {
                clearTimeout(timer);
                
                if(!body.hasClass('disable-hover')) {
                    body.addClass('disable-hover');
                }

                timer = setTimeout(function(){
                    body.removeClass('disable-hover');
                },500);
            }, false);
        },

        bind() {
            $(window).on('scroll', function(){
                if( $(window).scrollTop() > $(document).height() - $(window).height() ) {
                    //вызов апи
                }
            }).scroll();
        },

        init() {
            this.bind();
            this.disableHover();
        }
    };

}))(document.body);