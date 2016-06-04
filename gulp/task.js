'use strict';

const gulp          = require('gulp');
const folder        = './tasks/';

module.exports = function(name, config, is) {
    config = config || {};
    config.task = name;
    config.is = is;
    
    gulp.task(name, function(callback) {
        let task = require(folder + name).call(this, config);
        return task(callback);
    });
};