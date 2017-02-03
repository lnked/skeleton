;( function( $ ) {
	"use strict";

	if (!$.app)
	{
		$.app = {};
	}

	$.app.preload = {

		progress: function()
		{

		},

		images: function(arr)
		{
			console.log(arr);

			return !1;
			function cache( s, c )
			{
				var a, g, i, x, p = { i: {}, ac: 0, c: 0 };
				
				for (x in s)
				{
					a = s[x];
					i = new Image();
					i.onload = function () {
						p.c++
					};
					i.src = a;
					p.i[a] = i;
					p.ac++
				}
				
				function l() {
					g = Math.round(p.c * 100 / p.ac);
					if ( g < 100 ) setTimeout(l, 200);
					else typeof c == 'function' ? c() : '';
				}
				
				l();
			}

			// var preload = ["a.gif", "b.gif", "c.gif"];
			// var promises = [];
			// for (var i = 0; i < preload.length; i++) {
			//     (function(url, promise) {
			//         var img = new Image();
			//         img.onload = function() {
			//           promise.resolve();
			//         };
			//         img.src = url;
			//     })(preload[i], promises[i] = $.Deferred());
			// }
			// $.when.apply($, promises).done(function() {
			//   alert("All images ready sir!");
			// });


		}
	};

})(jQuery);

//cache ([ 'images/1.png', 'images/2.jpg', 'images/3.jpg' ], function() { // loaded })

// function preloadimages(arr){
//     var newimages=[], loadedimages=0
//     var postaction=function(){}
//     var arr=(typeof arr!="object")? [arr] : arr
//     function imageloadpost(){
//         loadedimages++
//         if (loadedimages==arr.length){
//             postaction(newimages) //call postaction and pass in newimages array as parameter
//         }
//     }
//     for (var i=0; i<arr.length; i++){
//         newimages[i]=new Image()
//         newimages[i].src=arr[i]
//         newimages[i].onload=function(){
//             imageloadpost()
//         }
//         newimages[i].onerror=function(){
//             imageloadpost()
//         }
//     }
//     return { //return blank object with done() method
//         done:function(f){
//             postaction=f || postaction //remember user defined callback functions to be called when images load
//         }
//     }
// }
 
// preloadimages(['1.gif', '2.gif', '3.gif']).done(function(images){
//  //call back codes, for example:
//  alert(images.length) //alerts 3
//  alert(images[0].src+" "+images[0].width) //alerts '1.gif 220'
// })

// preloadimages(['ed.jpg', 'fei.jpg', 'budapest.gif', 'duck.jpg']).done(function(images){
//     images.sort(function(a,b){
//         return a.width-b.width //sort images by each image's width property, ascending
//     })
//     alert(images[0].src) //alerts the src of the smallest image width wise
// })