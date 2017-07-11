import React from 'react'
import { renderToString } from 'react-dom/server'

// const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpack = require('webpack')
// const paths = require('../build/webpack/paths')
// const webpackConfig = require(paths.webpackConfigFile)

export default () => (req, res) => {
  const html = renderToString((
    <h1>This is REACT!</h1>
  ))

  res.render('index', {
    html: html
  })
}
