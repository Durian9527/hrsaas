import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import * as filters from '@/filters'
import CheckPermission from '@/mixin/checkPermission'
import i18n from './lang'
import '@/icons' // icon
import '@/permission' // permission control
// 引入需要全局注册的组件
import Components from '@/components'

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  // 改变locale的值就可以改变当前的语言
  // i18n会根据当前的locale属性去寻找对应的显示内容
  i18n: (key, value) => i18n.t(key, value) // t方法，会去对应的语言包找对应的内容
})
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// 注册自定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Components)
Vue.mixin(CheckPermission)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
