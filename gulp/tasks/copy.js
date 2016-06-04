'use strict';

module.exports = function(config) {
    config = config || {};

    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');
    const clean         = require("../clean.js");
    const error         = require("../error.js");
    
    return function(callback) {
        // clean(config.app, config.is.build);

        gulp.src(config.src, {since: gulp.lastRun(config.task)})
            .pipe($.plumber({errorHandler: error}))
            .pipe(gulp.dest(config.app))
            .pipe($.notify({ message: config.task + ' complete', onLast: true }));

        callback();
    };

};