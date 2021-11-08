function jsTask() {
    const webpack = require('webpack');
    const webpackConfig = "../../webpack.config.js";

      return new Promise((resolve, reject) => {
          webpack(require(webpackConfig), (err, stats) => {
              if (err) {
                  return reject(err);
              }
  
              if (stats.hasErrors()) {
                  return reject(new Error(stats));
              }
              resolve();
          });
      });
  }
  
exports.jsTask = jsTask;