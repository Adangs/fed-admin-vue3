<template>
  <div class="m-error">
   <p>404</p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {

  },
  methods: {

  },
};
</script>

<style lang="less">
  .m-error{
    height: 100%; display: flex; align-items: center; text-align: center;
    p{ flex: 1; font-size: 200px; color: #999;}
  }
</style>
