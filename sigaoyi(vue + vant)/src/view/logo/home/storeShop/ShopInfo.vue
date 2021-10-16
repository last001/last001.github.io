<template>
  <div class="shopInfo" :style="{ height: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="店铺信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="itemList">
      <!-- 店铺名称 -->
      <div class="shopName">
        <span>店铺名称</span>
        <span>
          <input type="text" placeholder="请输入" v-model="shopName" />
        </span>
      </div>
      <!-- 店铺密码 -->
      <div class="shopName">
        <span>店铺密码</span>
        <span>
          <input type="text" placeholder="请输入" v-model="shopPassWolrd" />
        </span>
      </div>
      <!-- 店铺状态 -->
      <div class="state">
        <div class="header">店铺状态</div>
        <van-cell
          is-link
          :title="shopState.title"
          @click="shopState.status = true"
          :class="shopState.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="shopState.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event)"
              @cancel="shopState.status = false"
              show-toolbar
              :columns="shopState.list"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- APIKEY -->
      <div class="shopName">
        <span>APIKEY</span>
        <span>
          <input type="text" placeholder="请输入" v-model="aPIKEY" />
        </span>
      </div>
      <!-- 备注 -->
      <div class="remarks">
        <van-field
          v-model="remarks"
          rows="4"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          show-word-limit
        />
      </div>
    </div>
    <div class="btn">
      <van-button round type="info" size="normal" @click="clickBtn()"
        >确定</van-button
      >
    </div>
  </div>
</template>
<script>
let firstRouter = false;
import "../../../../assets/less/storeshop/shopInfo/shopInfo.css";
export default {
  data() {
    return {
      H: "",
      infoData: "",
      item: {},
      //   店铺名称
      shopName: "",
      //   店铺密码
      shopPassWolrd: "",
      //   aPIKEY
      aPIKEY: "",
      //   备注
      remarks: "",
      //   分类1
      shopState: {
        title: "请选择",
        status: false,
        value: 99,
        list: [
          { text: "请选择", value: 99 },
          { text: "在售", value: 0 },
          { text: "停售", value: 1 },
        ],
      },
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.item = JSON.parse(this.$route.query.item);
    // 渲染
    this.geiItem();
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.push({
        name: "StoreShop",
        query: { firstRouter: firstRouter },
      });
    },
    // 状态确认
    conFirm(action) {
      this.shopState.title = action.text;
      this.shopState.value = action.value;
      this.shopState.status = false;
    },
    // 渲染
    geiItem() {
      console.log("this.item ==>", this.item);
      if (this.item != 0) {
        this.shopName = this.item.shopuser;
        this.shopPassWolrd = this.item.shoppwd;
        this.aPIKEY = this.item.aPIKey;
        this.remarks = this.item.remarks;
        this.shopState.list.forEach((e) => {
          if (this.item.status == e.value) {
            this.shopState.value = e.value;
            this.shopState.title = e.text;
          }
        });
      }
    },
    // 确定修改 / 添加
    clickBtn() {
      let data = {
        shopid: this.item.id,
        userid: this.infoData.id,
        status: this.shopState.value,
        shopuser: this.shopName,
        shoppwd: this.shopPassWolrd,
        APIKey: this.aPIKEY,
        remarks: this.remarks,
      };
      var loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });

      this.$axios({
        url: "/sigaoyi/addQoo10shop",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.code == "200") {
            firstRouter = true;
            this.$router.push({
              name: "StoreShop",
              query: { firstRouter: firstRouter },
            });
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.$dialog({ message: "系统业务繁忙,请稍后再试" });
          console.log("err ==>", err);
        });
    },
  },
};
</script>