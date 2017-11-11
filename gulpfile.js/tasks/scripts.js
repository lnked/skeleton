'use strict';

const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp          = require('gulp');
const path          = require('path');
const es            = require("event-stream");
const clean         = require('../utils/clean');
const error         = require('../utils/error');
const getFolders    = require('../utils/folders');
const bowerFiles    = require('main-bower-files');
const brotli        = require('gulp-brotli');

module.exports = function(config, bower) {
    config = config || {};

    const uglifyConfig = {
        ie8: false,
        mangle: true,
        toplevel: false,
        warnings: false,
        sourceMap: false,
        compress: {
            warnings: false,
            dead_code: true,
            drop_console: true,
            global_defs: {
                DEBUG: false
            }
        },
        output: {
            ast: true,
            code: true
        }
    };

    return function(callback) {
        // Scripts files

        let folders = getFolders(config.path);

        folders.map(function(folder) {

            gulp.src([path.join(config.path, folder, '/*.*'), path.join(config.path, folder, '/**/*.*'), config.ignore])
                .pipe($.plumber({errorHandler: error}))
                .pipe($.debug({'title': config.task}))
                .pipe($.if(!global.is.build, $.sourcemaps.init()))

                .pipe($.if(global.is.lint, $.eslint()))
                .pipe($.if(global.is.lint, $.eslint.format()))
                .pipe($.if(global.is.lint, $.eslint.failAfterError()))

                .pipe($.imports())
                .pipe($.if(/[.]coffee$/, $.coffee()))
                .pipe($.if(/[.]jsx$/ || global.is.react, $.react({ harmony: true, es6module: true })))
                .pipe($.babel({
                    "presets": [
                        ["es2015", { "loose": true, "modules": false }], "stage-0"
                    ]
                }))

                .pipe($.if(!global.is.build, $.sourcemaps.write()))

                .pipe($.concat(folder + '.js'))

                .pipe($.if(!global.is.build, gulp.dest(config.app)))

                .pipe($.rename({suffix: '.min'}))

                .pipe($.if(global.is.build, $.uglify(uglifyConfig)))
                .pipe($.size({title: 'scripts'}))

                .pipe($.if(!global.is.build, $.sourcemaps.write()))

                .pipe($.debug({'title': config.task}))

                .pipe(gulp.dest(config.app))

                .pipe($.if(global.is.build, $.gzip()))
                .pipe($.if(global.is.build, brotli.compress({
                    extension: 'brotli',
                    skipLarger: true,
                    mode: 0,
                    quality: 11,
                    lgblock: 0
                })))
                .pipe($.if(global.is.build, gulp.dest(config.app)))
                .pipe($.if(global.is.build, $.size({title: `${folder}.js.gz`})))

                .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));
        });

        // VENDORS
        const vendorFiles = bowerFiles({
            paths: {
                bowerDirectory: path.resolve(path.dirname(config.path), bower.path),
                bowerrc: bower.config,
                bowerJson: bower.json
            },
            debugging: false,
            checkExistence: true,
            overrides: bower.overrides
        });

        if (vendorFiles.length)
        {
            let exists = false;
            const files = [];

            function _vendorsCallback(files)
            {
                gulp.src(files)
                    .pipe($.filter('**/*.js'))
                    .pipe($.concat('vendors.js'))
                    .pipe($.rename({suffix: '.min'}))
                    .pipe($.if(global.is.build, $.uglify(uglifyConfig)))
                    .pipe($.size({title: 'vendors'}))
                    .pipe(gulp.dest(config.app))

                    .pipe($.if(global.is.build, $.gzip()))
                    .pipe($.if(global.is.build, brotli.compress({
                        extension: 'brotli',
                        skipLarger: true,
                        mode: 0,
                        quality: 11,
                        lgblock: 0
                    })))
                    .pipe($.if(global.is.build, gulp.dest(config.app)))
                    .pipe($.if(global.is.build, $.size({title: 'vendors.js.gz'})))

                    .pipe($.if(global.is.notify, $.notify({ message: 'Bower complete', onLast: true })));
            }

            for (var i = vendorFiles.length - 1; i >= 0; i--)
            {
                const basename = path.basename(vendorFiles[i]);
                const template = basename.split('.');
                const extension = template[template.length - 1];

                if (extension.indexOf(['js']) >= 0)
                {
                    exists = true;
                    files.push(vendorFiles[i]);
                }

                if (i === 0 && exists)
                {
                    _vendorsCallback(files);
                }
            }
        }

        callback();
    };

};
