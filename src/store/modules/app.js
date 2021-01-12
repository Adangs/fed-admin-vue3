import staticRoutes from '@/router/static';
import asyncRoutes from '@/router/async';

/**
 * 使用 authority 确定当前用户是否具有权限
 * @param authorities
 * @param route
 */
function hasPermission (authorities, route) {
  if (route.meta && route.meta.authority) {
    if (typeof route.meta.authority === 'string') {
      return authorities.some((item) => item === route.meta.authority);
    }
    return route.meta.authority.some((item) => authorities.some((t) => t === item));
  }
  return true;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes (routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

// 用户权限集合
function filterRoles(roles) {
  const arr = [];
  roles.forEach((item) => {
    if (item.children) {
      arr.push(...filterRoles(item.children));
    }
    item.url && arr.push(item.url);
  });
  return arr;
}

export default {
  namespaced: true,
  state: {
    loading: false,
    addRoutes: null,
    routes: null,
    pending: {},
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data;
    },
    PUSH_PENDING: (state, data) => {
      state.pending[data.url] = data;
    },
    REMOVE_PENDING: (state, data) => {
      delete state.pending[data.url];
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = staticRoutes.concat(routes);
    },
  },
  actions: {
    // 全局请求状态
    setLoading ({ commit, state }, data) {
      return new Promise((resolve) => {
        commit('SET_LOADING', data);
        resolve(state);
      });
    },
    // 全局拦截重复请求
    pushPending ({ commit, state }, data) {
      return new Promise((resolve) => {
        commit('PUSH_PENDING', data);
        resolve(state);
      });
    },
    // 全局拦截重复请求
    removePending ({ commit, state }, data) {
      return new Promise((resolve) => {
        if (state.pending[data.url] && data.cancel) {
          state.pending[data.url].cancel(); // 执行取消操作
        } else if (state.pending[data.url]) {
          commit('REMOVE_PENDING', data);
        }
        // console.log(Object.keys(state.pending))
        resolve(state);
      });
    },
    // 动态路由 便于以后扩展权限
    generateRoutes ({ commit }, user = {}) {
      return new Promise((resolve) => {
        const roles = filterRoles(user.roles);
        console.log('user', user);
        console.log('roles', roles);
        let accessedRoutes = asyncRoutes;
        if (user.userName !== 'admin') {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles || []);
        }
        // const accessedRoutes = filterAsyncRoutes(asyncRoutes, user.roles || [])
        commit('SET_ROUTES', accessedRoutes);
        resolve(asyncRoutes);
      });
    },
  },
};
