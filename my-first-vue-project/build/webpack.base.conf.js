//NodeJS中的Path对象，内置模块，用于处理目录的对象，提高开发效率，如合并路径、路径巡航、相对路径等
var path = require('path')
//下边几个require提供了要用的一些函数和配置参数
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
//__dirname变量获取当前模块文件所在目录的完整绝对路径，在这用join ..后貌似是直接到根目录下了
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//下边是一些暴露出来的基础配置参数
//entry打包的入口文件,一个对象或者一个字符串
module.exports = {
  entry: {
    app: './src/main.js'
  },
  // output配置打包的结果，一个对象
  // fileName：定义输出文件名，一个字符串
  // path：定义输出文件路径，一个字符串
  // publicPath : 需根据使用位置，确定参数作用
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // resolve 影响对模块的解析/resolve 解析模块依赖的时候，受影响的配置项，啥意思？
  // extensions 决定了哪些文件后缀在引用的时候可以省略点，Webpack帮助你补全名称
  // fallback 当webpack在 root（默认当前文件夹，配置时要绝对路径） 
  // 和 modulesDirectories（默认当前文件夹，相对路径）配置下面找不到相关modules，去哪个文件夹下找modules
  // alias 这个大家应该比较熟悉，requirejs之类的都有，就是别名，
  // 帮助你快速指向文件路径，少写不少代码，而且不用关心层级关系， 
  // 需要注意的是：在scss之类的css预编译中引用要加上~，以便于让loader识别是别名引用路径
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // module:定义对模块的处理逻辑，确定解析不同文件使用哪些loader
  // test:正则表达式，用于匹配到的文件
  // loader/loaders：字符串或者数组，处理匹配到的文件。如果只需要用到一个模块加载器则使用
  // loader：string，如果要使用多个模块加载器，则使用loaders：array
  // include:字符串或者数组，指包含的文件夹
  // exclude：字符串或者数组，指排除的文件夹
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
