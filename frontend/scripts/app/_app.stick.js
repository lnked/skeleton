var app = app || {};

(function(body) {
  let _this,
    _scrollTop,
    _timeout;

  app.stick = {
    config: {
      delay: 20,
      element: '.js-stick'
    },

    cache: [],

    offset: [],

    calc() {
      _this = this;

      if ($(_this.config.element).length) {
        let top = 0;

        $(_this.config.element).map(function(index) {
          $(this).addClass(`js-stick-${index}`);

          top = $(this).offset().top;

          if ($(this).data('offset')) {
            top -= parseInt($(this).data('offset'));
          }

          _this.cache[index] = top;
          _this.offset[index] = $(this).offset().left;
        });
      }
    },

    resize() {
      _this = this;

      $(window).on('resize', () => {
        _this.calc();
      });
    },

    check() {
      _this = this;

      _scrollTop = $(window).scrollTop();

      let x,
        stick;

      for (x in _this.cache) {
        stick = $(`.js-stick-${x}`);

        if (_scrollTop >= _this.cache[x]) {
          if (!stick.hasClass('sticked')) {
            stick.addClass('sticked');
            stick.css({
              left: `${_this.offset[x]}px`
            });
          }
        } else if (stick.hasClass('sticked')) {
          stick.removeAttr('style');
          stick.removeClass('sticked');
        }
      }
    },

    initScroll() {
      _this = this;

      $(window).on('scroll', (e) => {
        clearTimeout(_timeout);

        _timeout = setTimeout(() => {
          _this.check();
        }, _this.config.delay);
      });
    },

    init() {
      this.calc();
      this.check();
      this.resize();

      this.initScroll();
    }
  };
}(jQuery));
