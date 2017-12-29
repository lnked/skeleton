var app = app || {};

(function(body) {
  const $body = $('body');

  app.slider = {
    config: {
      slider: '.j-slider',
      item: '.j-slider-item',
      prev: '.j-slider-prev',
      next: '.j-slider-next',
      point: '.j-slider-point',
      height: '.j-slider-height-trigger'
    },

    limit: 0,

    current: 1,

    autoplay: true,

    autoplaySpeed: 4000,

    timeout: 500,

    interval: null,

    lock() {
      $(`${this.config.prev}, ${this.config.next}, ${this.config.point}`).addClass('is-lock');
    },

    unlock() {
      $(`${this.config.prev}, ${this.config.next}, ${this.config.point}`).removeClass('is-lock');
    },

    reset() {
      const _this = this;

      const $active = $(`${_this.config.item}.is-active`);

      $active.removeClass('is-animate');

      $(`${_this.config.point}.is-current`).removeClass('is-current');

      setTimeout(() => {
        $active.removeClass('is-active');
      }, _this.timeout);
    },

    go(slide, start) {
      const _this = this;

      _this.reset();
      _this.current = slide;

      $(`${this.config.point}[data-index="${slide}"]`).addClass('is-current');

      const $slide = $(`${this.config.item}[data-index="${slide}"]`);

      $slide.addClass('is-active');

      setTimeout(() => {
        $slide.addClass('is-animate');
      }, 16);

      setTimeout(() => {
        _this.unlock();

        if (start) {
          _this.start();
        }
      }, _this.timeout);
    },

    prev(start) {
      this.lock();

      let prev = this.current - 1;

      if (prev <= 0) {
        prev = this.limit;
      }

      this.go(prev, start);
    },

    next(start) {
      this.lock();

      let next = this.current + 1;

      if (next > this.limit) {
        next = 1;
      }

      this.go(next, start);
    },

    size() {
      const _this = this;

      if ($(`${_this.config.slider}`).length) {
        $(`${_this.config.slider}`).each(function() {
          const $slider = $(this);
          const $items = $slider.find(`${_this.config.item}`);
          const height = $items
            .eq(0)
            .find(`${_this.config.height}`)
            .outerHeight();

          $slider.css({ height });
          $items.css({ height });
        });
      }
    },

    prepare() {
      this.size();
      this.limit = $(`${this.config.point}`).length;
    },

    events() {
      const _this = this;

      $(window).on('resize', (e) => {
        _this.size();
      });

      $body.on('click', `${this.config.prev}`, (e) => {
        e.preventDefault();

        _this.stop();

        _this.prev(true);

        return false;
      });

      $body.on('click', `${this.config.next}`, (e) => {
        e.preventDefault();

        _this.stop();

        _this.next(true);

        return false;
      });

      $body.on('click', `${this.config.point}`, (e) => {
        e.preventDefault();

        _this.stop();

        _this.lock();

        const $this = $(e.currentTarget);

        _this.go(parseInt($this.data('index'), 10), true);

        return false;
      });
    },

    stop() {
      clearInterval(this.interval);
    },

    start() {
      const _this = this;

      if (_this.autoplay) {
        _this.stop();

        _this.interval = setInterval(() => {
          _this.next(false);
        }, _this.autoplaySpeed);
      }
    },

    init() {
      this.prepare();
      this.events();
      this.start();
    }
  };
}(document.body));
