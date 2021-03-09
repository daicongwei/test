<template>
  <div class="pageBox">
    <div class="topDiv">
      <div class="leftBtns">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addFun"
          >添加单节课程</el-button
        >
        <!-- <el-button type="danger" size="small" icon="el-icon-delete"
          >删除课程</el-button
        > -->
      </div>
      <!-- <div class="rightserach">
        <el-input
          v-model="input"
          style="margin-right: 10px"
          size="small"
          placeholder="请输入内容"
        ></el-input>
        <el-button type="primary" size="small" icon="el-icon-search"
          >搜索</el-button
        >
      </div> -->
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
      <el-table-column prop="cataName" label="单节课程名称"> </el-table-column>
      <el-table-column prop="cataDuration" label="单节时长"></el-table-column>
      <el-table-column prop="videoLink" label="视频链接地址"></el-table-column>
      <!-- <el-table-column label="课程封面"
        ><template slot-scope="scope"
          ><img class="tabimg" :src="scope.row.courseImg" alt="" /></template
      ></el-table-column> -->
      <!-- <el-table-column
        prop="courseDuration"
        label="课程总时长"
      ></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间"></el-table-column>
      <!-- <el-table-column label="课程状态"
        ><template slot-scope="scope">{{
          scope.row.status == 1 ? "上架" : "下架"
        }}</template></el-table-column
      > -->

      <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->

      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="modifyFun(scope.row)">
            修改
          </el-button>
          <el-button type="text" size="small" @click="deletFun(scope.row)">
              删除
            </el-button>
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
<AddCourseSingle ref="addcourse" 
      :coursedata="courseData" @modifyFin="modifyFin" />
  
    <!-- <DetailsCourse ref="detailc"  /> -->
  </div>
</template>

<script>
import AddCourseSingle from "../components/addCourse_single";
import Pagination from "../components/pagination";
// import DetailsCourse from "../components/detailsCourse";
export default {
  components: {
    AddCourseSingle,
    Pagination
    // DetailsCourse
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
        courseId:''
      },
      total: 0,
      courseData: {},
    };
  },
  created() {
    let id = this.$route.query.courseId;
    this.reqop.courseId = Number(id)
    this.getData();
  },

  methods: {
     pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      this.getData();
    },
    deletFun(val) {
      let that = this;
      that
        .$confirm("确定要删除该课程吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that.$net
            .coursecatalogdelete({
              queryurl: val.id,
            })
            .then((res) => {
              this.$utils.toast("删除成功", "success");
              this.reqop.page = 1;
              this.getData();
            });
        })
        .catch(() => {
          console.log(3);
        });
    },
    detailFun() {
      this.$router.push("/home/detailsCourse");
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
        .$confirm("确定要下架该吗?", "提示", {
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
        .coursecataloglist(this.reqop)
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