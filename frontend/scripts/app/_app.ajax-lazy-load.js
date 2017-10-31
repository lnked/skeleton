let app = app || {};

((body => {
    "use strict";

    // <div class="list" id="preload-list">
    //     {# item #}
    // </div>

    // <div class="preloader" id="preload-spinner">
    //     <div class="spinner"></div>
    // </div>

    const $content = $('#content');
    const $scroller = $('#scroller');

    const $preload = $('#preload-list');
    const $spinner = $('#preload-spinner');

    app.lazyload = {

        page: null,

        element: '',

        destroy () {
            $scroller.off('scroll.preload');
            $spinner.removeClass('is-active');
        },

        processData (data)
        {
            const _this = this;

            if (!data.length)
            {
                _this.destroy();
            }
            else
            {
                const $list = $(template(`tmpl-${_this.page}-list`, {
                    list: data
                }));

                $preload.append($list);

                $spinner.removeClass('is-active');
            }
        },

        scroll (page, element)
        {
            this.page = page;
            this.element = element;

            const _this = this;

            let compareTime = new Date().getTime();

            $scroller.on('scroll.preload', () => {

                const difference = Math.ceil($content.height() - $scroller.height());
                const currentTime = new Date().getTime();

                if ($scroller.scrollTop() == difference && (currentTime - compareTime) > 300)
                {
                    compareTime = new Date().getTime();

                    $spinner.addClass('is-active');

                    const action = [];

                    action.push('ajax/load');
                    action.push(_this.page);

                    if (_this.element) {
                        action.push(_this.element);
                    }

                    $.ajax({
                        url: `/${action.join('/')}`,
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

            if (typeof lazyLoadPage !== 'undefined')
            {
                let element = '';

                if (typeof lazyLoadItem !== 'undefined')
                {
                    element = lazyLoadItem;
                }

                this.scroll(lazyLoadPage, element);
            }

        }

    };

}))(document.body);
