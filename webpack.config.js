const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const path = require('path');
const validate = require('webpack-validator');


const devServer = require('./webpack.d/devServer');
const setFreeVariable = require('./webpack.d/setFreeVariable');
const minify = require('./webpack.d/minify');
const setupCSS = require('./webpack.d/setupCSS');

const task = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'src/app'),
  styles: path.join(__dirname, 'src/app/styles'),
  build: path.join(__dirname, 'build')
};

const common = {

  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack training'
    })
  ]
};

const config = merge(
  common, {
    devtool: (task === 'dev') ? 'eval-source-map' : 'source-map'
  },
  setupCSS(PATHS.styles),
  (task === 'dist') ? setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ) : {},
  (task === 'dist') ? minify : {},
  devServer({ port: 3000 }));

module.exports = validate(config);