;(function ($) {
    "use strict";

    $.app = $.app || {};

    $.app.initAddition = function()
    {
        _this = this;

        body.on('click', '.js-add-element', function(e){
            var $form, counter;

            e.preventDefault();

            if ($(this).data('template') && $('#' + $(this).data('template')).length)
            {
                $form = $(this).closest('form');
                counter = $form.data('additional_counter');

                if(!counter) {
                    counter = 1;
                }

                data = {};
                

                if ($(this).data('addclass'))
                {
                    data.addclass = $(this).data('addclass');
                }

                _container = $(this).closest('.js-addition-group').find('.js-addition-container');
                
                data.index = ++counter;
                
                $form.data('additional_counter', counter);

                _template = $(template($(this).data('template'), data));

                _container.append(_template);

                _this.fillYears();
                _this.initDevices();
                _this.initSelect(_template);
                _this.indexAddition();
                _this.initSerial();

                _this.preloadForm(_template, '.js-form-input');
            }
        });
    };

    $.app.initRemove = function()
    {
        body.on('click', '.js-remove-element', function(e){
            e.preventDefault();

            if ($(this).data('element') && $($(this).data('element')).length)
            {
                var $item;

                if ($(this).data('cookie'))
                {
                    $.cookie($(this).data('cookie'), 'hidden', { path: '/' });
                }

                if ($(this).hasClass('js-remove-closest'))
                {
                    $item = $(this).closest($(this).data('element'));

                    $item.stop().animate({ 'height': 0, 'opacity': 0 }, 250, function(){
                        $item.remove();
                    });
                }
                else {
                    $item = $($(this).data('element'));

                    $item.stop().animate({ marginTop: '-400px' }, 0, function(){
                        setTimeout(function(){
                            $item.remove();
                        }, 600);
                    });
                }
            }
        });
    };

})(jQuery);