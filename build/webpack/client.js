/*
 * Webpack Client Config
 *
 * Exports function that builds webpack config for client builds.
 */
const fs = require('fs')
const webpack = require('webpack')

const paths = require('../paths')
const common = require('./common')

const packageJson = JSON.parse(fs.readFileSync(paths.packageJsonFile))

/**
 * Build webpack config for client builds.
 *
 * @param  {Boolean} isProduction Production build?
 * @return {Object}
 */
module.exports = (isProduction) => {
  const plugins = common.plugins(isProduction).concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      }
    })
  ])

  if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }))
  }

  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  const config = Object.assign({}, common.config(isProduction), {
    devtool: isProduction ? 'nosources-source-map' : 'cheap-eval-source-map',
    entry: {
      vendors: Object.keys(packageJson.dependencies),
      app: [paths.clientFile]
    },
    output: {
      filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js',
      path: paths.webDistDir,
      publicPath: paths.publicPath
    },
    plugins: plugins
  })

  // enable hot module reload in development
  if (!isProduction) {
    config.entry.app.unshift('react-hot-loader/patch')
    config.entry.app.push('webpack-hot-middleware/client')
  }

  return config
}
