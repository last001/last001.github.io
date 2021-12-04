<template>
  <div class="imageOnlineURl">
    <div class="main" v-title data-title="图片URL在线转换"></div>
    <div class="box">
      <div class="v-imageOnlineURl" :style="{ height: H + 'px' }">
        <div class="imgList">
          <div class="upload">
            <div class="top">
              <i class="el-icon-upload"></i>
              <input
                type="file"
                multiple
                ref="upload"
                accept="image/*"
                @change="uploadFile($event)"
              />
              <textarea disabled v-model="fileName"></textarea>
            </div>
          </div>
          <div class="result">
            <textarea disabled v-model="resultImg"></textarea>
          </div>
        </div>
        <div class="btn">
          <div :class="btnActive ? 'active' : ''" class="bottom">
            <i
              class="el-icon-caret-right"
              @mousedown="btnActive = true"
              @click="transionImg()"
              @mouseup="btnActive = false"
            ></i>
            <span
              @mousedown="btnActive = true"
              @click="transionImg()"
              @mouseup="btnActive = false"
              >开始转换为在线图片URL</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/imageOnlineURl/imageOnlineURl.less";
import uploadPdfs from "../../assets/js/uploadPdf";
export default {
  data() {
    return {
      fileName: "",
      btnActive: false,
      imgList: [],
      resultImg: "可上传多张图片",
    };
  },
  created() {
    this.H = document.documentElement.clientHeight - 48 - 45 - 51 - 36;
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
  methods: {
    uploadFile(e) {
      this.fileName = "";
      //   this.resultImg = "";
      this.imgList = e.target.files;
      for (let i = 0; i < e.target.files.length; i++) {
        this.fileName += e.target.files[i].name + "\n";
      }
    },
    transionImg() {
      if (this.fileName == "") {
        this.$message({
          message: "请先上传要转换的本地图片",
          duration: 800,
          center: true,
          type: "error",
        });
        return;
      }
      // var 一个新的FormData
      var formData = new FormData();
      for (let i = 0; i < this.imgList.length; i++) {
        // 向 formData 对象中添加文件
        formData.append("file", this.imgList[i]);
      }
      let loading = this.$loading({
        lock: false,
        text: "转换中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = "/sigaoyi/ImageOnlineURLUpload";
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          this.$refs.upload.value = "";
          loading.close();
          if (result.data.Code == "200") {
            this.resultImg = result.data.imgsURL;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.$refs.upload.value = "";
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙，请稍后再试试",
            type: "error",
            offset: 50,
          });
        });
    },
  },
};
</script>

<style>
</style>