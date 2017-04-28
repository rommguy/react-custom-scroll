'use strict';
var path = require('path');

module.exports = {
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
    // devtool: 'source-map',
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        lodash: 'lodash'
    }
};