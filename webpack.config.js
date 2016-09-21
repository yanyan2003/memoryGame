var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer-core');

var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules', 'src'],
    fallback: __dirname
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=5000"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'images'
      }
    ])
  ],
  postcss: [autoprefixer]
};
