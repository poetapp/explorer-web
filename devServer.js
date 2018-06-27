const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const isDockerized = process.env.DOCKER

const config = require("./webpack.config.js")

const PORT_WEBPACK_SERVER = process.env.EXPLORER_WEB_PORT || 3000
const HOST_WEBPACK_SERVER = '0.0.0.0'
const PORT_API = 3000
const HOST_API_PROXY = isDockerized ? 'nginx' : HOST_WEBPACK_SERVER

config.entry.app.unshift(`webpack-dev-server/client?http://${HOST_WEBPACK_SERVER}:${PORT_WEBPACK_SERVER}/`, "webpack/hot/dev-server")

const compiler = webpack(config)
const server = new webpackDevServer(compiler, {
  hot: true,
  noInfo: true,
  proxy: {
    '/api': {
      target: 'http://0.0.0.0:3000',
      secure: false,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  historyApiFallback: {
    index: 'index.html'
  }
})

server.listen(PORT_WEBPACK_SERVER, HOST_WEBPACK_SERVER, function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://${HOST_WEBPACK_SERVER}:${PORT_WEBPACK_SERVER}`)
})
