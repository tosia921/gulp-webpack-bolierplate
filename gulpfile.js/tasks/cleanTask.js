function cleanTask() {
    const Config = require("../config/paths");
    const del = require('del');

    return del([Config.distPaths.distAll]);
  
}
  
exports.cleanTask = cleanTask;