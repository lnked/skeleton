'use strict';

module.exports = function(config) {
    config = config || {};

    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');

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