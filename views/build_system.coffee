watchify = require('watchify')
browserify = require('browserify')
coffeeify = require 'coffeeify'
gulp = require('gulp')
source = require('vinyl-source-stream')
buffer = require('vinyl-buffer')
gutil = require('gulp-util')
sourcemaps = require('gulp-sourcemaps')
assign = require('lodash.assign')

# add custom browserify options here
customOpts = 
  entries: [ './views/js/main.js' ]
  debug: process.env.NODE_ENV != 'production'
opts = assign({}, watchify.args, customOpts)

b = watchify(browserify(opts))
# add transformations here
# i.e. b.transform(coffeeify);
# output build logs to terminal

b.transform('coffeeify')
#b.external('react')

bundle = ->
  b.bundle().on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init(loadMaps: true))
  .pipe(sourcemaps.write('.'))
  .pipe gulp.dest('./public')

gulp.task 'js', bundle
# so you can run `gulp js` to build the file
b.on 'update', bundle
# on any dep update, runs the bundler
b.on 'log', gutil.log

bundle()
# ---
# generated by js2coffee 2.1.0