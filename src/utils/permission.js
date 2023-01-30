import router from "../router/index"
import store from '../store'
// import { filterMenu } from "../utils/menufilter"
// import { asyncRouterMap } from "../router/routerMap"
// import generaRouter from "../utils/menuGenerator"

router.beforeEach(async (to, from, next) => {
    const hasToken = sessionStorage.getItem("token")
    if (hasToken) {
        if (to.path === "/login") {
            next({ path: "/index" })
        } else { 
            const hasRoles = store.state.role;
             //判断用户刷新动作，如果存在证明没有刷新
            if (hasRoles) {
                next()
            } else {
                //找不到role证明用户刷新了，刷新之后需要调用接口
                //根据token获取用户权限信息，重新获取role
                await store.dispatch('getInfo')
                store.commit("generateRoutes")
                next({ ...to, replace: true })
            }
            next()
        }
    } else {
        if (to.path === "/login") {
            next()
        } else {
            next({ path: "/login" })
        }
    }



})