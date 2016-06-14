'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        let task;

        for (task in config.tasks) {
            (function(task){
                $.watch(config.tasks[task], gulp.series(task));
            })(task);
        }

        callback();

    };

};