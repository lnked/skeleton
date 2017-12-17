'use strict';

/**
 * CELEBRO.CMS (https://celebro.ru)
 * @copyright Copyright (c) CELEBRO lab. (https://celebro.ru)
 * @license http://celebro.ru/license.txt
 * https://github.com/lnked/skeleton
 */

require("./utils/env.js");

const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp          = require('gulp');
const task          = require("./utils/task.js");
const config        = require("./config.js");

let bower = [];

if (config.tasks.bower) {
    bower = config.tasks.bower;
}

for (let task_name in config.tasks) {
    task(task_name, config.tasks[task_name], bower);
}

gulp.task('build',
    gulp.series(
        'before_build',
        gulp.parallel('template', 'scripts', 'images', 'favicon', 'fonts', 'json', 'misc', 'vendors'),
        'styles' //,
        // 'serviceWorker'
    )
);

gulp.task('default', gulp.parallel( 'watch', 'webserver' ));
