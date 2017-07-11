/*
 * SSR
 *
 * Renders React pages on the server.
 *
 * When NODE_ENV=production it will just render React page and provide links to assets.
 *
 * In development it serves as a webpack dev server and still supports SSR of React.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// load different files depending on context
const assets = require(isProduction ? './assets.prod.js' : './assets.dev.js').default

/**
 * Exports middleware that handles server side rendering of React.
 *
 * @return {Function}
 */
export default () => (req, res) => {
  const html = renderToString((
    <h1>This is REACT! and its.... {isDevelopment ? 'development' : 'production'}</h1>
  ))

  res.render('index', {
    ...assets(),
    html: html
  })
}
