const app = app || {};

((body) => {
  app.documents = {
    init() {
      $('body').on('click', '.j-load-documents', function(e) {
        const $button = $(this);
        const motion = $button.data('motion');

        if (motion === 'show') {
          $button.data('motion', 'hide');
          $('#documents')
            .find('.is-motion')
            .removeClass('is-hidden');
        } else {
          $button.data('motion', 'show');

          $('html, body')
            .stop()
            .animate(
              {
                scrollTop: $('#documentation-anchor').offset()
                  .top
              },
              'fast'
            );

          setTimeout(() => {
            $('#documents')
              .find('.is-motion')
              .addClass('is-hidden');
          }, 200);
        }

        $button
          .closest('.page-button')
          .toggleClass('_down')
          .toggleClass('_up');
      });
    }
  };
})(document.body);
