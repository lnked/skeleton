let app = app || {};

((body => {
    "use strict";

    app.gallery = {
        init: function()
        {
            $('.zoom').fancybox();
        }
    };

}))(document.body);