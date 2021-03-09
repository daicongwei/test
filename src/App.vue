<template>
  <div id="app">
  <!-- <Home  /> -->
  <!-- <Home v-if="isLogin" /> -->
  <!-- <Login v-else/> -->
  <!-- <router-link to="/login" /> -->
  <router-view/>
  </div>
</template>
<script>
import Home from "./views/Home";
import Login from "./views/login";
// import { mapGetters } from "vuex";
export default {
  components:{
    Home,
    Login
  },
  mounted(){
    
  },
  
computed: {
  // ...mapGetters(["userInfo"]),  //  数组模式
  isLogin () {
    return this.$store.state.user.userInfo.token;　　//需要监听的数据
  }
},
// watch: {
//   isLogin (newVal, oldVal) {
//     console.log(888888888888);
//     console.log(newVal,oldVal);
//   }
// },

  
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  // position: absolute;
  // top: 0;
  // left: 0;
  // height: 100%;
  // width: 100%;
  
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
}

</style>
