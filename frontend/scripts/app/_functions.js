"use strict";

function __() {try {for(var i=0; i<arguments.length; i++) {console.log(arguments[i]);}}catch (e) {}}

// использование Math.round() даст неравномерное распределение!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var tools = {
    isString: function (obj) {
        return typeof obj === 'string';
    },
    isObject: function (obj) {
        return typeof obj === 'object';
    },
    isNumber: function (obj) {
        return typeof obj === 'number';
    },
    isUndefined: function (value) {
        return typeof value === 'undefined';
    },
    isDefined: function (value) {
        return typeof value !== 'undefined';
    },
    isNull: function (value) {
        return value == null;
    }
};

function csrfy(attributes)
{
    return document.querySelector("meta[name='csrf-token']").getAttribute('content');
}

function lazyLoadImages()
{
    $('img').each(function(){
        $(this).attr('src', $(this).data('src'));
    });
}

// event.type должен быть keypress
function getChar(event)
{
    if (event.which == null) { // IE
        if (event.keyCode < 32) return null; // спец. символ
        return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0) { // все кроме IE
        if (event.which < 32) return null; // спец. символ
        return String.fromCharCode(event.which); // остальные
    }

    return null; // спец. символ
}

function on(elm, events, handler)
{
   if (elm) {
       events.split(' ').forEach(function (event) {
           elm.addEventListener(event, handler);
       });
   }
}

function scrollToElement(element)
{
    if ($(element).length)
    {
        var block;

        if ($(element).closest('.popup').length)
        {
            block = $(element).closest('.popup');
        }
        else {
            block = $(element);
        }

        block.stop().animate({ scrollTop: $(element).position().top }, 'fast');
    }
}

function formatMoney(n, c, d, t)
{
    var c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? '.' : d, 
    t = t == undefined ? ',' : t, 
    s = n < 0 ? '-' : '', 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

function getMax(arr)
{
    return Math.max.apply(Math, arr);
}

function getMin(arr)
{
    return Math.min.apply(Math, arr);
}

function is_null(x)
{
  return x == null;
}

function is_undefined(x)
{
  return typeof(x) == 'undefined';
}

function is_touch_device()
{
    return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 'onmsgesturechange' in window);
}

function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}
// declOfNum(count, ['найдена', 'найдено', 'найдены']);

var shuffle = function( array ) {
  return array.sort( function() {
    return Math.random() - 0.5;
  } );
};

function updateCaptcha(captcha, ev)
{
    ev.preventDefault();

    if ($(captcha).length)
    {
        $(captcha).attr('src', $(captcha).attr('src').split( '?' )[0] + '?v=' + Math.random());
    }

    return !1;
}

// Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.
// Она сработает только один раз через N миллисекунд после последнего вызова.
// Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после
// первого запуска.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Использование
// var myEfficientFn = debounce(function() {
// All the taxing stuff you do
// }, 250);
// window.addEventListener('resize', myEfficientFn);


function once(fn, context) { 
    var result;

    return function() { 
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

// // Пример использования
// var canOnlyFireOnce = once(function() {
//     console.log('Запущено!');
// });

// canOnlyFireOnce(); // "Запущено!"
// canOnlyFireOnce(); // Не запущено


var getAbsoluteUrl = (function() {
    var a;

    return function(url) {
        if(!a) a = document.createElement('a');
        a.href = url;

        return a.href;
    };
})();

// Пример использования
// getAbsoluteUrl('/something');


/**
 * @param {string} s1 Исходная строка
 * @param {string} s2 Сравниваемая строка
 * @param {object} [costs] Веса операций { [replace], [replaceCase], [insert], [remove] }
 * @return {number} Расстояние Левенштейна
 */
function levenshtein(s1, s2, costs) {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}

function trim( str, charlist ) {
    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}
  
// function doOnOrientationChange()
// {
//  switch(window.orientation) 
//  {  
//    case -90:
//    case 90:
//    alert('landscape');
//    break; 
//    default:
//    alert('portrait');
//    break; 
//  }
// }

// window.addEventListener('orientationchange', doOnOrientationChange);

// doOnOrientationChange();


// Smoothly Scroll to page anchors
// var jump = function (e) {
// // Stop the "hard" jump.
// e.preventDefault();
// //Get the target
// var target = $(this).attr("href");
// // Use animated scrolling.  The .stop() prevents scroll queue.
// $('html,body').stop().animate({
//   // Find top-position of target-element and set it as scroll target.
//   scrollTop: $(target).offset().top
//   // Animation Delay:
//   }, 500, function () {
//     // Attach the hash (#jumptarget) to the page url.
//     location.hash = target;
//   });
// }

// // Instantiate this as follows in your document.ready();
// //$(document).ready(function () {
// //$('a[href*=#]').bind("click", jump);
// //return false;
// //});

function sprintf(v) {
  var split = v.toString().split('.'), pad = "00", time = [], x = null;

  for (x in split) {
    time.push(pad.substring(0, 2 - split[x].toString().length) + split[x]);
  }

  return time.join('.');
}

var load = (function() {
  // Function which returns a function: https://davidwalsh.name/javascript-functions
  function _load(tag) {
    return function(url) {
      // This promise will be used by Promise.all to determine success or failure
      return new Promise(function(resolve, reject) {
        var element = document.createElement(tag);
        var parent = 'body';
        var attr = 'src';

        // Important success and error for the promise
        element.onload = function() {
          resolve(url);
        };
        element.onerror = function() {
          reject(url);
        };

        // Need to set different attributes depending on tag type
        switch(tag) {
          case 'script':
            element.async = true;
            break;
          case 'link':
            element.type = 'text/css';
            element.rel = 'stylesheet';
            attr = 'href';
            parent = 'head';
        }

        // Inject into document to kick off loading
        element[attr] = url;
        document[parent].appendChild(element);
      });
    };
  }
  
  return {
    css: _load('link'),
    js: _load('script'),
    img: _load('img')
  }
})();

// Usage:  Load different file types with one callback
Promise.all([
    load.js('lib/highlighter.js'), 
    load.js('lib/main.js'), 
    load.css('lib/highlighter.css'),
    load.img('images/logo.png')
  ]).then(function() {
    console.log('Everything has loaded!');
  }).catch(function() {
    console.log('Oh no, epic failure!');
  });
