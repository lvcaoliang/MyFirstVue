var path = require('path')
var config = require('../config')
// 该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
// 该插件有三个参数意义分别如下
// use:指需要什么样的loader去编译文件,如源文件是.css就选择css-loader
// fallback:编译后用什么loader来提取css文件
// publicfile:用来覆盖项目路径,生成该css文件的文件路径
var ExtractTextPlugin = require('extract-text-webpack-plugin')
//对外暴露一个名为assetsPath的函数，函数作用为将参数文件中的参数路径与传入路径合并在一起
//但是为什么用path.posix.join而不是直接用path.join呢？
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
//同上暴露函数，作用暂未看懂
exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // Object.assign(target, ...sources)将sources对象中所有的自有属性值拷贝到target对象中，并返回target对象
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // 这个地方暂未看懂
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
