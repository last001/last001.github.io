<template>
  <div class="order">
    <!-- 标题 -->
    <div class="order-title">
      <van-nav-bar
        title="订单中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        fixed
        v-if="searchStatus"
      >
        <template #right>
          <van-icon name="search" size="22" />
        </template>
      </van-nav-bar>
      <div class="sreach" v-else>
        <van-search
          v-model="sreachVal"
          show-action
          :placeholder="placeVal"
          @search="onSearch(sreachVal)"
          @cancel="onCancel"
          shape="round"
        />
        <div class="appoint">
          <div class="text">指定搜索内容</div>
          <div class="list">
            <div
              v-for="(item, index) in sreachList"
              :key="index"
              :class="item.isActive ? 'active' : ''"
              @click="clickSearchList(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 筛选内容 -->
    <div class="Alltransverse">
      <!-- transverseList -->
      <div class="box">
        <div
          class="v-Alltransverse"
          :class="item.textNo ? 'active' : ''"
          :style="{ color: item.isActive ? '#409eff' : '' }"
          v-for="(item, index) in transverseList"
          :key="index"
          @click="selectList(item, index)"
        >
          <div :class="item.isActive ? 'active' : ''">
            <span>{{ item.text }}</span>
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div
        class="transverseFace"
        :style="{ height: H * 0.3 + 'px', top: FaceTop + 'px' }"
      >
        <div class="face_content">
          <div class="v_face_content">
            <!-- search -->
            <div class="v_face_search" v-if="clientNameState">
              <!-- 录入用户的搜索 -->
              <input
                type="text"
                v-model="clientNameVal"
                placeholder="请输入"
                @input="searchClientName()"
              />
            </div>
            <!-- span 内容 -->
            <span
              :class="item.isActive ? 'active' : ''"
              v-for="(item, index) in contentList"
              :key="index"
              @click="selectContent(item)"
            >
              {{ item.name }}
              <van-icon name="success" v-show="item.iconState" />
            </span>
          </div>
        </div>
        <div class="face_btn">
          <van-button type="warning" @click="selectReset()">重置</van-button>
          <van-button type="info" @click="selectConfim()">确定</van-button>
        </div>
      </div>
      <!-- mask -->
      <div
        class="transverseFaceBox"
        v-show="maskState"
        :style="{ height: H + 'px' }"
        @click="clickMask()"
      ></div>
    </div>
    <!-- 订单列表 -->
    <div
      class="orderTransverse"
      v-show="orderStatus"
      :style="{
        height: emptyStatus == 2 ? H - 197 + 'px' : H - 197 + 46 + 'px',
      }"
    >
      <!-- 订单列表 -->
      <div
        class="orderList"
        :style="{ height: emptyStatus == 2 ? 'initial' : 100 + '%' }"
      >
        <!-- 向上拉动刷新 -->
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          loosing-text="释放刷新订单列表"
        >
          <!-- 未登录状态 -->
          <div class="empty" v-if="emptyStatus == 0">
            <van-empty description="暂无订单">
              <van-button
                round
                type="info"
                class="bottom-button"
                @click="gotoLogin"
                >去登录</van-button
              >
            </van-empty>
          </div>
          <!-- 骨架屏状态 -->
          <div
            class="skeleton"
            v-for="(item, index) in skeleton"
            :key="index"
            v-else-if="emptyStatus == 1"
          >
            <van-skeleton :row="1" row-width="101%" />
            <van-skeleton
              avatar-size="60"
              avatar-shape="square"
              row-width="101%"
              avatar
              :row="2"
            />
            <van-skeleton :row="1" row-width="101%" />
            <van-skeleton :row="1" row-width="101%" style="margin-left: 50%" />
          </div>
          <!-- 请求成功或者失败状态 -->
          <van-list
            v-model="loading"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :finished="finished"
            :finished-text="finishText"
            @load="onLoad"
            :immediate-check="false"
            v-else
          >
            <!-- 请求成功状态(有订单) -->
            <div class="allOrder" v-if="orderList.length > 0">
              <div
                class="allOrderList"
                v-for="(item, index) in orderList"
                :key="index"
              >
                <!-- 状态栏 -->
                <div class="all-order clearfix">
                  <div class="fl">
                    <van-checkbox
                      v-model="item.checked"
                      shape="square"
                      icon-size="16px"
                    ></van-checkbox>
                    <span>订单号：</span>
                    <span>{{ item.orderId }}</span>
                  </div>
                  <div class="fr one" v-if="item.status == 0">库存件</div>
                  <div class="fr two" v-else-if="item.status == 1">以订货</div>
                  <div class="fr three" v-else-if="item.status == 2">
                    已发货
                  </div>
                  <div class="fr four" v-else-if="item.status == 3">已完成</div>
                  <div class="fr five" v-else-if="item.status == 4">
                    待填采购价
                  </div>
                  <div class="fr six" v-else-if="item.status == 5">
                    待付采购价
                  </div>
                  <div class="fr seven" v-else-if="item.status == 6">
                    待填运费
                  </div>
                  <div class="fr eight" v-else-if="item.status == 7">
                    待付运费
                  </div>
                  <div class="fr nine" v-else-if="item.status == 8">
                    处理跟进中
                  </div>
                  <div class="fr ten" v-else>未入库</div>
                </div>
                <!-- 信息栏 -->
                <div class="all-details" :class="item.lastDiv ? 'active' : ''">
                  <!-- 图片 -->
                  <div class="details-img">
                    <img :src="item.image1" alt="" @click="largeImg(item)" />
                  </div>
                  <!-- 详情 -->
                  <div class="details-text">
                    <div class="clearfix name">
                      <span class="fl productName">{{ item.productName }}</span>
                      <span class="fr price">￥{{ item.price }}</span>
                    </div>
                    <div class="clearfix count">
                      <span class="fl type">{{ item.type }}</span>
                      <span class="fr quantity">x{{ item.quantity }}</span>
                    </div>
                    <div class="integral">{{ item.attributes }}</div>
                  </div>
                </div>
                <!-- 运费 -->
                <div class="all-total clearfix">
                  <span class="fl">
                    <van-icon name="logistics" />运费：{{ item.freight }}元
                  </span>
                  <span class="fr">{{ item.enterDate }}</span>
                </div>
                <!-- 按钮 -->
                <div class="all-btn">
                  <!-- 管理员 -->
                  <div
                    v-if="infoData.sysAdmini == '0' || infoData.statu == '0'"
                  >
                    <!-- 异常 -->
                    <div v-if="item.collectionStatus == 1">
                      <van-button
                        class="handle"
                        size="mini"
                        type="primary"
                        @click="linkChangeState(item, '处理')"
                        >处理</van-button
                      >
                      <van-button
                        class="look"
                        size="mini"
                        type="info"
                        @click="gotoOrderDetails(item, index)"
                      >
                        查看
                      </van-button>
                    </div>
                    <!-- 正常 -->
                    <div v-else>
                      <van-button
                        class="sign"
                        size="mini"
                        type="primary"
                        @click="linkChangeState(item, '标记')"
                        >标记</van-button
                      >
                      <van-button
                        class="look"
                        size="mini"
                        type="info"
                        @click="gotoOrderDetails(item, index)"
                      >
                        查看
                      </van-button>
                    </div>
                  </div>
                  <!-- 用户 -->
                  <div v-else>
                    <!-- 异常 -->
                    <div v-if="item.collectionStatus == 1">
                      <!-- 状态7 -->
                      <van-button
                        class="pay"
                        v-show="item.status == '7'"
                        size="mini"
                        type="warning"
                        @click="payment(item)"
                        >付款</van-button
                      >
                      <van-button
                        class="follow"
                        size="mini"
                        type="primary"
                        @click="linkChangeState(item, '跟进')"
                        >跟进</van-button
                      >
                      <van-button
                        class="look"
                        size="mini"
                        type="info"
                        @click="gotoOrderDetails(item, index)"
                        >查看</van-button
                      >
                    </div>
                    <!-- 正常 -->
                    <div v-else>
                      <!-- 状态7 -->
                      <van-button
                        class="pay"
                        v-show="item.status == '7'"
                        size="mini"
                        type="warning"
                        @click="payment(item)"
                        >付款</van-button
                      >
                      <van-button
                        class="appeal"
                        size="mini"
                        type="primary"
                        @click="linkChangeState(item, '申诉')"
                        >申诉</van-button
                      >
                      <van-button
                        class="look"
                        size="mini"
                        type="info"
                        @click="gotoOrderDetails(item)"
                        >查看</van-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 请求失败或者没订单状态(没有订单) -->
            <div class="emptyOrder" v-else>
              <van-empty description="订单空空如也" />
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
      <!-- 一键付款 删除 -->
      <div class="pay-delete" v-if="allBtnState">
        <van-button
          type="warning"
          size="mini"
          v-show="allPay"
          @click="allPayMoney()"
          >一键付款 ({{ freight }})</van-button
        >
        <van-button
          type="danger"
          size="mini"
          v-show="
            infoData.sysAdmini == '0' || infoData.statu == '0' ? true : false
          "
          @click="allDelete()"
          >删除订单</van-button
        >
        <van-button type="info" size="mini" @click="clickSyncBtn()"
          >同步订单</van-button
        >
      </div>
    </div>
    <!-- 同步face -->
    <div class="sync">
      <van-popup
        v-model="syncShow"
        position="right"
        :style="{ height: '100%' }"
      >
        <div class="sync-title">
          <van-nav-bar
            title="同步订单"
            left-text="返回"
            left-arrow
            @click-left="syncShow = false"
            @click-right="syncBtn()"
          >
            <template #right>
              <van-button type="info" size="mini">确定</van-button>
            </template>
          </van-nav-bar>
        </div>
        <div class="sync-content">
          <!-- 店铺 -->
          <div class="shop">
            <div class="header">店铺</div>
            <van-cell
              is-link
              :title="shopLit.title"
              @click="shopLit.status = true"
              :class="shopLit.title == '请选择' ? '' : 'active'"
            />
            <van-action-sheet v-model="shopLit.status">
              <div class="content">
                <van-picker
                  @confirm="platformConFirm($event, shopLit)"
                  @cancel="shopLit.status = false"
                  :columns="shopLit.list"
                  show-toolbar
                  :loading="shopLit.loading"
                />
              </div>
            </van-action-sheet>
          </div>
          <!-- 状态 -->
          <div class="orderState">
            <div class="header">状态</div>
            <van-cell
              is-link
              :title="orderStateList.title"
              @click="orderStateList.status = true"
              :class="orderStateList.title == '请选择' ? '' : 'active'"
            />
            <van-action-sheet v-model="orderStateList.status">
              <div class="content">
                <van-picker
                  @confirm="platformConFirm($event, orderStateList)"
                  @cancel="orderStateList.status = false"
                  :columns="orderStateList.list"
                  show-toolbar
                />
              </div>
            </van-action-sheet>
          </div>
          <!-- time -->
          <div class="time">
            <div class="header">时间</div>
            <van-cell
              is-link
              :title="timeList.title"
              @click="timeList.status = true"
              :class="timeList.title == '请选择' ? '' : 'active'"
            />
            <van-action-sheet v-model="timeList.status">
              <div class="content">
                <van-picker
                  @confirm="platformConFirm($event, timeList)"
                  @cancel="timeList.status = false"
                  :columns="timeList.list"
                  show-toolbar
                />
              </div>
            </van-action-sheet>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import "../../assets/less/order/order.css";
export default {
  data() {
    return {
      H: "",
      transverseList: [
        {
          text: "发货状态",
          resetText: "发货状态",
          textNo: false,
          search: false,
          isActive: false,
          listName: [
            { name: "未入库", iconState: false, isActive: false, value: 9 },
            { name: "库存件", iconState: false, isActive: false, value: 0 },
            { name: "已订货", iconState: false, isActive: false, value: 1 },
            { name: "已发货", iconState: false, isActive: false, value: 2 },
            { name: "已完成", iconState: false, isActive: false, value: 3 },
            { name: "待填采购价", iconState: false, isActive: false, value: 4 },
            { name: "待付采购价", iconState: false, isActive: false, value: 5 },
            { name: "待填运费", iconState: false, isActive: false, value: 6 },
            { name: "待付运费", iconState: false, isActive: false, value: 7 },
            { name: "处理跟进中", iconState: false, isActive: false, value: 8 },
          ],
        },
        {
          text: "运输方式",
          resetText: "运输方式",
          textNo: false,
          search: false,
          isActive: false,
          listName: [
            { name: "佐川", isActive: false, value: "佐川" },
            { name: "黑猫", isActive: false, value: "黑猫" },
            { name: "青岛-免抛", isActive: false, value: "QDMP" },
            { name: "带电渠道", isActive: false, value: "JPSADD" },
            { name: "Qxpress", isActive: false, value: "Qxpress" },
            { name: "ETK", isActive: false, value: "ETK" },
            { name: "EMS", isActive: false, value: "EMS" },
          ],
        },
        {
          text: "录入用户",
          resetText: "录入用户",
          textNo: false,
          search: true,
          isActive: false,
          listName: [],
        },
        {
          text: "采购方式",
          resetText: "采购方式",
          textNo: false,
          search: false,
          isActive: false,
          listName: [
            { name: "自采购", isActive: false, value: "0" },
            { name: "待采购", isActive: false, value: "1" },
          ],
        },
        {
          text: "异常状态",
          resetText: "异常状态",
          textNo: false,
          search: false,
          isActive: false,
          listName: [
            { name: "正常", isActive: false, value: "0" },
            { name: "异常", isActive: false, value: "1" },
            { name: "处理完成", isActive: false, value: "2" },
          ],
        },
      ],
      clientNameState: false,
      // 录入用户的 搜索val
      clientNameVal: "",
      //  face top 值
      FaceTop: "",
      contentList: [],
      //
      finishText: "没有更多的订单信息了",
      //  mask 层
      maskState: false,
      //   订单列表状态值
      orderStatus: true,
      // 个人信息
      infoData: {},
      // 空状态的显示
      emptyStatus: 0,
      // 所有按钮 状态值
      allBtnState: false,
      // 数量
      amount: 30,
      //   页数
      pages: 1,
      //   总数
      total: "",
      // 订单详情
      orderList: [],
      //   刷新状态值
      isLoading: false,
      refreshStatus: false,
      // 懒加载
      loading: false,
      // 懒加载数据完成状态
      finished: false,
      // 懒加载错误状态
      error: false,
      // 懒加载获取数据的loading状态
      onLoadStatus: false,
      //骨架屏
      skeleton: 5,
      //当前订单列表  是 搜素订单(1) 还是 获取订单(2)
      orderIndex: Number,
      //   搜索内容
      sreachVal: "",
      byList: {
        // 确定后传的值
        enterVal: "",
        type: "orderId",
        amount: 30,
        pages: 1,
      },
      // 搜索的placeholder
      placeVal: "默认搜索单号关键词",
      //   导航栏的状态
      searchStatus: true,
      //   指定搜索内容
      sreachList: [
        { name: "单号", isActive: true, type: "orderId" },
        { name: "收件人名字", isActive: false, type: "name" },
        { name: "平台单号", isActive: false, type: "platformorder" },
        { name: "录入日期", isActive: false, type: "录入" },
        { name: "发货日期", isActive: false, type: "发货" },
      ],
      // 一键付款  总价格
      freight: "0.00",
      // 一键付款 按钮 状态值
      allPay: false,
      // 删除选择的订单
      deleteBtn: false,
      // 同步弹出层 状态值
      syncShow: false,
      // 店铺
      shopLit: {
        title: "请选择",
        status: false,
        loading: false,
        value: 99,
        list: [],
      },
      //  订单状态
      orderStateList: {
        title: "请选择",
        status: false,
        value: 99,
        list: [
          { text: "新订购", value: 2 },
          { text: "等待发货", value: 3 },
        ],
      },
      // 时间段
      timeList: {
        title: "请选择",
        status: false,
        value: 99,
        list: [
          { text: "当天", value: 1 },
          { text: "最近7天", value: 7 },
          { text: "最近半个月", value: 15 },
          { text: "最近一个月", value: 30 },
        ],
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from.path ==>", from.path);
    if (from.path == "/changeState" || from.path == "/orderDetails") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    console.log(" to.meta.isBack ==>", to.meta.isBack);
    next();
  },
  activated() {
    // console.log("订单 ==>", this.$route.meta.isBack);

    if (!this.$route.meta.isBack) {
      this.infoData = JSON.parse(sessionStorage.getItem("infoData"));
      if (this.infoData == undefined || this.infoData == null) {
        this.emptyStatus = 0;
        this.allBtnState = false;
      } else {
        this.emptyStatus = 1;
        // 重置
        this.reset();
        // 获取管理员
        this.getAdminiStrators();
      }
      //  获取订单
      this.getOrderList(this.amount, this.pages);
    } else {
      // 获取 vuex  备注
      this.orderList.forEach((e) => {
        if (e.id == this.$store.state.orderState.id) {
          e.note = this.$store.state.orderState.note;
          e.collectionStatus = 1;
          setTimeout(() => {
            this.$store.state.orderState.note = "";
            this.$store.state.orderState.id = "";
          }, 500);
        }
      });
      if (this.$store.state.orderState.title == "处理") {
        if (this.$store.state.orderState.handleIndex == "1") {
          //  处理 跟进
          this.orderList.forEach((e) => {
            if (e.id == this.$store.state.orderState.id) {
              e.note = this.$store.state.orderState.note;
              e.collectionStatus = 1;
              setTimeout(() => {
                this.$store.state.orderState.note = "";
                this.$store.state.orderState.id = "";
              }, 500);
            }
          });
        } else {
          this.orderList.forEach((e) => {
            if (e.id == this.$store.state.orderState.id) {
              e.note = this.$store.state.orderState.note;
              e.collectionStatus = 2;
              setTimeout(() => {
                this.$store.state.orderState.note = "";
                this.$store.state.orderState.id = "";
              }, 500);
            }
          });
        }
      }

      console.log("不重新获取数据!!!");
      this.$route.meta.isBack = false;
    }
  },
  created() {},
  mounted() {
    this.H = document.documentElement.clientHeight;
    this.FaceTop = -this.H * 0.3;
    // window.addEventListener("scroll", this.scrollToTop, true);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.scrollToTop, true);
  },
  methods: {
    // 获取管理员
    getAdminiStrators() {
      if (
        this.infoData.userName == "王焕杰" ||
        this.infoData.userName == "任治琴" ||
        this.infoData.userName == "李健明" ||
        this.infoData.userName == "王杰" ||
        this.infoData.userName == "hzsugoi"
      ) {
        this.infoData["sysAdmini"] = "0";
      }
      // 运输方式
      if (this.infoData.sysAdmini == "0" || this.infoData.statu == "0") {
        //管理员
        this.transverseList.forEach((e) => {
          if (e.resetText == "运输方式") {
            e.listName = [
              { name: "全部", isActive: true, value: "99" },
              { name: "E特快", isActive: false, value: "ETK" },
              { name: "佐川特货", isActive: false, value: "佐川" },
              { name: "佐川普货", isActive: false, value: "RB-DS3" },
              { name: "佐川普货-LTW", isActive: false, value: "LTW" },
              { name: "佐川普货-DPC", isActive: false, value: "DPC" },
              { name: "青岛-免抛", isActive: false, value: "QDMP" },
              { name: "佐川带电", isActive: false, value: "JPSADD" },
              { name: "黑猫3cm", isActive: false, value: "黑猫" },
              {
                name: "黑猫3cm带电",
                isActive: false,
                value: "黑猫带电",
              },
              {
                name: "黑猫普货5cm",
                isActive: false,
                value: "黑猫普货5cm",
              },
              { name: "黑猫带电5cm", isActive: false, value: "黑猫带电5cm" },
              { name: "Qxpress", isActive: false, value: "Qxpress" },
              { name: "EMS", isActive: false, value: "EMS" },
              { name: "免抛", isActive: false, value: "PK0009" },
              { name: "CNE", isActive: false, value: "CNE" },
              { name: "国内退货", isActive: false, value: "国内退货" },
            ];
          }
        });
      } else {
        //用户
        this.transverseList.forEach((e) => {
          if (e.resetText == "运输方式") {
            e.listName = [
              { name: "全部", isActive: true, value: "99" },
              { name: "佐川", isActive: false, value: "佐川" },
              { name: "黑猫", isActive: false, value: "黑猫" },
              { name: "青岛-免抛", isActive: false, value: "QDMP" },
              { name: "带电渠道", isActive: false, value: "JPSADD" },
              { name: "Qxpress", isActive: false, value: "Qxpress" },
              { name: "ETK", isActive: false, value: "ETK" },
              { name: "EMS", isActive: false, value: "EMS" },
            ];
          }
        });
      }
    },
    // selectList(item)
    selectList(item, index) {
      // 判断搜索内容
      if (item.search) {
        this.clientNameState = true;
      } else {
        this.clientNameState = false;
      }
    //   console.log("item.isActive ==>", item.isActive);
      // 关闭mask 层
      if (item.isActive) {
        this.maskState = false;
        this.FaceTop = -this.H * 0.3;

        this.transverseList.forEach((e) => {
          e.isActive = false;
        });
        // 已经存在 值
        if (item.textNo) {
          console.log("已经存在值 off");
          this.transverseList.forEach((e) => {
            e.isActive = false;
          });
        }
        return;
      }

      // 打开mask 层
      this.transverseList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      if (item.textNo) {
        // console.log("this.maskState ==>", this.maskState);
        if (!this.maskState) {
          // 打开
          console.log("已经存在值 open9999");
          this.maskState = true;
          this.FaceTop = 0;
          this.contentList = item.listName;
          item.isActive = false;
        } else {
          // 关闭
          console.log("已经存在值 open");
          this.maskState = false;
          this.FaceTop = -this.H * 0.3;
        //   if(!item.isActive){
        //       this.maskState = true;
        //       this.FaceTop = 0;
        //       item.isActive = true;
        //       return;
        //   }
          item.isActive = false;
        }
        return;
      }
      //   mask
      this.maskState = true;
      this.FaceTop = 0;
      this.contentList = item.listName;
    },
    // 点击mask 层
    clickMask() {
      this.transverseList.forEach((e) => {
        e.isActive = false;
      });
      this.maskState = false;
      this.FaceTop = -this.H * 0.3;
    },
    // 搜索 用户人 名字
    searchClientName() {
      this.transverseList.forEach((e) => {
        if (e.resetText == "录入用户") {
          this.contentList = e.listName.filter((ele) => {
            if (ele.name.match(this.clientNameVal)) {
              return ele;
            }
          });
          return this.contentList;
        }
      });
    },
    // 选中内容
    selectContent(item) {
      let index = "";
      this.transverseList.forEach((e, i) => {
        e.listName.forEach((el) => {
          if (e.listName.findIndex((el) => el.name == item.name) > -1) {
            index = i;
          }
        });
      });
      //   console.log("index ==>", index);
      this.transverseList[index].listName.forEach((e) => {
        e.isActive = false;
        e.iconState = false;
      });
      item.isActive = true;
      item.iconState = true;
    },
    // 重置 选中内容
    selectReset() {
      this.transverseList.forEach((e) => {
        e.listName.forEach((el) => {
          el.isActive = false;
          el.iconState = false;
        });
        e.text = e.resetText;
        e.textNo = false;
        e.isActive = false;
      });

      this.maskState = false;
      this.FaceTop = -this.H * 0.3;

      // 刷新
        this.getOrderList(30, 1);
    },
    // 确定 选中 内容
    selectConfim() {
      //  样式
      this.transverseList.forEach((e) => {
        if (e.isActive) {
          e.listName.forEach((el) => {
            if (el.isActive) {
              e.text = el.name;
              e.textNo = true;
            }
          });
        }
        e.isActive = false;
      });

      this.maskState = false;
      this.FaceTop = -this.H * 0.3;

      // 搜索
        this.sreachInput();
    },
    //   返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击搜索出现搜索框
    onClickRight() {
      this.searchStatus = false;
      this.orderStatus = false;
      //   this.sreachVal = "";
    },
    // 搜索
    onSearch(val) {
      console.log("val ==>", val);
      if (val == "") {
        this.$toast("搜索内容不能为空！");
        return;
      }
      this.onCancel();
      this.byList.enterVal = val;
      this.byList.amount = 30;
      this.sreachInput();
    },
    // 点击取消
    onCancel() {
      this.searchStatus = true;
      this.orderStatus = true;
    },
    // 点击要搜索的类型
    clickSearchList(item, index) {
      if (item.isActive) {
        return;
      }
      this.sreachList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.placeVal = `搜索${item.name}关键词`;
      if (item.name == "录入日期" || item.name == "发货日期") {
        this.placeVal = `例如：2020-01-01/2021-10-10`;
      }
      this.byList.type = item.type;
      console.log("this.byList ==>", this.byList);
    },
    //   去登录
    gotoLogin() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "600",
      });
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 600);
    },
    //  重置 数据
    reset() {
      this.onLoadStatus = false;
      this.vanIndex = 0;
      this.transportIndex = 0;
      // 所有按钮
      this.allBtnState = false;
      // 筛选 重置
      this.transverseList.forEach((e) => {
        e.text = e.resetText;
        e.textNo = false;
        e.isActive = false;
        e.listName.forEach((el) => {
          el.iconState = false;
          el.isActive = false;
        });
      });
      this.sreachVal = "";
      this.searchStatus = true;
      this.orderStatus = true;
    },
    // 下拉刷新
    onRefresh() {
      console.log("下拉刷新");
      this.finished = false;
      this.loading = false;
      this.error = false;
      // 重新加载数据
      this.amount = 30;
      this.pages = 1;
      this.refreshStatus = true;
      this.onLoadStatus = true;
      this.reset();
      this.getOrderList(this.amount, this.pages);
    },
    // 异步拿数据
    onLoad() {
      setTimeout(() => {
        if (this.orderList.length >= this.total) {
          this.finished = true;
          this.loading = true;
          return;
        }
        console.log("异步刷新!!!");
        console.log("this.amount ==>", this.amount);
        this.onLoadStatus = true;
        //  判断是搜索还是获取订单列表
        if (this.orderIndex == 2) {
          this.amount += 30;
          this.getOrderList(this.amount, this.pages);
        } else {
          this.byList.amount += 30;
          this.sreachInput();
        }
        console.log("this.total ==>", this.total);
      }, 1000);
    },
    // 获取订单
    getOrderList(amount, pages) {
      if (this.infoData == undefined || this.infoData == null) {
        if (this.refreshStatus) {
          this.refreshStatus = false;
        }
        return;
      }
      // 给状态值
      this.orderIndex = 2;
      if (!this.onLoadStatus) {
        var loading = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
      }
      this.$axios({
        url: "/sigaoyi/NEWtoLogistics",
        method: "POST",
        params: {
          userId: this.infoData.id,
          amount: amount,
          pages: pages,
        },
      })
        .then((result) => {
          //   骨架屏状态值 + 所有按钮状态值
          this.emptyStatus = 2;
          this.allBtnState = true;

          this.finished = false;
          this.loading = false;
          if (!this.onLoadStatus) {
            loading.clear();
          }
          this.onLoadStatus = false;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            //   列表数据 > 0
            if (result.data.logisticss.length > 0) {
              this.finishText = "没有更多的订单信息了";

              result.data.logisticss.forEach((e, i) => {
                if (e.orderId == "null") {
                  e.orderId = "";
                }
                if (e.image == "") {
                  e.image =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                  e["image1"] =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                } else {
                  e["image1"] = e.image.split(",")[0];
                }
                e["checked"] = false;
              });
              // 一键付款  状态值
              if (result.data.freight > 0) {
                this.allPay = true;
              } else {
                this.allPay = false;
              }
            } else {
              this.finished = true;
              this.allBtnState = false;
              this.finishText = "";
            }
            result.data.logisticsNames.forEach((e) => {
              e["name"] = e.userName + "：" + (e.id + 10850);
              e["isActive"] = false;
            });
            this.transverseList.forEach((e) => {
              if (e.resetText == "录入用户") {
                e.listName = result.data.logisticsNames;
              }
            });
            this.freight = result.data.freight;
            this.total = result.data.page.total;
            this.orderList = result.data.logisticss;
            // 上啦刷新
            if (this.refreshStatus) {
              this.refreshStatus = false;
              this.$toast("刷新成功！");
              this.isLoading = false;
              this.error = false;
            }
          } else {
            // 上啦刷新
            if (this.refreshStatus) {
              this.refreshStatus = false;
              this.isLoading = false;
              this.error = true;
            }
            this.loading = false;
            this.$toast.fail({
              message: result.data.msg,
              duration: "600",
            });
          }
        })
        .catch((err) => {
          this.emptyStatus = 2;
          this.allBtnState = true;

          this.loading = false;
          if (!this.onLoadStatus) {
            loading.clear();
          }
          this.onLoadStatus = false;
          // 上啦刷新
          if (this.refreshStatus) {
            this.refreshStatus = false;
            this.isLoading = false;
            this.error = true;
          }
          this.$toast.fail({
            message: "系统业务繁忙,请稍后再试!",
            duration: "600",
          });
          console.log("err ==>", err);
        });
    },
    // 搜索订单
    sreachInput() {
      // loading
      if (!this.onLoadStatus) {
        var loading = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
      }
      this.amount = this.byList.amount;
      this.pages = this.byList.pages;
      var data = {
        amount: this.amount,
        pages: this.pages,
        userId: this.infoData.id,
        ClientName: "",
        collectionStatus: "99",
        startTime: "",
        lastTime: "",
        name: "",
        orderId: "",
        platformorder: "",
        purchaseMode: "99",
        shipDate: "",
        shipDate1: "",
        status: 99,
        trade_type1: "99",
      };
      // 搜索指定类型
      for (const key in data) {
        if (this.byList.type == "发货") {
          data.shipDate = this.byList.enterVal.split("/")[0];
          data.shipDate1 = this.byList.enterVal.split("/")[1];
        } else if (this.byList.type == "录入") {
          data.lastTime = this.byList.enterVal.split("/")[0];
          data.startTime = this.byList.enterVal.split("/")[1];
        } else {
          if (this.byList.type == key) {
            data[key] = this.byList.enterVal;
          }
        }
      }
      this.transverseList.forEach((e) => {
        // 发货状态
        if (e.resetText == "发货状态") {
          e.listName.forEach((el) => {
            if (el.isActive) {
              data.status = el.value;
            }
          });
        }
        // 运输方式
        if (e.resetText == "运输方式") {
          e.listName.forEach((el) => {
            if (el.isActive) {
              data.trade_type1 = el.value;
            }
          });
        }
        // 录入用户
        if (e.resetText == "录入用户") {
          e.listName.forEach((el) => {
            if (el.isActive) {
              data.ClientName = el.userName;
            }
          });
        }
        // 采购方式
        if (e.resetText == "采购方式") {
          e.listName.forEach((el) => {
            if (el.isActive) {
              data.purchaseMode = el.value;
            }
          });
        }
        // 异常状态
        if (e.resetText == "异常状态") {
          e.listName.forEach((el) => {
            if (el.isActive) {
              data.collectionStatus = el.value;
            }
          });
        }
      });

      console.log("data ==>", data);

      this.orderIndex = 1;
      // 发起请求
      this.$axios({
        url: "/sigaoyi/NEWtoLogistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.emptyStatus = 2;
          this.allBtnState = true;

          if (!this.onLoadStatus) {
            loading.clear();
          }
          this.onLoadStatus = false;
          this.loading = false;
          this.finished = false;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.$toast.success(result.data.msg);
            //   列表数据 > 0d
            if (result.data.logisticss.length > 0) {
              this.finishText = "没有更多的订单信息了";
              result.data.logisticss.forEach((e) => {
                if (e.orderId == "null") {
                  e.orderId = "";
                }
                if (e.image == "") {
                  e.image =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                  e["image1"] =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                } else {
                  e["image1"] = e.image.split(",")[0];
                }
                e["checked"] = false;
              });
              // 一键付款  状态值
              if (result.data.freight > 0) {
                this.allPay = true;
              } else {
                this.allPay = false;
              }
            } else {
              this.finished = true;
              this.allBtnState = false;
              this.finishText = "";
            }
            this.freight = result.data.freight;
            this.orderList = result.data.logisticss;
            this.total = result.data.page.total;
          } else {
            this.$toast.fail(result.data.msg);
          }
        })
        .catch((err) => {
          this.emptyStatus = 2;
          this.allBtnState = true;
          if (!this.onLoadStatus) {
            loading.clear();
          }
          this.onLoadStatus = false;
          this.loading = false;
          this.$toast.fail("系统出错！");
          console.log("err ==>", err);
        });
    },
    // 一键付款
    allPayMoney() {
      // 判断余额
      if (this.infoData.balance < this.freight) {
        this.$toast("账户余额不足，请先充值");
        return;
      }
      //   参数
      let data = {
        userId: this.infoData.id,
        userName: this.infoData.userName,
        price: this.freight,
        ClientName: "",
      };
      if (this.byList.type == "ClientName") {
        data.ClientName = this.byList.enterVal;
      }
      //   loading
      const loading = this.$toast.loading({
        message: "付款中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWpayments",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == "200") {
            //  当前页的 待付运费 修改为 已完成
            this.orderList.forEach((e) => {
              if (e.status == 7) {
                e.status = 3;
              }
            });
            this.freight = "0.00";
            // 重新设置 个人信息
            result.data.user.userPassword = "xxxxxxxxxxxx";
            sessionStorage.setItem(
              "infoData",
              JSON.stringify(result.data.user)
            );
            this.$toast({
              type: "success",
              message: result.data.msg,
              duration: 600,
            });
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
    // 多项删除
    allDelete() {
      var ids = "";
      var indexList = [];
      if (this.orderList.findIndex((target) => target.checked === true) > -1) {
        this.orderList.forEach((e, i) => {
          if (e.checked) {
            ids += e.id + ",";
            indexList.push(i);
          }
        });
      } else {
        this.$toast("请选择要删除的订单列表");
        return;
      }
      ids = ids.substring(0, ids.length - 1);

      this.$dialog
        .confirm({
          // title: '删除订单',
          message: "是否确认删除已选中的订单列表",
        })
        .then(() => {
          //   loading
          const loading = this.$toast.loading({
            message: "删除中...",
            forbidClick: true,
            loadingType: "spinner",
            duration: "0",
          });
          this.$axios({
            url: "/sigaoyi/delectlogistics",
            method: "POST",
            params: {
              ids: ids,
            },
          })
            .then((result) => {
              console.log("result ==>", result);
              loading.clear();
              if (result.data.code == "200") {
                for (let i = indexList.length - 1; i >= 0; i--) {
                  this.orderList.splice(indexList[i], 1);
                }
                this.$toast({
                  message: result.data.msg,
                  duration: 600,
                });
              } else {
                this.$dialog({ message: result.data.msg });
              }
            })
            .catch((err) => {
              loading.clear();
              console.log("err ==>", err);
              this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 点击 同步订单
    clickSyncBtn() {
      //   loading
      const loading = this.$toast.loading({
        message: "同步请求中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWqoo10Shop",
        method: "POST",
        params: {
          userId: this.infoData.id,
          amount: 30,
          pages: 1,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == 200) {
            if (result.data.qoo10shops.length > 0) {
              result.data.qoo10shops.forEach((e) => {
                e["text"] = e.shopuser;
                e["value"] = e.id;
              });
              this.shopLit.list = result.data.qoo10shops;
              //   id
              setTimeout(() => {
                this.syncShow = true;
              }, 300);
            } else {
              this.syncShow = false;
              this.$dialog({ message: "该用户没有店铺" });
            }
          } else {
            this.syncShow = false;
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.syncShow = false;
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    // 渠道选择确定
    platformConFirm(e, array) {
      array.title = e.text;
      array.value = e.value;
      array.list.forEach((el, i) => {
        if (el.text == array.title) {
          array.index = i;
        }
      });
      array.status = false;
    },
    // 同步订单face 确定
    syncBtn() {
      let data = {
        userName: this.infoData.userName,
        shopid: this.shopLit.value,
        Heaven: this.timeList.value,
        ShippingStat: this.orderStateList.value,
      };

      console.log("data ==>", data);
      const loading = this.$toast.loading({
        message: "同步中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/SynchronizeOrders",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.Code == 200) {
            this.$toast({ message: result.data.msg });
            this.syncShow = false;
            this.sreachInput();
          } else {
            this.syncShow = true;
            this.$dialog({ message: result.data.msg });
          }
        })
        .catch((err) => {
          loading.clear();
          this.syncShow = true;
          console.log("err ==>", err);
          this.$dialog({ message: "系统服务繁忙,请稍后再试!" });
        });
    },
    //  点击查看详情
    gotoOrderDetails(item) {
      this.$router.push({
        name: "OrderDetails",
        query: { id: item.id },
      });
    },
    // 点击图片 放大
    largeImg(item) {
      this.$store.state.largeImgStatus = true;
      let splitImg = [];
      splitImg = item.image.split(",");
      for (let i = 0; i < splitImg.length; i++) {
        this.$store.commit("setImgList", splitImg[i]);
      }
    },
    // 付款
    payment(item) {
      // 余额不足(提示)
      if (this.infoData.balance < Number(item.freight)) {
        this.$toast("账户余额不足，请先充值");
        return;
      }
      //   参数
      let data = {
        userId: this.infoData.id,
        userName: this.infoData.userName,
        id: item.id,
        status: item.status,
        price: item.freight,
      };
      //   loading
      const loading = this.$toast.loading({
        message: "付款中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: "0",
      });
      this.$axios({
        url: "/sigaoyi/NEWpayment",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.clear();
          if (result.data.code == "200") {
            item.status = 3;
            // 重新设置 个人信息
            result.data.userinfo.userPassword = "xxxxxxxxxxxx";
            sessionStorage.setItem(
              "infoData",
              JSON.stringify(result.data.userinfo)
            );
            this.$toast({
              type: "success",
              message: result.data.msg,
              duration: 600,
            });
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
    // 处理 标记 申诉 跟进
    linkChangeState(item, string) {
      this.$router.push({
        name: "ChangeState",
        query: { title: string, item: JSON.stringify(item) },
      });
    },
  },
};
</script>
