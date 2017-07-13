/*
 * SSR
 *
 * Renders React pages on the server.
 *
 * When NODE_ENV=production it will just render React page and provide links to assets.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from 'components/App'

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
    app.use(assets.devMiddleware)
  }

  return (req, res) => {
    const routerContext = {}
    const html = renderToString((
      <StaticRouter
        location={req.url}
        context={routerContext}
      >
        <App />
      </StaticRouter>
    ))

    // did react router asked for redirect ?
    if (routerContext.url) {
      res.redirect(301, routerContext.url)
      return
    }

    res.render('index', {
      ...assets.default(),
      html: html
    })
  }
}
