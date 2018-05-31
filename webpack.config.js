const path = require('path')
const assert = require('assert')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const validEnvironments = [
  'development',
  'testing',
  'production',
]
const environment = process.env.NODE_ENV || 'development'

assert(validEnvironments.includes(environment), `Invalid value for NODE_ENV: ${environment}. Valid values are: ${validEnvironments}`)

const production = environment === 'production'
const development = environment === 'development'
const configurationPath = `./env/${environment}.json`

console.log("NODE_ENV: ", environment)
console.log("Configuration Path: ", configurationPath)

const vendor = [
  'history',
  'classnames',
  'isomorphic-fetch',
  'moment',
  'react',
  'react-autocomplete',
  'react-datepicker',
  'react-dom',
  'react-router',
  'react-overlays',
  'react-redux',
  'react-tabs',
  'redux',
  'redux-saga',
];

const extractor = new ExtractTextPlugin("styles.css")

function getPlugins(environment) {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: "meta.js" }),
    extractor,
    new HtmlWebpackPlugin({ title: 'Poet App', template: 'src/index.html' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(environment)
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'), // See Note 1 at the bottom
  ]

  const developmentPlugins = [
    new webpack.HotModuleReplacementPlugin(),
  ]

  const nonDevelopmentPlugins = [
    new CopyWebpackPlugin([
      {
        from: './_redirects',
        to: './_redirects',
        toType: "file",
      },
    ])
  ]

  const environmentSpecificPlugins = environment === 'development'
    ? developmentPlugins
    : nonDevelopmentPlugins

  return [
    ...plugins,
    ...environmentSpecificPlugins,
  ]
}

module.exports = {
  entry: {
    app: [
      './src/bootstrap.ts',
      './src/index.tsx',
      ...(development ? ['webpack-hot-middleware/client'] : [])
    ],
    vendor,
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: "/"
  },

  devtool: production ? '' : 'eval',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    alias: {
      Configuration: path.resolve(configurationPath)
    },
    modules:  [
      path.join(__dirname, "src"),
      "node_modules"
    ],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: production
        ? ['babel-loader', 'awesome-typescript-loader']
        : ['react-hot-loader', 'babel-loader', 'awesome-typescript-loader'] },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, "./src/components/styles")],
              sourceMap: true,
            }
          }
        ]
      },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.svg$/, use: 'file-loader' },
      { test: /\.ico$/, use: 'file-loader?name=[name].[ext]' },
    ],
  },

  plugins: getPlugins(environment)
}

/*
Notes

1.
As suggested by https://github.com/andris9/encoding/blob/c1e3c5f5e10d47bdfcfece14a73ab14cdc9bc361/lib/encoding.js#L5 to avoid WebPack warnings.
See https://github.com/webpack/webpack/issues/196 and https://github.com/andris9/encoding/issues/16#issuecomment-192161073.
The underlying issue probably is poet-js using node-fetch rather than isomorphic-fetch.

 */
