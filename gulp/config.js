const src = './frontend/';
const app = './public_html/';

module.exports.app  = app;

module.exports.src  = src;

module.exports.tasks = {
    'template': {
        src: [src + 'template/**/*.html', '!' + src + 'template/**/_*.*'],
        app: app
    },

    'scripts': {
        path: src + 'scripts',
        ignore: '!' + src + 'scripts/**/_*.*',
        // formats: {
        //     js: [src + 'scripts/**/*.js', '!' + src + 'scripts/**/_*.*'],
        //     coffee: [src + 'scripts/**/*.coffee', '!' + src + 'scripts/**/_*.*'],
        // },
        // src: [src + 'scripts/**/*.js', src + 'scripts/**/*.coffee', '!' + src + 'scripts/**/_*.*'],
        app: app + 'js'
    },

    'styles': {},
    
    'images': {},
    'fonts': {},
    'json': {},
    'favicon': {},
    'svgstore': {},
    'extras': {},
    'webserver': {},
    'screenshot': {},
    'watch': {}
}