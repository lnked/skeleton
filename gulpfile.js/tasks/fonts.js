'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const path  = require('path');
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');
const bowerFiles    = require('main-bower-files');

module.exports = function(config, bower) {
    config = config || {};

    return function(callback) {

        gulp.src(config.src)
            .pipe($.if(
                !global.is.build,
                $.newer(config.app)
            ))
            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        const vendorFiles = bowerFiles(['*.woff', '**/*.woff', '*.woff2', '**/*.woff2'], {
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
                    .pipe($.if(
                        !global.is.build,
                        $.newer(config.app)
                    ))
                    .pipe(gulp.dest(config.app))
                    .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));
            }

            for (let i = vendorFiles.length - 1; i >= 0; i--)
            {
                const basename = path.basename(vendorFiles[i]);
                const template = basename.split('.');
                const extension = template[template.length - 1];

                if (['woff', 'woff2'].indexOf(extension) >= 0)
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
