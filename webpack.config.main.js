const path = require("path");
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const IS_DEBUG = process.env.DEBUG || false;

const developmentConfig = {
  mode: 'development',
  devtool: 'eval',
};

const productionConfig = {
  mode: 'production',
};

const additionalConfig = IS_DEBUG ? developmentConfig : productionConfig;

const config = {
  entry: ["./src/main.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },

  target: 'electron-main',
  node: {
    __dirname: false
  },


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
    })
  ]
};

module.exports = config;
