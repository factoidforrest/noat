/*
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');


let browserifyOptions = {entries: './js/main.js', extensions: ['.js'], debug: true}
gulp.task('build', function () {
    return browserify()
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.js', ['build']);
});


gulp.task('default', ['watch']);
    */


const watchify = require('watchify');

const browserify = require('browserify');
const babelify = require('babelify');

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const assign = require('lodash.assign');

let customBrowserifyOpts = {
    entries: ['./views/js/components/index.js'],
    debug: true//process.env.NODE_ENV !== 'production'
};

let browserifyOpts = assign({}, watchify.args, customBrowserifyOpts);

let b = watchify(browserify(browserifyOpts));


bundle = function() {
    return b
        .transform(babelify)
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Stack Threw Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        //.on('error', gutil.log.bind(gutil, 'Uglify I think Threw Error'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./views/public'));
};

gulp.task('js', bundle);

b.on('update', bundle);

b.on('log', gutil.log);

bundle();
