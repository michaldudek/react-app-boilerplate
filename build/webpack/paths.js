'use strict'

const fs = require('fs')
const path = require('path')

const rootDir = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(rootDir, relativePath)

module.exports = {
  // main dirs
  rootDir: rootDir,
  src: resolve('src'),
  web: resolve('web'),
  dist: resolve('web/dist'),

  // vendor dirs etc
  webpackConfig: resolve('build/webpack'),
  nodeModules: resolve('node_modules'),
  packageJson: resolve('package.json'),

  // important files
  indexJs: resolve('src/index.js')
}
