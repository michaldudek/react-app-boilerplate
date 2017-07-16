'use strict'

const fs = require('fs')
const path = require('path')

const rootDir = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(rootDir, relativePath)

const webDir = resolve('web')
const webDirRegEx = new RegExp(`^${webDir}`)
const resolveWeb = (filePath) => filePath.replace(webDirRegEx, '')

module.exports = {
  // main dirs
  root: rootDir,
  src: resolve('src'),
  web: webDir,
  webDist: resolve('web/dist'),
  serverDist: resolve('dist'),
  templates: resolve('src/templates'),

  // vendor dirs etc
  build: resolve('build/js'),
  nodeModules: resolve('node_modules'),
  packageJson: resolve('package.json'),

  // public paths
  publicPath: '/',

  // important files
  indexJs: resolve('src/index.js'),
  serverJs: resolve('src/server.js'),
  serverDistJs: resolve('dist/server.js'),
  webpackConfigFile: resolve('build/js/webpack.config'),

  // functions
  resolveWeb: resolveWeb
}
