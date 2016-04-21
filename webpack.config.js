'use strict';
var path = require('path');

module.exports = {
    entry: ['./index'],
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
                presets: ['react']
            }
        }]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: 'lodash'
    }
};