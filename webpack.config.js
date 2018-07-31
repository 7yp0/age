const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  target: 'web',


  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  watch: true,
  mode: 'development',
  devtool: 'eval',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/views/index.html'
    })
  ]
};

module.exports = config;
