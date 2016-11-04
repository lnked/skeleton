var app = app || {};

(function(body){
    "use strict";

    app.flexsize = {

        stack: [],
        group: {},

        maximum: function(_a)
        {
            return Math.max.apply(null, _a);
        },

        resize: function()
        {
            var _this = this, list = null, idx = null, i, element = null, offset = 0;

            if (_this.stack.length)
            {
                for (idx in _this.stack)
                {
                    element = _this.stack[idx];
                    offset = $(element).offset().top;

                    if (typeof (_this.group[offset]) == 'undefined')
                    {
                        _this.group[offset] = [];
                    }

                    _this.group[offset].push(element);
                }
                
                if (Object.keys(_this.group).length)
                {
                    for (idx in _this.group)
                    {
                        list = _this.group[idx];

                        if (list.length >= 2)
                        {
                            var max = 0, stack = [];

                            for (i in list)
                            {
                                stack.push($(list[i]).height());
                            }

                            max = _this.maximum(stack);

                            for (i in list)
                            {
                                $(list[i]).height(max);
                            }
                        }
                    }
                }
            }
        },

        init: function()
        {
            if ($('.j-flex-size').length)
            {
                var _this = this;

                $('.j-flex-size').each(function(){
                    _this.stack.push($(this));
                });

                _this.resize();
            }
        }

    };

})(document.body);