'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const error = require("../error.js");

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        gulp.src(config.app)
            .pipe($.ghPages({
                branch: 'master',
                origin: 'origin'
            }))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};