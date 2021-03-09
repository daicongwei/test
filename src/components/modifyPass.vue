<template>
  <div>
    <el-dialog title="修改用户密码" :visible.sync="dialogShow" width="30%"  @open="open"
      @close="close">
      <el-form :model="form">
        <el-form-item label="原密码" label-width="100" required>
          <el-input
            v-model="form.password"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100" required>
          <el-input
            v-model="form.newPassword"
            placeholder="请输入新密码,8到16位"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
      form: {
        password: "",
        newPassword: "",
      },
    };
  },
  methods: {
    dialogFun() {
      this.$utils.isempty(this.form.password, "原密码不能为空");
      this.$utils.isempty(this.form.newPassword, "新密码不能为空");
      this.$net
        .userpassword(this.form)
        .then((res) => {
          this.$utils.toast("修改成功", "success");
          this.dialogShow = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
      open() {
      this.dialogShow = true;
    },
    close() {
      this.dialogShow = false;
    },
  },
};
</script>

<style>
</style>