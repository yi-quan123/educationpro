import {message} from "ant-design-vue"
import axios from 'axios'
const service = axios.create({ // url = base url + request url
    baseURL: "http://47.98.219.152:3000"
 //   timeout: 5000 // request timeout
})
service.interceptors.request.use(
    config=>{
        if(sessionStorage.getItem("token")){
            config.headers['Authorization']=`Bearer ${sessionStorage.getItem("token")}`
        }
        return config
    }
)
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const data = response.data;
    if (data.code == -1) {
        message.error({
            content:data.msg || "操作失败"
        })
    }
    return data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service