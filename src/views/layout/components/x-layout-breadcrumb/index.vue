<template>
  <div class="x-layout-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect' || index === levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { pathToRegexp } from 'path-to-regexp';

export default {
  name: 'XLayoutBreadcrumb',
  components: {},
  props: {},
  data() {
    return {
      levelList: [],
    };
  },
  computed: {},
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
      // console.log(this.levelList)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        if (redirect !== this.$route.name) {
          this.$router.push(redirect);
        }
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="less">
  .x-layout-breadcrumb{
    padding: 10px 0 20px; border-bottom: 1px solid #e5e5e5; margin-bottom: 10px;
  }
</style>
