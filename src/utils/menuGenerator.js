import Components from "@/router/components.js"
function generaRouter(routers, data) {
    //之所以把routers定义成参数，由外部传入而不是在内部定义，是因为如果在内部定义
    //每次调用都会重新创建一个routers,而我们希望的是每次调用都是在构建我的routers数组
    if (data && data.length > 0) {
        data.forEach((item) => {
            //筛选出符合条件的菜单
            let menu = Object.assign({}, item);
            if (item.children) {
                //因为如果有子集，就不需要渲染component
                menu.component=Components.Content
                menu.children = [];
                generaRouter(menu.children, item.children);
            } else {
                menu.component = Components[menu.name];
            }
            routers.push(menu);
        });
    }
}
export default (routers, data) => {
    generaRouter(routers, data);
}; 