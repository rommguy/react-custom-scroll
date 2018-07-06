const path = require('path')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [{
  mode: 'production',
  entry: ['./src/main/customScroll'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'reactCustomScroll.js',
    library: 'ReactCustomScroll',
    libraryTarget: 'umd'
  },
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src/main"), "node_modules"]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ExtractTextPlugin('customScroll.css')
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'prop-types': 'prop-types',
    lodash: 'lodash'
  }
}, {
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
}]