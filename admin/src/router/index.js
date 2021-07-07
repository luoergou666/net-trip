import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //------------------------------------  登录
    {
      path: '/',
      component: () => import('../views/Login'),
      meta: {
        name: ["登录"],
        requireAuth: false //标记是否需要登录
      },
    },
    //------------------------------------  重置密码
    {
      path: '/ResetPsw',
      component: () => import('../views/ResetPsw'),
      meta: {
        name: ["重置密码"],
        requireAuth: false
      },
    },
    //------------------------------------  主要页面
    {
      path: '/Home',
      redirect: '/Welcome',
      component: () => import('../views/Home'),
      meta: {
        name: ["首页"],
        path: [""],
        code: "",
        requireAuth: false
      },
      children: [
        //---------------------------------  欢迎页面
        {
          path: '/Welcome',
          component: () => import('../views/Welcome'),
          meta: {
            name: ["首页"],
            path: [""],
            code: "",
            requireAuth: false
          }
        },
        //---------------------------------  403无权限访问页面
        {
          path: '/403',
          component: () => import('../views/403'),
          meta: {
            name: ["首页", "无权限访问提示页"],
            path: ["/home", ""],
            requireAuth: false
          }
        },
        //---------------------------------  用户和权限
        {
          path: '/user/List',
          component: () => import('../views/user/List'),
          meta: {
            name: ["首页", "用户列表"],
            path: ["/home", ""],
            code: "user",
            menu: "user_list",
            requireAuth: true
          }
        },
        {
          path: '/user/Edit',
          component: () => import('../views/user/Edit'),
          meta: {
            name: ["首页", "用户列表", "编辑用户信息"],
            path: ["/home", "/user/List", ""],
            code: "user",
            menu: "user_list",
            requireAuth: true
          }
        },
        {
          path: '/user/PageList',
          component: () => import('../views/user/PageList'),
          meta: {
            name: ["首页", "权限资源管理"],
            path: ["/home", ""],
            code: "page",
            menu: "user_page",
            requireAuth: true
          }
        },
        {
          path: '/user/RoleList',
          component: () => import('../views/user/RoleList'),
          meta: {
            name: ["首页", "角色管理"],
            path: ["/home", ""],
            code: "role",
            menu: "user_role",
            requireAuth: true
          }
        },
        {
          path: '/user/UserRoleEdit',
          component: () => import('../views/user/UserRoleEdit'),
          meta: {
            name: ["首页", "用户管理", "设置用户角色"],
            path: ["/home", "/user/List", ""],
            code: "user",
            menu: "user_list",
            requireAuth: true
          }
        },
        {
          path: '/user/RolePageEdit',
          component: () => import('../views/user/RolePageEdit'),
          meta: {
            name: ["首页", "角色管理", "设置角色资源权限"],
            path: ["/home", "/user/RoleList", ""],
            code: "role",
            menu: "user_role",
            requireAuth: true
          }
        },

        //---------------------------------  开发者工具 自动任务
        {
          path: '/quartz/List',
          component: () => import('../views/quartz/List'),
          meta: {
            name: ["首页", "定时任务列表"],
            path: ["/home", ""],
            code: "quartz",
            menu: "user_quartz",
            requireAuth: false
          }
        },
        {
          path: '/quartz/Edit',
          component: () => import('../views/quartz/Edit'),
          meta: {
            name: ["首页", "定时任务列表", "编辑定时任务"],
            path: ["/home", "/quartz/List", ""],
            code: "quartz",
            menu: "user_quartz",
            requireAuth: false
          }
        },

        //---------------------------------  

      ]
    },

    //------------------------------------  404
    {
      path: '*',
      component: () => import('../views/404'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
