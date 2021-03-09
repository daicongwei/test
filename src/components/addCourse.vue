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
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="课程名称" prop="courseName">
            <el-input
              v-model="ruleForm.courseName"
              placeholder="请输入课程名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程价格" prop="price">
            <el-input
              v-model="ruleForm.price"
              placeholder="请输入课程价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程总时长（分钟）" prop="courseDuration">
            <el-input
              v-model="ruleForm.courseDuration"
              placeholder="请输入课程总时长（分钟）"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="introduction">
            <el-input
              type="textarea"
              v-model="ruleForm.introduction"
              placeholder="请输入课程简介"
            ></el-input>
          </el-form-item>

          <el-form-item label="授课教师" prop="teacher">
            <el-input
              v-model="ruleForm.teacher"
              placeholder="请输入授课教师"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程封面图片" prop="teacher">
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
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["coursedata"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],

      ishow: false,
      diaTitle:'',
      companyData: [],
      ruleForm: {
        courseName: "课程1",
        courseImg: "",
        price: "108.00",
        courseDuration: "20",
        introduction: "精灵盛典荆防颗粒吉林省大街坊邻居",
        teacher: "李永乐",
      },
      rules: {
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入课程价格", trigger: "blur" }],
        courseDuration: [
          { required: true, message: "课程总时长（分钟）", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入课程简介", trigger: "blur" },
        ],
        teacher: [
          { required: true, message: "请输入授课教师", trigger: "blur" },
        ],
      },
      headers: {},
    };
  },
  mounted() {
    this.headers.token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : "";
  },
  methods: {

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.courseImg = ''
    },
    handleSuccess(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.courseImg = file.url;
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

    submitForm(ruleForm) {
      // this.$utils.isPhone(this.ruleForm.mobile);
      // this.$utils.isIdcard(this.ruleForm.idCardNo);
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.sumbit();
        } else {
          this.$utils.toast("课程信息不能为空");
          return false;
        }
      });
    },
    sumbit() {
      this.$utils.isempty(this.ruleForm.courseImg, "请上传课程封面图片");
      if (this.coursedata?.courseId) {
        this.$net
          .coursesupdate(this.ruleForm)
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
          .addcourses(this.ruleForm)
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
      this.ruleForm = { ...this.coursedata };
      this.fileList = [{ url: this.coursedata.courseImg }];
      this.diaTitle = this.coursedata.courseId?'修改课程':'添加课程'
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