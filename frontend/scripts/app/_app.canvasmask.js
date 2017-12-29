const app = app || {};

((body) => {
  /*
        app.canvasmask.init();
        app.canvasmask.canvasmask.mask($(this)[0], '../images/hex-mask.png');
    */

  app.canvasmask = {
    mask(image, mask_src, data) {
      (function(image) {
        let imagecanvas,
          imagecontext,
          mask,
          img;

        if (!is_undefined(image) && !is_undefined(image.src)) {
          imagecanvas = document.createElement('canvas');
          imagecontext = imagecanvas.getContext('2d');

          img = document.createElement('img');
          img.src = image.src;

          let width,
            height,
            crop_width,
            crop_height,
            thumb_w = 0,
            thumb_h = 0,
            ratio = 0;

          img.onload = function() {
            (width = img.width), (height = img.height);

            if (!is_undefined(data)) {
              crop_width = data.w;
              crop_height = data.h;
            }

            if (
              !is_undefined($(image).data('crop-width')) &&
                            !is_undefined($(image).data('crop-height'))
            ) {
              crop_width = parseInt($(image).data('crop-width'));
              crop_height = parseInt($(image).data('crop-height'));
            }

            if (!crop_width) {
              crop_width = width;
            }

            if (!crop_height) {
              crop_height = height;
            }

            if (img.width > img.height) {
              ratio = img.width / img.height;

              thumb_h = crop_height;
              thumb_w = Math.ceil(thumb_h * ratio);
            } else {
              ratio = img.height / img.width;

              thumb_w = crop_width;
              thumb_h = Math.ceil(thumb_w * ratio);
            }

            mask = document.createElement('img');
            mask.src = mask_src;

            mask.onload = function() {
              imagecanvas.width = crop_width;
              imagecanvas.height = crop_height;

              let sourceX = Math.ceil(thumb_w / 2 - crop_width / 2),
                sourceY = Math.ceil(thumb_h / 2 - crop_height / 2);

              const destX =
                                imagecanvas.width / 2 - crop_width / 2;
              const destY =
                                imagecanvas.height / 2 - crop_height / 2;

              // imagecontext.drawImage(mask, 0, 0, crop_width, crop_height);
              // imagecontext.globalCompositeOperation = 'source-in';
              // imagecontext.drawImage(img, sourceX, sourceY, width, height, destX, destY, crop_width, crop_height);

              imagecontext.drawImage(
                mask,
                0,
                0,
                crop_width,
                crop_height
              );
              imagecontext.globalCompositeOperation =
                                'source-atop';
              imagecontext.drawImage(mask, destX, destY);
              imagecontext.globalCompositeOperation = 'source-in';
              imagecontext.drawImage(
                img,
                destX,
                destY,
                crop_width,
                crop_height
              );

              image.src = imagecanvas.toDataURL();

              $(image).addClass('is-masked');
            };
          };
        }
      }(image));
    },

    init(debug) {
      // imagecanvas = document.createElement('canvas');
      // imagecontext = imagecanvas.getContext('2d');
      // if (debug)
      // {
      //  document.body.appendChild(imagecanvas);
      // }
    }
  };
})(document.body);
