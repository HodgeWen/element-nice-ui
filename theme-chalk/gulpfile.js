'use strict'

const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssmin = require('gulp-cssmin')

function compile() {
  return src(['./src/*.scss', './src/*.css'])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'))
}

exports.build = series(compile, copyfont)
