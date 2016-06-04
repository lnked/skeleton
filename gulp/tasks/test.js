'use strict';

module.exports = function(config) {
	config = config || {};

    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');

	return function(callback) {

		gulp.src(config.test, {read: false})
			.pipe($.mocha({reporter: 'nyan'}));

		callback();
	};
	
};