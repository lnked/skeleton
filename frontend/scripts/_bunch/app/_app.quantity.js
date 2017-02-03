var app = app || {};

(function(body){
    "use strict";

    app.quantity = {

        config: {
            element: '.j-quantity',
            input: '.j-quantity-count',
            control: '.j-quantity-control',
            complete: null
        },

        element: null,

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

        setValue: function(quantity)
        {
            var min = 1, max = 100;

            if (this.element.data('min')) {
                min = this.element.data('min');   
            }
            
            if (this.element.data('max')) {
                max = this.element.data('max');   
            }

            if (quantity > max) {
                quantity = max;
            }
            
            if (quantity < min) {
                quantity = min;
            }

            this.element.find(this.config.input).val(quantity);

        },

        increase: function(quantity)
        {
            quantity += 1;

            this.setValue(quantity);
        },

        decrease: function(quantity)
        {
            if (quantity > 1) {
                quantity -= 1;
            }

            this.setValue(quantity);
        },

        callback: function()
        {
            if (typeof(this.element.data('product')) !== 'undefined' && typeof(this.config.complete) == 'function')
            {
                this.config.complete.call(null, this.element, this.element.data('product'));
            }
        },

        keys: function()
        {
            var _this = this, role = '';

            $('body').on('keydown', _this.config.input, function(e) {
                if ([38, 40].indexOf(e.keyCode) >= 0)
                {
                    e.preventDefault();

                    role = {
                        38: 'increase',
                        40: 'decrease'
                    };

                    _this.element = $(this).closest(_this.config.element);

                    _this[role[e.keyCode]](parseInt(_this.element.find(_this.config.input).val()));

                    _this.callback();

                    return false;
                }
            });
        },

        bind: function()
        {
            var _this = this, role = '';

            $('body').on('click', _this.config.control, function(e) {
                e.preventDefault();

                _this.element = $(this).closest(_this.config.element);

                role = $(this).data('role');
         
                if(['increase', 'decrease'].indexOf(role) >= 0)
                {
                    _this[role](parseInt(_this.element.find(_this.config.input).val()));
                }

                _this.callback();

                return !1;
            });
        },

        init: function(config)
        {
            if (typeof config !== 'undefined')
            {
                this.extend(config);
            }

            this.bind();
            this.keys();
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

// <div class="quantity j-quantity clearfix" data-product="1000" data-min="1" data-max="999">
//     <button type="button" class="quantity__control _decrease j-quantity-control" data-role="decrease"></button>
//     <input type="text" name="count[1000]" value="1" data-role="quantity-input" class="quantity__count j-quantity-count" maxlength="3" autocomplete="off">
//     <button type="button" class="quantity__control _increase j-quantity-control" data-role="increase"></button>
// </div>