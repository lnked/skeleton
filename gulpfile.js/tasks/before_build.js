'use strict';

const gulp      = require('gulp');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        global.is.build = true;
        
        callback();
    };
};