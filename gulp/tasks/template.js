'use strict';

module.exports = function(config) {
    const $             = require('gulp-load-plugins')();
    const gulp          = require('gulp');
    const include       = require('gulp-file-include');
    const inlineCss     = require("gulp-inline-css");
    const prettify      = require('gulp-html-prettify');
    const clean         = require("../clean.js");
    const errorHandler  = require("../errorHandler.js");
    
    config = config || {}

    return function(callback) {

        gulp.src(config.src)

            .pipe($.plumber({errorHandler: errorHandler}))
            .pipe($.debug({'title': config.task}))

            .pipe(include({
                prefix: '@@',
                basepath: '@file'
            }))

            .pipe($.if(
                config.is.email,
                $.inlineCss({
                    applyStyleTags: true,
                    applyLinkTags: true,
                    removeStyleTags: true,
                    removeLinkTags: true
                })
            ))

            .pipe($.if(
                config.is.build,
                prettify({
                    indent_size: 4,
                    indent_char: ' ',
                    brace_style: 'expand',
                    indent_handlebars: false,
                    indent_inner_html: false,
                    preserve_newlines: false,
                    max_preserve_newlines: 1,
                    unformatted: ['pre', 'code', 'script', 'style']
                })
            ))

            .pipe($.if(
                config.is.watch,
                $.htmlhint({
                    "attr-value-double-quotes": false,
                    "tagname-lowercase": false,
                    "attr-lowercase": false,
                    "doctype-first": false,
                    "id-unique": true,
                    "tag-pair": false,
                    "attr-no-duplication": true,
                    "spec-char-escape": false,
                    "src-not-empty": false
                })
            ))

            .pipe($.if(
                config.is.watch,
                $.htmlhint.reporter()
            ))

            .pipe($.debug({'title': config.task}))

            .pipe(gulp.dest(config.app))

            .pipe($.notify({ message: config.task + ' complete', onLast: true }));

        callback();
    };

};