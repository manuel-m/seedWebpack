const ExtractTextPlugin = require('extract-text-webpack-plugin');
const $m = require('./m');

module.exports = function () {
    if ($m.task === 'dev') return;

    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        'style', 'css'),
                    include: $m.PATHS.styles
                }
            ]
        },
        plugins: [
            // Output extracted CSS to a file
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    };

}
