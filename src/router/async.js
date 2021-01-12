/** *
 * name 不可重复
 * */
import Layout from '@/views/layout/index';

export default [{
  path: '/demo',
  name: 'demo',
  redirect: '/demo/index',
  component: Layout,
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
    meta: { title: '列表数据' },
  }],
}, {
  path: '/strategy',
  name: 'strategy',
  redirect: '/strategy/index',
  component: Layout,
  meta: { title: '一级菜单' },
  children: [{
    path: 'index',
    name: 'strategy-index',
    component: () => import('@/views/strategy/index'),
    meta: { title: '二级菜单' },
  }, {
    path: 'book',
    name: 'strategy-book',
    component: () => import('@/views/strategy/book'),
    meta: { title: '二级菜单' },
  }],
}];
