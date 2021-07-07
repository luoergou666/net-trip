// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from './http/axios'
import baseurl from './http/baseurl.js'
import api from './api'

import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

// import Clipboard from 'v-clipboard'

//全局设置
Vue.use(Lazyload);
Vue.use(Vant);
// Vue.use(Clipboard);

//编译环境下打开提示
Vue.config.productionTip = false

Vue.prototype.$http = axios   //挂载axios
Vue.prototype.$api = api
Vue.prototype.$baseurl = baseurl

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  let to_path = to.path.toLowerCase()

  // 1、已经登录
  if (!localStorage.xxxx_weixin_token == false) {

    // 如果身份证是空的，则跳转到登录页面
    let idCardNo = !store.state.user ? "" : (store.state.user.idCardNo || "");

    if (!idCardNo == true) { next({ path: '/Login', replace: true }); }
    else { next(); }

  }

  // 2、微信授权带了code回来的
  else if (window.location.href.toLowerCase().indexOf("wechatoauth?code=") > -1) {
    let href = window.location.href.toLowerCase();
    //微信授权带回来的url,vue在url后面补上个#/
    if (href.indexOf("#/wechatoauth") == -1) {
      let index = href.indexOf("wechatoauth?code=");
      let code = window.location.href.substr(index + 17, 32);
      window.location.href = baseurl.weixin + '#/wechatoauth?code=' + code;//构造前端的真实地址
    }
    //否则，就是实际WechatOAuth?code=的页面
    else { next(); }
  }

  // 3、不需要登录权限
  else if (to.matched.some(record => record.meta.requireAuth) == false) { next(); }

  // 4、微信授权登录
  else {
    // 记录登录前的来源url,登录后跳转页面
    localStorage.setItem("xxxx_weixin_redirect", (to_path == "/wechatoauth" ? from.fullPath : to.fullPath));

    localStorage.removeItem('xxxx_weixin');
    localStorage.removeItem('xxxx_weixin_token');

    // 获取跳转到微信的地址
    api.getData_Wx_RedirectUri({ redirectUrl: baseurl.weixin + "%23/wechatoauth" })
      .then(res => {
        if (res.data.code == 200) { window.location.href = res.data.data; }
        else { next({ path: '/404', query: { msg: res.data.msg } }); }
      })
      .catch(err => { next({ path: '/404', query: { msg: res.data.msg } }); });
  }

});
router.afterEach((to, from, next) => {
});


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})