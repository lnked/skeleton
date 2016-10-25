var app = app || {};

(function(body){
    "use strict";

    app.quantity = {

        config: {
            element: '.j-quantity',
            count: '.j-quantity-count',
            control: '.j-quantity-control'
        },

        init: function()
        {
            var _this = this, value = 0, max = 100, $element = '', method = '';

            $('body').on('click', _this.config.control, function(e) {
                e.preventDefault();

                $element = $(this).closest(_this.config.element);

                method = $(this).data('method');

                max = $element.find(_this.config.count).data('max');
                value = parseInt($element.find(_this.config.count).val());

                switch(method) {
                    case 'increase':
                        value += 1;
                    break;

                    case 'decrease':
                        if (value > 1) {
                            value -= 1;
                        }
                    break;
                }

                if (value > max) {
                    value = max;
                }
                
                $element.find(_this.config.count).val(value);

                return !1;
            });
        }

    };

})(document.body);

// <div class="quantity j-quantity clearfix">
//     <b data-element="{$product.current.id}" class="quantity__control _decrease j-quantity-control" data-method="decrease">
//         <i class="ico ico_decrease">-</i>
//     </b>
    
//     <input name="count[{$product.current.id}]" class="quantity__count j-quantity-count" data-product="{$product.cart_count}" value="{$product.current.id}" maxlength="4" data-max="9999">
    
//     <b data-element="{$product.current.id}" class="quantity__control _increase j-quantity-control" data-method="increase">
//         <i class="ico ico_increase">+</i>
//     </b>
// </div>