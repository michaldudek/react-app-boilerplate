/*
 * Webpack Client Config
 *
 * Exports function that builds webpack config for client builds.
 */
const webpack = require('webpack')

const paths = require('../paths')
const common = require('./common')

/**
 * Build webpack config for client builds.
 *
 * @param  {Boolean} isProduction Production build?
 * @return {Object}
 */
module.exports = (isProduction) => {
  return Object.assign({}, common.config(isProduction), {
    entry: {
      vendors: [
        'prop-types',
        'react',
        'react-dom',
        'react-helmet',
        'react-redux',
        'react-router-dom',
        'redux'
      ],
      app: [paths.clientFile]
    },
    output: {
      filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js',
      path: paths.webDistDir,
      publicPath: paths.publicPath
    },
    plugins: common.plugins(isProduction).concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors'
      })
    ])
  })
}
