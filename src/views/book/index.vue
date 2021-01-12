<template>
  <div class="m-book-list">
    <el-table :data="list">
      <el-table-column prop="title" label="漫画标题" />
      <el-table-column prop="ditchCode" label="所属渠道" />
      <el-table-column prop="" label="所属策略" />
      <el-table-column prop="status" label="漫画状态" />
      <el-table-column prop="" label="特殊显示" />
      <el-table-column prop="" label="操作" width="100" />
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
        actions: 'book/getBookList',
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
      this.list = res.data || [];
    },
  },
};
</script>

<style>

</style>
