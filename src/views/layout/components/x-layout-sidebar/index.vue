<template>
  <el-scrollbar wrap-class="m-sidebar scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      background-color="#fafafa"
      text-color="#666"
      active-text-color="#000"
      mode="vertical"
      unique-opened
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './item';

export default {
  components: { SidebarItem },
  data () {
    return {};
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    ...mapGetters([
      'permission_routers',
    ]),
  },
};
</script>
