import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.css';
import 'nprogress/nprogress.css';
import axios from 'axios';
// 所有的组件都是Vue的实例
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'; // 配置axios的默认路径

// axios.interceptors.request.use(config => { // 所有的请求都会进入这里
//   const userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
//   // if (userInfo) { // 表示如果登录了, 就统一的设置授权信息
//     config.headers.Authorization = `Bearer ${userInfo.token}`; // 这里统一的设置了头部, 就不用咋每个地方都写
//   // };
//   console.log(config); // config表示请求相关的配置对象
//   return config;
// });

axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
  if (userInfo) { // 这里表示如果没有登录的状态就不添加这个请求头, 不然就会给一个undefined添加, 就会报错
    config.headers.Authorization = `Bearer ${userInfo.token}`;
    return config;
  }
  return config; // 这里表示如果没哟登录就直接放行
}, error => {
  return Promise.reject(error);
});

// 响应拦截 在这里统一处理
axios.interceptors.response.use(response => {
  // console.log('响应拦截生效了');
  try { // 使用这种方法表示, 如果这里没有错误就执行下面的, 如果有错误就执行catch里面的
    return response.data.data; // 这里表示相应结果返回的是以前的data.data返回的是一个data
  } catch {
    return response;
  }
  // ------------------------------------------
  // if (typeof response.data === 'object' && response.data.data) {
  //   return response.data.data;
  // } else {
  //   return response.data;
  // }
  // 不是以前的response, 所以使用的时候不用再.data.data了, 但是这里要判断一下是否是这种类型的
}, error => { // 大于等于400的状态码会进入这里
  return Promise.reject(error);
});

// axios.interceptors.response.use(response => {
//   return response.data.data;
// }, error => {
//   return Promise.reject(error);
// })

// // 请求拦截器
// axios.interceptors.use(config => {
//   config.headers.Authorization = `Bearer ${userInfo.token}`;
// }, error => {
//   return Promise.reject(error);
// })

// axios.interceptors.response.use(response => {
//   console.log(response);
//   // const status = error.response.status; // 状态码
//   // if (status === 401) {
//   //   router.push({
//   //     name: 'login'
//   //   });
//   // } else if (status === 401) {
//   //   console.log('未授权');
//   // }
//   // return response.data.data;
//   return response;
// }, error => {
//   return Promise.reject(error);
// });

Vue.use(ElementUI);
// 偏饭的使用的成员,可以放到Vue.prototype中, 然后就可以在组件中直接使用, this.xxx使用
// 在所有模板都可以使用因为都是Vue的实例
// 往Vue原型对象汇总添加成员的时候, 尽量使用$来起名, 为了防止组件的成员冲突
Vue.prototype.$http = axios; // 给Vue上面挂载了一个$http属性
// 然后在其他地方使用this.$http就相当于axios

Vue.config.productionTip = false;
// 请求拦截器, 就是拦截请求

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
