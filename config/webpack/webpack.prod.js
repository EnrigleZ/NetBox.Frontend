process.env.NODE_ENV = 'production';

const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config');

const prodConfig = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: (chunkData) => {
            const filename = chunkData.chunk.name;
            return `js/${filename}_[contenthash]_host.js`;
        },
        chunkFilename: 'js/[name]_[contenthash].js',
    },
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
        splitChunks: {
            cacheGroups: {
                commons: { // 抽离自己写的公共代码
                    name: "common", // 打包后的文件名，任意命名
                    chunks: 'all',
                    minChunks: 2, //最小引用2次
                    minSize: 0, // 只要超出0字节就生成一个新包
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendors',
                    priority: 10,
                },
            },
        },
    },
});

module.exports = prodConfig;
