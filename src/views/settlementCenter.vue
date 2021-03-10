<template>
  <div class="pageBox">
    <div class="cont" v-if="isZiCompany">
      <div class="title"><i class="el-icon-info"></i>课程收益情况</div>
      <div class="lineDiv">
        <p class="p1">课程总收益：</p>
        <p class="p2">{{ownData.totalRevenue}}元</p>
      </div>
      <!-- <div class="lineDiv">
        <p class="p1">待提现金额：</p>
        <p class="p4">3280.12元</p>
      </div>
      <div class="btns">
        <el-button
          style="width: 100px"
          type="primary"
          size="small"
          @click="withdrawFun"
          >提现</el-button
        > -->
      <!-- </div> -->
    </div>
    <div v-if="!isZiCompany">
      <div class="ownDiv">
        <div>
          总公司名称： <span style="color:#313131">{{ ownData.companyName }}</span>
        </div>
        <div class="div1">
          总课程收益：<span class="span1">{{ ownData.totalRevenue }}</span> 元
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <!-- <el-table-column label="序号" type="index"> -->
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        <!-- </el-table-column> -->
        <el-table-column prop="companyName" label="子公司名称"> </el-table-column>
        <el-table-column  label="课程总收益">
            <template slot-scope="scope">
              {{scope.row.totalRevenue}}元
          </template>
           </el-table-column>
        <!-- <el-table-column prop="money_2" label="待提现金额"> </el-table-column> -->

        <!-- <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="modifyFun(scope.row)"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="dimissionFun(scope.row)"
              >离职</el-button
            >
            <el-button type="text" size="small" @click="deletFun(scope.row)"
              >删除</el-button
            >
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
      tableData: [],
      ownData: {},
      total: 0,
      reqop: {
        page: 1,
        limit: 10,
        sidx: "",
        order: "",
      },
    };
  },
  computed: {
    isZiCompany() {
      return this.$store.getters["user/userInfo"]?.user?.role === 1; //1是子公司
    },
  },
  mounted() {
    console.log(this.$store.getters["user/userInfo"]?.user?.role === 1);
    this.getData();
  },
  methods: {
    getData() {
      this.$net
        .settleaccounts(this.reqop)
        .then((res) => {
          console.log(res);
          this.ownData = res.own;
          let data = res?.page?.list;
          if (data?.length) {
            this.tableData = data;
          }
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
    withdrawFun() {
      alert("提现接口");
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  .ownDiv {
    margin-bottom: 20px;
    display: flex;
    padding: 20px;
    font-size: 15px;
    border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
    color: #999;
    .div1 {
      margin-left: 30px;
      .span1 {
        color: #409eff;
      }
    }
  }
  .cont {
    width: 300px;
    margin-left: 100px;
    padding-top: 40px;
    .title {
      background-color: rgb(244, 244, 245);
      border-radius: 4px;
      line-height: 40px;
      text-indent: 10px;
      margin-bottom: 30px;
      color: rgba(0, 0, 0, 0.5);
      i {
        margin-right: 10px;
      }
    }

    .btns {
      margin-top: 20px;
    }
    .lineDiv {
      display: flex;
      line-height: 40px;
      .p4 {
        color: rgb(7, 193, 96);
      }
    }
  }
}
</style>