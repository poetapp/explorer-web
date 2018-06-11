const path = require('path')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')

module.exports = (baseConfig, env, config) => {
  config.resolve.modules.push(path.join( __dirname , '../src/'));
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    options: {
      transpileOnly:true,
    }
  })
  config.module.rules.push({
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
            includePaths: [path.resolve(__dirname, "../src/components/styles")],
            sourceMap: true,
          }
        }
      ]
    })
  config.plugins.push(new TSDocgenPlugin())
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
