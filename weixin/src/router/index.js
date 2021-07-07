import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Test',
      component: () => import('../views/Test'),
      meta: {
        name: "测试",
        requireAuth: false
      },
    },
    {
      path: '/',
      component: () => import('../views/Home'),
      meta: {
        name: "首页",
        requireAuth: true
      },
    },
    {
      path: '/Home',
      component: () => import('../views/Home'),
      meta: {
        name: "首页",
        requireAuth: true
      }
    },
    //---------------授权登录---------------
    {
      path: '/WechatOAuth',
      component: () => import('../views/WechatOAuth'),
      meta: {
        name: "微信授权登录",
        requireAuth: false
      },
    },
    {
      path: '/Login',
      component: () => import('../views/Login'),
      meta: {
        name: "登录",
        requireAuth: true
      },
    },
    //---------------错误页 404---------------
    {
      path: '/404',
      component: () => import('../views/404'),
      meta: {
        name: "404",
        requireAuth: false
      },
    },
    {
      path: '*',
      component: () => import('../views/404'),
      meta: {
        name: "404",
        requireAuth: false
      },
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { return savedPosition; }
    else { return { x: 0, y: 0 }; }
  }
})
