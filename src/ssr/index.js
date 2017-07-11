/*
 * SSR
 *
 * Renders React pages on the server.
 *
 * When NODE_ENV=production it will just render React page and provide links to assets.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// load different files depending on context
const assets = require(isProduction ? './assets.prod.js' : './assets.dev.js')

/**
 * Exports middleware that handles server side rendering of React.
 *
 * @param {Express} app Express app.
 *
 * @return {Function}
 */
export default (app) => {
  if (isDevelopment) {
    app.use(assets.webpackMiddleware)
  }

  return (req, res) => {
    const html = renderToString((
      <h1>This is REACT! and its.... {isDevelopment ? 'development' : 'production'}</h1>
    ))

    res.render('index', {
      ...assets.default(),
      html: html
    })
  }
}