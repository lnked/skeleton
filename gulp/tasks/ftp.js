'use strict';

module.exports = function(config) {
    config = config || {};

    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');
    const error         = require("../error.js");

	return function(callback) {

		return gulp.src(config.app)
			.pipe($.plumber({errorHandler: error}))
			.pipe($.deployFtp(config.cfg))
			.pipe(gulp.dest(config.folder));
			.pipe($.notify({ message: config.task + ' complete', onLast: true }));

	};

};