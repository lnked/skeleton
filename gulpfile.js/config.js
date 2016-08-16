const src = './frontend/';
const app = './public_html/';
const markup = 'markup';

module.exports.app  = app;

module.exports.src  = src;

module.exports.tasks = {
    'template': {
        src: [src + 'template/**/*.html', '!' + src + 'template/**/*.mustache', '!' + src + 'template/**/*.template', '!' + src + 'template/**/*.tpl', '!' + src + 'template/**/_*.*'],
        app: app + markup
    },

    'scripts': {
        path: src + 'scripts',
        ignore: '!' + src + 'scripts/**/!_*.*',
        app: app + 'js'
    },

    'styles': {
        path: [src + 'styles'],
        src: [src + 'styles/*.scss', src + 'styles/**/*.scss', '!' + src + 'styles/_*.*', '!' + src + 'styles/**/_*.*'],
        app: app + 'css'
    },
    
    'images': {
        src: src + 'images/**/*.{gif,svg,png,jpg,jpeg,webp}',
        app: app + 'images'
    },

    'fonts': {
        src: src + 'fonts/**/*.{woff2,woff,ttf,eot,svg}',
        app: app + 'fonts'
    },
    
    'json': {
        src: src + 'json/**/*.*',
        app: app + 'json'
    },

    'favicon': {
        src: src + 'favicon/**/*.*',
        app: app + 'favicon'
    },
    
    'svgstore': {
        src: src + 'svgstore/**/*.svg',
        path: src + 'template/components/',
        file: src + 'template/components/_svgstore.html'
    },

    'sprite': {
        image: '../images/sprite.png',
        style: '_sprite.scss'
    },

    'extras': {},
    
    'before_build': {},
    
    'deploy': {
        app: app + '/**/*'
    },
    
    'webserver': {
        app: app,
        server: {
            port: 3004,
            server: {
                baseDir: app,
                index: 'index.html'
            },
            browser: [
                "google chrome", // "firefox"
            ]
        }
    },
    
    'screenshot': [
        '320x480',
        '480x320',

        '320x568',
        '568x320',

        '375x627',
        '627x375',

        '414x736',
        '736x414',

        '600x960',
        '960x600',

        '768x1024',
        '1024x768',

        '1280x1024', 

        '1920x1080'
    ],
    
    'watch': {
        tasks: {
            template:   [src + 'template/*.html', src + 'template/**/*.html', src + 'template/**/**/*.html', src + 'template/**/_*.*'],
            scripts:    [src + 'scripts/**/*.{js,coffee}'],
            images:     [src + 'images/**/*.*'],
            favicon:    [src + 'favicon/**/*.*'],
            fonts:      [src + 'fonts/**/*.*'],
            json:       [src + 'json/**/*.json'],
            styles:     [src + 'styles/**/*.css', src + 'styles/**/*.scss'],
            svgstore:   [src + 'svgstore/**/*.svg']
        }
    },

    'ftp': {
        user: "username",
        password: 'password',
        port: 'ftp server port',
        host: 'ftp server host',
        uploadPath: 'target path'
    },

    'tinypng': ['eGm6p86Xxr4aQ3H7SvfoogEUKOwgBQc3'],

    'critical': {
        // Inline the generated critical-path CSS 
        // - true generates HTML 
        // - false generates CSS 
        inline: false,

        // Your base directory 
        base: app,

        // HTML source file 
        src: 'index.html',

        // Your CSS Files (optional) 
        css: [app + 'css/main.min.css'],

        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 1200,
            height: 900
        }],

        // Target for final HTML output. 
        // use some css file when the inline option is not set 
        dest: app + 'css/critical.css',

        // Minify critical-path CSS when inlining 
        minify: true,

        // Extract inlined styles from referenced stylesheets 
        extract: true,

        // ignore css rules 
        ignore: ['font-face'],

        // overwrite default options 
        ignoreOptions: {}
    }
}