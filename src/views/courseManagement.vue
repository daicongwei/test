<template>
  <div class="pageBox">
    <div class="topDiv">
      <div class="leftBtns">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addFun"
          v-if="isZiCompany"
          >添加课程</el-button
        >
        <!-- <el-button type="danger" size="small" icon="el-icon-delete"
          >删除课程</el-button
        > -->
      </div>
      <div class="rightserach">
        <el-input
          v-model="input"
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
    >
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column label="序号" type="index" width="150">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="price" label="课程价格"></el-table-column>
      <el-table-column label="课程封面"
        ><template slot-scope="scope"
          ><img class="tabimg" :src="scope.row.courseImg" alt="" /></template
      ></el-table-column>
      <el-table-column
        prop="courseDuration"
        label="课程总时长"
      ></el-table-column>
      <el-table-column prop="introduction" label="课程简介"></el-table-column>
      <el-table-column prop="teacher" label="授课教师"></el-table-column>
      <el-table-column label="课程状态"
        ><template slot-scope="scope">{{
          scope.row.status == 1 ? "上架" : "下架"
        }}</template></el-table-column
      >

      <el-table-column prop="createTime" label="创建时间"></el-table-column>

      <el-table-column prop="name" label="操作" width="300">
        <template slot-scope="scope">
          <el-button  v-if="isZiCompany" type="text" size="small" @click="modifyFun(scope.row)">
            修改
          </el-button>
          <el-button
            v-if="scope.row.status == 1 && isZiCompany"
            type="text"
            size="small"
            @click="removeFun(scope.row)"
          >
            下架
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="detailFun(scope.row.courseId)"
          >
            课程详情
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="buyFun(scope.row.courseId)"
            v-if="isZiCompany"
          >
            购买情况
          </el-button>
          <!-- <el-button type="text" size="small" @click="deletFun(scope.row)">
              删除
            </el-button> -->
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

    <AddCourse
      ref="addcourse"
      :coursedata="courseData"
      @modifyFin="modifyFin"
    />
    <Buycourse ref="buycourse" />

    <!-- <DetailsCourse ref="detailc"  /> -->
  </div>
</template>

<script>
import AddCourse from "../components/addCourse";
import Pagination from "../components/pagination";
import Buycourse from "../components/buycourse";
// import DetailsCourse from "../components/detailsCourse";
export default {
  components: {
    AddCourse,
    Pagination,
    Buycourse
    // DetailsCourse
  },
  computed:{
    isZiCompany(){
      return this.$store.getters['user/userInfo']?.user?.role === 1 //1是子公司
    }
  },
  data() {
    return {
      input: "",
      tableData: [],
      reqop: {
        page: 1,
        limit: 10,
        sidx: "",
        order: "",
        key: "",
        status: "1",
      },
      total: 0,
      courseData: {},
    };
  },
  created() {
    this.getData();
  },

  methods: {
     pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      this.getData();
    },
    detailFun(courseId) {
      this.$router.push({
        path: "/home/detailsCourse",
        query: {
          courseId,
        },
      });
      // this.$refs['detailc'].open()
    },
    modifyFin() {
      this.reqop.page = 1;
      this.getData();
    },
    // 修改
    modifyFun(val) {
      this.courseData = val;
      this.$refs["addcourse"].open();
    },

    buyFun(id) {
      // this.courseData = val;
      this.$refs["buycourse"].open(id);
    },

    // deletFun(val){
    //    let that = this;
    //   that
    //     .$confirm("确定要删除该课程吗?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     })
    //     .then(() => {
    //       that.$net
    //     .coursesremove({
    //       queryurl: val.courseId,
    //     })
    //     .then((res) => {
    //       this.$utils.toast("下架成功", "success");
    //       this.reqop.page = 1;
    //       this.getData();
    //     })
    //     })
    //     .catch(() => {
    //       console.log(3);
    //     });
    // },
    removeFun(val) {
      let that = this;
      that
        .$confirm("确定要下架该课程吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that.$net
            .coursesremove({
              queryurl: val.courseId,
            })
            .then((res) => {
              this.$utils.toast("下架成功", "success");
              this.reqop.page = 1;
              this.getData();
            });
        })
        .catch(() => {
          console.log(3);
        });
    },
    getData() {
      this.tableData = [];
      this.$net
        .courseslist(this.reqop)
        .then((res) => {
          let data = res?.page;
          this.total = Number(data.totalCount);
          this.tableData = data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addFun() {
      this.courseData = {}
      this.$refs["addcourse"].open();
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
    adduserFun() {
      this.$refs["adduser"].open();
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  background-color: #fff;
  padding: 10px;
  /deep/.tabimg {
    height: 40px;
    object-fit: cover;
  }
  .topDiv {
    display: flex;
    padding-top: 5px;
    justify-content: space-between;
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