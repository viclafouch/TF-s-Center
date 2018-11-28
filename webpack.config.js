const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = (env, argv) => ({
  mode: argv.mode,
  cache: argv.mode === 'development',
  watch: argv.mode === 'development',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['node_modules']
  },
  devtool: argv.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  performance: { hints: false },
  optimization: {
    minimize: argv.mode === 'production',
    nodeEnv: argv.mode
  },
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    content_script: path.join(__dirname, "src", "js", "content_script.js"),
    background: path.join(__dirname, "src", "js", "background.js"),
    styles: path.join(__dirname, "src", "scss", "styles.scss"),
    popupcss: path.join(__dirname, "src", "scss", "popup.scss"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
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
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".scss"]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, "manifest.json"),
      to: path.join(__dirname, "build"),
      transform: function (content) {
        return Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        }))
      }
    }]),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, "src", "icon"),
      to: path.join(__dirname, "build"),
    }]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "html", "popup.html"),
      filename: "popup.html",
      chunks: ["popup", "popupcss"]
    }),
  ],
});