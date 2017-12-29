const app = app || {};

((body) => {
  let isAnimated = false;

  const myState = [];
  const History = window.History;

  const isMobile = $(window).width() <= 667;
  const $hasScroll = $('html, body');
  const $navigation = $('#navigation');
  const navHeight = parseInt($navigation.height() + 50, 10);
  const winHeight = $(window).height();

  app.navigation = {
    elements: [],

    compose() {
      this.elements = $('.j-section').map((key, item) => ({
        offset: $(item).offset().top - navHeight,
        element: $(item)
      }));
    },

    scrollToAnchor(hash, animate, callback) {
      hash = hash.split('?')[0];

      const $target = $(`#${hash}-anchor`);

      if ($target.length) {
        isAnimated = true;
        const top = $target.offset().top - navHeight;

        if (animate) {
          $hasScroll
            .stop()
            .animate({ scrollTop: top }, 'medium', () => {
              isAnimated = false;
              $navigation.removeClass('is-disabled');

              if (typeof callback === 'function') {
                callback();
              }
            });
        } else {
          $hasScroll.scrollTop(top);

          if (typeof callback === 'function') {
            callback();
          }
        }
      }
    },

    setCurrent($current, slug, title) {
      $navigation
        .find('.j-navigation.is-current')
        .removeClass('is-current');
      $current.addClass('is-current');

      this.pushState(title, slug);
    },

    pushState(title, slug) {
      const State = History.getState();

      if (myState.length) {
        History.replaceState(State, title, slug);
      } else {
        History.pushState(State, title, slug);
        myState.push(State);
      }
    },

    changeItem(scrollTop) {
      let $element = null;

      this.elements.map((key, item) => {
        const element = item.element;

        if (scrollTop > item.offset - winHeight / 4) {
          $element = element;
        }
      });

      if ($element !== null && $element.attr('id')) {
        const title = $element.data('title') || '';
        const slug = $element.attr('id').split('-')[0];
        const $current = $navigation.find(`.j-navigation[href="/${slug}"]`);

        if (!$current.hasClass('is-current')) {
          this.setCurrent($current, slug, title);
        }
      }
    },

    check() {
      const _this = this;
      const State = History.getState();

      if (State.url) {
        const slug = State.url.split('/')[3];

        const $current = $navigation.find(`.j-navigation[href="/${slug}"]`);

        this.scrollToAnchor(slug, false, () => {
          _this.setCurrent(
            $current,
            slug,
            $(`${slug}-anchor`).data('title')
          );
        });
      }
    },

    init() {
      const _this = this;

      $('body').on('click', '.j-navigation', function(e) {
        e.preventDefault();

        const $current = $(this);
        const slug = $current.attr('href').substr(1);
        $navigation.addClass('is-disabled');

        _this.scrollToAnchor(slug, true);
        _this.setCurrent(
          $current,
          slug,
          $(`${slug}-anchor`).data('title')
        );
      });

      setTimeout(() => {
        _this.compose();
        _this.check();
      }, 50);

      let last = Date.now();

      $(window).scroll(() => {
        if (!isAnimated) {
          const differance = Date.now() - last;

          if (differance >= 500) {
            _this.changeItem($(window).scrollTop());
            last = Date.now();
          }
        }
      });
    }
  };
})(document.body);
