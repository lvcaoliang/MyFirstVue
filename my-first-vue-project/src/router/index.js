import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dynamic from '@/components/Dynamic'
import Image from '@/components/Image'
import Tiarcgis from '@/components/Tiarcgis'
import Tiarcgis2 from '@/components/Tiarcgis2'

//Vue.use()函数用来安装 Vue.js 插件。如果插件是一个对象，
//必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法将被作为 Vue 的参数调用。
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dy',
      name: 'Dynamic',
      component: Dynamic
    },
    {
      path: '/im',
      name: 'Image',
      component: Image
    },
    {
      path: '/tiarc',
      name: 'Tiarcgis',
      component: Tiarcgis
    },
    {
      path: '/tiarc2',
      name: 'Tiarcgis2',
      component: Tiarcgis2
    }
  ]
})
