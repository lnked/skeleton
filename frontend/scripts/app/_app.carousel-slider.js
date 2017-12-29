const app = app || {};

((body) => {
  const $slider = $('#carousel-slider');

  app.slider = {
    count: 0,
    current: 0,
    timeout: 26000,
    interval: null,

    preload($current) {
      app.preloader.preload($current.attr('id'));
    },

    drop(callback) {
      const $target = $slider.find('.j-slide.is-active');

      $target.addClass('is-last-active');
      $target.removeClass('is-active');

      callback();
    },

    bind() {
      const $target = $slider.find('.j-slide').eq(this.current);
      $target.addClass('is-active');

      this.preload($target);
      this.activateDot();

      setTimeout(() => {
        $slider
          .find('.j-slide.is-last-active')
          .removeClass('is-last-active');
      }, 1000);

      this.startInterval();
    },

    prev() {
      const _this = this;

      _this.stopInterval();

      _this.drop(() => {
        _this.current -= 1;

        if (_this.current === 0) {
          _this.current = _this.count;
        }

        _this.bind();
      });
    },

    next() {
      const _this = this;

      _this.stopInterval();

      _this.drop(() => {
        _this.current += 1;

        if (_this.current >= _this.count) {
          _this.current = 0;
        }

        _this.bind();
      });
    },

    goTo(index) {
      const _this = this;

      _this.stopInterval();

      _this.drop(() => {
        _this.current = index;
        _this.bind();
      });
    },

    dots() {
      let i = 0;
      let item = '';
      const dots = [];
      const _this = this;

      for (i = 0; i < _this.count; i++) {
        item = `<a href="#${
          i
        }" class="s-slider__dots__item j-slider-goto"></a>`;
        dots.push(item);
      }

      _this.dotsItem.html(dots.join(''));
      _this.dotsItem.addClass('is-active');

      $('body').on('click', '.j-slider-goto', function(e) {
        e.preventDefault();

        if (!$(this).hasClass('is-active')) {
          _this.goTo($(this)
            .attr('href')
            .substr(-1));
        }
      });
    },

    activateDot() {
      this.dotsItem
        .find('.j-slider-goto.is-active')
        .removeClass('is-active');
      this.dotsItem
        .find('.j-slider-goto')
        .eq(this.current)
        .addClass('is-active');
    },

    events() {
      this.arrowPrev.on('click', (e) => {
        e.preventDefault();
        this.prev();
      });

      this.arrowNext.on('click', (e) => {
        e.preventDefault();
        this.next();
      });
    },

    stopInterval() {
      clearInterval(this.interval);
    },

    startInterval() {
      this.interval = setInterval(() => {
        this.next();
      }, this.timeout);

      if (this.count) {
        this.preload($slider.find('.j-slide.is-active'));
        this.activateDot();
      }
    },

    make() {
      this.count = $slider.find('.j-slide').length;
      this.current = $slider.find('.j-slide.is-active').index();

      this.dotsItem = $('#carousel-slider--dots');
      this.arrowPrev = $('#carousel-slider--prev');
      this.arrowNext = $('#carousel-slider--next');

      this.arrowPrev.addClass('is-active');
      this.arrowNext.addClass('is-active');

      this.dots();

      this.events();

      this.startInterval();
    },

    init() {
      if ($slider.length && $slider.find('.j-slide').length) {
        this.make();
      }
    }
  };
})(document.body);
