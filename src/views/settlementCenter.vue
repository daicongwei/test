<template>
  <div class="pageBox">
    <div class="cont" style="display: none">
      <div class="title"><i class="el-icon-info"></i>课程收益情况</div>
      <div class="lineDiv">
        <p class="p1">课程总收益：</p>
        <p class="p2">3280.12元</p>
      </div>
      <div class="lineDiv">
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
        >
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="序号"  type="index">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="name" label="子公司名称"> </el-table-column>
      <el-table-column prop="money_1" label="课程总收益"> </el-table-column>
      <el-table-column prop="money_2" label="待提现金额"> </el-table-column>
      
      <el-table-column prop="name" label="操作"  >
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
  </div>
</template>

<script>
import Pagination from "../components/pagination";
export default {
  components:{
    Pagination
  },
  data(){
    return{
      tableData:[{
        name:'公司名称',
        money_1:'352.04',
        money_2:'210.00',
      }],
      total:0,
      reqop:{
        page:1,
        limit:10
      }
    }
  },
  methods: {
        pagechange(val) {
      this.reqop.page = val;
      this.tableData = [];
      // this.getData();
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