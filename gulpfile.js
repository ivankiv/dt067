'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();
var args = require('yargs').argv;
var del = require('del');
var runSequence = require('run-sequence');

// ***** development tasks *****

gulp.task('default', function() {
    log('Building development');
    runSequence('clean', 'image', 'copyFonts', 'inject', 'watch');
});

gulp.task('clean', function() {
    var files = config.build + '*';
    clean(files);
});

gulp.task('image', function () {
    gulp.src(config.imgSrc)
        .pipe($.imagemin())
        .pipe(gulp.dest(config.img))
});

gulp.task('copyFonts', function() {
    return gulp.src(config.fontSrc)
        .pipe(gulp.dest(config.font));
});

gulp.task('jshint', function() {
    log('Analyzing js-files with JSHINT and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('concatCSS', function() {
    log('Compiling sass --> css and concating to styles.ccs');
    return gulp
        .src(config.sass)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.plumber())
        .pipe($.concat(config.css))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.build + 'css'));
});

gulp.task('inject', ['concatCSS', 'concatJS'], function() {
    log('Injecting bower"s css-, js- files and app application"s css-, js-files into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp.src(config.index)
        .pipe($.inject(gulp.src([config.cssSrc, config.jsSrc], {read: false}), {relative: true}))
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.build));
});

gulp.task('templateCache', function() {
    log('Creating AngularJS template cache');
    return gulp.src(config.html)
        .pipe($.htmlmin({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('concatJS', ['templateCache'], function() {
    log('Concating application"s js-file');
    return gulp.src([config.alljs[0], config.alljs[2], config.templateCache.src])
        .pipe($.sourcemaps.init())
        .pipe($.plumber())
        .pipe($.angularFilesort())
        .pipe($.concat(config.js))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('watch', function () {
    log("Watching application's css, js");
    $.watch([config.alljs[0], config.alljs[1], config.html, config.sassWatch], $.batch(function (events, done) {
        gulp.start('inject', done);
    }));
});


// ***** production tasks ******

gulp.task('minifyCSS', function() {
    log("Minifing application's css");
    return gulp
        .src(config.sass)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe($.plumber())
        .pipe($.concat(config.optimized.css))
        .pipe($.csso())
        .pipe(gulp.dest(config.build + 'css'));
});

gulp.task('minifyJS', ['templateCache'], function() {
    log("Minifing application's js");
    return gulp.src([config.alljs[0], config.alljs[2], config.templateCache.src])
        .pipe($.sourcemaps.init())
        .pipe($.plumber())
        .pipe($.angularFilesort())
        .pipe($.concat(config.optimized.js))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.build + 'js'));
});

gulp.task('inject-prod', ['minifyCSS', 'minifyJS'], function() {
    log('Injecting bower"s css-, js- files and app application"s minified css-, js-files into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp.src(config.index)
        .pipe($.inject(gulp.src([config.optimized.cssSrc, config.optimized.jsSrc], {read: false}), {relative: true}))
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.build));
});

gulp.task('prod', function() {
    log('Building production');
    runSequence('clean', 'image', 'copyFonts', 'inject-prod');
});

// ***** functions *****

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}