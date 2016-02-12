'use strict';

// Generally gulp affects front end code
// although it could be used to lint or minify backend code too

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('rimraf');

var config = {
  paths: {
    js: './src/js/**/*.js',
    sass: './src/css/**/*.css',
    html: './src/partials/**/*.html'
  }
};

/*
gulp.task    // define tasks
gulp.src     // source - read (input)
gulp.dest    // destination - write (output)
gulp.watch   // watch files for changes, to run tasks
  *.pipe     // string together actions
*/

// Delete previous build files to prevent accidental leftovers being used
// This includes the folders themselves!!
gulp.task('clean-js', function(cb) {
  rimraf('./public/js', cb);
});
gulp.task('clean-css', function(cb) {
  rimraf('./public/css', cb);
});
gulp.task('clean-html', function(cb) {
  rimraf('./public/partials', cb);
});

// Remove old JS, consolidate javascript files and emit one monolith
gulp.task('js', ['clean-js'], function() {
  return gulp.src(config.paths.js)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

// Remove old CSS, transpile SASS and save results in public folder
gulp.task('css', ['clean-css'], function() {
  return gulp.src(config.paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

// Copy html to destination folders
gulp.task('html', ['clean-html'], function() {
  return gulp.src(config.paths.html)
    .pipe(gulp.dest('./public/partials'));
});

// Rebuild if CSS, JS or HTML changes
gulp.task('watch', function() {
  gulp.watch(config.paths.sass, ['css']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.html, ['html']);
});


gulp.task('build', ['js', 'css', 'html']); // Defines a build task
gulp.task('default', ['build', 'watch']); // what happens if issue: "gulp"
