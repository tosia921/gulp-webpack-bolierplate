function clearCacheTask(done) {
    const cache = require("gulp-cache");

    return cache.clearAll(done);
}

exports.clearCacheTask = clearCacheTask;