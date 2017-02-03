var app = app || {};

(function(body){
    "use strict";

    app.shoppingCart = {

        config: {
            add: '.j-cart-add',
            remove: '.j-cart-remove',
            count: '.watch-cart-count',
            amount: '.watch-cart-amount',
            discount: '.watch-cart-discount',
            container: '.j-button-container',
            toggle_class: 'in-cart',
            product: function($item) {
                return parseInt($item.data('product'));
            },
            timeout: 50,
            callback: null
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

        callback: function($item, response)
        {
            if (typeof(this.config.callback) == 'function')
            {
                this.config.callback.call(this, $item, response);
            }
            else
            {
                if (typeof response.count !== 'undefined')
                {
                    $(this.config.count).html(response.count);

                    if (response.count > 0)
                    {
                        $item.closest(this.config.container).addClass(this.config.toggle_class);
                    }
                    else
                    {
                        $item.closest(this.config.container).removeClass(this.config.toggle_class);
                    }
                }
                else
                {
                    $item.closest(this.config.container).removeClass(this.config.toggle_class);
                }
                
                if (typeof response.amount !== 'undefined')
                {   
                    $(this.config.amount).html(this.convertMoney(response.amount));
                }

                if (typeof response.remove !== 'undefined')
                {
                    $item.closest(this.config.container).removeClass(this.config.toggle_class);
                }

                setTimeout(function(){
                    $item.data('blocked', false);
                }, this.config.timeout);
            }
        },

        convertMoney: function(n)
        {
            var c = 0,
                d = '',
                t = ' ',
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;

            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        },

        bind: function()
        {
            var _this = this;

            $('body').on('click', [_this.config.remove, _this.config.add].join(','), function(e){
                e.preventDefault();

                if (!$(this).data('blocked'))
                {
                    _this.request($(this));   
                }

                return false;
            });
        },

        request: function($item)
        {
            var _this = this;
            
            $item.data('blocked', true);

            var data = {};
            var action = '';
            var method = 'GET';

            if ($item.data('method'))
            {
                method = $item.data('method');
            }
            
            if ($item.data('action'))
            {
                action = $item.data('action');
            }
            
            if (!action && $item.attr('href'))
            {
                action = $item.attr('href');
            }

            if ($item.data('product'))
            {
                data['product'] = this.config.product($item);
            }
            
            $.ajax({
                url: action,
                data: data,
                type: method,
                cache: false,
                dataType: 'JSON',
                success: function(response)
                {
                    _this.callback($item, response);
                },
                error: function(response)
                {
                    $item.data('blocked', false);
                    console.log('error: ', response)
                }
            });
        },

        init: function(config)
        {
            if (typeof config !== 'undefined')
            {
                this.extend(config);
            }

            this.bind();
        }

    };

})(document.body);

// this.shoppingCart.init({
//     add: '.j-shopping-cart-add',
//     remove: '.j-shopping-cart-remove'
// });

// <a href="/cart/remove?product=10&backuri=xx" data-action="/cart/remove" data-product="{$product.id}" data-method="POST|GET" class="button remove j-cart-remove" title="Удалить из корзины">Удалить из корзины</a>
// <a href="/cart/add?product=10&backuri=xx" data-action="/cart/remove" data-product="{$product.id}" data-method="POST|GET" class="button add j-cart-add" title="Добавить в корзину">Добавить в корзину</a>
