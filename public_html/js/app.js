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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fYXBwLmluaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUksTUFBTSxPQUFPLEVBQWpCOztBQUVBLENBQUUsZ0JBQVE7QUFDTixVQUFNO0FBRUYsZUFGRSxtQkFFTSxNQUZOLEVBRWMsTUFGZCxFQUVzQjtBQUNwQixnQkFBSSxPQUFPLE1BQVAsS0FBa0IsV0FBdEIsRUFDQTtBQUNJLHFCQUFLLElBQU0sQ0FBWCxJQUFnQixNQUFoQixFQUNBO0FBQ0ksMkJBQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBUCxDQUFaO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxNQUFQO0FBQ0gsU0FaQztBQWNGLFlBZEUsa0JBY0s7QUFDSCxpQkFBSSxJQUFNLENBQVYsSUFBZSxJQUFmLEVBQ0E7QUFDSSxvQkFBSSxRQUFPLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFFBQW5CLElBQStCLE9BQU8sS0FBSyxDQUFMLEVBQVEsSUFBZixLQUF5QixXQUE1RCxFQUNBO0FBQ0ksd0JBQUksT0FBTyxLQUFLLENBQUwsRUFBUSxJQUFmLElBQXdCLFVBQTVCLEVBQ0E7QUFDSSw2QkFBSyxDQUFMLEVBQVEsSUFBUjtBQUNIO0FBQ0o7QUFDSjtBQUNKLFNBekJDO0FBMkJGLFlBM0JFLGtCQTJCSztBQUNILGlCQUFLLElBQUw7QUFDSDtBQTdCQyxLQUFOO0FBZ0NILENBakNELEVBaUNJLFNBQVMsSUFqQ2IiLCJmaWxlIjoiX19hcHAuaW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBhcHAgPSBhcHAgfHwge307XG5cbigoYm9keSA9PiB7XG4gICAgYXBwID0ge1xuXG4gICAgICAgIF9leHRlbmQoc291cmNlLCBjb25maWcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHggaW4gY29uZmlnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW3hdID0gY29uZmlnW3hdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgfSxcblxuICAgICAgICBiaW5kKCkge1xuICAgICAgICAgICAgZm9yKGNvbnN0IF8gaW4gdGhpcylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRoaXNbX10pID09ICdvYmplY3QnICYmIHR5cGVvZih0aGlzW19dLmluaXQpICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodGhpc1tfXS5pbml0KSA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW19dLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG59KSkoZG9jdW1lbnQuYm9keSk7Il19

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubW9kYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLENBQUUsZ0JBQVE7QUFDUCxRQUFJLGVBQUo7O0FBRUEsUUFBSSxLQUFKLEdBQVk7O0FBRVIsZ0JBQVE7QUFDSixvQkFBUSxhQURKO0FBRUoscUJBQVM7QUFGTCxTQUZBOztBQU9SLGVBUFEsbUJBT0EsUUFQQSxFQU9VO0FBQ2QsZ0JBQUksT0FBTyxRQUFQLEtBQXFCLFdBQXJCLElBQW9DLFNBQVMsTUFBVCxHQUFrQixDQUExRCxFQUNBO0FBQ0ksb0JBQUksU0FBUyxNQUFULENBQWdCLENBQWhCLEVBQW1CLENBQW5CLEtBQXlCLEdBQTdCLEVBQ0E7QUFDSSwrQkFBVyxTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBWDtBQUNIOztBQUVELDJCQUFXLE9BQU8sTUFBUCxDQUFjLEtBQWQsR0FBdUIsUUFBbEM7QUFDSDs7QUFFRCxrQkFBTSxRQUFOOztBQUVBLG1CQUFPLFFBQVA7QUFDSCxTQXJCTztBQXVCUixZQXZCUSxrQkF1QkQ7QUFDSDtBQUNBOztBQUVBLGNBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLE9BQU8sTUFBUCxDQUFjLE9BQXBDLEVBQTZDLFVBQVMsQ0FBVCxFQUFXO0FBQ3BELGtCQUFFLGNBQUY7O0FBRUEsb0JBQU0sUUFBUSxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsUUFBYixLQUEwQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsTUFBYixDQUF4Qzs7QUFFQSxvQkFBSSxFQUFFLE9BQU8sT0FBUCxDQUFlLEtBQWYsQ0FBRixFQUF5QixNQUE3QixFQUNBO0FBQ0ksMEJBQU0sT0FBTyxPQUFQLENBQWUsS0FBZixDQUFOO0FBQ0g7O0FBRUQsdUJBQU8sQ0FBQyxDQUFSO0FBQ0gsYUFYRDtBQVlILFNBdkNPO0FBeUNSLFlBekNRLGdCQXlDSCxNQXpDRyxFQXlDSztBQUNULHFCQUFTLElBQVQ7O0FBRUEsZ0JBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSSx1QkFBTyxNQUFQLEdBQWdCLElBQUksT0FBSixDQUFZLE9BQU8sTUFBbkIsRUFBMkIsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7QUFsRE8sS0FBWjtBQXFESCxDQXhEQSxFQXdERyxTQUFTLElBeERaIiwiZmlsZSI6Il9hcHAubW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7KChib2R5ID0+IHtcbiAgICBsZXQgX3RoaXNfO1xuXG4gICAgYXBwLm1vZGFsID0ge1xuXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgcHJlZml4OiAndG1wbC1tb2RhbC0nLFxuICAgICAgICAgICAgdHJpZ2dlcjogJy5qLW9wZW4tcG9wdXAnXG4gICAgICAgIH0sXG5cbiAgICAgICAgcHJlcGFyZShzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZihzZWxlY3RvcikgIT09ICd1bmRlZmluZWQnICYmIHNlbGVjdG9yLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yLnN1YnN0cigwLCAxKSA9PSAnIycpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnN1YnN0cigxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IF90aGlzXy5jb25maWcuaW5wdXQgICsgc2VsZWN0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFsZXJ0KHNlbGVjdG9yKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJpbmQoKSB7XG4gICAgICAgICAgICAvLyBkYXRhLWNoYW5nZT1cInRydWVcIlxuICAgICAgICAgICAgLy8gYXV0b3NpemUoJCgndGV4dGFyZWEnKSk7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBfdGhpc18uY29uZmlnLnRyaWdnZXIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSB8fCAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKF90aGlzXy5wcmVwYXJlKG1vZGFsKSkubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoX3RoaXNfLnByZXBhcmUobW9kYWwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gITE7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQoY29uZmlnKSB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgIH07XG59KSkoZG9jdW1lbnQuYm9keSk7Il19

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,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c0IsT0FBTyxNQUFQLENBQWMsT0FBcEMsRUFBNkMsVUFBUyxDQUFULEVBQVk7QUFDckQsa0JBQUUsY0FBRjs7QUFFQSx1QkFBTyxPQUFQLEdBQWlCLEVBQUUsSUFBRixFQUFRLE9BQVIsQ0FBZ0IsT0FBTyxNQUFQLENBQWMsT0FBOUIsQ0FBakI7O0FBRUEsdUJBQU8sRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBUDs7QUFFQSxvQkFBRyxDQUFDLFVBQUQsRUFBYSxVQUFiLEVBQXlCLFFBQXpCLENBQWtDLElBQWxDLENBQUgsRUFDQTtBQUNJLDBCQUFNLElBQU4sRUFBWSxTQUFTLE9BQU8sT0FBUCxDQUFlLElBQWYsQ0FBb0IsT0FBTyxNQUFQLENBQWMsS0FBbEMsRUFBeUMsR0FBekMsRUFBVCxDQUFaO0FBQ0g7O0FBRUQsdUJBQU8sUUFBUDs7QUFFQSx1QkFBTyxDQUFDLENBQVI7QUFDSCxhQWZEO0FBZ0JILFNBbkdVO0FBcUdYLFlBckdXLGdCQXFHTixNQXJHTSxFQXFHRTtBQUNULHFCQUFTLElBQVQ7O0FBRUEsZ0JBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSSx1QkFBTyxNQUFQLEdBQWdCLElBQUksT0FBSixDQUFZLE9BQU8sTUFBbkIsRUFBMkIsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0EsbUJBQU8sSUFBUDtBQUNIO0FBL0dVLEtBQWY7QUFrSEgsQ0FySEQsRUFxSEksU0FBUyxJQXJIYjs7QUF1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJfYXBwLnF1YW50aXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gYXBwIHx8IHt9O1xuXG4oKGJvZHkgPT4ge1xuICAgIGxldCBfdGhpc187XG5cbiAgICBhcHAucXVhbnRpdHkgPSB7XG5cbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLmotcXVhbnRpdHknLFxuICAgICAgICAgICAgaW5wdXQ6ICcuai1xdWFudGl0eS1jb3VudCcsXG4gICAgICAgICAgICBjb250cm9sOiAnLmotcXVhbnRpdHktY29udHJvbCcsXG4gICAgICAgICAgICBjb21wbGV0ZTogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIGVsZW1lbnQ6IG51bGwsXG5cbiAgICAgICAgc2V0VmFsdWUocXVhbnRpdHkpIHtcbiAgICAgICAgICAgIGxldCBtaW4gPSAxO1xuICAgICAgICAgICAgbGV0IG1heCA9IDEwMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhKCdtaW4nKSkge1xuICAgICAgICAgICAgICAgIG1pbiA9IHRoaXMuZWxlbWVudC5kYXRhKCdtaW4nKTsgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhKCdtYXgnKSkge1xuICAgICAgICAgICAgICAgIG1heCA9IHRoaXMuZWxlbWVudC5kYXRhKCdtYXgnKTsgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHF1YW50aXR5ID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgcXVhbnRpdHkgPSBtYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChxdWFudGl0eSA8IG1pbikge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5ID0gbWluO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCh0aGlzLmNvbmZpZy5pbnB1dCkudmFsKHF1YW50aXR5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbmNyZWFzZShxdWFudGl0eSkge1xuICAgICAgICAgICAgcXVhbnRpdHkgKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShxdWFudGl0eSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVjcmVhc2UocXVhbnRpdHkpIHtcbiAgICAgICAgICAgIGlmIChxdWFudGl0eSA+IDEpIHtcbiAgICAgICAgICAgICAgICBxdWFudGl0eSAtPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHF1YW50aXR5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5lbGVtZW50LmRhdGEoJ3Byb2R1Y3QnKSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZih0aGlzLmNvbmZpZy5jb21wbGV0ZSkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jb21wbGV0ZS5jYWxsKG51bGwsIHRoaXMuZWxlbWVudCwgdGhpcy5lbGVtZW50LmRhdGEoJ3Byb2R1Y3QnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cygpIHtcbiAgICAgICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGxldCByb2xlID0gJyc7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5vbigna2V5ZG93bicsIF90aGlzXy5jb25maWcuaW5wdXQsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoWzM4LCA0MF0uaW5jbHVkZXMoZS5rZXlDb2RlKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICByb2xlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgMzg6ICdpbmNyZWFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDogJ2RlY3JlYXNlJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXy5lbGVtZW50ID0gJCh0aGlzKS5jbG9zZXN0KF90aGlzXy5jb25maWcuZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXNbcm9sZVtlLmtleUNvZGVdXShwYXJzZUludChfdGhpc18uZWxlbWVudC5maW5kKF90aGlzXy5jb25maWcuaW5wdXQpLnZhbCgpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfLmNhbGxiYWNrKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJpbmQoKSB7XG4gICAgICAgICAgICBsZXQgcm9sZSA9ICcnO1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgX3RoaXNfLmNvbmZpZy5jb250cm9sLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgX3RoaXNfLmVsZW1lbnQgPSAkKHRoaXMpLmNsb3Nlc3QoX3RoaXNfLmNvbmZpZy5lbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHJvbGUgPSAkKHRoaXMpLmRhdGEoJ3JvbGUnKTtcbiAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKFsnaW5jcmVhc2UnLCAnZGVjcmVhc2UnXS5pbmNsdWRlcyhyb2xlKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzW3JvbGVdKHBhcnNlSW50KF90aGlzXy5lbGVtZW50LmZpbmQoX3RoaXNfLmNvbmZpZy5pbnB1dCkudmFsKCkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfdGhpc18uY2FsbGJhY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQoY29uZmlnKSB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgICAgICBfdGhpc18ua2V5cygpO1xuICAgICAgICB9XG5cbiAgICB9O1xufSkpKGRvY3VtZW50LmJvZHkpO1xuXG4vLyB0aGlzLnF1YW50aXR5LmluaXQoe1xuLy8gICAgIGNvbXBsZXRlOiBmdW5jdGlvbihlbGVtZW50LCBpZCkge1xuLy8gICAgICAgICAvLyAkKGVsZW1lbnQpLmNzcyh7XG4vLyAgICAgICAgIC8vICAgICAnYm9yZGVyJzogJzFweCBzb2xpZCBsaW1lJ1xuLy8gICAgICAgICAvLyB9KTtcblxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImlkIDpcIiwgaWQpO1xuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyA8ZGl2IGNsYXNzPVwicXVhbnRpdHkgai1xdWFudGl0eSBjbGVhcmZpeFwiIGRhdGEtcHJvZHVjdD1cIjEwMDBcIiBkYXRhLW1pbj1cIjFcIiBkYXRhLW1heD1cIjk5OVwiPlxuLy8gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicXVhbnRpdHlfX2NvbnRyb2wgX2RlY3JlYXNlIGotcXVhbnRpdHktY29udHJvbFwiIGRhdGEtcm9sZT1cImRlY3JlYXNlXCI+PC9idXR0b24+XG4vLyAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvdW50WzEwMDBdXCIgdmFsdWU9XCIxXCIgZGF0YS1yb2xlPVwicXVhbnRpdHktaW5wdXRcIiBjbGFzcz1cInF1YW50aXR5X19jb3VudCBqLXF1YW50aXR5LWNvdW50XCIgbWF4bGVuZ3RoPVwiM1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuLy8gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicXVhbnRpdHlfX2NvbnRyb2wgX2luY3JlYXNlIGotcXVhbnRpdHktY29udHJvbFwiIGRhdGEtcm9sZT1cImluY3JlYXNlXCI+PC9idXR0b24+XG4vLyA8L2Rpdj4iXX0=

'use strict';

(function (d) {
    d.addEventListener('DOMContentLoaded', function () {
        app.init();
        alert('1');
    });
})(document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFFLGFBQUs7QUFDSCxNQUFFLGdCQUFGLENBQW1CLGtCQUFuQixFQUF1QyxZQUFNO0FBQ3pDLFlBQUksSUFBSjtBQUNBLGNBQU0sR0FBTjtBQUNILEtBSEQ7QUFJSCxDQUxELEVBS0ksUUFMSiIsImZpbGUiOiJpbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKChkID0+IHtcbiAgICBkLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIGFwcC5pbml0KCk7XG4gICAgICAgIGFsZXJ0KCcxJyk7XG4gICAgfSk7XG59KSkoZG9jdW1lbnQpOyJdfQ==
