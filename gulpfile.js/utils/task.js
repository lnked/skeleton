'use strict';

module.exports = function(name, config, bower) {
    const gulp      = require('gulp');
    const folder    = '../tasks/';

    config = config || {};
    config.task = name;
    
    gulp.task(name, function(callback) {
        let task = require(folder + name).call(this, config, bower);
        return task(callback);
    });
};