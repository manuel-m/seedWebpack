const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const validate = require('webpack-validator');

const devServer = require('./webpack.d/devServer');
const clean = require('./webpack.d/clean');
const extractBundle = require('./webpack.d/extractBundle');
const extractCSS = require('./webpack.d/extractCSS');
const minify = require('./webpack.d/minify');
const output = require('./webpack.d/output');
const purifyCSS = require('./webpack.d/purifyCSS');
const setFreeVariable = require('./webpack.d/setFreeVariable');
const setupCSS = require('./webpack.d/setupCSS');

const pkg = require('./package.json');
const $m = require('./webpack.d/m');

Object.assign($m, {
    PATHS: {
        app: path.join(__dirname, 'src/app'),
        style: [
            path.join(__dirname, 'node_modules', 'purecss'),
            path.join(__dirname, 'src/app/styles', 'main.css')
        ],
        build: path.join(__dirname, 'build')
    },
    task: process.env.npm_lifecycle_event,
    vendor:Object.keys(pkg.dependencies)
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
    setFreeVariable({
        name: 'process.env.NODE_ENV',
        value: 'production'
    }),
    extractBundle({
        name: 'vendor',
        entries: $m.vendor
    }),
    minify(),
    setupCSS(),
    extractCSS(),
    purifyCSS()
);

module.exports = validate(config);
