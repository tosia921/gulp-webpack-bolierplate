function fontsTask(){
    const { src, dest } = require("gulp");
    const fontmin = require('gulp-fontmin');
    const Config = require("../config/paths"); 

    return src(Config.srcPaths.fonts)
      .pipe(fontmin())
      .pipe(dest(Config.distPaths.fonts));
}

exports.fontsTask = fontsTask;