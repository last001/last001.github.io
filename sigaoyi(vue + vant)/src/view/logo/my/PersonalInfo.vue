<template>
  <div class="personalInfo">
    <van-nav-bar
      title="个人资料"
      left-text="返回"
      right-text="确定"
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
          <input type="text" v-model="item.val" :disabled="item.disabled" />
        </div>
        <div class="icon">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div>
      <div class="gender">
        <div class="v-title">性别</div>
        <div class="content">
          <div
            v-for="(item, index) in radioList"
            :key="index"
            @click="genderSet(item, index)"
          >
            <span>{{ item.text }}</span>
            <input type="radio" :checked="item.checked" />
          </div>
        </div>
      </div>
      <div class="address">
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
      </div>
      <div class="details-address">
        <div class="v-title">详址</div>
        <div class="content">
          <input placeholder="请输入" type="text" v-model="detailsAddress" />
        </div>
        <div class="icon">
          <van-icon name="arrow" size="15px" color="#969799" />
        </div>
      </div>
      <div class="remark">
        <div class="v-title">简介：</div>
        <div class="content">
          <textarea cols="30" rows="10" maxlength="120">这家伙很懒，什么也没有写！</textarea>
        </div>
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
          val: require("../../../assets/img/head.jpg"),
          text: "头像",
          value: "imgSrc",
          disabled: false,
        },
        {
          isActive: false,
          val: "王者",
          text: "姓名",
          value: "name",
          placeholder:"请输入",
          disabled: false,
        },
        {
          isActive: false,
          val: "24kc",
          text: "昵称",
          value: "nickName",
          placeholder:"请输入",
          disabled: false,
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
          val: "15977905862",
          text: "号码",
          value: "phoneName",
          placeholder:"请输入",
          disabled: false,
        },
        {
          isActive: false,
          val: "1900586299@qq.com",
          text: "邮箱",
          value: "email",
          placeholder:"请输入",
          disabled: false,
        },
      ],
      //  详细地址
      detailsAddress:"",   
      // 上传图片的status
      isActive: false,
      //   三级联动数组
      areaList: areaLists.areaList,
      //  三级联动show hidden
      areaShow: false,
      // 三级联动初始标题
      cellTitle: "请选择地址",
      //  inputRadio list
      radioList: [
        { text: "男", checked: false },
        { text: "女", checked: false },
      ],
    };
  },
  created() {
    this.$nextTick(() => {
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      // 获取初始值   
      this.getInfo()
    });
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    getInfo(){
        this.list.forEach(e => {
            if(e.text == "姓名"){
                e.val = this.infoData.userName;
            }else if(e.text == "昵称"){
                e.val = this.infoData.userName;
            }else if(e.text == "编号"){
                e.val = this.infoData.id + 10850;
            }else if(e.text == "号码"){
                e.val = this.infoData.phoneNumber;
            }else if(e.text == "邮箱"){
                e.val = this.infoData.mail;
            }
        });
    },
    // 确定
    onClickRight() {
      console.log("确定!!!");
    },
    // 上传头像
    updata(e) {},
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
    // 性别选择
    genderSet(item, index) {
      if (item.checked) {
        return;
      }
      for (let i = 0; i < this.radioList.length; i++) {
        this.radioList[i].checked = false;
      }
      item.checked = true;
    },
  },
};
</script>