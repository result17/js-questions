const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  // 推荐dev下使用
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // gzip
    compress: true,
    // 默认当前工作目录作为提供内容目录
    contentBase: false,
    host: '127.0.0.1',
    hot: true,
    // 执行命令后打开浏览器
    open: true,
    port: 7788,
    // history路由设置
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7755/',
        pathRewrite: {'^/api': ''},
        secure: false,
        // keep host header
        changeOrigin: false,
      }
    }
  }
})