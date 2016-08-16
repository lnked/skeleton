;( function( $ ) {
    "use strict";

    $.app = $.app = $.app || {};

    var body = $('body'), _this;

    $.app.ajaxForm = {

        config: {
            form_class: '.form-ajax',
            form_reset: 'form-reset',
            link_class: '.js-request-link',
            error_class: 'error',
            error_message: 'form__error-message',
            error_message_class: 'j-error-message',
            error_message_addclass: 'show',
            form_label: '.form__wrapper',
            checkbox_label: 'checkbox__label'
        },

        callback_stack: {},

        extend: function(config)
        {
            _this = this;

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

        default_handler: function(form, response)
        {
            _this = this;

            if (response.status)
            {
                if (response.hasOwnProperty('redirect_url'))
                {
                    window.location.href = response.redirect_url;
                }
            }
            else if (typeof response.errors !== 'undefined' || typeof response.error_message !== 'undefined')
            {
                var errors, error_message;

                if (typeof response.errors !== 'undefined')
                {
                    errors = response.errors;
                }

                if (typeof response.error_message !== 'undefined')
                {
                    error_message = response.error_message;
                }

                _this.validation(form, errors, response.error_message);
            }
            
            if (response.hasOwnProperty('open_popup'))
            {
                if ($('body').find('.popup.is-open').length)
                {
                    $.popup.close($('body').find('.popup.is-open'), function(){
                        $.popup.open(response.open_popup);
                    });
                }
                else
                {
                    $.popup.open(response.open_popup);
                }
            }

            if (response.hasOwnProperty('message'))
            {
                $.popup.message(response.title, response.message);
            }

        },

        validation: function(form, errors, error_message)
        {
            _this = this;

            form.find('.' + _this.config.error_class).removeClass(_this.config.error_class);
            form.find('.' + _this.config.error_message).remove();
            form.find('.' + _this.config.error_message_class).removeClass(_this.config.error_message_addclass);
            
            var fieldName, field;

            setTimeout(function() {
                if (typeof error_message !== 'undefined' && error_message !== '')
                {
                    form.find('.' + _this.config.error_message_class).html(error_message);
                    form.find('.' + _this.config.error_message_class).addClass(_this.config.error_message_addclass);
                }

                if (typeof errors !== 'undefined' && errors !== '')
                {
                    for(fieldName in errors)
                    {
                        if (form.find('input[name="'+fieldName+'"]').length > 0)
                        {
                            field = form.find('input[name="'+fieldName+'"]');
                        }

                        if (form.find('select[name="'+fieldName+'"]').length > 0)
                        {
                            field = form.find('select[name="'+fieldName+'"]');
                        }

                        if (form.find('textarea[name="'+fieldName+'"]').length > 0)
                        {
                            field = form.find('textarea[name="'+fieldName+'"]');
                        }

                        if (field.closest('.' + _this.config.checkbox_label).length > 0)
                        {
                            field = field.closest('.' + _this.config.checkbox_label);
                        }

                        if (typeof field !== 'undefined')
                        {
                            field.addClass(_this.config.error_class);
                            field.closest(_this.config.form_label).append('<div class="' + _this.config.error_message + '">' + errors[fieldName] + '</div>');
                        }
                    }
                }
            }, 10);
        },

        upload: function()
        {
            _this = this;

            body.on('submit', '.form-file-upload', function(e) {
                return AIM.submit(this, {
                    onStart: function()
                    {

                    },
                    onComplete: function(result)
                    {
                        if (typeof result === 'object' && result.status === true && result.hasOwnProperty('photo_url'))
                        {

                        }
                    }
                });
            });
            
            $(document).on('change', '.upload_button_onchange', function(){
                if ($(this).closest('.upload_button').find('.upload_button_field').length > 0)
                {
                    $(this).closest('.upload_button').find('.upload_button_field').html($(this).val());
                }
            });
        },

        send: function(action, method, data, cb, err)
        {

            if (typeof cb !== 'function')
            {
                cb = function() {};
            }

            if (typeof err !== 'function')
            {
                err = function() {};
            }

            try {
            
                $.ajax({
                    url: action,
                    type: method,
                    data: data,
                    contentType: false,
                    processData: method.toLowerCase() == 'get',
                    success: cb,
                    error: err,
                    dataType: 'JSON'
                });

            } catch(e){}

        },

        initLink: function()
        {
            _this = this;

            body.on('click', _this.config.link_class, function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                
                var link = $(this);

                if (link.data('is-busy')) {
                    return;
                }

                link.data('is-busy', true);

                var action = ($(this).attr('href')) || $(this).data('action'),
                    method = ($(this).data('method')) || 'get',
                    data = {};

                _this.send(
                    action,
                    method,
                    data,
                    function(response)
                    {
                        if (link.data('callback') && _this.callback_stack.hasOwnProperty(link.data('callback')))
                        {
                            _this.callback_stack[link.data('callback')](link, response);
                        }
                        else
                        {
                            _this.default_handler(link, response);
                        }

                        if (response.status === true)
                        {
                            
                        }

                        link.data('is-busy', false);
                    },
                    function(response)
                    {
                        _this.default_handler(link, response);
                        link.data('is-busy', false);
                    }
                );
            });
        },

        initForm: function()
        {
            _this = this;

            body.on('submit', _this.config.form_class, function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var form    = $(this),
                    action  = form.attr('action'),
                    method  = (form.attr('method') || 'post'),
                    data    = !!window.FormData ? new FormData(form[0]) : form.serialize();

                if (form.data('is-busy')) {
                    return;
                }

                form.data('is-busy', true);

                if (typeof button !== 'undefined')
                {
                    if (button.data('loading'))
                    {
                        button.data('original', button.text());
                        button.text(button.data('loading'));
                    }

                    button.addClass('preload');
                }

                if (form.data('precallback') && _this.callback_stack.hasOwnProperty(form.data('precallback'))) {
                    if(!_this.callback_stack[form.data('precallback')](form))
                    {
                        return false;
                    }
                }

                _this.send(
                    action,
                    method,
                    data,
                    function(response)
                    {
                        if (form.data('callback') && _this.callback_stack.hasOwnProperty(form.data('callback')))
                        {
                            _this.callback_stack[form.data('callback')](form, response);
                        }
                        else
                        {
                            _this.default_handler(form, response);
                        }

                        if (response.status === true)
                        {
                            if (form.hasClass(_this.config.form_reset))
                            {
                                form.find('.' + _this.config.error_class).removeClass(_this.config.error_class);
                                form.get(0).reset();
                            }
                        }

                        if (typeof button !== 'undefined')
                        {
                            if (button.data('original'))
                            {
                                button.text(button.data('original'));
                            }

                            button.removeClass('preload');
                        }

                        form.data('is-busy', false);
                    },
                    function(response)
                    {
                        _this.default_handler(form, response);
                        form.data('is-busy', false);
                    }
                );
            });
        },

        init: function(config)
        {
            this.extend(config);
            
            this.initForm();
            this.initLink();
        }
    };

    $.app.ajaxForm.init();

})( jQuery );