const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
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
  config.resolve.extensions.push('.ts', '.tsx')
  return config
};
