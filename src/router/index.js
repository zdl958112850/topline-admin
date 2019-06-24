import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home/')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish/')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  const mobileNum = window.sessionStorage.getItem('mobileNum');
  if (to.path !== '/login') {
    if (!mobileNum) {
      return next({ name: 'login' });
    } else {
      next();
    }
  } else {
    // 这里表示访问登录页面
    console.log(mobileNum);
    // 如果有了mobileNum就不让他访问
    if (mobileNum) {
      return next(false);
    };
    next();
  }
});

export default router;
