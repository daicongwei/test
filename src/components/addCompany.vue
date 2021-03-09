<template>
  <div>
    <el-dialog
      title="新增公司"
      :visible.sync="ishow"
      width="40%"
      center
      @open="open"
      @close="close"
    >
      <div class="addBox">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="150px"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="公司名称" prop="companyName">
            <el-input
              v-model="ruleForm.companyName"
              placeholder="请输入公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input
              v-model="ruleForm.address"
              placeholder="请输入公司地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司简介" prop="introduction">
            <el-input
              v-model="ruleForm.introduction"
              type="textarea"
              placeholder="请输入公司简介"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司logo图片地址" prop="logo">
            <el-input
              v-model="ruleForm.logo"
              placeholder="请输入公司logo地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司账户" prop="companyAccount">
            <el-input
              v-model="ruleForm.companyAccount"
              placeholder="请输入公司账户"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司电话" prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              type="number"
              placeholder="请输入公司电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="利润分成比例" prop="profitSharing">
            <el-input
              v-model="ruleForm.profitSharing"
              type="number"
              placeholder="请输入利润分成比例,0到1之间"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sumbit()"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    companydata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ishow: false,
      rules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入公司地址", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入公司简介", trigger: "blur" },
        ],
        logo: [
          { required: true, message: "请输入logo图片地址", trigger: "blur" },
        ],
        companyAccount: [
          { required: true, message: "请输入公司账户", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入公司电话", trigger: "blur" },
        ],
        profitSharing: [
          {
            required: true,
            message: "请输入利润分成比例,0到1之间",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {
        companyName: "",
        address: "",
        introduction: "",
        logo: "",
        companyAccount: "",
        mobile: "",
        profitSharing: "",
      },
    };
  },
  mounted() {},

  methods: {
    submitForm(ruleForm) {
      //  this.$utils.isPhone(this.ruleForm.mobile)
      let num = Number(this.ruleForm.profitSharing);
      if (num < 1 && num > 0) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.sumbit();
          } else {
            this.$utils.toast("公司信息不能为空");
            return false;
          }
        });
      } else {
        this.$utils.toast("利润分成比例必须是0到1之间的数");
      }
    },
    emptydata(){
      let obj = this.ruleForm;
      for (const key in obj) {
        obj[key] = ''
      }
    },
    sumbit() {
      if (this.companydata?.companyId) {
        this.$net
          .companyupdate(this.ruleForm)
          .then((res) => {
            this.$utils.toast("修改成功", "success");
            this.$emit('modifyFin',1)
            this.close();
            this.emptydata()
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$net
          .companyAdd(this.ruleForm)
          .then((res) => {
            this.$utils.toast("添加成功", "success");
            this.close();
            this.$emit('modifyFin',1)
            this.emptydata()
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return;
    },
    open() {
      this.ruleForm = { ...this.companydata };
      this.ishow = true;
    },
    close() {
      this.ishow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.addBox {
  padding-right: 30px;
}
</style>