'use strict';

module.exports = function(config) {
	config = config || {};

	const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
	const gulp 			= require('gulp');
	const tinypng		= require('gulp-tinypng-compress');
	const clean 		= require("../utils/clean.js");
	const error 		= require("../error.js");
	
	return function(callback) {

		return gulp.src(config.src, {since: gulp.lastRun(config.task)})
			.pipe($.plumber({errorHandler: error}))
			.pipe($.debug({title: config.task}))

			.pipe(tinypng({
				key: config.token,
				sigFile: 'images/.tinypng-sigs',
				log: true
			}))

			.pipe($.debug({title: config.task}))
			.pipe(gulp.dest(config.app))
			
			.pipe($.notify({ message: config.task + ' complete', onLast: true }));

		callback();
	};

};