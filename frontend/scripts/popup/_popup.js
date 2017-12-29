/*
$.popup.init('.trigger-popup');
$.popup.open('popup-choose-photo-source');
$.popup.open('popup-choose-photo-source/nested-tab');
*/

(function($) {
  let defaults = {
      wrapper: 'body',
      popupClass: '.popup',
      triggerClass: '.j-open-popup',
      dialogClass: '.j-popup-dialog',
      closeClass: '.j-popup-close',
      speed: 550,
      overlay: {
        enable: !0,
        element: '#overlay'
      },
      overlayClickClose: !0,
      cssPosition: !0,
      bodyclass: !0,
      hashCheck: !0,
      hashChange: !0,
      keyHooks: !0,
      template: {
        error: 'tmpl-popup-error',
        message: 'tmpl-popup-message',
        notification: 'tmpl-notification'
      }
    },
    popup = null,
    noty = null,
    temp = null,
    nested = [],
    $dialog = '',
    $trigger = '',
    $body = $('body'),
    $win = $(window),
    $doc = $(document),
    selector_cache,
    notify_timeout,
    is_nested,
    resizeTimeout;

  $.overlay = {
    close() {
      $(defaults.overlay.element).removeClass('animate');

      setTimeout(() => {
        $(defaults.overlay.element).removeClass('visible is-open');
        $(defaults.overlay.element)
          .filter('.temp')
          .remove();
      }, defaults.speed);
    }
  };

  $.popup = {
    _getPopup: function(selector) {
      let $popup;

      if (typeof selector == 'object') {
        return selector;
      }

      $popup = $(`#${selector}`);

      return $popup.length ? $popup : null;
    },

    _getPosition: function($popup) {
      popup = this;

      if (!defaults.cssPosition) {
        return {};
      }

      let prop = {},
        ww = $win.width(),
        wh = $win.height(),
        dw = $doc.width(),
        dh = $doc.height(),
        pw = $popup.outerWidth(),
        ph = $popup.outerHeight(),
        st = $win.scrollTop(),
        left = 0,
        top = 0,
        css = {},
        posType = $popup.attr('data-position'),
        $realWrapper = null;

      if (dw >= pw) {
        left = Math.round((dw - pw) / 2);
      }

      if (wh >= ph) {
        css.position = 'fixed';
        top = '50%';
        css.marginTop = `-${Math.ceil(ph / 2)}px`;
      } else {
        css.position = 'absolute';
        top = st + Math.round((wh - ph) / 2);
      }

      css.top = top;

      if (posType == 'right') {
        css.right = 0;
      } else {
        css.left = left;
      }

      return css;
    },

    _changePosition: function(selector) {
      const $popup = this._getPopup(selector);

      if (!defaults.cssPosition) {
        $popup.css(this._getPosition($popup));
      }
    },

    _checkScroll: function(popup) {
      $dialog = $(popup).find(defaults.dialogClass);

      if ($dialog.outerHeight() > $win.height()) {
        $dialog.addClass('is-scrolling');
      } else {
        $dialog.removeClass('is-scrolling');
      }
    },

    close(element, callback) {
      popup = this;

      let scroll = 0,
        cb = false,
        is_native = true,
        $popups;

      $popups = $body.find('.popup.is-open');

      if (typeof element !== 'undefined') {
        $popups = $(element);
        is_native = false;
      }

      if (typeof callback !== 'undefined') {
        cb = true;
      }

      $body.trigger('popup.before_close', $popups);

      if (defaults.overlay.enable && is_native) {
        $.overlay.close();
      }

      $(defaults.wrapper).off('click.wrapClose');

      $popups.removeClass('animate');

      setTimeout(() => {
        $popups.removeClass('visible is-open');
        $popups.filter('.temp').remove();
        $body.trigger('popup.after_close', $popups);

        if (cb) {
          setTimeout(() => {
            window.location.hash = '';
            callback.apply();
          }, 10);
        }
      }, defaults.speed);

      if (!cb && is_native) {
        $body.removeClass('popup-open');

        if (defaults.hashChange) {
          scroll = $win.scrollTop();
          window.location.hash = '';
          $win.scrollTop(scroll);
        }
      }

      $body.trigger('popup.close', $popups);

      return this;
    },

    initWrapClose() {
      popup = this;

      $(defaults.wrapper).on('click.wrapClose', (e) => {
        if (
          !$(e.target).closest(defaults.popupClass).length &&
                    !$(e.target).hasClass(defaults.triggerClass.substr(1)) &&
                    !$(e.target).closest(defaults.triggerClass).length
        ) {
          popup.close();
        }
      });
    },

    hooks() {
      popup = this;

      $body.on('click', defaults.closeClass, (e) => {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        popup.close();
      });

      if (defaults.keyHooks) {
        $body.on('keypress keydown', (e) => {
          if (e.keyCode == 27) {
            popup.close();
          }
        });
      }

      if (defaults.overlay.enable && defaults.overlayClickClose) {
        $(defaults.overlay.element).on('click', () => {
          popup.close();
        });
      }

      $win.on('resize.popup', () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
          $body.find('.popup.is-open').each(function() {
            if (!defaults.cssPosition) {
              popup._changePosition($(this));
            }

            popup._checkScroll($(this));
          });
        }, 100);
      });

      return this;
    },

    show(selector, overlay, bodyclass) {
      var $popup = null;
      popup = this;

      if (typeof selector !== 'undefined' && selector !== '') {
        var data = data || {},
          prop = {},
          $popup;

        if (bodyclass) {
          $body.addClass('popup-open');
        }

        if (typeof selector == 'object') {
          $popup = $(selector);
        } else if ($(`#${selector}`).hasClass('popup')) {
          $popup = $(`#${selector}`);
        } else if (
          ($(`#${selector}`).length &&
                        $(`#${selector}`).get(0).tagName == 'SCRIPT') ||
                    $(`#${selector}`).get(0).tagName == 'TEMPLATE'
        ) {
          $popup = $(template(selector, data));
          $popup.addClass('temp');

          $body.append($popup);
        }

        if ($popup) {
          $popup.addClass('visible is-open');

          if (!defaults.cssPosition) {
            $popup.css(popup._getPosition($popup));
          }

          if (overlay) {
            $(defaults.overlay.element).addClass('visible');

            setTimeout(() => {
              $(defaults.overlay.element).addClass('animate');
            }, 10);
          } else {
            this.initWrapClose();
          }

          popup._checkScroll($popup);

          setTimeout(() => {
            $popup.addClass('animate');
            $body.trigger('popup.after_open', $popup);

            setTimeout(() => {
              $popup.scrollTop(0);
            }, 10);

            if (nested.length) {
              $body.trigger('popup.init_nested', {
                popup: $popup,
                nested
              });
            }
          }, 10);

          $body.trigger('popup.open', $popup);
        }
      }

      return this;
    },

    clicks(trigger) {
      popup = this;

      $body.on('click', trigger, function(e) {
        let overlay = defaults.overlay.enable,
          bodyclass = defaults.bodyclass,
          element;

        if ($('.popup.is-open').length) {
          $body.trigger('popup.before_open', $('.popup.is-open'));
        }

        if (!defaults.hashChange) {
          e.preventDefault
            ? e.preventDefault()
            : (e.returnValue = false);
        }

        if (typeof $(this).data('bodyclass') !== 'undefined') {
          bodyclass = $(this).data('bodyclass');
        }

        if (typeof $(this).data('overlay') !== 'undefined') {
          overlay = $(this).data('overlay');
        }

        if ($(this).data('popup')) {
          element = $(this).data('popup');
        } else if ($(this).attr('href')) {
          element = $(this).attr('href');
        }

        popup.open(element, overlay, bodyclass);

        if (typeof $(this).data('hashchange') !== 'undefined') {
          return $(this).data('hashchange');
        }
      });

      return this;
    },

    open(selector, overlay, bodyclass) {
      popup = this;

      if (
        typeof selector !== 'undefined' &&
                selector.length > 1 &&
                selector.substr(0, 1) !== '#'
      ) {
        selector = `#${selector}`;
      }

      (temp = null), (selector_cache = null), (nested = []);

      if (
        typeof selector == 'undefined' &&
                defaults.hashChange &&
                window.location.hash.length > 1
      ) {
        temp = window.location.hash;
      } else if (typeof selector !== 'undefined') {
        if (selector.substr(0, 1) == '#') {
          temp = selector;
        }
      }

      if (temp !== null && temp.indexOf('/') >= 0) {
        nested = temp.split('/');
      }

      is_nested = false;
      selector = temp;

      if (nested.length) {
        is_nested = true;
        selector = nested[0];
        nested = nested.slice(1);
      }

      if (typeof selector !== 'undefined' && selector !== null) {
        if (selector.substr(0, 1) == '#') {
          selector = selector.substr(1);
        }

        if ($('.popup.is-open').length) {
          selector_cache = $('.popup.is-open').attr('id');

          if (
            (is_nested && !nested.length) ||
                        selector !== selector_cache
          ) {
            popup.close($('.popup.is-open'));
          } else {
            $.app.tabs.hashUrl.check(popup, nested);
          }
        }

        if ($(`#tpl-${selector}`).length) {
          selector = `tpl-${selector}`;
        }

        if ($(`#tmpl-${selector}`).length) {
          selector = `tmpl-${selector}`;
        }

        if (typeof overlay == 'undefined') {
          overlay = defaults.overlay.enable;
        }

        if (typeof bodyclass == 'undefined') {
          bodyclass = defaults.bodyclass;
        }

        if (
          $(`#${selector}`).hasClass('popup') ||
                    ($(`#${selector}`).length &&
                        $(`#${selector}`).get(0).tagName == 'SCRIPT') ||
                    ($(`#${selector}`).length &&
                        $(`#${selector}`).get(0).tagName == 'TEMPLATE')
        ) {
          popup.show(selector, overlay, bodyclass);
        }
      }

      return this;
    },

    notification(title, text) {
      popup = this;

      clearTimeout(notify_timeout);

      if (!$body.find('#alert-popup-notification').length) {
        var noty = $(template(defaults.template.notification, { title, text }));

        noty.addClass('temp');
        noty.attr('id', 'alert-popup-notification');

        $body.append(noty);

        popup.show(noty, false, false);
      }

      notify_timeout = setTimeout(() => {
        noty.removeClass('animate');

        setTimeout(() => {
          noty.remove();
        }, 300);
      }, 5000);
    },

    message(title, text, btn) {
      popup = this;

      const temp = $(template(defaults.template.message, {
        title,
        text,
        btn: btn || null
      }));

      temp.addClass('temp');

      $body.append(temp);

      temp.css(this._getPosition(temp));

      popup.close($body.find('.popup.is-open'), () => {
        popup.show(temp);
      });
    },

    error(title, text) {
      popup = this;

      const temp = $(template(defaults.template.error, { title, text }));

      temp.addClass('temp');

      $body.append(temp);

      temp.css(this._getPosition(temp));

      popup.close($body.find('.popup.is-open'), () => {
        popup.show(temp);
      });
    },

    init(trigger, options) {
      defaults.triggerClass = trigger;

      if (typeof options !== 'undefined') {
        for (const x in options) {
          if (typeof defaults[x] !== 'undefined') {
            defaults[x] = options[x];
          }
        }
      }

      this.open();
      this.clicks(trigger);
      this.hooks();
    }
  };
}(jQuery));
