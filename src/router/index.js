import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import("../views/Layout"),
    children: [
      {
        path: "/index",
        name: "index",
        meta: {title:"首页",icon:"home"},
        component: () => import("../views/Home/index.vue")
      },
      {
        path: "/personal",
        name: "Personal",
        meta: {title:"个人中心",icon:"user"},
        component: () => import("../views/personal/index.vue")
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login")
  },

  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import("../components/404.vue")
  // },
]

const router = new VueRouter({
  routes
})

export default router
