export default {
  loading: (state) => state.app.loading,
  permission_routers: (state) => state.app.routes,

  token: (state) => state.user.token,
  userName: (state) => state.user.userName,
  roles: (state) => state.user.roles,
};
