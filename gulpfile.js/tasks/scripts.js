'use strict';

const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp          = require('gulp');
const path          = require('path');
const es            = require("event-stream");
const clean         = require('../utils/clean');
const error         = require('../utils/error');
const getFolders    = require('../utils/folders');

module.exports = function(config) {
    config = config || {};

    return function(callback) {
        
        let folders = getFolders(config.path);

        folders.map(function(folder) {

            gulp.src([path.join(config.path, folder, '/*.*'), path.join(config.path, folder, '/**/*.*'), config.ignore])
                .pipe($.plumber({errorHandler: error}))
                .pipe($.debug({'title': config.task}))
                .pipe($.if(!global.is.build, $.sourcemaps.init()))

                .pipe($.if(/[.]coffee$/, $.coffee()))
                
                .pipe($.concat(folder + '.js'))

                .pipe($.if(
                    global.is.es2015,
                    $.babel({ presets: ['es2015'] })
                ))

                .pipe($.if(
                    global.is.react,
                    $.react()
                ))

                .pipe($.if(global.is.lint, $.eslint()))
                .pipe($.if(global.is.lint, $.eslint.format()))
                .pipe($.if(global.is.lint, $.eslint.failAfterError()))
                
                .pipe($.rename({suffix: '.min'}))
                
                .pipe($.if(global.is.build, $.uglify()))

                .pipe($.if(!global.is.build, $.sourcemaps.write()))

                .pipe($.debug({'title': config.task}))

                .pipe(gulp.dest(config.app))
                .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));
        });

        callback();

    };

};