<template>
  <div class="product">
    <van-nav-bar
      title="产品管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <div class="sreach">
      <van-search
        v-model="sreachVal"
        placeholder="商品名、关键字"
        @search="onSearch"
      />
    </div>
    <div class="screenNavbar">
      <div
        v-for="(item, index) in screenList"
        :key="index"
        :class="item.isActive ? 'active' : ''"
        @click="clickNavbar(item, index)"
      >
        <span>{{ item.num }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="productList" v-if="fourStatus == 'all'">
      <div class="box-list">
        <div class="list" v-for="(item, index) in itemList" :key="index">
          <div class="box">
            <div class="set">
              <van-checkbox v-model="item.checked"></van-checkbox>
            </div>
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="v-content">
                <div class="img">
                  <img :src="item.imgSrc" alt="" />
                </div>
                <div class="right">
                  <div class="time">{{ item.time }}</div>
                  <div class="status" v-if="item.status == 1">审核通过</div>
                  <div class="status" v-else>暂时不知道</div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn">
            <button>删除</button>
            <button>下架</button>
            <button>编辑</button>
          </div>
        </div>
      </div>
    </div>
    <div class="productList" v-else-if="fourStatus == 'check'">待审核</div>
    <div class="productList" v-else-if="fourStatus == 'sale'">销售中</div>
    <div class="productList" v-else>下架</div>
    <div class="bottom">
      <div class="checked" @click="allSet()">
        <van-checkbox v-model="Allchecked" icon-size="20px"></van-checkbox>
      </div>
      <div
        v-for="(item, index) in bottomList"
        :key="index"
        :style="{
          background: item.isActive ? item.activeBgColor : item.bgColor,
        }"
        @click="clickBtm(item, index)"
        @touchstart="start(item, index)"
        @touchend="end(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/product/product.css";
export default {
  data() {
    return {
      // 搜索的value
      sreachVal: "",
      // 选择的列表
      screenList: [
        { name: "全部", isActive: true, num: "30", flag: "all" },
        { name: "待审核", isActive: false, num: "10", flag: "check" },
        { name: "销售中", isActive: false, num: "8", flag: "sale" },
        { name: "下架", isActive: false, num: "12", flag: "soldOut" },
      ],
      // 需要show and hidden 的Div 的status
      fourStatus: "all",
      // 产品列表
      itemList: [
        {
          checked: false,
          title: "国内酷站 酷站欣赏 酷站素材 站长素材",
          imgSrc: require("../../../assets/img/defaultImg.jpg"),
          time: "2015-12-15 10:26:56",
          status: 1,
        },
        {
          checked: true,
          title: "国内酷站 酷站欣赏 酷站素材 站长素材",
          imgSrc: require("../../../assets/img/defaultImg.jpg"),
          time: "2015-12-15 10:26:56",
          status: 1,
        },
        {
          checked: false,
          title: "国内酷站 酷站欣赏 酷站素材 站长素材",
          imgSrc: require("../../../assets/img/defaultImg.jpg"),
          time: "2015-12-15 10:26:56",
          status: 1,
        },
        {
          checked: false,
          title: "国内酷站 酷站欣赏 酷站素材 站长素材",
          imgSrc: require("../../../assets/img/defaultImg.jpg"),
          time: "2015-12-15 10:26:56",
          status: 0,
        },
      ],
      // 全部选择
      Allchecked: false,
      // bottomList
      bottomList: [
        {
          name: "产品刷新",
          bgColor: "#71b3f7",
          activeBgColor: "#67a4e2",
          isActive: false,
        },
        {
          name: "删除",
          bgColor: "#5dadfd",
          activeBgColor: "#4d95de",
          isActive: false,
        },
        {
          name: "下架",
          bgColor: "#4ca4fb",
          activeBgColor: "#4596e6",
          isActive: false,
        },
        {
          name: "上架",
          bgColor: "#409eff",
          activeBgColor: "#388de4",
          isActive: false,
        },
        {
          name: "采集",
          bgColor: "#2f96ff",
          activeBgColor: "#1076de",
          isActive: false,
        },
      ],
    };
  },
  created() {},
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 搜索
    onSearch() {
      console.log("this.sreachVal ==>", this.sreachVal);
    },
    // 点击筛选项
    clickNavbar(item, index) {
      if (item.isActive) {
        return;
      }
      this.screenList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.fourStatus = item.flag;
    },
    // 全选
    allSet() {
      this.Allchecked = !this.Allchecked;
      if (this.Allchecked) {
        this.itemList.forEach((e) => {
          e.checked = true;
        });
      } else {
        this.itemList.forEach((e) => {
          e.checked = false;
        });
      }
    },
    // 点击底部的Div
    clickBtm(item, index) {
      if (item.name == "产品刷新") {
        this.$router.go(0);
      } else if (item.name == "删除") {
        console.log("删除!!!");
      } else if (item.name == "下架") {
        console.log("下架!!!!");
      } else {
        console.log("上架!!!");
        this.$toast.loading({
          message: "加载中...",
          forbidClik: true,
          loadingType: "spinner",
          duration: "600",
        });
        setTimeout(() => {
          this.$router.push({ name: "Putaway" });
        }, 600);
      }
    },
    // 点击底部的Div 鼠标按下
    start(item, index) {
      if (item.isActive) {
        return;
      }
      this.bottomList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
    },
    // 点击底部的Div 鼠标松开
    end() {
      this.bottomList.forEach((e) => {
        e.isActive = false;
      });
    },
  },
};
</script>