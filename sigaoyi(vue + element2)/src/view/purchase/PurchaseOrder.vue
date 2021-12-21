<template>
  <div class="purchaseOrder">
    <div class="v-purchaseOrder">
      <div class="main" v-title data-title="采购单"></div>
      <div class="contentLogist">
        <div class="search">
          <div class="one">
            <div>
              <span class="text">运输单号：</span>
              <input
                type="text"
                @keydown.enter="getTableList(false)"
                placeholder="请输入"
                v-model="purchaseOrder"
              />
            </div>
            <div>
              <span class="text">添加人：</span>
              <input
                type="text"
                @keydown.enter="getTableList(false)"
                placeholder="请输入"
                v-model="addPeople"
              />
            </div>
            <div>
              <span class="text">采购人：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="purchasePeople"
                @keydown.enter="getTableList(false)"
              />
            </div>
            <div class="btn" v-if="openCloseState">
              <el-button size="small" @click="reset()">重置</el-button>
              <el-button
                type="primary"
                size="small"
                @click="getTableList(false)"
                >搜索</el-button
              >
              <!-- 收起 展开 -->
              <div class="open_close" @click="openClose()">
                <span>{{ openCloseText }}</span>
                <span><i :class="openCloseCionSrc"></i></span>
              </div>
            </div>
            <div v-else>
              <span class="text">添加时间：</span>
              <el-date-picker
                v-model="purchaseTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="two" v-show="!openCloseState">
            <div>
              <span class="text">状态：</span>
              <el-select v-model="purchaseStateIndex" placeholder="请选择">
                <el-option
                  v-for="item in purchaseStateList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">店铺：</span>
              <el-select v-model="shopIndex" clearable placeholder="请选择">
                <el-option
                  v-for="item in shopList"
                  :key="item.value"
                  :label="item.shopuser"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button size="small" @click="reset()">重置</el-button>
              <el-button
                type="primary"
                size="small"
                @click="getTableList(false)"
                >搜索</el-button
              >
              <!-- 收起 展开 -->
              <div class="open_close" @click="openClose()">
                <span>{{ openCloseText }}</span>
                <span><i :class="openCloseCionSrc"></i></span>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="list_btn">
            <el-button type="primary" size="medium" @click="mergeGoodes()"
              >合并发货</el-button
            >
            <el-button type="default" size="medium">导出采购单</el-button>
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
            <span class="relaod" @click="getTableList(true)">
              <i class="el-icon-refresh-right"></i>
            </span>
          </div>
          <div class="table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              @select="onTableSelect"
              @select-all="setAll"
              maxHeight="625"
              stripe
              style="width: 100%"
              v-loading="tableLoading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"> </el-table-column>
              <el-table-column label="运输编号">
                <template slot-scope="scope">
                  <div
                    class="orderNumber"
                    @click="openLogisticsTack(scope.$index, scope.row)"
                  >
                    {{ scope.row.shippingOrderNumber }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="optionAttributes" label="选项属性">
                <template slot-scope="scope">
                  <div class="optionAttributes">
                    {{ scope.row.optionAttributes }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="50" height="50" alt="" />
                </template>
              </el-table-column>
              <el-table-column prop="purchasePrice" label="采购价格">
              </el-table-column>
              <el-table-column prop="purchaseQuantity" label="采购数量">
              </el-table-column>
              <el-table-column label="采购链接">
                <template slot-scope="scope">
                  <div class="purchaseLink">{{ scope.row.purchaseLink }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="procurementStaff" label="采购人">
              </el-table-column>
              <el-table-column prop="purchaseTime" label="采购时间">
              </el-table-column>
              <el-table-column prop="status1" label="状态"> </el-table-column>
              <el-table-column
                prop="addPersonnel"
                label="添加人"
              ></el-table-column>
              <el-table-column
                prop="addTime"
                label="添加时间"
              ></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                  <div class="table_btn">
                    <el-button
                      size="small"
                      type="text"
                      @click="edit(scope.$index, scope.row)"
                      v-show="scope.row.status == 0"
                      >填单</el-button
                    >
                    <el-button
                      size="small"
                      type="text"
                      v-show="scope.row.status != 2 && scope.row.status != 0"
                      @click="toShip(scope.row, scope.index)"
                      >去发货</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="total,slot"
              :total="total"
            >
              <span class="blockText">显示</span>
            </el-pagination>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[30, 50, 100]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next, slot,jumper"
              :total="total"
              :pager-count="11"
            >
              <span class="ensure-btn fr" @click="clickTrue()">确定</span>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 编辑 -->
      <el-dialog
        title="编辑采购单"
        :visible.sync="purchaseMask.state"
        custom-class="editMask"
        width="34%"
      >
        <div>
          <span class="text">运输编号：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="purchaseMask.shippingOrderNumber"
          />
        </div>
        <div>
          <span class="text">选项属性：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="purchaseMask.optionAttributes"
          />
        </div>
        <div>
          <span class="text">采购连接：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="purchaseMask.purchaseLink"
          />
        </div>
        <div>
          <span class="text">采购数量：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="purchaseMask.purchaseQuantity"
          />
        </div>
        <div>
          <span class="text">采购价：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="purchaseMask.purchasePrice"
          />
        </div>
        <div class="remarks">
          <span class="text">备注：</span>
          <textarea
            v-model="purchaseMask.remark"
            placeholder="请输入"
            cols="40"
            rows="4"
          ></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="addPurchaeOrder()"
            >添 加</el-button
          >
          <el-button size="medium" @click="purchaseMask.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 去发货 -->
      <el-dialog
        title="添加运单"
        :visible.sync="apply.state"
        custom-class="applyMsk"
        width="47%"
      >
        <div class="AddomesticList">
          <span>运输编号：</span>
          <input
            type="text"
            placeholder="请填写转运单号"
            v-model="apply.trackNumber"
          />
        </div>
        <div class="createInfo">
          <div>
            <span class="text">发货方式：</span>
            <el-select
              v-model="apply.logisticsIndex"
              clearable
              placeholder="请选择"
              @change="getChannel(apply.logisticsIndex)"
            >
              <el-option
                v-for="item in apply.logisticsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">物流渠道：</span>
            <el-select v-model="apply.companyIndex" placeholder="请选择">
              <el-option
                v-for="item in apply.companyList"
                :key="item.value"
                :label="item.channelName"
                :value="item.channelValue"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div v-if="apply.logisticsIndex != 1">
          <el-divider content-position="left">转运仓消息</el-divider>
        </div>
        <div class="transferbin" v-if="apply.logisticsIndex != 1">
          <div>
            <span>货仓收件人：</span>
            <span>思高易({{ InfoData.id + 10850 }})</span>
            <i
              class="el-icon-document-copy"
              id="copyAdress"
              :data-clipboard-text="'思高易(' + InfoData.id + 10850 + ')'"
              @click="copyAdress"
            ></i>
          </div>
          <div>
            <span>货仓地址：</span>
            <span>广州市白云区齐富路金福大厦701室</span>
            <i
              class="el-icon-document-copy"
              id="copyAdress"
              @click="copyAdress"
              data-clipboard-text="广州市白云区齐富路金福大厦701室"
            ></i>
          </div>
        </div>
        <el-divider content-position="left">收件人信息</el-divider>
        <form action="">
          <div class="overseas">
            <div>
              <span>收件人：</span>
              <input
                type="text"
                placeholder="请输入收件人"
                v-model="apply.addressee"
              />
            </div>
            <div>
              <span class="text">联系电话：</span>
              <input
                type="text"
                id="address"
                placeholder="请输入联系电话"
                v-model="apply.phone"
              />
            </div>
            <div>
              <span>邮编：</span>
              <input
                type="text"
                id="address"
                placeholder="请输入邮编"
                v-model="apply.email"
              />
            </div>
          </div>
          <div class="detailAdress">
            <span>详情地址：</span>
            <input
              type="text"
              id="address"
              placeholder="请输入收件人详情地址信息"
              v-model="apply.detailAdress"
            />
          </div>
        </form>
        <el-divider content-position="left">转运商品</el-divider>
        <el-tag type="warning" v-show="apply.warningProduct">
          请准确填写商品名称、规格。不准确的商品信息导致错发、延时等后果，由客户自行承担。
          <i class="el-icon-close" @click="apply.warningProduct = false"></i>
        </el-tag>
        <div class="product">
          <div class="product_content">
            <div class="name">
              <div>
                <span>商品名称：</span>
                <input
                  type="text"
                  placeholder="请输入商品中文名称"
                  v-model="apply.tradeName"
                />
              </div>
              <div>
                <span>英文名称：</span>
                <input
                  type="text"
                  placeholder="请输入商品英文名称"
                  v-model="apply.englishName"
                />
              </div>
            </div>
            <div class="weight_count">
              <div>
                <span>选项属性：</span>
                <input
                  type="text"
                  placeholder="请输入商品重量"
                  v-model="apply.option"
                />
              </div>
              <div>
                <span>商品数量：</span>
                <input
                  type="text"
                  placeholder="请输入商品数量"
                  v-model="apply.quantity"
                />
              </div>
            </div>
            <div class="price">
              <div>
                <span class="text">采购价格：</span>
                <input
                  type="text"
                  placeholder="请输入"
                  v-model="apply.purchasePrice"
                />
              </div>
              <div>
                <span class="text">售价：</span>
                <input type="text" placeholder="请输入" v-model="apply.total" />
              </div>
            </div>
            <div class="link">
              <span class="text">采购链接：</span>
              <input type="text" placeholder="请输入" v-model="apply.link" />
            </div>
          </div>
          <!-- 备注 + 图片 -->
          <div class="note">
            <span>备注：</span>
            <textarea
              placeholder="请输入"
              v-model="apply.note"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div class="img">
            <span>商品图片：</span>
            <div class="bigImgList">
              <div v-show="apply.imgList.length > 0">
                <div
                  class="imgList"
                  v-for="(item, index) in apply.imgList"
                  :key="index"
                >
                  <img :src="item" alt="加载失败" />
                  <i class="el-icon-close" @click="clearImg(index)"></i>
                </div>
              </div>
              <div class="addImg imgList">
                <i class="el-icon-plus"></i>
                <input
                  type="file"
                  tilte="点击上传图片"
                  accept="image/*"
                  ref="uploadInt"
                  multiple
                  @change="updataImg($event)"
                />
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="confrimAddpurchase()"
            >确 定</el-button
          >
          <el-button size="medium" @click="apply.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 物流追踪 -->
      <div class="logisticsTack">
        <el-dialog
          title="物流追踪"
          :visible.sync="logisTackList.state"
          width="35%"
        >
          <div class="content">
            <div class="query">
              <div class="set">
                <span class="text">物流公司：</span>
                <el-select
                  v-model="logisTackList.index"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in logisTackList.list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="orderNum">
                <span class="text">单号：</span>
                <input
                  type="text"
                  placeholder="请输入单号"
                  v-model="logisTackList.orderNum"
                />
              </div>
              <div class="btn">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="mini"
                  @click="queryLogistics()"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="note">
              <div class="loading" v-if="logisTackList.loading">
                <span>
                  <i class="el-icon-loading"></i>
                  <i>加载中</i>
                </span>
              </div>
              <textarea
                cols="30"
                rows="28"
                placeholder="物流追踪"
                v-model="logisTackList.textVal"
                v-else
                disabled
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="logisTackList.state = false"
              >关 闭</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/less/purchaseOrder/purchaseOrder.less";
import dateFormats from "../../assets/js/dateFormat";
import Clipboard from "clipboard";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      purchaseOrder: "",
      addPeople: "",
      purchasePeople: "",
      purchaseTime: "",
      // 状态
      purchaseStateIndex: 99,
      purchaseStateList: [
        { name: "全部", value: 99 },
        { name: "未采购", value: 0 },
        { name: "已采购", value: 1 },
        { name: "已发货", value: 2 },
        { name: "缺货", value: 3 },
        { name: "订单取消", value: 4 },
        { name: "已入库", value: 5 },
      ],
      // 店铺
      shopIndex: "",
      shopList: [],
      // 编辑 采购单
      purchaseMask: {
        state: false,
        shippingOrderNumber: "",
        optionAttributes: "",
        purchaseQuantity: "",
        purchaseLink: "",
        purchasePrice: "",
        remark: "",
      },
      purchaseEditList: {},
      // 去发货
      apply: {
        state: false,
        id: "",
        ids: "",
        status: "",
        // 物流信息
        logisticsIndex: "",
        logisticsList: [
          { label: "转运", value: 0 },
          { label: "自发货", value: 1 },
        ],
        // 收件人信息
        companyIndex: "",
        companyList: [],
        addressee: "",
        phone: "",
        email: "",
        // 转运信息
        addomesticList: [],
        trackNumber: "",
        detailAdress: "",
        // 平台单号
        orderNo: "",
        // warning
        warningProduct: true,
        tradeName: "",
        englishName: "",
        option: "",
        quantity: 0,
        purchasePrice: "",
        total: 0,
        link: "",
        note: "",
        imgList: [],
      },
      applyRow: {},
      logisTackList: {
        state: false,
        index: "",
        list: [
          { name: "自动匹配", selected: true, value: "" },
          { name: "圆通速递", selected: false, value: "yuantong" },
          { name: "韵达快递", selected: false, value: "yunda" },
          { name: "中通快递", selected: false, value: "zhongtong" },
          { name: "申通快递", selected: false, value: "shentong" },
          { name: "百世快递", selected: false, value: "huitongkuaidi" },
          { name: "邮政快递包裹", selected: false, value: "youzhengguonei" },
          { name: "顺丰速运", selected: false, value: "shunfeng" },
          { name: "极兔速递", selected: false, value: "jtexpress" },
          { name: "EMS", selected: false, value: "ems" },
          { name: "京东物流", selected: false, value: "jd" },
          { name: "邮政标准快递", selected: false, value: "youzhengbk" },
          { name: "德邦", selected: false, value: "debangwuliu" },
          { name: "德邦快递", selected: false, value: "debangkuaidi" },
          { name: "圆通快运", selected: false, value: "yuantongkuaiyun" },
          { name: "百世快运", selected: false, value: "baishiwuliu" },
          { name: "丰网速运", selected: false, value: "fengwang" },
          { name: "宅急送", selected: false, value: "zhaijisong" },
          { name: "中通国际", selected: false, value: "zhongtongguoji" },
          { name: "中通快运", selected: false, value: "安能快运" },
          { name: "韵达快运", selected: false, value: "yundakuaiyun" },
          { name: "国际包裹", selected: false, value: "youzhengguoji" },
          { name: "顺丰快运", selected: false, value: "shunfengkuaiyun" },
          { name: "UPS", selected: false, value: "ups" },
          { name: "安得物流", selected: false, value: "annto" },
          { name: "优速快递", selected: false, value: "youshuwuliu" },
          { name: "特急送", selected: false, value: "lntjs" },
          { name: "DPD", selected: false, value: "dpd" },
          { name: "D速快递", selected: false, value: "dsukuaidi" },
          { name: "顺心捷达", selected: false, value: "sxjdfreight" },
          { name: "跨越速运", selected: false, value: "kuayue" },
          { name: "壹米滴答", selected: false, value: "yimidida" },
          { name: "DHL-全球件", selected: false, value: "dhlen" },
          { name: "DHL-中国件", selected: false, value: "dhl" },
          { name: "京广速递", selected: false, value: "jinguangsudikuaijian" },
        ],
        orderNum: "",
        loading: false,
        textVal: "",
      },
      // 展开/收起
      openCloseState: false,
      openCloseText: "收起",
      openCloseCionSrc: "el-icon-arrow-up",
      // 批量操作
      batchIndex: "",
      batchVal: "批量操作",
      batchList: [{ label: "删除", value: 0 }],
      // 表格
      tableData: [],
      tableLoading: false,
      mergeIndex: 0,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      // 发货 isMOre
      isMOre: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  activated() {},
  created() {
    document.title = "采购单";
    this.reset();
    this.getTableList(true);
  },
  computed: {
    ...homeState(["InfoData", "shopData"]),
  },
  methods: {
    // 收起 展开
    openClose() {
      this.openCloseState = !this.openCloseState;
      if (this.openCloseState) {
        this.openCloseText = "展开";
        this.openCloseCionSrc = "el-icon-arrow-down";
        this.openCloseState = true;
      } else {
        this.openCloseText = "收起";
        this.openCloseCionSrc = "el-icon-arrow-up";
        this.openCloseState = false;
      }
    },
    // 批量操作
    changeBatch() {
      this.batchIndex = this.batchVal;
      this.batchVal = "批量操作";
      if (this.batchIndex == 0) {
        //   删除
      }
    },
    // 全选状态值
    setAll(selection) {
      if (selection.length > 0) {
        this.Allstatus = true;

        selection.forEach((e) => {
          e.selected = true;
        });
      } else {
        this.Allstatus = false;
        this.tableData.forEach((e) => {
          e.selected = false;
        });
      }
    },
    //   是否选中的状态值
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;

      this.tableData.forEach((e) => {
        e.selected = false;
      });
      rows.forEach((e) => {
        e.selected = true;
      });

      // 点击合并按钮 的 勾选的订单数量
      this.mergeIndex = rows.length;
    },
    // 填单
    edit(index, row) {
      console.log(row);
      for (const key in this.purchaseMask) {
        for (const key1 in row) {
          if (key == key1) {
            this.purchaseMask[key] = row[key1];
          }
        }
      }
      this.purchaseMask.state = true;
      this.purchaseEditList = row;
    },
    // 填单确定 按钮
    addPurchaeOrder() {
      let data = {
        id: this.purchaseEditList.id,
        userId: this.InfoData.id,
        userName: this.InfoData.userName,
        shippingOrderNumber: this.purchaseMask.shippingOrderNumber,
        optionAttributes: this.purchaseMask.optionAttributes,
        purchaseLink: this.purchaseMask.purchaseLink,
        purchaseQuantity: this.purchaseMask.purchaseQuantity,
        purchasePrice: this.purchaseMask.purchasePrice,
        remark: this.purchaseMask.remark,
      };

      this.purchaseMask.state = false;
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/updatePurchaseorderInfo",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);

          if (result.data.Code == 200) {
            this.purchaseMask.state = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.getTableList(true);
          } else {
            this.purchaseMask.state = true;
            this.tableLoading = false;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.purchaseMask.state = true;
          this.tableLoading = false;
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 复制地址
    copyAdress() {
      var clipboard = new Clipboard("#copyAdress");
      clipboard.on("success", (e) => {
        this.$message({
          message: `复制成功`,
          center: true,
          duration: 800,
          type: "success",
        });
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message({
          message: "该浏览器不支持复制",
          center: true,
          duration: 800,
          type: "error",
        });
        clipboard.destroy();
      });
    },
    // 改变运输方式 获取 渠道
    getChannel(index) {
      this.$axios({
        url: "/sigaoyi/getAllLogisticschannelsInfo",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          channelType: index,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.apply.companyList = result.data.qoo10Orders;
            if (result.data.qoo10Orders.length > 0) {
              this.apply.companyIndex = result.data.qoo10Orders[0].channelValue;
            }
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 去发货
    toShip(row, index) {
      console.log(row);
      this.isMOre = false;

      this.apply.state = true;
      this.apply.warningProduct = true;
      this.apply.imgList = [];
      this.applyRow = row;

      this.$axios({
        url: "/sigaoyi/getQoo10OrderFoId",
        method: "POST",
        params: {
          qoo10orderID: row.qoo10orderID,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.apply.id = row.id;
            this.apply.status = row.status;
            // 运输编号
            this.apply.trackNumber = row.shippingOrderNumber;
            // 收件人信息
            this.apply.addressee = result.data.qoo10Order.receiver;
            this.apply.phone = result.data.qoo10Order.receiverTel;
            this.apply.email = result.data.qoo10Order.receiverMobile;
            this.apply.detailAdress = result.data.qoo10Order.shippingAddr;
            // 平台单号
            this.apply.orderNo = result.data.qoo10Order.orderNo;
            // 商品信息
            this.apply.tradeName = "";
            this.apply.englishName = "";
            this.apply.option = row.optionAttributes;
            this.apply.quantity = row.purchaseQuantity;
            this.apply.note = row.remark;
            this.apply.purchasePrice = row.purchasePrice;
            this.apply.link = row.purchaseLink;
            this.apply.total = result.data.qoo10Order.total;

            // 图片
            this.apply.imgList.push(row.img);
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    //  去发货 删除图片
    clearImg(index) {
      this.apply.imgList.splice(index, 1);
    },
    // 去发货 上传图片
    updataImg(e) {
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
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let url = "/sigaoyi/ImageOnlineURLUpload";
      this.$axios({
        url: "/sigaoyi/ImageOnlineURLUpload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          console.log(result);
          loading.close();
          if (result.data.Code == "200") {
            if (e.target.files.length > 1) {
              let imgStrList;
              imgStrList = result.data.imgsURL.split("\n");
              for (let i = imgStrList.length; i > 0; i--) {
                if (imgStrList[i] == "") {
                  imgStrList.splice(i, 1);
                }
              }
              for (let j = 0; j < imgStrList.length; j++) {
                this.apply.imgList.push(imgStrList[j]);
              }
            } else {
              this.apply.imgList.push(result.data.imgsURL);
            }
            this.$refs.uploadInt.value = "";
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
          console.log(err);
          this.$refs.uploadInt.value = "";
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试！",
            type: "error",
            offset: 50,
          });
        });
    },
    // 去发货 弹出层   确定 按钮
    confrimAddpurchase() {
      let data = {
        id: 0,
        userId: this.InfoData.id,
        clientName: this.InfoData.userName,
        name: this.apply.addressee,
        postcode: this.apply.email,
        phone: this.apply.phone,
        address: this.apply.detailAdress,
        englishName: this.apply.englishName,
        productName: this.apply.tradeName,
        dedare: "18",
        quantity: Number(this.apply.quantity),
        image: "",
        note: this.apply.note,
        enterDate: "",
        country: "JP",
        freight: 0,
        length: 0,
        width: 0,
        high: 0,
        weight: "0",
        freightprofit: 0,
        status: 9,
        orderId: this.apply.trackNumber,
        purchasePrice: Number(this.apply.purchasePrice),
        shipDate: "未发货",
        link: this.apply.link,
        platformorder: this.apply.orderNo,
        attributes: this.apply.option,
        price: this.apply.total.toString(),
        collectionStatus: 0,
        consignee_state: "",
        consignee_city: "",
        product_id: "",
        trade_type1: "",
        trade_type: this.apply.companyIndex,
        orderId1: "",
        purchaseMode: 0,
      };

      // 图片路径
      this.apply.imgList.forEach((e) => {
        data.image += `${e},`;
      });
      data.image = data.image.slice(0, data.image.length - 1);

      this.apply.state = false;
      this.$axios({
        url: "/sigaoyi/NEWaddlogistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.apply.state = false;
            if (this.isMOre) {
              this.changeStates();
            } else {
              this.changeState();
            }
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.apply.state = true;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.apply.state = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    // 修改状态
    changeState() {
      this.$axios({
        url: "/sigaoyi/updatePurchaseorderStatus",
        method: "POST",
        params: {
          id: this.apply.id,
          status: 2,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.applyRow.status = 2;
          this.applyRow.status1 = "已发货";
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 点击运输单号
    openLogisticsTack(index, row) {
      this.logisTackList.state = true;
      // 重置
      this.logisTackList.index = "";
      this.logisTackList.textVal = "";
      // 去除文字 + 空格
      let orderIdVal;
      orderIdVal = row.shippingOrderNumber.replace(/\s/g, "");
      orderIdVal = orderIdVal.replace(/[\u4e00-\u9fa5]/g, "");
      this.logisTackList.orderNum = orderIdVal;
    },
    // 物流弹出层 查询
    queryLogistics() {
      if (this.orderNum == "") {
        this.$message({
          message: "请输入物流单号",
          type: "error",
          center: true,
          duration: 800,
        });
        return;
      }
      this.logisticsLoading = true;
      this.$axios({
        url: "/sigaoyi/GetLogisticsInformation",
        method: "POST",
        params: {
          num: this.logisTackList.orderNum,
          com: this.logisTackList.index,
        },
      })
        .then((result) => {
          this.logisticsLoading = false;
          if (result.data.code == "200") {
            this.logisTackList.textVal = result.data.text;
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
          this.logisticsLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList(false);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableList(false);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 重置
    reset() {
      this.purchaseOrder = "";
      this.addPeople = "";
      this.purchasePeople = "";
      this.purchaseTime = "";
      this.purchaseStateIndex = 99;
      this.shopIndex = "";
      this.shopList = this.shopData;
    },
    // 获取初始值 + 搜索
    getTableList(flag) {
      if (flag) {
        //  初始 + 刷新
        this.reset();
        this.currentPage = 1;
        this.pageSize = 30;
      }
      let data = {
        pages: this.currentPage,
        amount: this.pageSize,
        shopid: this.shopIndex,
        userId: this.InfoData.id,
        status: this.purchaseStateIndex,
        addPersonnel: this.addPeople,
        shippingOrderNumber: this.purchaseOrder,
        addTime: "",
        addTime1: "",
      };
      if (data.shopid == "") {
        data.shopid = 0;
      }
      if (this.purchaseTime == "" || this.purchaseTime == null) {
        data.addTime = "";
        data.addTime1 = "";
      } else {
        data.addTime = dateFormats.dateFormat(this.purchaseTime[0]);
        data.addTime1 = dateFormats.dateFormat(this.purchaseTime[1]);
      }
      console.log(data);
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/getAllPurchaseorderInfo",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.tableData = result.data.purchaseorders;
            let statusObj = {
              0: "未采购",
              1: "已采购",
              2: "已发货",
              3: "缺货",
              4: "订单取消",
              5: "已入库",
            };
            result.data.purchaseorders.forEach((e) => {
              for (const key in statusObj) {
                if (e.status == key) {
                  e["status1"] = statusObj[key];
                }
              }
            });
            this.total = result.data.page.total;
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
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
          this.tableLoading = false;
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 合并发货
    mergeGoodes() {
      this.isMOre = true;

      var qoo10orderIDs = "";
      this.apply.total = 0;
      this.apply.quantity = 0;
      this.apply.purchasePrice = 0;
      this.apply.imgList = [];
      this.apply.option = "";
      this.apply.note = "";
      this.apply.addressee = "";
      this.apply.phone = "";
      this.apply.email = "";
      this.apply.detailAdress = "";

      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].selected) {
            qoo10orderIDs += this.tableData[i].qoo10orderID + ",";
            this.apply.ids += this.tableData[i].id + ",";
            this.apply.option += this.tableData[i].optionAttributes + ",";
            this.apply.note += this.tableData[i].remark + ",";
            this.apply.purchasePrice += this.tableData[i].purchasePrice;
            this.apply.imgList.push(this.tableData[i].img);
          }
        }
      } else {
        this.$message({
          message: "您还未勾选要合并的订单",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }

      if (this.mergeIndex == 1) {
        this.$message({
          message: "只勾选了一个订单",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      qoo10orderIDs = qoo10orderIDs.substring(
        0,
        qoo10orderIDs.lastIndexOf(",")
      );
      this.apply.ids = this.apply.ids.substring(
        0,
        this.apply.ids.lastIndexOf(",")
      );

      this.$axios({
        url: "/sigaoyi/getQoo10OrderFoIds",
        method: "POST",
        params: {
          qoo10orderIDs,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.apply.state = true;
            result.data.qoo10Orders.forEach((e) => {
              this.apply.addressee = e.receiver;
              this.apply.phone = e.receiverTel;
              this.apply.email = e.receiverMobile;
              this.apply.detailAdress = e.shippingAddr;
              this.apply.total += Number(e.orderPrice);
              this.apply.quantity += Number(e.orderQty);
            });
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 60,
            });
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 60,
          });
        });
    },
    // 改状态
    changeStates() {
      this.$axios({
        url: "/sigaoyi/updatePurchaseorderStatusatIds",
        method: "POST",
        params: {
          ids: this.apply.ids,
          status: 2,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          var idsList = this.apply.ids.split(",");
          this.tableData.forEach((e) => {
            for (let i = 0; i < idsList.length; i++) {
              if (e.id == idsList[i]) {
                e.status = 2;
                e.status1 = "已发货";
              }
            }
          });
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
  },
};
</script>

<style>
</style>