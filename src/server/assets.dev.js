import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import * as paths from '../../build/paths'
import webpackConfig from '../../build/webpack.config'

const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: paths.publicPath,
  stats: 'minimal',
  quiet: true
})

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => null
})

const list = () => ({
  styles: [],
  scripts: ['/vendors.js', '/app.js']
})

export default list
export {
  list,
  devMiddleware,
  hotMiddleware
}
