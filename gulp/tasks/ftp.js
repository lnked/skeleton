'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const error = require("../error.js");

module.exports = function(config) {
    config = config || {};

	return function(callback) {

		return gulp.src(config.app)
			.pipe($.plumber({errorHandler: error}))
			.pipe($.deployFtp(config.cfg))
			.pipe(gulp.dest(config.folder))
			.pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

	};

};