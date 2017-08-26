let app = app || {};

((body => {
    "use strict";

    app.mask = {

        bind() {
            $(window).on('scroll', function(){
                if( $(window).scrollTop() > $(document).height() - $(window).height() ) {
                    //вызов апи
                }
            }).scroll();
        },

        init() {
            this.bind();
        }
    };

}))(document.body);