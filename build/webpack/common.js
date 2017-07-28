/*
 * Webpack Common Config
 *
 * Exports config() and plugins() functions that build webpack config based on env.
 *
 * Plugins are exported and built separately for easier manipulation.
 */
const fs = require('fs')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SimpleProgressPlugin = require('webpack-simple-progress-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const postcssImport = require('postcss-import')
const postcssNext = require('postcss-cssnext')
const postcssNeat = require('postcss-neat')

const paths = require('../paths')

module.exports = {
  /**
   * Build webpack common config.
   *
   * @param  {Boolean} isProduction Production build?
   * @return {Object}
   */
  config: (isProduction) => {
    const cssLoaders = [
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
              path: [paths.commonDir]
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

    return {
      resolve: {
        modules: [paths.nodeModulesDir],
        alias: resolveAliases()
      },
      stats: 'minimal',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [paths.nodeModulesDir],
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'react-app'],
                  plugins: ['react-hot-loader/babel']
                }
              }
            ]
          },
          {
            test: /\.css$/,
            // no need to use extract text plugin in dev, and it also breaks HMRE for css
            use: isProduction
              ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: cssLoaders })
              : ['style-loader', ...cssLoaders]
          }
        ]
      }
    }
  },
  /**
   * Build webpack config plugins option.
   *
   * Exported separately from config() for easier manipulation as client builds
   * and server builds can have potentially totally different plugins list.
   *
   * @param  {Boolean} isProduction Production build?
   * @return {Object}
   */
  plugins: (isProduction) => {
    const plugins = [
      new SimpleProgressPlugin()
    ]

    if (isProduction) {
      plugins.push(new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css'
      }))
    }

    if (!isProduction) {
      plugins.push(new FriendlyErrorsPlugin())
    }

    return plugins
  }
}

/**
 * Resolve aliases in src/ dir so they are registered in webpack nicely.
 *
 * @return {Object}
 */
function resolveAliases () {
  const aliases = {}
  fs.readdirSync(paths.commonDir)
    .map((name) => ({
      name: name,
      path: path.resolve(paths.commonDir, name)
    }))
    .filter((item) => fs.statSync(item.path).isDirectory())
    .forEach((item) => {
      aliases[item.name] = item.path
    })
  return aliases
}
