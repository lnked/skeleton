const app = app || {};

((body => {
    'use strict';

    let _this_;

    app.quantity = {

        config: {
            element: '.j-quantity',
            input: '.j-quantity-count',
            control: '.j-quantity-control',
            complete: null
        },

        element: null,

        setValue(quantity) {
            let min = 1;
            let max = 100;

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

        increase(quantity) {
            quantity += 1;

            this.setValue(quantity);
        },

        decrease(quantity) {
            if (quantity > 1) {
                quantity -= 1;
            }

            this.setValue(quantity);
        },

        callback() {
            if (typeof (this.element.data('product')) !== 'undefined' && typeof (this.config.complete) == 'function')
            {
                this.config.complete.call(null, this.element, this.element.data('product'));
            }
        },

        keys() {
            const _this = this;
            let role = '';

            $('body').on('keydown', _this_.config.input, function(e) {
                if ([38, 40].includes(e.keyCode))
                {
                    e.preventDefault();

                    role = {
                        38: 'increase',
                        40: 'decrease'
                    };

                    _this_.element = $(this).closest(_this_.config.element);

                    _this[role[e.keyCode]](parseInt(_this_.element.find(_this_.config.input).val()));

                    _this_.callback();

                    return false;
                }
            });
        },

        bind() {
            let role = '';

            $('body').on('click', _this_.config.control, function(e) {
                e.preventDefault();

                _this_.element = $(this).closest(_this_.config.element);

                role = $(this).data('role');
         
                if(['increase', 'decrease'].includes(role))
                {
                    _this[role](parseInt(_this_.element.find(_this_.config.input).val()));
                }

                _this_.callback();

                return !1;
            });
        },

        init(config) {
            _this_ = this;

            if (typeof config !== 'undefined')
            {
                _this_.config = app._extend(_this_.config, config);
            }
            
            _this_.bind();
            _this_.keys();
        }

    };
}))(document.body);

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