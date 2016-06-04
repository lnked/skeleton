'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const clean         = require("../clean.js");
const errorHandler  = require("../errorHandler.js");

module.exports = function(config) {
    config = config || {}

    return function(callback) {

        console.log('favicon')

        callback();

    };

};