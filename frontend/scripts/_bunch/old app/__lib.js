// TODO: wfloader проверить шрифты по отдельности, назначить обработчики ошибок
var waitForLoading = 0;
var loadCheck = loadChecker();

//--------------------------------------------------------------------------------------------------------------------

// Загрузка необходимых для выполнения скриптов. Удалить если не нужно.
// По загрузке всех нужных штук сработает событие window ready, если в скрипте будет висеть обработчик этого события,
// рекомендуется грузить его здесь во возможных избежание ощибок (вешать обработчик через ev.on);

function loadScript(src, callback) {
	var body = document.getElementsByTagName('body')[0];

	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	script.setAttribute('async', '');

	if (callback) {
		if (script.addEventListener) {
			script.addEventListener('load', callback, false);
		} else {
			script.attachEvent('onreadystatechange', function() {
				if (script.readyState == 'complete' || script.readyState == 'loaded') {
					callback();
				}
			});
		}
	}
	head.appendChild(script);
}

(function () {
	var sriptsToLoad = [];
	var head = document.getElementsByTagName('head')[0];
	var scripts = head.getAttribute('data-scripts');
	if (scripts == null || scripts == '') return;

	scripts = scripts.split(' ');
	for (var i = scripts.length - 1; i >= 0; i--) {
		if (scripts[i] && scripts[i] != '') {
			sriptsToLoad.push('/templates/redcollar/js/' + scripts[i] + '.js');
		}
	};

	// var sriptsToLoad = [
	// 	//перечислить здесь через запятую
	// 	'templates/millservice/js/main.js',
	// 	'templates/millservice/js/text.js'
	// ];

	waitForLoading++;
	var num = sriptsToLoad.length;



	function ckeckScripts() {
		var loaded = 0;
		var check = function() {
			loaded++;
			if (loaded == num) {
				loadCheck();
			}
		}
		return check;
	}
	var check = ckeckScripts();

	for (var i = 0; i < sriptsToLoad.length; i++) {
		loadScript(sriptsToLoad[i], check);
	}

})();

// всякие проверки загрузки--------------------------------------------------------------------------------------------------------------------
function loadChecker() {
	var loaded = 0;
	var check = function() {
		loaded++;
		if (loaded == waitForLoading) {
			externalReady();
		}
	}
	return check;
}

function externalReady() {
	if (IE.version > 8) {
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			allReady();
		} else {
			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function() {
					allReady.call(window);
				}, false);
			} else {
				document.attachEvent('onreadystatechange', function() {
					if (document.readyState == 'complete') {
						allReady.call(window);
					}
				});
			}
		}
	} else {
		if (document.readyState === 'complete') {
			allReady();
		} else {
			ev.on(window, 'load', function() {
				allReady();
			});
		}
	}
}

function allReady() {
	ev.trigger(window, 'allready');
};

//обработчик событий--------------------------------------------------------------------------------------------------------------------
var ev = {
	on: function(container, elem, eventName, handler) {

		var deligate = false;
		if (arguments.length == 3) {
			handler = eventName;
			eventName = elem;
		} else if (arguments.length == 4) {
			var deligate = true;
		}

		if (container.length && container != window) { //да-да, у window бывает lenght
			for (var i = 0; i < container.length; i++) {
				this.on(container[i], eventName, handler)
			};
		} else {
			if (!container._eventHandlers) {
				container._eventHandlers = [eventName];
			}
			if (!container._eventHandlers[eventName]) {
				container._eventHandlers[eventName] = [];
			}

			container._eventHandlers[eventName].push({
				'handler' : handler,
				'deligate': deligate,
				'element' : elem
			});

			if (container['on' + eventName] == null) {
				container['on' + eventName] = handle;
			} else if (container['on' + eventName] != handle) {
				container._eventHandlers[eventName].push({
					'handler' : container['on' + eventName],
					'deligate': false,
					'element' : elem
				});
				container['on' + eventName] = handle;
			}
		}
	},
	off: function(elem, eventName, handler) {
		if (!elem._eventHandlers) return;
		var handlers = elem._eventHandlers[eventName];
		if (!handlers) return;
		for(var i = 0; i < handlers.length; i++) {
			if (handlers[i].handler == handler) {
				handlers.splice(i--, 1);
			}
		}
	},
	trigger: function(elem, eventName) {
		if (!elem._eventHandlers) {
			return;
		} else if (!elem._eventHandlers[eventName]) {
			return;
		} else {
			var handlers = elem._eventHandlers[eventName];
			for (var i = 0; i < handlers.length; i++) {
				handlers[i].handler.apply(elem, [].slice.call(arguments, 1));
			}
		}
	},
	when: function(elem, eventName, handler) {
		if (elem.complete) {
			handler.call(elem);
		} else {
			this.on(elem, eventName, handler);
			if (IE.version < 100) {
				elem.src = elem.src;
			}
		}
	}
};

function fixEvent (event) {
	event.preventDefault = function() {
		this.returnValue = false;
	}
	event.stopPropagation = function() {
		this.cancelBubble = true;
	}
	return event;
}

function handle (event) {
	var elem  = this;

	event = event || window.event;
	if (!event.preventDefault) {
		fixEvent (event)
	}

	eventName = event.type;
	if (!elem._eventHandlers) {
		return;
	} else if (!elem._eventHandlers[eventName]) {
		return;
	} else {	
		var target = event.target || event.srcElement;

		var handlers = elem._eventHandlers[eventName];
		for (var i = 0; i < handlers.length; i++) {
			if (handlers[i].deligate) {
				if (!is(target, handlers[i].element)) {
					return;
				}
				handlers[i].handler.apply(target, [event]);
			} else {
				handlers[i].handler.apply(elem, [event]);
			}
		}
	}
}
//определение ie и его версии (if (IE.version < 8) {console.log('хуево')})--------------------------------------------------------------------------
var IE = {
	version: function(){
		var version = 999;;
		if (navigator.appVersion.indexOf("MSIE") != -1) 
			version = parseFloat(navigator.appVersion.split("MSIE")[1]);
		return version;
	}()
}
//получение элементов--------------------------------------------------------------------------------------------------------------------
function getElements(context, name) {
		if(!context) return false;
		if (name.charAt(0) == '.') {
			name = name.substr(1);
			var elems = document.getElementsByClassName ? context.getElementsByClassName(name) : (function() {
				if (context.querySelectorAll) {
					return context.querySelectorAll('.' + name);
				} else {
					var all = context.getElementsByTagName('*'),
						elements = [];
					for (var i = 0; i < all.length; i++) {
						if (all[i].className && (' ' + all[i].className + ' ').indexOf(' ' + name + ' ') > -1) elements.push(all[i]);
					}
					return elements;
				}
			})();
		} else {
			elems = context.getElementsByTagName(name);
		};
	return elems;
};

function getElement(context, name) {
	if(!context) return false;
	if (name.charAt(0) == '.') {
		name = name.substr(1);
		var elems = document.getElementsByClassName ? context.getElementsByClassName(name)[0] : (function() {
			if (context.querySelector) {
				return context.querySelector('.' + name);
			} else {
				var all = context.getElementsByTagName('*');
				for (var i = 0; i < all.length; i++) {
					if (all[i].className && (' ' + all[i].className + ' ').indexOf(' ' + name + ' ') > -1) {
					 	return all[i];
					}
				}
				return false;
			}
		})();
	} else if (name.charAt(0) == '#') {
		name = name.substr(1);
		return context.getElementById(name);
	} else {
		//console.log(context.getElementsByTagName(name));
		return context.getElementsByTagName(name)[0];
	}
	return elems;
};

//работа с классами и др--------------------------------------------------------------------------------------------------------------------
function is(elem, name) {
	if (name.charAt(0) == '.') {
		className = name.substr(1);
		return elem.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
	} else if (name.charAt(0) == '#') {
		id = name.substr(1);
		return elem.id == id;
	} else {
		tag = name.toUpperCase();
		return elem.tagName == tag;
	}
}
function addClass(elem, className) {
	if (elem) {
		var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
		if (re.test(elem.className)) return elem;
		elem.className = (elem.className + " " + className).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
	}
	return elem;
}
function removeClass(elem, className) {
	if (elem) {
		var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
		if (!re.test(elem.className)) return elem;
		elem.className = elem.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
	}
	return elem;
}
function closest(elem, toFind) {
	var el = elem.parentNode;
	if (is(el, toFind)) {
		return el;
	} else {
		return closest(el, toFind);
	}
}

//аякс--------------------------------------------------------------------------------------------------------------------
var ajax = {};
ajax.x = function() {
	try {
		return new ActiveXObject('Msxml2.XMLHTTP')
	} catch (e1) {
		try {
			return new ActiveXObject('Microsoft.XMLHTTP')
		} catch (e2) {
			return new XMLHttpRequest()
		}
	}
};
ajax.send = function(url, callback, method, data, sync) {
	var x = ajax.x();
	x.open(method, url, sync);
	x.onreadystatechange = function() {
		if (x.readyState == 4) {
			callback(x.responseText)
		}
	};
	if (method == 'POST') {
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	x.send(data)
};
ajax.get = function(url, data, callback, sync) {
	var query = [];
	for (var key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
};
ajax.post = function(url, data, callback, sync) {
	var query = [];
	for (var key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	query.push(encodeURIComponent('action') + '=' + encodeURIComponent('send'));
	ajax.send(url, callback, 'POST', query.join('&'), sync)
};

//оффсет--------------------------------------------------------------------------------------------------------------------
function offset(elem) {
	if (elem.getBoundingClientRect) {
		return getOffsetRect(elem);
	} else {
		return getOffsetSum(elem);
	}
}
function getOffsetSum(elem) {
	var top = 0, left = 0;
	while(elem) {
		top = top + parseInt(elem.offsetTop);
		left = left + parseInt(elem.offsetLeft);
		elem = elem.offsetParent;
	}

	return {top: top, left: left};
}
function getOffsetRect(elem) {
	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docElem = document.documentElement;

	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	var clientTop = docElem.clientTop || body.clientTop || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	var top  = box.top +  scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return { top: Math.round(top), left: Math.round(left) };
}


//определение размеров окна------------------------------------------------------------------------------------------------------
function windowSize() {
	var width = 0, height = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		width = window.innerWidth;
		height = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}
	return {
		height: height,
		width: width
	};
}
// //определение положения прокрутки------------------------------------------------------------------------------------------------------
// function getScroll() {
// 	if(window.pageYOffset != undefined) {
// 		return {
// 			x: pageXOffset,
// 			y: pageYOffset
// 		}
// 	} else {
// 		var sx, sy, d = document, r = d.documentElement, b = d.body;
// 		sx = r.scrollLeft || b.scrollLeft || 0;
// 		sy = r.scrollTop || b.scrollTop || 0;
// 		return {
// 			x: sx,
// 			y: sy
// 		};
// 	}
// }

function next(elem){
	do {
		elem = elem.nextSibling;
	} while (elem && elem.nodeType != 1);
	return elem;
}

function prev(elem){
	do {
		elem = elem.previousSibling;
	} while (elem && elem.nodeType != 1);
	return elem;
}

function getStyle(el, styleProp) {
	if (el.currentStyle)
		var result = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var result = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
	return result;
}

window.imgResizer = function() {
	var imgs = Array.prototype.concat.apply([], document.querySelectorAll('.resize'));
	var conts = [];
	var coefs = [];

	var wait = function(w, h, c, i, add) {

		if (imgs[i].tagName != 'IMG') {
			resizeSingle(w, h, c, i);
		} else {
			ev.when(imgs[i], 'load', function() {
				resizeSingle(w, h, c, i);
			});	
		}
	}

	var resizeSingle = function(w, h, c, i, add) {
		var coef = imgs[i].clientWidth/(imgs[i].clientHeight);
		if (c >= coef) {
			tmp = Math.floor(w/coef);
			imgs[i].style.width = w + 'px';
			imgs[i].style.height = 'auto';
			imgs[i].style.left = '0';
			imgs[i].style.top = Math.floor((h - tmp)/2) + 'px'; //ie не любит дробные значения
		} else {
			tmp = Math.floor(h*coef);
			imgs[i].style.width = 'auto';
			imgs[i].style.height = h + 'px';
			imgs[i].style.top = '0';
			imgs[i].style.left = Math.floor((w - tmp)/2) + 'px';
		}
	}

	var resizeOne = function(img) {
		var w, h, c, tmp;
		var cont = img.parentNode;
		if (is(img, '.moving')) {
			add = 200;
		} else {
			add = 0;
		}
		w = cont.clientWidth;
		h = cont.clientHeight + add;
		c = w/h;

		ev.when(img, 'load', function() {
			var coef = img.clientWidth/(img.clientHeight);
			if (c >= coef) {
				tmp = Math.floor(w/coef);
				if (tmp) {
					img.style.width = w + 'px';
					img.style.height = 'auto';
					img.style.left = '0';
					img.style.top = Math.floor((h - tmp)/2) + 'px'; //ie не любит дробные значения
				}
			} else {
				tmp = Math.floor(h*coef);
				if (tmp) {
					img.style.width = 'auto';
					img.style.height = h + 'px';
					img.style.top = '0';
					img.style.left = Math.floor((w - tmp)/2) + 'px';
				}
			}
		});	
	}

	var resize = function() {
		var add;
		var w, h, c, tmp;
		for (var i = 0; i <= imgs.length - 1; i++) {
			if (is(imgs[i], '.moving')) {
				add = 200;
			} else {
				add = 0;
			}
			w = conts[i].clientWidth;
			h = conts[i].clientHeight + add;
			c = w/h;
			wait(w, h, c, i);
		};
	}

	var init = function() {
		for (var i = 0; i <= imgs.length - 1; i++) {
		 	conts.push(imgs[i].parentNode);
		};
		resize();
	}

	var add = function(el) {
		imgs.push(el);
		conts.push(el.parentNode);
	}

	return {
		'init': init,
		'resize': resize,
		'resizeOne': resizeOne,
		'add': add
	}
}();
