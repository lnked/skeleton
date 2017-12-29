var app = app || {};

(function(body) {
  app.pagination = {
    addQuery(params) {
      if (location.search.length && params.length) {
        const query = location.search.substr(1);
        let x = '';
        let sample = '';
        const result = {};

        query.split('&').forEach((part) => {
          const item = part.split('=');
          result[item[0]] = decodeURIComponent(item[1]);
        });

        for (x in params) {
          const opt = params[x];

          if (typeof result[opt] !== 'undefined') {
            sample += `&${opt}=${result[opt]}`;
          }
        }

        return sample;
      }
    },

    use() {
      if ($('.j-pagination').length) {
        const _this = this;

        $('.j-pagination').each(function() {
          if (typeof $(this).data('pagination') !== 'undefined') {
            let config = $(this).data('pagination'),
              p,
              options = {};
            const width = $(window).width();

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

            options.hrefTextSuffix = _this.addQuery([
              'sort',
              'direction'
            ]);

            options.onPageClick = function(pageNumber, event) {
              window.location.href =
                                options.hrefTextPrefix + pageNumber;
            };

            for (p in config) {
              options[p] = config[p];
            }

            $(this).pagination(options);
          }
        });
      }
    },

    init() {
      this.use();
    }
  };
}(document.body));

// this.pagination.init();

// <nav class="pagination" data-pagination='{"currentPage":1, "pages":5}'></nav>
// <nav class="pagination" data-pagination='{"displayedPages":5}'></nav>
// <nav class="pagination" data-pagination='{"items":200, "itemsOnPage":10}'></nav>
