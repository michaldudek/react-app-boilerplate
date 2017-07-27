import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import * as paths from '../../build/paths'
import webpackConfig from '../../build/webpack.config'

const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: paths.publicPath,
  stats: 'minimal'
})

const list = () => ({
  styles: ['/app.css'],
  scripts: ['/vendors.js', '/app.js']
})

export default list
export {
  list,
  devMiddleware
}
