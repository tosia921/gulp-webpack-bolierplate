const gulp = require("gulp");

// INDIVIDUAL TASKS
const Config = require("./config/paths")
const scssTask = require("./tasks/scssTask").scssTask;
const jsTask = require("./tasks/jsTask").jsTask;
const cleanTask = require("./tasks/cleanTask").cleanTask;
const htmlTask = require("./tasks/htmlTask").htmlTask;
const imgTask = require("./tasks/imgTask").imgTask;
const fontsTask = require("./tasks/fontsTask").fontsTask;
const clearCacheTask = require("./tasks/clearCacheTask").clearCacheTask;

// BUILD TASKS
const build = gulp.series(
  cleanTask,
  htmlTask,
  imgTask,
  scssTask,
  jsTask,
  fontsTask
);

// PRODUCTION TASKS
const production = gulp.series(
  cleanTask,
  clearCacheTask,
  htmlTask,
  gulp.parallel(
    scssTask,
    jsTask,
    imgTask,
    fontsTask  
  )
);


// WATCH TASKS
const watch = () => {
  build();

  const browserSync = require("./config/browserSync").browserSync;

  const server = require("browser-sync").create();
  server.init(browserSync);
  
  function browserReload(done) {
    server.reload();
    done();
  }

  gulp.watch(
    "./src/scss/**/*",
    gulp.series(scssTask, browserReload)
  );

  gulp.watch(Config.srcPaths.fonts, gulp.series(fontsTask, browserReload));

  gulp.watch(Config.srcPaths.html, gulp.series(htmlTask, browserReload));
  

  gulp.watch(Config.srcPaths.img, gulp.series(imgTask, browserReload));

  gulp.watch(
    Config.srcPaths.js,
    gulp.series(jsTask, browserReload)
  );
};

// EXPORTED TASKS
exports.scssTask = scssTask;
exports.htmlTask = htmlTask;
exports.imgTask = imgTask;
exports.fontsTask = fontsTask;
exports.jsTask = jsTask;
exports.cleanTask = cleanTask;
exports.clearCacheTask = clearCacheTask;

// Build, Production and Default tasks
exports.build = build;
exports.production = production;
exports.default = watch;
