export default {
  namespaced: true,
  state: {
    id: null,
    token: null,
    userName: null,
    avatar: null,
    trueName: null,
    roles: [],
  },
  mutations: {
    SET_DATA: (state, data) => {
      Object.keys(data).forEach((key) => {
        if (state[key] !== undefined) {
          state[key] = data[key];
        }
      });
    },
    SET_ROLES: (state, data) => {
      state.roles = data;
    },
  },
  actions: {
    // 全局请求状态
    login({ commit }) {
      const res = {
        id: 1,
        userName: 'Admin',
        roles: [],
      };
      commit('SET_DATA', res);
      localStorage.setItem('token', 'token');
      localStorage.setItem('user-info', JSON.stringify(res));
      return Promise.resolve(res);
    },

    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        let user = localStorage.getItem('user-info');
        if (user) {
          user = JSON.parse(user);
          const roles = ['admin'];
          commit('SET_DATA', user);
          commit('SET_ROLES', roles.length ? roles : user.id);
          return resolve({
            id: user.id,
            userName: user.userName,
            roles,
          });
        }
        return reject({
          code: 401,
        });
      });
    },

    // 用户退出
    fedLogOut ({ commit }) {
      return new Promise((resolve) => {
        localStorage.clear();
        commit('SET_DATA', {
          token: null,
          roles: [],
        });
        return resolve();
      });
    },
  },
};
