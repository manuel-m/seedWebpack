const webpack = require('webpack');
const $m = require('./m');

module.exports = function (config_) {
  if ($m.task === 'dev') return;

  const entry = {};
  entry[config_.name] = config_.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [config_.name, 'manifest']
      })
    ]
  };
}
