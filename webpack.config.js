const path = require("path");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

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
  entry: ["./src/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  target: 'electron-renderer',

  resolve: {
    extensions: ['.ts', '.js']
  },

  ...additionalConfig,

  module: {
    rules: [
      {
        test: /\.ts?$/,
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
