<template>
  <div class="purchaseCompile" ref="purchaseCompile">
    <div class="main" v-title :data-title="browserTitle"></div>
    <div class="purchaseCompileInfo">
      <div class="hint"><i class="mustIcon">*</i>为必须填</div>
      <form action="">
        <div class="number">
          <div class="besicHeader clearfix">
            <span class="fl">编号</span>
            <hr class="fl" />
          </div>
          <div class="purchaseCompileContent">
            <div class="number-type">
              <div>
                <span>产品名称/编号<i class="mustIcon">*</i></span>
                <input
                  type="text"
                  v-model="row.name"
                  id="name"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>数量<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  v-model="row.quantity"
                  id="quantity"
                  placeholder="必须填"
                />
              </div>
            </div>
            <div class="besicHeader clearfix">
              <span class="fl">状态</span>
              <hr class="fl" />
            </div>
            <div class="status">
              <div class="v-status">
                <div>
                  <span class="text">待出库<i class="mustIcon">*</i></span>
                  <input
                    type="number"
                    v-model="row.inventory"
                    id="inventory"
                    placeholder="必须填"
                  />
                </div>
                <div>
                  <span>破损<i class="mustIcon">*</i></span>
                  <input
                    type="number"
                    v-model="row.damaged"
                    id="damaged"
                    placeholder="必须填"
                  />
                </div>
                <div class="set" v-show="infoData.admitor">
                  <span class="text">状态<i class="mustIcon">*</i></span>
                  <el-select
                    v-model="statusIndex"
                    disabled
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in statusList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="v-status">
                <div>
                  <span>丢失<i class="mustIcon">*</i></span>
                  <input
                    type="number"
                    v-model="row.lost"
                    id="lost"
                    placeholder="必须填"
                  />
                </div>
                <div>
                  <span>已出库<i class="mustIcon">*</i></span>
                  <input
                    type="number"
                    v-model="row.ship"
                    id="ship"
                    placeholder="必须填"
                  />
                </div>
              </div>
            </div>
            <div class="besicHeader forDiv clearfix">
              <span class="fl">详情信息</span>
              <hr class="fl" />
            </div>
            <div class="pic-affi" :style="{ marginLeft: marginleft + 'px' }">
              <div class="v-pic-affi">
                <div class="picture">
                  <span>图片<i class="mustIcon">*</i></span>
                  <div class="imgList" v-show="row.img != ''">
                    <img :src="row.img" alt="" />
                    <i class="clear" @click="clearImg()">×</i>
                  </div>
                  <div>
                    <i class="el-icon-plus"></i>
                    <input
                      type="file"
                      accept="image/*"
                      ref="uploadInt"
                      title="点击上传图片"
                      @change="updataImg($event)"
                    />
                  </div>
                </div>
                <div class="affiliation">
                  <span>认领人<i class="mustIcon">*</i></span>
                  <input
                    type="text"
                    v-model="row.belonger"
                    id="belonger"
                    placeholder="请输入认领人"
                  />
                </div>
              </div>
              <div class="v-pic-affi">
                <span>备注</span>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="12"
                  placeholder="请输入备注"
                  v-model="row.remarks"
                ></textarea>
              </div>
            </div>
            <div class="besicHeader forDiv clearfix">
              <span class="fl">系统信息</span>
              <hr class="fl" />
            </div>
            <div class="system">
              <div class="godown">
                <div>
                  <span>入库时间</span>
                  <el-date-picker
                    v-model="row.storageTime"
                    type="date"
                    :disabled="!infoData.admitor"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
                <div>
                  <span>入库人员<i class="mustIcon">*</i></span>
                  <input
                    type="text"
                    v-model="row.belonger"
                    id="belonger"
                    placeholder="必须填"
                  />
                </div>
              </div>
              <div class="update">
                <div>
                  <span>更新时间</span>
                  <input type="text" disabled v-model="destoryTime" />
                </div>
                <div>
                  <span>更新操作人员</span>
                  <input
                    disabled
                    type="text"
                    v-model="infoData.userName"
                    placeholder="更新操作人员"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">
          <el-button
            type="primary"
            @click="save()"
            icon="el-icon-folder-checked"
            >保存</el-button
          >
          <el-button type="success" @click="exit()" icon="el-icon-back"
            >返回</el-button
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import "../assets/less/purchaSellStock/purchaseCompile/purchaseCompile.less";
import uploadPdfs from "../assets/js/uploadPdf";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
let firstRouter = false;
export default {
  data() {
    return {
      infoData: {},
      //  marginleft
      marginleft: 0,
      //  浏览器标题
      browserTitle: "",
      //   当前时间
      time: "",
      // 定时器
      timer: null,
      //更新时间
      destoryTime: "",
      // 状态
      statusIndex: 3,
      statusList: [
        { name: "待出库", selected: true, value: 3 },
        { name: "已出库", selected: false, value: 4 },
        { name: "已退回", selected: false, value: 5 },
      ],
      // 传过来的row
      row: {},
    };
  },
  created() {
    // 初始个人信息
    this.infoData = this.InfoData;
    // 设置 管理员
    if (
      this.infoData.statu == "0" ||
      this.infoData.userName == "王焕杰" ||
      this.infoData.userName == "汪春梅" ||
      this.infoData.userName == "李健明" ||
      this.infoData.userName == "王杰" ||
      this.infoData.userName == "hzsugoi"
    ) {
      this.infoData["admitor"] = true;
    } else {
      this.infoData["admitor"] = false;
    }
    this.browserTitle = "修改编号";
    this.getList(this.$route.query.id);
    // marginleft
    if (this.WstateStatus) {
      this.marginleft = 0;
    } else {
      this.marginleft = 27;
    }
    // 启动定时器
    this.timer = null;
    clearInterval(this.timer);
  },
  computed: {
    ...homeState(["WstateStatus", "timerNum", "InfoData", "firstStatus"]),
  },
  mounted() {
    this.getTimer();
    this.timer = setInterval(() => {
      this.getTimer();
    }, 1000);
    // 离开页面清除定时器
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
  methods: {
    lisenLeft() {
      if (this.WstateStatus) {
        this.marginleft = 0;
      } else {
        this.marginleft = 27;
      }
    },
    // 获取数据
    getList(id) {
      //   请求
      this.$axios({
        url: "/sigaoyi/getInvoicingInfo",
        method: "POST",
        params: {
          id: id,
        },
      })
        .then((result) => {
          if (result.data.Code == "200") {
            this.statusIndex = result.data.invoicing.status;
            this.row = result.data.invoicing;
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
    // 获取当前时间
    getTimer() {
      let d = new Date();
      let year = d.getFullYear();
      let month =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + `${d.getMonth() + 1}`;
      let day = d.getDate() >= 10 ? d.getDate() : "0" + `${d.getDate()}`;
      let hours = d.getHours() >= 10 ? d.getHours() : "0" + `${d.getHours()}`;
      let minutes =
        d.getMinutes() >= 10 ? d.getMinutes() : "0" + `${d.getMinutes()}`;
      let second =
        d.getSeconds() >= 10 ? d.getSeconds() : "0" + `${d.getSeconds()}`;

      this.time =
        year +
        "-" +
        month +
        "-" +
        day +
        "  " +
        hours +
        ":" +
        minutes +
        ":" +
        second;
      this.$nextTick(function () {
        this.destoryTime = this.time;
        this.getTimerNum(this.destoryTime);
      });
    },
    // 上传图片
    updataImg(e) {
      // uploadPdf
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let url = "/sigaoyi/invoicingupload";

      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          this.$refs.uploadInt.value = null;
          setTimeout(() => {
            loading.close();
          }, 300);
          if (result.data.Code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.row.img = result.data.path;
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
          this.$refs.uploadInt.value = null;
          setTimeout(() => {
            loading.close();
          }, 300);

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 删除图片
    clearImg() {
      this.row.img = "";
    },
    // 保存
    save() {
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
      let data = {
        id: this.row.id,
        orderNo: this.row.orderNo,
        belonger: this.row.belonger,
        name: this.row.name,
        quantity: this.row.quantity,
        inventory: this.row.inventory,
        damaged: this.row.damaged,
        lost: this.row.lost,
        ship: this.row.ship,
        remarks: this.row.remarks,
        imgUrl: this.row.img,
        status: this.statusIndex,
      };

      //   请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/updateInvoicingInfo",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          if (result.data.Code == "200") {
            firstRouter = true;
            this.getList(this.$route.query.id);
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            firstRouter = false;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          loading.close();
          firstRouter = false;

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 返回
    exit() {
      this.$router.push({
        name: "PurchaseList",
        query: { flag: firstRouter },
      });
    },
    ...homeActions(["setWstateStatus", "getTimerNum", "setFirstStatus"]),
  },
  watch: {
    WstateStatus: "lisenLeft",
    "$route.query.id": function () {
      this.getList(this.$route.query.id);
    },
  },
};
</script>