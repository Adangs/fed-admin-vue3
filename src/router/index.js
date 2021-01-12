import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../store';
import staticRouter from './static'; // 静态路由列表

// 路由白名单
const whiteList = ['/', '/login', '/404'];
NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (localStorage.getItem('token')) {
    if (to.path === '/login') {
      next({ path: '/demo' });
    } else if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      await store.dispatch('user/getUserInfo').then(async (user) => {
        // 拉取user_info
        await store.dispatch('app/generateRoutes', user).then((asyncRoutes) => {
          // 根据roles权限生成可访问的路由表
          asyncRoutes.forEach(async (item) => {
            await router.addRoute(item.name, item);
          });
          next({ ...to, replace: true });
        }).catch(() => {
          store.dispatch('user/fedLogOut').then(() => {
            next({ path: '/login' });
          });
        });
      }).catch(() => {
        store.dispatch('user/fedLogOut').then(() => {
          next({ path: '/login' });
        });
      });
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next();
  } else {
    next(`/login?redirect=${encodeURIComponent(to.fullPath)}`); // 否则全部重定向到登录页
  }
});

// 路由结束钩子
router.afterEach((to) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  NProgress.done();
});

export default router;
