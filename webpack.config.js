const HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  path = require('path'),
  validate = require('webpack-validator');

const devServer = require('./webpack.d/devServer'),
  clean = require('./webpack.d/clean'),
  extractBundle = require('./webpack.d/extractBundle'),
  extractCSS = require('./webpack.d/extractCSS'),
  minify = require('./webpack.d/minify'),
  output = require('./webpack.d/output'),
  setFreeVariable = require('./webpack.d/setFreeVariable'),
  setupCSS = require('./webpack.d/setupCSS');

const pkg = require('./package.json');
const $m = require('./webpack.d/m');

Object.assign($m, {
  PATHS: {
    app: path.join(__dirname, 'src/app'),
    style: path.join(__dirname, 'src/app/styles', 'main.css'),
    build: path.join(__dirname, 'build')
  },
  task: process.env.npm_lifecycle_event,
  vendors: Object.keys(pkg.dependencies)
});

const common = {
  devtool: ($m.task === 'dev') ? 'eval-source-map' : 'source-map',
  entry: {
    app: $m.PATHS.app,
    style: $m.PATHS.style
  },
  output: output(),
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack training'
    })
  ]
};

const config = merge(common,
  clean(),
  devServer({ port: 3000 }),
  extractBundle({
    name: 'vendors',
    entries: $m.vendors
  }),
  minify(),
  extractCSS(),
  setupCSS(),
  setFreeVariable({
    name: 'process.env.NODE_ENV',
    value: 'production'
  }));

module.exports = validate(config);
