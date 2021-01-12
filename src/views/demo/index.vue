<template>
  <div class="m-content-all">
    <dl>
      <dt>全局组件</dt>
      <dd>
        <x-empty />
      </dd>
    </dl>
    <dl>
      <dt>全局请求</dt>
      <dd>
        <p>
          <el-button type="primary" @click="onFetch">
            {{ loading ? '正在请求...' : '点击请求，快速点击重复请求会被拦截' }}
          </el-button>
        </p>
        <p>
          <el-button @click="onCancel">主动拦截某个请求</el-button>
        </p>
      </dd>
    </dl>
    <dl>
      <dt>引用图片</dt>
      <dd>
        <p><img src="../../assets/images/logo.png" alt="logo"></p>
        <p class="bg-img"></p>
      </dd>
    </dl>
    <dl>
      <dt>遗留问题</dt>
      <dd>
        <p>1、404页面通配符 * https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes</p>
      </dd>
    </dl>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus';

export default {
  name: 'Demo',
  components: {},
  data () {
    return {
      date: new Date(),
    };
  },
  computed: {
    ...mapGetters([
      'loading',
    ]),
  },
  created () {

  },
  methods: {
    async onFetch () {
      console.log('开始请求');
      this.$store.dispatch('demo/getApi', {
        pageSize: 20,
      }).then((res) => {
        ElMessage.success({
          message: res.body.name,
          type: 'success',
        });
      });
    },
    onCancel () {
      // 主动拦截某个请求
      // this.$store.dispatch('app/removePending', {
      //   url: API.success,
      //   cancel: true,
      // });
    },
  },
};
</script>

<style lang="less">
  .m-content-all{
    padding: 10px; height: 100%;
    dl{ padding-bottom: 20px;}
    dt{ font-size: 14px; font-weight: bold;}
  }

  .bg-img{ width: 200px; height: 200px; background: url('../../assets/images/logo.png') no-repeat; background-size: cover}
  dd{
    p{ padding-bottom: 10px;}
  }
</style>
