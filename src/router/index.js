import Vue from 'vue';
import Router from 'vue-router';
import nprogress from 'nprogress';
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
        },
        {
          name: 'articles',
          path: '/articles',
          component: () => import('@/views/articles/')
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
  nprogress.start();
  const userInfo = window.sessionStorage.getItem('userInfo');
  // console.log(userInfo);
  if (to.path !== '/login') {
    if (!userInfo) {
      return next({ name: 'login' });
    } else {
      next();
    }
  } else {
    // 这里表示访问登录页面
    // console.log(userInfo);
    // 如果有了userInfo就不让他访问
    if (userInfo) {
      return next(false);
    };
    next();
  }
});

router.afterEach((to, from) => {
  nprogress.done();
});

export default router;
