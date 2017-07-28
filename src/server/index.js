import express from 'express'
import nunjucks from 'nunjucks'
import detect from 'detect-port-alt'
import openBrowser from 'opn'

import api from './api'
import ssr from './ssr'

import paths from '../../build/paths'

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// initiate express app and configure it
const app = express()
nunjucks.configure(paths.templatesDir, {
  // we're gonna be rendering proper HTML so can't escape it (React should take care of this anyway)
  autoescape: false,
  express: app
})
app.set('view engine', 'html')

// register API middlewares under /api endpoints
app.use('/api', api())

// in development mode also serve static files
// (in production this is a function of nginx)
if (isDevelopment) {
  app.use(express.static(paths.webDir))
}

// register React rendering and start the server once it's ready to handle requests
app.use('/', ssr(app, startServer))

/**
 * Start the server.
 */
function startServer () {
  const started = () => {
    const url = `http://localhost:${app.server.address().port}/`
    console.log(`Listening on ${url}`)

    if (isDevelopment) {
      openBrowser(url)
    }
  }

  // detect available port in development mode
  // otherwise stick to 3000 and fail to run if smth's wrong
  // because nginx will proxy to 3000 regardless
  if (isDevelopment) {
    detect(3000).then((port) => {
      app.server = app.listen(port, started)
    })
  } else {
    app.server = app.listen(3000, started)
  }
}
