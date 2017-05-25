module.exports.config = {
    json: './bower.json',
    config: './.bowerrc',
    path: 'vendors',
    overrides: {
        "jquery": {
            "main": "dist/jquery.min.js"
        },
        "tingle": {
            "main": [
                "dist/tingle.min.js",
                "dist/tingle.min.css"
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
                "lib/codemirror.js"
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
