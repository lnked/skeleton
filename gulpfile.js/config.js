const src = './frontend/';
const app = './public_html/';
const markup = './';
const mainPage = 'index.html';

module.exports.app  = app;

module.exports.src  = src;

module.exports.tasks = {
    'pug': {
        src: [src + 'template/**/*.pug', '!' + src + 'template/**/*.template', '!' + src + 'template/**/_*.*'],
        app: app + markup
    },

    'template': {
        src: [src + 'template/**/*.html', '!' + src + 'template/**/*.template', '!' + src + 'template/**/_*.*'],
        app: app + markup
    },

    'scripts': {
        gzip: true,
        path: src + 'scripts',
        ignore: '!' + src + 'scripts/**/!_*.*',
        app: app + 'js'
    },

    'styles': {
        gzip: true,
        path: src + 'styles',
        src: [
            src + 'styles/*.scss',
            src + 'styles/**/*.scss',
            '!' + src + 'styles/_*.*',
            '!' + src + 'styles/**/_*.*',
            '!' + src + 'components/**/_*.*'
        ],
        app: app + 'css',
        html: markup,
        browsers: [
            'last 2 version',
            'ie >= 8',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 5',
            'opera >= 12.1',
            'ios >= 6',
            'android >= 2.3',
            'bb >= 10'
        ]
    },

    'images': {
        src: src + 'images/**/*.{gif,svg,png,jpg,jpeg,webp}',
        app: app + 'images'
    },

    'files': {
        src: src + 'files/**/*.*',
        app: app + 'files'
    },

    'video': {
        src: src + 'video/**/*.*',
        app: app + 'video'
    },

    'fonts': {
        src: src + 'fonts/**/*.{woff2,woff,ttf,eot,svg}',
        app: app + 'fonts'
    },

    'misc': {
        src: [src + 'misc/**/.*', src + 'misc/**/*.*'],
        app: app
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

    'before_build': {},
    
    'deploy': {
        app: app + '**/*'
    },
    
    'sync': {
        app: app + '**/*',
        root: app,
        port: 22,
        username: 'root',
        hostname: '',
        destination: ''
    },
    
    'webserver': {
        app: app,
        server: {
            port: 3004,
            notify: false,
            server: {
                baseDir: app,
                index: markup + mainPage
            },
            browser: [
                "google chrome", // "firefox"
            ]
        },
        open: true
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
            template:   [src + 'template/**/*.html', src + 'template/**/_*.*'],
            scripts:    [src + 'scripts/**/*.{js,jsx,coffee}'],
            video:      [src + 'video/**/*.*'],
            files:      [src + 'files/**/*.*'],
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
    
    'sftp': {
        host: 'website.com',
        user: 'johndoe',
        pass: '1234',
        remotePath: '1234',
        remotePlatform: 'unix'
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
        src: mainPage,

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