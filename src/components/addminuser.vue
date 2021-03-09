<template>
  <div>
    <el-dialog
      :title="diaTitle"
      :visible.sync="ishow"
      width="35%"
      center
      @open="open"
      @close="close"
    >
      <div class="addBox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <!-- <el-input v-model="ruleForm.role"></el-input> -->
            <el-radio-group v-model="ruleForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="ruleForm.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCardNo">
            <el-input
              v-model="ruleForm.idCardNo"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="	车牌号" prop="licensePlateNumber">
            <el-input
              v-model="ruleForm.licensePlateNumber"
              placeholder="请输入车牌号"
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
        <el-button type="primary" @click="close"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["userdata"],
  data() {
    return {
      ishow: false,
      companyData: [],
      diaTitle:'',
      ruleForm: {
        username: "小程序用户1",
        gender: "1",
        age: "18",
        mobile: "13685243569",
        password: "123456",
        idCardNo: "11111222233333",
        licensePlateNumber: "贵C46546",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        idCardNo: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        licensePlateNumber: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$utils.isPhone(this.ruleForm.mobile);
      this.$utils.isIdcard(this.ruleForm.idCardNo);
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.sumbit();
        } else {
          this.$utils.toast("用户信息不能为空");
          return false;
        }
      });
    },
    sumbit() {
      if (this.userdata?.userId) {
        this.$net
          .trainupdate(this.ruleForm)
          .then((res) => {
            this.$utils.toast("修改成功", "success");
            this.close();
            this.emptydata();
            this.$emit("modifyFin", 1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$net
          .addtrainuser(this.ruleForm)
          .then((res) => {
            this.$utils.toast("添加成功", "success");
            this.close();
            this.emptydata();
            this.$emit("modifyFin", 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    emptydata() {
      let obj = this.ruleForm;
      for (const key in obj) {
        obj[key] = "";
      }
    },

    getcompanyData() {
      this.companyData = [];
      this.$net
        .companyList({
          page: 1,
          limit: 1000,
        })
        .then((res) => {
          let data = res?.page;
          this.companyData = data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open() {
      this.ruleForm = { ...this.userdata };
      this.diaTitle = this.userdata.userId?'修改小程序用户':'添加小程序用户'
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