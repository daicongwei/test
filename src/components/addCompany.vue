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
          <el-form-item label="分账账户类型" prop="companyAccountType">
            <el-select v-model="ruleForm.companyAccountType" placeholder="请选择公司分账账户类型" @change="accountchange">
            <el-option label="微信商户号" value="MERCHANT_ID"></el-option>
            <el-option label="微信个人账户" value="PERSONAL_OPENID"></el-option>
          </el-select>
            <!-- <el-input
              v-model="ruleForm.introduction"
              type="textarea"
              placeholder="请输入公司简介"
            ></el-input> -->
          </el-form-item>
          
          <el-form-item label="公司账户" prop="companyAccount">
            <el-input
              v-model="ruleForm.companyAccount"
              :placeholder="placeholderText"
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
          <el-form-item label="公司logo图片" required>
            <!-- <el-input
              v-model="ruleForm.logo"
              placeholder="请输入公司logo地址"
            ></el-input> -->
            <Upfile :logo="ruleForm.logo" @fileChangeFun="fileChangeFun" />
           
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
import Upfile from "./upfile";
export default {
  components:{
    Upfile
  },
  props: {
    companydata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ishow: false,
      placeholderText:'请输入微信商户号',
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
        companyAccountType: [
          { required: true, message: "请选择公司分账账户类型", trigger: "blur" },
        ],
        // logo: [
        //   { required: true, message: "请输入logo图片地址", trigger: "blur" },
        // ],
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
        companyAccountType:'',
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
   mounted() {
    
  },

  methods: {
    accountchange(e){
      // console.log(e);
      this.placeholderText = (e == 'MERCHANT_ID')?'请输入微信商户号':'请填写微信个人账户openid';
    },
    fileChangeFun(e){
      // console.log(e);
      this.ruleForm.logo = e
    },

    submitForm(ruleForm) {
      // console.log(this.ruleForm);
      //  this.$utils.isPhone(this.ruleForm.mobile)
      let num = Number(this.ruleForm.profitSharing);
      if (num < 1 && num > 0) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$utils.isempty(this.ruleForm.logo,'请上传公司logo')
            console.log(this.ruleForm);
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