$(window).load(function(){
    if(window.jQueryReadyHandlers) { 
        $.each(window.jQueryReadyHandlers, function(index,func){  
            $(func);
        });
    }
});

$(document).ready(function() {
    app.init();
});