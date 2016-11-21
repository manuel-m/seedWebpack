const $m = require('./m');

module.exports = function () {

  if ($m.task !== 'dev') return;

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
