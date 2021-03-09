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
          <el-form-item label="单节课程名称" prop="cataName">
            <el-input
              v-model="ruleForm.cataName"
              placeholder="请输入单节课程名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="单节时长（分钟）" prop="cataDuration">
            <el-input
              v-model="ruleForm.cataDuration"
              placeholder="请输入单节时长（分钟）"
            ></el-input>
            </el-form-item>
          <el-form-item label="课程排序" prop="sort">
            <el-input
              v-model="ruleForm.sort"
              placeholder="请输入课程排序值"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="视频链接地址" prop="videoLink">
            <el-input
              v-model="ruleForm.videoLink"
              placeholder="请输入视频链接地址"
              type="number"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="课程视频"  required>
            <el-upload
              class="upload-demo"
              action="http://192.168.0.22:8080/sys/oss/upload"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-preview="handlePictureCardPreview"
              :on-change="handleChange"
              :fileList="fileList"
            >
              <el-button size="small" type="">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传视频文件</div> -->
            </el-upload>
            <!-- <el-upload
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
            </el-upload> -->
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
      diaTitle: "",
      companyData: [],

      ruleForm: {
        cataName: "单节课程1",
        cataDuration: "10",
        courseId: "",
        videoLink: "",
      },

      rules: {
        cataName: [
          { required: true, message: "请输入单节课程名称", trigger: "blur" },
        ],
        cataDuration: [
          {
            required: true,
            message: "请输入单节时长（分钟）",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入课程排序值",
            trigger: "blur",
          },
        ],
        // videoLink: [
        //   { required: true, message: "视频链接地址", trigger: "blur" },
        // ],
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
      this.ruleForm.videoLink = "";
    },
    handleSuccess(file, fileList) {
      console.log(file, fileList);
      this.ruleForm.videoLink = file.url;
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
      console.log( this.ruleForm);
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
      this.$utils.isempty(this.ruleForm.videoLink, "请上传课程视频");
      if (this.coursedata?.courseId) {
        this.$net
          .coursecatalogupdate(this.ruleForm)
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
          .coursecatalogsave(this.ruleForm)
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

    open() {
      this.ruleForm = { ...this.coursedata };
      let id = this.$route.query.courseId;
      this.ruleForm.courseId = id
      if(this.coursedata.videoLink){
        this.fileList = [{ url: this.coursedata.videoLink ,name:this.coursedata.videoLink}];
      }
      
      this.diaTitle = this.coursedata.courseId
        ? "修改单节课程"
        : "添加单节课程";
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