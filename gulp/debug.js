'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');

module.exports = function(name, path, config) {
    config = config || {};
    config.name = name;
    
    gulp.task(name, function(callback) {
        let task = require(path).call(this, config);
        return task(callback);
    });
};
