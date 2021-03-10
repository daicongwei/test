<template>
  <div class="home">
    <div class="leftNav">
      <div class="logo"><h3>线上驾驶员后台系统</h3></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#393d49"
        text-color="#fff"
        active-text-color="#1890ff"
        router
      >
        <el-menu-item index="/home/index" v-if="isZiCompany">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/home/courseManagement">
          <i class="el-icon-menu"></i>
          <span slot="title">课程列表</span>
        </el-menu-item>

        <el-menu-item index="/home/companyManagement" v-if="!isZiCompany">
          <i class="el-icon-menu"></i>
          <span slot="title">子公司管理</span>
        </el-menu-item>

        <el-menu-item index="/home/userManagement" v-if="!isZiCompany">
          <i class="el-icon-setting"></i>
          <span slot="title">系统用户管理</span>
        </el-menu-item>
        <el-menu-item index="/home/minuser">
          <i class="el-icon-setting"></i>
          <span slot="title">小程序用户管理</span>
        </el-menu-item>
        <el-menu-item index="/home/settlementCenter">
          <i class="el-icon-setting"></i>
          <span slot="title">结算中心</span>
        </el-menu-item>
        <el-menu-item index="/home/journal" v-if="!isZiCompany">
          <i class="el-icon-setting"></i>
          <span slot="title">日志管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="rightBox">
      <div class="headDiv">
        <div class="leftdiv"></div>
        <div class="rightdiv">
          <div class="imgb">
            <img
              class="img"
              :src="userImg"
              alt=""
            />
          </div>
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <span class="el-dropdown-link">
              <h3 style="line-height: 60px">
                {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </h3>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">退出登录</el-dropdown-item>
              <el-dropdown-item command="2">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
      
    </div>
    <ModifyPass ref="pass" />
  </div>
</template>

<script>
import ModifyPass from "../components/modifyPass";
export default {
  name: "Home",
  components: {
    ModifyPass
  },
  data(){
    return {
      userImg:require('../assets/siji.jpg')
    }
  },

  computed:{
    isZiCompany(){
      return this.$store.getters['user/userInfo']?.user?.role === 1 //1是子公司
    },
    userInfo(){
      return this.$store.getters['user/userInfo']?.user
    }
  },
  mounted(){
  },

  methods: {
    handleCommand(e) {
      e = Number(e);
      switch (e) {
        case 1:
          //退出登录
          this.$net
            .logout()
            .then((res) => {
              this.$router.push("/login");
              // this.$utils.toast("添加成功", "success");
              // this.close();
              // this.emptydata()
              // this.$emit('modifyFin',1)
            })
            .catch((err) => {
              console.log(err);
            });

          break;
        case 2:
          //修改密码
          this.$refs['pass'].open()

          break;

        default:
          break;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  height: 100%;
  .leftNav {
    width: 200px;
    background-color: #393d49;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    /deep/.el-menu {
      border-right: none;
    }
    .logo {
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
  .rightBox {
    flex: 1;
    display: flex;
    flex-direction: column;
    .content {
      background-color: #f4f4f4;
      padding: 15px;
      flex: 1;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .headDiv {
      padding: 0 30px;

      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      .rightdiv {
        display: flex;
        justify-content: center;
        align-content: center;
        .imgb {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 10px;
          margin-right: 10px;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
