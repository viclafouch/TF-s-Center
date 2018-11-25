const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['node_modules']
  }
});