import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import * as paths from '../../build/js/paths'

const webpackConfig = require(paths.webpackConfigFile)
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
})

export default () => ({
  styles: ['/app.css'],
  scripts: ['/vendors.js', '/app.js']
})

export {
  devMiddleware
}
