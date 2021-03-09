<template>
  <div class="pageBox">
    <div class="topDiv">
      <!-- <div class="leftBtns">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addFun"
          >添加公司</el-button
        >
         <el-button type="danger" size="small" icon="el-icon-delete"
          >删除公司</el-button
        > 
      </div> -->
      <!-- <div class="rightserach">
        <el-input
          v-model="reqop.key"
          style="margin-right: 10px"
          size="small"
          placeholder="请输入公司名称关键字"
        ></el-input>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="searchFun"
          >搜索</el-button
        >
      </div> -->
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <!-- <el-table-column label="序号" type="index" width="120"> -->
          <!-- <template slot-scope="scope">{{ scope }}</template> -->
        <!-- </el-table-column> -->
        <el-table-column prop="id" label="日志ID"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="operation" label="	用户操作" width="300">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
        <el-table-column prop="ip" label="IP地址"> </el-table-column>
        <!-- <el-table-column prop="mobile" label="联系电话"> </el-table-column>
        <el-table-column prop="companyAccount" label="公司提现账户">
        </el-table-column>
        <el-table-column prop="name" label="学习人数"> </el-table-column>
        <el-table-column prop="name" label="未学习人数"> </el-table-column>
        <el-table-column prop="name" label="已学习人数"> </el-table-column> -->

        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modify(scope.row)">
              修改
            </el-button>
            <el-button type="text" size="small" @click="delet(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <Pagination
        v-show="tableData.length"
        :total="total"
        :currentpage="reqop.page"
        :pagesize="reqop.limit"
        @pagechange="pagechange"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "../components/pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      input: "",
      tableData: [],
      multipleSelection: [],

      reqop: {
        page: 1,
        limit: 10,
        sidx: "",
        order: "",
        key: "",
      },
      total: 0,
      companyData: null,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    modifyFin() {
      this.getData();
    },
    modify(val) {
      this.companyData = val;
      this.$refs["addCompany"].open();
    },

    delet(val) {
      // e.companyId
      let that = this;
      that
        .$confirm("删除后不能恢复，确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.sureDelFun(val.companyId)
         
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          console.log(3);
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      // companydel
    },

    sureDelFun(id=0) {
      console.log(2);
      this.$net
        .companydel({
          queryurl: id,
        })
        .then((res) => {
          this.$utils.toast('删除成功','success')
          this.reqop.page = 1
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchFun() {
      this.reqop.page = 1;
      this.getData();
    },


    getData() {
      this.tableData = [];
      this.$net
        .sysloglist(this.reqop)
        .then((res) => {
          let data = res?.page;
          this.total = Number(data.totalCount);
          this.tableData = data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      this.getData();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    addFun() {
      this.companyData = {};
      this.$refs["addCompany"].open();
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  background-color: #fff;
  padding: 10px;
  .topDiv {
    display: flex;
    padding-top: 5px;
    justify-content: space-between;
    margin-bottom: 20px;
    .leftBtns {
      display: flex;
      justify-content: space-between;
      el-button {
        margin-right: 15px;
      }
    }
    .rightserach {
      display: flex;
    }
  }
}
</style>