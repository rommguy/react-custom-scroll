'use strict';
var path = require('path');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-webpack',
            'karma-sourcemap-loader'
        ],
        files: [
            'tests.webpack.js' //just load this file
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        singleRun: false,
        reporters: ['dots'], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    loader: 'babel-loader',
                    test: /\.js$/,
                    include: [
                        path.resolve(__dirname, 'src/main')
                    ],
                    query: {
                        presets: ['react']
                    }},
                    {test: /\.css$/, loader: 'style-loader!css-loader'}
                ]
            }
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};