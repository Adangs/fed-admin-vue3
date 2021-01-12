import api from '@/api/demo';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getApi({ commit }, params) {
      return await api.getApi(params);
    },
  },
};
