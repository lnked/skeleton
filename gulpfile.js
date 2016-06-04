'use strict';

const gulp          = require('gulp');
const $             = require('gulp-load-plugins')();
const task          = require("./gulp/task.js");
const config        = require("./gulp/config.js");

let task_name;

let is = {
    build: false,   // short: b
    es2015: false,  // short: e
    react: false,   // short: r
    mail: false,    // short: m
    watch: false,   // short: w
    uncss: false,   // short: u
    server: false,  // short: s
    coffee: false   // short: c
};

if (typeof $.util.env !== 'undefined') {
    let m, env;

    for (env in $.util.env) {
        for (m in is) {
            if (env == m.substr(0, 1)) {
                env = m;
            }
        }

        if (typeof(is[env]) !== 'undefined') {
            is[env] = !is[env];
        }
    }
}

for (task_name in config.tasks) {
    task(task_name, config.tasks[task_name], is);
}

gulp.task('build',
    gulp.parallel('template', 'styles', 'scripts', 'images', 'favicon', 'fonts', 'json', 'extras')
);

gulp.task('default', gulp.series('watch'));