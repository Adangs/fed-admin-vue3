<template>
  <section class="g-layout-header">
    <div class="logo">后台管理系统</div>
    <div class="tools">
      <div class="inline-block">
        <ul>
          <li>{{ userName }}</li>
          <li><el-divider direction="vertical"></el-divider></li>
          <li @click="onLogOut" style="cursor: pointer;">退出</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'XLayoutHeader',
  components: {

  },
  props: {},
  data () {
    return {};
  },
  computed: {
    ...mapGetters([
      'userName',
    ]),
  },
  watch: {},
  created () {

  },
  methods: {
    onLogOut () {
      this.$store.dispatch('user/fedLogOut').then(() => {
        this.$router.push({ path: '/login' });
      });
    },
  },
};
</script>

<style lang="less">
  .g-layout-header{
    background: #2E2E2E; color: #fff; height: 50px; padding: 0 10px; display: flex; align-items: center;
    .tools{
      flex: 1; text-align: right;
      .inline-block{ display: inline-block;}
      ul{ display: flex; align-items: center;}
      li{ flex: 1; white-space: nowrap;  }
    }
  }
</style>
