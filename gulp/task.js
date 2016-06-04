'use strict';

module.exports = function(name, config, is) {
    const gulp          = require('gulp');
    const folder        = './tasks/';

    config = config || {};
    config.task = name;
    config.is = is;
    
    gulp.task(name, function(callback) {
        let task = require(folder + name).call(this, config);
        return task(callback);
    });
};