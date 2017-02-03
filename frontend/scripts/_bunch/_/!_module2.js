function library(module) {
    $(function() {
        if (module.init) {
            module.init();
        }
    });

    return module;
}

var Module = library(function() {
    return {
        init: function() {
            /* код модуля */
        }
    };
}());