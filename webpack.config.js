const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const IS_DEBUG = process.env.DEBUG || false;

const developmentConfig = {
  watch: true,
  mode: 'development',
  devtool: 'eval',
};

const productionConfig = {
  watch: false,
  mode: 'production',
};

const additionalConfig = IS_DEBUG ? developmentConfig : productionConfig;

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
  //...additionalConfig,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  },

  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true,
      silent: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/views/index.html'
    })
  ]
};

module.exports = config;
