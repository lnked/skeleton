'use strict';

require("./gulp/env.js");

const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp          = require('gulp');
const task          = require("./gulp/task.js");
const config        = require("./gulp/config.js");

for (let task_name in config.tasks) {
    task(task_name, config.tasks[task_name]);
}

gulp.task('build',
    gulp.parallel('template', 'styles', 'scripts', 'images', 'favicon', 'fonts', 'json', 'extras')
);

gulp.task('default', gulp.parallel( 'watch', 'webserver' ));