<template>
  <!-- <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination> -->
  <div class="divBox">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentpage"
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    currentpage: {
      type: Number,
      default: 1,
    },
    pagesize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('pagechange',val)
    },
  },
};
</script>

<style lang="less" scoped>
.divBox {
  margin: 20px auto;
  display: flex;
  justify-content: center;
}
</style>