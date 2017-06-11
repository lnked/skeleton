module.exports.config = {
    json: './bower.json',
    config: './.bowerrc',
    path: 'vendors',
    overrides: {
        "jquery": {
            "main": "dist/jquery.min.js"
        },
        "history.js": {
            "main": [
                "scripts/bundled/html4+html5/jquery.history.js"
            ]
        },
        "object-fit": {
            "main": [
                "dist/polyfill.object-fit.css",
                "dist/polyfill.object-fit.min.js"
            ]
        },
        "lazyloadxt": {
            "main": [
                "dist/jquery.lazyloadxt.fadein.min.css",
                "dist/jquery.lazyloadxt.extra.min.js"
            ]
        },
        "fancybox": {
            "main": [
                "dist/jquery.fancybox.min.js",
                "dist/jquery.fancybox.min.css"
            ]
        },
        "slick-carousel": {
            "main": [
                "slick/slick.min.js",
                "slick/slick.css"
            ]
        },
        "tingle": {
            "main": [
                "dist/tingle.min.js",
                "dist/tingle.min.css"
            ]
        },
        "a11y.css": {
            "main": [
                "css/a11y-en.css"
            ]
        },
        "dropzone": {
            "main": [
                "dist/min/dropzone.min.js"
            ]
        },
        "bootstrap-datepicker": {
            "main": [
                "dist/js/bootstrap-datepicker.min.js",
                "dist/css/bootstrap-datepicker.min.css",
                "dist/locales/bootstrap-datepicker.ru.min.js"
                // "dist/css/bootstrap-datepicker.standalone.css"
            ]
        },
        "flatpickr": {
            "main": [
                "dist/l10n/ru.js",
                "dist/flatpickr.min.js",
                "dist/flatpickr.min.css",
                "dist/themes/airbnb.css"
            ]
        },
        "moment": {
            "main": [
                "locale/ru.js",
                "min/moment.min.js"
            ]
        },
        "moment-datepicker": {
            "main": [
                "moment-datepicker/moment-datepicker.min.js",
                "moment-datepicker/datepicker2.css"
            ]
        },
        "bootstrap": {
            "main": [
                'dist/js/bootstrap.js',
                'dist/css/*.min.*',
                'dist/fonts/*.*'
            ]
        },
        "photoswipe": {
            "main": [
                "dist/photoswipe.min.js",
                "dist/photoswipe.css"
            ]
        },
        "js-md5": {
            "main": "build/md5.min.js"
        },
        "jquery-sortable": {
            "main": "source/js/jquery-sortable-min.js"
        },
        "chosen": {
            "main": "chosen.jquery.js"
        },
        "clipboard": {
            "main": "dist/clipboard.min.js"
        },
        "axios": {
            "main": "dist/axios.min.js"
        },
        "fine-uploader": {
            "main": "dist/fine-uploader.min.js"
        },
        "nestable": {
            "main": "jquery.nestable.js"
        },
        "pass-gen-js": {
            "main": "PassGenJS.js"
        },
        "nouislider": {
            "main": "distribute/nouislider.min.js"
        },
        "jquery.maskedinput": {
            "main": "dist/jquery.maskedinput.min.js"
        },
        "mousetrap": {
            "main": "mousetrap.min.js"
        },
        "codemirror": {
            "main": [
                "lib/codemirror.css",
                "lib/codemirror.js",

                "addon/search/searchcursor.js",
                "addon/edit/continuelist.js",
                "addon/edit/matchbrackets.js",
                "addon/comment/continuecomment.js",
                "addon/comment/comment.js",
                
                "mode/clike/clike.js",
                
                "mode/markdown/markdown.js",
                "mode/htmlembedded/htmlembedded.js",
                "mode/htmlmixed/htmlmixed.js",

                "mode/php/php.js",
                "mode/nginx/nginx.js",
                "mode/smarty/smarty.js",

                "mode/xml/xml.js",
                "mode/yaml/yaml.js",

                "mode/sql/sql.js",

                "mode/sass/sass.js",
                "mode/css/css.js",

                "mode/scheme/scheme.js",
                "mode/shell/shell.js",

                "mode/javascript/javascript.js",
                "mode/jsx/jsx.js"
            ]
        },
        "codemirror-emmet": {
            "main": [
                "dist/emmet.min.js"
            ]
        },
        "cleave.js": {
            "main": [
                "dist/cleave.min.js",
                "dist/addons/cleave-phone.ru.js"
            ]
        },
        "gsap": {
            "main": [
                "src/minified/TweenLite.min.js",
                "src/minified/TimelineLite.min.js"
            ]
        },
        "svg4everybody": {
            "main": "dist/svg4everybody.min.js"
        },
        "Template7": {
            "main": "dist/template7.min.js"
        },
        "react": {
            "main": [
                "react.min.js",
                "react-dom.min.js"
            ]
        },
        "zepto": {
            "main": "zepto.min.js"
        },
        "store-js": {
            "main": "store.min.js"
        },
        "cookie": {
            "main": "cookie.min.js"
        },
        "reflux": {
            "main": "dist/reflux.min.js"
        }
    }
};
