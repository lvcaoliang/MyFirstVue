// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
//template:一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。
//挂载元素的内容都将被忽略，除非模板的内容有分发 slot

//components:包含 Vue 实例可用组件的哈希表
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
