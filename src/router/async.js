/** *
 * name 不可重复
 * */
import Layout from '@/views/layout/index';

export default [{
  path: '/demo',
  name: 'demo',
  redirect: '/demo/index',
  component: Layout,
  hidden: true,
  children: [{
    path: 'index',
    name: 'demo-index',
    component: () => import('@/views/demo/index'),
    meta: { title: 'DEMO' },
  }],
}, {
  path: '/book',
  name: 'book',
  redirect: '/book/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'book-index',
    component: () => import('@/views/book/index'),
    meta: { title: '漫画配置' },
  }],
}, {
  path: '/strategy',
  name: 'strategy',
  redirect: '/strategy/index',
  component: Layout,
  meta: { title: '策略配置' },
  children: [{
    path: 'index',
    name: 'strategy-index',
    component: () => import('@/views/strategy/index'),
    meta: { title: '策略列表' },
  }, {
    path: 'book',
    name: 'strategy-book',
    component: () => import('@/views/strategy/book'),
    meta: { title: '漫画列表' },
  }],
}];
