'use strict';

module.exports = function(config) {
    config = config || {};

    const gulp  = require('gulp');

    return function(callback) {

        console.log('watch')

        callback();

    };

};