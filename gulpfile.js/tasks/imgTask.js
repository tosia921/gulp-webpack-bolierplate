function imgTask() {
    const Config = require("../config/paths");
    const { src, dest } = require("gulp");
    const imagemin = require("gulp-imagemin");
    const cache = require("gulp-cache");

    return src(Config.srcPaths.img)
      .pipe(
        cache(imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 65, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      ))
      .pipe(dest(Config.distPaths.img));
  }

exports.imgTask = imgTask;