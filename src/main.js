// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 导入vue
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入样式
import '@/assets/css/index.css'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入没有axios
import myaxios from './js/myaxios'
// 使用element-ui
Vue.use(ElementUI)

// 使用axios插件
Vue.use(myaxios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
