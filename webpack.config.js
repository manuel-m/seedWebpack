const HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  path = require('path'),
  validate = require('webpack-validator');

const devServer = require('./webpack.d/devServer'),
  extractBundle = require('./webpack.d/extractBundle'),
  minify = require('./webpack.d/minify'),
  setFreeVariable = require('./webpack.d/setFreeVariable'),
  setupCSS = require('./webpack.d/setupCSS');

const pkg = require('./package.json');
const $m = require('./webpack.d/m');

Object.assign($m, {
  PATHS: {
    app: path.join(__dirname, 'src/app'),
    styles: path.join(__dirname, 'src/app/styles'),
    build: path.join(__dirname, 'build')
  },
  task: process.env.npm_lifecycle_event,
  vendors: Object.keys(pkg.dependencies)
});

const common = {
  devtool: ($m.task === 'dev') ? 'eval-source-map' : 'source-map',
  entry: {
    app: $m.PATHS.app
  },
  output: {
    path: $m.PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack training'
    })
  ]
};

const config = merge(
  common,
  devServer({ port: 3000 }),
  extractBundle({
    name: 'vendors',
    entries: $m.vendors
      // entries: ['react']
  }),
  minify(),
  setupCSS($m.PATHS.styles),
  setFreeVariable({
    name: 'process.env.NODE_ENV',
    value: 'production'
  }));

module.exports = validate(config);
