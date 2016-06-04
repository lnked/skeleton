'use strict';

module.exports = function(config) {
    config = config || {};

    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');
    const path          = require('path');
    const clean         = require("../utils/clean.js");
    const error         = require("../error.js");
    
    return function(callback) {

        function fileContents (filePath, file) {
            return file.contents.toString();
        }

        gulp.src(config.app.file)
            .pipe($.inject(
                gulp.src(config.src)
                .pipe($.svgmin(function (file) {
                    var prefix = path.basename(file.relative, path.extname(file.relative));
                    return {
                        plugins: [
                            {
                                removeTitle: true
                            },
                            {
                                removeDoctype: true
                            },
                            {
                                removeComments: true
                            },
                            {
                                cleanupNumericValues: {
                                    floatPrecision: 2
                                }
                            },
                            {
                                convertColors: {
                                    names2hex: false,
                                    rgb2hex: true
                                }
                            },
                            {
                                cleanupIDs: {
                                    prefix: prefix + '-',
                                    minify: false
                                }
                            }
                        ]
                    }
                }))
                .pipe($.svgstore({ inlineSvg: true })), { transform: fileContents }))
                .pipe(gulp.dest(config.app.path));
       
        callback();
    };

};