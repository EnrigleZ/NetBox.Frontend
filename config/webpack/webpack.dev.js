process.env.NODE_ENV = 'development';

// const webpack = require('webpack');
const merge = require('webpack-merge').merge;
const baseConfig = require('./webpack.config');

module.export = merge(baseConfig)