'use strict';

module.exports = function(config) {
    config = config || {};

    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');
    const error         = require("../error.js");
    
    return function(callback) {

        gulp.src(config.app)
            .pipe($.ghpages({branch: 'master'}))
            .pipe($.notify({ message: config.task + ' complete', onLast: true }));

        callback();

    };

};