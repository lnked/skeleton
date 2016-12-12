;(function ($) {
	"use strict";

	$.app = $.app || {};

	$.fn.extend( {
		quantity: function(options)
		{
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options );

			return this.each(function() {
				var that = $(this);

				that.count = that.find('.sense-quantity-count');

				// Controls
				that.decrease = that.find('.trigger-quantity[data-method="decrease"]');
				that.increase = that.find('.trigger-quantity[data-method="increase"]');

				that.check = function() {
					var value = parseInt(that.count.val());
					
					if (value == 1)
					{
						that.decrease.addClass('disabled');
					}
					
					else if (that.decrease.hasClass('disabled'))
					{
						that.decrease.removeClass('disabled');
					}
				};

				that.clicks = function() {
					that.on('click', '.trigger-quantity', function(e){
						var method = $(this).data('method'),
							value = parseInt(that.count.val());
						
						if (method == 'decrease' && value > 1)
						{
							--value;
						}

						if (method == 'increase')
						{
							value++;
						}

						that.count.val(value);

						that.check();
					});
				};

				that.tracking = function() {
					that.on('keydown', that.count, function (e) {
						if (e.which == 38 || e.which == 40)
						{
							e.preventDefault();
							
							var value = parseInt(that.count.val());
							
							if (e.which == 38)
							{
								value++;
							}
							else if (e.which == 40 && value > 1)
							{
								--value;
							}

							that.count.val(value);
							that.check();
						}
					});
				};

				that.init = function() {
					that.clicks();
					that.tracking();
					that.check();
				}

				that.init();
			});
		}
	});

	$.app.cart = {
		init: function()
		{
			$('.quantity').quantity();
		}
	};

})(jQuery);


// $.define('сounter', {
//     events: {
//         'b-inited': 'oninit',
//         'click .js-inc': 'onClickPlus',
//         'click .js-dec': 'onClickMinus'
//     },
//     methods: {
//         oninit: function() {
//             this.$info = this.$node.find('.js-info');
//             this.count = 0;
//         },

//         /**
//          * Обработчик клика на плюс
//          */
//         onClickPlus: function() {
//             this.inc();
//             this.update();
//         },

//         /**
//          * Обработчик клика на минус
//          */
//         onClickMinus: function() {
//             this.dec();
//             this.update();
//         },

//         /**
//          * Увеличить счетчик
//          */
//         inc: function() {
//             this.count += this.params.step;
//         },

//         /**
//          * Уменьшить счетчик
//          */
//         dec: function() {
//             this.count -= this.params.step;
//         },

//         /**
//          * Нарисует новое значение
//          */
//         update: function() {
//             this.$info.text(this.count);
//         }
//     }
// });

/*

;(function($) {
    $.cart = {
    	init: function()
    	{
    		$.cart.initBuy();
    		$.cart.initRemove();
    		$.cart.initControll();
    	},
    	initBuy: function()
    	{
    		$('.add-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.buyItem( $(this).attr('href').split('-')[1] );
    			return false;
    		});
    	},
    	initControll: function()
    	{
    		$('.increase-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.increase( $(this).attr('href').split('-')[1] );
    			return false;
    		});

			$('.decrease-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.decrease( $(this).attr('href').split('-')[1] );
    			return false;
    		});
    	},
    	initRemove: function()
    	{
    		$('.remove-cart-trigger').on('click', function(e){
    			e.preventDefault();
    			$.cart.removeItem($(this).attr('href').split('-')[1], this);
    			return false;
    		});
    	},
    	removeItem: function(id, _self_)
		{
			$.post('/ajax/cart/remove/', { item: id }, function(data) {
				if( $('#catalog-product-'+id).find('.incart').length > 0 )
				{
					$('#catalog-product-'+id).find('.incart').remove();
				}
				
				if($(_self_).hasClass('catalog-product-incart'))
				{
					$(_self_).remove();
				}
				else
				{
					$('#incart-item-'+id).html( '<a href="#item-'+id+'" title="Добавить в корзину" class="button-cart add-cart-trigger">Купить кресло</a>' );
					$.cart.initBuy();
				}

		        $.cart.addedItem('Товар удален из корзины.');
			});
		},
		buyItem: function(id)
		{
			var count = 1;
			var size = 0;
			
			if( $('#count-'+id).length > 0 ) {
				count = parseInt( $('#count-'+id).val() ) ;
			}

			if( $('#size-list').find('.current').length > 0 ) {
				size = parseInt( $('#size-list').find('.current').attr('href').split('-')[1] );
			}
			
			$.post('/ajax/cart/buy/', { item: id, size: size, count: count }, function(data) {
				if( $('#cart-count').length > 0 )
				{
					$('#cart-count').html( data.count );
				}
				
				if( $('#cart-price').length > 0 )
				{
					$('#cart-price').html( data.money );
				}
				
				if( $('#count-'+id).length > 0 )
				{
					$('#count-'+id).val(1);
				}

				if( $('#catalog-product-'+id).find('.incart').length == 0 ) {
					$('#incart-item-'+id).html( '<a href="#item-' + id + '" title="Удалить из корзины" class="button-remove remove-cart-trigger">Кресло в корзине</a>' );

					$.cart.initRemove();
				}

				$.cart.addedItem();
			}, 'JSON');
		},
		addedItem: function(text, large)
		{
		    text = !text ? 'Товар добавлен в корзину.' : text ;
		    large = !large ? false : large ;
		    var timeout = !large ? 1500 : 5000, addclass = !large ? '' : ' adding-large' ;
		    
		    if( $('body').find('#item-added-to-cart').length == 0 ) {
		        $('body').append('<div id="item-added-to-cart" class="showadding' + addclass + '"><div class="adding-inner"><div class="adding-content">' + text + '</div></div></div>');
		        setTimeout(function(){
		            $('body').find('#item-added-to-cart').remove() ;
		        },timeout);
		    }
		    else {
		        setTimeout(function(){
		            $('body').find('#item-added-to-cart').remove() ;
		        },timeout);
		    }
		},
		increase: function(id)
		{
			if( $('#count-'+id).length > 0 ) {
		        var value = parseInt( $('#count-'+id).val() ) ;
		            value = !value ? 0 : value ;
		            
		            value++ ;
		            
		            $('#count-'+id).val( value ) ;
		    }
			
			if($('#cart-table').length > 0)
			{
				$.cart.reTotal(id);
			}
		},
		decrease: function(id)
		{
			if( $('#count-'+id).length > 0 )
			{
				var value = parseInt( $('#count-'+id).val() ) ;
					value = !value ? 1 : value ;
					
					if( value >= 2 ) value-- ;
					else value = 1 ;
					
					$('#count-'+id).val( value ) ;
			}
			
			if($('#cart-table').length > 0)
			{
				$.cart.reTotal(id);
			}
		},
		reTotal: function(id)
		{
			if( $('#count-'+id).length > 0 )
			{
				var count = parseInt( $('#count-'+id).val() );
				
				$.post('/ajax/cart/recount/', { item: id, count: count }, function(data) {
					var price = parseInt( $('#cart-item-price-'+id).html() );
					var total = count * price;

					$('#cart-item-total-'+id).html(total) ;
					$('#cart-total-count').html(data.count);
					$('#cart-total-price').html(data.money);

					if( $('#cart-count').length > 0 )
					{
						$('#cart-count').html( data.count );
					}
					
					if( $('#cart-price').length > 0 )
					{
						$('#cart-price').html( data.money );
					}
				}, 'JSON');
			}
		}
	}

	$.cart.init();
})(jQuery);
*/