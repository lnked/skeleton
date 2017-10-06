'use strict';

const $         = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp      = require('gulp');
const svgo      = require('imagemin-svgo');
const gifsicle  = require('imagemin-gifsicle');
const clean     = require('../utils/clean');
const error     = require('../utils/error');

const imageminWebp = require('imagemin-webp');
const imageminGuetzli = require('imagemin-guetzli');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        // clean(config.app, global.is.build);

        if (config.webp) {
            gulp.src(config.src)

                .pipe($.if(/\.jpg/, $.webp({
                    quality: 60
                })))

                .pipe(gulp.dest(config.app));    
        }

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.debug({'title': config.task}))
            .pipe($.newer(config.app))

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
                $.cache($.imagemin({
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true,
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
                    use: [
                        svgo(),
                        gifsicle({
                            interlaced: true
                        }),
                        imageminWebp({
                            quality: 60,
                        }),
                        imageminGuetzli({
                            quality: 60
                        })
                    ]
                })
            )))

            .pipe(gulp.dest(config.app));

        callback();

    };

};