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
        extensions: ['', '.js']
    },
    module: {
        //loaders: [
        //    {
        //        test: /\.js$/,
        //        loaders: ['babel'],
        //        exclude: /node_modules/
        //    }
        //]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: 'lodash'
    }
};