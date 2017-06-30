const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/react-client/src');
const DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
  devtool: 'source-map',

  entry: `${SRC_DIR}/index.jsx`,

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: DIST_DIR
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'},
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}