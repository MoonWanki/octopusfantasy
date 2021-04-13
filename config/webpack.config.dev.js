const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.[hash].js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        overlay: true,
        open: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
});
