let app = app || {};

((body => {
    "use strict";

    app.popup = {
        init: function()
        {
            const windowHeight = $(window).height();

            $.popup.init('.j-open-popup', {
                hashChange: false,
                cssPosition: false,
                wrapper: '.layout-wrapper'
            });

            $('body').on('popup.after_open', function(e, popup) {

                const height = $(popup).find('.popup__dialog').height() + 60;

                if (height >= windowHeight) {
                    $(popup).removeClass('flex-center flex-start').addClass('flex-start');
                } else {
                    $(popup).removeClass('flex-center flex-start').addClass('flex-center');
                }
            });
        }
    };

}))(document.body);
