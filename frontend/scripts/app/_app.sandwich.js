var app = app || {};

(function(body) {
  const $body = $('body');

  app.sandwich = {
    width: 0,

    config: {
      keyHooks: !1,
      selector: '.js-sandwich-menu',
      wrapper: '.layout-wrapper',
      overlay: '.overlay'
    },

    extend(config) {
      const _this = this;

      if (typeof config !== 'undefined') {
        let x;
        for (x in config) {
          if (typeof _this.config[x] !== 'undefined') {
            _this.config[x] = config[x];
          }
        }
      }
    },

    isOpen() {
      return $body.hasClass('menu-visible');
    },

    hide() {
      const _this = this;
      $body.removeClass('menu-animate');

      setTimeout(() => {
        $body.removeClass('menu-visible');
      }, 300);

      if (_this.config.overlay) {
        $(_this.config.overlay).css({
          visibility: 'hidden'
        });
      }
    },

    show() {
      const _this = this;
      $body.addClass('menu-visible');

      setTimeout(() => {
        $body.addClass('menu-animate');
      }, 10);

      if (_this.config.overlay) {
        $(_this.config.overlay).css({
          visibility: 'visible'
        });
      }
    },

    toggle() {
      const _this = this;

      if ($body.hasClass('menu-visible')) {
        _this.hide();
      } else {
        _this.show();
      }
    },

    sandwichTrigger() {
      const _this = this;

      if (_this.config.keyHooks) {
        $body.on('keydown', (e) => {
          if (e.keyCode == 27 && _this.isOpen()) {
            _this.toggle();
          }
        });
      }

      $body.on('click', _this.config.selector, (e) => {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        _this.toggle();
      });
    },

    overlayTrigger() {
      const _this = this;

      if (_this.config.overlay) {
        $body.on('click', _this.config.overlay, (e) => {
          _this.hide();
        });
      }
    },

    events() {
      const _this = this;

      // var hammertime = new Hammer(document.body, {
      //     enable: true,
      //     recognizers: [
      //         [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
      //     ]
      // });

      // hammertime.on('swipeleft', function(ev) {
      //     if (_this.width <= 480) {
      //         _this.hide();
      //     }
      // });

      // hammertime.on('swiperight', function(ev) {
      //     if (_this.width <= 480) {
      //         _this.show();
      //     }
      // });

      let timeout;

      $(window).on('resize', () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          _this.hide();
          _this.width = $(window).width();
        }, 20);
      });
    },

    init() {
      this.extend({
        keyHooks: !0,
        selector: '.j-sandwich-menu',
        wrapper: '.layout-wrapper',
        overlay: false
      });

      this.width = $(window).width();

      this.events();
      this.sandwichTrigger();
      this.overlayTrigger();
    }
  };
}(document.body));
