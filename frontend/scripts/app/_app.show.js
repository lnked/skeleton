const app = app || {};

((body) => {
  app.show = {
    trigger() {
      $('body').on('click', '.j-show', function(e) {
        e.preventDefault();

        const href = $(this).attr('href');

        if ($(href).length) {
          $(href).addClass('is-show');
        }

        $(this).hide();

        return false;
      });
    },

    init() {
      this.trigger();
    }
  };
})(document.body);
