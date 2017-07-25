/* eslint-disable */
//这是为了浏览器兼容性而引入的特定polyfill，这个应该可以实现某个特定情况下的浏览器兼容，看名字像事件方面的
require('eventsource-polyfill')
// 热重载，/后边应该是一些参数设置，还需要再查一下，export的内容亦如此
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// subscribe什么作用？
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
