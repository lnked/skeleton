'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const path  = require('path');
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');
const brotli        = require('gulp-brotli');
const mqpacker      = require('css-mqpacker');
const bowerFiles    = require('main-bower-files');

module.exports = function(config, bower) {
    config = config || {};

    let stylelintConfig = {
        "rules": {
            "color-no-invalid-hex": true,
            "declaration-colon-space-after": "always",
            "declaration-colon-space-before": "never",
            "function-comma-space-after": "always",
            "media-feature-colon-space-after": "always",
            "media-feature-colon-space-before": "never",
            "media-feature-name-no-vendor-prefix": true,
            "max-empty-lines": 5,
            "number-leading-zero": "never",
            "selector-list-comma-space-before": "never",
            "selector-no-id": true,
            "number-no-trailing-zeros": true,
            "property-no-vendor-prefix": true,
            "value-no-vendor-prefix": true
        }
    };

    function isMax(mq) {
        return /max-width/.test(mq);
    }

    function isMin(mq) {
        return /min-width/.test(mq);
    }

    function sortMediaQueries(a, b) {
        let A = a.replace(/\D/g, '');
        let B = b.replace(/\D/g, '');

        if (isMax(a) && isMax(b)) {
            return B - A;
        } else if (isMin(a) && isMin(b)) {
            return A - B;
        } else if (isMax(a) && isMin(b)) {
            return 1;
        } else if (isMin(a) && isMax(b)) {
            return -1;
        }

        return 1;
    }

    let processors = {
        watch: [
            require('postcss-for'),
            require('postcss-position'),
            require('postcss-triangle'),
            require('postcss-selector-not'),
            require('postcss-custom-media'),
            require('postcss-media-minmax'),
            require('postcss-conditionals'),
            require('postcss-mq-keyframes'),
            require('postcss-quantity-queries'),
            require('postcss-font-magician')({
                hosted: '/fonts',
                formats: 'local woff2 woff ttf eot'
            }),
            require('postcss-vmin'),
            require('postcss-opacity'),
            require('postcss-hexrgba'),
            require('postcss-reduce-idents'),
            require('postcss-minify-font-values'),
            require('postcss-color-rgba-fallback'),
            require('postcss-reporter')({
                clearMessages: true,
                throwError: true
            })
        ],
        modules: [
            require('postcss-modules')({
                scopeBehaviour: 'global',
                getJSON: function(cssFileName, json) {
                  var cssName       = path.basename(cssFileName, '.scss');
                  var jsonFileName  = path.resolve(config.app + cssName + '.json');
                  fs.writeFileSync(jsonFileName, JSON.stringify(json));
                }
            })
        ],
        pretty: [
            require('perfectionist')({
                cascade: false,
                colorCase: 'lower',
                colorShorthand: true,
                format: 'expanded',
                indentChar: ' ',
                indentSize: 4,
                trimLeadingZero: false,
                trimTrailingZeros: true,
                zeroLengthNoUnit: true
            }),
            require('postcss-sorting')({
                "sort-order": "default",
                "empty-lines-between-children-rules": 0,
                "empty-lines-between-media-rules": 0,
                "preserve-empty-lines-between-children-rules": false
            })
        ],
        lint: [
            require('stylelint')(stylelintConfig),
            require('postcss-reporter')({
                clearMessages: true,
                throwError: true
            })
        ],
        build: [
            require('postcss-will-change-transition'),
            require('postcss-will-change'),
            require('postcss-critical-css'),
            require('postcss-discard-comments'),
            require('postcss-emptymediaqueries'),
            require('postcss-flexboxfixer'),
            require('postcss-gradientfixer'),
            require('lost'),
            mqpacker({
                sort: sortMediaQueries
            }),
            require('cssnano')({
                safe: true,
                calc: false,
                zindex: false,
                autoprefixer: false,
                normalizeCharset: true,
                convertValues: { length: false },
                colormin: true,
                discardUnused: {
                    fontFace: false
                }
            })
        ]
    };

    const scriptsPath = config.scripts.replace(/^|\/$/g, '');
    const templatePath = config.template.replace(/^|\/$/g, '');

    const uncssPath = [
        `${scriptsPath}/*.js`,
        `${scriptsPath}/**/*.js`,
        `${templatePath}/*.html`,
        `${templatePath}/**/*.html`
    ];

    return function(callback) {

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.if(!global.is.build, $.sourcemaps.init()))

            .pipe($.sassBulkImport())

            .pipe($.sass({
                outputStyle: global.is.build ? 'compact' : 'expanded', // nested, expanded, compact, compressed
                precision: 10
            }))

            .pipe($.pixrem())

            .pipe($.postcss(
                [
                    require('postcss-use')({ resolveFromFile: true, modules: '*' }),
                ]
            ))

            .pipe($.postcss(processors.watch))

            .pipe($.if(
                global.is.modules,
                $.postcss(processors.modules)
            ))

            .pipe($.if(
                global.is.uncss,
                $.purifycss(uncssPath)
            ))

            // .pipe($.if(
            //     global.is.uncss,
            //     $.uncss({
            //         timeout : 1000,
            //         htmlroot : config.html,
            //         html: [ '**/*.html' ]
            //     })
            // ))

            .pipe($.if(
                global.is.build,
                $.postcss([
                    require('autoprefixer')({
                        cascade: false
                    })
                ])
            ))

            .pipe($.if(
                global.is.pretty,
                $.postcss(processors.pretty)
            ))

            .pipe($.if(
                global.is.lint,
                $.postcss(processors.lint)
            ))

            .pipe($.if(!global.is.build, gulp.dest(config.app)))

            .pipe($.rename({suffix: '.min'}))

            .pipe($.if(global.is.build, $.groupCssMediaQueries()))
            .pipe($.if(global.is.build, $.postcss(processors.build)))

            .pipe($.size({title: 'styles'}))

            .pipe($.if(!global.is.build, $.sourcemaps.write()))

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
            .pipe($.if(global.is.build, $.size({title: `${config.task}.css.gz`})))

            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        // VENDORS
        const vendorFiles = bowerFiles(['*.css', '**/*.css'], {
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
                    .pipe($.concat('vendors.css'))
                    .pipe($.rename({suffix: '.min'}))

                    .pipe($.if(
                        global.is.uncss,
                        $.purifycss(uncssPath)
                    ))

                    .pipe($.if(
                        global.is.build,
                        $.postcss([
                            require('autoprefixer')({
                                cascade: false
                            })
                        ])
                    ))

                    .pipe($.if(global.is.build, $.groupCssMediaQueries()))
                    .pipe($.if(global.is.build, $.postcss(processors.build)))
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
                    .pipe($.if(global.is.build, $.size({title: 'vendors.css.gz'})))

                    .pipe($.if(global.is.notify, $.notify({ message: 'Bower complete', onLast: true })));
            }

            for (let i = vendorFiles.length - 1; i >= 0; i--)
            {
                const basename = path.basename(vendorFiles[i]);
                const template = basename.split('.');
                const extension = template[template.length - 1];

                if (['sass', 'scss', 'css'].indexOf(extension) >= 0)
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
