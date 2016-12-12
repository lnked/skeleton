var app = app || {};

(function(body){
    "use strict";

    app.toggle = {
        
        init: function() {
            
            var $toggle = null, text = '', hide = true, remove = false;

            $('body').on('click', '.j-toggle-trigger', function(e){
                e.preventDefault();

                $toggle = $(this).closest('.j-toggle').find('.j-toggle-item');

                if ($toggle)
                {
                    $toggle.toggleClass('is-show');
                }

                if ($toggle.hasClass('is-hidden'))
                {
                    $toggle.removeClass('is-hidden');
                }

                if ($(this).data('toggle-text')) {
                    text = $(this).data('toggle-text');
                }

                if (typeof($(this).data('remove')) !== 'undefined') {
                    remove = $(this).data('remove') == '0' ? false : ($(this).data('remove') == '1' ? true : false);
                }
                
                if (hide) {
                    $(this).hide();
                }
                
                if (remove) {
                    $(this).remove();
                }

                if (text) {
                    $(this).data('toggle-text', $(this).html());
                    $(this).html(text);
                }

                return false;
            })

        }

    };

})(document.body);

// <div class="j-toggle">
//     <div class="j-toggle-item"> content </div>
//     <span class="j-toggle-trigger" data-toggle-text="Скрыть..." data-hide="1" data-remove="1">Еще...</span>
// </div>