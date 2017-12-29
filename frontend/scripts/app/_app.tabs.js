var app = app || {};

(function(body) {
  app.tabs = {
    init() {
      let $tabs;

      $('body').on('click', '.j-tabs-trigger', function(e) {
        e.preventDefault();
        const $current = $(this);

        if (!$current.hasClass('is-current')) {
          const target = $current.data('target');

          // Clear
          $tabs = $(this).closest('.j-tabs');
          $tabs.find('.is-current').removeClass('is-current');
          $tabs.find('.j-tabs-content').removeClass('is-active');

          // Set current
          $current.addClass('is-current');
          $tabs
            .find(`.j-tabs-content[data-system="${target}"]`)
            .addClass('is-active');

          if ($current.hasClass('j-tabs-carousel')) {
            app.carousel.main('reload', target);
          }
        }

        return !1;
      });
    }
  };
}(document.body));
