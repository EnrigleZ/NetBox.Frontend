process.env.NODE_ENV = 'production';

const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config');

const prodConfig = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer:  [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
});

module.exports = prodConfig;
