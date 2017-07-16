function outerHeight (el, margin) {
    if (margin) {
        var height = el.offsetHeight;
        var style = el.currentStyle || getComputedStyle(el);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;    
    } else {
        return el.offsetHeight;    
    }
}

// outerHeight(el);

function outerWidth(el, margin) {
    if (margin) {
        var width = el.offsetWidth;
        var style = el.currentStyle || getComputedStyle(el);

        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    } else {
        return el.offsetWidth;
    }
}

outerWidth(el);
