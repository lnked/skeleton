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