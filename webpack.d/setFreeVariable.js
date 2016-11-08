const webpack = require('webpack');

module.exports = function(k_, v_) {
  const env = {};
  env[k_] = JSON.stringify(v_);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}