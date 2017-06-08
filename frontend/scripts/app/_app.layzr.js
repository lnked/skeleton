let app = app || {};

((body => {
    "use strict";

    app.layzr = {
        init: function()
        {
            $(window).lazyLoadXT({
                edgeY:  200,
                srcAttr: 'data-src'
            });
        }
    };

}))(document.body);
