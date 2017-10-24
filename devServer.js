const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require("./webpack.config.js")
const isDockerized = process.env.DOCKER

const PORT_WEBPACK_SERVER = 3000
const HOST_WEBPACK_SERVER = '0.0.0.0'
const PORT_API = 8080
const HOST_API_PROXY = isDockerized ? 'nginx' : HOST_WEBPACK_SERVER

config.entry.app.unshift(`webpack-dev-server/client?http://${HOST_WEBPACK_SERVER}:${PORT_WEBPACK_SERVER}/`, "webpack/hot/dev-server")

const compiler = webpack(config)
const server = new webpackDevServer(compiler, {
  hot: true,
  noInfo: true,
  proxy: {
    '/api': {
      target: `http://${HOST_API_PROXY}:${PORT_API}`,
      secure: false
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
