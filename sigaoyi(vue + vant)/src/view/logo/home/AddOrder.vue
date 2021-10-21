<template>
  <div class="addOrder">
    <div class="title">
      <van-nav-bar
        title="添加/上传订单"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      >
        <template #right>
          <div class="updata" v-show="rightBtn">
            <van-button type="info" size="mini">上传</van-button>
            <input
              type="file"
              title="导入订单"
              ref="uploadOrder"
              @change="uploadOrder($event)"
            />
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="box">
      <!-- 订单状态 -->
      <div class="set must" :class="orderDis ? '' : 'isUser'">
        <div class="header">订单状态<i class="must">*</i></div>
        <van-cell
          is-link
          :title="orderStateData.title"
          @click="orderDis && showFace(orderStateData)"
          :class="orderStateData.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="orderStateData.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, orderStateData)"
              @cancel="onCancel(orderStateData)"
              :columns="orderStateData.list"
              show-toolbar
              :default-index="orderStateData.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 发货状态 -->
      <div class="int dis">
        <span>发货状态</span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.shipDate"
            disabled
          />
        </span>
      </div>
      <!-- 国内单号 -->
      <div class="int must">
        <span>国内单号<i class="must">*</i></span>
        <span>
          <input type="text" placeholder="请输入" v-model="orderList.orderId" />
        </span>
      </div>
      <!-- 转运单号 -->
      <div class="int">
        <span>转运单号</span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.orderId1"
          />
        </span>
      </div>
      <!-- 国际单号 -->
      <div class="int">
        <span>国际单号</span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.order_id"
          />
        </span>
      </div>
      <!-- 姓名 -->
      <div class="int must">
        <span>姓名<i class="must">*</i></span>
        <span>
          <input type="text" placeholder="请输入" v-model="orderList.name" />
        </span>
      </div>
      <!-- 电话 -->
      <div class="int must">
        <span>电话<i class="must">*</i></span>
        <span>
          <input type="text" placeholder="请输入" v-model="orderList.phone" />
        </span>
      </div>
      <!-- 邮箱 -->
      <div class="int must">
        <span>邮箱<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.postcode"
          />
        </span>
      </div>
      <!-- 地址 -->
      <div class="int must">
        <span>地址<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.address"
            @input="addressCompletion"
          />
        </span>
      </div>
      <!-- 洲/省 -->
      <div class="int must">
        <span>洲/省<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.consignee_state"
          />
        </span>
      </div>
      <!-- 城市 -->
      <div class="int must">
        <span>城市<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.consignee_city"
          />
        </span>
      </div>
      <!-- 属性选项 -->
      <div class="int must">
        <span>属性选项<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.attributes"
          />
        </span>
      </div>
      <!-- 平台单号 -->
      <div class="int">
        <span>平台单号</span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.platformorder"
          />
        </span>
      </div>
      <!-- 品名 -->
      <div class="int must">
        <span>品名<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.productName"
          />
        </span>
      </div>
      <!-- 英文名 -->
      <div class="int must">
        <span>英文名<i class="must">*</i></span>
        <span>
          <input
            type="text"
            placeholder="请输入"
            v-model="orderList.englishName"
          />
        </span>
      </div>
      <!-- 数量 -->
      <div class="int must">
        <span>数量<i class="must">*</i></span>
        <span>
          <input
            type="number"
            placeholder="请输入"
            v-model="orderList.quantity"
          />
        </span>
      </div>
      <!-- 重量 -->
      <div class="int must">
        <span>重量<i class="must">*</i></span>
        <span>
          <input
            type="number"
            placeholder="请输入"
            v-model="orderList.weight"
          />
        </span>
      </div>
      <!-- 长度(cm) -->
      <div class="int must">
        <span>长度(cm)<i class="must">*</i></span>
        <span>
          <input
            type="number"
            placeholder="请输入"
            v-model="orderList.length"
          />
        </span>
      </div>
      <!-- 宽度(cm) -->
      <div class="int must">
        <span>宽度(cm)<i class="must">*</i></span>
        <span>
          <input type="number" placeholder="请输入" v-model="orderList.width" />
        </span>
      </div>
      <!-- 高度(cm) -->
      <div class="int must">
        <span>高度(cm)<i class="must">*</i></span>
        <span>
          <input type="number" placeholder="请输入" v-model="orderList.high" />
        </span>
      </div>
      <!-- 出售价格 -->
      <div class="int must">
        <span>出售价格<i class="must">*</i></span>
        <span>
          <input type="number" placeholder="请输入" v-model="orderList.price" />
        </span>
      </div>
      <!-- 采购价格 -->
      <div class="int">
        <span>采购价格</span>
        <span>
          <input
            type="number"
            placeholder="请输入"
            v-model="orderList.purchasePrice"
          />
        </span>
      </div>
      <!-- 运费价格 -->
      <div class="int" :class="freightState ? 'dis' : ''">
        <span>运费价格</span>
        <span>
          <input
            type="number"
            placeholder="请输入"
            :disabled="freightState"
            v-model="orderList.freight"
          />
        </span>
      </div>
      <!-- 申报 -->
      <div class="int">
        <span>申报</span>
        <span>
          <input type="text" placeholder="请输入" v-model="orderList.dedare" />
        </span>
      </div>
      <!-- 采购链接 -->
      <div class="int">
        <span>采购链接</span>
        <span>
          <input type="text" placeholder="请输入" v-model="orderList.link" />
        </span>
      </div>
      <!-- 采购方式 -->
      <div class="set must">
        <div class="header">采购方式<i class="must">*</i></div>
        <van-cell
          is-link
          :title="purchaseType.title"
          @click="showFace(purchaseType)"
          :class="purchaseType.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="purchaseType.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, purchaseType)"
              @cancel="onCancel(purchaseType)"
              :columns="purchaseType.list"
              show-toolbar
              :default-index="purchaseType.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 收件国家 -->
      <div class="set must">
        <div class="header">收件国家<i class="must">*</i></div>
        <van-cell
          is-link
          :title="countryList.title"
          @click="showFace(countryList)"
          :class="countryList.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="countryList.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, countryList)"
              @cancel="onCancel(countryList)"
              :columns="countryList.list"
              show-toolbar
              :default-index="countryList.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 运输方式 -->
      <div class="set">
        <div class="header">运输方式</div>
        <van-cell
          is-link
          :title="tradeTypeList.title"
          @click="showFace(tradeTypeList)"
          :class="tradeTypeList.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="tradeTypeList.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, tradeTypeList)"
              @cancel="onCancel(tradeTypeList)"
              :columns="tradeTypeList.list"
              show-toolbar
              :default-index="tradeTypeList.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 发货渠道 -->
      <div class="set" v-show="channelState">
        <div class="header">发货渠道</div>
        <van-cell
          is-link
          :title="channelList.title"
          @click="showFace(channelList)"
          :class="channelList.title == '请选择' ? '' : 'active'"
        />
        <van-action-sheet v-model="channelList.status">
          <div class="content">
            <van-picker
              @confirm="conFirm($event, channelList)"
              @cancel="onCancel(channelList)"
              :columns="channelList.list"
              show-toolbar
              :default-index="channelList.index"
            />
          </div>
        </van-action-sheet>
      </div>
      <!-- 订单备注 + 上传图片 -->
      <div class="note">
        <van-field
          v-model="orderList.note1"
          rows="4"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入订单备注"
          show-word-limit
        />
        <div class="addImg">
          <div>
            <span
              ><van-icon name="plus" size="50" color="#ccc" />
              <input
                type="file"
                multiple
                @change="uploading($event)"
                ref="uploadInt"
                accept="image/*"
                title="上传图片"
            /></span>
          </div>
          <div>
            <span
              v-for="(item, index) in imgList"
              :key="index"
              @click="lagerImage(item)"
            >
              <img :src="item.imgSrc" />
              <van-icon name="cross" color="red" />
            </span>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="btn">
        <van-button round type="info" size="normal" @click="save()"
          >保存</van-button
        >
      </div>
      <!-- 预览图片 -->
      <van-image-preview v-model="largeImgState" :images="images">
      </van-image-preview>
    </div>
  </div>
</template>

<script>
import timestampToTimes from "@/assets/js/timestampToTime";
import "@/assets/less/addOrder/addOrder.css";
export default {
  data() {
    return {
      id: 0,
      // 个人信息
      infoData: {},
      // 状态5 show
      rightBtn: true,
      // 拦截用户点击 订单状态
      orderDis: false,
      //  订单状态
      orderStateData: {
        title: "未入库",
        status: false,
        value: 9,
        index: 0,
        list: [
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
      },
      //   采购方式
      purchaseType: {
        title: "自采购",
        status: false,
        value: 0,
        index: 0,
        list: [
          { text: "自采购", value: 0 },
          { text: "待采购", value: 1 },
        ],
      },
      //   收件国家
      countryList: {
        title: "日本",
        status: false,
        value: "JP",
        index: 0,
        list: [
          { text: "日本", value: "JP" },
          { text: "菲律宾", value: "1" },
          { text: "美国", value: "2" },
          { text: "英国", value: "3" },
        ],
      },
      //   运输方式
      tradeTypeList: {
        title: "请选择",
        status: false,
        value: "",
        index: 0,
        list: [
          { text: "未选择", value: "99" },
          { text: "青岛-免抛", value: "QDMP" },
          { text: "佐川", value: "佐川" },
          { text: "黑猫", value: "黑猫" },
          { text: "带电渠道", value: "JPSADD" },
          { text: "Qxpress", value: "Qxpress" },
          { text: "ETK", value: "ETK" },
          { text: "EMS", value: "EMS" },
          { text: "国内退货", value: "国内退货" },
        ],
      },
      //  发货渠道 show
      channelState: false,
      //   发货渠道
      channelList: {
        title: "请选择",
        status: false,
        value: "",
        index: 0,
        list: [
          { text: "未选择", value: "99" },
          { text: "佐川普货免抛", value: "PK0009" },
          { text: "佐川特货", value: "佐川" },
          { text: "佐川普货", value: "RB-DS3" },
          { text: "佐川普货-LTW", value: "LTW" },
          { text: "佐川普货-DPC", value: "DPC" },
          { text: "青岛-免抛", value: "QDMP" },
          { text: "佐川带电", value: "JPSADD" },
          { text: "黑猫3cm", value: "黑猫" },
          {
            text: "黑猫3cm带电",
            value: "黑猫带电",
          },
          {
            text: "黑猫普货5cm",
            value: "黑猫普货5cm",
          },
          { text: "黑猫带电5cm", value: "黑猫带电5cm" },
          { text: "Qxpress", value: "Qxpress" },
          { text: "E特快", value: "ETK" },
          { text: "EMS", value: "EMS" },
          { text: "CNE", value: "CNE" },
          { text: "CNE广州", value: "CNEGZ" },
          { text: "国内退货", value: "国内退货" },
        ],
      },
      // 添加订单 list
      orderList: {
        id: 0,
        orderId: "",
        order_id: "",
        shipDate: "未发货",
        orderId1: "",
        name: "",
        phone: "",
        consignee_state: "",
        platformorder: "",
        postcode: "",
        address: "",
        consignee_city: "",
        attributes: "",
        quantity: 1,
        price: 0,
        purchasePrice: 0,
        freight: 0,
        link: "",
        weight: "",
        productName: "",
        length: 0,
        width: 0,
        high: 0,
        dedare: 18,
        englishName: "",
        note: "",
        note1: "",
        status: 9,
        purchaseMode: "",
        trade_type: "",
        trade_type1: "",
        country: "",
        image: "",
        clientName: "",
        enterDate: "",
        collectionStatus: 0,
        product_id: "",
        userId: "",
        // 成本价
        freightprofit: 0,
      },
      // 运费价格 dis
      freightState: true,
      // 图片数组
      imgList: [],
      // 预览图片
      largeImgState: false,
      // 预览图片数组
      images: [],
      // 是否以保存
      isSave: false,
    };
  },
  created() {
    this.getInitial();
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.orderList = [];
      this.getOrderList();
    }
    // console.log("this.id ==>", this.id);
  },
  mounted() {
    //   解决input 失去焦点问题
    let inputEle = document.querySelectorAll("input");
    // console.log("inputEle ==>", inputEle);
    for (let i = 0; i < inputEle.length; i++) {
      inputEle[i].addEventListener("click", function () {
        document.querySelector("body").classList.remove("mui-focusin"); //移除组件的class
      });
    }
  },
  beforeDestroy() {
    //销毁前添加，避免出错
    document.querySelector("body").classList.add("mui-focusin");
  },
  methods: {
    //   返回 + 提示
    onClickLeft() {
      if (this.isSave) {
        this.$router.back();
      } else {
        this.$dialog
          .confirm({
            message: "您还未保存是否要退出？",
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            confirmButtonColor: "#409eff",
          })
          .then(() => {
            this.$router.back();
          })
          .catch(() => {});
      }
    },
    // 获取 id 初始值
    getOrderList() {
      this.$axios({
        url: "/sigaoyi/NEWtoaddLogistics",
        method: "POST",
        params: {
          id: this.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.orderList = result.data.logistics;
            this.randenState();
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 获取管理员
    getInitial() {
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (
        this.infoData.userName == "王焕杰" ||
        this.infoData.userName == "任治琴" ||
        this.infoData.userName == "李健明" ||
        this.infoData.userName == "王杰" ||
        this.infoData.userName == "hzsugoi"
      ) {
        this.infoData["sysAdmini"] = "0";
      }
      // 判断订单状态dsi + 渠道show
      if (this.infoData.sysAdmini == "0" || this.infoData.statu == "0") {
        this.orderDis = true;
        this.channelState = true;
        this.freightState = false;
      }
      // 状态为5 没有上传按钮
      if (this.infoData.statu == "5") {
        this.rightBtn = false;
      }
    },
    // 状态 渲染
    randenState() {
      // 订单状态
      this.orderStateData.list.forEach((e, i) => {
        if (e.value == this.orderList.status) {
          this.orderStateData.title = e.text;
          this.orderStateData.value = e.value;
          this.orderStateData.index = i;
        }
      });
      // 采购方式
      this.purchaseType.list.forEach((e, i) => {
        if (e.value == this.orderList.purchaseMode) {
          this.purchaseType.title = e.text;
          this.purchaseType.value = e.value;
          this.purchaseType.index = i;
        }
      });
      //   收件国家
      this.countryList.list.forEach((e, i) => {
        if (e.value == this.orderList.country) {
          this.countryList.title = e.text;
          this.countryList.value = e.value;
          this.countryList.index = i;
        }
      });
      //  运输方式
      this.tradeTypeList.list.forEach((e, i) => {
        if (e.value == this.orderList.trade_type) {
          this.tradeTypeList.title = e.text;
          this.tradeTypeList.value = e.value;
          this.tradeTypeList.index = i;
        }
      });
      // 发货渠道
      this.channelList.list.forEach((e, i) => {
        if (e.value == this.orderList.trade_type1) {
          this.channelList.title = e.text;
          this.channelList.value = e.value;
          this.channelList.index = i;
        }
      });
      // 备注 展示
      if (this.infoData.sysAdmini == "0" || this.infoData.statu == "0") {
        this.orderList["note1"] = this.orderList.note.replace(/--/g, "\n");
      } else {
        this.orderList["note1"] = "";
      }
    },
    // set 展示层
    showFace(array) {
      array.status = true;
    },
    // set 取消选择
    onCancel(array) {
      array.status = false;
    },
    // set 选择确定
    conFirm(e, array) {
      array.title = e.text;
      array.value = e.value;
      this.onCancel(array);
    },
    // 上传 订单
    uploadOrder(e) {
      let files = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      formData.append("userName", this.infoData.userName);
      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        url: "/sigaoyi/NEWImportxls",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          loading.clear();
          this.$refs.uploadOrder.value = null;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.$toast(result.data.msg);
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.$refs.uploadOrder.value = null;
          this.$dialog({ message: "系统业务繁忙,请稍后再试" });
          console.log("err ==>", err);
        });
    },
    // 上传 图片
    uploading(e) {
      var formData = new FormData();
      if (e.target.files.length > 1) {
        //   console.log("大于1")
        for (let i = 0; i < e.target.files.length; i++) {
          //   console.log("e.target.files[i] ==>",e.target.files[i]);
          // 向 formData 对象中添加文件
          formData.append("file", e.target.files[i]);
        }
      } else {
        this.file = e.target.files[0];
        // 向 formData 对象中添加文件
        formData.append("file", this.file);
      }

      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        url: "/sigaoyi/logisticsupload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.$refs.uploadInt.value = "";
          loading.clear();
          if (result.data.Code == "200") {
            // 防止空 链接
            let imgStrList = [];
            imgStrList = result.data.path.split(",");
            for (let i = imgStrList.length; i > 0; i--) {
              if (imgStrList[i] == "") {
                imgStrList.splice(i, 1);
              }
            }
            if (imgStrList.length > 1) {
              // 添加入 数组
              for (let j = 0; j < imgStrList.length; j++) {
                var imgObj = { imgSrc: "" };
                imgObj.imgSrc = imgStrList[j];
                this.imgList.push(imgObj);
              }
              // 提示
              this.$toast(result.data.msg);
            } else {
              var imgObj = { imgSrc: "" };
              imgObj.imgSrc = result.data.path;
              this.imgList.push(imgObj);
            }
          } else {
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.$refs.uploadInt.value = "";
          this.$dialog({ message: "系统业务繁忙,请稍后再试" });
          console.log("err ==>", err);
        });
    },
    // 点击放大图片
    lagerImage(item) {
      this.images = [];
      this.largeImgState = true;
      this.imgList.forEach((e) => {
        this.images.push(e.imgSrc);
      });
    },
    // 计抛
    // 地址 自动补全
    addressCompletion() {
      if (this.orderList.address == "") {
        return;
      }
      console.log("进来了!!!!");
      let address;
      let arr1 = ["県", "都", "府"];
      let arr2 = ["市", "区", "郡"];
      //   洲 /省
      for (let i = 0; i < arr1.length; i++) {
        if (this.orderList.address.indexOf(arr1[i]) > -1) {
          address = this.orderList.address.split(arr1[i]);
          this.orderList.consignee_state = address[0] + arr1[i];
        }
      }

      console.log("address ==>", address);
      if (address == undefined) {
        // this.orderList.consignee_state = "";
        // this.orderList.consignee_city = "";
        return;
      }
      //   console.log("this.orderList.consignee_state ==>", this.orderList.consignee_state);
      if (address[1] == "" || address[1] == undefined) {
        this.orderList.consignee_city = "";
      } else {
        //   城市
        for (let i = 0; i < arr2.length; i++) {
          if (address[1].indexOf(arr2[i]) > -1) {
            address[1] = address[1].split("市");
            this.orderList.consignee_city = address[1][0] + arr2[i];
          }
        }
      }
      //   都 県 府
      //   区 郡 市
    },
    // 保存
    save() {
      // 提示
      if (this.orderList.orderId == "") {
        this.$toast("请输入国内单号");
        return;
      }
      if (this.orderList.name == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (this.orderList.phone == "") {
        this.$toast("请输入号码");
        return;
      }
      if (this.orderList.postcode == "") {
        this.$toast("请输入邮箱");
        return;
      }
      if (this.orderList.address == "") {
        this.$toast("请输入收件人地址");
        return;
      }
      if (this.orderList.consignee_city == "") {
        this.$toast("请输入城市");
        return;
      }
      if (this.orderList.attributes == "") {
        this.$toast("请输入属性选项");
        return;
      }
      if (this.orderList.quantity == "" || this.orderList.quantity == 0) {
        this.$toast("输入的数量不符合规范");
        return;
      }
      if (this.orderList.weight == "" || this.orderList.weight == 0) {
        this.$toast("输入的重量不符合规范");
        return;
      }
      if (this.orderList.productName == "") {
        this.$toast("请输入品名");
        return;
      }
      // 参数
      let data = {
        id: this.id,
        orderId: this.orderList.orderId,
        order_id: this.orderList.order_id,
        shipDate: "未发货",
        orderId1: this.orderList.orderId1,
        name: this.orderList.name,
        phone: this.orderList.phone,
        consignee_state: this.orderList.consignee_state,
        platformorder: this.orderList.platformorder,
        postcode: this.orderList.postcode,
        address: this.orderList.address,
        consignee_city: this.orderList.consignee_city,
        attributes: this.orderList.attributes,
        quantity: Number(this.orderList.quantity),
        price: this.orderList.price,
        purchasePrice: Number(this.orderList.purchasePrice),
        freight: Number(this.orderList.freight),
        link: this.orderList.link,
        weight: Number(this.orderList.weight),
        productName: this.orderList.productName,
        length: Number(this.orderList.length),
        width: Number(this.orderList.width),
        high: Number(this.orderList.high),
        dedare: 18,
        englishName: this.orderList.englishName,
        note: "",
        status: this.orderStateData.value,
        purchaseMode: this.purchaseType.value,
        trade_type: this.tradeTypeList.value,
        trade_type1: this.channelList.value,
        country: this.countryList.value,
        image: "",
        clientName: this.infoData.userName,
        enterDate: timestampToTimes.timestampToTime(new Date()),
        collectionStatus: 0,
        product_id: "",
        userId: this.infoData.id,
        // 成本价
        freightprofit: 0,
      };
      // 图片处理
      this.imgList.forEach((e) => {
        data.image += `${e.imgSrc},`;
      });
      data.image = data.image.slice(0, data.image.length - 1);
      // 备注 
      if (this.infoData.sysAdmini == "0" || this.infoData.statu == "0") { // 管理员
          data.note = this.orderList.note1;
      }else{ //  用户   
          if(this.id == 0){ //  添加
              data.note = this.orderList.note1;
          }else{ //  编辑
              data.note = this.orderList.note + '\n' + this.orderList.note1;
          }
      }

      console.log("data ==>", data);
      const loading = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.$axios({
        url: "/sigaoyi/NEWaddlogistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.clear();
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.isSave = true;
            this.onClickLeft();
            this.$toast(result.data.msg);
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

<style>
</style>