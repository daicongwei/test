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
          <el-form-item label="用户名" prop="username" >
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input v-model="ruleForm.password" placeholder="长度8到16位"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户角色" prop="role" >
            <el-radio-group v-model="ruleForm.role">
              <el-radio :label="0">主公司</el-radio>
              <el-radio :label="1">子公司</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="联系方式" prop="mobile" >
            <el-input v-model="ruleForm.mobile" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item
            label="所属公司"
            prop="companyId"
          >
            <!-- <el-input v-model="ruleForm.companyId"></el-input> -->
            <el-select
              v-model="ruleForm.companyId"
              placeholder="请选择所属公司"
            >
              <el-option
                :label="item.companyName"
                :value="item.companyId"
                v-for="item in companyData"
                :key="item.companyId"
              ></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
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
  props:['userdata'],
  data() {
    return {
      ishow: false,
      companyData: [],
      diaTitle:'添加用户',
      ruleForm: {
        username: "",
        password: "",
        // role: "",
        mobile: "",
        companyId: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // role: [{ required: true, message: "请选择用户角色", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        companyId: [
          { required: true, message: "请选择所属公司", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      //  this.$utils.isPhone(this.ruleForm.mobile)
      // if (this.ruleForm.role == 1) {
        this.$utils.isempty(this.ruleForm.companyId, "请选择所属公司");
      // }
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.sumbit();
        } else {
          this.$utils.toast("公司信息不能为空");
          return false;
        }
      });
    },
    sumbit() {
      if(this.userdata?.userId){
        this.$net
        .userupdate(this.ruleForm)
        .then((res) => {
          this.$utils.toast("修改成功", "success");
          this.close();
          this.emptydata()
          this.$emit('modifyFin',1)
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
      this.$net
        .userSave(this.ruleForm)
        .then((res) => {
          this.$utils.toast("添加成功", "success");
          this.close();
          this.emptydata()
          this.$emit('modifyFin',1)
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },

    emptydata(){
      let obj = this.ruleForm;
      for (const key in obj) {
        obj[key] = ''
      }
    },

    getcompanyData() {
      this.companyData = [];
      this.$net
        .companyall()
        .then((res) => {
          // let data = res?.data;
          this.companyData = res?.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    open() {
      this.ruleForm = { ...this.userdata };
      this.diaTitle = this.userdata?.userId?'修改系统用户':'添加系统用户'
      this.getcompanyData();
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