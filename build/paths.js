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
  rootDir: rootDir,
  srcDir: resolve('src'),
  clientDir: resolve('src/client'),
  commonDir: resolve('src/common'),
  serverDir: resolve('src/server'),
  apiDir: resolve('src/server/api'),
  webDir: webDir,
  webDistDir: resolve('web/dist'),
  serverDistDir: resolve('dist'),
  templatesDir: resolve('src/server/templates'),

  // vendor dirs etc
  buildDir: resolve('build'),
  nodeModulesDir: resolve('node_modules'),
  packageJsonFile: resolve('package.json'),

  // public paths
  publicPath: '/',

  // important files
  clientFile: resolve('src/client/index.js'),
  serverFile: resolve('src/server/index.js'),
  serverDistFile: resolve('dist/server.js'),
  webpackConfigFile: resolve('build/webpack.config.js'),

  // functions
  resolveWeb: resolveWeb
}
