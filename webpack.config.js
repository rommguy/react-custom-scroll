'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = [{
    entry: ['./src/main/customScroll'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'reactCustomScroll.js',
        library: 'ReactCustomScroll',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'src/main')
            ],
            exclude: /\.rt/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ],
    // devtool: 'source-map',
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'prop-types': 'prop-types',
        lodash: 'lodash'
    }
}, {
    entry: ['./example/main'],
    output: {
        path: path.join(__dirname, 'example'),
        filename: 'example.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js?/,
            include: [path.resolve(__dirname, 'example'), path.resolve(__dirname, 'src')],
            exclude: '*.rt',
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
    devtool: 'source-map',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: '_'
    }
}];