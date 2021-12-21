<template>
  <div
    class="ProductControl"
    style="overflow: auto"
    :style="{ height: H + 'px' }"
  >
    <div class="main" v-title data-title="产品库"></div>
    <iframe :src="iframeSrc" style="display: none"></iframe>
    <!-- 搜索栏 -->
    <div class="box">
      <div class="maskTop" :style="{ width: headerW }"></div>
      <div
        class="hearder"
        :class="openCloseState ? 'active' : ''"
        :style="{ width: headerW }"
      >
        <div class="classify" v-show="classifyState">
          <div>
            <span class="text">类目一：</span>
            <el-select
              v-model="classNum1Index"
              clearable
              @change="changeSet(classNum1Index, 'classNum1')"
              placeholder="请选择"
            >
              <el-option
                v-for="item in classNum1"
                :key="item.value"
                :label="item.catalogName"
                :value="item.catalogId"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">类目二：</span>
            <el-select
              v-model="classNum2Index"
              clearable
              @change="changeSet(classNum2Index, 'classNum2')"
              placeholder="请选择"
            >
              <el-option
                v-for="item in classNum2"
                :key="item.value"
                :label="item.catalogName"
                :value="item.catalogId"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">类目三：</span>
            <el-select
              v-model="classNum3Index"
              @change="changeSet(classNum3Index, 'classNum3')"
              placeholder="请选择"
            >
              <el-option
                v-for="item in classNum3"
                :key="item.value"
                :label="item.catalogName"
                :value="item.catalogId"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">产品语言：</span>
            <el-select
              v-model="langugeIndex"
              clearable
              @change="changeSet(langugeIndex, 'languge')"
              placeholder="请选择"
            >
              <el-option
                v-for="item in langugeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search">
          <div v-show="!classifyState">
            <span class="text">产品语言：</span>
            <el-select
              v-model="langugeIndex"
              clearable
              @change="changeSet(langugeIndex, 'languge')"
              placeholder="请选择"
            >
              <el-option
                v-for="item in langugeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">来源平台：</span>
            <el-select
              v-model="selectorIndex"
              clearable
              @clear="selectorIndex = 99"
              @change="changeSet(selectorIndex)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectorData"
                :key="item.value"
                :label="item.name"
                :value="item.status"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">产品标题：</span>
            <input
              type="text"
              value=""
              placeholder="请输入"
              v-model="inputList.title"
              :class="inputList.title == '' ? '' : 'active'"
              @keydown.enter="searInput(30, 1, 'start')"
            />
          </div>
          <div class="btn" :class="classifyState ? 'active' : ''">
            <div class="search_btn">
              <el-button size="small" @click="resetList()">重置</el-button>
              <el-button
                type="primary"
                size="small"
                @click="searInput(30, 1, 'start')"
                >搜索</el-button
              >
            </div>
            <!-- 收起 展开 -->
            <div class="open_close" @click="openClose()">
              <span>{{ openCloseText }}</span>
              <span><i :class="openCloseCionSrc"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品 -->
    <div
      class="Procontent"
      v-infinite-scroll="searInput1"
      infinite-scroll-disabled="disabled"
      :infinite-scroll-immediate="false"
      v-if="tableData.length > 0"
      :style="{ marginTop: procontentTop + 'px' }"
    >
      <!-- 操作数据按钮 -->
      <div class="addDelete">
        <el-button type="primary" @click="derive()" size="medium"
          >导出产品数据</el-button
        >
        <el-select
          v-model="batchVal"
          @change="changeBatch()"
          popper-class="batchSet"
        >
          <el-option
            v-for="item in batchList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="relaod" @click="reload()">
          <i class="el-icon-refresh-right"></i>
        </span>
      </div>
      <!-- 循环 -->
      <div
        class="item"
        v-for="(item, index) in tableData"
        :key="index"
        :style="{ maxWidth: maxwidth + 'px' }"
        :class="item.isActive ? 'active' : ''"
        @mouseover="overItem(item, index)"
        @mouseleave="leaveItem(item, index)"
      >
        <div class="checkDiv">
          <el-checkbox
            class=""
            v-model="item.checked"
            @click="clickSingle(item, index)"
          ></el-checkbox>
          <div
            class="translation"
            :class="item.translationStatus == 1 ? 'active' : ''"
          >
            {{ item.translationText }}
          </div>
          <div class="item-title">
            <i
              class="el-icon-picture-outline"
              @mouseover="overImg(item, index)"
            ></i>
            <div class="carouselNum" v-show="item.imgList1.length">
              {{ item.imgList1.length }}
            </div>
            <div
              class="carouselImg"
              ref="carouselImg"
              v-show="item.ImgStatus"
              :style="{ left: carouselImgLeft + 'px' }"
              :class="item.imgList1.length < 5 ? 'active' : ''"
              @mouseleave="leaveItem(item, index)"
            >
              <i
                class="el-icon-arrow-left"
                v-show="item.imgList1.length >= 5"
                @click="clickLeft(item, index)"
              ></i>
              <div class="img-list">
                <div
                  class="v-img-list clearfix"
                  :style="{
                    width: vImgListW + 'px',
                    marginLeft: vImgListMleft + 'px',
                  }"
                >
                  <div
                    class="fl"
                    v-for="(ele, i) in item.imgList1"
                    :key="i"
                    @click="showActualImg(item, ele, i)"
                  >
                    <img :src="ele" alt="" :onerror="errorImage" />
                  </div>
                </div>
              </div>
              <i
                class="el-icon-arrow-right"
                v-show="item.imgList1.length >= 5"
                @click="clickRight(item, index)"
              ></i>
            </div>
          </div>
        </div>
        <div class="case">
          <div
            class="imgDiv"
            v-loading="item.loadingImg"
            @click="GotoProductPage(item, index)"
          >
            <img
              :src="item.pic_url"
              alt="加载失败"
              :onerror="errorImage"
              @progress="progress($event)"
              @load="loadImg(item, index, $event)"
            />
          </div>
          <div
            class="name"
            :title="item.title"
            @click="GotoProductPage(item, index)"
          >
            {{ item.title }}
          </div>
          <div class="price" :class="item.num < 5 ? 'active' : ''">
            <span :class="item.currencytype != 2 ? 'active' : ''">{{
              item.moneySymbol
            }}</span
            ><span>{{ item.integer }}.</span><span>{{ item.decimals }}</span>
            <font @click="GotoStbao(item)">采集链接</font>
            <i @click="GotoStbao(item)" class="el-icon-connection"></i>
          </div>
        </div>
      </div>
      <div class="isLoading" v-if="loading">
        <span class="text">加载中</span><span class="dot"></span>
      </div>
      <div class="isFinished" v-if="noMore && !errorLoading">
        没有更多产品了
      </div>
      <div class="errorLoading" v-if="errorLoading">
        加载失败，<i @click="searInput1()">重新加载</i>
      </div>
    </div>
    <!-- 没有产品 -->
    <div
      class="procontent1"
      :style="{ marginTop: procontentTop + 'px' }"
      v-loading="loadingProcontent1"
      v-else
    >
      <span class="iconfont icon-zanwushuju"></span>
      <div>暂无数据</div>
    </div>
    <!-- 页脚 -->
    <div class="product_footer" :class="tableData.length <= 5 ? 'active' : ''">
      ©{{
        years
      }}&nbsp;&nbsp;&nbsp;广州思高易网络科技有限公司&nbsp;&nbsp;&nbsp;粤ICP备19040870号
    </div>
    <!-- 翻译 -->
    <div class="translate">
      <el-dialog title="翻译选项" :visible.sync="translateStatus" width="30%">
        <div class="v-translate">
          <div class="tips">
            <el-tag type="warning"
              >点击确定按钮之前，请确认已勾选了要翻译的产品！</el-tag
            >
          </div>
          <div class="radio">
            <span class="text">翻译语言：</span>
            <el-radio-group v-model="translateIndex">
              <el-radio
                :label="item.value"
                v-for="(item, index) in translateList"
                :key="index"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="translateTrue()">确 定</el-button>
          <el-button @click="translateStatus = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 导出产品 -->
    <div class="derive">
      <el-dialog title="导出产品信息" :visible.sync="deriveStatus" width="33%">
        <div class="deriveInfo">
          <div>
            <span class="text">选择平台：</span>
            <el-select
              v-model="platformIndex"
              @change="platform"
              placeholder="请选择"
            >
              <el-option
                v-for="item in platformList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">选择数据：</span>
            <el-select v-model="selectMannerIndex" placeholder="请选择">
              <el-option
                v-for="item in selectMannerList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">选择语言：</span>
            <!-- <select class="selectLanguage">
              <option value="0">原语言</option>
              <option value="1">英语</option>
              <option value="2">日语</option>
            </select> -->
            <el-select v-model="selectLanguageIndex" placeholder="请选择">
              <el-option
                v-for="item in selectLanguageList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">价格公示：</span>
            <input type="text" v-model="deriveText.price" />
          </div>
          <div>
            <span class="text">{{ deriveText.name1 }}</span>
            <input
              type="text"
              ref="deriveText1"
              :placeholder="deriveText.placeholder1"
            />
          </div>
          <div>
            <span class="text">{{ deriveText.name2 }}</span>
            <input
              type="text"
              ref="deriveText2"
              :placeholder="deriveText.placeholder2"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clickDerive()">确 定</el-button>
          <el-button @click="deriveStatus = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 图片放大 -->
    <div class="actualImgSize">
      <el-dialog
        title="所有商品图片(左键放大,右键缩小)"
        :visible.sync="actualStatus"
        width="40%"
        center
      >
        <div class="v-actualImgSize">
          <div
            class="actualImg"
            @contextmenu.prevent="rightClickStatus && rightClick($event)"
            @click="clickLargeStatus && clickLarge($event)"
            @mousedown="downLargeImg($event)"
            @mouseup="upLargeImg($event)"
            @mousemove.prevent="moveStatus && moveLargeImg($event)"
            @mouseleave="leaveLargeImg()"
          >
            <img
              :src="firstImg"
              alt=""
              :style="{
                transform: `scale(${scaleImg})`,
                transformOrigin: originImg,
                left: largeImgLeft + 'px',
                top: largeImgTop + 'px',
                transition: transitionImg,
              }"
            />
            <div
              class="smallImg"
              v-show="smallImgStatus"
              :style="{ left: maskImgLeft + 'px', top: maskImgTop + 'px' }"
              @click.stop="clickMaskImg()"
              @contextmenu.prevent.stop="reightClickMaskImg()"
              @mousedown.stop="downMaskImg($event)"
              @mousemove.prevent.stop="moveMaskImgStatus && moveMaskImg($event)"
              @mouseup.stop="upMaskImg($event)"
              @mouseover="overMaskImg()"
              @mouseleave="leveaMaskImg()"
            >
              <img :src="maskImg" alt="" />
              <div
                class="mask"
                :style="{
                  transform: `scale(${scaleMask})`,
                  transformOrigin: originMask,
                  left: maskLeft + 'px',
                  top: maskTop + 'px',
                  transition: transitionMask,
                }"
                @contextmenu.prevent.stop="rightClickMask()"
                @click.stop="clickMask()"
                @mousedown.stop="downMask($event)"
                @mouseup.stop="upMask($event)"
                @mousemove.stop="moveMaskStatus && moveMask($event)"
                @mouseleave="leaveMask()"
              ></div>
            </div>
            <div class="text" title="点击左键放大,右键缩小">{{ showText }}</div>
          </div>
          <div class="listImg">
            <i
              class="el-icon-arrow-up"
              v-show="listImgData.length > 7"
              :class="upBtn ? '' : 'active'"
              @click="upBtn && listImgUp()"
            ></i>
            <div class="hiddenListImg">
              <div
                class="scrollListImg"
                :style="{ marginTop: scrollDivTop + 'px' }"
              >
                <div
                  class="v-listImg"
                  ref="VlistImg"
                  v-for="(item, index) in listImgData"
                  :key="index"
                  :class="item.isActive ? 'active' : ''"
                  @mouseover="overListImg(item, index)"
                >
                  <img :src="item.ImgSrc" alt="" />
                </div>
              </div>
            </div>
            <i
              class="el-icon-arrow-down"
              v-show="listImgData.length > 7"
              :class="downBtn ? '' : 'active'"
              @click="downBtn && listImgDown()"
            ></i>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="actualStatus = false"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "../../assets/less/ProductControl/ProductControl.less";
// import footerDiv from "@/components/footer.vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  // 父元素传过来的值
  props: ["wastate"],
  data() {
    return {
      //   box minheight
      H: "",
      minBoxH: "",
      years: "",
      // 搜索栏
      openCloseState: false,
      classifyState: true,
      // openCloseText
      openCloseText: "收起",
      procontentTop: 140,
      openCloseCionSrc: "el-icon-arrow-up",
      // header 的宽度
      headerW: "calc(100% - 280px)",
      //   点击翻译按钮弹出层状态值
      translateStatus: false,
      translateIndex: 2,
      translateList: [
        { name: "日语", value: 2 },
        { name: "英语", value: 1 },
      ],
      //  导出产品状态值
      deriveStatus: false,
      deriveText: {
        price: "(price*2+55)*1.2/0.058",
        name1: "分类编号：",
        placeholder1: "请输入分类编号",
        name2: "运费编号：",
        placeholder2: "请输入运费编号",
      },
      // 导出产品 set int
      platformIndex: 1,
      platformList: [
        { name: "趣天", value: 1 },
        { name: "亚马逊", value: 2 },
      ],
      selectMannerIndex: 1,
      selectMannerList: [
        { name: "选中产品", value: 1 },
        { name: "所有产品", value: 2 },
      ],
      selectLanguageIndex: 0,
      selectLanguageList: [
        { name: "源语言", value: 0 },
        { name: "英语", value: 1 },
        { name: "日语", value: 2 },
      ],
      // 来源平台Data
      selectorIndex: 99,
      selectorData: [
        { name: "全部", selected: true, status: 99 },
        { name: "1688", selected: false, status: 1 },
        { name: "淘宝", selected: false, status: 2 },
        { name: "速卖通", selected: false, status: 3 },
        { name: "趣天", selected: false, status: 4 },
      ],
      //   语言
      langugeIndex: 0,
      langugeList: [
        { name: "原语言", selected: true, value: 0 },
        { name: "英语", selected: false, value: 1 },
        { name: "日语", selected: false, value: 2 },
      ],
      //  搜索的input
      inputList: {
        number: "",
        title: "",
      },
      //   产品列表
      tableData: [],
      loadingProcontent1: false,
      errorImage: 'this.src="' + require("../../assets/img/errorImg.png") + '"',
      // 批量操作
      batchIndex: "",
      batchVal: "批量操作",
      batchList: [
        { label: "翻译产品", value: 0 },
        { label: "删除产品", value: 1 },
        { label: "删除翻译", value: 2 },
      ],
      //   carouselImg 的left
      carouselImgLeft: "-255",
      // v-img-list 的宽度
      vImgListW: "",
      // v-img-list 的marginleft
      vImgListMleft: 0,
      // 点击右边icon num的值
      num: 5,
      //  点击图片弹出层状态值
      actualStatus: false,
      //  弹出层右边小图片数组
      listImgData: [],
      //  弹出层实际大小第一张图片
      firstImg: "",
      //  弹出层右下角的Img
      maskImg: "",
      //   弹出层的状态值
      smallImgStatus: false,
      //  弹出层scrollListImg的margin-top
      scrollDivTop: 0,
      //  弹出层右边向下按钮 状态值
      downBtn: true,
      //  弹出层按钮的num
      listImgNum: 1,
      //  弹出层右边向上按钮 状态值
      upBtn: false,
      //  弹出层大图片 点击的状态值
      clickLargeStatus: true,
      //  弹出层大图片 右键点击的状态值
      rightClickStatus: false,
      // 鼠标移动的状态
      moveStatus: false,
      // 图片 style
      scaleImg: 1,
      originImg: "",
      largeImgLeft: 0,
      largeImgTop: 0,
      transitionImg: "",
      // 弹出层大图片按下 开始时间 和 结束时间
      startTime: "",
      lastTime: "",
      //鼠标按下的鼠标位置
      startX: "",
      startY: "",
      //鼠标松开的largeImg 的left和top
      endX: 0,
      endY: 0,
      //图片移动的最大(小)left和最大(小)top
      maxLeft: "",
      minLeft: "",
      minTop: "",
      maxTop: "",
      // 弹出层右下角的文字提示
      showText: "满窗口显示",
      //  mask层img的鼠标按下位置
      startMaskImgX: "",
      startMaskImgY: "",
      // mask层img的移动状态值
      moveMaskImgStatus: false,
      // mask层img的鼠标松开位置
      endMaskImgX: "",
      endMaskImgY: "",
      // mask层img的left和Top
      maskImgLeft: 415,
      maskImgTop: 360,
      // mask的缩小值和缩小位置和动画
      originMask: "",
      scaleMask: 1,
      transitionMask: "",
      // mask层的left 和 top
      maskLeft: 0,
      maskTop: 0,
      //   mask层移动的最大位置
      minMaskLeft: "",
      maxMaskLeft: "",
      minMaskTop: "",
      maxMaskTop: "",
      //   mask的move事件状态值
      moveMaskStatus: false,
      //  mask 层鼠标按下的开始坐标
      startMaskX: "",
      startMaskY: "",
      //   mask 层鼠标松开的开始坐标
      endMaskX: "",
      endMaskY: "",
      // 类目1
      classNum1Index: 99,
      classNum1: [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ],
      // 类目2
      classNum2Index: 99,
      classNum2: [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ],
      //   类目3
      classNum3Index: 99,
      classNum3: [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ],
      // 全选状态值
      AllcheckedStatus: true,
      //
      maxwidth: "",
      //   iframeSrc
      iframeSrc: "",
      top: "",
      // 初始保存 页数 和 00
      amount: "",
      pages: "",
      loading: false,
      // disabled
      apiLoading: false,
      errorLoading: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (from.path == "/productDetails") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    // this.listenWastate();
    document.title = "产品库";
    this.$nextTick(() => {
      this.minBoxH = document.documentElement.clientHeight - 68 - 51;
      this.H = document.documentElement.clientHeight;
      let d = new Date();
      this.years = d.getFullYear();
    });
    if (!this.$route.meta.isBack) {
      this.tableData = []; // 清空原有数据
      // 重置
      this.resetList();
      this.getproductList(0);
    } else {
      this.$route.meta.isBack = false;
    }
  },
  created() {
    if (this.WstateStatus) {
      this.headerW = "calc(100% - 280px)";
    } else {
      this.headerW = "calc(100% - 110px)";
    }
  },
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData", "shopData"]),
    noMore() {
      return this.apiLoading;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    //   监听侧边栏的状态值
    listenWastate() {
      if (this.wastate) {
        this.headerW = "calc(100% - 280px)";
      } else {
        this.headerW = "calc(100% - 110px)";
      }
    },
    //   重置radio input select  List
    resetList() {
      // 类目123
      this.classNum1Index = 99;
      this.classNum2Index = 99;
      this.classNum3Index = 99;
      this.classNum2 = this.classNum3 = [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ];
      // set
      this.selectorIndex = 99;
      this.langugeIndex = 0;

      //   input
      for (const key in this.inputList) {
        this.inputList[key] = "";
      }
    },
    // 收起 展开
    openClose() {
      this.openCloseState = !this.openCloseState;
      if (this.openCloseState) {
        this.openCloseText = "展开";
        this.procontentTop = 78;
        this.openCloseCionSrc = "el-icon-arrow-down";
        this.classifyState = false;
      } else {
        this.openCloseText = "收起";
        this.procontentTop = 140;
        this.openCloseCionSrc = "el-icon-arrow-up";
        this.classifyState = true;
      }
    },
    // 点击单个复选框
    clickSingle(item, index) {
      if (item.checked) {
        return;
      }
      this.tableData.forEach((e) => {
        e.checked = false;
      });
      item.checked = true;
    },
    // 全选
    clickAll() {
      if (this.AllcheckedStatus) {
        this.tableData.forEach((e) => {
          e.checked = true;
        });
        this.AllcheckedStatus = false;
      } else {
        this.tableData.forEach((e) => {
          e.checked = false;
        });
        this.AllcheckedStatus = true;
      }
    },
    // 批量操作
    changeBatch() {
      this.batchIndex = this.batchVal;
      this.batchVal = "批量操作";
      if (this.batchIndex == 0) {
        this.translate();
      } else if (this.batchIndex == 1) {
        this.delCommodity();
      } else if (this.batchIndex == 2) {
        this.delTranslation();
      }
    },
    // 重新获取数据
    reload() {
      this.resetList();
      this.tableData = [];
      this.getproductList(0);
    },
    // 鼠标移上item
    overItem(item, index) {
      if (item.isActive) {
        return;
      }
      this.tableData.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
    },
    // 鼠标离开item
    leaveItem(item, index) {
      this.tableData.forEach((e) => {
        e.isActive = false;
        e.ImgStatus = false;
      });
    },
    // 鼠标移上item下面的icon
    overImg(item, index) {
      if (item.ImgStatus) {
        return;
      }
      this.tableData.forEach((e) => {
        e.ImgStatus = false;
      });
      item.ImgStatus = true;
      // 给图片
      item.imgList1 = item.imgList;
      // 设置偏移量
      this.vImgListMleft = "0";
      this.vImgListW = item.imgList1.length * 88 - 10;
      this.$nextTick(() => {
        if ((index + 1) % 5 == 0) {
          this.carouselImgLeft = -(
            this.$refs.carouselImg[index].offsetWidth - 44
          );
        } else {
          this.carouselImgLeft = "-255";
        }
      });

      this.num = 5;
    },
    // 鼠标点击右边 icon
    clickRight(item, index) {
      this.num++;

      if (this.num == item.imgList.length + 1) {
        this.num = 5;
        this.vImgListMleft = 0;

        return;
      }
      this.vImgListMleft -= 88;
    },
    // 鼠标点击左边 icon
    clickLeft(item, index) {
      this.num--;

      if (this.num == 4) {
        this.vImgListMleft = (item.imgList.length - (this.num + 1)) * -88;
        this.num = item.imgList.length;

        return;
      }
      this.vImgListMleft += 88;
    },
    // 点击 icon的图片列表
    showActualImg(item, ele, i) {
      this.actualStatus = true;
      this.listImgData = [];
      for (let i = 0; i < item.imgList.length; i++) {
        let objList = {
          ImgSrc: item.imgList[i],
          isActive: false,
        };
        this.listImgData.push(objList);
      }
      this.firstImg = ele;
      this.maskImg = ele;
      //   if (i >= 7) {
      //     this.scrollDivTop = -546;
      //   } else {
      //     this.scrollDivTop = 0;
      //   }
      // 重置
      this.upBtn = false;
      this.num = 5;
      this.listImgNum = 1;
      this.scrollDivTop = 0;
      this.clickLargeStatus = true;
      this.rightClickStatus = false;
      this.largeImgLeft = this.maskLeft = 0;
      this.largeImgTop = this.maskTop = 0;
      this.smallImgStatus = false;
      this.scaleImg = this.scaleMask = 1;
      this.showText = "满窗口显示";
      this.maskImgLeft = 415;
      this.maskImgTop = 360;

      let count = Math.ceil((i + 1) / 7) - this.listImgNum;

      if (count > 0) {
        for (let k = 0; k < count; k++) {
          this.listImgDown();
        }
      }

      for (let j = 0; j < this.listImgData.length; j++) {
        if (i == j) {
          this.listImgData[j].isActive = true;
        }
      }
      this.$nextTick(() => {
        if (this.listImgData.length > 7) {
          this.$refs.VlistImg[0].style.marginTop = 10 + "px";
        } else {
          this.$refs.VlistImg[0].style.marginTop = 24 + "px";
        }
      });
    },
    // 鼠标移上 弹出层右边小图片
    overListImg(item, index) {
      if (item.isActive) {
        return;
      }
      this.listImgData.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.firstImg = item.ImgSrc;
      this.maskImg = item.ImgSrc;
      //   重置
      // 给动画
      this.transitionImg = "all .3s";
      this.clickLargeStatus = true;
      this.rightClickStatus = false;
      this.largeImgLeft = this.maskLeft = 0;
      this.largeImgTop = this.maskTop = 0;
      this.smallImgStatus = false;
      this.showText = "满窗口显示";
      this.scaleImg = this.scaleMask = 1;
      this.maskImgLeft = 415;
      this.maskImgTop = 360;
    },
    // 点击 弹出层右边的向上 icon
    listImgUp() {
      this.listImgNum--;
      this.scrollDivTop += 546;
      if (this.listImgNum == 1) {
        this.upBtn = false;
        this.downBtn = true;
      }
    },
    // 点击 弹出层右边的向下 icon
    listImgDown() {
      this.listImgNum++;
      this.scrollDivTop -= 546;

      if (Math.ceil(this.listImgData.length / 7) <= this.listImgNum) {
        this.downBtn = false;
        this.upBtn = true;
      } else {
        this.upBtn = true;
      }
    },
    // 弹出层大图片 点击图片
    clickLarge(e) {
      if (this.lastTime - this.startTime > 250 || this.lastTime == undefined) {
        return;
      }

      // 给动画
      this.transitionImg = this.transitionMask = "all .3s";
      this.scaleImg += 0.5;
      this.scaleMask -= 0.2;
      //   获取对象
      let dialogBox = document.querySelector(".actualImgSize .el-dialog");
      let actualBox = document.querySelector(".actualImgSize .v-actualImgSize");
      let actualImgBox = document.querySelector(".actualImgSize .actualImg");

      let clickX = e.clientX - dialogBox.offsetLeft - actualBox.offsetLeft;
      let clickY = e.clientY - dialogBox.offsetTop - actualBox.offsetTop;

      this.originImg =
        (clickX / actualImgBox.offsetWidth) * 100 +
        "%" +
        " " +
        (clickY / actualImgBox.offsetHeight) * 100 +
        "%";
      this.originMask = this.originImg;

      if (this.scaleImg >= 3) {
        this.clickLargeStatus = false;
        this.rightClickStatus = true;
        this.scaleImg = 3;
      } else {
        // this.clickLargeStatus = true;
        this.rightClickStatus = true;
      }

      //  图片最大left
      this.maxLeft =
        actualImgBox.offsetWidth *
        (this.scaleImg - 1) *
        (clickX / actualImgBox.offsetWidth);
      //   图片最小left
      this.minLeft =
        actualImgBox.offsetWidth *
        (this.scaleImg - 1) *
        (1 - clickX / actualImgBox.offsetWidth);
      //  图片最大top
      this.maxTop =
        actualImgBox.offsetHeight *
        (this.scaleImg - 1) *
        (clickY / actualImgBox.offsetHeight);
      //  图片最小top
      this.minTop =
        actualImgBox.offsetHeight *
        (this.scaleImg - 1) *
        (1 - clickY / actualImgBox.offsetHeight);

      //  left 取值范围
      if (this.largeImgLeft >= this.maxLeft) {
        this.largeImgLeft = this.maxLeft;
      }
      if (this.largeImgLeft <= -this.minLeft) {
        this.largeImgLeft = -this.minLeft;
      }

      //   top 取值范围
      if (this.largeImgTop >= this.maxTop) {
        this.largeImgTop = this.maxTop;
      }
      if (this.largeImgTop <= -this.minTop) {
        this.largeImgTop = -this.minTop;
      }

      // 显示文字信息
      if (this.scaleImg > 1) {
        this.smallImgStatus = true;
        this.showText = "放大" + this.scaleImg + "倍";
      } else {
        this.smallImgStatus = false;
        this.showText = "满窗口显示";
      }

      // mask 的left的最大最小取值和top的最大最小取值
      this.$nextTick(() => {
        let smallImgBox = document.querySelector(".smallImg");
        let maskBox = document.querySelector(".smallImg .mask");
        this.minMaskLeft =
          smallImgBox.offsetWidth *
          (1 - this.scaleMask) *
          (1 - clickX / actualImgBox.offsetWidth);
        this.maxMaskLeft =
          smallImgBox.offsetWidth *
          (1 - this.scaleMask) *
          (clickX / actualImgBox.offsetWidth);
        this.minMaskTop =
          smallImgBox.offsetHeight *
          (1 - this.scaleMask) *
          (1 - clickY / actualImgBox.offsetHeight);
        this.maxMaskTop =
          smallImgBox.offsetHeight *
          (1 - this.scaleMask) *
          (clickY / actualImgBox.offsetHeight);

        // mask 的取值范围
        if (this.maskLeft >= this.minMaskLeft) {
          this.maskLeft = this.minMaskLeft;
        }
        if (this.maskLeft <= -this.maxMaskLeft) {
          this.maskLeft = -this.maxMaskLeft;
        }
        if (this.maskTop >= this.minMaskTop) {
          this.maskTop = this.minMaskTop;
        }
        if (this.maskTop <= -this.maxMaskTop) {
          this.maskTop = -this.maxMaskTop;
        }
      });
    },
    // 弹出层大图片 右键点击图片
    rightClick(e) {
      if (this.lastTime - this.startTime > 250 || this.lastTime == undefined) {
        return;
      }
      //  给动画
      this.transitionImg = this.transitionMask = "all .3s";
      this.scaleImg -= 0.5;
      this.scaleMask += 0.2;

      //   获取对象
      let dialogBox = document.querySelector(".actualImgSize .el-dialog");
      let actualBox = document.querySelector(".actualImgSize .v-actualImgSize");
      let actualImgBox = document.querySelector(".actualImgSize .actualImg");

      let clickX = e.clientX - dialogBox.offsetLeft - actualBox.offsetLeft;
      let clickY = e.clientY - dialogBox.offsetTop - actualBox.offsetTop;

      this.originImg =
        (clickX / actualImgBox.offsetWidth) * 100 +
        "%" +
        " " +
        (clickY / actualImgBox.offsetHeight) * 100 +
        "%";
      this.originMask = this.originImg;

      if (this.scaleImg <= 1) {
        this.clickLargeStatus = true;
        this.rightClickStatus = false;
        this.largeImgLeft = 0;
        this.largeImgTop = 0;
        this.scaleImg = 1;
        // 文字提示
        this.smallImgStatus = false;
        this.showText = "满窗口显示";
      } else {
        this.clickLargeStatus = true;
        // this.rightClickStatus = true;
        // 文字提示
        this.smallImgStatus = true;
        this.showText = "放大" + this.scaleImg + "倍";
      }

      if (this.scaleMask >= 1) {
        this.maskLeft = 0;
        this.maskTop = 0;
      }

      //  图片最大left
      this.maxLeft =
        actualImgBox.offsetWidth *
        (this.scaleImg - 1) *
        (clickX / actualImgBox.offsetWidth);
      //   图片最小left
      this.minLeft =
        actualImgBox.offsetWidth *
        (this.scaleImg - 1) *
        (1 - clickX / actualImgBox.offsetWidth);
      //  图片最大top
      this.maxTop =
        actualImgBox.offsetHeight *
        (this.scaleImg - 1) *
        (clickY / actualImgBox.offsetHeight);
      //  图片最小top
      this.minTop =
        actualImgBox.offsetHeight *
        (this.scaleImg - 1) *
        (1 - clickY / actualImgBox.offsetHeight);

      //  left 取值范围
      if (this.largeImgLeft >= this.maxLeft) {
        this.largeImgLeft = this.maxLeft;
      }
      if (this.largeImgLeft <= -this.minLeft) {
        this.largeImgLeft = -this.minLeft;
      }
      //   top 取值范围
      if (this.largeImgTop >= this.maxTop) {
        this.largeImgTop = this.maxTop;
      }
      if (this.largeImgTop <= -this.minTop) {
        this.largeImgTop = -this.minTop;
      }

      // mask 的left的最大最小取值和top的最大最小取值
      this.$nextTick(() => {
        let smallImgBox = document.querySelector(".smallImg");
        let maskBox = document.querySelector(".smallImg .mask");
        this.minMaskLeft =
          smallImgBox.offsetWidth *
          (1 - this.scaleMask) *
          (1 - clickX / actualImgBox.offsetWidth);
        this.maxMaskLeft =
          smallImgBox.offsetWidth *
          (1 - this.scaleMask) *
          (clickX / actualImgBox.offsetWidth);
        this.minMaskTop =
          smallImgBox.offsetHeight *
          (1 - this.scaleMask) *
          (1 - clickY / actualImgBox.offsetHeight);
        this.maxMaskTop =
          smallImgBox.offsetHeight *
          (1 - this.scaleMask) *
          (clickY / actualImgBox.offsetHeight);

        //   mask的取值范围
        if (this.maskLeft >= this.minMaskLeft) {
          this.maskLeft = this.minMaskLeft;
        }
        if (this.maskLeft <= -this.maxMaskLeft) {
          this.maskLeft = -this.maxMaskLeft;
        }
        if (this.maskTop >= this.minMaskTop) {
          this.maskTop = this.minMaskTop;
        }
        if (this.maskTop <= -this.maxMaskTop) {
          this.maskTop = -this.maxMaskTop;
        }
      });
    },
    // 鼠标按下事件 区分 点击和移动事件
    downLargeImg(e) {
      this.startTime = new Date().getTime();
      if (this.scaleImg > 1) {
        this.moveStatus = true;
      } else {
        this.moveStatus = false;
      }
      this.startX = e.clientX;
      this.startY = e.clientY;

      if (this.largeImgLeft != 0 || this.largeImgTop != 0) {
        this.endX = this.largeImgLeft;
        this.endY = this.largeImgTop;
      }
    },
    // 鼠标松开事件 记录上一个largeImg 的left值和top值
    upLargeImg(e) {
      this.lastTime = new Date().getTime();
      this.moveStatus = false;
      this.moveMaskImgStatus = false;
      this.endX = this.largeImgLeft;
      this.endY = this.largeImgTop;
    },
    // largeImg移动事件
    moveLargeImg(e) {
      this.transitionImg = this.transitionMask = "none";
      //   获取对象
      let dialogBox = document.querySelector(".actualImgSize .el-dialog");
      let actualBox = document.querySelector(".actualImgSize .v-actualImgSize");
      let actualImgBox = document.querySelector(".actualImgSize .actualImg");
      let largeImg = document.querySelector(".actualImgSize .actualImg img");

      this.largeImgLeft = e.clientX - this.startX + this.endX;
      this.largeImgTop = e.clientY - this.startY + this.endY;

      //  left 取值范围
      if (this.largeImgLeft >= this.maxLeft) {
        this.largeImgLeft = this.maxLeft;
      }
      if (this.largeImgLeft < -this.minLeft) {
        this.largeImgLeft = -this.minLeft;
      }
      //   top 取值范围
      if (this.largeImgTop >= this.maxTop) {
        this.largeImgTop = this.maxTop;
      }
      if (this.largeImgTop < -this.minTop) {
        this.largeImgTop = -this.minTop;
      }

      // mask 最小left
      if (this.largeImgLeft < 0) {
        this.maskLeft = -(
          this.largeImgLeft /
          (this.minLeft / this.minMaskLeft)
        );
      } else {
        this.maskLeft = -(
          this.largeImgLeft /
          (this.maxLeft / this.maxMaskLeft)
        );
      }
      if (this.largeImgTop < 0) {
        this.maskTop = -(this.largeImgTop / (this.minTop / this.minMaskTop));
      } else {
        this.maskTop = -(this.largeImgTop / (this.maxTop / this.maxMaskTop));
      }
    },
    // 鼠标离开事件 去除移动事件 防止 再次进去 不按下鼠标 图片跟随移动
    leaveLargeImg() {
      this.upLargeImg();
    },
    // mask层img的鼠标点击事件
    clickMaskImg() {},
    reightClickMaskImg() {},
    // mask层img的鼠标按下事件
    downMaskImg(e) {
      this.moveMaskImgStatus = true;

      this.startMaskImgX = e.clientX;
      this.startMaskImgY = e.clientY;

      if (this.maskImgLeft != 0 || this.maskImgTop != 0) {
        this.endMaskImgX = this.maskImgLeft;
        this.endMaskImgY = this.maskImgTop;
      }
    },
    // mask层img的鼠标移动事件
    moveMaskImg(e) {
      this.maskImgLeft = e.clientX - this.startMaskImgX + this.endMaskImgX;
      this.maskImgTop = e.clientY - this.startMaskImgY + this.endMaskImgY;

      let actualImgBox = document.querySelector(".actualImg");
      let smallImgBox = document.querySelector(".smallImg");

      // 取值范围
      if (this.maskImgLeft <= 0) {
        this.maskImgLeft = 0;
      }
      if (
        this.maskImgLeft >=
        actualImgBox.offsetWidth - smallImgBox.offsetWidth
      ) {
        this.maskImgLeft = actualImgBox.offsetWidth - smallImgBox.offsetWidth;
      }
      if (this.maskImgTop <= 0) {
        this.maskImgTop = 0;
      }
      if (
        this.maskImgTop >=
        actualImgBox.offsetHeight - smallImgBox.offsetHeight
      ) {
        this.maskImgTop = actualImgBox.offsetHeight - smallImgBox.offsetHeight;
      }
    },
    // mask层img的鼠标松开事件
    upMaskImg(e) {
      this.moveMaskImgStatus = false;

      this.endMaskImgX = this.maskImgLeft;
      this.endMaskImgY = this.maskImgTop;
    },
    overMaskImg() {
      this.clickLargeStatus = false;
      this.moveStatus = false;
    },
    leveaMaskImg() {
      this.clickLargeStatus = true;
      this.moveMaskImgStatus = false;
    },
    // mask层鼠标点击
    clickMask() {},
    rightClickMask() {},
    // mask层鼠标按下
    downMask(e) {
      this.moveMaskStatus = true;

      this.startMaskX = e.clientX;
      this.startMaskY = e.clientY;

      if (this.maskLeft != 0 || this.endMaskY != 0) {
        this.endMaskX = this.maskLeft;
        this.endMaskY = this.maskTop;
      }
    },
    // mask层鼠标移动
    moveMask(e) {
      this.transitionMask = this.transitionImg = "none";
      this.maskLeft = e.clientX - this.startMaskX + this.endMaskX;
      this.maskTop = e.clientY - this.startMaskY + this.endMaskY;
      // mask 的 left和top取值范围
      if (this.maskLeft >= this.minMaskLeft) {
        this.maskLeft = this.minMaskLeft;
      }
      if (this.maskLeft <= -this.maxMaskLeft) {
        this.maskLeft = -this.maxMaskLeft;
      }
      if (this.maskTop >= this.minMaskTop) {
        this.maskTop = this.minMaskTop;
      }
      if (this.maskTop <= -this.maxMaskTop) {
        this.maskTop = -this.maxMaskTop;
      }

      // 大图片的left 和 top
      if (this.maskLeft < 0) {
        this.largeImgLeft = -(
          this.maskLeft *
          (this.maxLeft / this.maxMaskLeft)
        );
      } else {
        this.largeImgLeft = -(
          this.maskLeft *
          (this.minLeft / this.minMaskLeft)
        );
      }
      if (this.maskTop < 0) {
        this.largeImgTop = -(this.maskTop * (this.minTop / this.minMaskTop));
      } else {
        this.largeImgTop = -(this.maskTop * (this.maxTop / this.maxMaskTop));
      }
    },
    // mask层鼠标松开
    upMask(e) {
      // this.clickLargeStatus = true;
      this.moveMaskStatus = false;

      this.endMaskX = this.maskLeft;
      this.endMaskY = this.maskTop;
    },
    // mask层鼠标离开
    leaveMask() {
      // this.clickLargeStatus = true;
      this.moveMaskStatus = false;
    },
    // 点击翻译按钮
    translate() {
      this.translateStatus = true;
    },
    // 翻译弹出层 点击确定按钮
    translateTrue() {
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
      var ids = "";
      var indexList = [];
      if (this.tableData.findIndex((target) => target.checked === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].checked) {
            if (this.tableData[i].translationStatus == 0) {
              ids += "'" + this.tableData[i].id + "',";
              indexList.push(i);
            }
          }
        }
      } else {
        this.$message({
          message: "请勾选要翻译的产品",
          duration: 600,
          center: true,
          type: "error",
        });
        return;
      }

      ids = ids.substring(0, ids.length - 1);
      let data = {
        userId: this.InfoData.id,
        language: this.translateIndex,
        ids: ids,
      };

      this.translateStatus = false;

      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "翻译中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWtranslation",
        params: data,
      })
        .then((result) => {
          loading.close();

          if (result.data.Code == 200) {
            for (let i = 0; i < indexList.length; i++) {
              this.tableData[indexList[i]].translationStatus = 1;
              this.tableData[indexList[i]].translationText = "已翻译";
            }
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.translateStatus = true;
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
          this.translateStatus = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 跳转商品详情页面
    GotoProductPage(item, index) {
      //   this.$router.push({
      //     name: "ProductDetails",
      //     query: {
      //       id: item.id,
      //       language: this.langugeList[this.langugeIndex].value,
      //     },
      //   });

      let routeData = this.$router.resolve({
        path: "/ProductDetails",
        query: {
          userID: this.InfoData.id,
          id: item.id,
          language: this.langugeList[this.langugeIndex].value,
          shopData: JSON.stringify(this.shopData),
        },
      });
      window.open(routeData.href, "_blank");
    },
    // 去原链接
    GotoStbao(item) {
      this.$axios({
        url: "/sigaoyi/getdetail_url",
        method: "POST",
        params: {
          id: item.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.code == "200") {
            window.open(result.data.detail_url, "_blank");
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 图片加载事件
    loadImg(item, index, e) {
      item.loadingImg = false;
    },
    progress(e) {},
    // 删除产品
    delCommodity() {
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
      var ids = "";
      var indexList = [];
      if (this.tableData.findIndex((target) => target.checked === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].checked) {
            ids += "'" + this.tableData[i].id + "',";
            indexList.push(i);
          }
        }
      } else {
        this.$message({
          message: "请选择勾选要删除的产品",
          duration: 600,
          center: true,
          type: "error",
        });
        return;
      }

      ids = ids.substring(0, ids.length - 1);
      let data = {
        userId: this.InfoData.id,
        ids: ids,
      };
      console.log("data ==>", data);
      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "删除中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$axios({
        url: "/sigaoyi/deteletproduct",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          if (result.data.code == "200") {
            for (let i = indexList.length - 1; i >= 0; i--) {
              this.tableData.splice(indexList[i], 1);
            }
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
          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 删除翻译
    delTranslation() {
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
      var ids = "";
      var indexList = [];
      if (this.tableData.findIndex((target) => target.checked === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].checked) {
            if (
              this.tableData[i].translationStatus == 1 ||
              this.tableData[i].translationText == ""
            ) {
              ids += "'" + this.tableData[i].id + "',";
              indexList.push(i);
            }
          }
        }
      } else {
        this.$message({
          message: "请选择勾选要翻译的产品",
          duration: 600,
          center: true,
          type: "error",
        });
        return;
      }
      ids = ids.substring(0, ids.length - 1);
      let data = {
        userId: this.InfoData.id,
        ids: ids,
      };

      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "删除翻译中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$axios({
        url: "/sigaoyi/deteletranslation",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          if (result.data.code == "200") {
            if (this.langugeList[this.langugeIndex].value != 0) {
              for (let i = indexList.length - 1; i >= 0; i--) {
                this.tableData.splice(indexList[i], 1);
              }
            } else {
              for (let i = 0; i < indexList.length; i++) {
                this.tableData[indexList[i]].translationStatus = 0;
                this.tableData[indexList[i]].translationText = "未翻译";
              }
            }
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
          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 导出产品
    derive() {
      this.deriveStatus = true;
    },
    // 导出产品 的平台 change
    platform(e) {
      if (this.platformIndex == 1) {
        this.deriveText = {
          price: "(price*2+55)*1.2/0.058",
          name1: "分类编号：",
          placeholder1: "请输入分类编号",
          name2: "运费编号：",
          placeholder2: "请输入运费编号",
        };
      } else {
        this.deriveText = {
          price: "(price*2+55)*1.2/0.058",
          name1: "分类：",
          placeholder1: "请输入分类",
          name2: "挂号模板：",
          placeholder2: "请输入挂号模板",
        };
      }
    },
    // 点击导出产品的确定按钮
    clickDerive() {
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
        userId: this.InfoData.id,
        platform: this.platformIndex,
        manner: this.selectMannerIndex,
        language: this.selectLanguageIndex,
        pricefromula: this.deriveText.price,
        Qoo10type: this.$refs.deriveText1.value,
        freightid: this.$refs.deriveText2.value,
        ids: "",
      };

      // 选择平台 所传的key
      for (const key in data) {
        if (data.platform == 2) {
          if (key == "Qoo10type") {
            data["amazontype"] = data.Qoo10type;
            delete data.Qoo10type;
          } else if (key == "freightid") {
            data["registeredid"] = data.freightid;
            delete data.freightid;
          }
        } else {
          if (key == "amazontype") {
            data["Qoo10type"] = data.amazontype;
            delete data.amazontype;
          } else if (key == "registeredid") {
            data["freightid"] = data.registeredid;
            delete data.registeredid;
          }
        }
      }
      //   data.ids += "'" + this.tableData[i].id + "'" + ",";
      // 选择导出方式 是否传ids
      if (data.manner == 1) {
        if (
          this.tableData.findIndex((target) => target.checked === true) > -1
        ) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].checked) {
              data.ids += "'" + this.tableData[i].id + "'" + ",";
            }
          }
        } else {
          this.$message({
            message: "请勾选要导出的产品",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        data.ids = data.ids.substring(0, data.ids.length - 1);
      } else {
        data["userName"] = this.InfoData.userName;
        delete data.ids;
      }

      this.deriveStatus = false;
      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "导出中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/exportproductlibrary",
        params: data,
      })
        .then((result) => {
          loading.close();

          if (result.data.code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.iframeSrc = "http://www.ec-sigaoyi.com/" + result.data.path;
            // http://192.168.1.179:8080/
            // http://www.ec-sigaoyi.com/
            setTimeout(() => {
              this.iframeSrc = "";
            }, 500);
            // http://www.ec-sigaoyi.com/wenjian/xls/1688toQoo10/1616480682454.xlsx
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
            this.deriveStatus = true;
          }
        })
        .catch((err) => {
          loading.close();
          this.deriveStatus = true;
          consoel.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // select 事件
    changeSet(index, string) {
      if (string == "classNum1") {
        if (index == "") {
          index = 99;
        }
        if (index == 99) {
          this.classNum1Index = 99;
          this.classNum2Index = 99;
          this.classNum3Index = 99;
          this.classNum2 = this.classNum3 = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: index,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.classNum2 = result.data.catalogs;
          })
          .catch((err) => {});
      } else if (string == "classNum2") {
        if (index == "") {
          index = 99;
        }
        if (index == 99) {
          this.classNum2Index = 99;
          this.classNum3Index = 99;
          this.classNum3 = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: index,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.classNum3 = result.data.catalogs;
          })
          .catch((err) => {});
      } else if (string == "languge") {
        if (index == "") {
          index = 0;
          this.langugeIndex = 0;
        }
        this.searInput(30, 1, "start");
      }
    },
    // 搜索按钮  sreach
    searInput(amount, pages, string) {
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
      if (string == "start") {
        //   发起请求
        var loading = this.$loading({
          lock: false,
          text: "搜索中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        amount = 30;
        pages = 1;
        // 复制 当前list
        var copyTableData = JSON.parse(JSON.stringify(this.tableData));
      } else {
        pages++;
        // console.log("pages ==>",pages);
      }
      let data = {
        userId: this.InfoData.id,
        amount: amount,
        pages: pages,
        platform: this.selectorIndex,
        status: 0,
        language: this.langugeIndex,
        sortid: this.classNum1Index,
        sortid11: this.classNum2Index,
        sortid22: this.classNum3Index,
        translationStatus: 99,
        title: this.inputList.title,
      };
      //   laoding
      this.loading = true;
      this.errorLoading = false;
      this.apiLoading = false;

      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWproductLibrary",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            // laoding
            this.loading = false;
            this.errorLoading = false;
            //string == "start"
            if (string == "start") {
              this.tableData = [];
              loading.close();
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            }

            result.data.products.forEach((e, i) => {
              // item.active
              e["isActive"] = false;
              // 展示图片状态
              e["ImgStatus"] = false;
              e["loadingImg"] = true;
              //   选中状态
              e["checked"] = false;
              //   价格处理
              e["integer"] = e.price.toString().split(".")[0];
              e["decimals"] = e.price.toString().split(".")[1];
              if (e.decimals == undefined) {
                e.decimals = "00";
              } else {
                if (e.decimals.length == 1) {
                  e.decimals = e.decimals + "0";
                }
              }
              e["imgList"] = e.item_imgs.split(",");
              // 钱符号
              if (e.currencytype == 0) {
                e["moneySymbol"] = "¥";
              } else if (e.currencytype == 1) {
                e["moneySymbol"] = "$";
              } else {
                e["moneySymbol"] = "円";
              }
              // 翻译状态
              if (result.data.language == 0) {
                if (e.translationStatus == 1) {
                  e["translationText"] = "已翻译";
                } else {
                  e["translationText"] = "未翻译";
                }
              } else {
                e["translationText"] = "";
              }
              // 图片处理
              if (e.imgList.length > 0) {
                e["imgList1"] = [...e.imgList];
                for (let i = 0; i < e.imgList1.length; i++) {
                  e.imgList1[i] = "";
                }
              } else {
                e["imgList1"] = [];
              }

              // 图片是否已经加载过
              if (string == "start") {
                copyTableData.forEach((el) => {
                  if (el.id == e.id) {
                    if (!el.loadingImg) {
                      // 已加载
                      e.loadingImg = false;
                    }
                  }
                });
              }
              this.tableData.push(e);
            });

            // console.log("this.tableData ==>", this.tableData);

            this.amount = result.data.page.amount;
            this.pages = result.data.page.pages;
            // 类目1
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.classNum1 = result.data.catalogs;
            // 找不到
            if (result.data.products.length < 30) {
              this.apiLoading = true;
              return;
            }
          } else {
            // laoding
            this.loading = false;
            this.apiLoading = true;
            this.errorLoading = true;
            if (string == "start") {
              this.$notify({
                title: "请求失败",
                message: result.data.msg,
                type: "warning",
                offset: 50,
              });
            }
          }
        })
        .catch((err) => {
          // console.log("err ==>",err);
          // laoding
          if (string == "start") {
            loading.close();
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试",
              type: "error",
              offset: 50,
            });
          }
          this.loading = false;
          this.apiLoading = true;
          this.errorLoading = true;
        });
    },
    searInput1() {
      //   console.log("获取数据")
      //   this.loading = true;
      this.searInput(this.amount, this.pages, "search");
    },
    // 获取产品详情
    getproductList(language) {
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
      //   发起请求
      //   let loading = this.$loading({
      //     lock: false,
      //     text: "加载中...",
      //     spinner: "el-icon-loading",
      //     background: "rgba(0, 0, 0, 0.7)",
      //   });
      this.loadingProcontent1 = true;
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWproductLibrary",
        params: {
          userId: this.InfoData.id,
          amount: 30,
          pages: 1,
          language: language,
          title: this.inputList.title,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.loadingProcontent1 = false;
          if (result.data.Code == 200) {
            if (result.data.products.length == 0) {
              this.$notify({
                title: "请求成功",
                message: "该用户没有产品",
                type: "success",
                offset: 50,
              });
              return;
            }
            result.data.products.forEach((e) => {
              // item.active
              e["isActive"] = false;
              // 展示图片状态
              e["ImgStatus"] = false;
              e["loadingImg"] = true;
              //   选中状态
              e["checked"] = false;
              if (e.price == 0) {
                //   价格处理
                e["integer"] = "0";
                e["decimals"] = "00";
              } else {
                e["integer"] = e.price.toString().split(".")[0];
                e["decimals"] = e.price.toString().split(".")[1];
              }
              if (e.decimals == undefined) {
                e.decimals = "00";
              } else {
                if (e.decimals.length == 1) {
                  e.decimals = e.decimals + "0";
                }
              }
              e["imgList"] = e.item_imgs.split(",");
              // 钱符号
              if (e.currencytype == 0) {
                e["moneySymbol"] = "¥";
              } else if (e.currencytype == 1) {
                e["moneySymbol"] = "$";
              } else {
                e["moneySymbol"] = "円";
              }
              // 翻译状态
              if (result.data.language == 0) {
                if (e.translationStatus == 1) {
                  e["translationText"] = "已翻译";
                } else {
                  e["translationText"] = "未翻译";
                }
              } else {
                e["translationText"] = "";
              }
              // 图片处理
              if (e.imgList.length > 0) {
                e["imgList1"] = [...e.imgList];
                for (let i = 0; i < e.imgList1.length; i++) {
                  e.imgList1[i] = "";
                }
              } else {
                e["imgList1"] = [];
              }
              // 图片是否已经加载过
              this.tableData.forEach((el) => {
                if (el.pic_url == e.pic_url) {
                  if (!el.loadingImg) {
                    // 已加载
                    e.loadingImg = false;
                  }
                }
              });
            });
            this.tableData = result.data.products;
            this.amount = result.data.page.amount;
            this.pages = result.data.page.pages;
            // 赋值个人信息
            this.setInfoData(result.data.userinfo);
            // 类目1
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.classNum1 = result.data.catalogs;
            // console.table(result.data.catalogs);
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
          console.log("err ==>", err);
          this.loadingProcontent1 = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    ...homeActions(["setWstateStatus", "setInfoData"]),
  },
  watch: {
    wastate: "listenWastate",
  },
};
</script>