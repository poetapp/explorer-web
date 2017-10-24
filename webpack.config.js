const path = require('path')
const assert = require('assert')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const validEnvironments = [
  'development',
  'testing',
  'staging',
  'production',
]
const environment = process.env.NODE_ENV

assert(validEnvironments.includes(environment), `Invalid value for NODE_ENV: ${environment}. Valid values are: ${validEnvironments}`)

const production = environment === 'production'
const development = environment === 'development'
const configurationPath = `./env/${environment}.json`
const redirects = `./_redirects.${environment}`

console.log("NODE_ENV: ", environment)
console.log("Configuration Path: ", configurationPath)
console.log("redirects: ", redirects)

const vendor = [
  'history',
  'bitcore-lib',
  'classnames',
  'isomorphic-fetch',
  'moment',
  'protobufjs',
  'react',
  'react-autocomplete',
  'react-datepicker',
  'react-dom',
  'react-router',
  'react-overlays',
  'react-qr',
  'react-redux',
  'react-tabs',
  'redux',
  'redux-saga',
  'socket.io-client',
  'uuid',
];

const extractor = new ExtractTextPlugin("styles.css")

function getPlugins(environment) {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: "meta.js" }),
    extractor,
    new HtmlWebpackPlugin({ title: 'Poet App', template: 'src/index.html' }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(environment)
      }
    }),
  ]

  const developmentPlugins = [
    new webpack.HotModuleReplacementPlugin(),
  ]

  const nonDevelopmentPlugins = [
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([
      {
        from: redirects,
        to: "./_redirects",
        toType: "file"
      },
    ])
  ]

  return [
    ...plugins,
    ...(environment === 'development' ? developmentPlugins : nonDevelopmentPlugins)
  ]
}

module.exports = {
  entry: {
    app: [
      './src/bootstrap.ts',
      './src/index.tsx',
      ...(development ? 'webpack-hot-middleware/client' : [])
    ],
    vendor
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: "/"
  },

  devtool: production ? '' : 'eval',

  resolve: {
    root: [
      path.resolve('./src/'),
      path.resolve('./node_modules/'),
    ],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    fallback: path.join(__dirname, "node_modules"),
    alias: {
      Configuration: path.resolve(configurationPath)
    }
  },

  resolveLoader: {
    // modulesDirectories: ['node_modules'],
    fallback: path.join(__dirname, 'node_modules')
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: production
        ? ['babel', 'awesome-typescript-loader']
        : ['react-hot', 'babel', 'awesome-typescript-loader'] },
      {
        test: /\.s?css$/, loader: production
        ? extractor.extract(
          'style-loader',
          ['css-loader?-autoprefixer', 'postcss-loader', 'sass-loader']
        )
        : 'style!css?sourceMap&importLoaders=1!postcss!sass?sourceMap'
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },

  postcss: () => {
    return [
      require('autoprefixer')
    ];
  },

  plugins: getPlugins(environment)
};
