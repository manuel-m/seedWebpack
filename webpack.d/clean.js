const CleanWebpackPlugin = require('clean-webpack-plugin'),
  webpack = require('webpack');
const $m = require('./m');

module.exports = function () {
  if ($m.task !== 'dev') return {
    plugins: [
      new CleanWebpackPlugin([$m.PATHS.build], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}
