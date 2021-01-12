<template>
  <div class="x-empty" :class="{ 'is-flex': !!flex }">
    <p class="x-empty-content">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'XEmpty',
  components: {},
  props: {
    flex: Boolean,
    content: {
      type: String,
      default: '暂无相关数据...',
    },
  },
  data() {
    return {};
  },
  computed: {

  },
  watch: {},
  created() {

  },
  methods: {},
};
</script>

<style lang="less">
  .x-empty{
    text-align: center;
    .x-empty-content{ color: #999; padding: 20px 0;}
  }
</style>
