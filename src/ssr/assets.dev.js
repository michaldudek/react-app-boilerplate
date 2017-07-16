import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import * as paths from '../../build/js/paths'
import webpackConfig from '../../build/js/webpack.config'

const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: paths.publicPath
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
