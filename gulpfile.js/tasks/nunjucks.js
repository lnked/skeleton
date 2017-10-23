'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        $.nunjucksRender.nunjucks.configure({
            watch: global.is.watch,
            trimBlocks: true,
            lstripBlocks: false
        });

        gulp.src(config.src)

            .pipe($.plumber({errorHandler: error}))
            .pipe($.debug({'title': config.task}))

            .pipe($.if(global.is.watch, $.changed(config.app)))

            .pipe($.frontMatter({ property: 'data' }))

            .pipe($.nunjucksRender({
                path: [ config.path ],
                PRODUCTION: global.is.build
            }))

            .pipe($.if(
                global.is.build,
                $.prettify({
                    eol: "\n",
                    indent_size: 4,
                    indent_level: 0,
                    indent_char: ' ',
                    wrap_attributes: 'auto', // 'force'
                    preserve_newlines: true,
                    end_with_newline: true,
                    brace_style: 'expand',
                    indent_handlebars: false,
                    indent_inner_html: false,
                    max_preserve_newlines: 1,
                    unformatted: ['pre', 'code', 'script', 'style']
                })
            ))

            .pipe($.if(
                global.is.watch,
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
                global.is.htmlmin,
                $.htmlmin({
                    minifyJS: true,
                    minifyCSS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    removeOptionalTags: true,
                    processConditionalComments: true
                })
            ))

            .pipe($.if(
                global.is.watch,
                $.htmlhint.reporter()
            ))

            .pipe($.debug({'title': config.task}))

            .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))

            .pipe(gulp.dest(config.app))

            .pipe($.if(
                global.is.notify,
                $.notify({
                    message: config.task + ' complete',
                    onLast: true
                })
            ));

        callback();
    };
};
