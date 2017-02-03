;(function($) {
    
    var body = $('body'),
        config = {
            pclass: 'form__row'
        };

    function iSelect(select)
    {
        if (select.hasClass('inited'))
        {
            return !1;
        }

        var selectbox, divSelect, divText, dropdown, li, selectHeight, liHeight, position, option, topOffset, bottomOffset, selectedText, liText, optionSelected, selectboxSelect, selectboxDropdown, selectboxTrigger, selectboxSelectText, optionText, ddlist, class_name, length, liItem, data, x;

        option = select.find('option');
        optionSelected = option.filter(':selected');
        
        if (optionSelected.length)
        {
            optionText = optionSelected.text();
        }
        else {
            optionText = option.filter(':first').text();
        }

        //Html
        ddlist = document.createElement('ul');
        ddlist.className = 'selectbox__dropdown__list';

        length = option.length;

        for (i = 0; i < length; i++)
        {
            class_name = '';

            if (option.eq(i).is(':selected')) class_name += ' selected sel';
            if (option.eq(i).is(':disabled')) class_name += ' disabled';
            
            if (i == (option.length-1))
            {
                class_name += ' last-child';
            }
            
            if (option.eq(i).data('isclass'))
            {
                class_name += ' ' + option.eq(i).data('isclass');
            }

            liItem = document.createElement('li');
            liItem.className = 'selectbox__dropdown__item' + class_name;
            liItem.appendChild(document.createTextNode(option.eq(i).text()));
            
            if (option.eq(i).data())
            {
                data = option.eq(i).data();
                
                for (x in data)
                {
                    $(liItem).data(x, data[x]);
                }
            }

            ddlist.appendChild(liItem);
        }

        selectbox = document.createElement('div');
        selectbox.className = 'selectbox';

        if (select.is(':disabled'))
        {
            selectbox.className = selectbox.className + ' is-disabled';
        }
        
        selectboxSelectText = document.createElement('div');
        selectboxSelectText.className = 'selectbox__select__text';
        selectboxSelectText.appendChild(document.createTextNode(optionText));

        selectboxSelect = document.createElement('div');
        selectboxSelect.className = 'selectbox__select';
        selectboxSelect.appendChild(selectboxSelectText);

        selectboxTrigger = document.createElement('div');
        selectboxTrigger.className = 'selectbox__trigger';
        selectboxTrigger.innerHTML = '<i class="selectbox__trigger__arrow"></i>';

        selectboxDropdown = document.createElement('div');
        selectboxDropdown.className = 'selectbox__dropdown';
        selectboxDropdown.appendChild(ddlist);
        
        selectbox.appendChild(selectboxSelect);
        selectbox.appendChild(selectboxTrigger);
        selectbox.appendChild(selectboxDropdown);

        select.before(selectbox).css({
            position: 'absolute',
            left: -9999
        });

        selectbox = $(selectbox);

        // Events
        divSelect   = $(selectboxSelect);
        divText     = $(selectboxSelectText);
        dropdown    = $(selectboxDropdown);
        
        li = dropdown.find('li');

        selectHeight = selectbox.outerHeight();
        
        if (dropdown.css('left') == 'auto')
        {
            dropdown.css({
                left: 0
            });
        }
        
        if (dropdown.css('top') == 'auto')
        {
            dropdown.css({
                top: selectHeight
            });
        }

        liHeight = li.outerHeight();
        position = dropdown.css('top');

        dropdown.hide();
        selectbox.removeClass('selectbox-active');

        divSelect.on('click', function (e){
            e.preventDefault();

            if (selectbox.hasClass('is-disabled'))
            {
                return !1;
            }

            topOffset = selectbox.offset().top;
            bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());

            if (bottomOffset < 0 || bottomOffset < liHeight * 6)
            {
                dropdown.height('auto').css({
                    top: 'auto',
                    bottom: position
                });

                if (dropdown.outerHeight() > topOffset - $(window).scrollTop() - 20) {
                    dropdown.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
                }
            }
            else if (bottomOffset > liHeight * 6)
            {
                dropdown.height('auto').css({
                    bottom: 'auto',
                    top: position
                });

                if (dropdown.outerHeight() > bottomOffset - 20)
                {
                    dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
                }
            }

            selectbox.css({
                zIndex: 1000
            });

            $('.form__row.overed').removeClass('overed');

            if (selectbox.closest('.form__row').length)
            {
                selectbox.closest('.form__row').addClass('overed');
            }

            if (dropdown.is(':hidden'))
            {
                body.trigger('select.close', $('.selectbox__dropdown:visible'));
                $('.selectbox__dropdown:visible').hide();
                
                selectbox.addClass('selectbox-active');
                dropdown.show();

                body.trigger('select.open', divSelect);
            }
            else
            {
                selectbox.removeClass('selectbox-active');
                dropdown.hide();

                body.trigger('select.close', divSelect);
            }

            return !1;
        });

        li.hover(function () {
            $(this).siblings().removeClass('selected');
        });

        selectedText = li.filter('.selected').text();

        li.filter(':not(.disabled)').on('click', function () {
            liText = $(this).text();

            if (li.closest('.form__row').length)
            {
                li.closest('.form__row').removeClass('overed');
            }
            
            if (selectedText !== liText)
            {
                $(this).addClass('selected sel').siblings().removeClass('selected sel');
                option.prop('selected', !1).eq($(this).index()).prop('selected', !0);
                
                selectedText = liText;
                divText.text(liText);
                select.change();

                selectbox.addClass('is-checked');
            }

            dropdown.hide();

            selectbox.removeClass('selectbox-active');
        
            $('body').trigger('select.close', divSelect);

            return !1;
        });

        dropdown.mouseout(function () {
            dropdown.find('li.sel').addClass('selected');
        });
        
        select.focus(function() {
            $('.selectbox').removeClass('focused');
            selectbox.addClass('focused');
        }).keyup(function () {
            divText.text(option.filter(':selected').text());
            li.removeClass('selected sel').eq(option.filter(':selected').index()).addClass('selected sel');
        });

        select.addClass('inited');
    }

    $.fn.selectbox = function() {
        
        body.on('click', function (e) {
            if (!$(e.target).parents().hasClass('selectbox'))
            {
                if ($('.selectbox.selectbox-active').length)
                {
                    if ($('.selectbox.selectbox-active').find('li.sel').length)
                    {
                        $('.selectbox.selectbox-active').find('li.sel').addClass('selected');
                    }

                    if ($('.selectbox.selectbox-active').closest('.form__row').length)
                    {
                        $('.selectbox.selectbox-active').closest('.form__row').removeClass('overed');
                    }

                    body.trigger('select.close', $('.selectbox.selectbox-active'));

                    $('.selectbox.selectbox-active').find('.selectbox__dropdown:visible').hide();
                    $('.selectbox.selectbox-active').removeClass('selectbox-active focused');
                }
            }
        });

        return this.each(function(){
            
            return (function(select){

                iSelect(select);

                select.on('refresh', function(){
                    select.prev('.selectbox').remove();
                    select.removeClass('inited');
                    iSelect(select);
                });

            })($(this))

        });

    };
})(jQuery);