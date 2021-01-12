// import Layout from '~/views/layout/index'

export default [{
  path: '/',
  redirect: 'login',
  name: 'home',
  hidden: true,
}, {
  path: '/login',
  component: () => import('@/views/login/index'),
  name: 'login',
  meta: { title: '登录' },
  hidden: true,
}, {
  path: '/404',
  component: () => import('@/views/error/index'),
  name: '404',
  hidden: true,
}];
