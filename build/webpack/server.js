/*
 * Webpack Server Config
 *
 * Exports function that builds webpack config for server builds.
 */
const universalWebpackConfig = require('universal-webpack/config')

const paths = require('../paths')
const common = require('./common')

/**
 * Build webpack config for server builds.
 *
 * @param  {Boolean} isProduction Production build?
 * @return {Object}
 */
module.exports = (isProduction) => {
  return universalWebpackConfig.server(
    Object.assign({}, common.config(isProduction), {
      output: {
        // filename: 'server.js',
        // path: paths.serverDistDir,
        // publicPath: '/'
      },
      plugins: common.plugins(isProduction)
    }),
    {
      server: {
        input: paths.serverFile,
        output: paths.serverDistFile
      }
    }
  )
}
