const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '~': path.resolve(__dirname, '../src/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css|scss|sass)$/i,
                exclude: /node_modules/,
                use: [
                    // Bottom to Up
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: "file-loader",
            },
            {
                test: /\.(mp4)$/,
                loader: "file-loader",
            },
            {
                test: /\.(ttf|otf|woff|woff2|eor)$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed),
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'public/index.html',
            hash: true,
            showErrors: true,
            favicon: 'public/favicon.ico',
        }),
        new MiniCssExtractPlugin(),
        new ForkTsCheckerWebpackPlugin(),
    ],
}
