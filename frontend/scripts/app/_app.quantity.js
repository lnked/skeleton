var app = app || {};

(function(body){
    "use strict";

    app.quantity = {

        config: {
            element: '.j-quantity',
            count: '.j-quantity-count',
            control: '.j-quantity-control',
            complete: null
        },

        extend: function(config)
        {
            var _this = this;

            if (typeof config !== 'undefined')
            {
                var x;
                for (x in config)
                {
                    if (typeof _this.config[x] !== 'undefined')
                        _this.config[x] = config[x];
                }
            }
        },

        bind: function()
        {
            var _this = this, product = '', quantity = 0, min = 1, max = 100, $element = '', method = '';

            $('body').on('click', _this.config.control, function(e) {
                e.preventDefault();

                $element = $(this).closest(_this.config.element);

                method = $(this).data('method');
                product = $element.data('product');
                quantity = parseInt($element.find(_this.config.count).val());

                if ($element.data('min')) {
                    min = $element.data('min');   
                }
                
                if ($element.data('max')) {
                    max = $element.data('max');   
                }

                switch(method) {
                    case 'increase':
                        quantity += 1;
                    break;

                    case 'decrease':
                        if (quantity > 1) {
                            quantity -= 1;
                        }
                    break;
                }

                if (quantity > max) {
                    quantity = max;
                }
                
                if (quantity < min) {
                    quantity = min;
                }
                
                $element.find(_this.config.count).val(quantity);

                if (typeof(_this.config.complete) == 'function')
                {
                    _this.config.complete.call(null, $element, product);
                }

                return !1;
            });
        },

        init: function(config)
        {
            if (typeof config !== 'undefined') {
                this.extend(config);
            }

            this.bind();
        }

    };

})(document.body);

// this.quantity.init({
//     complete: function(element, id) {
//         // $(element).css({
//         //     'border': '1px solid lime'
//         // });

//         console.log("id :", id);
//     }
// });

// <div class="quantity j-quantity clearfix" data-product="{$product.id}" data-min="1" data-max="999">
//     <button type="button" class="quantity__control _decrease j-quantity-control j-quantity-recount" data-method="decrease"></button>
//     <input name="count[{$product.id}]" class="quantity__count j-quantity-recount j-quantity-count" value="{$product.cart_count}" maxlength="4">
//     <button type="button" class="quantity__control _increase j-quantity-control j-quantity-recount" data-method="increase"></button>
// </div>