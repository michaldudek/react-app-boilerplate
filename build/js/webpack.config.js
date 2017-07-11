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
    filename: '[name].[chunkhash:8].js',
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
                localIdentName: '[name]__[local]__[hash:base64:5]'
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
      filename: '[name].[contenthash:8].css'
    })
  ]
}