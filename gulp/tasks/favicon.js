'use strict';

const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp          = require('gulp');
const clean         = require("../clean.js");
const error         = require("../error.js");

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        gulp.src(config.src)
            .pipe($.if(
                !global.is.build,
                $.newer(config.app)
            ))
            .pipe(gulp.dest(config.app));
            
        callback();

    };

};