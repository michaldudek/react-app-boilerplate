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
import createStore from 'store'

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

  render(req.url, store, routerContext)
    .then(({ html, helmet }) => {
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
    })
}

/**
 * Render the application, but wait for any async actions promises to resolve.
 *
 * Resolves with an object with 'html' and 'helmet' keys.
 *
 * @param  {String} url     Request URL.
 * @param  {Redux}  store   Redux store object.
 * @param  {Object} context Router context object.
 *
 * @return {Promise}
 */
function render (url, store, context = {}) {
  const promises = store.getState()._promises || []
  const promisesCount = promises.length

  return Promise.all(promises)
    .then(() => {
      const html = renderToString((
        <Provider store={store}>
          <StaticRouter
            location={url}
            context={context}
          >
            <App />
          </StaticRouter>
        </Provider>
      ))

      // this needs to be right after renderToString() to prevent memory leaks
      const helmet = Helmet.renderStatic()

      // if amount of promises in the store has grown
      // then wait for those new promises to resolve and re-render again
      const newPromises = store.getState()._promises || []
      if (newPromises.length > promisesCount) {
        return render(url, store, context)
      }

      return {
        html,
        helmet
      }
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
    app.use(assets.hotMiddleware)
  }

  return handleRequest
}
