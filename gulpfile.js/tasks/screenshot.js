'use strict';

const $         = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp      = require('gulp');
const Pageres   = require('pageres');
const clean     = require("../clean");

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        clean(config.app, true);

        let pageres = new Pageres({delay: 2})
                .src(config.url, config.size, { crop: true })
                .dest(config.app);

            pageres.run(function (err) {
                if (global.is.notify) {
                    $.notify({ message: config.task + ' complete', onLast: true })
                }
            });

        callback();
    };
    
};