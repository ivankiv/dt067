'use strict';

var gulp = require('gulp'),
	 inject = require('gulp-inject'),
	 sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('src/sass/admin-scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/sass/admin-scss/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/sass/admin-scss/*.scss', ['sass']);
});

gulp.task('index', function() {
 gulp.src('index.html')
  .pipe(inject(gulp.src(['./sass/*.css',
   './bower_components/jquery/dist/*.min.js',
    './bower_components/bootstrap/dist/css/*.min.css',
    './bower_components/bootstrap/dist/js/*bootstrap.min.js'], {read: false}), {relative: true}))
  .pipe(gulp.dest(''));
});

// gulp.task('admin', function() {
//  gulp.src(src/index.html')
//   .pipe(inject(gulp.src([
//   	'./bower_components/jquery/dist/*.min.js',
//   	'./app/*js',
//   	'./app/*min.js',
//     './bower_components/bootstrap/dist/css/*.min.css',
//     './bower_components/bootstrap/dist/js/*bootstrap.min.js',
//     './bower_components/angular/*.min.js',
//     './bower_components/angular-route/*.min.js',
//     './bower_components/angular-ui-router/release/*.min.js',
//       './sass/admin-scss/*.css',
//     'app.module.js',
//     'app.config.js',
//     './admin.scss/*.css'], {read: false}), {relative: false}))
//   .pipe(gulp.dest('./views/admin'));
// });

