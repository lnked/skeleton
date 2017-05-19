'use strict';

module.exports = function(name, config) {
    const folder    = '../tasks/';
    const gulp      = require('gulp');
    const bower     = require('../bower.js').config;

    config = config || {};
    config.task = name;
    
    gulp.task(name, function(callback) {
        let task = require(folder + name).call(this, config, bower);
        return task(callback);
    });
};