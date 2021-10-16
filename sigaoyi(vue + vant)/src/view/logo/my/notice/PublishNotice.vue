<template>
  <div class="publishNotice" :style="{ minHeight: H + 'px' }">
    <div class="title">
      <van-nav-bar
        title="发布公告"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <van-button @click="onClickright" type="info" size="mini">发布</van-button>
        </template>
      </van-nav-bar>
    </div>
    <!-- 标题 -->
    <div class="pulishTitle">
      <span>标题</span>
      <span>
        <input type="text" placeholder="请输入" v-model="titleVal" />
      </span>
    </div>
    <!-- 管理 -->
    <div class="receiver">
      <div class="header">管理</div>
      <van-cell
        is-link
        :title="receiverData.title"
        @click="receiverData.status = true"
        :class="receiverData.title == '请选择' ? '' : 'active'"
      />
      <van-action-sheet v-model="receiverData.status">
        <div class="content">
          <van-picker
            @confirm="receiverConFirm($event)"
            @cancel="onCancel"
            :columns="receiverData.list"
            show-toolbar
          />
        </div>
      </van-action-sheet>
    </div>
    <!-- 类型 -->
    <div class="type">
      <div class="header">类型</div>
      <van-cell
        is-link
        :title="typeData.title"
        @click="typeData.status = true"
        :class="typeData.title == '请选择' ? '' : 'active'"
      />
      <van-action-sheet v-model="typeData.status">
        <div class="content">
          <van-picker
            @confirm="typeConFirm($event)"
            @cancel="onCancel"
            :columns="typeData.list"
            show-toolbar
          />
        </div>
      </van-action-sheet>
    </div>
    <!-- 内容 -->
    <div class="content">
      <van-field
        v-model="noticeVal"
        rows="6"
        autosize
        label="内容"
        type="textarea"
        placeholder="请输入发布公告内容"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import "../../../../assets/less/publishNotice/publishNotice.css";
export default {
  data() {
    return {
      // 屏幕最高度 渲染背景色
      infoData: {},
      H: "",
      titleVal: "",
      //  管理
      receiverData: {
        title: "请选择",
        status: false,
        value: "",
        list: [
          { text: "请选择", value: "99" },
          { text: "cj", value: "1" },
          { text: "测试", value: "2" },
          { text: "测试1", value: "3" },
        ],
      },
      //  类型
      typeData: {
        title: "请选择",
        status: false,
        value: 99,
        list: [
          { text: "请选择", value: 99 },
          { text: "即时公告", value: 1 },
          { text: "个人公告", value: 2 },
        ],
      },
      //  文本域 内容
      noticeVal: "",
    };
  },
  created() {
    // 屏幕最小高度
    this.H = document.documentElement.clientHeight;
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 发布
    onClickright() {
      // 提示
      if (this.titleVal == "") {
        this.$toast("请输入标题");
        return;
      }
      if (this.typeData.value == 99) {
        this.$toast("请选择公告类型");
        return;
      }
      if (this.noticeVal == "") {
        this.$toast("请输入发布内容");
        return;
      }
      let data = {
        title: this.titleVal,
        noticeType: this.typeData.value,
        releaseUser: this.infoData.userName,
        content: this.noticeVal,
      };
      const loading = this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWAnnounce",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.code == "200") {
            this.$toast(result.data.msg);
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 取消渠道选择
    onCancel() {
      this.receiverData.status = false;
      this.typeData.status = false;
    },
    // 渠道选择确定
    receiverConFirm(value) {
      this.receiverData.title = value.text;
      this.receiverData.value = value.value;
      this.onCancel();
    },
    // 类型选择确定
    typeConFirm(value) {
      this.typeData.title = value.text;
      this.typeData.value = value.value;
      this.onCancel();
    },
  },
};
</script>

<style>
</style>