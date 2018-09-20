const path = require('path')
// const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  // ],
  // mode: 'production',
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {loader: 'babel-loader'}
      ]
    }]
  },
  externals: {
    'sqlite3': 'sqlite3'
  //   // Use external version of React
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}
