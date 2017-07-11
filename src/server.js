// load and register babel to use all the fancy new js stuff
require('babel-register')({
  'presets': ['es2015', 'react-app']
})
require('babel-polyfill')

const express = require('express')
const nunjucks = require('nunjucks')

const paths = require('../build/js/paths')

const api = require('./api').default
const ssr = require('./ssr').default

// initiate express app and configure it
const app = express()
nunjucks.configure(paths.templates, {
  // we're gonna be rendering proper HTML so can't escape it (React should take care of this anyway)
  autoescape: false,
  express: app
})
app.set('view engine', 'html')

// register API middlewares under /api endpoints
app.use('/api', api())

// register React rendering
app.use('/', ssr(app))

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
