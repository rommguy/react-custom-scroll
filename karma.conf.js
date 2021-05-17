const path = require('path')
const KarmaWebpack = require('karma-webpack')

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    // browsers: ['Chrome'],
    frameworks: ['jasmine'],
    singleRun: false,
    reporters: ['dots'], //report results in this format
    files: [
      { pattern: 'src/test/*.spec.js', watched: false }
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/test/*.spec.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: 'rcs-[local]',
                    exportLocalsConvention: 'dashes'
                  }
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          }
        ]
      },
      resolve: {
        modules: [path.resolve(__dirname, 'src/main'), 'node_modules']
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  })
}
