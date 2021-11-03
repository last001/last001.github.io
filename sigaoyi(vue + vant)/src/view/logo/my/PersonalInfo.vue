<template>
  <div class="personalInfo">
    <van-nav-bar
      title="个人资料"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
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
          <input type="text" v-model="item.val" :disabled="item.disabled" />
        </div>
        <div class="icon">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div>
      <!-- <div class="gender">
        <div class="v-title">性别</div>
        <div class="content">
          <van-radio-group v-model="radioGender">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </div>
      </div> -->
      <!-- <div class="address">
        <div class="v-title" @click="areaShow = true">地址</div>
        <div class="content">
          <van-cell is-link :title="cellTitle" @click="areaShow = true" />
          <van-action-sheet v-model="areaShow">
            <div class="areaList">
              <van-area
                title="选择地址"
                :area-list="areaList"
                :columns-placeholder="['请选择', '请选择', '请选择']"
                @confirm="confirmBtn($event)"
                @cancel="cancelBtn()"
              />
            </div>
          </van-action-sheet>
        </div>
      </div> -->
      <!-- <div class="details-address">
        <div class="v-title">详址</div>
        <div class="content">
          <input placeholder="请输入" type="text" v-model="detailsAddress" />
        </div>
        <div class="icon">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div> -->
      <!-- <div class="remark">
        <div class="v-title">简介：</div>
        <div class="content">
          <textarea cols="30" rows="10" maxlength="120" v-model="textareaVal"></textarea>
        </div>
      </div> -->
      <div class="btn">
        <van-button type="info" round @click="savePersonInfo">确定</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/staff/staffDetails/staffDetails.css";
import areaLists from "../../../assets/js/area.js";
export default {
  data() {
    return {
      // 个人信息列表
      infoData: {},
      // 循环列表
      list: [
        {
          isActive: true,
          val: "http://www.ec-sigaoyi.com/imagelink/1634893766009.jpg",
          text: "头像",
          value: "imgSrc",
          disabled: false,
        },
        {
          isActive: false,
          val: "王者",
          text: "姓名",
          value: "name",
          placeholder: "请输入",
          disabled: true,
        },
        {
          isActive: false,
          val: "24kc",
          text: "昵称",
          value: "nickName",
          placeholder: "请输入",
          disabled: true,
        },
        {
          isActive: false,
          val: "1001",
          text: "编号",
          value: "grade",
          disabled: true,
        },
        {
          isActive: false,
          val: "000",
          text: "密码",
          value: "passworld",
          disabled: true,
        },
        {
          isActive: false,
          val: "15977905862",
          text: "号码",
          value: "phoneName",
          placeholder: "请输入",
          disabled: true,
        },
        {
          isActive: false,
          val: "1900586299@qq.com",
          text: "邮箱",
          value: "email",
          placeholder: "请输入",
          disabled: false,
        },
      ],
      //  详细地址
      detailsAddress: "",
      // 上传图片的status
      isActive: false,
      //   三级联动数组
      areaList: areaLists.areaList,
      //  三级联动show hidden
      areaShow: false,
      // 三级联动初始标题
      cellTitle: "请选择地址",
      // 性别
      radioGender: "1",
      textareaVal: "这家伙很懒，什么也没有写！",
    };
  },
  created() {
    this.$nextTick(() => {
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      // 获取初始值
      this.getInfo();
    });
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    getInfo() {
      if(this.infoData.img == undefined || this.infoData.img == ""){
          this.infoData.img = "http://www.ec-sigaoyi.com/imagelink/1634893766009.jpg";
      }
      this.list.forEach((e) => {
        if (e.text == "姓名") {
          e.val = this.infoData.userName;
        } else if (e.text == "昵称") {
          e.val = this.infoData.userName;
        } else if (e.text == "编号") {
          e.val = this.infoData.id + 10850;
        } else if (e.text == "密码") {
          e.val = this.infoData.userPassword;
        } else if (e.text == "号码") {
          e.val = this.infoData.phoneNumber;
        } else if (e.text == "邮箱") {
          e.val = this.infoData.mail;
        } else if (e.text == '头像'){
            e.val = this.infoData.img;
        }
      });
    },
    // 确定
    savePersonInfo() {
      let data = {
        userId: this.infoData.id,
        password: "",
        phone: "",
        mail: "",
        img: "",
      };
      //   密码
      this.list.forEach((e) => {
        if (e.text == "密码") {
          data.password = e.val;
        }
      });
      //   邮箱
      this.list.forEach((e) => {
        if (e.text == "邮箱") {
          data.mail = e.val;
        }
      });
      //   头像
      this.list.forEach((e) => {
        if (e.text == "头像") {
          data.img = e.val;
        }
      });
      console.log("data ==>", data);

      //   loading
      var loading = this.$toast.loading({
        message: "修改中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });

      this.$axios({
        url: "/sigaoyi/updateUserInfo",
        method: "GET",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == "200") {
            this.$dialog
              .alert({
                title: "修改成功",
                message: result.data.msg,
                confirmButtonColor: "#409eff",
              })
              .then(() => {
                this.$toast.loading({
                  message: "退出登陆中...",
                  forbidClick: true,
                  loadingType: "spinner",
                  duration: "600",
                });
                sessionStorage.removeItem("infoData");
                setTimeout(() => {
                    this.$router.push({ name: "Login" });
                }, 600);
              });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          console.log("err ==>", err);
        });
    },
    // 上传头像
    updata(e) {
      // headerImgSrc
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      //   loading
      var loading = this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });

      this.$axios({
        url: "/sigaoyi/invoicingupload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          setTimeout(() => {
            this.$refs.headerImgSrc.value = null;
          }, 100);
          if (result.data.Code == "200") {
            // this.item.imgSrc = result.data.path;
            this.list.forEach((e) => {
              if (e.text == "头像") {
                e.val = result.data.path;
              }
            });
            this.$toast({ message: result.data.msg });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            this.$refs.headerImgSrc.value = null;
          }, 100);
          loading.clear();
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
          console.log("err ==>", err);
        });
    },
    // 三级联动确定按钮
    confirmBtn(arr) {
      console.log("arr==>", arr);
      if (arr.findIndex((target) => target.name == "") > -1) {
        this.$toast("请选择地区");
        this.cellTitle = "请选择地址";
      } else {
        this.cellTitle = "";
        arr.forEach((e, i) => {
          this.cellTitle += e.name;
        });
        this.areaShow = false;
      }
    },
    // 三级联动取消按钮
    cancelBtn() {
      console.log("取消按钮!!!~");
      this.areaShow = false;
    },
  },
};
</script>