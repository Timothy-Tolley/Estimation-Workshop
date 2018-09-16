const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  mode: 'production',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {loader: 'babel-loader'}
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}
