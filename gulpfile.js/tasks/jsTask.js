function jsTask() {
    const Config = require("../config/paths");
    const { src, dest } = require("gulp");
    const sourcemaps = require("gulp-sourcemaps");
    const plumber = require("gulp-plumber");
    const notify = require("gulp-notify");
    const uglify = require('gulp-uglify');

    return src(Config.srcPaths.js)
      .pipe(sourcemaps.init())
      .pipe(plumber({errorHandler: notify.error}))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(dest(Config.distPaths.js));
  
}
  
exports.jsTask = jsTask;