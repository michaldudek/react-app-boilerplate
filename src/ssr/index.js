import React from 'react'
import { renderToString } from 'react-dom/server'

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// load different files depending on context
const assets = require(isProduction ? './assets.prod.js' : './assets.dev.js').default

// const paths = require('../build/js/paths')

// const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpack = require('webpack')
// const webpackConfig = require(paths.webpackConfigFile)

export default () => (req, res) => {
  const html = renderToString((
    <h1>This is REACT! and its.... {isDevelopment ? 'development' : 'production'}</h1>
  ))

  res.render('index', {
    ...assets(),
    html: html
  })
}
