'use strict';

const $         = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp      = require('gulp');
const imagemin  = require('gulp-imagemin');
const svgo      = require('imagemin-svgo');
const gifsicle  = require('imagemin-gifsicle');
const clean     = require('../utils/clean');
const error     = require('../utils/error');

const imageminWebp = require('imagemin-webp');
const imageminOptipng = require('imagemin-optipng');
const imageminGuetzli = require('imagemin-guetzli');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        // clean(config.app, global.is.build);

        if (config.webp) {
            gulp.src(config.webp)

                .pipe($.webp({ quality: 60 }))

                .pipe(
                    imagemin([
                        imageminWebp({ quality: 60 }),
                        imageminGuetzli({ quality: 60 })
                    ])
                )

                .pipe(gulp.dest(config.app));
        }

        gulp.src(config.src)

            .pipe($.plumber({errorHandler: error}))
            .pipe($.debug({'title': config.task}))

            .pipe($.newer(config.app))

            .pipe($.cache(
                imagemin([
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.jpegtran({progressive: true}),
                    imagemin.optipng({optimizationLevel: 5}, { use: imageminOptipng() }),
                    imagemin.svgo({
                        plugins: [
                            {removeTitle:true},
                            {removeDesc:true},
                            {removeViewBox:false},
                            {removeDoctype:true},
                            {removeMetadata:true},
                            {removeComments:true},
                            {removeUselessDefs:true},
                            {removeXMLProcInst:true},
                            {removeDimensions:true},
                            {cleanupNumericValues: {
                                floatPrecision: 2
                            }},
                            {cleanupIDs:true},
                            {convertColors: {
                                names2hex: true,
                                rgb2hex: true
                            }},
                            {removeUselessStrokeAndFill:false}
                        ]
                    })
                ], { verbose: true })
            ))

            .pipe(gulp.dest(config.app))

            .pipe($.if(/[.]svg$/,
                $.svg2z({
                    level: 9
                })
            ))

            .pipe(gulp.dest(config.app));

        callback();

    };

};
