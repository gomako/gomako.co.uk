
// Load plugins

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    lr    = require('tiny-lr'),
    server = lr(),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass')


// Task to minify css file in the css directory

gulp.task('minify-css', function(){
  gulp.src('./css/i.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
});


// Task that compiles scss files down to good old css

gulp.task('pre-process', function(){
  gulp.src('./sass/i.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass({loadPath: ['./sass/'], style: "compact"}))
          .pipe(prefix())
          .pipe(gulp.dest('./css/'))
          .pipe(livereload(server));
      }));
});

gulp.task('reload-html', function() {
  gulp.src('*.html')
    .pipe(watch(function(files) {
      return files.pipe(livereload(server));
    }));
});

/*
   DEFAULT TASK

 • Process sass and lints outputted css
 • Outputted css is run through autoprefixer
 • Sends updates to any files in directory to browser for
 automatic reloading

*/

gulp.task('default', function(){
  gulp.run('pre-process', 'minify-css');
  server.listen(35729, function (err) {
    gulp.watch(['*.html', './sass/*.scss'], function(event) {
      gulp.run('pre-process', 'minify-css','reload-html');
    });
  });
});