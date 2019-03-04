const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  entry: ['@babel/polyfill', './src/index.ts'],
  mode: env || 'development',
  devtool: 'inline-source-map',
  ...(env === 'production' ? {} : {
    devServer: {
      contentBase: './dist',
      publicPath: '/',
      open: true,
      overlay: true,
    },
  }),
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
