// var touchstartX = 0;
// var touchstartY = 0;
// var touchendX = 0;
// var touchendY = 0;

// var swipeme = document.getElementById('swipeme');

// swipeme.addEventListener('touchstart', function(event) {
//     touchstartX = event.changedTouches[0].screenX;
//     touchstartY = event.changedTouches[0].screenY;
// }, false);

// swipeme.addEventListener('touchend', function(event) {
//     touchendX = event.changedTouches[0].screenX;
//     touchendY = event.changedTouches[0].screenY;
//     handleGesture();
// }, false);

// function handleGesture() {
//     var swiped = 'swiped: ';
//     if (touchendX < touchstartX) {
//         alert(swiped + 'left!');
//     }
//     if (touchendX > touchstartX) {
//         alert(swiped + 'right!');
//     }
//     if (touchendY < touchstartY) {
//         alert(swiped + 'down!');
//     }
//     if (touchendY > touchstartY) {
//         alert(swiped + 'left!');
//     }
//     if (touchendY == touchstartY) {
//         alert('tap!');
//     }
// }
