'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');
const posthtmlAttrsSorter = require('posthtml-attrs-sorter');

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

            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))

            .pipe($.if(global.is.watch, $.changed(config.app)))

            .pipe($.frontMatter({ property: 'data' }))

            .pipe($.nunjucksRender({
                PRODUCTION: global.is.build,
                path: [ config.path ],
                envOptions: {
                    watch: global.is.watch
                }
            }))

            .pipe($.if(
                global.is.build,
                $.prettify({
                    indent_size: 4,
                    // indent_level: 0,
                    indent_char: ' ',
                    brace_style: 'expand',
                    end_with_newline: true,
                    preserve_newlines: true,
                    indent_handlebars: true,
                    indent_inner_html: true,
                    max_preserve_newlines: 1,
                    unformatted: ['pre', 'code', 'textarea', 'script']
                })
            ))

            .pipe($.if(
                global.is.build,
                $.posthtml([
                    posthtmlAttrsSorter({
                        order: [
                            "class",
                            "id",
                            "name",
                            "data",
                            "ng",
                            "src",
                            "for",
                            "type",
                            "href",
                            "values",
                            "title",
                            "alt",
                            "role",
                            "aria"
                        ]
                    })
                ], { })
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
