const path = require('path');

module.exports = {
  mode: 'production',
  entry: './example/main.js',
  output: {
    filename: 'example.js',
    path: path.resolve(__dirname, 'example/exampleDist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_'
  }
}