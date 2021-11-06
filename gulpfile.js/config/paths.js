const srcPaths = {
    scss: "./src/scss/main.scss",
    js: "./src/js/**/*.js",
    img: "./src/img/**/*.+(png|jpg|jpeg|gif|svg)",
    html: "./src/**/*.html",
    fonts: "./src/fonts/**/*",
    js: "./src/js/**/*.js",
}
const distPaths = {
    distAll: "./dist/**/*",
    scss: "./dist/css",
    html: "./dist/",
    img: "./dist/img",
    fonts: "./dist/fonts",
    js: "./dist/js",
}

module.exports = {
    srcPaths,
    distPaths
  }