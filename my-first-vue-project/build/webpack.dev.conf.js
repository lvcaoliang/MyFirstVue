var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// html-webpack-plugin插件是用来将依赖自动写入html文件
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// Object.keys 传入对象，返回对象所有属性名，该方法返回一个数组 http://blog.csdn.net/u014035151/article/details/53135610
// 数组的 forEach()方法调用数组中的每个元素
// concat() 方法用于连接两个或多个数组，该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
// 下边有个知识点，对像属性的获取，可以用.也可以用[]，下边用的是中括号，中括号比点的优势在于
// 中括号可以使用变量和数字，点不行
// []里加个字符串，不知道啥意思
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // filename渲染输出html文件名,路径相对于 output.path 的值
    // template渲染源模版文件
    // true: 自动写入依赖文件; false: 不写入依赖，构建多页面非常有用
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
