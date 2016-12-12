// feature.async
// feature.addEventListener
// feature.canvas
// feature.classList
// feature.cors
// feature.contextMenu
// feature.css3Dtransform
// feature.cssTransform
// feature.cssTransition
// feature.defer
// feature.deviceMotion
// feature.deviceOrientation
// feature.geolocation
// feature.historyAPI
// feature.placeholder
// feature.localStorage
// feature.matchMedia
// feature.pictureElement
// feature.querySelectorAll
// feature.remUnit
// feature.serviceWorker
// feature.sizes
// feature.srcset
// feature.svg
// feature.touch
// feature.viewportUnit
// feature.webGL
// feature.testAll();

/*! FEATURE.JS 1.0.0, http://featurejs.com */
;(function(b,c,k){function g(){}var d=c.documentElement,a={create:function(e){return c.createElement(e)},old:!!/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent),pfx:function(){var e=c.createElement("dummy").style,b=["Webkit","Moz","O","ms"],a={};return function(c){if("undefined"===typeof a[c]){var f=c.charAt(0).toUpperCase()+c.substr(1),f=(c+" "+b.join(f+" ")+f).split(" ");a[c]=null;for(var d in f)if(e[f[d]]!==k){a[c]=f[d];break}}return a[c]}}()},l=!(a.old||null===a.pfx("perspective")),m=
!(a.old||null===a.pfx("transformOrigin")),n=null!==a.pfx("transition"),p=!!b.addEventListener,q=!!c.querySelectorAll,r=!!b.matchMedia,t="placeholder"in a.create("input"),h;try{localStorage.setItem("x","x"),localStorage.removeItem("x"),h=!0}catch(e){h=!1}g.prototype={constructor:g,css3Dtransform:l,cssTransform:m,cssTransition:n,addEventListener:p,querySelectorAll:q,matchMedia:r,deviceMotion:"DeviceMotionEvent"in b,deviceOrientation:"DeviceOrientationEvent"in b,contextMenu:"contextMenu"in d&&"HTMLMenuItemElement"in
b,classList:"classList"in d,placeholder:t,localStorage:h,historyAPI:b.history&&"pushState"in b.history,serviceWorker:"serviceWorker"in navigator,viewportUnit:function(e){try{return e.style.width="1vw",""!==e.style.width}catch(a){return!1}}(a.create("dummy")),remUnit:function(a){try{return a.style.width="1rem",""!==a.style.width}catch(b){return!1}}(a.create("dummy")),canvas:function(a){return!(!a.getContext||!a.getContext("2d"))}(a.create("canvas")),svg:!!c.createElementNS&&!!c.createElementNS("http://www.w3.org/2000/svg",
"svg").createSVGRect,webGL:function(a){try{return!(!b.WebGLRenderingContext||!a.getContext("webgl")&&!a.getContext("experimental-webgl"))}catch(c){return!1}}(a.create("canvas")),cors:"XMLHttpRequest"in b&&"withCredentials"in new XMLHttpRequest,touch:!!("ontouchstart"in b||b.navigator&&b.navigator.msPointerEnabled&&b.MSGesture||b.DocumentTouch&&c instanceof DocumentTouch),async:"async"in a.create("script"),defer:"defer"in a.create("script"),geolocation:"geolocation"in navigator,srcset:"srcset"in a.create("img"),
sizes:"sizes"in a.create("img"),pictureElement:"HTMLPictureElement"in b,testAll:function(){var a=" js",b;for(b in this)"testAll"!==b&&"constructor"!==b&&this[b]&&(a+=" "+b);d.className+=a.toLowerCase()}};b.feature=new g})(window,document);