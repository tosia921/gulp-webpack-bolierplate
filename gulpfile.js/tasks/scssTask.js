function scssTask() {
    const Config = require("../config/paths");
    const { src, dest } = require("gulp");
    const sassGlob = require('gulp-sass-glob');
    const sass = require('gulp-sass')(require('sass'));
    const cssnano = require('cssnano');
    const postcss = require("gulp-postcss");
    const autoprefixer = require('autoprefixer')

    const postcssplugins = [autoprefixer(), cssnano()];

    console.log(Config.srcPaths.scss)
  
    return src(Config.srcPaths.scss, { sourcemaps: true })
        .pipe(sassGlob())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(postcssplugins))
        .pipe(dest(Config.distPaths.scss , { sourcemaps: '.' }));
}
  
exports.scssTask = scssTask;
  