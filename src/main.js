/**
 * 入口文件
 */
import Vue from 'vue';
import App from './App.vue';
// import router from './router';
Vue.config.productionTip = false;

// 导入重置样式
import '../static/css/base.css';
import '../static/css/global.less';
// 导入axios请求库
// import axios from 'axios';
// Vue.prototype.$axios = axios;

// 导入axios的post请求参数序列化
// import qs from 'qs';
// Vue.prototype.$qs = qs;





new Vue({
    el: '#app',
    // router,
    template: '<App/>',
    // components: { App } // 脚手架写法
    // render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法
})
