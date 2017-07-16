import express from 'express'
import nunjucks from 'nunjucks'

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

// register React rendering
app.use('/', ssr(app))

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
