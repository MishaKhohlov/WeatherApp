var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  concat = require('gulp-concat'),
  htmlmin = require('gulp-htmlmin'),
  csso = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  stripDebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  browserify = require("browserify"),
  babelify = require("babelify"),
  gutil = require('gulp-util'),
  fileinclude = require('gulp-file-include'),
  source = require('vinyl-source-stream'),
  streamify = require('gulp-streamify'),
  gcmq = require('gulp-group-css-media-queries'),
  libs = 'build/libs/';


gulp.task('es6', function () {
  browserify({debug: true})
    .transform(babelify)
    .require("./build/component/app.js", {entry: true})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('script.min.js'))
    // .pipe(streamify(stripDebug()))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist/script/'));
});

gulp.task('watch', function () {
  gulp.watch('build/component/**/*.js', ['es6']);
  gulp.watch('build/component/**/*.css', ['css']);
  gulp.watch('build/libs/**/*.js', ['libs']);
  gulp.watch('build/libs/**/*.css', ['css_libs']);
  gulp.watch('build/**/*.html', ['html']);
  gulp.watch('builds/img/**/*', ['img']);
});

gulp.task('webserver', function () {
  gulp.src('dist/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('html', function () {
  gulp.src('build/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('img', function () {
  gulp.src('build/img/**/* ')
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('css', function () {
  gulp.src([
    'build/font/**/*.css',
    'build/component/**/*.css'
  ])
    .pipe(concat('style.min.css'))
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist/style/'));
});

gulp.task('css_libs', function () {
  gulp.src('build/libs/**/*.css')
    .pipe(concat('libs.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist/style/'));
});

gulp.task('libs', function () {
  gulp.src([
    libs + 'jquery.js',
    libs + 'jquery-ui.js',
    libs + 'moment.js',
    libs + 'moment-timezone.js',
    libs + 'hammer.min.js',
    libs + 'jquery.hammer.js',
    libs + 'jquery.bxslider.js',
    libs + 'jquery.custom-scroll.js',
    libs + 'jquery.ui.touch-punch.js',
    libs + 'underscore.js',
    libs + 'backbone.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/script/'));
});


gulp.task('default', [
  'html',
  'img',
  'css_libs',
  'css',
  'libs',
  'es6',
  'watch',
  'webserver'
]);
