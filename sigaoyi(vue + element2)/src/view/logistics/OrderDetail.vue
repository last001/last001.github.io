<template>
  <div class="OrderDetail" ref="OrderDetail">
    <div class="main" v-title :data-title="browserTitle"></div>
    <form action="">
      <div class="compile">
        <div class="hint"><i class="mustIcon">*</i>为必须填</div>
        <!-- 订单 -->
        <div class="order">
          <div>订单</div>
          <hr />
        </div>
        <div class="orderDetial">
          <div class="orderLeft">
            <div class="orderStatus">
              <span>订单状态<i class="mustIcon">*</i></span>
              <el-select
                v-model="optionIndex"
                :disabled="orderDisabled"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="domestic">
              <div>国内单号<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="orderId"
                  v-model="row.orderId"
                />
              </div>
            </div>
            <div class="international">
              <div>国际单号</div>
              <div>
                <input
                  type="text"
                  placeholder="请输入"
                  id="order_id"
                  v-model="row.order_id"
                />
              </div>
            </div>
          </div>
          <div class="orderRigth">
            <div class="deliveryTime">
              <div>发货状态</div>
              <div>
                <input
                  type="text"
                  v-model="row.shipDate"
                  disabled
                  placeholder="必须填"
                />
              </div>
            </div>
            <div class="transferNumber">
              <div>转运单号</div>
              <div>
                <input
                  type="text"
                  placeholder="请输入转运单号"
                  id="orderId1"
                  v-model="row.orderId1"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 基本信息 -->
        <div class="baseInfo">
          <div>基本信息</div>
          <hr />
        </div>
        <div class="baseInfoDetial">
          <div class="baseInfoLeft">
            <div class="Info">
              <div>
                <span>姓名<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="name"
                  v-model="row.name"
                />
              </div>
            </div>
            <div class="Info">
              <div>
                <span>电话<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="phone"
                  v-model="row.phone"
                />
              </div>
            </div>
            <div class="Info">
              <div>
                <span>洲/省<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="consignee_state"
                  v-model="row.consignee_state"
                />
              </div>
            </div>
            <div class="Info">
              <div>
                <span>平台单号</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="请输入平台单号"
                  id="platformorder"
                  v-model="row.platformorder"
                />
              </div>
            </div>
          </div>
          <div class="baseInfoRight">
            <div class="Info">
              <div>邮编<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="postcode"
                  v-model="row.postcode"
                />
              </div>
            </div>
            <div class="Info">
              <div>地址<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="text"
                  @blur="selfMotion()"
                  id="address"
                  v-model="row.address"
                  placeholder="必须填"
                />
              </div>
            </div>
            <div class="Info">
              <div>城市<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="text"
                  id="consignee_city"
                  placeholder="必须填"
                  v-model="row.consignee_city"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 产品信息 -->
        <div class="productInfo">
          <div>产品信息</div>
          <hr />
        </div>
        <div class="productInfoDetial">
          <div class="productInfoLeft">
            <div class="Info">
              <div class="text">
                <span>属性选项<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="属性选项"
                  id="attributes"
                  v-model="row.attributes"
                />
                <!-- <i>请输入属性选项</i> -->
              </div>
            </div>
            <div class="Info">
              <div class="text">
                <span>数量<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="text"
                  v-model="row.quantity"
                  id="quantity"
                  placeholder="数量"
                />
              </div>
            </div>
            <div class="Info InfoSelect">
              <div class="text">
                <span>采购方式<i class="mustIcon">*</i></span>
              </div>
              <div>
                <el-select v-model="purchaseIndex" placeholder="请选择">
                  <el-option
                    v-for="item in purchaseType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="Info">
              <div class="text">
                <span>采购链接</span>
              </div>
              <div class="files">
                <input
                  type="text"
                  class="link"
                  id="link"
                  v-model="row.link"
                  placeholder="采购链接"
                />
                <div>
                  <span>上传链接</span>
                  <input
                    type="file"
                    class="inputFlie"
                    multiple
                    @change="updataLink($event)"
                    title=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="productInfoRight">
            <div class="Info">
              <div>售价<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="number"
                  value="0"
                  id="price"
                  v-model="row.price"
                  placeholder="必须填"
                />
              </div>
            </div>
            <div class="Info">
              <div>产品采购价</div>
              <div>
                <input
                  type="number"
                  placeholder="产品采购价"
                  id="purchasePrice"
                  v-model="row.purchasePrice"
                />
              </div>
            </div>
            <div class="Info active">
              <div>运费价格</div>
              <div>
                <input
                  type="text"
                  placeholder="0"
                  :disabled="freightDisabled"
                  ref="freight"
                  id="freight"
                  v-model="row.freight"
                  v-show="infoData.statu != '5'"
                />
                <input
                  type="text"
                  disabled
                  v-model="row.freightprofit"
                  v-show="infoData.statu == '0' || infoData.orderStatu == 0"
                  :class="infoData.statu == '5' ? 'active' : ''"
                  placeholder="成本价"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 物流信息 -->
        <div class="logisticsInfo">
          <div>物流信息</div>
          <hr />
        </div>
        <div class="logisticsInfoDetial">
          <div class="logisticsInfoLeft">
            <div class="Info">
              <div class="text">
                <span>重量<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="number"
                  v-model="row.weight"
                  id="weight"
                  placeholder="必须填"
                  @blur="planStatus && plan(false)"
                />
              </div>
            </div>
            <div class="Info">
              <div class="text">
                <span>品名<i class="mustIcon">*</i></span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="productName"
                  v-model="row.productName"
                />
              </div>
            </div>
            <div class="Info selectInfo">
              <div class="text">
                <span>收件国家<i class="mustIcon">*</i></span>
              </div>
              <div>
                <el-select v-model="countryIndex" placeholder="请选择">
                  <el-option
                    v-for="item in countryList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="Info selectInfo">
              <div class="text">
                <span>运输方式<i class="mustIcon">*</i></span>
              </div>
              <div>
                <el-select v-model="tradeIndex" placeholder="请选择">
                  <el-option
                    v-for="item in tradeTypeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="logisticsInfoRight">
            <div class="Info active">
              <div class="text">长*宽*高(cm)<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="text"
                  :class="planStatus ? '' : 'active'"
                  placeholder="长"
                  id="length"
                  v-model="row.length"
                />
                <span>*</span>
                <input
                  type="text"
                  :class="planStatus ? '' : 'active'"
                  placeholder="宽"
                  id="width"
                  v-model="row.width"
                />
                <span>*</span>
                <input
                  type="text"
                  :class="planStatus ? '' : 'active'"
                  placeholder="高"
                  id="high"
                  v-model="row.high"
                />
                <el-button
                  type="primary"
                  size="small"
                  @click="plan(true)"
                  v-show="planStatus"
                  >计抛</el-button
                >
              </div>
            </div>
            <div class="Info">
              <div class="text">英文名<i class="mustIcon">*</i></div>
              <div>
                <input
                  type="text"
                  placeholder="必须填"
                  id="englishName"
                  v-model="row.englishName"
                />
              </div>
            </div>
            <div class="Info">
              <div class="text">申报</div>
              <div>
                <input
                  type="text"
                  value="18"
                  id="dedare"
                  v-model="row.dedare"
                  placeholder="申报"
                />
              </div>
            </div>
            <div
              class="Info"
              v-show="infoData.statu == '0' || infoData.orderStatu == 0"
            >
              <div class="text">
                <span>发货渠道</span>
              </div>
              <div>
                <el-select
                  v-model="channelIndex"
                  @change="plan()"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in channelList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <!-- 订单备注 -->
        <div class="orderComment">
          <div>订单备注</div>
          <hr />
        </div>
        <div class="teatrea">
          <textarea
            v-show="row.note != ''"
            rows="14"
            cols="80"
            placeholder="请填写订单备注"
            v-model="row.note"
            disabled
          >
          </textarea>
          <textarea
            rows="14"
            cols="80"
            placeholder="请添加订单备注"
            v-model="noteAdd"
          >
          </textarea>
        </div>
        <!-- 系统默认数据 -->
        <div class="defauitData">
          <div>系统默认数据</div>
          <hr />
        </div>
        <div class="defauitDataDetial">
          <div class="Info">
            <div>
              <span>录入用户</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="请输入录入用户"
                v-model="row.clientName"
                disabled
              />
            </div>
          </div>
          <div class="InfoTime">
            <div><span>录入时间</span></div>
            <div>
              <el-date-picker
                v-model="row.enterDate"
                type="date"
                placeholder="选择日期"
                disabled
              >
              </el-date-picker>
            </div>
          </div>
        </div>
        <!-- 产品图片 -->
        <div class="productData">
          <div>产品图片</div>
          <hr />
        </div>
        <div class="productPicture">
          <div
            class="addimg"
            v-show="imgSrcData.length"
            v-for="(item, index) in imgSrcData"
            :key="index"
          >
            <div class="v-img">
              <el-tooltip
                class="item"
                effect="dark"
                content="点击将要删除图片"
                placement="top"
              >
                <i class="el-icon-close" @click="deleteImg(item, index)"></i>
              </el-tooltip>
              <div class="demo-image__preview" title="点击可预览图片">
                <el-image :src="item.imgSrc" :preview-src-list="largeImg">
                </el-image>
              </div>
              <!-- <img :src="item.imgSrc" alt="" /> -->
            </div>
          </div>
          <div class="pictureDiv">
            <div class="updata">
              <i class="el-icon-plus"></i>
              <input
                type="file"
                multiple
                @change="uploading($event)"
                ref="uploadInt"
                accept="image/*"
                title=""
              />
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <el-button
            type="primary"
            icon="el-icon-folder-checked"
            @click="AddOrder()"
            v-show="addStatus"
            >保存</el-button
          >
          <el-button
            type="success"
            v-show="payOrderStatus"
            @click="payOrder()"
            icon="el-icon-money"
            >下单</el-button
          >
          <el-button
            type="primary"
            v-show="cancelPrint"
            @click="cancelOrder()"
            icon="el-icon-folder-delete"
            >取消订单</el-button
          >
          <el-button
            type="success"
            v-show="printStatus"
            icon="el-icon-printer"
            @click="clickPrint()"
            >打印</el-button
          >
          <el-button type="info" @click="goBack()" icon="el-icon-back"
            >返回</el-button
          >
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import "../../assets/less/productOrder/OrderDetail/OrderDetail.css";
import dateFormats from "../../assets/js/dateFormat";
import timestampToTimes from "../../assets/js/timestampToTime";
import uploadFiles from "../../assets/js/uploadFile";
import uploadPdfs from "../../assets/js/uploadPdf";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
var first = false;
export default {
  data() {
    return {
      infoData: {},
      //   传过来的row
      row: {},
      //  浏览器标题
      browserTitle: "",
      //   optionsList
      optionIndex: 9,
      optionsList: [
        { name: "未入库", value: 9 },
        { name: "库存件", value: 0 },
        { name: "已订货", value: 1 },
        { name: "已发货", value: 2 },
        { name: "已完成", value: 3 },
        { name: "待填采购价", value: 4 },
        { name: "待付采购价", value: 5 },
        { name: "待填运费", value: 6 },
        { name: "待付运费", value: 7 },
        { name: "处理跟进中", value: 8 },
      ],
      // 收件国家
      countryIndex: "JP",
      countryList: [
        { name: "日本", value: "JP" },
        { name: "菲律宾", value: "1" },
        { name: "美国", value: "2" },
        { name: "英国", value: "3" },
      ],
      //   采购方式
      purchaseIndex: 0,
      purchaseType: [
        { name: "自采购", value: 0 },
        { name: "待采购", value: 1 },
      ],
      // 发货渠道
      channelIndex: "99",
      channelList: [
        { name: "未选择", selected: true, value: "99" },
        { name: "佐川普货免抛", selected: false, value: "PK0009" },
        { name: "佐川特货", selected: false, value: "佐川" },
        // { name: "佐川普货", selected: false, value: "RB-DS3" },
        { name: "佐川加急", selected: false, value: "RB-DS3" },
        { name: "佐川普货-LTW", selected: false, value: "LTW" },
        { name: "佐川普货-DPC", selected: false, value: "DPC" },
        { name: "青岛-免抛", selected: false, value: "QDMP" },
        { name: "佐川带电", selected: false, value: "JPSADD" },
        { name: "黑猫3cm", selected: false, value: "黑猫" },
        { name: "黑猫3cm带电", selected: false, value: "黑猫带电" },
        { name: "黑猫普货5cm", selected: false, value: "黑猫普货5cm" },
        { name: "黑猫带电5cm", selected: false, value: "黑猫带电5cm" },
        { name: "Qxpress", selected: false, value: "Qxpress" },
        { name: "E特快", selected: false, value: "ETK" },
        { name: "EMS", selected: false, value: "EMS" },
        { name: "CNE", selected: false, value: "CNE" },
        { name: "CNE广州", selected: false, value: "CNEGZ" },
        { name: "日邮小包", value: "日邮小包" },
        { name: "国内退货", selected: false, value: "国内退货" },
      ],
      // 运输方式
      tradeIndex: "99",
      tradeTypeList: [
        { name: "未选择", value: "99" },
        { name: "青岛-免抛", value: "QDMP" },
        { name: "佐川", value: "佐川" },
        { name: "佐川加急", value: "RB-DS3" },
        { name: "黑猫", value: "黑猫" },
        { name: "带电渠道", value: "JPSADD" },
        { name: "Qxpress", value: "Qxpress" },
        { name: "ETK", value: "ETK" },
        { name: "EMS", value: "EMS" },
        { name: "日邮小包", value: "日邮小包" },
        { name: "国内退货", value: "国内退货" },
      ],
      // 计抛  product_id
      product_id: "",
      // 添加的图片路径
      imgSrcData: [],
      //  file
      file: "",
      //   添加备注
      noteAdd: "",
      //  订单状态的disabled
      orderDisabled: true,
      //   下单按钮 show and hidden
      payOrderStatus: true,
      // 取消订单的 show and hidden status
      cancelPrint: false,
      //   打印 的 show and hidden status
      printStatus: false,
      //   保存按钮状态
      addStatus: true,
      //  重量iniput 离开事件
      planStatus: true,
      // 运费disabled
      freightDisabled: false,
      // 是否已经保存
      isSave: true,
      // 运输方式disabled + 发货渠道
      tradeDisabled: false,
      channelDisabled: false,
      // 图片放大
      largeImg: [],
    };
  },
  //   判断页面是否刷新
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    first = false;

    if (from.path == "/") {
      first = true;
    }
    next();
  },
  created() {
    // console.log("this.$route.query.id ==>", this.$route);
    // 区分点击进来的 按钮 是添加还是编辑
    if (
      this.InfoData.statu == "0" ||
      this.InfoData.userName == "王焕杰" ||
      this.InfoData.userName == "任治琴" ||
      this.InfoData.userName == "李健明" ||
      this.InfoData.userName == "王杰" ||
      this.InfoData.userName == "hzsugoi" ||
      this.InfoData.statu == "5"
    ) {
      this.planStatus = true;
    } else {
      this.planStatus = false;
    }

    // 运费disabled
    if (
      this.InfoData.statu == "0" ||
      this.InfoData.userName == "王焕杰" ||
      this.InfoData.userName == "任治琴" ||
      this.InfoData.userName == "李健明" ||
      this.InfoData.userName == "王杰"
    ) {
      this.freightDisabled = false;
    } else {
      this.freightDisabled = true;
    }

    // 账号  hzsugoi 去除 已完成
    if (this.InfoData.userName == "hzsugoi") {
      this.optionsList = [
        { name: "未入库", value: 9, selected: true },
        { name: "库存件", value: 0, selected: false },
        { name: "已订货", value: 1, selected: false },
        { name: "已发货", value: 2, selected: false },
        { name: "待填采购价", value: 4, selected: false },
        { name: "待付采购价", value: 5, selected: false },
        { name: "待填运费", value: 6, selected: false },
        { name: "待付运费", value: 7, selected: false },
        { name: "处理跟进中", value: 8, selected: false },
      ];
    }

    if (this.$route.query.rowStatus) {
      this.browserTitle = "修改订单";
      this.getList(this.$route.query.id);
      //   this.selfMotion();
    } else {
      this.browserTitle = "添加订单";
      this.infoData = this.InfoData;
      var time = timestampToTimes.timestampToTime(new Date());
      this.row = {
        clientName: this.infoData.userName,
        name: "",
        postcode: "",
        phone: "",
        address: "",
        weight: "",
        englishName: "",
        productName: "",
        dedare: "18",
        image: "",
        note: "",
        enterDate: time,
        orderId: "",
        orderId1: "",
        attributes: "",
        price: "0",
        shipDate: "未发货",
        consignee_state: "",
        consignee_city: "",
        product_id: "",
        trade_type: "99",
        country: "JP",
        order_id: "",
        link: "",
        platformorder: "",
        trade_type1: "99",
        quantity: 1,
        status: 0,
        purchaseMode: 0,
        collectionStatus: 0,
        width: 0,
        high: 0,
        length: 0,
        freight: 0,
        freightprofit: 0,
        purchasePrice: 0,
      };
      // 判断创库人员
      if (
        this.InfoData.userName == "王焕杰" ||
        this.InfoData.userName == "任治琴" ||
        this.InfoData.userName == "李健明" ||
        this.InfoData.userName == "王杰" ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.statu == "5"
      ) {
        this.infoData["orderStatu"] = 0;
        // 账号 5
        if (this.InfoData.statu == "5") {
          this.tradeIndex = "QDMP";
          this.channelIndex = "QDMP";
          //   订单状态
          this.optionIndex = 2;
          this.orderDisabled = true;
          this.channelDisabled = true;
          this.tradeDisabled = true;
        }
      }
      this.payOrderStatus = false;
    }
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    ...homeActions(["setWstateStatus"]),
    // 返回上一级
    goBack() {
      //  未保存之前 返回提示  非管理员 保存自动返回刷新 管理员 不自动返回  点击返回 不提示
      if (this.isSave) {
        let flag = confirm("您还未保存,是否要退出?");
        if (flag) {
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
            this.$router.push({
              name: "LogisticsOrder",
              query: { first: first },
            });
          }, 400);
        }
      } else {
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
          this.$router.push({
            name: "LogisticsOrder",
            query: { first: first },
          });
        }, 400);
      }
    },
    // 地址失去焦点事件
    selfMotion() {
      if (this.row.address == "") {
        return;
      }

      let address;
      let arr1 = ["県", "都", "府"];
      let arr2 = ["市", "区", "郡"];
      //   洲 /省
      for (let i = 0; i < arr1.length; i++) {
        if (this.row.address.indexOf(arr1[i]) > -1) {
          address = this.row.address.split(arr1[i]);
          this.row.consignee_state = address[0] + arr1[i];
        }
      }

      if (address == undefined) {
        // this.row.consignee_state = "";
        // this.row.consignee_city = "";
        return;
      }

      if (address[1] == "" || address[1] == undefined) {
        this.row.consignee_city = "";
      } else {
        //   城市
        for (let i = 0; i < arr2.length; i++) {
          if (address[1].indexOf(arr2[i]) > -1) {
            address[1] = address[1].split("市");
            this.row.consignee_city = address[1][0] + arr2[i];
          }
        }
      }
      //   都 県 府
      //   区 郡 市
    },
    // 删除图片
    deleteImg(item, index) {
      this.imgSrcData.splice(index, 1);
    },
    // 上传链接
    updataLink(e) {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = "/sigaoyi/UploadPDF";
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
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
            this.row.link = result.data.path;
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
    // 上传图片
    uploading(e) {
      var formData = new FormData();
      if (e.target.files.length > 1) {
        for (let i = 0; i < e.target.files.length; i++) {
          // 向 formData 对象中添加文件
          formData.append("file", e.target.files[i]);
        }
      } else {
        this.file = e.target.files[0];
        // 向 formData 对象中添加文件
        formData.append("file", this.file);
      }

      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = "/sigaoyi/logisticsupload";
      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 300);
          if (result.data.Code == 200) {
            if (e.target.files.length > 1) {
              let imgStrList;
              imgStrList = result.data.path.split(",");
              for (let i = imgStrList.length; i > 0; i--) {
                if (imgStrList[i] == "") {
                  imgStrList.splice(i, 1);
                }
              }
              for (let j = 0; j < imgStrList.length; j++) {
                var imgObj = { imgSrc: "" };
                imgObj.imgSrc = imgStrList[j];
                this.imgSrcData.push(imgObj);
              }
              this.$refs.uploadInt.value = "";
            } else {
              var imgObj = { imgSrc: "" };
              imgObj.imgSrc = result.data.path;
              this.imgSrcData.push(imgObj);
              this.$refs.uploadInt.value = "";
            }
            this.$notify({
              title: "请求成功",
              message: "上传图片成功！",
              type: "success",
              offset: 50,
            });
          } else {
            this.$refs.uploadInt.value = "";
            this.$notify({
              title: "请求失败",
              message: "上传图片失败！",
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.$refs.uploadInt.value = "";
          setTimeout(() => {
            loading.close();
          }, 300);

          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试！",
            type: "error",
            offset: 50,
          });
        });
    },
    // 根据传过来的id 拿值
    getList(id) {
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
      this.$axios({
        url: "/sigaoyi/NEWtoaddLogistics",
        method: "POST",
        params: {
          id: id,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            for (const key in result.data.logistics) {
              if (result.data.logistics[key] == "null") {
                result.data.logistics[key] = "";
              }
            }
            this.row = result.data.logistics;
            this.getPurchaseType();
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
    // 获取初始值
    getPurchaseType() {
      this.infoData = this.InfoData;

      // 备注
      this.noteAdd = "";
      this.row.note = this.row.note.replace(/--/g, "\n");

      // 订单状态
      this.optionIndex = this.row.status;

      // 采购方式
      this.purchaseIndex = this.row.purchaseMode;

      // 运输方式
      this.tradeIndex = this.row.trade_type;

      // 发货渠道
      this.channelIndex = this.row.trade_type1;

      //    图片链接
      if (this.row.image != "") {
        this.imgSrcData = [];
        let imgList = this.row.image.split(",");
        for (let i = 0; i < imgList.length; i++) {
          var objImg = { imgSrc: "" };
          objImg.imgSrc = imgList[i];
          this.imgSrcData.push(objImg);
          // 放大图片层
          this.largeImg.push(imgList[i]);
        }
      }

      // 判断创库人员
      if (
        this.InfoData.userName == "王焕杰" ||
        this.InfoData.userName == "任治琴" ||
        this.InfoData.userName == "李健明" ||
        this.InfoData.userName == "王杰" ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.statu == "5"
      ) {
        this.infoData["orderStatu"] = 0;
        // 账号 5
        if (this.InfoData.statu == "5") {
          this.tradeIndex = "QDMP";
          this.channelIndex = "QDMP";
          //   订单状态
          this.optionIndex = 2;
          this.channelDisabled = true;
          this.tradeDisabled = true;
          this.plan();
        }
      }

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
        "RB-DS3",
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
        "PK0009",
        "PK00091",
      ];

      //   payOrderStatus   true 显示     false  隐藏
      if (this.infoData.statu == "0" || this.infoData.orderStatu == 0) {
        //   订单状态值
        this.orderDisabled = false;
        if (this.infoData.statu == "5") {
          this.orderDisabled = true;
        }
        if (this.row.status != 6 && this.row.status != 7) {
          this.cancelPrint = false;
          this.printStatus = false;
          //
          this.payOrderStatus = true;
          // 判断 渠道 下单
          if (placeArr.indexOf(this.row.trade_type1) > -1) {
            this.payOrderStatus = true;
          } else {
            this.payOrderStatus = false;
          }
        } else {
          // 已下单 判断

          this.payOrderStatus = false;

          //  判断 渠道 取消订单
          if (cansrArr.indexOf(this.row.trade_type1) > -1) {
            this.cancelPrint = true;
          } else {
            this.cancelPrint = false;
          }

          //   判断 渠道 打印
          if (printArr.indexOf(this.row.trade_type1) > -1) {
            this.printStatus = true;
          } else {
            this.printStatus = false;
          }
        }
      } else {
        //   订单状态值
        this.orderDisabled = true;
        //  下单按钮 状态值
        this.payOrderStatus = false;
        // 取消下单
        this.cancelPrint = false;
        // 打印
        this.printStatus = false;
      }
    },
    // 重量焦点离开/点击计抛按钮 事件
    plan(flag) {
      if (this.row.address == "") {
        this.$message({
          message: "请输入收件人地址",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.channelIndex == "99" || this.channelIndex == "") {
        this.$message({
          message: "请选择发货渠道",
          center: true,
          duration: 600,
          type: "error",
        });
        this.row.freight = 0;
        return;
      }
      let data = {
        PlanToThrow: 1,
        userName: this.infoData.userName,
        length: Number(this.row.length),
        width: Number(this.row.width),
        high: Number(this.row.high),
        weight: Number(this.row.weight),
        trade_type: this.tradeIndex,
        trade_type1: this.channelIndex,
        address: this.row.address,
      };

      if (!flag) {
        data.PlanToThrow = 0;
      }

      this.$axios({
        url: "/sigaoyi/NEWFreightCalculation",
        method: "POST",
        params: data,
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.row.freight = result.data.freight;
            this.row.freightprofit = result.data.freightprofit.toFixed(3);
            this.row.weight = result.data.weight1.toFixed(3);
            this.product_id = result.data.product_id;
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
    // 点击保存
    AddOrder() {
      // 修改时间格式
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
      var time = timestampToTimes.timestampToTime(new Date());
      if (this.$route.query.rowStatus) {
        // 修改
        var data = {
          id: this.row.id,
          name: this.row.name,
          postcode: this.row.postcode,
          phone: this.row.phone,
          address: this.row.address,
          weight: this.row.weight,
          englishName: this.row.englishName,
          productName: this.row.productName,
          dedare: this.row.dedare,
          quantity: Number(this.row.quantity),
          image: "",
          note: "",
          clientName: this.row.clientName,
          enterDate: time,
          orderId: this.row.orderId,
          orderId1: this.row.orderId1,
          status: this.optionIndex,
          attributes: this.row.attributes,
          price: this.row.price,
          purchaseMode: this.purchaseIndex,
          purchasePrice: Number(this.row.purchasePrice),
          collectionStatus: this.row.collectionStatus,
          shipDate: this.row.shipDate,
          consignee_state: this.row.consignee_state,
          consignee_city: this.row.consignee_city,
          product_id: this.product_id,
          trade_type: this.tradeIndex,
          country: "JP",
          order_id: this.row.order_id,
          freight: Number(this.row.freight),
          link: this.row.link,
          platformorder: this.row.platformorder,
          trade_type1: this.channelIndex,
          length: this.row.length,
          width: this.row.width,
          high: this.row.high,
          freightprofit: this.row.freightprofit,
          userId: this.InfoData.id,
        };
        if (this.noteAdd == "") {
          data.note = this.row.note;
        } else {
          // 备注
          data.note =
            "--" +
            this.row.note +
            "--" +
            this.noteAdd +
            `--订单更新时间：${time}` +
            "操作人：" +
            this.InfoData.userName;
        }
        // 图片路径
        this.imgSrcData.forEach((e) => {
          data.image += `${e.imgSrc},`;
        });
        data.image = data.image.slice(0, data.image.length - 1);

        for (const key in data) {
          if (data[key] == "null") {
            data[key] = "";
          }
        }

        // 提示
        if (data.shipDate == "NaN-NaN-NaN" || data.shipDate == "1970-01-01") {
          this.$message({
            message: "发货时间格式不正确!",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.orderId == "") {
          this.$message({
            message: "请输入国内单号",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.name == "") {
          this.$message({
            message: "请输入姓名",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.postcode == "") {
          this.$message({
            message: "请输入邮编",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.phone == "") {
          this.$message({
            message: "请输入电话号码",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.address == "") {
          this.$message({
            message: "请输入地址",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.consignee_state == "") {
          this.$message({
            message: "请输入洲/省",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.consignee_city == "") {
          this.$message({
            message: "请输入市",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.attributes == "") {
          this.$message({
            message: "请输入属性选项",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.quantity == "" || data.quantity == 0) {
          this.$message({
            message: "输入的数量格式不正确",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.weight == "") {
          this.$message({
            message: "请输入重量",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.englishName == "") {
          this.$message({
            message: "请输入英文名",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.productName == "") {
          this.$message({
            message: "请输入品名",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        console.log("data ==>", data);
        // 发起请求
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/NEWaddlogistics",
          method: "POST",
          params: data,
        })
          .then((result) => {
            setTimeout(() => {
              loading.close();
            }, 500);
            if (result.data.Code == 200) {
              this.isSave = false;
              first = true;
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              this.row = data;
              this.getPurchaseType();
              if (
                this.InfoData.userName == "王焕杰" ||
                this.InfoData.userName == "任治琴" ||
                this.InfoData.userName == "李健明" ||
                this.InfoData.userName == "王杰" ||
                this.InfoData.userName == "hzsugoi" ||
                this.InfoData.statu == "0"
              ) {
              } else {
                // 除了管理员之外 保存将自动返回 刷新
                this.$router.push({
                  name: "LogisticsOrder",
                  query: { first: true },
                });
              }
            } else {
              first = false;
              this.$notify({
                title: "请求失败",
                message: result.data.msg,
                type: "warning",
                offset: 50,
              });
            }
          })
          .catch((err) => {
            first = false;
            setTimeout(() => {
              loading.close();
            }, 500);
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
          });
      } else {
        //  添加
        var data = {
          id: 0,
          name: this.row.name,
          postcode: this.row.postcode,
          phone: this.row.phone,
          address: this.row.address,
          weight: this.row.weight,
          englishName: this.row.englishName,
          productName: this.row.productName,
          dedare: this.row.dedare,
          quantity: Number(this.row.quantity),
          image: "",
          note: "",
          clientName: this.infoData.userName,
          //   clientName_id: this.InfoData.userId,
          enterDate: time,
          orderId: this.row.orderId,
          orderId1: this.row.orderId1,
          status: this.optionIndex,
          attributes: this.row.attributes,
          price: this.row.price,
          purchaseMode: this.purchaseIndex,
          purchasePrice: Number(this.row.purchasePrice),
          collectionStatus: 0,
          shipDate: this.row.shipDate,
          consignee_state: this.row.consignee_state,
          consignee_city: this.row.consignee_city,
          product_id: this.product_id,
          trade_type: this.tradeIndex,
          country: "JP",
          order_id: this.row.order_id,
          freight: Number(this.row.freight),
          link: this.row.link,
          platformorder: this.row.platformorder,
          trade_type1: this.channelIndex,
          length: Number(this.row.length),
          width: Number(this.row.width),
          high: Number(this.row.high),
          freightprofit: Number(this.row.freightprofit),
          userId: this.InfoData.id,
        };
        // 备注
        if (this.noteAdd == "") {
          data.note = this.row.note;
        } else {
          // 备注
          data.note =
            "--" +
            this.row.note +
            "--" +
            this.noteAdd +
            `--订单更新时间：${time}` +
            "操作人：" +
            this.InfoData.userName;
        }

        // 图片路径
        this.imgSrcData.forEach((e) => {
          data.image += `${e.imgSrc},`;
        });
        data.image = data.image.slice(0, data.image.length - 1);

        // 提示
        if (data.name == "") {
          this.$message({
            message: "请输入姓名",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.orderId == "") {
          this.$message({
            message: "请输入国内单号",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.postcode == "") {
          this.$message({
            message: "请输入邮编",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.phone == "") {
          this.$message({
            message: "请输入电话号码",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.address == "") {
          this.$message({
            message: "请输入地址",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.consignee_state == "") {
          this.$message({
            message: "请输入洲/省",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.consignee_city == "") {
          this.$message({
            message: "请输入市",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.attributes == "") {
          this.$message({
            message: "请输入属性选项",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.quantity == "" || data.quantity == 0) {
          this.$message({
            message: "输入的数量格式不正确",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.weight == "") {
          this.$message({
            message: "请输入重量",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.englishName == "") {
          this.$message({
            message: "请输入英文名",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        if (data.productName == "") {
          this.$message({
            message: "请输入品名",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }

        // 发起请求
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        this.$axios({
          url: "/sigaoyi/NEWaddlogistics",
          method: "POST",
          params: data,
        })
          .then((result) => {
            loading.close();

            if (result.data.Code == 200) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              setTimeout(() => {
                this.$router.push({
                  name: "LogisticsOrder",
                  query: { first: true },
                });
              }, 400);
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
            loading.close();
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
          });
      }
    },
    // 下单
    payOrder() {
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
      let flag = confirm("下单前您是否有修改内容\n\n如已修改,请单击保存在下单");
      if (flag) {
        // value 值
        var tradeTypeVal = "";
        //   接口
        var url = "";
        // 发货渠道
        tradeTypeVal = this.row.trade_type1;

        if (tradeTypeVal == "RB-DS3") {
          url = "/sigaoyi/RecordYDH";
        } else if (
          //   专享特惠东南亚专线 专享邮政 专享快速日本专线(5)
          tradeTypeVal == "PK0009" ||
          tradeTypeVal == "PK00091"
        ) {
          //   日本小包(义达国际)(2)
          url = "/sigaoyi/RecordYCGJ";
        } else if (
          tradeTypeVal == "EYB" ||
          tradeTypeVal == "EYB1" ||
          tradeTypeVal == "ETK" ||
          tradeTypeVal == "ZX"
        ) {
          //   上海E邮宝 E特快 MXE中日专线
          url = "/sigaoyi/Record";
        } else if (
          tradeTypeVal == "DPC" ||
          tradeTypeVal == "JPSADD" ||
          tradeTypeVal == "佐川"
        ) {
          url = "/sigaoyi/RecordDPC";
        } else if (tradeTypeVal == "CNE") {
          url = "/sigaoyi/RecordCNE";
        } else if (tradeTypeVal == "CNEGZ") {
          url = "/sigaoyi/RecordCNEGZ";
        } else if (tradeTypeVal == "LTW") {
          url = "/sigaoyi/RecordLTW";
          if (this.row.order_id == "") {
            this.$message({
              message: "国际单号不能为空",
              duration: 1000,
              center: true,
              type: "error",
            });
            return;
          }
        } else {
          this.$message({
            message: "请选择正确的发货渠道",
            duration: 1000,
            center: true,
            type: "error",
          });
          return;
        }
        // DS3 PK0009  PK00091 EYB EYB1 ETK ZX DPC JPSADD 佐川 CNE
        // 发起请求
        let loading = this.$loading({
          lock: false,
          text: "下单中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: url,
          method: "POST",
          params: {
            id: this.row.id,
            cookie: "",
          },
        })
          .then((result) => {
            setTimeout(() => {
              loading.close();
            }, 500);

            if (result.data.Code == 200) {
              this.getList(this.$route.query.id);
              //   this.getPurchaseType();
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
            setTimeout(() => {
              loading.close();
            }, 500);
          });
      }
    },
    // 取消订单  orderId
    cancelOrder() {
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

      var url = "";
      if (this.row.trade_type1 == "RB-DS3") {
        url = "/sigaoyi/cancelOrderYDH";
      } else if (
        this.row.trade_type1 == "DPC" ||
        this.row.trade_type1 == "JPSADD" ||
        this.row.trade_type1 == "佐川"
      ) {
        url = "/sigaoyi/cancelOrderDPC";
      } else if (
        this.row.trade_type1 == "PK0009" ||
        this.row.trade_type1 == "PK00091"
      ) {
        url = "/sigaoyi/cancelOrderYCGJ";
      } else if (this.row.trade_type1 == "CNE") {
        url = "/sigaoyi/cancelOrderCNE";
      } else if (this.row.trade_type1 == "CNEGZ") {
        url = "/sigaoyi/cancelOrderCNEGZ";
      } else if (
        this.row.trade_type1 == "EYB" ||
        this.row.trade_type1 == "EYB1" ||
        this.row.trade_type1 == "ETK" ||
        this.row.trade_type1 == "ZX"
      ) {
        //   上海E邮宝 E特快 MXE中日专线 不能取消订单
        this.$message({
          message: "该运输方式的订单不能取消",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
      // 发起请求
      let loading = this.$loading({
        lock: false,
        text: "取消订单中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: url,
        method: "POST",
        params: {
          id: this.row.id,
          cookie: "",
        },
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);

          if (result.data.Code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.getList(this.$route.query.id);
            // this.getPurchaseType();
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
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
          setTimeout(() => {
            loading.close();
          }, 500);
        });
    },
    // 打印
    clickPrint() {
      if (
        this.row.trade_type1 == "EYB" ||
        this.row.trade_type1 == "EYB1" ||
        this.row.trade_type1 == "ETK" ||
        this.row.trade_type1 == "ZX"
      ) {
        window.open(
          "http://111.231.107.138/order/FastRpt/PDF_NEW.aspx?PrintType=lab10_10&order_id=" +
            this.row.order_id
        );
        return;
      } else if (
        this.row.trade_type1 == "DPC" ||
        this.row.trade_type1 == "JPSADD" ||
        this.row.trade_type1 == "佐川"
      ) {
        // EYB EYB1 ETK ZX DPC JPSADD 佐川 CNE RB-DS3
        window.open(
          `http://www.ec-sigaoyi.com/sigaoyi/printlabel?name=${this.row.name}&add=${this.row.address}&productName=${this.row.englishName}&quantity=${this.row.quantity}&postCode=${this.row.postcode}&orderNumber=${this.row.orderId1}&phone${this.row.phone}`
        );
        return;
      } else if (this.row.trade_type1 == "CNE") {
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/printorderCNE",
          method: "POST",
          params: {
            orderId: this.row.orderId1,
          },
        })
          .then((result) => {
            loading.close();

            if (result.data.Code == 200) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              window.open(result.data.lable_file);
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
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
            loading.close();
          });
        return;
      } else if (this.row.trade_type1 == "RB-DS3") {
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/printorderYDH",
          method: "POST",
          params: {
            orderId: this.row.orderId1,
          },
        })
          .then((result) => {
            loading.close();

            if (result.data.Code == 200) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              window.open(result.data.lable_file);
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
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
            loading.close();
          });
        return;
      } else if (this.row.trade_type1 == "CNEGZ") {
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/printorderCNEGZ",
          method: "POST",
          params: {
            orderId: this.row.orderId1,
          },
        })
          .then((result) => {
            loading.close();

            if (result.data.Code == 200) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              window.open(result.data.lable_file);
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
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
            loading.close();
          });
        return;
      } else if (
        this.row.trade_type1 == "PK0009" ||
        this.row.trade_type1 == "PK00091"
      ) {
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/printorderYCGJ",
          method: "POST",
          params: {
            orderId: this.row.orderId1,
          },
        })
          .then((result) => {
            loading.close();

            if (result.data.Code == 200) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
              window.open(result.data.lable_file);
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
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
            loading.close();
          });
      } else {
        this.$message({
          message: "不能打印",
          type: "warning",
          center: true,
          duration: 800,
        });
        return;
      }
    },
  },
  watch: {
    "$route.query.id": function () {
      console.log("this.$route.query.id ==>", this.$route.query.id);
      if (this.$route.query.id == undefined) {
        this.browserTitle = "添加订单";
        this.infoData = this.InfoData;
        var time = timestampToTimes.timestampToTime(new Date());
        this.row = {
          clientName: this.infoData.userName,
          name: "",
          postcode: "",
          phone: "",
          address: "",
          weight: "",
          englishName: "",
          productName: "",
          dedare: "18",
          image: "",
          note: "",
          enterDate: time,
          orderId: "",
          orderId1: "",
          attributes: "",
          price: "0",
          shipDate: "未发货",
          consignee_state: "",
          consignee_city: "",
          product_id: "",
          trade_type: "99",
          country: "JP",
          order_id: "",
          link: "",
          platformorder: "",
          trade_type1: "99",
          quantity: 1,
          status: 0,
          purchaseMode: 0,
          collectionStatus: 0,
          width: 0,
          high: 0,
          length: 0,
          freight: 0,
          freightprofit: 0,
          purchasePrice: 0,
        };
        // 判断创库人员
        if (
          this.InfoData.userName == "王焕杰" ||
          this.InfoData.userName == "任治琴" ||
          this.InfoData.userName == "李健明" ||
          this.InfoData.userName == "王杰" ||
          this.InfoData.userName == "hzsugoi" ||
          this.InfoData.statu == "5"
        ) {
          this.infoData["orderStatu"] = 0;
          // 账号 5
          if (this.InfoData.statu == "5") {
            this.tradeIndex = "QDMP";
            this.channelIndex = "QDMP";
            //   订单状态
            this.optionIndex = 2;
            this.orderDisabled = true;
            this.channelDisabled = true;
            this.tradeDisabled = true;
          }
        }
        this.payOrderStatus = false;
        return;
      }
      this.getList(this.$route.query.id);
    },
  },
};
</script>