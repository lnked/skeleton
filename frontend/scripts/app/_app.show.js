let app = app || {};

((body => {
    "use strict";

    app.show = {

        trigger: function()
        {
            $('body').on('click', '.j-show', function(e) {
                e.preventDefault();

                var href = $(this).attr('href');

                if ($(href).length) {
                    $(href).addClass('is-show');
                }
                
                $(this).hide();

                return false;
            });
        },

        init: function()
        {
            this.trigger();
        }

    };

}))(document.body);