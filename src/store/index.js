import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index"
import { getInfo } from '@/api/user'
import { filterMenu } from "../utils/menufilter"
import { asyncRouterMap } from "../router/routerMap"
import generaRouter from "../utils/menuGenerator"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: "",
    routes: [],
    nickname:"",
    breadCrumb:[],
    teacherDetail:null
  },
  getters:{
    menuRoutes(state){
      return state.routes[0]?state.routes[0].children:[]
    }
  },
  mutations: {
    //存储用户权限
    setRole(state, payload) {
      state.role = payload;
    },
    setNickname(state,payload){
      state.nickname=payload
    },
    generateRoutes(state) {
      //根据用户的权限，从路由表中筛选出用户可访问的路由
      const result = filterMenu(asyncRouterMap, state.role);
      let routes = [];
      generaRouter(routes, result);
      let initialRoutes = router.options.routes
      console.log(router);
      routes.forEach(r => {
        router.addRoute("Layout",r)
        //将固定路由和动态路由拼接成完整路由，存到vuex中，方便后续生成菜单使用
        initialRoutes[0].children.push(r)
      })
      state.routes = initialRoutes
    },
    setBreadCrumb(state,payload){
      state.breadCrumb=payload
    },
    editTeacher(state,payload){
      state.teacherDetail=payload
    }
  },
  actions: {
    //获取用户权限
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then((res) => {
          const { data: { role,nickname } } = res;
          commit('setRole', role)
          commit('setNickname',nickname)
          resolve(role)
        }).catch(error => {
          reject(error)
        })
      })
    },

  },
  modules: {
  }
})
