import Vue from 'vue'
// 导入vue-router
import Router from 'vue-router'
// 导入登录组件
import login from '@/components/login/login.vue'
// 导入首页组件
import Home from '@/components/home/home.vue'
// 导入用户管理组件
import User from '@/components/users/userlist.vue'
// 导入角色列表组件
import Role from '@/components/rolelist/rolelist.vue'
// 导入权限列表组件
import Jurisdiction from '@/components/Jurisdiction/jurisdiction.vue'
// 导入商品列表组件
import Goods from '@/components/goods/goods.vue'
// 使用vue-router
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: login },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        // 用户列表路由
        { path: '/user', name: 'user', component: User },
        // 角色列表路由
        { path: '/role', name: 'role', component: Role },
        // 权限列表
        {
          path: '/jurisdiction',
          name: 'jurisdiction',
          component: Jurisdiction
        },
        // 商品列表
        { path: '/goods', name: 'goods', component: Goods }
      ]
    }
  ]
})
