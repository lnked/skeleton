'use strict';

const $         = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp      = require('gulp');
const svgo      = require('imagemin-svgo');
const gifsicle  = require('imagemin-gifsicle');
const clean     = require('../utils/clean');
const error     = require('../utils/error');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        // clean(config.app, global.is.build);

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.debug({'title': config.task}))
            .pipe($.newer(config.app))

            .pipe($.if(/[.]webp$/, $.webp()))

            // .pipe(
            //     $.if(/[.]svg$/,
            //         $.postcss([
            //             require('postcss-svg-fallback')({
            //                 basePath: '',
            //                 dest: '',
            //                 fallbackSelector: '.no-svg',
            //                 disableConvert: false,
            //             })
            //         ])
            //     )
            // )

            .pipe($.if(
                global.is.build,
                $.imagemin({
                    optimizationLevel: 3,
                    progressive: true,
                    svgoPlugins: [
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
                            prefix: '-',
                            minify: false
                        }},
                        {convertColors: {
                            names2hex: true,
                            rgb2hex: true
                        }},
                        {removeUselessStrokeAndFill:false}
                    ],
                    use: [svgo(), gifsicle({interlaced: true})]
                })
            ))

            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};