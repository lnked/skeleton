'use strict';

const gulp          = require('gulp');
const task          = require("./gulp/task.js");
const config        = require("./gulp/config.js");
const is            = require("./gulp/env.js");

for (let task_name in config.tasks) {
    task(task_name, config.tasks[task_name], is);
}

gulp.task('build',
    gulp.parallel('template', 'styles', 'scripts', 'images', 'favicon', 'fonts', 'json', 'extras')
);

gulp.task('default', gulp.series('watch'));