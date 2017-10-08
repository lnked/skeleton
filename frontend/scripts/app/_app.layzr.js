let app = app || {};

((body => {
    "use strict";

    app.layzr = {

        init: function()
        {
            var bLazy = new Blazy({
                breakpoints: [{
                    width: 420,
                    src: 'data-src-small'
                }],
                success: function(element){
                    setTimeout(function(){
                        var parent = element.parentNode;
                        parent.className = parent.className.replace(/\bloading\b/,'');
                    }, 200);
                }
            });
        }

    };

}))(document.body);
