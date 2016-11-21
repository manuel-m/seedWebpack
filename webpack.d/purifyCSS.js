const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const $m = require('./m');

module.exports = function () {
    if ($m.task === 'dev') return;

    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                // `paths` is used to point PurifyCSS to files not
                // visible to Webpack. You can pass glob patterns
                // to it.
                paths: [$m.PATHS.app],
                purifyOptions: {info: true}
            })
        ]
    }

}
