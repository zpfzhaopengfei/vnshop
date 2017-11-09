// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//懒加载
import VueLazyload from 'vue-lazyload'
//懒加载配置
Vue.use(VueLazyload, {
//preLoad: 1.3,
//error: 'dist/error.png',
  loading: '/static/img/ok-2.png',//显示图片
//attempt: 1
})


//项目中css导入
import '../static/css/index.css'

Vue.config.productionTip = false;

//实现加载下拉数据
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

//利用axios的baseUrl修改api前缀 经过配置不需要在别的模块引入axios模块了。
import apiConfig from '../config/api.config'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = apiConfig.baseUrl



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
