/*
 * Webpack Config
 *
 * ENV responsive config, that has different options based on NODE_ENV :P
 */

// simple flags
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssImport = require('postcss-import')
const postcssNext = require('postcss-cssnext')
const postcssNeat = require('postcss-neat')

const paths = require('./paths')

module.exports = {
  entry: {
    vendors: [
      'react',
      'lodash'
    ],
    app: [paths.indexJs]
  },
  output: {
    filename: isProduction ? '[name].[chunkhash:8].js' : '[name].js',
    path: paths.dist
  },
  resolve: {
    modules: [paths.nodeModules, paths.src]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
                modules: true,
                localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]'
              }
            },
            {
              loader: require.resolve('postcss-loader'),
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
  },
  plugins: [
    new ExtractTextPlugin({
      filename: isProduction ? '[name].[contenthash:8].css' : '[name].css'
    })
  ]
}
