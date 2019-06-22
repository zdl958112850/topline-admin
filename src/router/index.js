import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/home/home.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue')
    }
  ]
});
