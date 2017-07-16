/*
 * Webpack Config
 *
 * "Responsive" config, that has different options based on ENV values.
 *
 * NODE_ENV - set to 'production' for production build anything else for dev build
 * TARGET - set to 'server' will build for server app (nodejs), 'client' will build for client
 */

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction
const isServer = process.env.TARGET === 'server'
const isClient = !isServer

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const universalWebpackConfig = require('universal-webpack/config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssImport = require('postcss-import')
const postcssNext = require('postcss-cssnext')
const postcssNeat = require('postcss-neat')

const paths = require('./paths')

/*
 * COMMON CONFIG
 */
const common = {
  resolve: {
    modules: [paths.nodeModules, paths.src],
    alias: resolveAliases()
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [paths.nodeModules],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react-app']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
                modules: true,
                localIdentName: isProduction ? '[hash:base64:8]' : '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  postcssImport({
                    path: [paths.src]
                  }),
                  postcssNext({
                    browsers: ['last 4 versions', '> 1%', 'Firefox ESR', 'not ie < 9'],
                    flexbox: 'no-2009'
                  }),
                  postcssNeat({
                    neatGutterWidth: '0.75em'
                  })
                ]
              }
            }
          ]
        })
      }
    ]
  }
}

const plugins = [
  new ExtractTextPlugin({
    filename: isProduction ? '[name].[contenthash:8].css' : '[name].css'
  })
]

/*
 * CLIENT SETTINGS
 */
const client = Object.assign({}, common, {
  entry: {
    vendors: [
      'prop-types',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'redux'
    ],
    app: [paths.indexJs]
  },
  output: {
    filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js',
    path: paths.webDist,
    publicPath: paths.publicPath
  },
  plugins: plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    })
  ])
})

/*
 * SERVER SETTINGS
 */
const server = universalWebpackConfig.server(
  Object.assign({}, common, {
    output: {
      filename: 'server.js',
      path: paths.serverDist,
      publicPath: '/'
    },
    plugins: plugins
  }),
  {
    server: {
      input: paths.serverJs,
      output: paths.serverDistJs
    }
  }
)

module.exports = isServer ? server : client

/**
 * Resolve aliases in src/ dir so they are registered in webpack nicely.
 *
 * @return {Object}
 */
function resolveAliases () {
  const aliases = {}
  fs.readdirSync(paths.src)
    .map((name) => ({
      name: name,
      path: path.resolve(paths.src, name)
    }))
    .filter((item) => fs.statSync(item.path).isDirectory())
    .forEach((item) => {
      aliases[item.name] = item.path
    })
  return aliases
}
