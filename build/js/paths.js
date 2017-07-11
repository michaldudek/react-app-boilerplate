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
  dist: resolve('web/dist'),
  templates: resolve('src/templates'),

  // vendor dirs etc
  build: resolve('build/js'),
  nodeModules: resolve('node_modules'),
  packageJson: resolve('package.json'),

  // important files
  indexJs: resolve('src/index.js'),
  webpackConfigFile: resolve('build/js/config'),

  // functions
  resolveWeb: resolveWeb
}
