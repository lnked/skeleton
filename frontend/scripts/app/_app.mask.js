let app = app || {};

((body => {
    "use strict";

    app.mask = {

        bind(selector = '.mask-phone') {
            new Cleave(selector, {
                phone: true,
                phoneRegionCode: 'ru'
            });
        },

        init() {
            const _this_ = this;

            _this_.bind();

            $('body').on('popup.after_open', function(e, popup) {

                setTimeout(() => {
                    _this_.bind($(popup).find('.mask-phone'));
                }, 100);
            });
        }
    };

}))(document.body);