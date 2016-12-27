'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        gulp.src(config.app)
            .pipe($.rsync({
                root: config.root,
                port: config.port,
                username: config.username,
                hostname: config.hostname,
                destination: config.destination,
                relative: false,
                silent: false
            }));

        callback();

    };

};