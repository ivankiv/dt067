module.exports = function() {

    var client = './src/';
    var clientApp = client + 'app/';
    var build = './build/';

    var config = {

        /*** file path ****/
        build: build,
        alljs: ['./src/**/*.js', './*.js', '!./src/**/*.spec.js'],
        sass: client + 'sass/styles.scss',
        sassWatch: client + 'sass/**/*scss',
        index: client + 'index.html',
        html: clientApp + '**/*.html',

        /*** not optimized files ***/
        css: 'styles.css',
        cssSrc: build + 'css/styles.css',
        js: 'app.js',
        jsSrc: build + 'js/app.js',
        img: build + 'img/',
        imgSrc: client + 'img/**/*.*',
        fontSrc: client + 'fonts/**/*.*',
        font: build + 'fonts/',

        //** optimized files **//
        optimized: {
            js: 'app.min.js',
            jsSrc: build + 'js/app.min.js',
            css: 'styles.min.css',
            cssSrc: build + 'css/styles.min.css'
        },

        /*** Bower locations ***/
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /*** template cache ***/
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'
            },
            src: build + 'js/templates.js'
        }

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};