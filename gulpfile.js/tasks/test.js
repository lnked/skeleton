'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');

module.exports = function(config) {
	config = config || {};

	return function(callback) {

		gulp.src(config.test, {read: false})
			.pipe($.mocha({reporter: 'nyan'}));

		callback();
	};
	
};