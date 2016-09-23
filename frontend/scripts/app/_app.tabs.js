var app = app || {};

(function(body){
    "use strict";

    app.tabs = {

        init: function() {
            var $wrapper = null, tab = '';

            $('body').on('click', '.j-tab-trigger', function(e){
                e.preventDefault();

                if (!$(this).hasClass('_open')) {
                    tab = $(this).data('tab');

                    $wrapper = $(this).closest('.j-tab-wrapper');

                    $wrapper.find('.j-tab-trigger').removeClass('_current');
                    $wrapper.find('.j-tab-item').removeClass('_open');

                    $wrapper.find('#tab-'+tab).addClass('_open');
                    $(this).addClass('_current');
                }

                return !1;
            });
        }

    };

})(document.body);