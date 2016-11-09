const $m = require('./m');

module.exports = function() {
  return {
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: $m.PATHS.styles
      }]
    }
  };
}