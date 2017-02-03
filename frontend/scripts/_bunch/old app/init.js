$(document).ready(function() {
    $.app.init();
});

// basket.require(
//     { url: 'require.js' },
//     { url: 'require.config.js', skipCache: true },
//     { url: 'libs.js' }
// );

// basket.require(
//     { url: 'require.js' },
//     { url: 'require.config.js', skipCache: true },
//     { url: 'libs.js' }
// );

// basket
//     .require({ url: 'missing.js' })
//     .then(function () {
//         // Success
//     }, function (error) {
//         // There was an error fetching the script
//         console.log(error);
//     });

//     basket.require({ url: 'jquery-2.0.0.min.js', key: 'jquery' });

// basket.require({ url: 'jquery.min.js', expire: 2 })
// basket.require({ url: 'jquery.min.js', execute: false });

// // fetch and cache the file
// basket.require({ url: 'jquery.min.js' });
// // fetch and cache again
// basket.require({ url: 'jquery.min.js', unique: 123 });


// var whiteCSS = 'body { background-color: white; }';
// var blackCSS = 'body { background-color: black; }';
// var duration = 1000;
// var stopped = false;
// var css = null;
// var intervalId = null;
// function start(node) {
//     css = css === whiteCSS ? blackCSS : whiteCSS;
//     stylesheet.replaceStyleSheet(node, css, function (err, style) {
//         if (err) {
//             alert(err); // For IE8. I don't like it but this should never happen.
//         } else {
//             if (!stopped) {
//                 setTimeout(function () {
//                     start(style);
//                 }, duration);
//             }
//         }
//     });
// }
// function stop() {
//     stopped = true;
// }
// start();

// stylesheet.ignoreKB262161 = false; // Toggle this for different results.
//         var TOO_MANY_STYLES = 100;
//         var css = 'body { background-color: grey }';
//         var callbacks = [];
//         var x;
//         for (x = 0; x < TOO_MANY_STYLES; x++) {
//             callbacks.push(async.apply(stylesheet.appendStyleSheet, css));
//         }
//         async.parallel(callbacks, function(err, styles) {
//             if (err) {
//                 alert(err);
//             } else {
//                 alert('Successfully created ' + styles.length);
//             }
//         });
