const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  })
  config.module.rules.push({
      test: /\.s?css$/,
      use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
    })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
};
