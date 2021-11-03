<template>
  <div class="orderDetails">
    <div class="title" ref="title">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-button type="info" size="mini">修改</van-button>
        </template>
      </van-nav-bar>
    </div>
    <!-- 订单 数据 -->
    <div class="content" v-if="skeletonState">
      <div class="bg">
        <div class="status">
          <div class="status-name">
            <van-icon name="cart-circle-o" size="21" />
            <span>订单状态：</span>
            <span>{{ list.statusText }}</span>
          </div>
          <div class="v-status">
            <div class="v-status-list">
              <span>发货状态/时间：</span>
              <span>{{ list.shipDate }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bigbox" :class="btnState ? '' : 'active'">
        <div class="box">
          <!-- 收货人信息 -->
          <div class="logistics">
            <div class="info">收货人信息</div>
            <div class="name-phone">
              <span>{{ list.name }}</span>
              <span>{{ list.phone }}</span>
            </div>
            <div class="email">
              <span>邮编号码:</span>
              <span>{{ list.postcode }}</span>
            </div>
            <div class="adress">{{ list.address }}</div>
          </div>
          <!-- 商品信息 -->
          <div class="shop">
            <div class="shopName">商品信息</div>
            <!-- <div class="link">
            <van-icon name="arrow" size="16px" />
          </div> -->
          </div>
          <div class="list">
            <div class="v-list">
              <div class="img">
                <img :src="list.image1" alt="" @click="largeImage()" />
              </div>
              <div class="text">
                <div class="name">
                  品名：{{ list.productName }}( {{ list.englishName }} )
                </div>
                <div class="num-price clearfix">
                  <span class="fl">售价：{{ list.price }}</span>
                  <span class="fr">数量 x {{ list.quantity }}</span>
                </div>
                <div>
                  长*宽*高(cm)：{{ list.length }} * {{ list.width }} *
                  {{ list.high }}
                </div>
                <div class="freight">运费：{{ list.freight }}</div>
                <div class="class">属性：{{ list.attributes }}</div>
              </div>
            </div>
          </div>
          <div class="realityPay">
            <div>录入人：{{ list.clientName }}</div>
            <div>录入时间：{{ list.enterDate }}</div>
          </div>
          <!-- 基本信息 -->
          <div class="besaInfo">基本信息</div>
          <div class="orderPhone">
            <div>
              国内单号：<span>{{ list.orderId }}</span>
            </div>
            <div>
              转运单号：<span>{{ list.orderId1 }}</span>
            </div>
            <div>
              国际单号：<span>{{ list.order_id }}</span>
            </div>
            <div>
              平台单号：<span>{{ list.platformorder }}</span>
            </div>
            <div>
              采购价格：<span>{{ list.purchasePrice }}</span>
            </div>
            <div>
              采购方式：<span>{{ list.purchaseText }}</span>
            </div>
            <div>
              运输方式：<span>{{ list.trade_text }}</span>
            </div>
            <div>
              发货渠道：<span>{{ list.trade_text1 }}</span>
            </div>
            <div>
              采购链接：<span>{{ list.link }}</span>
            </div>
          </div>
          <div class="orderStatus">
            <div class="text">订单备注</div>
            <div class="remakrs">
              <textarea
                disabled
                cols="30"
                rows="8"
                v-model="list.note"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="btn" v-if="btnState">
        <van-button
          type="info"
          size="mini"
          v-show="printStatus"
          @click="clickPrint"
          >打印</van-button
        >
        <van-button
          type="warning"
          size="mini"
          v-show="cancelPrint"
          @click="clickCancel"
          >取消下单</van-button
        >
        <van-button
          type="info"
          size="mini"
          v-show="payOrderStatus"
          @click="clickPayOrder"
          >下单</van-button
        >
      </div>
    </div>
    <!-- 骨架屏状态 -->
    <div class="AllSkeleton" v-else>
      <div class="bg">
        <van-skeleton :row="1" row-width="35%" />
        <van-skeleton :row="1" row-width="50%" />
      </div>
      <div class="consignee">
        <div class="skeleton">
          <van-skeleton :row="1" row-width="20%" />
          <van-skeleton :row="1" row-width="80%" />
          <van-skeleton :row="1" row-width="30%" />
          <van-skeleton :row="1" row-width="50%" />
        </div>
      </div>
      <div class="product">
        <div class="skeleton">
          <van-skeleton :row="1" row-width="40%" />
          <div class="b_skeleton">
            <span>
              <van-skeleton :row="1" row-width="100%" />
              <van-skeleton :row="1" row-width="100%" />
              <van-skeleton :row="1" row-width="100%" />
              <van-skeleton :row="1" row-width="100%" />
              <van-skeleton :row="1" row-width="100%" />
              <van-skeleton :row="1" row-width="100%" />
            </span>
            <span>
              <van-skeleton :row="1" row-width="40%" />
              <van-skeleton :row="1" row-width="35%" />
              <van-skeleton :row="1" row-width="48%" />
              <van-skeleton :row="1" row-width="20%" />
            </span>
          </div>
          <div class="enterTime">
            <van-skeleton class="enterTime_one" :row="1" row-width="20%" />
            <van-skeleton :row="1" row-width="45%" />
          </div>
        </div>
      </div>
      <div class="baseInfo">
        <div class="skeleton">
          <div class="bace_title">
            <van-skeleton :row="1" row-width="40%" />
          </div>
          <van-skeleton :row="1" row-width="30%" />
          <van-skeleton :row="1" row-width="50%" />
          <van-skeleton :row="1" row-width="75%" />
          <van-skeleton :row="1" row-width="35%" />
          <van-skeleton :row="1" row-width="44%" />
          <van-skeleton :row="1" row-width="26%" />
        </div>
      </div>
      <div class="btnSkeleton">
        <div class="skeleton">
          <van-skeleton :row="1" row-width="15%" />
          <van-skeleton :row="1" row-width="35%" />
          <van-skeleton :row="1" row-width="15%" />
        </div>
      </div>
    </div>
    <!-- 预览图片 -->
    <van-image-preview className="orderDetailsPreview" v-model="largeImgState" :images="images">
      <template v-slot:cover><span @click="saveImage()">保存图片</span></template>
    </van-image-preview>
  </div>
</template>
<script>
import "../../../assets/less/order/orderDetails/orderDetails.css";
export default {
  data() {
    return {
      //  个人信息
      infoData: {},
      // 骨架屏状态
      skeletonState: false,
      //   传过来的id
      id: "",
      // 获取 id 数据 de 数组
      list: {},
      //  订单状态List
      orderStateList: [
        { text: "未入库", value: 9 },
        { text: "库存件", value: 0 },
        { text: "已订货", value: 1 },
        { text: "已发货", value: 2 },
        { text: "已完成", value: 3 },
        { text: "待填采购价", value: 4 },
        { text: "待付采购价", value: 5 },
        { text: "待填运费", value: 6 },
        { text: "待付运费", value: 7 },
        { text: "处理跟进中", value: 8 },
      ],
      // 采购方式
      methodTypeList: [
        { name: "", value: 99 },
        { name: "自采购", value: 0 },
        { name: "待采购", value: 1 },
      ],
      //   运输方式
      tradeTypeList: [
        { text: "", value: "99" },
        { text: "青岛-免抛", value: "QDMP" },
        { text: "佐川", value: "佐川" },
        { text: "佐川加急", value: "RB-DS3" },
        // { text: "黑猫", value: "黑猫" },
        { text: "带电渠道", value: "JPSADD" },
        { text: "Qxpress", value: "Qxpress" },
        { text: "ETK", value: "ETK" },
        { text: "EMS", value: "EMS" },
        { text: "国内退货", value: "国内退货" },
      ],
      //   发货渠道
      channelList: [
        { text: "", value: "99" },
        { text: "佐川普货免抛", value: "PK0009" },
        { text: "佐川特货", value: "佐川" },
        // { text: "佐川普货", value: "RB-DS3" },
        { text: "佐川加急", value: "RB-DS3" },
        { text: "佐川普货-LTW", value: "LTW" },
        { text: "佐川普货-DPC", value: "DPC" },
        { text: "青岛-免抛", value: "QDMP" },
        { text: "佐川带电", value: "JPSADD" },
        { text: "黑猫3cm", value: "黑猫" },
        // { text: "黑猫3cm带电", value: "黑猫带电"},
        // { text: "黑猫普货5cm", value: "黑猫普货5cm"},
        // { text: "黑猫带电5cm", value: "黑猫带电5cm" },
        { text: "Qxpress", value: "Qxpress" },
        { text: "E特快", value: "ETK" },
        { text: "EMS", value: "EMS" },
        { text: "CNE", value: "CNE" },
        { text: "国内退货", value: "国内退货" },
      ],
      // 放大图片层 状态
      largeImgState: false,
      images: [],
      // 按钮父元素 状态值
      btnState: false,
      // 下单按钮 状态值
      payOrderStatus: false,
      // 取消下单按钮 状态值
      cancelPrint: false,
      // 打印按钮 状态值
      printStatus: false,
    };
  },
  created() {
    this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
    this.id = this.$route.query.id;
    this.getList();
  },
  methods: {
    //   返回上一页
    onClickLeft() {
        this.$router.back();
    },
    // 修改
    onClickRight() {
      this.$router.push({ name: "AddOrder", query: { id: this.id } });
    },
    // 放大图片
    largeImage() {
      this.largeImgState = true;
      this.images = this.list.image.split(",");
    },
    // 获取订单id 的数据
    getList() {
      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWtoaddLogistics",
        method: "POST",
        params: {
          id: this.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.skeletonState = true;
          loading.clear();
          if (result.data.Code == 200) {
            this.list = result.data.logistics;
            this.renderList();
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          this.skeletonState = true;
          loading.clear();
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 订单处理
    renderList() {
      // 获取管理员
      if (
        this.infoData.userName == "王焕杰" ||
        this.infoData.userName == "任治琴" ||
        this.infoData.userName == "李健明" ||
        this.infoData.userName == "王杰" ||
        this.infoData.userName == "hzsugoi"
      ) {
        this.infoData["sysAdmini"] = "0";
      }
      for (const key in this.list) {
        if (this.list[key] == "null") {
          this.list[key] = "";
        }
      }
      // 图片处理
      if (this.list.image == "") {
        this.list.image =
          "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
        this.list["image1"] =
          "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
      } else {
        this.list["image1"] = this.list.image.split(",")[0];
      }
      // 订单状态处理
      this.orderStateList.forEach((e) => {
        if (this.list.status == e.value) {
          this.list["statusText"] = e.text;
        }
      });
      // 采购方式 处理
      this.methodTypeList.forEach((e) => {
        if (this.list.purchaseMode == e.value) {
          this.list["purchaseText"] = e.name;
        }
      });
      // 运输方式 处理
      this.tradeTypeList.forEach((e) => {
        if (this.list.trade_type == e.value) {
          this.list["trade_text"] = e.text;
        }
      });
      // 发货渠道
      this.channelList.forEach((e) => {
        if (this.list.trade_type1 == e.value) {
          this.list["trade_text1"] = e.text;
        }
      });
      // 备注 处理
      this.list.note = this.list.note.replace(/--/g, "\n");
      // 按钮 展示(根据运输渠道)
      // //  下单按钮 状态值
      // this.payOrderStatus = false;
      // // 取消下单
      // this.cancelPrint = false;
      // // 打印
      // this.printStatus = false;
      // 下单
      let placeArr = [
        "DS3",
        "PK0009",
        "PK00091",
        "EYB",
        "EYB1",
        "ETK",
        "ZX",
        "DPC",
        "JPSADD",
        "佐川",
        "CNE",
        "LTW",
        "CNEGZ",
      ];
      //   取消下单
      let cansrArr = [
        "RB-DS3",
        "DPC",
        "JPSADD",
        "佐川",
        "PK0009",
        "PK00091",
        "CNE",
        "EYB",
        "EYB1",
        "ETK",
        "ZX",
        "CNEGZ",
      ];
      //  打印
      let printArr = [
        "EYB",
        "EYB1",
        "ETK",
        "ZX",
        "DPC",
        "JPSADD",
        "佐川",
        "CNE",
        "RB-DS3",
        "CNEGZ",
      ];
      if (this.infoData.statu == "0" || this.infoData.sysAdmini == "0") {
        this.btnState = true;
        if (this.list.status != 6 && this.list.status != 7) {
          // 未下单
          this.cancelPrint = false;
          this.printStatus = false;
          // 判断 渠道 下单
          if (placeArr.indexOf(this.list.trade_type1) > -1) {
            this.payOrderStatus = true;
          } else {
            this.payOrderStatus = false;
            this.btnState = false;
          }
        } else {
          // 已下单
          this.payOrderStatus = false;
          //  判断 渠道 取消订单
          if (cansrArr.indexOf(this.list.trade_type1) > -1) {
            this.cancelPrint = true;
          } else {
            this.cancelPrint = false;
          }
          //   判断 渠道 打印
          if (printArr.indexOf(this.list.trade_type1) > -1) {
            this.printStatus = true;
          } else {
            this.printStatus = false;
          }

          // 不能取消订单 和 不能打印
          if (!this.cancelPrint && !this.printStatus) {
            this.btnState = false;
          }
        }
      } else {
        this.btnState = false;
      }
    },
    // 下单
    clickPayOrder() {
      console.log("this.list ==>", this.list);
      let url = "";
      if (this.list.trade_type1 == "RB-DS3") {
        url = "/sigaoyi/RecordYDH";
      } else if (
        //   专享特惠东南亚专线 专享邮政 专享快速日本专线(5)
        this.list.trade_type1 == "PK0009" ||
        this.list.trade_type1 == "PK00091"
      ) {
        //   日本小包(义达国际)(2)
        url = "/sigaoyi/RecordYCGJ";
      } else if (
        this.list.trade_type1 == "EYB" ||
        this.list.trade_type1 == "EYB1" ||
        this.list.trade_type1 == "ETK" ||
        this.list.trade_type1 == "ZX"
      ) {
        //   上海E邮宝 E特快 MXE中日专线
        url = "/sigaoyi/Record";
      } else if (
        this.list.trade_type1 == "DPC" ||
        this.list.trade_type1 == "JPSADD" ||
        this.list.trade_type1 == "佐川"
      ) {
        url = "/sigaoyi/RecordDPC";
      } else if (this.list.trade_type1 == "CNE") {
        url = "/sigaoyi/RecordCNE";
      } else if (this.list.trade_type1 == "CNEGZ") {
        url = "/sigaoyi/RecordCNEGZ";
      } else if (this.list.trade_type1 == "LTW") {
        url = "/sigaoyi/RecordLTW";
        if (this.list.order_id == "") {
          this.$toast({
            message: "国际单号不能为空",
            duration: 600,
          });
          return;
        }
      } else {
        this.$toast({
          message: "请选择正确的发货渠道",
          duration: 1000,
        });
        return;
      }
      // loading
      const loading = this.$toast.loading({
        message: "下单中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: url,
        method: "POST",
        params: {
          id: this.id,
          cookie: "",
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == 200) {
            this.getList();
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
    // 取消下单
    clickCancel() {
      var url = "";
      if (this.list.trade_type1 == "RB-DS3") {
        url = "/sigaoyi/cancelOrderYDH";
      } else if (
        this.list.trade_type1 == "DPC" ||
        this.list.trade_type1 == "JPSADD" ||
        this.list.trade_type1 == "佐川"
      ) {
        url = "/sigaoyi/cancelOrderDPC";
      } else if (
        this.list.trade_type1 == "PK0009" ||
        this.list.trade_type1 == "PK00091"
      ) {
        url = "/sigaoyi/cancelOrderYCGJ";
      } else if (this.list.trade_type1 == "CNE") {
        url = "/sigaoyi/cancelOrderCNE";
      } else if (this.list.trade_type1 == "CNEGZ") {
        url = "/sigaoyi/cancelOrderCNEGZ";
      } else if (
        this.list.trade_type1 == "EYB" ||
        this.list.trade_type1 == "EYB1" ||
        this.list.trade_type1 == "ETK" ||
        this.list.trade_type1 == "ZX"
      ) {
        //   上海E邮宝 E特快 MXE中日专线 不能取消订单
        this.$toast({
          message: "该运输方式的订单不能取消",
          duration: 600,
        });
        return;
      }
      // loading
      const loading = this.$toast.loading({
        message: "取消订单中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: url,
        method: "POST",
        params: {
          id: this.id,
          cookie: "",
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == 200) {
            this.getList();
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
    // 打印
    clickPrint() {
      var url = "";
      if (
        this.list.trade_type1 == "EYB" ||
        this.list.trade_type1 == "EYB1" ||
        this.list.trade_type1 == "ETK" ||
        this.list.trade_type1 == "ZX"
      ) {
        window.open(
          "http://111.231.107.138/order/FastRpt/PDF_NEW.aspx?PrintType=lab10_10&order_id=" +
            this.list.order_id
        );
        return;
      } else if (
        this.list.trade_type1 == "DPC" ||
        this.list.trade_type1 == "JPSADD" ||
        this.list.trade_type1 == "佐川"
      ) {
        // EYB EYB1 ETK ZX DPC JPSADD 佐川 CNE RB-DS3
        window.open(
          `http://www.ec-sigaoyi.com/sigaoyi/printlabel?name=${this.list.name}&add=${this.list.address}&productName=${this.list.englishName}&quantity=${this.list.quantity}&postCode=${this.list.postcode}&orderNumber=${this.list.orderId1}&phone${this.list.phone}`
        );
        return;
      } else if (this.list.trade_type1 == "CNE") {
        url = "/sigaoyi/printorderCNE";
      } else if (this.list.trade_type1 == "RB-DS3") {
        url = "/sigaoyi/printorderYDH";
      } else if (this.list.trade_type1 == "CNEGZ") {
        url = "/sigaoyi/printorderCNEGZ";
      } else {
        url = "/sigaoyi/printorderYCGJ";
      }

      // loading
      const loading = this.$toast.loading({
        message: "打印请求中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: url,
        method: "POST",
        params: {
          orderId: this.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == 200) {
            window.open(result.data.lable_file);
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
    // 保存图片
    saveImage() {
      let _this = this;
      if (!window.plus) return console.log("不是app!!!");
      plus.gallery.save(
        _this.images[0],
        function () {
          _this.$toast("保存相册成功!"); //_this.user_qrcode 是服务器链接，必须是图片格式
        },
        function () {
          _this.$toast("保存失败，请重试!");
        }
      );
    },
  },
};
</script>