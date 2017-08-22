var app = app || {};

(function(body){
    "use strict";

    app.pagination = {

        addQuery: function (params)
        {
            if (location.search.length && params.length) {
                var query = location.search.substr(1);
                var x = '';
                var sample = '';
                var result = {};

                query.split("&").forEach(function(part) {
                    var item = part.split("=");
                    result[item[0]] = decodeURIComponent(item[1]);
                });

                for(x in params) {
                    var opt = params[x];

                    if (typeof(result[opt]) !== 'undefined') {
                        sample += '&' + opt + '=' + result[opt]
                    }
                }

                return sample;
            }
        },

        use: function ()
        {
            if ($('.j-pagination').length)
            {
                var _this = this;

                $('.j-pagination').each(function(){
                    if (typeof($(this).data('pagination')) !== 'undefined')
                    {
                        var config = $(this).data('pagination'), p, options = {};
                        var width = $(window).width();

                        options.cssStyle = 'light-theme';
                        options.selectOnClick = false;
                        options.ellipsePageSet = true;
                        options.hrefTextPrefix = '?page=';

                        if (width <= 375) {
                            options.edges = 0;
                            options.displayedPages = 3;
                        } else if (width <= 768) {
                            options.edges = 2;
                            options.displayedPages = 5;
                            options.displayedPages = 6;
                        } else {
                            options.edges = 4;
                            options.displayedPages = 8;
                        }

                        options.hrefTextSuffix = _this.addQuery(['sort', 'direction']);

                        options.onPageClick = function(pageNumber, event) {
                            window.location.href = options.hrefTextPrefix + pageNumber;
                        };

                        for (p in config)
                        {
                            options[p] = config[p];
                        }

                        $(this).pagination(options);
                    }
                });
            }
        },

        init: function()
        {
            this.use();
        }

    };

})(document.body);

// this.pagination.init();

// <nav class="pagination" data-pagination='{"currentPage":1, "pages":5}'></nav>
// <nav class="pagination" data-pagination='{"displayedPages":5}'></nav>
// <nav class="pagination" data-pagination='{"items":200, "itemsOnPage":10}'></nav>