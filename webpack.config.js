const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

module.exports = (env, argv, IS_DEV = argv.mode !== 'production') => {
  const config = {
    cache: IS_DEV,
    stats: 'minimal',
    target: 'web',
    watch: IS_DEV,
    mode: argv.mode,
    devtool: IS_DEV ? 'inline-source-map' : false,
    entry: {
      popup: path.join(__dirname, 'src', 'js', 'popup.js'),
      content_script: path.join(__dirname, 'src', 'js', 'content_script.js'),
      background: path.join(__dirname, 'src', 'js', 'background.js'),
      popupcss: path.join(__dirname, 'src', 'scss', 'popup.scss'),
      deputy: path.join(__dirname, 'src', 'scss', 'deputy.scss')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'scoped-css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.jsx', '.js', '.scss'],
      alias: {
        '@components': path.resolve(__dirname, './src/js/components'),
        '@stores': path.resolve(__dirname, './src/js/store'),
        '@containers': path.resolve(__dirname, './src/js/containers'),
        '@shared': path.resolve(__dirname, './src/js/shared'),
        '@utils': path.resolve(__dirname, './src/js/utils'),
        '@scss': path.resolve(__dirname, './src/scss'),
        '@img': path.resolve(__dirname, './src/img'),
        '@deputy': path.resolve(__dirname, './src/js/deputy'),
        '@': path.resolve(__dirname, './src')
      }
    },
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, 'build')
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'manifest.json'),
            to: path.join(__dirname, 'build'),
            transform: content => {
              const manifestContent = JSON.parse(content.toString())
              if (IS_DEV) {
                manifestContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'"
                manifestContent['background']['scripts'].push('hot-reload.js')
              }

              return Buffer.from(
                JSON.stringify(
                  Object.assign({}, manifestContent, {
                    description: process.env.npm_package_description,
                    version: process.env.npm_package_version
                  })
                )
              )
            }
          },
          {
            from: path.join(__dirname, 'src', 'icon'),
            to: path.join(__dirname, 'build')
          }
        ]
      }),
      new webpack.EnvironmentPlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        homepage_url: process.env.npm_package_homepage
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'html', 'popup.html'),
        filename: 'popup.html',
        chunks: ['popup', 'popupcss']
      })
    ]
  }

  if (IS_DEV) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'src', 'js', 'utils', 'hot-reload.js'),
            to: path.join(__dirname, 'build')
          }
        ]
      })
    )
  }

  return config
}
