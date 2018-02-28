var tracking = document.querySelector('.mouse-cursor-gradient-tracking')

tracking.onmousemove = function (e) {
    var x = e.pageX - tracking.offsetLeft
    var y = e.pageY - tracking.offsetTop
    tracking.style.setProperty('--x', x + 'px')
    tracking.style.setProperty('--y', y + 'px')
}
