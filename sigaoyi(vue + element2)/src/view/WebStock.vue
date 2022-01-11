<template>
  <div class="webStock">
    <!-- 在线客服 -->
    <el-dialog
      :modal="false"
      custom-class="onlie"
      :visible.sync="onlineServiceState"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="100%"
    >
      <div slot="title" class="online_title">
        <div class="online_title_box">
          <div class="onlie_title_header">
            <img
              src="http://www.ec-sigaoyi.com/imagelink/1636623516940.jpg"
              alt=""
            />
          </div>
          <div class="onlie_title_user">{{ onlineTitle }}</div>
        </div>
        <div class="online_title_phone">客服电话：<span>18924279633</span></div>
      </div>
      <div class="content">
        <div class="content_userInfo">
          <!-- 用户 -->
          <!-- <div class="content_userInfo_list"></div> -->
          <!-- 客服 -->
          <div
            class="content_userInfo_list"
            v-for="(item, index) in infoList"
            :key="index"
            @click="selectUser(item, index)"
            :class="item.isActive ? 'active' : ''"
          >
            <div class="content_header">
              <el-badge :value="item.id" v-if="item.id > 0">
                <img :src="item.headerUrl" alt="" />
              </el-badge>
              <img :src="item.headerUrl" alt="" v-else />
            </div>
            <div class="content_userName_info">
              <div class="content_userName">{{ item.senderName }}</div>
              <div class="content_infotioin">{{ item.news }}</div>
            </div>
            <!-- <i class="el-icon-close" @click.stop="deleteInfo(item, index)"></i> -->
          </div>
        </div>
        <div class="content_info" ref="content_info">
          <div
            class="content_info_text"
            v-for="(item, index) in contentInfoList"
            :key="index"
          >
            <div class="content_info_text_time">{{ item.collectionTime }}</div>
            <div
              class="content_info_text_box"
              :class="item.senderId == id ? 'active' : ''"
            >
              <div class="content_info_text_header">
                <img
                  src="http://www.ec-sigaoyi.com/imagelink/1636623516940.jpg"
                  alt=""
                />
              </div>
              <div class="content_info_text_list">
                <i
                  :class="
                    item.senderId == id
                      ? 'el-icon-caret-right'
                      : 'el-icon-caret-left'
                  "
                ></i>
                <span v-html="item.content"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="online-footer">
        <div class="footer_file">
          <i class="el-icon-picture-outline"></i>
        </div>
        <div class="footer_info">
          <div class="textVal">
            <textarea
              cols="30"
              rows="10"
              placeholder="输入消息..."
              v-model="textVal"
              @keydown.enter="keydownVal($event)"
            ></textarea>
            <!-- 在模板部分 -->
            <!-- <VueEmoji ref="emoji" @input="onInput" /> -->
          </div>
          <div class="btn">
            <span @click="sendVal()">发送</span>
            <span class="btn_su">|</span>
            <span @click="sendOutType()"><i :class="iconSenoutSrc"></i></span>
            <div class="sendTypeMask" v-show="iconSenoutState">
              <div class="sendTypeMask_set">
                <i class="el-icon-check" :class="sendType ? 'active' : ''"></i>
              </div>
              <div class="sendTypeMask_text">
                <div @click="selectType(true)">按Enter健发送消息</div>
                <div @click="selectType(false)">按Ctrl+Enter健发送消息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- <div class="title">
      <div class="online_title_box">
        <div class="onlie_title_header">
          <img
            src="http://www.ec-sigaoyi.com/imagelink/1636623516940.jpg"
            alt=""
          />
        </div>
        <div class="onlie_title_user">{{ onlineTitle }}</div>
      </div>
      <div class="online_title_phone">客服电话：<span>18924279633</span></div>
    </div> -->
  </div>
</template>
<script>
import timestampToTimes from "@/assets/js/timestampToTime";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      H: "",
      id: 0,

      // 在线客服
      onlineTitle: "物流客服正在为你解答",
      iconSenoutSrc: "el-icon-caret-bottom",
      onlineServiceState: true,
      iconSenoutState: false,
      textVal: "",
      // 选择发送方式
      sendType: false,
      infoList: [],
      contentInfoList: [],

      // 发送人个人信息
      infoData: {},

      websock: null, //建立的连接
      lockReconnect: false, //是否真正建立连接
      timeout: 10 * 1000, //30秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
    };
  },
  created() {
    this.setInfoData(JSON.parse(this.$route.query.InfoData));
    this.id = this.InfoData.id;

    this.getUserID();
    this.initWebSocket();
  },
  destroyed() {
    this.websocketclose();
  },
  computed: {
    ...homeState(["InfoData"]),
  },
  methods: {
    // 获取 id
    getUserID() {
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      if (
        this.InfoData.id == 1 ||
        this.InfoData.id == 66 ||
        this.InfoData.id == 6
      ) {
        this.infoList = [
          {
            senderId: 2,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: false,
            sender: "测试",
            senderName: "测试",
            sender1: "测试",
            news: "",
          },
        ];
      } else {
        this.infoList = [
          {
            senderId: 1,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: true,
            sender: "chenjie",
            senderName: "物流客服",
            sender1: "物流客服正在为你解答",
            news: "",
          },
          {
            senderId: 66,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: false,
            sender: "袁爽",
            senderName: "运营客服",
            sender1: "运营客服正在为你解答",
            news: "",
          },
          {
            senderId: 6,
            headerUrl: "http://www.ec-sigaoyi.com/imagelink/1626948164266.jpg",
            isActive: false,
            sender: "sugoi1",
            senderName: "ERP客服",
            sender1: "ERP客服正在为你解答",
            news: "",
          },
        ];

        this.infoList.forEach((e, i) => {
          e.isActive = false;
          if (i == 0) {
            e.isActive = true;
            this.selectUser(e, i);
          }
        });
      }
    },

    // 选择用户状态
    selectUser(item, index) {
      this.infoList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;

      this.getNews(item.senderId);

      this.onlineTitle = item.sender1;
    },

    // 获取消息
    getNews(senderId) {
      this.$axios({
        url: "/sigaoyi/GetUnreadInformationGetId",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          senderId: senderId,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.contentInfoList = [];
            this.contentInfoList = result.data.informations;
            setTimeout(() => {
              this.scrollBottm();
            }, 0);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },

    // 打开选择项
    sendOutType() {
      if (this.iconSenoutState) {
        this.iconSenoutSrc = "el-icon-caret-bottom";
        this.iconSenoutState = false;
      } else {
        this.iconSenoutSrc = "el-icon-caret-top";
        this.iconSenoutState = true;
      }
    },
    // 切换发送信息的方式
    selectType(flag) {
      if (flag) {
        this.sendType = false;
      } else {
        this.sendType = true;
      }
      this.iconSenoutState = false;
    },
    // 监听 键盘按下事件
    keydownVal(e) {
      console.log("键盘按下事件");
      if (this.sendType) {
        //用户点击了ctrl+enter 发送消息
        if (e.ctrlKey && e.keyCode == 13) {
          e.preventDefault();
          this.sendVal();
        } else {
          //用户点击了enter  换行
          // e.preventDefault();
          // this.textVal += "<br>";
        }
      } else {
        //用户点击了ctrl+enter  换行
        if (e.ctrlKey && e.keyCode == 13) {
          this.textVal += "\n";
        } else {
          //用户点击了enter  发送消息
          e.preventDefault();
          this.sendVal();
        }
      }
    },
    // 滚动条到底部
    scrollBottm() {
      this.$nextTick(() => {
        let el = this.$refs["content_info"];
        el.scrollTop = el.scrollHeight;
      });
    },
    // 发送消息
    sendVal() {
      if (this.textVal == "") {
        return;
      }
      //   let textVal = document.querySelector(".emoji-wysiwyg-editor").innerHTML;
      this.textVal = this.textVal.replace(/\n/g, "<br>");

      let data = {
        status: 0,
        userId: this.InfoData.id,
        userName: this.InfoData.userName,
        recipientId: "",
        recipient: "",
        content: this.textVal,
        collectionTime: timestampToTimes.timestampToTime(new Date()),
      };

      //   console.log("发送列表 ==>", this.infoList);

      this.infoList.forEach((e) => {
        if (e.isActive) {
          data.recipientId = e.senderId;
          data.recipient = e.sender;
        }
      });
      //   console.log("data ==>", data);
      console.log("this.contentInfoList ==>", this.contentInfoList);

      let obj = {
        status: 0,
        userId: this.InfoData.id,
        userName: this.InfoData.userName,
        recipientId: "",
        recipient: "",
        content: this.textVal,
        collectionTime: timestampToTimes.timestampToTime(new Date()),
        senderId: this.InfoData.id,
      };
      this.contentInfoList.push(obj);
      this.clearTextarea();
      setTimeout(() => {
        this.scrollBottm();
      }, 200);

      // 自己
      //   if()

      this.$axios({
        url: "/sigaoyi/sendMessage",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
        })
        .catch((err) => {
          console.log("err ==>", err);
        });

      this.sendMessage(data);
    },
    // 表情选择
    onInput(event) {
      //事件。数据包含文本区域的值
      console.log(event);
      this.textVal += document.querySelector(".emoji-wysiwyg-editor").innerHTML;
      //   let phoneReg = /\n/;
      //   if (phoneReg.test(event.data)) {
      //     this.sendVal();
      //   }
    },
    // 清空 聊天框
    clearTextarea() {
      //   this.$refs.emoji.clear();
      this.textVal = "";
    },
    // 获取个人信息
    getInfoData(id) {
      this.$axios({
        url: "/sigaoyi/UnderIdQueryUserTableInfo",
        method: "POST",
        params: {
          userId: id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.infoData = result.data.userInfo;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },

    //建立连接
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://192.168.1.179:8080/sigaoyi/websocket/001";
      //建立连接
      this.websock = new WebSocket(wsuri);

      this.websock.onopen = (e) => {
        console.log("连接成功 ==>");
        this.isOpenMessage = "服务器连接成功";
      };

      //接收信息
      this.websock.onmessage = this.websocketonmessage;

      // 关闭连接
      this.websock.onclose = this.websocketclose;
    },

    sendMessage(data) {
      this.websock.send(JSON.stringify(data));
    },

    websocketonmessage(event) {
      console.log("返回消息==>", JSON.parse(event.data));
      let msgList = JSON.parse(event.data);

      if (msgList.recipientId == this.InfoData.id) {
        if (
          this.infoList.findIndex(
            (target) => target.senderId === msgList.userId
          ) > -1
        ) {
          this.infoList.forEach((e) => {
            if (e.senderId == msgList.userId) {
              e.news = msgList.content;
            }
          });
          this.contentInfoList.push(msgList);
        } else {
          this.getInfoData(msgList.userId);
          let sendInfo = {
            senderId: msgList.userId,
            headerUrl: this.infoData.img,
            isActive: true,
            sender: msgList.userName,
            senderName: msgList.userName,
            sender1: msgList.userName,
            news: msgList.content,
          };

          this.infoList.push(sendInfo);
          this.contentInfoList.push(msgList);
        }

        this.scrollBottm();
      } else {
        return false;
      }
    },

    websocketclose(e) {
      //连接关闭事件
      console.log("关闭连接");
    },
    ...homeActions(["setInfoData"]),
  },
};
</script>
<style lang="less" >
.webStock {
  .onlie {
    margin: 0 !important;
    height: 100vh;
    .el-dialog__header {
      padding: 10px;
      background-color: #9e2536;
      color: #fff;

      .online_title {
        display: flex;

        .online_title_box {
          display: flex;
          flex: 5;
          .onlie_title_header {
            width: 40px;
            height: 40px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .onlie_title_user {
            height: 40px;
            line-height: 40px;
            margin-left: 10px;
          }
        }

        .online_title_phone {
          flex: 2;
          text-align: right;
          padding-right: 30px;
          span {
            font-weight: 600;
          }
        }
      }

      .el-dialog__headerbtn {
        top: 10px;
        right: 10px;

        i {
          color: #Fff;
        }
      }
    }

    .el-dialog__body {
      padding: 0;
      height: calc(100% - 210px);

      .content {
        height: 100%;
        display: flex;

        .content_userInfo {
          overflow-y: auto;
          flex: 2;

          .content_userInfo_list {
            display: flex;
            padding: 5px 10px;
            padding-left: 15px;
            background-color: #fff;
            position: relative;

            .content_header {
              width: 40px;
              height: 40px;
              margin-top: 5px;

              img {
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 50%;
              }
            }

            .content_userName_info {
              width: 130px;
              padding-left: 15px;
              height: 50px;

              .content_userName {
                width: 100%;
                height: 25px;
                line-height: 30px;
                color: #000;
                font-size: 15px;
                cursor: default;
              }

              .content_infotioin {
                width: 100%;
                height: 25px;
                line-height: 20px;
                color: #a7a5a5;
                font-size: 12px;
                display: inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: default;
              }
            }

            .el-icon-close {
              position: absolute;
              right: 5px;
              top: 5px;
              font-size: 15px;
              color: #a2a2a2;
            }

            &.active {
              background-color: #e6e6e6;

              .content_userName_info {
                background-color: #e6e6e6;

                .content_info {
                  background-color: #e6e6e6;
                }
              }
            }
          }

          &::-webkit-scrollbar {
            width: 5px;
          }

          &::-webkit-scrollbar-track {
            border-radius: 5px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #dddddd;
          }
        }

        .content_info {
          flex: 8;
          background-color: #f9f9f9;
          overflow-y: auto;

          .content_info_text {
            padding: 10px;

            .content_info_text_time {
              padding: 5px;
              width: 100%;
              line-height: 20px;
              text-align: center;
            }

            .content_info_text_box {
              display: flex;

              .content_info_text_header {
                width: 40px;
                height: 40px;

                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }

              .content_info_text_list {
                max-width: calc(100% - 71px);
                background-color: #dcdcdc;
                position: relative;
                border-radius: 8px;
                margin-left: 15px;
                margin-top: 5px;
                margin-bottom: 5px;
                padding: 5px 8px;
                line-height: 25px;

                .el-icon-caret-left {
                  color: #dcdcdc;
                  position: absolute;
                  left: -15px;
                  top: 2px;
                  font-size: 24px;
                }

                span {
                  color: #000;
                  line-height: 20px;
                }
              }

              &.active {
                justify-content: flex-end;
                position: relative;
                padding: 23px 0;

                .content_info_text_header {
                  position: absolute;
                  right: 0;
                }

                .content_info_text_list {
                  position: absolute;
                  right: 60px;

                  .el-icon-caret-right {
                    right: -14px;
                    color: #dcdcdc;
                    position: absolute;
                    top: 2px;
                    font-size: 24px;
                  }
                }
              }
            }
          }

          &::-webkit-scrollbar {
            width: 5px;
          }

          &::-webkit-scrollbar-track {
            border-radius: 5px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #b5b5b5;
          }
        }
      }
    }

    .el-dialog__footer {
      padding: 0;

      .online-footer {
        height: 150px;

        .footer_file {
          padding: 0 10px;
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          border-bottom: 1px solid #e8e8e8;
          border-top: 1px solid #e8e8e8;
          text-align: left;

          i {
            margin-top: 6px;
            margin-left: 36px;
            font-size: 26px;
            color: #a5a5a5;
          }
        }

        .footer_info {
          height: 110px;
          position: relative;

          .textVal {
            width: 100%;
            height: 100%;

            textarea {
              width: calc(100% - 16px);
              height: calc(100% - 16px);
              border: none;
              resize: none;
              outline: none;
              padding: 8px;
              font-size: 13px;
            }

            .emoji-vue-wraper {
              height: 100%;

              .emoji-picker-container {
                width: 100% !important;
                height: 100%;

                .emoji-vue-textarea {
                  width: 100%;
                  height: 100%;
                  padding: 0;
                }

                .emoji-wysiwyg-editor {
                  width: calc(100% - 16px) !important;
                  height: calc(100% - 16px) !important;
                  padding: 8px;
                  text-align: left;
                  border: none;
                  outline: none;
                }

                .emoji-picker-icon {
                  left: 12px;
                  top: -32px;
                  color: #a5a5a5;
                }
              }
            }
          }

          .btn {
            background-color: #c7c7c7;
            position: absolute;
            right: 15px;
            bottom: 10px;
            height: 36px;
            line-height: 37px;
            font-size: 15px;
            color: #fff;
            padding: 0 10px;
            border-radius: 3px;
            cursor: pointer;
            user-select: none;

            .btn_su {
              padding: 0 5px;
            }

            .sendTypeMask {
              position: absolute;
              top: -155%;
              right: 0;
              height: 55px;
              width: 250px;
              display: flex;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

              .sendTypeMask_set {
                background-color: #dadada;
                flex: 2;
                position: relative;

                i {
                  position: absolute;
                  left: 14px;
                  top: 2px;
                  font-size: 25px;

                  &.active {
                    top: 30px;
                  }
                }
              }

              .sendTypeMask_text {
                flex: 8;
                background-color: #fff;
                color: #666;
                padding: 5px 0;

                div {
                  height: 25px;
                  width: 100%;
                  text-align: left;
                  font-size: 12px;
                  text-indent: 8px;
                  line-height: 25px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
