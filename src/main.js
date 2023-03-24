import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import "./utils/permission"
import "./common.less"
import 'ant-design-vue/dist/antd.css'
import * as echarts from 'echarts';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
