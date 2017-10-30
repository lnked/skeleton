let app = app || {};

((body => {
    "use strict";

    const $content = $('#content');
    const $catalog = $('#catalog-list');
    const $preload = $('#catalog-preload');
    const $scroller = $('#scroller');

    app.lla = {

        destroy () {
            $scroller.off('scroll.preload');
            $preload.removeClass('is-active');
        },

        processData (data) {

            if (!data.length) {
                this.destroy();
            }
            else
            {
                const $products = $(template('tmpl-catalog-products', {
                    products: data
                }));

                $catalog.append($products);

                $preload.removeClass('is-active');
            }
        },

        scroll () {
            const _this = this;

            $scroller.on('scroll.preload', () => {

                const difference = Math.ceil($content.height() - $scroller.height());

                if ($scroller.scrollTop() == difference)
                {
                    $preload.addClass('is-active');

                    $.ajax({
                        url: '/ajax/load',
                        type: 'get',
                        dataType: 'JSON',
                        contentType: false,
                        processData: true,
                        success: (response) => {
                            _this.processData(response);
                        },
                        error: (response) => {
                            _this.destroy();
                        }
                    });

                }

            }).trigger('scroll');

        },

        init () {

            this.scroll();

        }

    };

}))(document.body);
