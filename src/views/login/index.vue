<template>
  <ul class="m-login">
    <li><el-input type="text" name="userName" placeholder="用户名" v-model="formData.userName"/></li>
    <li><el-input type="text" name="password" placeholder="密码" v-model="formData.password"/></li>
    <li><el-input type="tel" name="verifyCode" placeholder="请输入短信验证码" v-model="formData.verifyCode"/></li>
    <li><el-button type="primary" @click="onLogin">登录</el-button></li>
  </ul>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      formData: {
        userName: 'admin',
        password: '123456',
        verifyCode: '000000',
      },
    };
  },
  computed: {},
  watch: {},
  created() {

  },
  methods: {
    onLogin() {
      this.$store.dispatch('user/login', this.formData).then(() => {
        // console.log(1212, res);
        this.$router.push({ path: '/demo' });
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .m-login{
    width: 300px; margin: 0 auto; padding-top: 20%;
    li{ margin-bottom: 10px;}
    input{ width: 100%; border: 1px solid #dcdcdc; padding: 5px 10px;}
    .el-button{ width: 100%; }
  }
</style>
