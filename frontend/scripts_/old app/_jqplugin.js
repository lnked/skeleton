(function ($) {
    var Tooltips = function (elm) {
        $(elm).after('<div class="xd_tooltips">' + $(elm).data('title') + '</div>');
    };
    $.fn.tooltips = function (opt) {
        var options = $.extend(true, {
            position: 'top'
        }, opt);
        return this.each(function () {
            if (!$(this).data('tooltips')) {
                $(this).data('tooltips', new Tooltips(this, options));
            }
        });
    };
}(jQuery));


(function ($) {
    var Tooltips = function (elm) {
        $(elm).after('<div class="xd_tooltips">' + $(elm).data('title') + '</div>');
    };
    $.fn.tooltips = function (opt) {
        var options = $.extend(true, {
            position: 'top'
        }, opt);
        return this.each(function () {
            if (!$(this).data('tooltips')) {
                $(this).data('tooltips', new Tooltips(this, options));
            }
        });
    };
}(jQuery));


// идеально
var PluginName = function () {
    var self,
        init = function () {
            // инициализация 
        };
    self = {
        init: init
    };
    return self;
};


///

(function ($) {
    var Tooltips = function (elm, options) {
        var self,
            init = function () {
                $(elm).after('<div class="xd_tooltips ' + options.position + '">' + $(elm).data('title') + '</div>');
            };
        self = {
            init: init
        };
        return self;
    };
    $.fn.tooltips = function (opt) {
        return this.each(function () {
            var tooltip;
            if (!$(this).data('tooltips')) {
                tooltip = new Tooltips(this, $.extend(true, {
                    position: 'top'
                }, opt));
                tooltip.init();
                $(this).data('tooltips', tooltip);
            }
        });
    };
}(jQuery));


$.fn.tooltips = function (opt) {
    return this.each(function () {
        var tooltip;
        if (!$(this).data('tooltips')) {
            tooltip = new Tooltips(this, $.fn.tooltips.defaultOptions, opt);
            tooltip.init();
            $(this).data('tooltips', tooltip);
        }
    });
};
$.fn.tooltips.defaultOptions = {
    position: 'top'
};

$.fn.tooltips.defaultOptions.position = 'left';


////

$.fn.tooltips = function (opt, opt2) {
    var result = this;
    this.each(function () {
        var tooltip;
        if (!$(this).data('tooltips')) {
            tooltip = new Tooltips(this, $.fn.tooltips.defaultOptions, opt);
            tooltip.init();
            $(this).data('tooltips', tooltip);
        } else {
            tooltip = $(this).data('tooltips');
        }
        if ($.type(opt) === 'string' && tooltip[opt] !== undefined && $.isFunction(tooltip[opt])) {
            result = tooltip[opt](opt2);
        }
    });
    return result;
};

$('input[type=date]').datetimepicker();
$('input[type=date]').datetimepicker('setValue', '12.02.2016');
console.log($('input[type=date]').datetimepicker('getValue'));