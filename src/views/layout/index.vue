<template>
  <section class="g-layout-all">
    <x-layout-header />
    <section class="g-layout-content">
      <section class="g-layout-aside">
        <x-layout-sidebar/>
      </section>
      <section class="g-layout-main">
        <x-layout-breadcrumb />
        <!-- 主要内容 -->
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </section>
    </section>
  </section>
</template>
<script>
import {
  XLayoutBreadcrumb,
  XLayoutSidebar,
  XLayoutHeader,
} from './components';

export default {
  name: 'Layout',
  components: {
    XLayoutBreadcrumb,
    XLayoutSidebar,
    XLayoutHeader,
  },
  computed: {
    key () {
      return this.$route.fullPath;
    },
  },
  created () {

  },
  methods: {

  },
};
</script>
