const path = require("path");

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

  watch: false,
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  }
};

module.exports = config;
