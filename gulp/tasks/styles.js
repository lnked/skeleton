'use strict';

module.exports = function(config) {
    config = config || {};
    
    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');
    const clean         = require("../clean.js");
    const error 		= require("../error.js");

    return function(callback) {
        
        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.sourcemaps.init())


            .pipe(
                $.postcss([
                    require('postcss-use')({ resolveFromFile: true, modules: '*' }),
                    require('postcss-mixins'),
                    require('postcss-partial-import'),
                    require('postcss-extend'),
                    require('postcss-include'),
                    require('postcss-nested'),
                    require('postcss-color-function'),
                    require('postcss-simple-vars')({ silent: true }),
                    require('postcss-font-magician')({
                        hosted: '../fonts',
                        formats: 'local woff2 woff ttf eot svg'
                    }),
                    require('cssnext'),
                    require('precss'),
                    require('autoprefixer')({
                        browsers: ["last 2 version", "safari 5", "ie > 7", "opera 12.1", "ios 6", "android 2.3"]
                    }),
                    require('postcss-fixes'),
                    require('postcss-vmin'),
                    require('postcss-opacity'),
                    require('postcss-color-rgba-fallback'),
                    require('postcss-flexboxfixer'),
                    require('postcss-gradientfixer'),
                    require('postcss-will-change'),
                    require('postcss-unnth'),
                    require('postcss-discard-empty'),
                ])
            )

            .pipe($.if(
                config.is.build,
                $.postcss([
                    require('cssnano')({
                        'safe': true,
                        'calc': false,
                        'zindex': false,
                        'autoprefixer': false,
                        'normalizeCharset': true,
                        'convertValues': { length: false },
                        'colormin': true
                    })
                ])
            ))

            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(config.app))
            .pipe($.notify({ message: config.task + ' complete', onLast: true }));

        callback();

    };

};