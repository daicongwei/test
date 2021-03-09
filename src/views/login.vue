<template>
  <div class="pageBox">
    <div class="rightBOx">
      <div class="contentBox">
        <h1 class="h1">hello !</h1>
        <el-form ref="form" :model="form" :rules="rules" action="javascript:;">
          <el-form-item prop="username">
            <div class="indiv">
              <i class="el-icon-user"></i>
              <input v-model="form.username" placeholder="请输入用户名" />
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="indiv">
              <i class="el-icon-lock"></i>
              <input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('form')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456789",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "密码必须是8-16位 ", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.onSubmit()

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit() {
      this.$net
        .login(this.form)
        .then((res) => {
          this.$utils.toast('登录成功','success')
            this.$store.commit('user/SET_USERINFO',res)
            localStorage.setItem('user', JSON.stringify(res));
             this.$router.push('/home')
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.pageBox {
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  overflow: hidden;
  .h1 {
    margin-bottom: 30px;
    font-size: 50px;
  }
  .rightBOx {
    height: 100%;
    position: relative;
    left: 60%;
    width: 500px;
    margin-right: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/.btn {
      width: 150px;
    }
    /deep/.indiv {
      width: 250px;
      height: 50px;
      display: flex;
      align-items: center;
      background-color: #f6f4fc;
      padding: 0 20px;
      border-radius: 6px;
      i {
        font-size: 22px;
        margin-right: 10px;
        font-size: #999;
      }
      input {
        height: 40px;
        background: none;
        border: none;
        outline-style: none;
      }
    }
  }
}
</style>