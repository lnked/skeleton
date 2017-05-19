'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const path  = require('path');
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');
const bowerFiles    = require('main-bower-files');

module.exports = function(config, bower) {
    config = config || {};

    const AUTOPREFIXER_BROWSERS = config.browsers || [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'ie >= 8',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 5',
        'opera >= 12.1',
        'ios >= 6',
        'android >= 2.3',
        'bb >= 10'
    ];

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

    let processors = {
        watch: [
            require('postcss-for'),
            require('postcss-triangle'),
            require('postcss-conditionals'),
            require('postcss-quantity-queries'),
            require('postcss-font-magician')({
                hosted: '/fonts',
                formats: 'local woff2 woff ttf eot'
            }),
            require('postcss-vmin'),
            require('postcss-opacity'),
            require('postcss-hexrgba'),
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
            require('postcss-discard-comments'),
            require('postcss-emptymediaqueries'),
            require('postcss-flexboxfixer'),
            require('postcss-gradientfixer'),
            require('cssnano')({
                safe: true,
                calc: false,
                zindex: false,
                autoprefixer: false,
                normalizeCharset: true,
                convertValues: { length: false },
                colormin: true
            })
        ]
    };

    return function(callback) {
        // Bower files
        try {
            gulp.src(
                bowerFiles({
                    paths: {
                        bowerDirectory: path.resolve(path.dirname(config.path), bower.path),
                        bowerrc: bower.config,
                        bowerJson: bower.json
                    },
                    debugging: false,
                    checkExistence: true,
                    overrides: bower.overrides
                })
            )
            .pipe($.filter('**/*.css'))
            .pipe($.concat('vendors.css'))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.if(
                global.is.build,
                $.postcss([
                    require('autoprefixer')({
                        browsers: AUTOPREFIXER_BROWSERS
                    })
                ])
            ))
            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: 'Bower complete', onLast: true })));

        } catch(e) {
            console.log(e);
        }

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))            
            .pipe($.if(!global.is.build, $.sourcemaps.init()))

            .pipe($.sassBulkImport())
            
            .pipe($.sass({precision: 10}))
            
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
                $.uncss({
                    timeout : 1000,
                    htmlroot : config.html,
                    html: [ '**/*.html' ]
                })
            ))

            .pipe($.if(
                global.is.build,
                $.postcss([
                    require('autoprefixer')({
                        browsers: AUTOPREFIXER_BROWSERS
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

            .pipe($.if(config.gzip, $.gzip()))

            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};