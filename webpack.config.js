const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

console.log('Building with WebPack', process.env.NODE_ENV)

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: './index.html',
})

const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: './_redirects',
    to: './_redirects',
    toType: 'file',
  }
])

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          info => ({
            loader: 'css-loader',
            options: {
              ident: 'css-loader',
              modules: true, // false if info.realResource is in node_modules
              importLoaders: 2,
            },
          }),
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
              debug: true,
              root: path.join(__dirname, 'src', 'images'),
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.join(__dirname, 'src', 'styles'),
              ],
              sourceMap: true,
              sourceMapContents: false,
            }
          },
        ]
      },
      {
        test: [/\.svg$/, /\.jpg$/, /\.png/],
        use: 'file-loader',
      },
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    copyWebpackPlugin,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules:  [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  devServer: {
    port: 3001,
    historyApiFallback: {
      index: '/index.html',
      verbose: true,
    },
  }
}