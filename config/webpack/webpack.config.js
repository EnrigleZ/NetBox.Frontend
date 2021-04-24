const webpack = require('webpack');
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin'); // 加快加载定位
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const childProcess = require('child_process');
const threadLoader = require('thread-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getEntriesAndHtmls = require('./webpack.html');
const { pages } = require('../pages');

const commitHash = childProcess.execSync('git log -1 HEAD --pretty=format:%H').toString();
const commitMessage = childProcess.execSync('git log -1 HEAD --pretty=format:%s').toString();

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const __cwd = process.cwd();

const jsWorkerPool = {
    workers: 2,
    poolTimeout: 2000,
};
const tsWorkerPool = {
    workers: 2,
    poolTimeout: 2000,
};

const { entries, htmls } = getEntriesAndHtmls(process.env.NODE_ENV);

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(tsWorkerPool, ['ts-loader']);

module.exports = {
    mode: process.env.NODE_ENV,
    entry: entries,
    module: {
        rules: [{
            test: /\.(js|mjs|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'thread-loader',
                options: jsWorkerPool,
            },
                'babel-loader',
            ],
        },
        {
            test: /\.(ts|tsx)?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'thread-loader',
                options: tsWorkerPool,
            },
                'babel-loader',
            {
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                },
            },
            ],
        },
        {
            test: /\.(css|less)$/,
            use: [{
                loader: isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
            },
            ],
        },
        {
            test: /\.less$/,
            use: "less-loader",
        },
        {
            test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: `/static/media/[hash:8].[ext]`,
            },
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: `/static/img/[name].[hash:8].[ext]`,
            },
        },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__cwd, 'src'),
        },
        plugins: [
            // 添加即插即用的功能
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            // 从当前打包更新
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: process.env.NODE_ENV === 'development',
            SITE_PAGES: JSON.stringify(pages.filter(p => !p.isDefaultIndex && !p.hidden)),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: './build',
        }),
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[id].[contenthash:8].css"
        }),
        ...htmls,
    ]
};