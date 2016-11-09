const webpack = require('webpack');
const $m = require('./m');

module.exports = function (config_) {
  if ($m.task === 'dev') return;

  const env = {};
  env[config_.name] = JSON.stringify(config_.value);
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}
