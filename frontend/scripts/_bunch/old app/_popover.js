;( function( $ ) {
	"use strict";

	$.fn.extend({
		popover: function(options)
		{
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options );

			return this.each(function() {
				var that = $(this), $dropdown, $target, isopen = false;

				function hideDropdown(ignore)
				{
					if (isopen)
					{
						if (typeof(ignore) !== 'undefined' && $('#dropdown-' + ignore).hasClass('open'))
						{
							$dropdown = $('.dropdown.open').not('#dropdown-' + ignore);
						}
						else
						{
							$dropdown = $('.dropdown.open');
						}

						$dropdown.removeClass('animate');
					
						setTimeout(function(){
				  			$dropdown.removeClass('open');
				  		}, 400);

				  		isopen = false;
				  	}
				}

				function getPosition(target) {
					var left = 0, ww = $(window).width(), top = 0;

					if ($(target).hasClass('trigger-dropdown'))
					{
						$target = $(target);
					}
					else {
						$target = $(target).closest('.trigger-dropdown');
					}

					left = $target.offset().left + $target.width();
					top = $target.offset().top + $target.height() + 17;
					
					return { 'left': left, 'top': top };
				}

				that.check = function() {
				
				};

				that.clicks = function() {
					that.on('click', function(e) {
						e.preventDefault();

						var block = $(this).data('dropdown'), $dropdown, onOpenScrollTop;

						if ($('#dropdown-' + block).length > 0 && $('#dropdown-' + block).hasClass('open'))
						{
							hideDropdown();
						}
						else {

							if ($('#dropdown-' + block).length == 0)
							{
								$dropdown = $(tmpl('tmpl_dropdown_' + block, {}));
								$('body').append($dropdown);
							}
							else
							{
								$dropdown = $('#dropdown-' + block);
							}
							
							if (!$('#dropdown-' + block).hasClass('open'))
							{
								onOpenScrollTop = $(window).scrollTop();
								
								$dropdown.css(getPosition(e.target));
								$dropdown.toggleClass('open').timeoutClass('animate');

								setTimeout(function(){
									isopen = true;
								}, 10);
							}
						}
					});

					$('body').on('click', function(e){
						if ((isopen === true || $('.dropdown.open').length) && $(e.target).closest('.dropdown').length == 0)
						{
							if ($(e.target).closest('.trigger-dropdown').length || $(e.target).hasClass('trigger-dropdown'))
							{
								var ignore = '';

								if ($(e.target).closest('.trigger-dropdown').length)
								{
									ignore = $(e.target).closest('.trigger-dropdown').data('dropdown');
								}
								else if ($(e.target).hasClass('trigger-dropdown'))
								{
									ignore = $(e.target).data('dropdown');
								}

								hideDropdown(ignore);
							}
							else
							{
								hideDropdown();
							}
						}
				    });

					$(window).scroll(function(){
						if (isopen === true && (((onOpenScrollTop + scrollShift) < $(window).scrollTop()) || ((onOpenScrollTop - scrollShift) > $(window).scrollTop())))
						{
							hideDropdown();
						}
					});
				};

				that.init = function() {
					that.clicks();
					that.check();
				}

				that.init();
			});
		}
	});
})( jQuery );