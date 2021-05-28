process.env.NODE_ENV = 'development';

const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');
const ENV = require('../env');

console.log(ENV);

const devConfig = merge(baseConfig, {
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: './build',
        progress: true,
        historyApiFallback: true, // 可以直接加载子页面，不会404
        proxy: {
            '/api': {
                target: ENV.API_PROXY,
            }
        }
    }
})

module.exports = devConfig;
