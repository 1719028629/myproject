import Vue from 'vue'
// 导入vue-router
import Router from 'vue-router'
// 导入登录组件
import login from '@/components/login/login.vue'
// 导入首页组件
import Home from '@/components/home/home.vue'
// 使用vue-router
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component: login },
    { path: '/home', name: 'Home', component: Home }
  ]
})
