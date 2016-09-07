var app = app || {};

(function(body){
    "use strict";

    app.gallery = {

        init: function() {
            $('.j-gallery').magnificPopup({
                type: 'image',
                delegate: 'a.zoom',
                removalDelay: 500,
                fixedContentPos: false,
                closeOnBgClick: true,
                gallery: {
                    enabled: true
                },
                callbacks: {
                     open: function() {
                        $('body').addClass('noscroll');
                     },
                     close: function() {
                         $('body').removeClass('noscroll');
                     }
                }
            });
        }

    };

})(document.body);