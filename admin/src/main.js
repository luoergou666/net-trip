// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import baseurl from './http/baseurl.js'
import axios from './http/axios'
import api from './api'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

// import Clipboard from 'v-clipboard'

//全局设置
Vue.use(ViewUI, { transfer: true, size: 'default' });
// Vue.use(Clipboard);

//编译环境下打开提示
Vue.config.productionTip = false

Vue.prototype.$http = axios   //挂载axios
Vue.prototype.$api = api
Vue.prototype.$baseurl = baseurl

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();

  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) {

    // 判断当前的token是否存在登录存入的token，若不存在则跳转到登录页面
    if (localStorage.xxxx_admin_token) {
      //判断是否有当前页面的访问权限
      let code_list = (!store.state.user == true && []) || (!store.state.user.codes == true && []) || store.state.user.codes;//用户拥有的资源权限集合
      if (to.matched.every(record => record.meta.requireAuth == false || record.meta.code == "" || code_list.indexOf(record.meta.code) > -1) == false) {
        next({ path: '/403' });
      }
      else {
        next();
      }
    }
    else {
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      var time = new Date().getTime();
      next({ path: '/?time=' + time, query: { redirect: to.fullPath } });
    }
  }
  else {
    next();
  }
});

router.afterEach((to, from, next) => {
  ViewUI.LoadingBar.finish();
});

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})