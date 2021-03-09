<template>
  <div class="pageBox">
    <div class="topDiv">
      <div class="leftBtns">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addminuserFun"
          v-if="isZiCompany"
          >添加用户</el-button
        >
        <!-- <el-button type="danger"  size="small" icon="el-icon-delete">删除用户</el-button> -->
      </div>
      <div class="rightserach">
        <el-input
          v-model="reqop.key"
          style="margin-right: 10px"
          size="small"
          placeholder="请输入身份证号"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchFun"
          >搜索</el-button
        >
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="序号" width="120" type="index">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="licensePlateNumber" label="绑定车辆">
      </el-table-column>
      <el-table-column prop="idCardNo" label="身份证号"> </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">{{
          scope.row.gender == 1 ? "男" : "女"
        }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间"> </el-table-column>
      <el-table-column prop="name" label="操作" width="120" v-if="isZiCompany">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="modifyFun(scope.row)"
            >修改</el-button
          >
          <el-button  type="text" size="small" @click="dimissionFun(scope.row)"
            >离职</el-button
          >
          <el-button type="text" size="small" @click="deletFun(scope.row)"
            >删除</el-button
          >
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
    <Addminuser
      ref="addminuser"
      @modifyFin="modifyFin"
      :userdata="minUserData"
    />
  </div>
</template>

<script>
import Addminuser from "../components/addminuser";
import Pagination from "../components/pagination";
export default {
  components: {
    Addminuser,
    Pagination,
  },
     computed:{
    isZiCompany(){
      return this.$store.state.user?.userInfo?.user?.role === 1 //1是子公司
    }
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      total: 0,
      reqop: {
        page: 1,
        limit: 10,
        sidx: "",
        order: "",
        key:''
      },
      minUserData: {},
    };
  },
  created() {
    this.getData();
  },

  methods: {
    dimissionFun(e) {
      let that = this;
      that
        .$confirm("确定离职吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$net
            .traindimission({
              queryurl: e.userId,
            })
            .then((res) => {
              this.$utils.toast("离职成功", "success");
              this.reqop.page = 1;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
    // 修改
    modifyFun(val) {
      this.minUserData = val;
      this.$refs["addminuser"].open();
    },
    // 删除
    deletFun(val) {
      let that = this;
      that
        .$confirm("删除后不能恢复，确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.sureDelFun(val.userId);
        })
        .catch(() => {
          console.log(3);
        });
      //
    },
    sureDelFun(userId) {
      this.$net
        .traindelete({
          queryurl: userId,
        })
        .then((res) => {
          this.$utils.toast("删除成功", "success");
          this.reqop.page = 1;
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchFun(){
      this.reqop.page = 1;
          this.getData();
    },
    modifyFin() {
      this.reqop.page = 1;
      this.getData();
    },
    pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      this.getData();
    },

    getData() {
      this.tableData = [];
      this.$net
        .trainlist(this.reqop)
        .then((res) => {
          let data = res?.page;
          this.total = Number(data.totalCount);
          // data.list.map((item) => {
          //   item.password_show = "********";
          // });
          this.tableData = data.list;
        })
        .catch((err) => {
          console.log(err);
        });
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

    addminuserFun() {
      this.$refs["addminuser"].open();
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