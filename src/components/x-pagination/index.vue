<!--分页-->
<template>
  <div :class="{'hidden': hidden || isHidden}" class="pagination-container">
    <el-pagination
        background
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  components: {},
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    immediate: {
      type: Boolean,
      default: () => true,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    initialPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 1,
      totalCount: 0,
      isHidden: false,
    };
  },
  watch: {
    immediate: {
      async handler(val, oldVal) {
        if (val) {
          await this.fetchData(this.initialPage);
          this.$emit('update:immediate', false);
        }
      },
      immediate: true,
    },
  },
  created() {

  },
  methods: {
    async handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      await this.fetchData(page);
    },

    async fetchData(page) {
      const { actions, data = {} } = this.params;

      Object.assign(data, {
        pagenum: page || 1, // 当前页数
        pagesize: this.pageSize, // 条数
      });

      const res = await this.$store.dispatch(actions, data).catch(() => {
        this.$emit('update:immediate', false);
      });
      this.currentPage = data.pageNum;

      // 接口返回的分页详细信息
      const { pageInfo } = res;
      if (pageInfo) {
        this.totalCount = pageInfo.total;
        this.isHidden = pageInfo.total <= 0;
      } else {
        this.isHidden = true;
      }
      this.$emit('paginated', res);
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 30px 16px 20px;
}
.pagination-container.hidden {
  display: none;
}
</style>
