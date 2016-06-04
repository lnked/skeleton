'use strict';

module.exports = function(config) {
    config = config || {}

    const $             = require('gulp-load-plugins')();
    const gulp          = require('gulp');
    const clean         = require("../clean.js");
    const errorHandler  = require("../errorHandler.js");
    const getFolders    = require("../folders.js");

    const path          = require('path');
    const es            = require("event-stream");

    return function(callback) {
        
        let folders = getFolders(config.path);

        folders.map(function(folder) {

            gulp.src([path.join(config.path, folder, '/**/*.*'), config.ignore])
                .pipe($.plumber({errorHandler: errorHandler}))
                .pipe($.debug({'title': config.taskName}))
                .pipe($.if(!config.is.build, $.sourcemaps.init()))

                .pipe($.if(/[.]coffee$/, $.coffee()))
                
                .pipe($.concat(folder + '.js'))
                
                .pipe($.if(
                    config.is.es2015,
                    $.babel({ presets: ['es2015'] })
                ))

                .pipe($.if(
                    config.is.react,
                    $.react()
                ))

                .pipe($.eslint())
                .pipe($.eslint.format())
                .pipe($.eslint.failAfterError())
                
                .pipe($.if(
                    config.is.build,
                    $.uglify()
                ))
                
                .pipe($.rename({suffix: '.min'}))

                .pipe($.if(!config.is.build, $.sourcemaps.write()))

                .pipe($.debug({'title': config.taskName}))

                .pipe(gulp.dest(config.app))
                .pipe($.notify({ message: config.task + ' complete: ' + folder, onLast: true }));
        });

        callback();

    };

};