module.exports = function(paths_) {
  return {
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: paths_
      }]
    }
  };
}