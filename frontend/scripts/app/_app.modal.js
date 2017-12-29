((body) => {
  let _this_;

  app.modal = {
    config: {
      prefix: 'tmpl-modal-',
      trigger: '.j-open-popup'
    },

    prepare(selector) {
      if (typeof selector !== 'undefined' && selector.length > 1) {
        if (selector.substr(0, 1) == '#') {
          selector = selector.substr(1);
        }

        selector = _this_.config.input + selector;
      }

      return selector;
    },

    bind() {
      // data-change="true"
      // autosize($('textarea'));

      $('body').on('click', _this_.config.trigger, function(e) {
        e.preventDefault();

        const modal = $(this).data('target') || $(this).attr('href');

        if ($(_this_.prepare(modal)).length) {
          alert(_this_.prepare(modal));
        }

        return !1;
      });
    },

    init(config) {
      _this_ = this;

      if (typeof config !== 'undefined') {
        _this_.config = app._extend(_this_.config, config);
      }

      _this_.bind();
    }
  };
})(document.body);
