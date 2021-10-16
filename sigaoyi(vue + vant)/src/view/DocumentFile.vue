<template>
  <div class="documentFile" :style="{ minHeight: H - 55 + 'px' }">
    <iframe :src="iframeSrc" frameborder="0"></iframe>
    <!-- 标题 -->
    <div class="title">
      <div class="back" @click="back">
        <van-icon name="arrow-left" size="20" color="#78baff" />
      </div>
      <van-search
        show-action
        v-model="searchVal"
        placeholder="请输入搜索文件名"
        @search="getDocument()"
      >
        <template #action>
          <div @click="getDocument()">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 列表 -->
    <div class="content" v-if="skeletonState">
      <!-- 有值 -->
      <div class="v-content" v-if="tableList.length > 0">
        <div class="list" v-for="(item, index) in tableList" :key="index">
          <div class="check">
            <van-checkbox
              v-model="item.isChecked"
              checked-color="#409eff"
              shape="square"
              icon-size="15px"
              @change="changeCheck(item, index)"
            ></van-checkbox>
          </div>
          <div class="v-list id">{{ item.id }}</div>
          <div class="v-list c-title">{{ item.fileName }}</div>
          <div class="v-list uploadUser">{{ item.createUser }}</div>
          <div class="v-list time">{{ item.createDate }}</div>
        </div>
      </div>
      <!-- 无值 -->
      <div class="empty" v-else :style="{ height: H - 56 + 'px' }">
        <van-empty description="暂无可浏览文件" />
      </div>
    </div>
    <!-- 骨架屏 -->
    <div class="skeleton" v-else :style="{ height: H - 46 + 'px' }">
      <van-skeleton
        :row="1"
        row-width="101%"
        v-for="(item, index) in skeleton"
        :key="index"
      />
    </div>
    <!-- 底部btn -->
    <div class="footer" v-if="allBtn">
      <div>
        <van-button
          type="danger"
          size="mini"
          v-if="this.infoData.statu == '0'"
          @click="deleteRow()"
          >删除</van-button
        >
        <van-button type="info" size="mini" @click="down()">下载</van-button>
        <van-button type="warning" size="mini" @click="browse()"
          >浏览</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import timestampToTimes from "@/assets/js/timestampToTime";
export default {
  data() {
    return {
      infoData: {},
      //H
      H: "",
      // tableList
      tableList: [],
      allBtn: false,
      iframeSrc: "",
      searchVal: "",
      //  skeleton
      skeletonState: false,
      skeleton: 50,
    };
  },
  created() {
    this.H = document.documentElement.clientHeight;
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.getDocument();
  },
  mounted() {},
  methods: {
    // 返回
    back() {
      this.$router.back();
    },
    // 获取文档   搜索
    getDocument() {
      let data = {
        amount: 30,
        fileName: this.searchVal,
        pages: 1,
        userId: this.infoData.id,
      };
      //   loading
      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/TutorialFile",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == 200) {
            this.skeletonState = true;
            if (result.data.files.length > 0) {
              result.data.files.forEach((e) => {
                e["isChecked"] = false;
                e.createDate = timestampToTimes.timestampToTime(e.createDate);
              });
              // 初始按钮状态
              this.getInfoState();
            } else {
              this.allBtn = false;
            }
            this.tableList = result.data.files;
          } else {
            this.allBtn = false;
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          this.skeletonState = false;
          this.allBtn = false;
          loading.clear();
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 获取按钮状态
    getInfoState() {
      if (
        this.infoData.statu <= 2 ||
        this.infoData.userName == "裴亚江" ||
        this.infoData.userName == "马腾"
      ) {
        this.allBtn = true;
      } else {
        this.allBtn = false;
      }
    },
    // checked change
    changeCheck(item, index) {
      if (item.isChecked) {
        this.tableList.forEach((e) => {
          e.isChecked = false;
        });
        item.isChecked = true;
      } else {
        item.isChecked = false;
      }
    },
    // 下载
    down() {
      if (
        this.tableList.findIndex((target) => target.isChecked == true) === -1
      ) {
        this.$toast("请选择要浏下载的文档列表");
        return;
      } else {
        this.tableList.forEach((e) => {
          if (e.isChecked) {
            this.iframeSrc = "";
            this.iframeSrc = "http://www.ec-sigaoyi.com/" + e.url;
            setTimeout(() => {
              this.iframeSrc = "";
            }, 500);
          }
        });
      }
    },
    // 浏览
    browse() {
      if (
        this.tableList.findIndex((target) => target.isChecked == true) === -1
      ) {
        this.$toast("请选择要浏览的文档列表");
        return;
      } else {
        let url = "";
        this.tableList.forEach((e) => {
          if (e.isChecked) {
            url = encodeURIComponent("http://www.ec-sigaoyi.com/" + e.url);
            this.$router.push({ name: "WebSrc", query: { iframeSrc: url } });
            // window.open("http://ow365.cn/?i=23884&furl=" + url);
          }
        });
      }
    },
    // 删除
    deleteRow() {
      if (
        this.tableList.findIndex((target) => target.isChecked == true) === -1
      ) {
        this.$toast("请选择要删除的文档列表");
        return;
      } else {
        this.$dialog
          .confirm({
            title: "是否确认删除已选择的文档列表",
            className: "documentDialog",
            getContainer: ".documentFile",
          })
          .then(() => {
            let data = {
              id: 0,
              name: "",
            };
            var index = "";
            this.tableList.forEach((e, i) => {
              if (e.isChecked) {
                data.id = e.id;
                data.name = e.fileName;
                index = i;
              }
            });
            //   loading
            const loading = this.$toast.loading({
              message: "删除中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: "0",
            });
            this.$axios({
              url: "/sigaoyi/delectfile",
              method: "POST",
              params: data,
            })
              .then((result) => {
                console.log("result ==>", result);
                loading.clear();
                if (result.data.Code == 200) {
                  this.tableList.splice(index, 1);
                  this.$toast({
                    message: result.data.msg,
                    duration: 800,
                    type: "success",
                  });
                } else {
                  this.$dialog({ message: result.data.msg });
                }
              })
              .catch((err) => {
                this.allBtn = false;
                loading.clear();
                console.log("err ==>", err);
                this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
              });
          })
          .catch((err) => {
            this.$toast("已取消");
          });
      }
    },
  },
};
</script>

<style lang="less">
.documentFile {
  position: relative;
  iframe {
    display: none;
  }
  .title {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    z-index: 99;
    .back {
      flex: 1;
      .van-icon {
        width: 100%;
        line-height: 54px;
        text-align: center;
      }
    }
    .van-search {
      flex: 9;
      padding-left: 0;
    }
  }
  .content {
    background: #fff;
    margin-top: 55px;
    .v-content {
      .list {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f3f3f3;
        padding: 5px;
        .v-list {
          font-size: 14px;
          padding: 10px 5px;
          flex: 2;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          transition: all 0.3s;
          &.uploadUser {
            flex: 4;
          }
          &.time,
          &.c-title {
            flex: 8;
          }
        }
        .check {
          padding: 10px 5px;
          padding-right: 0;
          flex: 1;
        }
      }
    }
    .empty {
      .van-empty {
        padding: 50px 0;
      }
    }
  }
  .skeleton {
    margin-top: 55px;
    background: #fff;
    padding: 10px 0;
    overflow: hidden;
    .van-skeleton {
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  .footer {
    font-size: 13px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0px;
    display: flex;
    transition: bottom 0.3s;
    background: #fff;
    padding: 10px 0;
    box-shadow: 0 -3px 10px #b5b5b5a3;
    div {
      width: 100%;
      text-align: right;
      button {
        padding: 8px 13px;
        border-radius: 3px;
        height: 28px;
        margin-right: 5px;
        &:last-child {
          margin-right: 10px;
        }
      }
    }
  }
  .documentDialog {
    .van-dialog__header {
      font-size: 14px;
      line-height: 60px;
    }
  }
}
</style>