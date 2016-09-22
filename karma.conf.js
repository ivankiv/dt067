//Karma configuration

module.exports = function(config) {
    config.set({

        //base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
            "bower_components/angular-breadcrumb/dist/angular-breadcrumb.js",
            "bower_components/angular-messages/angular-messages.js",
            "bower_components/angular-toArrayFilter/toArrayFilter.js",
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.js',
            "src/app/app.module.js",
            'src/app/**/**/*.js'
        ],

        // list of files to exclude
        exclude: [
            'protractor.conf.js', 'e2e_testing/'
        ],

        plugins: ["karma-jasmine", "karma-chrome-launcher", "karma-htmlfile-reporter"],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html'],

        htmlReporter: {
            outputFile: "units.html"
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing
        // any file chnages
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simulationg
        concurrency: Infinity


    })
}
