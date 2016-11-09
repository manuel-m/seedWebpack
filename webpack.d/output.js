const $m = require('./m');

module.exports = function () {
	
  if ($m.task === 'dev') return {
    path: $m.PATHS.build,
    filename: '[name].js'
  };

  return {
    path: $m.PATHS.build,
    filename: '[name].[chunkhash].js',
    // This is used for require.ensure. The setup
    // will work without but this is useful to set.
    chunkFilename: '[chunkhash].js'
  };

}
