const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = require("./webpack.config.js")

const PORT_WEBPACK_SERVER = process.env.EXPLORER_WEB_PORT || 3001
const HOST_WEBPACK_SERVER = '0.0.0.0'

config.entry.app.unshift(`webpack-dev-server/client?http://${HOST_WEBPACK_SERVER}:${PORT_WEBPACK_SERVER}/`, "webpack/hot/dev-server")

const compiler = webpack(config)
const server = new webpackDevServer(compiler, {
  hot: true,
  noInfo: true,
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
