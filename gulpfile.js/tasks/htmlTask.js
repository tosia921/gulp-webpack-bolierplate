function htmlTask(){
    const { src, dest } = require("gulp");
    const Config = require("../config/paths");    

    return src(Config.srcPaths.html)
      .pipe(dest(Config.distPaths.html));
}

exports.htmlTask = htmlTask;