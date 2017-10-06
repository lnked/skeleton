let app = app || {};

((body => {
    "use strict";

    app.layzr = {

        init: function()
        {
            lozad('img[data-src]', {
                load: function(el) {
                    el.src = el.dataset.src;

                    el.onload = function() {
                        el.classList.add('fade')
                        el.removeAttribute('data-src');
                    }
                }
            }).observe();

            // $(window).lazyLoadXT({
            //     edgeY:  200,
            //     srcAttr: 'data-src'
            // });
        }

    };

}))(document.body);
