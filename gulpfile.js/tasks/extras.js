'use strict';

const gulp  = require('gulp');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        console.log('extras')

        callback();

    };

};