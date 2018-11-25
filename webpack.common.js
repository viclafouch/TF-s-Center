const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    content_script: path.join(__dirname, "src", "js", "content_script.js"),
    background: path.join(__dirname, "src", "js", "background.js")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: false,
              sourceMap: true,
              importLoader: 2
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ],
};