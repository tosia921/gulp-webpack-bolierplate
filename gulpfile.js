const { src, dest, watch, series } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const imagewebp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');
const babel = require('gulp-babel');
var concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


//priettier task

function priettierFormat() {
  return src('src/js/*.js')
  .pipe(prettier({ singleQuote: true }))
  .pipe(dest('src/js'));
}

// Sass gulp.task
function scssTask(){
  return src('src/scss/main.scss', { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }));
}

// JavaScript Task
// function jsTask(){
//   return src('src/js/**/*.js', { sourcemaps: true })
//     .pipe(sourcemaps.init())
//     // .pipe(babel({
//     //         presets: ['@babel/env'],
//     //         plugins: ['@babel/transform-runtime']
//     //     }))
//     .pipe(concat('all.js'))
//     .pipe(terser())
//     .pipe(dest('dist/js', { sourcemaps: '.' }));
// }
 // JS FUNCTION
 gulp.task('jsTask', () => {
  gulp.src('./src/js/model.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/js'));
});

//images
function optimizeImg(){
  return src('src/img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('dist/img'))
}

//webp images
function webpImage(){
  return src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}

//html task
function copyHtml() {
    return src('src/*.html')
        .pipe(dest('dist'))
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: './dist'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('src/*.html' , series(copyHtml, browsersyncReload));
  watch('src/scss/**/*.scss' , series(scssTask, browsersyncReload));
  watch(['src/img/*.{jpg,png}', 'dist/img/*.{jpg,png}'], series(optimizeImg, browsersyncReload));
  watch(['src/js/*.js', 'src/js/*.js'], series(jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
  priettierFormat,
  copyHtml,  
  scssTask,
  jsTask,
  optimizeImg,
  webpImage,
  browsersyncServe,
  watchTask
);