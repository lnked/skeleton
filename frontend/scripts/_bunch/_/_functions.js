"use strict";

function updateCaptcha(selector) {
    if ($(selector).length) {
        var src = $(selector).attr('src').split('?')[0];
        $(selector).attr('src', src + '?' + Math.random());
    }
}

function lockScroll(element) {
    var lockX, lockY, events = ['scroll', 'mousewheel', 'touchmove'], keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
          e.preventDefault();
        e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }

    // function disableScrolling(){
    //     var x=window.scrollX;
    //     var y=window.scrollY;
    //     window.onscroll=function(){window.scrollTo(x, y);};
    // }

    // function enableScrolling(){
    //     window.onscroll=function(){};
    // }

    // function disable_scroll() {
    //    ...
    //    document.ontouchmove = function(e){ 
    //         e.preventDefault(); 
    //    }
    // }

    // function enable_scroll() {
    //    ...
    //    document.ontouchmove = function(e){ 
    //      return true; 
    //    }
    // }



    // element = document.getElementById(element);

    // e.preventDefault ? e.preventDefault() : e.returnValue = false;

    // element.addEventListener('mousewheel', function(e) {
    //     e.preventDefault();
    // }, false);

    // element.addEventListener('touchmove', function(e) {
    //     e.preventDefault();
    // }, false);

    // lockX = window.scrollX;
    // lockY = window.scrollY;

    // function lockIt() {
    //     window.scrollTo(lockX,lockY);
    //     return false;
    // }

    // window.addEventListener("scroll",lockIt,false)

    // return {
    //     stop: function(){
    //         window.removeEventListener("scroll",lockIt,false)
    //     }
    // }
}

// document.addEventListener('ontouchstart', function(e) {
//     document.body.style.overflow = "hidden";
// }, false);

// document.addEventListener('ontouchmove', function(e) {
//     document.body.style.overflow = "auto";
// }, false);

// document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
// document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);

// var locker = lockScroll(); // locks scrolling
// locker.stop();  // unlocks scrolling

// $('#element').on('scroll touchmove mousewheel', function(e){
//   e.preventDefault();
//   e.stopPropagation();
//   return false;
// })


// var trapScroll;

// (function($){
  
//   trapScroll = function(opt){
    
//     var trapElement;
//     var scrollableDist;
//     var trapClassName = 'trapScroll-enabled';
//     var trapSelector = '.trapScroll';
    
//     var trapWheel = function(e){
      
//       if (!$('body').hasClass(trapClassName)) {
        
//         return;
        
//       } else {  
        
//         var curScrollPos = trapElement.scrollTop();
//         var wheelEvent = e.originalEvent;
//         var dY = wheelEvent.deltaY;

//         // only trap events once we've scrolled to the end
//         // or beginning
//         if ((dY>0 && curScrollPos >= scrollableDist) ||
//             (dY<0 && curScrollPos <= 0)) {

//           opt.onScrollEnd();
//           return false;
          
//         }
        
//       }
      
//     }
    
//     $(document)
//       .on('wheel', trapWheel)
//       .on('mouseleave', trapSelector, function(){
        
//         $('body').removeClass(trapClassName);
      
//       })
//       .on('mouseenter', trapSelector, function(){   
      
//         trapElement = $(this);
//         var containerHeight = trapElement.outerHeight();
//         var contentHeight = trapElement[0].scrollHeight; // height of scrollable content
//         scrollableDist = contentHeight - containerHeight;
        
//         if (contentHeight>containerHeight)
//           $('body').addClass(trapClassName); 
      
//       });       
//   }
// })($);

// var preventedCount = 0;
// var showEventPreventedMsg = function(){  
//   $('#mousewheel-prevented').stop().animate({opacity: 1}, 'fast');
// }
// var hideEventPreventedMsg = function(){
//   $('#mousewheel-prevented').stop().animate({opacity: 0}, 'fast');
// }
// var addPreventedCount = function(){
//   $('#prevented-count').html('prevented <small>x</small>' + preventedCount++);
// }

// trapScroll({ onScrollEnd: addPreventedCount });
// $('.trapScroll')
//   .on('mouseenter', showEventPreventedMsg)
//   .on('mouseleave', hideEventPreventedMsg);      
// $('[id*="parent"]').scrollTop(100);

var isJson = function(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
        item = JSON.parse(item);
    }
    catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
