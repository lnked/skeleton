let app = app || {};

((body => {
    "use strict";

    app.popup = {
        init: function()
        {
            $.popup.init('.j-open-popup', {
                hashChange: false,
                cssPosition: false,
                wrapper: '.layout-wrapper'
            });
        }
    };

}))(document.body);