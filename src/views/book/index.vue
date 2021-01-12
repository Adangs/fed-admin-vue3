<template>
  <div class="m-book-list">
    <el-table :data="list">
      <el-table-column prop="coin" label="coin" />
      <el-table-column prop="accName" label="accName" />
      <el-table-column prop="hashrate" label="hashrate" />
      <el-table-column prop="hashrateUnit" label="hashrateUnit" />
      <el-table-column prop="addTime" label="addTime" />
    </el-table>
    <x-pagination v-model:immediate="pagination_immediate" :params="pagination" @paginated="setTableData" />
  </div>
</template>

<script>
export default {
  name: 'Book',
  components: {},
  props: {},
  data () {
    return {
      list: null,
      pagination: {
        actions: 'demo/getList',
      },
      pagination_immediate: true,
    };
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {
    setTableData(res) {
      this.list = res.body.list || [];
    },
  },
};
</script>

<style>

</style>
