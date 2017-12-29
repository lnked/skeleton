const app = app || {};

(((body) => {
  app.quantity = {

    config: {
      element: '.j-quantity',
      input: '.j-quantity-count',
      control: '.j-quantity-control',
      complete: null,
      afterClick: null
    },

    element: null,

    getValue() {
      return parseInt(this.element.find(this.config.input).val(), 10);
    },

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

    afterClick($control) {
      if (typeof (this.config.afterClick) == 'function') {
        this.config.afterClick.call(null, $control);
      }
    },

    callback() {
      if (typeof (this.element.data('product')) !== 'undefined' && typeof (this.config.complete) == 'function') {
        this.config.complete.call(null, this.element, this.element.data('product'), this.getValue());
      }
    },

    keys() {
      const _this_ = this;
      let role = '';

      $('body').on('keydown', _this_.config.input, (e) => {
        if ([0, 8, 13, 38, 40].indexOf(e.which) < 0 && (e.which < 48 || e.which > 57)) {
          return !1;
        }
      });

      $('body').on('keydown', _this_.config.input, function(e) {
        if ([38, 40].includes(e.keyCode)) {
          e.preventDefault();

          role = {
            38: 'increase',
            40: 'decrease'
          };

          _this_.element = $(this).closest(_this_.config.element);

          _this_[role[e.keyCode]](parseInt(_this_.element.find(_this_.config.input).val()));

          _this_.callback();

          return false;
        }
      });
    },

    bind() {
      let role = '';
      const _this_ = this;

      $('body').off('click.quantity').on('click.quantity', _this_.config.control, function(e) {
        e.preventDefault();

        _this_.afterClick($(this).closest('.j-quantity'));

        _this_.element = $(this).closest(_this_.config.element);

        role = $(this).data('role');

        if (['increase', 'decrease'].includes(role)) {
          _this_[role](parseInt(_this_.element.find(_this_.config.input).val()));
        }

        _this_.callback();

        return !1;
      });
    },

    make(config) {
      const _this_ = this;

      if (typeof config !== 'undefined') {
        _this_.config = app._extend(_this_.config, config);
      }

      _this_.bind();
      _this_.keys();
    }

  };
}))(document.body);

// app.quantity.make({
//     afterClick: function($element) {
//         $element.addClass('is-disabled');
//     },
//     complete: function($element, id, count) {
//         $element.removeClass('is-disabled');

//         const $product = $element.closest('.j-product');
//         const $amount = $product.find('.j-product-amount');

//         $amount.html(currency($amount.data('price') * count));

//         _this_.calculate();

//         console.log("id :", id, $amount.data('price'), count);
//     }
// });

// <div class="quantity j-quantity clearfix" data-product="1000" data-min="1" data-max="999">
//     <button type="button" class="quantity__control _decrease j-quantity-control" data-role="decrease"></button>
//     <input type="text" name="count[1000]" value="1" data-role="quantity-input" class="quantity__count j-quantity-count" maxlength="3" autocomplete="off">
//     <button type="button" class="quantity__control _increase j-quantity-control" data-role="increase"></button>
// </div>
