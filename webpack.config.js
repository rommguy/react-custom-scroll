const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    mode: 'production',
    entry: ['./src/main/customScroll'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'reactCustomScroll.js',
      library: 'ReactCustomScroll',
      libraryTarget: 'umd',
      globalObject: "typeof self !== 'undefined' ? self : this"
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
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: 'rcs-[local]',
                  exportLocalsConvention: 'dashes'
                }
              }
            },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src/main'), 'node_modules']
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({ filename: 'customScroll.css' })
    ],
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types',
      lodash: 'lodash'
    }
  },
  {
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
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: 'rcs-[local]',
                  exportLocalsConvention: 'dashes'
                }
              }
            },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: '_'
    }
  }
]
