'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9fYXBwLmluaXQuanMiXSwibmFtZXMiOlsiYXBwIiwiX2V4dGVuZCIsInNvdXJjZSIsImNvbmZpZyIsIngiLCJiaW5kIiwiXyIsImluaXQiLCJkb2N1bWVudCIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxNQUFNQSxPQUFPLEVBQWpCOztBQUVBLENBQUUsZ0JBQVE7QUFDTkEsVUFBTTtBQUVGQyxlQUZFLG1CQUVNQyxNQUZOLEVBRWNDLE1BRmQsRUFFc0I7QUFDcEIsZ0JBQUksT0FBT0EsTUFBUCxLQUFrQixXQUF0QixFQUNBO0FBQ0kscUJBQUssSUFBTUMsQ0FBWCxJQUFnQkQsTUFBaEIsRUFDQTtBQUNJRCwyQkFBT0UsQ0FBUCxJQUFZRCxPQUFPQyxDQUFQLENBQVo7QUFDSDtBQUNKOztBQUVELG1CQUFPRixNQUFQO0FBQ0gsU0FaQztBQWNGRyxZQWRFLGtCQWNLO0FBQ0gsaUJBQUksSUFBTUMsQ0FBVixJQUFlLElBQWYsRUFDQTtBQUNJLG9CQUFJLFFBQU8sS0FBS0EsQ0FBTCxDQUFQLEtBQW1CLFFBQW5CLElBQStCLE9BQU8sS0FBS0EsQ0FBTCxFQUFRQyxJQUFmLEtBQXlCLFdBQTVELEVBQ0E7QUFDSSx3QkFBSSxPQUFPLEtBQUtELENBQUwsRUFBUUMsSUFBZixJQUF3QixVQUE1QixFQUNBO0FBQ0ksNkJBQUtELENBQUwsRUFBUUMsSUFBUjtBQUNIO0FBQ0o7QUFDSjtBQUNKLFNBekJDO0FBMkJGQSxZQTNCRSxrQkEyQks7QUFDSCxpQkFBS0YsSUFBTDtBQUNIO0FBN0JDLEtBQU47QUFnQ0gsQ0FqQ0QsRUFpQ0lHLFNBQVNDLElBakNiIiwiZmlsZSI6Il9fYXBwLmluaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYXBwID0gYXBwIHx8IHt9O1xuXG4oKGJvZHkgPT4ge1xuICAgIGFwcCA9IHtcblxuICAgICAgICBfZXh0ZW5kKHNvdXJjZSwgY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB4IGluIGNvbmZpZylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVt4XSA9IGNvbmZpZ1t4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmluZCgpIHtcbiAgICAgICAgICAgIGZvcihjb25zdCBfIGluIHRoaXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzW19dKSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YodGhpc1tfXS5pbml0KSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRoaXNbX10uaW5pdCkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tfXS5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xufSkpKGRvY3VtZW50LmJvZHkpOyJdfQ==

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAubW9kYWwuanMiXSwibmFtZXMiOlsiX3RoaXNfIiwiYXBwIiwibW9kYWwiLCJjb25maWciLCJwcmVmaXgiLCJ0cmlnZ2VyIiwicHJlcGFyZSIsInNlbGVjdG9yIiwibGVuZ3RoIiwic3Vic3RyIiwiaW5wdXQiLCJhbGVydCIsImJpbmQiLCIkIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJkYXRhIiwiYXR0ciIsImluaXQiLCJfZXh0ZW5kIiwiZG9jdW1lbnQiLCJib2R5Il0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsQ0FBRSxnQkFBUTtBQUNQLFFBQUlBLGVBQUo7O0FBRUFDLFFBQUlDLEtBQUosR0FBWTs7QUFFUkMsZ0JBQVE7QUFDSkMsb0JBQVEsYUFESjtBQUVKQyxxQkFBUztBQUZMLFNBRkE7O0FBT1JDLGVBUFEsbUJBT0FDLFFBUEEsRUFPVTtBQUNkLGdCQUFJLE9BQU9BLFFBQVAsS0FBcUIsV0FBckIsSUFBb0NBLFNBQVNDLE1BQVQsR0FBa0IsQ0FBMUQsRUFDQTtBQUNJLG9CQUFJRCxTQUFTRSxNQUFULENBQWdCLENBQWhCLEVBQW1CLENBQW5CLEtBQXlCLEdBQTdCLEVBQ0E7QUFDSUYsK0JBQVdBLFNBQVNFLE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBWDtBQUNIOztBQUVERiwyQkFBV1AsT0FBT0csTUFBUCxDQUFjTyxLQUFkLEdBQXVCSCxRQUFsQztBQUNIOztBQUVESSxrQkFBTUosUUFBTjs7QUFFQSxtQkFBT0EsUUFBUDtBQUNILFNBckJPO0FBdUJSSyxZQXZCUSxrQkF1QkQ7QUFDSDtBQUNBOztBQUVBQyxjQUFFLE1BQUYsRUFBVUMsRUFBVixDQUFhLE9BQWIsRUFBc0JkLE9BQU9HLE1BQVAsQ0FBY0UsT0FBcEMsRUFBNkMsVUFBU1UsQ0FBVCxFQUFXO0FBQ3BEQSxrQkFBRUMsY0FBRjs7QUFFQSxvQkFBTWQsUUFBUVcsRUFBRSxJQUFGLEVBQVFJLElBQVIsQ0FBYSxRQUFiLEtBQTBCSixFQUFFLElBQUYsRUFBUUssSUFBUixDQUFhLE1BQWIsQ0FBeEM7O0FBRUEsb0JBQUlMLEVBQUViLE9BQU9NLE9BQVAsQ0FBZUosS0FBZixDQUFGLEVBQXlCTSxNQUE3QixFQUNBO0FBQ0lHLDBCQUFNWCxPQUFPTSxPQUFQLENBQWVKLEtBQWYsQ0FBTjtBQUNIOztBQUVELHVCQUFPLENBQUMsQ0FBUjtBQUNILGFBWEQ7QUFZSCxTQXZDTztBQXlDUmlCLFlBekNRLGdCQXlDSGhCLE1BekNHLEVBeUNLO0FBQ1RILHFCQUFTLElBQVQ7O0FBRUEsZ0JBQUksT0FBT0csTUFBUCxLQUFrQixXQUF0QixFQUNBO0FBQ0lILHVCQUFPRyxNQUFQLEdBQWdCRixJQUFJbUIsT0FBSixDQUFZcEIsT0FBT0csTUFBbkIsRUFBMkJBLE1BQTNCLENBQWhCO0FBQ0g7O0FBRURILG1CQUFPWSxJQUFQO0FBQ0g7QUFsRE8sS0FBWjtBQXFESCxDQXhEQSxFQXdER1MsU0FBU0MsSUF4RFoiLCJmaWxlIjoiX2FwcC5tb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjsoKGJvZHkgPT4ge1xuICAgIGxldCBfdGhpc187XG5cbiAgICBhcHAubW9kYWwgPSB7XG5cbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBwcmVmaXg6ICd0bXBsLW1vZGFsLScsXG4gICAgICAgICAgICB0cmlnZ2VyOiAnLmotb3Blbi1wb3B1cCdcbiAgICAgICAgfSxcblxuICAgICAgICBwcmVwYXJlKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mKHNlbGVjdG9yKSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZWN0b3IubGVuZ3RoID4gMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3Iuc3Vic3RyKDAsIDEpID09ICcjJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gX3RoaXNfLmNvbmZpZy5pbnB1dCAgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWxlcnQoc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmluZCgpIHtcbiAgICAgICAgICAgIC8vIGRhdGEtY2hhbmdlPVwidHJ1ZVwiXG4gICAgICAgICAgICAvLyBhdXRvc2l6ZSgkKCd0ZXh0YXJlYScpKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIF90aGlzXy5jb25maWcudHJpZ2dlciwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWwgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpIHx8ICQodGhpcykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCQoX3RoaXNfLnByZXBhcmUobW9kYWwpKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChfdGhpc18ucHJlcGFyZShtb2RhbCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdChjb25maWcpIHtcbiAgICAgICAgICAgIF90aGlzXyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfdGhpc18uY29uZmlnID0gYXBwLl9leHRlbmQoX3RoaXNfLmNvbmZpZywgY29uZmlnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX3RoaXNfLmJpbmQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcbn0pKShkb2N1bWVudC5ib2R5KTsiXX0=

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9hcHAucXVhbnRpdHkuanMiXSwibmFtZXMiOlsiYXBwIiwiX3RoaXNfIiwicXVhbnRpdHkiLCJjb25maWciLCJlbGVtZW50IiwiaW5wdXQiLCJjb250cm9sIiwiY29tcGxldGUiLCJzZXRWYWx1ZSIsIm1pbiIsIm1heCIsImRhdGEiLCJmaW5kIiwidmFsIiwiaW5jcmVhc2UiLCJkZWNyZWFzZSIsImNhbGxiYWNrIiwiY2FsbCIsImtleXMiLCJfdGhpcyIsInJvbGUiLCIkIiwib24iLCJlIiwiaW5jbHVkZXMiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJjbG9zZXN0IiwicGFyc2VJbnQiLCJiaW5kIiwiaW5pdCIsIl9leHRlbmQiLCJkb2N1bWVudCIsImJvZHkiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsTUFBTUEsT0FBTyxFQUFuQjs7QUFFQSxDQUFFLGdCQUFRO0FBQ04sUUFBSUMsZUFBSjs7QUFFQUQsUUFBSUUsUUFBSixHQUFlOztBQUVYQyxnQkFBUTtBQUNKQyxxQkFBUyxhQURMO0FBRUpDLG1CQUFPLG1CQUZIO0FBR0pDLHFCQUFTLHFCQUhMO0FBSUpDLHNCQUFVO0FBSk4sU0FGRzs7QUFTWEgsaUJBQVMsSUFURTs7QUFXWEksZ0JBWFcsb0JBV0ZOLFFBWEUsRUFXUTtBQUNmLGdCQUFJTyxNQUFNLENBQVY7QUFDQSxnQkFBSUMsTUFBTSxHQUFWOztBQUVBLGdCQUFJLEtBQUtOLE9BQUwsQ0FBYU8sSUFBYixDQUFrQixLQUFsQixDQUFKLEVBQThCO0FBQzFCRixzQkFBTSxLQUFLTCxPQUFMLENBQWFPLElBQWIsQ0FBa0IsS0FBbEIsQ0FBTjtBQUNIOztBQUVELGdCQUFJLEtBQUtQLE9BQUwsQ0FBYU8sSUFBYixDQUFrQixLQUFsQixDQUFKLEVBQThCO0FBQzFCRCxzQkFBTSxLQUFLTixPQUFMLENBQWFPLElBQWIsQ0FBa0IsS0FBbEIsQ0FBTjtBQUNIOztBQUVELGdCQUFJVCxXQUFXUSxHQUFmLEVBQW9CO0FBQ2hCUiwyQkFBV1EsR0FB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QUFFQSxnQkFBSSxPQUFPRSxNQUFQLEtBQWtCLFdBQXRCLEVBQ0E7QUFDSUYsdUJBQU9FLE1BQVAsR0FBZ0JILElBQUkrQixPQUFKLENBQVk5QixPQUFPRSxNQUFuQixFQUEyQkEsTUFBM0IsQ0FBaEI7QUFDSDs7QUFFREYsbUJBQU80QixJQUFQO0FBQ0E1QixtQkFBT2lCLElBQVA7QUFDSDtBQS9HVSxLQUFmO0FBa0hILENBckhELEVBcUhJYyxTQUFTQyxJQXJIYjs7QUF1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJfYXBwLnF1YW50aXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gYXBwIHx8IHt9O1xuXG4oKGJvZHkgPT4ge1xuICAgIGxldCBfdGhpc187XG5cbiAgICBhcHAucXVhbnRpdHkgPSB7XG5cbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLmotcXVhbnRpdHknLFxuICAgICAgICAgICAgaW5wdXQ6ICcuai1xdWFudGl0eS1jb3VudCcsXG4gICAgICAgICAgICBjb250cm9sOiAnLmotcXVhbnRpdHktY29udHJvbCcsXG4gICAgICAgICAgICBjb21wbGV0ZTogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIGVsZW1lbnQ6IG51bGwsXG5cbiAgICAgICAgc2V0VmFsdWUocXVhbnRpdHkpIHtcbiAgICAgICAgICAgIGxldCBtaW4gPSAxO1xuICAgICAgICAgICAgbGV0IG1heCA9IDEwMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhKCdtaW4nKSkge1xuICAgICAgICAgICAgICAgIG1pbiA9IHRoaXMuZWxlbWVudC5kYXRhKCdtaW4nKTsgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5kYXRhKCdtYXgnKSkge1xuICAgICAgICAgICAgICAgIG1heCA9IHRoaXMuZWxlbWVudC5kYXRhKCdtYXgnKTsgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHF1YW50aXR5ID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgcXVhbnRpdHkgPSBtYXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChxdWFudGl0eSA8IG1pbikge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5ID0gbWluO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCh0aGlzLmNvbmZpZy5pbnB1dCkudmFsKHF1YW50aXR5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbmNyZWFzZShxdWFudGl0eSkge1xuICAgICAgICAgICAgcXVhbnRpdHkgKz0gMTtcblxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShxdWFudGl0eSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVjcmVhc2UocXVhbnRpdHkpIHtcbiAgICAgICAgICAgIGlmIChxdWFudGl0eSA+IDEpIHtcbiAgICAgICAgICAgICAgICBxdWFudGl0eSAtPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKHF1YW50aXR5KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5lbGVtZW50LmRhdGEoJ3Byb2R1Y3QnKSkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZih0aGlzLmNvbmZpZy5jb21wbGV0ZSkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jb21wbGV0ZS5jYWxsKG51bGwsIHRoaXMuZWxlbWVudCwgdGhpcy5lbGVtZW50LmRhdGEoJ3Byb2R1Y3QnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAga2V5cygpIHtcbiAgICAgICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGxldCByb2xlID0gJyc7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5vbigna2V5ZG93bicsIF90aGlzXy5jb25maWcuaW5wdXQsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoWzM4LCA0MF0uaW5jbHVkZXMoZS5rZXlDb2RlKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICByb2xlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgMzg6ICdpbmNyZWFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDogJ2RlY3JlYXNlJ1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXy5lbGVtZW50ID0gJCh0aGlzKS5jbG9zZXN0KF90aGlzXy5jb25maWcuZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXNbcm9sZVtlLmtleUNvZGVdXShwYXJzZUludChfdGhpc18uZWxlbWVudC5maW5kKF90aGlzXy5jb25maWcuaW5wdXQpLnZhbCgpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgX3RoaXNfLmNhbGxiYWNrKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJpbmQoKSB7XG4gICAgICAgICAgICBsZXQgcm9sZSA9ICcnO1xuXG4gICAgICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgX3RoaXNfLmNvbmZpZy5jb250cm9sLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgX3RoaXNfLmVsZW1lbnQgPSAkKHRoaXMpLmNsb3Nlc3QoX3RoaXNfLmNvbmZpZy5lbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHJvbGUgPSAkKHRoaXMpLmRhdGEoJ3JvbGUnKTtcbiAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKFsnaW5jcmVhc2UnLCAnZGVjcmVhc2UnXS5pbmNsdWRlcyhyb2xlKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzW3JvbGVdKHBhcnNlSW50KF90aGlzXy5lbGVtZW50LmZpbmQoX3RoaXNfLmNvbmZpZy5pbnB1dCkudmFsKCkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfdGhpc18uY2FsbGJhY2soKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQoY29uZmlnKSB7XG4gICAgICAgICAgICBfdGhpc18gPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX3RoaXNfLmNvbmZpZyA9IGFwcC5fZXh0ZW5kKF90aGlzXy5jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIF90aGlzXy5iaW5kKCk7XG4gICAgICAgICAgICBfdGhpc18ua2V5cygpO1xuICAgICAgICB9XG5cbiAgICB9O1xufSkpKGRvY3VtZW50LmJvZHkpO1xuXG4vLyB0aGlzLnF1YW50aXR5LmluaXQoe1xuLy8gICAgIGNvbXBsZXRlOiBmdW5jdGlvbihlbGVtZW50LCBpZCkge1xuLy8gICAgICAgICAvLyAkKGVsZW1lbnQpLmNzcyh7XG4vLyAgICAgICAgIC8vICAgICAnYm9yZGVyJzogJzFweCBzb2xpZCBsaW1lJ1xuLy8gICAgICAgICAvLyB9KTtcblxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImlkIDpcIiwgaWQpO1xuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyA8ZGl2IGNsYXNzPVwicXVhbnRpdHkgai1xdWFudGl0eSBjbGVhcmZpeFwiIGRhdGEtcHJvZHVjdD1cIjEwMDBcIiBkYXRhLW1pbj1cIjFcIiBkYXRhLW1heD1cIjk5OVwiPlxuLy8gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicXVhbnRpdHlfX2NvbnRyb2wgX2RlY3JlYXNlIGotcXVhbnRpdHktY29udHJvbFwiIGRhdGEtcm9sZT1cImRlY3JlYXNlXCI+PC9idXR0b24+XG4vLyAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvdW50WzEwMDBdXCIgdmFsdWU9XCIxXCIgZGF0YS1yb2xlPVwicXVhbnRpdHktaW5wdXRcIiBjbGFzcz1cInF1YW50aXR5X19jb3VudCBqLXF1YW50aXR5LWNvdW50XCIgbWF4bGVuZ3RoPVwiM1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuLy8gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicXVhbnRpdHlfX2NvbnRyb2wgX2luY3JlYXNlIGotcXVhbnRpdHktY29udHJvbFwiIGRhdGEtcm9sZT1cImluY3JlYXNlXCI+PC9idXR0b24+XG4vLyA8L2Rpdj4iXX0=

'use strict';

(function (d) {
    d.addEventListener('DOMContentLoaded', function () {
        app.init();
        alert('1');
    });
})(document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiXSwibmFtZXMiOlsiZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHAiLCJpbml0IiwiYWxlcnQiLCJkb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFFLGFBQUs7QUFDSEEsTUFBRUMsZ0JBQUYsQ0FBbUIsa0JBQW5CLEVBQXVDLFlBQU07QUFDekNDLFlBQUlDLElBQUo7QUFDQUMsY0FBTSxHQUFOO0FBQ0gsS0FIRDtBQUlILENBTEQsRUFLSUMsUUFMSiIsImZpbGUiOiJpbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKChkID0+IHtcbiAgICBkLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgIGFwcC5pbml0KCk7XG4gICAgICAgIGFsZXJ0KCcxJyk7XG4gICAgfSk7XG59KSkoZG9jdW1lbnQpOyJdfQ==
