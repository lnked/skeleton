var app = app || {};

(function(body){
    "use strict";

    app = {

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