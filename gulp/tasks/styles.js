'use strict';

module.exports = function(config) {
    config = config || {};
    
    const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
    const gulp          = require('gulp');
    const clean         = require("../clean.js");
    const error 		= require("../error.js");

    var postcss      = require('gulp-postcss');
    var  = require('autoprefixer');

    const postcss       = require('postcss');

    const svgFallback   = require('postcss-svg-fallback');

    // const rgbaFallback  = require("postcss-color-rgba-fallback");
    // const autoprefixer  = require('autoprefixer');
    // const colormin      = require('postcss-colormin');
    // const cssnano       = require('cssnano');
    // atImport = require("postcss-import")

    return function(callback) {

        console.log("styles")
        
        

        var css = 'h1 {color: rgba(255, 0, 0, 1)}';
        console.log(postcss(colormin()).process(css).css);

        return gulp.src('./src/*.css')
            .pipe($.sourcemaps.init())
            .pipe(
                postcss([
                    require('postcss-mixins')(),
                    require('postcss-import')(),
                    require('postcss-extend')(),
                    require('postcss-autoreset')(),
                    require('postcss-font-magician')({
                        formats: 'local woff2 woff ttf eot svg',
                        foundries: 'google'
                    })
                    require('postcss-csso')(),
                    require('postcss-vmin')(),
                    require('postcss-svg-fallback')({
                        basePath: '',
                        dest: '',
                        fallbackSelector: '.no-svg',
                        disableConvert: false,
                    }),
                    require('postcss-opacity')(),
                    require('postcss-color-rgba-fallback')(),
                    require('postcss-flexboxfixer')(),
                    require('postcss-gradientfixer')(),
                    require('postcss-fixes')(),
                    require('autoprefixer')({ browsers: ['last 2 versions'] }),
                    require('postcss-will-change')(),
                    require('postcss-unnth')({ })
                    require('postcss-discard-empty')(),

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
            )
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./dest'));


        // if (typeof config.is !== 'undefined' || (typeof config.clean !== 'undefined' && config.clean === true))
        // {
        //     clean(config.app, config.is.build);
        // }

        // gulp.src(config.src, {since: gulp.lastRun(config.task)})
        //     .pipe($.plumber({errorHandler: error}))
        //     .pipe(gulp.dest(config.app))
        //     .pipe($.notify({ message: config.task + ' complete', onLast: true }));

        callback();

    };

};