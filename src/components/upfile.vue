<template>
  <div>
    <el-upload
      action="http://192.168.0.22:8080/sys/oss/upload"
      list-type="picture-card"
      :headers="headers"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-preview="handlePictureCardPreview"
      :on-change="handleChange"
      :fileList="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["logo"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      headers: {},
    };
  },
  watch: {
    logo: function (nel, oel) {
      console.log(nel, 555);
      this.logoFun(nel);
    },
  },
  mounted() {
    this.logoFun(this.logo);
    this.headers.token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : "";
  },
  methods: {
    logoFun(val) {
      this.fileList = [];
      if (val) {
        this.fileList.push({
          name: val,
          url: val,
        });
      }
    },
    handleRemove(file, fileList) {
      //   console.log(file, fileList);
      //   this.ruleForm.courseImg = ''
      this.$emit("fileChangeFun", "");
    },
    handleSuccess(file, fileList) {
      //   console.log(file, fileList);
      //   this.ruleForm.courseImg = file.url;
      this.$emit("fileChangeFun", file.url);
    },
    handleError(file, fileList) {
      this.$utils.toast("上传失败，请重新上传！", "success");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]; // 这一步，只保留一张图片
      }
    },
  },
};
</script>

<style>
</style>