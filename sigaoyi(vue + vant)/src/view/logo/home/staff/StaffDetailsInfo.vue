<template>
  <div class="staffDetailsInfo">
    <van-nav-bar
      title="修改员工基本信息"
      left-text="返回"
      right-text="确定修改"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="list">
      <div class="v-list" v-for="(item, index) in list" :key="index">
        <div class="v-title">{{ item.text }}</div>
        <div class="content1" v-if="item.isActive">
          <img :src="item.val" alt="" />
          <input
            type="file"
            ref="headerImgSrc"
            accept="image/*"
            @change="updata($event)"
          />
          <div class="mask" v-show="isActive">
            <div><van-icon name="replay" color="#fff" size="14px" /></div>
          </div>
        </div>
        <div class="content" v-else>
          <input type="text" v-model="item.val" />
        </div>
        <div class="icon">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/staff/staffDetails/staffDetails.css";
import uploadFiles from "../../../../assets/js/uploadFile.js";
export default {
  data() {
    return {
      // 传过来的item
      baseList: {},
      // 循环列表
      list: [
        { isActive: true, val: "", text: "头像", value: "imgSrc" },
        { isActive: false, val: "", text: "姓名", value: "name" },
        { isActive: false, val: "", text: "昵称", value: "nickName" },
        { isActive: false, val: "", text: "号码", value: "phoneName" },
        { isActive: false, val: "", text: "职位", value: "grade" },
        { isActive: false, val: "", text: "公司", value: "company" },
        { isActive: false, val: "", text: "余额", value: "blance" },
        { isActive: false, val: "", text: "邮箱", value: "email" },
        { isActive: false, val: "", text: "地址", value: "address" },
      ],
      // 上传头像isActive
      isActive: false,
    };
  },
  created() {
    this.$nextTick(() => {
      let list = JSON.parse(this.$route.query.item);
      this.list.forEach((e) => {
        for (const key in list) {
          if (key == e.value) {
            e.val = list[key];
          }
        }
      });
      this.baseList = list;
      console.log("this.list ==>", this.list);
    });
  },
  methods: {
    //   返回
    onClickLeft() {
      this.$router.back();
    },
    // 确定修改
    onClickRight() {
      console.log("this.list ==>", this.list);
    },
    // 上传头像
    updata(e) {
      this.isActive = true;
      let files = e.target.files[0];
      console.log("files ==>", files);
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      //   formData.append("file", this.file2);
      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          this.$refs.headerImgSrc[0].value = null;
          this.isActive = false;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.list.forEach((e) => {
              if (e.text == "头像") {
                e.val = result.data.imgsURL;
              }
            });
            console.log(" this.list ==>", this.list);
          } else {
            this.$refs.headerImgSrc[0].value = null;
            this.isActive = false;
            console.log("错误");
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
  },
};
</script>