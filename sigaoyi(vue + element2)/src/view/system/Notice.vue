<template>
  <div class="notice">
    <div class="v-notive">
      <div class="content">
        <div class="title">
          <span class="text">公告标题：</span>
          <input type="text" v-model="title" placeholder="请输入标题" />
        </div>
        <div class="type">
          <span class="text">公告类型：</span>
          <el-select v-model="optionIndex" placeholder="请选择">
            <el-option
              v-for="item in optionList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="v-content">
          <span class="text">公告内容：</span>
          <textarea
            cols="30"
            rows="10"
            v-model="textareaText"
            placeholder="请输入公告内容"
          ></textarea>
        </div>
        <div class="btn">
          <el-button type="primary" size="medium" @click="coifrm()"
            >确认发布</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/less/notice/notice.less";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // 个人信息
      infoData: {},
      title: "",
      setNum: 0,
      optionIndex: 1,
      optionList: [
        { name: "即时公告", value: 1 },
        { name: "首页公告", value: 2 },
      ],
      //   公告内容
      textareaText: "",
    };
  },
  created() {
    this.infoData = this.InfoData;
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
  computed: {
    ...homeState(["InfoData"]),
  },
  methods: {
    // 点击确认发布 通知
    coifrm() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.title == "") {
        this.$message({
          message: "请输入发布公告的标题",
          duration: 800,
          type: "error",
          center: true,
        });
        return;
      }
      if (this.textareaText == "") {
        this.$message({
          message: "请输入发布公告的内容",
          duration: 800,
          type: "error",
          center: true,
        });
        return;
      }
      let data = {
        title: this.title,
        noticeType: this.optionIndex,
        releaseUser: this.infoData.userName,
        content: this.textareaText,
      };
      //   if (data.noticeType == 2) {
      //     data.content = data.content.split("\n");
      //   }
      //   console.log("data ==>", data);
      this.$axios({
        url: "/sigaoyi/NEWAnnounce",
        method: "POST",
        params: data,
      })
        .then((result) => {
          if (result.data.code == "200") {
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
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
</style>