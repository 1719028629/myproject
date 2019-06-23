// 创建一个vue插件 Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器,第二个参数是一个可选的选项对象
// 导入axios
import axios from 'axios'
// 创建插件对象
let myaxios = {}
// 添加插件方法
myaxios.install = function (Vue) {
  // 设置axios全局地址,后面请求的所有得地址都不用加下前面的地址了,写后面不同的部分
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 设置全局请求头,这个只会执行一次,所以登录过后,他的token值就一直为null 所以会有bug后面的请求要在刷新一次页面才会有数据
  // axios.defaults.headers.common["Authorization"] = window.localStorage.getItem("token");
  // 拦截器Interceptors,没次请求都会触发,请求拦截器,还有响应拦截器  return config必须要返回这个,不然后面的代码请求无法执行
  axios.interceptors.request.use(function (config) {
    // 登录不需要请求头,判断是否是登录,是不是在设置请求头
    if (!config.url.includes('login')) {
      // 不是登录,每次请求开启前,设置请求头
      config.headers.Authorization = window.localStorage.getItem('token')
    }
    return config
  })
  // 把axios方法添加到vue原型中
  Vue.prototype.$http = axios
}

// 暴露
export default myaxios
