<template>
  <div>
    <el-dialog
      title="课程购买情况"
      :visible.sync="dialogShow"
      @open="open"
      @close="close"
    >
      <el-table :data="tableData">
        <el-table-column
          property="username"
          label="用户姓名"
        ></el-table-column>
        <el-table-column
          property="idCardNo"
          label="身份证号"
        ></el-table-column>
        <el-table-column
          property="mobile"
          label="电话"
        ></el-table-column>
        <el-table-column
          property="studyDuration"
          label="已学习时长"
        ><template slot-scope="scope">{{
          scope.row.studyDuration 
        }}分钟</template>
        </el-table-column>
        <el-table-column property="learnCondition" label="	学习情况">
            <template slot-scope="scope">
                <span v-if="scope.row.learnCondition == 1 ">未完成 </span>
                <span v-else-if="scope.row.learnCondition == 2 ">已完成 </span>
                <span v-else>未学习 </span>
            </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="tableData.length"
        :total="total"
        :currentpage="reqop.page"
        :pagesize="reqop.limit"
        @pagechange="pagechange"
      />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "./pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      dialogShow: false,
      tableData: [],
      total: 0,
      reqop: {
        page: 1,
        limit: 10,
        courseId: "",
      },
    };
  },
  mounted() {
    //   this.getData()
  },

  methods: {
       pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      this.getData();
    },
    getData() {
      this.tableData = [];
      this.$net
        .courselearnCond(this.reqop)
        .then((res) => {
          let data = res?.data;
          this.total = Number(data.totalCount);
          this.tableData = data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open(id) {
      if (id) {
        this.reqop.courseId = id;
        this.getData();
      }
      this.dialogShow = true;
    },
    close() {
      this.dialogShow = false;
    },
  },
};
</script>

<style>
</style>