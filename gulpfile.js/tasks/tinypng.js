'use strict';

const $		= require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp	= require('gulp');
const error	= require('../utils/error');

module.exports = function(config) {
	config = config || {};

	return function(callback) {

		gulp.src(config.src)
			.pipe($.plumber({errorHandler: error}))
			.pipe($.debug({title: config.task}))
            .pipe($.newer(config.app))

			.pipe($.tinypngCompress({
				key: config.token,
				sigFile: 'images/.tinypng-sigs',
				log: true
			}))

			.pipe($.debug({title: config.task}))
			.pipe(gulp.dest(config.app))
			.pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

		callback();
	};

};