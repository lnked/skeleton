'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const path  = require('path');
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');
const bowerFiles    = require('main-bower-files');

module.exports = function(config) {
    config = config || {};
    console.log('config: ', config);

    return function(callback) {

        callback();
    };
};
