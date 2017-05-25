'use strict';

const gulp      = require('gulp');
const critical  = require('critical'); // .stream;

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        global.is.build = true;
        
        callback();
    };
};