// 检查NodeJS和npm的版本
require('./check-versions')()
// 获取配置，require有个处理逻辑，在这里是去当前目录上级目录的config文件夹中读取了index.js
var config = require('../config')
// 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的配置作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// opn模块自动打开浏览器
var opn = require('opn')
// path模块用来进行方便的路径操作
var path = require('path')
// Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
// 使用 Express 可以快速地搭建一个完整功能的网站
var express = require('express')
// 总线
var webpack = require('webpack')
// 单线程Node.js代理中间件
var proxyMiddleware = require('http-proxy-middleware')
// 引入 webpack 配置
var webpackConfig = require('./webpack.dev.conf')
// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
var port = process.env.PORT || config.dev.port
// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// 定义 HTTP 代理表，代理到 API 服务器，这里好像是个空对象啊
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
// 创建express实例，也就是一个网站壳子？
var app = express()
// 根据webpack配置文件创建Compiler对象
var compiler = webpack(webpackConfig)
// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
// webpack-hot-middleware，用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载？
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
// 将 proxyTable 中的代理请求配置挂在到express服务器上
// proxyMiddleware有两个参数context和options，context匹配对应请求的的URL地址, 匹配的请求将被代理到目标主机
// options就是目标主机地址
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')())
// 使用webpack开发中间件
// 即将webpack编译后输出到内存中的文件资源挂到express服务器上
app.use(devMiddleware)
// 将热重载中间件挂在到express服务器上
app.use(hotMiddleware)
// serve pure static assets
// 静态资源的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 将静态资源挂到express服务器上
app.use(staticPath, express.static('./static'))
// 应用的地址信息，例如：http://localhost:8080
var uri = 'http://localhost:' + port
//待查
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
console.log('> Starting dev server...')
// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
// 如果符合自动打开浏览器的条件，则通过opn插件调用系统默认浏览器打开对应的地址uri
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})
// 待查
var server = app.listen(port)
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
