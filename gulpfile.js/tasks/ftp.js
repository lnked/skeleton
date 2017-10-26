'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const error = require('../utils/error');

module.exports = function(config) {
    config = config || {};

	return function(callback) {

/*
ftp          = require('vinyl-ftp'), // trasferisce i files @link https://github.com/morris/vinyl-ftp
conn         = ftp.create( {
            host: 'YOURHOST',
            user: 'FTPUSER',
            password: 'FTPPASSWORD',
            parallel: 20 // numero di trasferimenti simultanei
    } );
*/

		return gulp.src(config.app)
			.pipe($.plumber({errorHandler: error}))
			.pipe($.deployFtp(config.cfg))
			.pipe(gulp.dest(config.folder))
			.pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

	};

};

// var gulp = require('gulp');
// var rsync = require('gulp-rsync');

// gulp.task('deploy', function() {
//   return gulp.src('build/**')
//     .pipe(rsync({
//       root: 'build/',
//       hostname: 'example.com',
//       destination: 'path/to/site/'
//     }));
// });

// var gulp = require('gulp');
// var rsync = require('gulp-rsync');

// gulp.task('deploy', function() {
//   gulp.src('build/**')
//     .pipe(rsync({
//       root: 'build/',
//       hostname: 'example.com',
//       destination: 'path/to/site/',
//       archive: true,
//       silent: false,
//       compress: true
//     }));
// });
