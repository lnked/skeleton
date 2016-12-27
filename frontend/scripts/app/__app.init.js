var app = app || {};

(function(body){
    "use strict";

    app = {

        _extend: function(source, config)
        {
            if (typeof config !== 'undefined')
            {
                for (var x in config)
                {
                    source[x] = config[x];
                }
            }

            return source;
        },

        bind: function()
        {
            for(var _ in this)
            {
                if (typeof(this[_]) == 'object' && typeof(this[_].init) !== 'undefined')
                {
                    if (typeof(this[_].init) == 'function')
                    {
                        this[_].init();
                    }
                }
            }
        },

        init: function()
        {
            this.bind();
        }

    };

})(document.body);