var app = app || {};

(function(body){
    "use strict";

    app.faq = {

        init: function() {
            $('body').on('click', '.j-faq-trigger', function(e){
                e.preventDefault();

                var $faq = $(this).closest('.j-faq');
                $faq.toggleClass('_open');

                return !1;
            });
        }

    };

})(document.body);