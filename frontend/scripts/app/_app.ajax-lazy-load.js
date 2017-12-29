const app = app || {};

((body) => {
  // <div class="list" id="preload-list">
  //     {# item #}
  // </div>

  // <div class="preloader" id="preload-spinner">
  //     <div class="spinner"></div>
  // </div>

  const width = $(window).width();

  let $content = '';
  let $scroller = '';

  const $preload = $('#preload-list');
  const $spinner = $('#preload-spinner');

  if (width <= 667) {
    $scroller = $(window);
    $content = $('#content');
  } else {
    $scroller = $('#scroller');
    $content = $('#content');
  }

  app.lazyload = {
    page: null,

    element: '',

    destroy() {
      $scroller.off('scroll.preload');
      $spinner.removeClass('is-active');
    },

    processData(data) {
      const _this = this;

      if (!data.length) {
        _this.destroy();
      } else {
        const page = _this.page.split('.')[0];

        const $list = $(template(`tmpl-${page}-list`, {
          list: data
        }));

        $preload.append($list);

        $spinner.removeClass('is-active');
      }
    },

    scroll(page, element) {
      this.page = page;
      this.element = element;

      const _this = this;

      let isFocused = false;
      let progress = false;
      let compareTime = new Date().getTime();

      $(window).on('blur focus', (e) => {
        if (e.type === 'focus' && !isFocused) {
          isFocused = true;
          compareTime = new Date().getTime();
          $scroller.trigger('scroll.preload');
        }
      });

      $scroller.on('scroll.preload', () => {
        const difference =
                    Math.floor($content.height() - $scroller.height()) - 200;
        const currentTime = new Date().getTime();

        if (
          $scroller.scrollTop() >= difference &&
                    currentTime - compareTime > 300 &&
                    !progress
        ) {
          progress = true;
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
              progress = false;
              _this.processData(response);
            },
            error: (response) => {
              _this.destroy();
            }
          });
        }
      });
    },

    init() {
      if (typeof lazyLoadPage !== 'undefined') {
        let element = '';

        if (typeof lazyLoadItem !== 'undefined') {
          element = lazyLoadItem;
        }

        if (
          typeof lazyLoadCount !== 'undefined' &&
                    typeof lazyLoadLimit !== 'undefined' &&
                    lazyLoadCount > lazyLoadLimit
        ) {
          this.scroll(lazyLoadPage, element);
        }
      }
    }
  };
})(document.body);
