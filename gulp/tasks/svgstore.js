'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const path  = require('path');
const clean = require("../clean.js");
const error = require("../error.js");

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        function fileContents(filePath, file) {
            return file.contents.toString();
        }

        gulp.src(config.file)
            .pipe($.inject(
                gulp.src(config.src)
                    .pipe($.svgmin(function (file) {
                        var prefix = path.basename(file.relative, path.extname(file.relative));
                        return {
                            plugins: [
                                {removeTitle:true},
                                {removeDesc:true},
                                {removeViewBox:true},
                                {removeDoctype:true},
                                {removeMetadata:true},
                                {removeComments:true},
                                {removeUselessDefs:true},
                                {removeXMLProcInst:true},
                                {removeDimensions:true},
                                {cleanupNumericValues: {
                                    floatPrecision: 2
                                }},
                                {cleanupIDs: {
                                    prefix: prefix + '-',
                                    minify: false
                                }},
                                {convertColors: {
                                    names2hex: true,
                                    rgb2hex: true
                                }},
                                {removeUselessStrokeAndFill:false}
                            ]
                        }
                    }))
                    .pipe($.svgstore({ inlineSvg: true })),
                { transform: fileContents }
            ))
            .pipe(gulp.dest(config.path))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));
       
        callback();
    };

};