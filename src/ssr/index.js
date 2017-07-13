/*
 * SSR
 *
 * Renders React pages on the server.
 *
 * When NODE_ENV=production it will just render React page and provide links to assets.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'

import App from 'components/App'
import createStore from 'createStore'

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// load different files depending on context
const assets = require(isProduction ? './assets.prod.js' : './assets.dev.js')

/**
 * Handle incoming request.
 *
 * @param  {Request}  req Request.
 * @param  {Response} res Response.
 */
function handleRequest (req, res) {
  const store = createStore()
  const routerContext = {}

  const html = renderToString((
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={routerContext}
      >
        <App />
      </StaticRouter>
    </Provider>
  ))
  const helmet = Helmet.renderStatic() // this needs to be right after renderToString() to prevent memory leaks

  // did react router asked for redirect ?
  if (routerContext.url) {
    res.redirect(301, routerContext.url)
    return
  }

  res.render('index', {
    ...assets.default(),
    helmet,
    html,
    initialState: store.getState(),
    safeJson: (obj) => JSON.stringify(obj).replace(/[\u2028\u2029]/g, '').replace(/<\/script/g, '</scr\\ipt')
  })
}

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

  return handleRequest
}
