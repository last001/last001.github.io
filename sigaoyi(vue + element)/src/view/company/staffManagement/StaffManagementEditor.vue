<template>
  <div class="staffManagementEditor">
    <div class="main" v-title :data-title="dataTitle"></div>
    <div class="staffManagementEditorInfo">
      <div class="v-staffManagementEditorInfo">
        <div class="hint"><i class="mustIcon">*</i>为必须填</div>
        <!-- 头像 -->
        <div class="besicInfo">
          <div class="besicHeader clearfix">
            <span class="fl">基本信息</span>
            <hr class="fl" />
          </div>
          <div class="besicContent">
            <div class="headerImg">
              <div class="addDiv" v-if="this.$route.query.saveAdd">
                <input
                  type="file"
                  accept="image/*"
                  title="点击上传头像"
                  @change="uploadFile($event)"
                />
                <img :src="defaultUrl" alt="" />
              </div>
              <div class="compile" v-else>
                <input
                  type="file"
                  accept="image/*"
                  title="点击上传头像"
                  @change="uploadFile($event)"
                />
                <img :src="defaultUrl" alt="" />
              </div>
            </div>
            <div class="rightList" :style="{ marginLeft: marginleft + 'px' }">
              <div>
                <span><font>编号</font><font>：</font></span>
                <input
                  type="text"
                  :value="infoData.userId"
                  ref="userId"
                  placeholder="必须填"
                />
              </div>
              <div class="nickName">
                <span><font>昵称</font><font>：</font></span>
                <input
                  type="text"
                  :value="infoData.userName"
                  ref="userName"
                  placeholder="必须填"
                />
              </div>
              <div class="name">
                <span><font>姓名</font><font>：</font></span>
                <input
                  type="text"
                  :value="infoData.actualName"
                  ref="actualName"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span><font>密码</font><font>：</font></span>
                <input
                  type="text"
                  :value="infoData.userPassword"
                  ref="userPassword"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span><font>邮箱</font><font>：</font></span>
                <input
                  type="text"
                  :value="infoData.mailbox"
                  ref="mailbox"
                  placeholder="必须填"
                />
              </div>
              <div class="phone">
                <span>手机号码：</span>
                <input
                  type="number"
                  :value="infoData.phoneNumber"
                  ref="phoneNumber"
                  placeholder="必须填"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <div class="besicHeader clearfix">
            <span class="fl">内容描述</span>
            <hr class="fl" />
          </div>
          <div class="v-Content">
            <div class="v-Content-list">
              <div>
                <span>公司名<i class="mustIcon">*</i></span>
                <input
                  type="text"
                  ref="company"
                  :value="row.company"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>总订单数<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  ref="AllorderNum"
                  :value="row.AllorderNum"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>代付费用<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  ref="PayForAnotherFreight"
                  :value="row.PayForAnotherFreight"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>累计消费</span>
                <input
                  type="number"
                  ref="AllConsumption"
                  :value="row.AllConsumption"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span class="wSpan"
                  >当前未发货订单数<i class="mustIcon">*</i></span
                >
                <input
                  type="number"
                  ref="AtPersentUnfilledOrder"
                  :value="row.AtPersentUnfilledOrder"
                  placeholder="必须填"
                />
              </div>
            </div>
            <div class="v-Content-list">
              <div>
                <span>账号余额<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  ref="userNameBalance"
                  :value="row.userNameBalance"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>累计充值</span>
                <input
                  type="number"
                  ref="Allrecharge"
                  :value="row.Allrecharge"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>未付运费订单<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  ref="UnpaidFreightOrder"
                  :value="row.UnpaidFreightOrder"
                  placeholder="必须填"
                />
              </div>
              <div>
                <span>账号欠费催收<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  ref="userNameOWEcollection"
                  :value="row.userNameOWEcollection"
                  placeholder="必须填"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- btn -->
        <div class="btn">
          <el-button icon="el-icon-back" @click="GoBack()">返回</el-button>
          <el-button icon="el-icon-folder-checked" @click="save()"
            >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../assets/less/staffManagement/staffManagementEditor/staffManagementEditor.less";
import uploadFiles from "../../../assets/js/uploadFile";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //   marginleft
      marginleft: "",
      //   标题
      dataTitle: "",
      //   默认头像
      defaultUrl:
        "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg",
      //   years
      years: "",
      //   个人信息
      infoData: {},
      //   传过来的row
      row: {},
    };
  },
  created() {
    if (sessionStorage.getItem("token") == undefined) {
      alert("请先登陆!");
      this.$router.push({ name: "Login" });
      return;
    }
    let d = new Date();
    this.years = d.getFullYear();
    this.setWstateStatus(true);
    // 区分是点击添加按钮 还是点编辑过来的页面
    if (this.$route.query.flag) {
      this.row = {};
      this.infoData = {};
      this.dataTitle = "添加员工提成";
    } else {
      this.row = JSON.parse(this.$route.query.row);
      this.infoData = this.InfoData;
      this.dataTitle = "编辑员工提成";
    }

    // marginleft
    if (this.WstateStatus) {
      this.marginleft = 270;
    } else {
      this.marginleft = 365;
    }
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    ...homeActions(["setWstateStatus"]),
    lisentLeft() {
      if (this.WstateStatus) {
        this.marginleft = 270;
      } else {
        this.marginleft = 365;
      }
    },
    // 返回
    GoBack() {
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 300);
      setTimeout(() => {
        this.$router.go(-1);
      }, 400);
    },
    // 保存
    save() {
      let data = {
        company: this.$refs.company.value,
        AllorderNum: this.$refs.AllorderNum.value,
        PayForAnotherFreight: this.$refs.PayForAnotherFreight.value,
        AllConsumption: this.$refs.AllConsumption.value,
        AtPersentUnfilledOrder: this.$refs.AtPersentUnfilledOrder.value,
        userNameBalance: this.$refs.userNameBalance.value,
        Allrecharge: this.$refs.Allrecharge.value,
        UnpaidFreightOrder: this.$refs.UnpaidFreightOrder.value,
        userNameOWEcollection: this.$refs.userNameOWEcollection.value,
        // ArrearsAccountCollection:this.$refs.ArrearsAccountCollection.value
      };
      for (const key in data) {
        if (key != "company") {
          data[key] = Number(data[key]);
        }
      }

      // 发起请求
    },
  },
  watch: {
    WstateStatus: "lisentLeft",
  },
};
</script>

<style>
</style>