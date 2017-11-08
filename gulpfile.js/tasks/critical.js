'use strict';

const gulp      = require('gulp');
const critical  = require('critical'); // .stream;

module.exports = function(config) {
    config = config || {};

	return function(callback) {

		setTimeout(function(){
			critical.generate(config.critical);
		}, 1500);

        // var gulp = require('gulp');
        // var gutil = require('gulp-util');
        // var critical = require('critical').stream;

        // // Generate & Inline Critical-path CSS
        // gulp.task('critical', function () {
        //     return gulp.src('dist/*.html')
        //         .pipe(critical({base: 'dist/', inline: true, css: ['dist/styles/components.css','dist/styles/main.css']}))
        //         .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        //         .pipe(gulp.dest('dist'));
        // });

        // https://github.com/addyosmani/critical

        // critical.generate({
        //     base: 'test/',
        //     src: 'index.html',
        //     dest: 'styles/main.css',
        //     width: 1300,
        //     height: 900
        // });

        // critical.generate({
        //     base: 'test/',
        //     src: 'index.html',
        //     dest: 'styles/styles.min.css',
        //     minify: true,
        //     width: 1300,
        //     height: 900
        // });

        // critical.generate({
        //     inline: true,
        //     base: 'test/',
        //     src: 'index.html',
        //     dest: 'index-critical.html',
        //     minify: true,
        //     width: 1300,
        //     height: 900
        // });

        // critical.generate({
        //     base: 'test/',
        //     src: 'index.html',
        //     width: 1300,
        //     height: 900
        // }, function (err, output) {
        //     // You now have critical-path CSS
        //     // Works with and without dest specified
        //     ...
        // });

        // critical.generate({
        //     base: 'test/',
        //     src: 'index.html',
        //     width: 1300,
        //     height: 900
        // }).then(function (output) {
        //     // You now have critical-path CSS
        //     // Works with and without dest specified
        //     ...
        // }).error(function (err) {
        //     ...
        // });

        // critical.generate({
        //     base: 'test/',
        //     src: 'index.html',
        //     dest: 'styles/main.css',
        //     dimensions: [{
        //         height: 200,
        //         width: 500
        //     }, {
        //         height: 900,
        //         width: 1200
        //     }]
        // });

        // critical.generate({
        //     base: 'test/',
        //     src: 'index.html',
        //     dest: 'styles/main.css',
        //     ignore: ['@font-face',/url\(/]
        // });

        // critical.generate({
        //     // Inline the generated critical-path CSS
        //     // - true generates HTML
        //     // - false generates CSS
        //     inline: true,

        //     // Your base directory
        //     base: 'dist/',

        //     // HTML source
        //     html: '<html>...</html>',

        //     // HTML source file
        //     src: 'index.html',

        //     // Your CSS Files (optional)
        //     css: ['dist/styles/main.css'],

        //     // Viewport width
        //     width: 1300,

        //     // Viewport height
        //     height: 900,

        //     // Target for final HTML output.
        //     // use some CSS file when the inline option is not set
        //     dest: 'index-critical.html',

        //     // Minify critical-path CSS when inlining
        //     minify: true,

        //     // Extract inlined styles from referenced stylesheets
        //     extract: true,

        //     // Complete Timeout for Operation
        //     timeout: 30000,

        //     // Prefix for asset directory
        //     pathPrefix: '/MySubfolderDocrot',

        //     // ignore CSS rules
        //     ignore: ['font-face',/some-regexp/],

        //     // overwrite default options
        //     ignoreOptions: {}
        // });

		callback();
	};
};
