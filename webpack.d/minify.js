const webpack = require('webpack');
const $m = require('./m');

module.exports = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true
                }
            })
        ]
    };
}
