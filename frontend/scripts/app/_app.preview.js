const app = app || {};

((body) => {
  const $body = $('body');

  app.preview = {
    // $(popup).find('.js-image-mask').each(function(){
    //     if (!$(this).hasClass('is-masked'))
    //     {
    //         app.canvasmask.mask($(this).find('.profile-image__picture')[0], '../images/hex-mask.png', {
    //             w: 111, h: 109
    //         });
    //     }
    // });

    events() {
      $body.on('change', '.js-file-preview', function(e) {
        let wrapper = $(this).closest('.js-file-wrapper'),
          container = wrapper.find('.js-image-mask'),
          preview,
          append = false,
          reader,
          file,
          temp;

        if (container.find('.profile-image__picture').length) {
          container.find('.profile-image__picture').remove();
        }

        preview = document.createElement('img');
        preview.className = 'profile-image__picture';

        append = true;

        if ($(this).prop('files')) {
          file = $(this).prop('files')[0];

          if (
            typeof FileReader !== 'undefined' &&
                        /image/i.test(file.type)
          ) {
            if (append) {
              container.append(preview);
            }

            temp = document.createElement('img');
            temp.src = URL.createObjectURL(file);

            temp.onload = function() {
              // preview.src = URL.createObjectURL(file);

              reader = new FileReader();

              reader.onload = (function(im) {
                return function(evt) {
                  im.src = evt.target.result;

                  im.width = 111;
                  im.height = 109;

                  app.canvasmask.mask(
                    im,
                    '../images/hex-mask.png',
                    {
                      w: 111,
                      h: 109
                    }
                  );
                };
              }(preview));

              reader.readAsDataURL(file);
            };
          }
        }
      });
    },

    init() {
      this.events();
    }
  };
})(document.body);
