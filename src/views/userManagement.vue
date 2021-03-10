<template>
  <div class="pageBox">
    <div class="topDiv">
      <div class="leftBtns">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="adduserFun"
          v-if="!isZiCompany"
          >添加用户</el-button
        >
        <!-- <el-button type="danger" size="small" icon="el-icon-delete"
          >删除用户</el-button
        > -->
      </div>
      <div class="rightserach">
        <el-input
          v-model="reqop.input"
          style="margin-right: 10px"
          size="small"
          placeholder="请输入内容"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search"
          >搜索</el-button
        >
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column label="序号" type="index" width="150">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="password_show" label="用户密码"> </el-table-column>
      <el-table-column prop="companyName" label="所属公司"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="createTime" label="添加时间"> </el-table-column>
      <el-table-column prop="createTime" label="操作" v-if="!isZiCompany">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openFun(scope.row)">
            {{ scope.row.status == 1 ? "禁用" : "开启" }}
          </el-button>
          <!-- <el-button type="text" size="small" @click="modifypass(scope.row)">
            修改密码
          </el-button> -->
          <el-button type="text" size="small" @click="modifyUser(scope.row)">
            修改
          </el-button>
          <el-button type="text" size="small" @click="delet(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="身份证号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="操作" width="120"> </el-table-column> -->
    </el-table>
    <Pagination
      v-show="tableData.length"
      :total="total"
      :currentpage="reqop.page"
      :pagesize="reqop.limit"
      @pagechange="pagechange"
    />
    <AddUser ref="adduser" :userdata="userdata" 
      @modifyFin="modifyFin" />

   
  </div>
</template>

<script>
import AddUser from "../components/addUser";
import Pagination from "../components/pagination";
export default {
  components: {
    AddUser,
    Pagination,
  },
   computed:{
    isZiCompany(){
      return this.$store.getters['user/userInfo']?.user?.role === 1 //1是子公司
    }
  },
  data() {
    return {
      userdata: {},
      tableData: [],
      total: 0,
      reqop: {
        page: 1,
        limit: 10,
        sidx: "",
        order: "",
      },
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
     modifyFin() {
      this.reqop.page = 1
      this.getData();
    },
   
    
    delet(val) {
      let that = this;
      that
        .$confirm("删除后不能恢复，确定删除该用户吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$net
            .userdel({
              queryurl: val.userId,
            })
            .then((res) => {
              this.$utils.toast("删除成功", "success");
              this.reqop.page = 1;
              this.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log(3);
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    openFun(val) {
      const that = this;
      let ad = val.status == 1 ? "禁用" : "开启";
      let content = `确定要${ad}该用户吗？`;
      this.$confirm(content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.$net
            .userforbidden({
              userId: val.userId,
              status: val.status == 1 ? 0 : 1,
            })
            .then((res) => {
              that.$utils.toast(`${ad}成功`, "success");
              this.reqop.page = 1;
              this.getData();
            });
        })
        .catch(() => {});
    },

    pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      this.getData();
    },
    getData() {
      this.tableData = [];
      this.$net
        .userList(this.reqop)
        .then((res) => {
          let data = res?.page;
          this.total = Number(data.totalCount);
          data.list.map((item) => {
            item.password_show = "********";
          });
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    adduserFun() {
      this.userdata = {}
      this.$refs["adduser"].open();
    },
     modifyUser(val){
       val.password = ''
        this.userdata = val;
      this.$refs["adduser"].open();
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