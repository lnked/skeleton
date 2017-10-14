'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        // delete require.cache[require.resolve('../../../' + config.pagelist)]

        // var pages = require('../../../' + config.pagelist);
        
        // return gulp
        //     .src(__dirname + '/index.html')
        //     .pipe($.consolidate('lodash', {
        //         pages: pages
        //     }))
        //     .pipe(gulp.dest(config.app));

        // gulp.task('list-pages:watch', function() {
        //     gulp.watch(config.src.root+'/*', ['list-pages']);
        // });

        // gulp.src(config.src)
        //     .pipe($.if(
        //         !global.is.build,
        //         $.newer(config.app)
        //     ))
        //     .pipe(gulp.dest(config.app))
        //     .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));
            
        callback();

    };

};