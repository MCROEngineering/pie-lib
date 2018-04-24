// const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  context: __dirname,
  entry: {
    image: './image/index.jsx'
  },
  output: {
    filename: '[name]/bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['react', 'env', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};