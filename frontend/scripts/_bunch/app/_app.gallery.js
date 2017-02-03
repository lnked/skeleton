var app = app || {};

(function(body){
    "use strict";

    app.gallery = {

        init: function() {

            if ($('.j-gallery').length) {
                $('.j-gallery').each(function(){
                    $(this).magnificPopup({
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
                });

                $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }
            
        }

    };

})(document.body);