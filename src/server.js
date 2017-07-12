// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// also require paths
const paths = require('../build/js/paths')

// load and register babel to use all the fancy new js stuff
require('babel-register')({
  presets: ['es2015', 'react-app'],
  ignore: paths.nodeModules,
  plugins: [
    ['css-modules-transform', {
      generateScopedName: isProduction ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:5]',
      extensions: ['.css']
    }],
    ['module-resolver', {
      root: [paths.src],
      extensions: ['.js', '.css', '.json']
    }]
  ]
})
require('babel-polyfill')

const express = require('express')
const nunjucks = require('nunjucks')

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

// in development mode also serve static files
// (in production this is a function of nginx)
if (isDevelopment) {
  app.use(express.static(paths.web))
}

// register React rendering
app.use('/', ssr(app))

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
