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
        compress: {
            warnings: false,
            dead_code: true,
            drop_console: true,
            global_defs: {
                DEBUG: false
            }
        },
        mangle: true,
        output: {
            ast: true,
            code: true
        },
        sourceMap: false,
        ie8: false,
        toplevel: false,
        warnings: false
    };

    return function(callback) {
        // Scripts files

        let folders = getFolders(config.path);

        folders.map((folder) => {

            gulp.src([path.join(config.path, folder, '/*.*'), path.join(config.path, folder, '/**/*.*'), config.ignore])
                .pipe($.plumber({errorHandler: error}))
                .pipe($.debug({'title': config.task}))
                .pipe($.if(!global.is.build, $.sourcemaps.init()))

                .pipe($.if(global.is.lint, $.eslint()))
                .pipe($.if(global.is.lint, $.eslint.format()))
                .pipe($.if(global.is.lint, $.eslint.failAfterError()))

                .pipe($.sort())

                .pipe($.imports())

                .pipe($.if(/[.]coffee$/, $.coffee()))
                .pipe($.if(/[.]jsx$/ || global.is.react, $.react({ harmony: true, es6module: true })))
                .pipe($.babel())

                .pipe($.if(!global.is.build, $.sourcemaps.write()))

                .pipe($.concat(folder + '.js'))

                .pipe($.if(!global.is.build, gulp.dest(config.app)))

                .pipe($.rename({suffix: '.min'}))

                .pipe($.if((global.is.build || (/[.]jsx$/ || global.is.react)), $.uglify(uglifyConfig)))
                .pipe($.size({title: 'scripts'}))

                .pipe($.if(!global.is.build, $.sourcemaps.write()))

                .pipe($.debug({'title': config.task}))

                .pipe(gulp.dest(config.app))

                // Gzip
                .pipe($.if(global.is.build, $.gzip()))
                .pipe($.if(global.is.build, gulp.dest(config.app)))

                // Brotli
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
        const vendorFiles = bowerFiles(['*.js', '**/*.js'], {
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

            const glob = [];
            const files = [];

            function _vendorsCallback(files)
            {
                gulp.src(files)
                    .pipe($.concat('vendors.js'))
                    .pipe($.rename({suffix: '.min'}))
                    .pipe($.if(global.is.build, $.uglify(uglifyConfig)))
                    .pipe($.size({title: 'vendors'}))
                    .pipe(gulp.dest(config.app))

                    .pipe($.if(global.is.build, $.gzip()))
                    .pipe($.if(global.is.build, brotli.compress({
                        extension: 'br',
                        skipLarger: true,
                        mode: 0,
                        quality: 11,
                        lgblock: 0
                    })))
                    .pipe($.if(global.is.build, gulp.dest(config.app)))
                    .pipe($.if(global.is.build, $.size({title: 'vendors.js.gz'})))

                    .pipe($.if(global.is.notify, $.notify({ message: 'Bower complete', onLast: true })));
            }

            const length = vendorFiles.length - 1;

            for (var i = 0; i <= length; i++)
            {
                const basename = path.basename(vendorFiles[i]);
                const template = basename.split('.');
                const extension = template[template.length - 1];

                if (['js'].indexOf(extension) >= 0)
                {
                    exists = true;

                    if (basename.indexOf('jquery.min.js') >= 0 || basename.indexOf('codemirror.js') >= 0)
                    {
                        glob.push(vendorFiles[i]);
                    }
                    else
                    {
                        files.push(vendorFiles[i]);
                    }
                }

                if (i === length && exists)
                {
                    if (glob.length)
                    {
                        for (var x = glob.length - 1; x >= 0; x--) {
                            files.unshift(glob[x]);

                            if (x === 0)
                            {
                                _vendorsCallback(files);
                            }
                        }
                    }
                    else
                    {
                        _vendorsCallback(files);
                    }
                }
            }
        }

        callback();
    };

};
