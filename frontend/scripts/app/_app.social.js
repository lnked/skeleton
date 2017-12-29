const app = app || {};

((body) => {
  const $body = $('body');

  app.social = {
    init() {
      $body.on('click', '.social-trigger', function(e) {
        let $this = $(this),
          authPopup,
          x = 200,
          y = 200;

        e.preventDefault();

        if (
          $this.hasClass('state-disabled') ||
                    $this.hasClass('state-inactive')
        ) {
          return;
        }

        authPopup = window.open(
          this.href,
          $this.text(),
          `location,width=700,height=400,top=${x},left=${y}`
        );
        authPopup.focus();
      });
    },

    command(command, data) {
      if (command == 'NEW') {
        $.popup.open('#popup-user/user-registry');

        $('#user-registry input[name="firstname"]').val(data.profile.first_name);
        $('#user-registry input[name="lastname"]').val(data.profile.last_name);
        $('#user-registry input[name="external_provider"]').val(data.social_provider);
        $('#user-registry input[name="external_identity"]').val(data.profile.id);
      }

      if (command == 'RELOAD') {
        window.location.href = data.url;
      }
    }
  };
})(document.body);
