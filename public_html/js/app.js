'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var app = app || {};

(function (body) {
    app = {
        _extend: function _extend(source, config) {
            if (typeof config !== 'undefined') {
                for (var x in config) {
                    source[x] = config[x];
                }
            }

            return source;
        },
        bind: function bind() {
            for (var _ in this) {
                if (_typeof(this[_]) == 'object' && typeof this[_].init !== 'undefined') {
                    if (typeof this[_].init == 'function') {
                        this[_].init();
                    }
                }
            }
        },
        init: function init() {
            this.bind();
        }
    };
})(document.body);
'use strict';

;(function (body) {
    var _this_ = void 0;

    app.modal = {

        config: {
            prefix: 'tmpl-modal-',
            trigger: '.j-open-popup'
        },

        prepare: function prepare(selector) {
            if (typeof selector !== 'undefined' && selector.length > 1) {
                if (selector.substr(0, 1) == '#') {
                    selector = selector.substr(1);
                }

                selector = _this_.config.input + selector;
            }

            alert(selector);

            return selector;
        },
        bind: function bind() {
            // data-change="true"
            // autosize($('textarea'));

            $('body').on('click', _this_.config.trigger, function (e) {
                e.preventDefault();

                var modal = $(this).data('target') || $(this).attr('href');

                if ($(_this_.prepare(modal)).length) {
                    alert(_this_.prepare(modal));
                }

                return !1;
            });
        },
        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
        }
    };
})(document.body);
'use strict';

var app = app || {};

(function (body) {
    var _this_ = void 0;

    app.quantity = {

        config: {
            element: '.j-quantity',
            input: '.j-quantity-count',
            control: '.j-quantity-control',
            complete: null
        },

        element: null,

        setValue: function setValue(quantity) {
            var min = 1;
            var max = 100;

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
        increase: function increase(quantity) {
            quantity += 1;

            this.setValue(quantity);
        },
        decrease: function decrease(quantity) {
            if (quantity > 1) {
                quantity -= 1;
            }

            this.setValue(quantity);
        },
        callback: function callback() {
            if (typeof this.element.data('product') !== 'undefined' && typeof this.config.complete == 'function') {
                this.config.complete.call(null, this.element, this.element.data('product'));
            }
        },
        keys: function keys() {
            var _this = this;
            var role = '';

            $('body').on('keydown', _this_.config.input, function (e) {
                if ([38, 40].includes(e.keyCode)) {
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
        bind: function bind() {
            var role = '';

            $('body').on('click', _this_.config.control, function (e) {
                e.preventDefault();

                _this_.element = $(this).closest(_this_.config.element);

                role = $(this).data('role');

                if (['increase', 'decrease'].includes(role)) {
                    _this[role](parseInt(_this_.element.find(_this_.config.input).val()));
                }

                _this_.callback();

                return !1;
            });
        },
        init: function init(config) {
            _this_ = this;

            if (typeof config !== 'undefined') {
                _this_.config = app._extend(_this_.config, config);
            }

            _this_.bind();
            _this_.keys();
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
'use strict';

(function (d) {
    d.addEventListener('DOMContentLoaded', function () {
        app.init();
        alert('1');
    });
})(document);