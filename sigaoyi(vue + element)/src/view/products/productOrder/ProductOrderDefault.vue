<template>
  <div class="productOrderDefault">
    <div class="v-productOrderDefault">
      <div class="main" v-title data-title="产品订单"></div>
      <div class="dandruff" ref="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 内容 -->
      <div class="proTop">
        <iframe :src="ifarmSrc" frameborder="0" style="display: none"></iframe>
        <!-- 搜索 -->
        <div class="order-search" ref="orderSearch">
          <div class="selectStatu">
            <div>
              <span>发货状态：</span>
              <select
                class="deliver"
                @change="changeSet(shippingStatusData, shipIndex, 'sreach')"
                v-model="shipIndex"
                :class="shipIndex == 0 ? '' : 'active'"
              >
                <option
                  v-for="(item, index) in shippingStatusData"
                  :key="index"
                  :selected="item.selected"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <span>采购方式：</span>
              <select
                class="purchase"
                @change="
                  changeSet(purchaseMethodsData, pruchaseIndex, 'sreach')
                "
                v-model="pruchaseIndex"
                :class="pruchaseIndex == 0 ? '' : 'active'"
              >
                <option
                  v-for="(item, index) in purchaseMethodsData"
                  :key="index"
                  :selected="item.selected"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <span>运输方式：</span>
              <select
                class="modeMethods"
                @change="changeSet(modeMethodsData, modeMethodsIndex, 'sreach')"
                v-model="modeMethodsIndex"
                :class="modeMethodsIndex == 0 ? '' : 'active'"
                :disabled="modeDisabled"
              >
                <option
                  v-for="(item, index) in modeMethodsData"
                  :key="index"
                  :selected="item.selected"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <span>异常状态：</span>
              <select
                class="abnormalData"
                @change="changeSet(abnormalData, abnormalIndex, 'sreach')"
                v-model="abnormalIndex"
                :class="abnormalIndex == 0 ? '' : 'active'"
              >
                <option
                  v-for="(item, index) in abnormalData"
                  :key="index"
                  :selected="item.selected"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div v-show="AllFreightStatus">
              <span>未支付运费：{{ freightVal }}</span>
              <button @click="AllPayment()">一键付款</button>
            </div>
          </div>
          <div class="detailDiv">
            <div class="set">
              <el-select
                v-model="value"
                clearable
                filterable
                placeholder="请选择用户编号"
                popper-class="setOptions"
                @change="clickSearch(30, 1, true)"
                :class="value == '' ? '' : 'active'"
              >
                <el-option
                  v-for="(item, index) in userNameList"
                  :key="index"
                  :label="item.userName + '：' + (item.id + 10850)"
                  :value="item.userName"
                >
                </el-option>
              </el-select>
            </div>
            <div class="inp" v-for="(item, index) in inputList" :key="index">
              <input
                type="text"
                :placeholder="item.placeText"
                v-model="item.value"
                @keydown.enter="clickSearch(pageSize, currentPage, true)"
                :class="item.value == '' ? '' : 'active'"
              />
            </div>
            <div class="inp-btn" :class="godownStatus ? '' : 'active'">
              <el-button
                size="medium"
                type="info"
                icon="el-icon-collection"
                v-show="godownStatus"
                @click="godown()"
                >入库</el-button
              >
            </div>
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="录入日期"
                end-placeholder="结束日期"
                unlink-panels
                :class="value1 == null ? '' : 'active'"
                @change="clickSearch(30, 1, true)"
              >
              </el-date-picker>
            </div>
            <div class="deliverData">
              <el-date-picker
                v-model="deliverTime"
                type="daterange"
                range-separator="至"
                start-placeholder="发货日期"
                end-placeholder="结束日期"
                unlink-panels
                :class="deliverTime == null ? '' : 'active'"
                @change="clickSearch(30, 1, true)"
              >
              </el-date-picker>
            </div>
            <div class="iconList">
              <div @click="resetIniput()">
                <i class="el-icon-refresh-right"></i>
              </div>
              <div @click="clickSearch(30, 1, true)">
                <i class="el-icon-search"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- btn table -->
        <div class="order-content">
          <div class="btn clearfix">
            <div class="fr" v-show="freightStatus">
              <el-button type="success" size="small" icon="el-icon-upload"
                >导入运费</el-button
              >
              <input
                type="file"
                title="点击导入运费"
                ref="uploadFreight"
                @change="uploadFreight($event)"
              />
            </div>
            <div class="fr">
              <el-button
                class="fr"
                :type="item.type"
                v-for="(item, index) in btnList"
                :key="index"
                size="small"
                @click="btnClickList(item)"
                :icon="item.icon"
                v-show="item.showStatus"
                :class="item.className"
                >{{ item.name }}</el-button
              >
            </div>
            <div class="fr" v-show="uploadOrderStatus">
              <el-button :type="orderPrimary" icon="el-icon-upload" size="small"
                >导入订单</el-button
              >
              <input
                type="file"
                title="点击导入订单"
                ref="uploadOrder"
                @change="updateFile($event)"
              />
            </div>
          </div>
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              @select="onTableSelect"
              @select-all="setAll"
              tooltip-effect="dark"
              style="width: 100%"
              maxHeight="735"
              @selection-change="handleSelectionChange"
              :row-class-name="tableRowClassName"
              :cell-class-name="changeCellStyle"
              v-loading="tableLoading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50" :fixed="screenWidth < 1700 ? 'left' : false "></el-table-column>
              <el-table-column label="异常" width="60">
                <template slot-scope="scope">
                  <el-switch
                    :value="scope.row.collecChecked"
                    active-color="#d4d4d4"
                    inactive-color="#409eff"
                    :disabled="
                      !scope.row.collecChecked || scope.row.collecStatuChecked
                    "
                    @change="changeAbnormal(scope.$index, scope.row)"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="国内单号">
                <template slot-scope="scope">
                  <!-- scope.row.collecChecked -->
                  <div v-if="scope.row.collecChecked" class="orderId">
                    {{ scope.row.orderId }}
                  </div>
                  <div
                    v-else
                    class="orderId active"
                    @click="openCause(scope.$index, scope.row)"
                  >
                    {{ scope.row.orderId }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="order_id"
                label="国际单号"
              ></el-table-column>
              <el-table-column label="转运单号">
                <template slot-scope="scope">
                  <div
                    class="order1Div"
                    @click="clickOrder1(scope.$index, scope.row)"
                  >
                    {{ scope.row.orderId1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="收件人姓名"
                width="110"
              ></el-table-column>
              <el-table-column label="图片">
                <!-- <template slot-scope="scope">
                  <img :src="scope.row.image1" width="40" height="40" />
                </template> -->
                <template slot-scope="scope">
                  <el-popover
                    placement="right-start"
                    popper-class="order-popover"
                    width="200"
                    trigger="hover"
                    :open-delay="1000"
                  >
                    <div class="lagerImg">
                      <img :src="scope.row.image1" :onerror="errorImage" />
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <img
                        :src="scope.row.image1"
                        :onerror="errorImage"
                        width="60"
                        height="60"
                        @click="openImgLink(scope.$index, scope.row)"
                      />
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="attributes" label="属性选项">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top" :open-delay="600">
                    <div>{{ scope.row.attributes }}</div>
                    <div slot="reference">{{ scope.row.attributes }}</div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="purchasePrice"
                label="采购价"
                width="80"
              ></el-table-column>
              <el-table-column
                width="50"
                prop="quantity"
                label="数量"
              ></el-table-column>
              <el-table-column
                prop="platformorder"
                label="平台单号"
              ></el-table-column>
              <el-table-column
                width="100"
                prop="enterDate"
                label="录入时间"
              ></el-table-column>
              <el-table-column
                prop="clientName"
                label="录入人"
              ></el-table-column>
              <el-table-column
                prop="shipDate"
                label="发货时间"
              ></el-table-column>
              <el-table-column prop="freight" label="运费" width="70">
              </el-table-column>
              <el-table-column prop="status" label="订单状态"></el-table-column>
              <!-- <el-table-column
              prop="purchaseMode"
              label="采购方式"
            ></el-table-column> -->
              <el-table-column label="操作" :fixed="screenWidth < 1700 ? 'right' : false " width="150">
                <template slot-scope="scope">
                  <!-- 管理员 -->
                  <div
                    v-if="
                      InfoDataObj.statu == '0' || InfoDataObj.orderStatu == 0
                    "
                  >
                    <!--  异常 -->
                    <div v-show="scope.row.followUp" class="v-followUp">
                      <div
                        class="followUp"
                        @click="clickFollowUp(scope.$index, scope.row)"
                      >
                        处理
                      </div>
                      <!-- 订单状态 == 7 -->
                      <div
                        class="followUp"
                        v-show="
                          scope.row.status == '待付运费' &&
                          InfoDataObj.orderStatu != 0
                        "
                        @click="clickPay(scope.$index, scope.row)"
                      >
                        付款
                      </div>
                      <div
                        class="Edit"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </div>
                    </div>
                    <!-- 正常 -->
                    <div v-show="!scope.row.followUp" class="v-followUp">
                      <!-- 订单状态 == 7 -->
                      <div
                        class="followUp"
                        v-show="
                          scope.row.status == '待付运费' &&
                          InfoDataObj.orderStatu != 0
                        "
                        @click="clickPay(scope.$index, scope.row)"
                      >
                        付款
                      </div>
                      <div
                        class="Edit"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </div>
                    </div>
                  </div>
                  <!-- 用户 -->
                  <div v-else>
                    <!--  异常 -->
                    <div v-show="scope.row.followUp" class="v-followUp">
                      <div
                        class="followUp"
                        @click="clickFollowUp(scope.$index, scope.row)"
                      >
                        跟进
                      </div>
                      <!-- 订单状态 == 7 -->
                      <div
                        class="followUp"
                        v-show="scope.row.status == '待付运费'"
                        @click="clickPay(scope.$index, scope.row)"
                      >
                        付款
                      </div>
                      <div
                        class="Edit"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </div>
                    </div>
                    <!-- 正常 -->
                    <div v-show="!scope.row.followUp" class="v-followUp">
                      <div
                        class="followUp"
                        @click="appeal(scope.$index, scope.row)"
                      >
                        申诉
                      </div>
                      <!-- 订单状态 != 7 -->
                      <div
                        class="followUp"
                        v-show="scope.row.status == '待付运费'"
                        @click="clickPay(scope.$index, scope.row)"
                      >
                        付款
                      </div>
                      <div
                        class="Edit"
                        @click="handleEdit(scope.$index, scope.row)"
                      >
                        编辑
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="paging">
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
              layout="sizes, prev, pager, next"
              :total="total"
              :pager-count="11"
            >
            </el-pagination>
            <el-pagination layout="slot">
              <span>总数量：{{profit.ordernum}}</span>
              <span>总运费：{{profit.totalFreight}}</span>
              <span>总销售金额：{{profit.totalPurchasePrice}}</span>
              <span>总采购金额：{{profit.totalprofit}}</span>
            </el-pagination>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="slot,jumper"
              :total="total"
            >
              <span class="ensure-btn fr" @click="clickTrue()">确定</span>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 同步订单 -->
      <div class="sync-order">
        <el-dialog
          title="同步订单"
          :visible.sync="syncOrderStatus"
          width="26%"
          center
        >
          <div class="content">
            <div>
              <span>选择店铺：</span>
              <select class="storeSelect">
                <option
                  v-for="(item, index) in storeList"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.shopuser }}
                </option>
              </select>
            </div>
            <div>
              <span>选择订单状态：</span>
              <select
                class="selectOrderStatus"
                v-model="orderIndex"
                @change="changeSet(orderList, orderIndex)"
              >
                <option
                  :value="index"
                  v-for="(item, index) in orderList"
                  :key="index"
                  :selected="item.selected"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <span>选择时间段：</span>
              <select
                class="timeSelect"
                v-model="timeIndex"
                @change="changeSet(timeList, timeIndex)"
              >
                <option
                  :value="index"
                  v-for="(item, index) in timeList"
                  :key="index"
                  :selected="item.selected"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clickSyncbtn()">确 定</el-button>
            <el-button @click="syncOrderStatus = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--转运单号 -->
      <div class="order1Mask">
        <el-dialog title="物流跟踪" :visible.sync="order1Status" width="33%">
          <div class="content">
            <div v-if="orderLoading">
              <span>
                <i class="el-icon-loading"></i>
                <i>加载中...</i>
              </span>
            </div>
            <textarea disabled v-else :value="order1HTML"></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="order1Status = false"
              >关 闭</el-button
            >
          </span>
        </el-dialog>
      </div>
      <!-- 查看异常 -->
      <div class="causeMask">
        <el-dialog
          title="异常信息跟进"
          :visible.sync="causeMaskStatus"
          width="33%"
          center
        >
          <div class="content">
            <div>
              <textarea
                cols="30"
                rows="28"
                placeholder="异常原因"
                disabled
                v-model="causeText"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="causeMaskStatus = false"
              >关 闭</el-button
            >
          </span>
        </el-dialog>
      </div>
      <!-- 标记异常 -->
      <div class="abnormal">
        <el-dialog
          title="填写异常原因"
          :visible.sync="abnormalStatus"
          width="35%"
          center
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <div class="content">
            <div>
              <span>常见原因</span>
              <select
                v-model="abnormalListIndex"
                @change="changeAbnormalSet(abnormalListIndex)"
              >
                <option
                  v-for="(item, index) in abnormalList"
                  :key="index"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <span>跟进内容</span>
              <textarea
                cols="30"
                rows="28"
                placeholder="请输入标记异常原因"
                v-model="textareaText"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="SubmitAbnormal()"
              >标记异常</el-button
            >
            <el-button @click="closeAbnormal()">取消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 处理按钮 -->
      <div class="FollowUp">
        <el-dialog
          title="填写异常原因"
          :visible.sync="FollowUpStatus"
          width="35%"
          center
        >
          <div class="content">
            <div>
              <span>订单ID</span>
              <input
                type="text"
                v-model="followList.orderId"
                placeholder="订单ID"
                disabled
              />
            </div>
            <div>
              <span>订单运费</span>
              <input
                type="text"
                v-model="followList.freight"
                placeholder="订单运费"
              />
            </div>
            <div>
              <span>订单状态</span>
              <select
                v-model="orderStatusIndex"
                @change="changeOrderStatus(orderStatusData, orderStatusIndex)"
              >
                <option
                  v-for="(item, index) in orderStatusData"
                  :key="index"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <span>常见原因</span>
              <select
                v-model="FollowUpListIndex"
                @change="changeFollowUp(FollowUpListIndex)"
              >
                <option
                  v-for="(item, index) in FollowUplList"
                  :key="index"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="active">
              <span>跟进内容</span>
              <textarea
                cols="30"
                rows="28"
                placeholder="请输入标记异常原因"
                v-model="FollowUpNote"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clickFollowUpStatus()"
              >确 认</el-button
            >
            <el-button @click="FollowUpStatus = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 跟进按钮 -->
      <div class="FollowUp1">
        <el-dialog
          title="填写异常原因"
          :visible.sync="FollowUp1Status"
          width="35%"
          center
        >
          <div class="content">
            <div>
              <span>常见问题</span>
              <select
                v-model="FollowUp1Index"
                @change="changeFollowUp1(FollowUp1Data, FollowUp1Index)"
              >
                <option
                  v-for="(item, index) in FollowUp1Data"
                  :key="index"
                  :value="index"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="active">
              <span>备注</span>
              <textarea
                cols="30"
                rows="28"
                placeholder="请输入标记异常原因"
                v-model="FollowUp1Note"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clickFollowUp1Status()"
              >确 认</el-button
            >
            <el-button @click="FollowUp1Status = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../assets/less/productOrder/productOrder.less";
import dateFormats from "../../../assets/js/dateFormat";
import timestampToTimes from "../../../assets/js/timestampToTime";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  //   name: "ProductOrderDefault",
  data() {
    return {
      // 屏幕实时 宽度
      screenWidth: "",   
      //  复制的个人信息   
      InfoDataObj: {},
      // 发货状态
      shipIndex: 0,
      shippingStatusData: [
        { name: "全部", selected: true, value: 99 },
        { name: "未入库", selected: false, value: 9 },
        { name: "库存件", selected: false, value: 0 },
        { name: "已订货", selected: false, value: 1 },
        { name: "已发货", selected: false, value: 2 },
        { name: "已完成", selected: false, value: 3 },
        { name: "待填采购价", selected: false, value: 4 },
        { name: "待付采购价", selected: false, value: 5 },
        { name: "待填运费", selected: false, value: 6 },
        { name: "待付运费", selected: false, value: 7 },
        { name: "处理跟进中", selected: false, value: 8 },
      ],
      // 采购方式
      pruchaseIndex: 0,
      purchaseMethodsData: [
        { name: "全部", selected: true, value: "99" },
        { name: "自采购", selected: false, value: "0" },
        { name: "待采购", selected: false, value: "1" },
      ],
      // 运输方式
      modeMethodsIndex: 0,
      modeMethodsData: [{ name: "全部", selected: true, value: "99" }],
      modeDisabled: false,
      // 异常状态
      abnormalIndex: 0,
      abnormalData: [
        { name: "全部", selected: true, value: "99" },
        { name: "正常订单", selected: false, value: "0" },
        { name: "异常订单", selected: false, value: "1" },
        { name: "已处理完成", selected: false, value: "2" },
      ],
      // 总运费
      freightVal: "",
      //   总运费状态值
      AllFreightStatus: false,
      //   inputList
      inputList: [
        { placeText: "收件人姓名", value: "" },
        { placeText: "平台单号", value: "" },
        { placeText: "单号", value: "" },
      ],
      value: "",
      // 录入人数组
      userNameList: [],
      // 发货时间
      deliverTime: null,
      //   按钮List
      btnList: [
        {
          type: "success",
          name: "导出表格-青岛",
          icon: "el-icon-download",
          showStatus: false,
        },
        {
          type: "primary",
          name: "导出发货表格",
          icon: "el-icon-download",
          showStatus: true,
        },
        {
          type: "success",
          name: "导入模板下载",
          icon: "el-icon-link",
          showStatus: true,
        },
        {
          type: "danger",
          name: "删除订单",
          icon: "el-icon-delete-location",
          showStatus: true,
        },
        {
          type: "primary",
          name: "导出订单",
          icon: "el-icon-s-order",
          showStatus: true,
        },
        {
          type: "success",
          name: "合并订单",
          icon: "el-icon-plus",
          showStatus: true,
          className: "",
        },
        {
          type: "primary",
          name: "同步订单",
          icon: "el-icon-refresh",
          showStatus: true,
          className: "",
        },
        {
          type: "success",
          name: "添加订单",
          icon: "el-icon-add-location",
          showStatus: true,
        },
      ],
      //   导出发货表格
      orderPrimary: "primary",
      //   导入运费show and hiiden
      freightStatus: false,
      // 导入订单 show and hidden
      uploadOrderStatus: true,
      // 点击合并按钮 勾选的订单数量
      mergeIndex: 0,
      //   日期
      value1: null,
      //   xls
      tableData: [],
      // 表格loading
      tableLoading: false,
      errorImage:
        'this.src="' + require("../../../assets/img/errorImg.png") + '"',
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      // 分页List
      profit:{},
      //   footer宽度
      footerW: "",
      // 查看异常原因的status
      causeMaskStatus: false,
      causeText: "",
      //   同步订单状态值
      syncOrderStatus: false,
      // 转运单号状态值
      order1Status: false,
      // 标记异常弹出层状态值
      abnormalStatus: false,
      // 标记异常弹出层表格index
      abnormaldioIndex: "",
      // 标记异常弹出层表格row
      abnormaldioRow: {},
      //  标记异常弹出层select 的 index
      abnormalListIndex: 0,
      //   标记异常弹出层select 的 List
      abnormalList: [
        { name: "请选择", checked: true },
        { name: "未到货", checked: false },
        { name: "物件与图片不符", checked: false },
        { name: "多物流单号", checked: false },
        { name: "PDF问题(没有上传/需重新上传)", checked: false },
        { name: "订单没有上传图片", checked: false },
      ],
      //   表格点击处理按钮
      FollowUpStatus: false,
      // 表格处理弹出层 第一set
      orderStatusIndex: 0,
      orderStatusData: [
        { name: "异常订单", checked: true, value: 1 },
        { name: "已完成处理", checked: false, value: 2 },
      ],
      // 表格处理弹出层  第二set
      FollowUpListIndex: 0,
      FollowUplList: [
        { name: "请选择", checked: true },
        { name: "未到货", checked: false },
        { name: "物件与图片不符", checked: false },
        { name: "多物流单号", checked: false },
        { name: "PDF问题(没有上传/需重新上传)", checked: false },
        { name: "订单没有上传图片", checked: false },
      ],
      // 绑定表格处理set 和 int 的值
      followList: {
        orderId: "",
        freight: "",
        node: "",
      },
      // 点击处理按钮 弹出层
      FollowUpRow: {},
      FollowUpIndex: "",
      // 处理弹出层备注
      FollowUpNote: "",
      // 跟进状态值 第一个set
      FollowUp1Status: false,
      FollowUp1Index: 0,
      FollowUp1Data: [
        { name: "请选择", checked: true, value: 1 },
        { name: "物流已签收,未发货", checked: false, value: 2 },
        { name: "物流单号查询不到物流轨迹", checked: false, value: 3 },
        { name: "运费不符合", checked: false, value: 3 },
        { name: "发错产品", checked: false, value: 4 },
        { name: "客户取消不发货", checked: false, value: 5 },
      ],
      // 跟进 row and index
      FollowUp1Row: {},
      FollowUp1Index1: Number,
      // 跟进备注
      FollowUp1Note: "",
      // 申诉 row and index
      appealRow: {},
      appealIndex: Number,
      // FollowUpTan
      FollowUpTan: Number,
      // 文本域内容
      textareaText: "",
      // 转运单号 val
      order1HTML: "",
      order1: "",
      //   转运单号loading Status
      orderLoading: true,
      // 同步订单 店铺列表
      storeList: [],
      //  同步订单 timeList  3 7 15 30
      timeIndex: 0,
      timeList: [
        { name: "当天", selected: true, value: 1 },
        { name: "最近七天", selected: false, value: 7 },
        { name: "最近半个月", selected: false, value: 15 },
        { name: "最近一个月", selected: false, value: 30 },
      ],
      //
      orderIndex: 0,
      orderList: [
        { name: "请选择订单状态", selected: true, value: 99 },
        { name: "新订购", selected: false, value: 2 },
        { name: "等待发货", selected: false, value: 3 },
      ],
      isRouterAilve: true,
      //   导入订单的loading
      loadingUpdateFile: null,
      //   导出发货表格 的路径
      ifarmSrc: null,
      // 入库按钮状态值
      godownStatus: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    //   console.log("to.params ==>",to.params);
    console.log("from.path ==>", from.path);
    if (from.path == "/productOrder/orderDetail") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    // 产品订单
    document.title = "产品订单";
    if (!this.$route.meta.isBack) {
      this.resetIniput();
      this.userNameList = [];
      this.storeList = [];
      this.tableData = [];
      this.getInitial();
      //   判断按钮show and hidden 00000000
      this.getOrder(this.pageSize, this.currentPage);
    } else {
      console.log("不重新获取数据!!!");
      this.$route.meta.isBack = false;
      console.log("this.$route.query.first ==>", this.$route.query.first);
      if (this.$route.query.first) {
        this.clickSearch(30, 1, true);
        this.getInitial();
      }
    }
  },
  created() {
    console.log("进入了created !!!!");
    this.screenWidth = document.documentElement.clientWidth;
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.documentElement.clientWidth;
        that.screenWidth = window.screenWidth;
        console.log("执行 onresize  事件 ====>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      })();
    };
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    //  获取 初始值
    getInitial() {
      this.InfoDataObj = this.InfoData;
      // 运输方式 或者运输渠道
      if (
        this.InfoDataObj.statu == "0" ||
        this.InfoDataObj.userName == "林天长" ||
        this.InfoDataObj.userName == "任治琴" ||
        this.InfoDataObj.userName == "李健明" ||
        this.InfoDataObj.userName == "王杰" ||
        this.InfoDataObj.userName == "hzsugoi" ||
        this.InfoDataObj.statu == "5"
      ) {
        this.InfoDataObj["orderStatu"] = 0;
        this.modeMethodsData = [
          { name: "全部", selected: true, value: "99" },
          { name: "E特快", selected: false, value: "ETK" },
          { name: "佐川特货", selected: false, value: "佐川" },
          { name: "佐川普货", selected: false, value: "RB-DS3" },
          { name: "佐川普货-LTW", selected: false, value: "LTW" },
          { name: "佐川普货-DPC", selected: false, value: "DPC" },
          { name: "青岛-免抛", selected: false, value: "QDMP" },
          { name: "佐川带电", selected: false, value: "JPSADD" },
          { name: "黑猫3cm", selected: false, value: "黑猫" },
          {
            name: "黑猫3cm带电",
            selected: false,
            value: "黑猫带电",
          },
          {
            name: "黑猫普货5cm",
            selected: false,
            value: "黑猫普货5cm",
          },
          { name: "黑猫带电5cm", selected: false, value: "黑猫带电5cm" },
          { name: "Qxpress", selected: false, value: "Qxpress" },
          { name: "EMS", selected: false, value: "EMS" },
          { name: "免抛", selected: false, value: "PK0009" },
          { name: "CNE", selected: false, value: "CNE" },
          { name: "国内退货", selected: false, value: "国内退货" },
        ];
        this.uploadOrderStatus = true;
        this.btnList.forEach((e) => {
          e.showStatus = true;
        });
        this.modeDisabled = false;
        this.godownStatus = true;
        if (
          this.InfoDataObj.userName == "hzsugoi" ||
          this.InfoDataObj.statu == "5"
        ) {
          this.btnList.forEach((e) => {
            e.showStatus = true;
            if (e.name == "导出发货表格") {
              e.showStatus = false;
            }
          });
          if (this.InfoDataObj.statu == "5") {
            this.modeDisabled = true;
            this.uploadOrderStatus = false;
            this.btnList.forEach((e) => {
              e.showStatus = false;
              if (e.name == "导出表格-青岛") {
                e.showStatus = true;
              }
            });
          }
        }
      } else {
        this.uploadOrderStatus = true;
        this.modeDisabled = false;
        this.godownStatus = false;
        this.modeMethodsData = [
          { name: "全部", selected: true, value: "99" },
          { name: "佐川", selected: false, value: "佐川" },
          { name: "黑猫", selected: false, value: "黑猫" },
          { name: "青岛-免抛", selected: false, value: "QDMP" },
          { name: "带电渠道", selected: false, value: "JPSADD" },
          { name: "Qxpress", selected: false, value: "Qxpress" },
          { name: "ETK", selected: false, value: "ETK" },
          { name: "EMS", selected: false, value: "EMS" },
        ];
        this.btnList.forEach((e) => {
          e.showStatus = true;
          if (e.name == "删除订单") {
            e.showStatus = false;
          }
          if (e.name == "导出发货表格") {
            e.showStatus = false;
          }
          if (e.name == "导出表格-青岛") {
            e.showStatus = false;
          }
        });
        if (this.InfoDataObj.statu <= "2") {
          this.btnList.forEach((e) => {
            e.showStatus = true;
            if (e.name == "删除订单") {
              e.showStatus = false;
            }
            if (e.name == "导出发货表格") {
              e.showStatus = false;
            }
          });
        }
      }
    },
    //   set
    changeSet(array, setIndex, string) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[setIndex].selected = true;
      console.log("array ==>", array);
      if (string == "sreach") {
        this.clickSearch(30, 1, true);
      }
    },
    handleSelectionChange() {},
    // 点击编辑按钮
    handleEdit(index, row) {
      this.$router.push({
        name: "OrderDetail",
        query: { id: row.id, rowStatus: true },
      });
    },
    // 点击转运单号
    clickOrder1(index, row) {
      this.order1Status = true;
      this.orderLoading = true;
      console.log("前一次 ==>", this.order1);
      console.log("第二次 ==>", row.orderId1);
      //  点击前两次是否是相同的订单id
      if (this.order1 == row.orderId1) {
        this.orderLoading = false;
        return;
      }
      // 请求
      this.$axios({
        url: "/sugoiERP/LogisticsTracking",
        method: "POST",
        params: {
          orderId1: row.orderId1,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.orderLoading = false;
          if (result.data.ResultMsg == "success") {
            this.order1HTML = result.data.message;
            this.order1 = row.orderId1;
          } else {
            this.order1HTML = "出现了未知的错误！！！";
          }
        })
        .catch((err) => {
          this.orderLoading = false;
          this.order1HTML = "系统业务繁忙,请稍后再试！";
          console.log("err");
        });
    },
    // 点击表格图片
    openImgLink(index, row) {
      //   console.log("row ==>", row);
      window.open(row.link);
    },
    // 入库
    godown() {
      // 提示
      if (this.inputList[2].value == "") {
        this.$message({
          message: "请填写单号",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.value == "") {
        this.$message({
          message: "请选择入库人名字",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      let data = {
        invoicingName: this.inputList[2].value,
        userID: this.value,
        number: 1,
        image: "",
        remarks: "",
      };
      console.log("data ==>", data);
      //   请求
      let loading = this.$loading({
        lock: false,
        text: "入库中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/warehousing",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.close();
          if (result.data.Code == 200) {
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
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 重置
    resetIniput() {
      this.$nextTick(() => {
        // set
        this.shipIndex = 0;
        this.pruchaseIndex = 0;
        this.modeMethodsIndex = 0;
        this.abnormalIndex = 0;
        // int
        this.inputList.forEach((e) => {
          e.value = "";
        });
        //
        this.value = "";
        this.deliverTime = null;
        this.value1 = null;
        // this.pageSize = 30;
        // this.currentPage = 1;
      });
    },
    // 搜索
    clickSearch(amount, pages, flag) {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        console.log(">>>>>>>>>>>>>>>>>订单页面");
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      // console.log("this.value1 ==>", this.value1);
      console.log("this.inputList ==>", this.inputList);
      //   console.log("flag ==>", flag);
      // 转时间格式
      if (this.value1 != null) {
        var time = dateFormats.dateFormat(this.value1[0]);
        var time1 = dateFormats.dateFormat(this.value1[1]);
      }
      if (
        time == "NaN-NaN-NaN" ||
        time == undefined ||
        time1 == "NaN-NaN-NaN" ||
        time1 == undefined
      ) {
        time = "";
        time1 = "";
      }
      //   if (this.value == "请选择") {
      //     this.value = "";
      //   }

      if (this.deliverTime != null) {
        var deliverTime = dateFormats.dateFormat(this.deliverTime[0]);
        var deliverTime1 = dateFormats.dateFormat(this.deliverTime[1]);
      }

      if (
        deliverTime == "NaN-NaN-NaN" ||
        deliverTime == undefined ||
        deliverTime1 == "NaN-NaN-NaN" ||
        deliverTime1 == undefined
      ) {
        deliverTime = "";
        deliverTime1 = "";
      }
      if (this.deliverTime == "请选择") {
        this.deliverTime = "";
      }
      console.log("time,time1 ==>", time, time1);

      var data = {
        amount: amount,
        pages: pages,
        userId: this.InfoData.id,
        // set
        status: this.shippingStatusData[this.shipIndex].value,
        purchaseMode: this.purchaseMethodsData[this.pruchaseIndex].value,
        collectionStatus: this.abnormalData[this.abnormalIndex].value,
        // 用户名 发货时间 开始 结束 时间
        ClientName: this.value,
        shipDate: deliverTime,
        shipDate1: deliverTime1,
        startTime: time1,
        lastTime: time,
      };
      // 运输方式 或者 渠道
      if (
        this.InfoData.statu == "0" ||
        this.InfoData.userName == "林天长" ||
        this.InfoData.userName == "任治琴" ||
        this.InfoData.userName == "李健明" ||
        this.InfoData.userName == "王杰" ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.statu == "5"
      ) {
        data["trade_type1"] = this.modeMethodsData[this.modeMethodsIndex].value;
      } else {
        data["trade_type"] = this.modeMethodsData[this.modeMethodsIndex].value;
      }

      //  收件人姓名 平台单号 单号
      for (let i = 0; i < this.inputList.length; i++) {
        if (i == 0) {
          data.name = this.inputList[i].value;
        } else if (i == 1) {
          data.platformorder = this.inputList[i].value;
        } else {
          data.orderId = this.inputList[i].value;
        }
      }

      console.log("data ==>", data);

      if (flag) {
        this.tableLoading = true;
      } else {
        var loading = this.$loading({
          lock: false,
          text: "上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }

      this.$axios({
        url: "/sigaoyi/NEWtoLogistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (flag) {
            this.tableLoading = false;
          } else {
            loading.close();
          }
          if (result.data.Code == 200) {
            //   用户名
            this.userNameList = result.data.logisticsNames;
            // 表格
            this.freightVal = result.data.freight.toFixed(2);
            // 分页 内容
            this.profit = result.data.profit;
            // console.log("Number(this.freightVal) ==>",Number(this.freightVal) > 0)
            // 已欠运费
            if (Number(this.freightVal) > 0) {
              this.AllFreightStatus = true;
              if (this.InfoData.statu > 2) {
                this.uploadOrderStatus = false;
                this.btnList.forEach((e) => {
                  if (e.name == "同步订单" || e.name == "添加订单") {
                    e.showStatus = false;
                  }
                });
                //  >2 公司名字 + 级别5
                if (
                  this.InfoData.company == "和美国际旅行社有限公司" ||
                  this.InfoData.company == "杭州思高易" ||
                  this.InfoData.statu == "5"
                ) {
                  this.uploadOrderStatus = true;
                  this.btnList.forEach((e) => {
                    if (e.name == "同步订单" || e.name == "添加订单") {
                      e.showStatus = true;
                    }
                  });
                }
                // 沈永鑫
                if (
                  this.InfoData.userName == "沈永鑫" &&
                  result.data.billingPeriodFreight <= 0
                ) {
                  this.uploadOrderStatus = true;
                  this.btnList.forEach((e) => {
                    if (e.name == "同步订单" || e.name == "添加订单") {
                      e.showStatus = true;
                    }
                  });
                }
                //  朴学峰
                if (
                  this.InfoData.userName == "朴学峰" &&
                  Number(this.freightVal) < 5000
                ) {
                  this.uploadOrderStatus = true;
                  this.btnList.forEach((e) => {
                    if (e.name == "同步订单" || e.name == "添加订单") {
                      e.showStatus = true;
                    }
                  });
                }
              } else {
                // 用户等级 0 1
                this.uploadOrderStatus = true;
                this.btnList.forEach((e) => {
                  if (e.name == "同步订单" || e.name == "添加订单") {
                    e.showStatus = true;
                  }
                });
              }
            } else {
              // 不欠运费
              this.AllFreightStatus = false;
              this.uploadOrderStatus = true;
              this.btnList.forEach((e) => {
                if (e.name == "同步订单" || e.name == "添加订单") {
                  e.showStatus = true;
                }
              });
            }
            // 用户级别 5
            if (this.InfoData.statu == "5") {
              this.uploadOrderStatus = false;
              this.btnList.forEach((e) => {
                e.showStatus = false;
                if (e.name == "导出表格-青岛") {
                  e.showStatus = true;
                }
              });
            }
            // 表格数据
            if (result.data.logisticss.length == 0) {
              this.$notify({
                title: "请求成功",
                message: "搜索不到订单",
                type: "success",
                offset: 50,
              });
              this.tableData = result.data.logisticss;
              this.total = result.data.page.total;
              return;
            }
            let obj = {
              0: "库存件",
              1: "已订货",
              2: "已发货",
              3: "已完成",
              4: "待填采购价",
              5: "待付采购价",
              6: "待填运费",
              7: "待付运费",
              8: "处理跟进中",
              9: "未入库",
            };
            result.data.logisticss.forEach((e) => {
              if (e.image == "") {
                e.image =
                  "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
              } else {
                e["image1"] = e.image.split(",")[0];
              }
              if (e.purchaseMode == 0) {
                e.purchaseMode = "自采购";
              } else {
                e.purchaseMode = "待采购";
              }
              // 国际单号
              if (e.order_id == "null") {
                e.order_id = "";
              }
              // 国内单号
              if (e.orderId == "null") {
                e.orderId = "";
              }
              for (const key in obj) {
                if (e.status == key) {
                  e.status = obj[key];
                }
              }
              // 运费
              if (e.freight != 0) {
                e.freight = e.freight.toFixed(2);
              }
              // 采购价
              if (e.purchasePrice != 0) {
                e.purchasePrice = e.purchasePrice.toFixed(2);
              }
              // 异常 异常按钮 显示
              if (e.collectionStatus == 1) {
                e["collecChecked"] = false;
                e["followUp"] = true;
              } else {
                e["collecChecked"] = true;
                e["followUp"] = false;
              }

              // 不是管理员不能标记异常
              if (result.data.userinfo.statu != "0") {
                e["collecStatuChecked"] = true;
                if (
                  result.data.userinfo.userName == "林天长" ||
                  result.data.userinfo.userName == "任治琴" ||
                  result.data.userinfo.userName == "李健明" ||
                  result.data.userinfo.userName == "王杰" ||
                  result.data.userinfo.userName == "hzsugoi" ||
                  this.InfoData.statu == "5"
                ) {
                  e["collecStatuChecked"] = false;
                }
              }
            });
            // 判断那些人在这页面是管理员
            //   this.getInitial();
            //  设置 页数 总数 等
            this.currentPage = result.data.page.pages;
            this.pageSize = result.data.page.amount;
            this.total = result.data.page.total;
            this.tableData = result.data.logisticss;
            this.tableData.forEach((e) => {
              e["image1"] = e.image.split(",")[0];
            });
            if (flag) {
              this.tableLoading = false;
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            } else {
              this.$notify({
                title: "请求成功",
                message: "导入成功",
                type: "success",
                offset: 50,
              });
            }
          } else {
            if (flag) {
              this.tableLoading = false;
              this.$notify({
                title: "请求失败",
                message: result.data.msg,
                type: "warning",
                offset: 50,
              });
            } else {
              this.$notify({
                title: "请求失败",
                message: "导入失败",
                type: "warning",
                offset: 50,
              });
            }
          }
        })
        .catch((err) => {
          if (flag) {
            this.tableLoading = false;
          } else {
            loading.close();
          }
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    //   是否选中的状态值
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;
      // console.log("selected ==>",selected)  // true就是选中，0或者false是取消选中
      //   console.log("row ==>", row);
      this.tableData.forEach((e) => {
        e["selected"] = false;
      });
      rows.forEach((e) => {
        e["selected"] = true;
      });
      //   console.log("rows ==>", rows);
      // 点击合并按钮 的 勾选的订单数量
      this.mergeIndex = rows.length;
    },
    // 全选状态值
    setAll(selection) {
      console.log("selection ==>", selection);
      if (selection.length > 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].selected = true;
        }
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].selected = false;
        }
      }
    },
    // 表格 事件 渲染颜色
    tableRowClassName({ row, rowIndex }) {
      if (!row.collecChecked) {
        return "red";
      }
      if (row.status == "库存件") {
        return "stock";
      }
      if (row.trade_type == "Qxpress") {
        return "yellow";
      }
    },
    changeCellStyle({ row, column, rowIndex, columnIndex }) {
      //   console.log("row ==>", row);
      if (columnIndex == 7) {
        return "hideDot";
      }
    },
    // 分页事件
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.clickSearch(this.pageSize, this.currentPage, true);
    },
    // 去第几页
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.clickSearch(this.pageSize, this.currentPage, true);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
      // console.log('cccccccccc ==>', this.currentPage)
    },
    // 点击按钮  0 1 显示删除按钮
    btnClickList(item) {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        console.log(">>>>>>>>>>>>>>>>>订单页面");
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      // 添加订单
      if (item.name == "添加订单") {
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
          this.$router.push({ name: "OrderDetail", rowStatus: false });
        }, 400);
      } else if (item.name == "同步订单") {
        if (this.storeList.length > 0) {
          this.syncOrderStatus = true;
          return;
        }
        item.className = "active";
        this.$axios({
          url: "/sigaoyi/NEWqoo10Shop",
          method: "POST",
          params: {
            userId: this.InfoData.id,
            amount: 30,
            pages: 1,
          },
        })
          .then((result) => {
            console.log("result ==>", result);
            setTimeout(() => {
              item.className = "";
            }, 500);
            if (result.data.Code == 200) {
              // 请选择店铺
              if (result.data.qoo10shops.length > 0) {
                this.storeList = result.data.qoo10shops;
                setTimeout(() => {
                  this.syncOrderStatus = true;
                }, 300);
              } else {
                this.syncOrderStatus = false;
                this.$notify({
                  title: "请求成功",
                  message: "该用户没有店铺",
                  type: "success",
                  offset: 50,
                });
              }
            } else {
              this.syncOrderStatus = false;
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
              item.className = "";
            }, 500);
            this.syncOrderStatus = false;
            this.$notify({
              title: "请求失败",
              message: "系统业务繁忙,清稍后再试",
              type: "error",
              offset: 50,
            });
            console.log("err ==>", err);
          });
      } else if (item.name == "删除订单") {
        var ids = "";
        var indexList = [];
        if (
          this.tableData.findIndex((target) => target.selected === true) > -1
        ) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].selected) {
              ids += this.tableData[i].id + ",";
              indexList.push(i);
            }
          }
        } else {
          this.$message({
            message: "请勾选要删除的订单!",
            center: true,
            duration: 800,
            type: "error",
          });
          return;
        }
        console.log("indexList ==>", indexList);
        ids = ids.substring(0, ids.length - 1);
        this.$confirm("", "请慎重选择要删除的订单列表", {
          dangerouslyUseHTMLString: true,
          center: true,
          type: "warning",
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          customClass: "delMessage",
        }).then(() => {
          //   发起请求
          let loading = this.$loading({
            lock: false,
            text: "删除中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.$axios({
            url: "/sigaoyi/delectlogistics",
            method: "POST",
            params: {
              ids: ids,
            },
          })
            .then((result) => {
              loading.close();
              console.log("result ==>", result);
              if (result.data.code == "200") {
                // indexList
                for (let i = indexList.length - 1; i >= 0; i--) {
                  this.tableData.splice(indexList[i], 1);
                }
                this.total = this.total - indexList.length;
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
              console.log("err ==>", err);
              this.$notify({
                title: "请求错误",
                message: "系统业务繁忙,请稍后再试",
                type: "error",
                offset: 50,
              });
            });
        });
      } else if (item.name == "导出发货表格") {
        //   发起请求
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/export",
          method: "POST",
          params: {},
        })
          .then((result) => {
            loading.close();
            console.log("result ==>", result);
            if (result.data.code == "200") {
              // http://192.168.1.179:8080/
              // http://www.ec-sigaoyi.com/
              this.ifarmSrc = "http://www.ec-sigaoyi.com/" + result.data.path;
              console.log("this.ifarmSrc ==>", this.ifarmSrc);
              setTimeout(() => {
                this.ifarmSrc = null;
                this.clickSearch(30, 1, true);
              }, 500);
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            } else {
              this.ifarmSrc = null;
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
            this.ifarmSrc = null;
            console.log("err =>", err);
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
          });
      } else if (item.name == "导入模板下载") {
        this.ifarmSrc = null;
        this.ifarmSrc =
          "http://www.ec-sigaoyi.com/wenjian/xls/order/%E8%AE%A2%E5%8D%95%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xls";
        setTimeout(() => {
          this.ifarmSrc = null;
        }, 600);
      } else if (item.name == "导出订单") {
        // 转时间格式
        if (this.value1 != null) {
          var time = dateFormats.dateFormat(this.value1[0]);
          var time1 = dateFormats.dateFormat(this.value1[1]);
        }
        if (
          time == "NaN-NaN-NaN" ||
          time == undefined ||
          time1 == "NaN-NaN-NaN" ||
          time1 == undefined
        ) {
          time = "";
          time1 = "";
        }
        // if (this.value == "请选择") {
        //   this.value = "";
        // }

        if (this.deliverTime != null) {
          var deliverTime = dateFormats.dateFormat(this.deliverTime[0]);
          var deliverTime1 = dateFormats.dateFormat(this.deliverTime[1]);
        }

        if (
          deliverTime == "NaN-NaN-NaN" ||
          deliverTime == undefined ||
          deliverTime1 == "NaN-NaN-NaN" ||
          deliverTime1 == undefined
        ) {
          deliverTime = "";
          deliverTime1 = "";
        }
        if (this.deliverTime == "请选择") {
          this.deliverTime = "";
        }
        console.log("time,time1 ==>", time, time1);

        //   发起请求
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let data = {
          userId: this.InfoData.id,
          clientName: "",
          status: Number(this.shippingStatusData[this.shipIndex].value),
          purchaseMode: Number(
            this.purchaseMethodsData[this.pruchaseIndex].value
          ),
          collectionStatus: Number(this.abnormalData[this.abnormalIndex].value),
          startTime: time1,
          lastTime: time,
          shipDate: deliverTime,
          shipDate1: deliverTime1,
          orderId: this.inputList[2].value,
        };

        if (
          this.InfoData.statu == "0" ||
          this.InfoData.userName == "林天长" ||
          this.InfoData.userName == "任治琴" ||
          this.InfoData.userName == "李健明" ||
          this.InfoData.userName == "王杰" ||
          this.InfoData.userName == "hzsugoi" ||
          this.InfoData.userName == "和美财务" ||
          this.InfoData.statu == "5"
        ) {
          data.clientName = this.value;
        } else {
          data.clientName = this.InfoData.userName;
        }

        // 运输方式 或者 渠道

        if (
          this.InfoData.statu == "0" ||
          this.InfoData.userName == "林天长" ||
          this.InfoData.userName == "任治琴" ||
          this.InfoData.userName == "李健明" ||
          this.InfoData.userName == "王杰" ||
          this.InfoData.userName == "hzsugoi" ||
          this.InfoData.statu == "5"
        ) {
          data["trade_type1"] = this.modeMethodsData[
            this.modeMethodsIndex
          ].value;
        } else {
          data["trade_type"] = this.modeMethodsData[
            this.modeMethodsIndex
          ].value;
        }

        this.$axios({
          url: "sigaoyi/NEWexportOrder",
          method: "POST",
          params: data,
        })
          .then((result) => {
            console.log("result ==>", result);
            loading.close();
            if (result.data.code == "200") {
              this.ifarmSrc = null;
              this.ifarmSrc = "http://www.ec-sigaoyi.com/" + result.data.path;
              // this.ifarmSrc = "http://192.168.1.179:8080/" + result.data.path;
              setTimeout(() => {
                this.ifarmSrc = null;
              }, 600);
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
            console.log("err ==>", err);
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试",
              type: "error",
              offset: 50,
            });
          });
      } else if (item.name == "合并订单") {
        var ids = "";
        if (
          this.tableData.findIndex((target) => target.selected === true) > -1
        ) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].selected) {
              ids += this.tableData[i].id + ",";
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
        if (this.mergeIndex > 2) {
          this.$message({
            message: "最多只能勾选两个订单",
            center: true,
            duration: 600,
            type: "error",
          });
          return;
        }
        ids = ids.substring(0, ids.lastIndexOf(","));
        console.log("ids ==>", ids);
        console.log("发送请求!!!!!!");
        // 发送请求!!!!!!
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/CombinedOrder",
          method: "POST",
          params: {
            ids: ids,
          },
        })
          .then((result) => {
            loading.close();
            console.log("result ==>", result);
            if (result.data.Code == 200) {
              this.clickSearch(30, 1, true);
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
            console.log("err ==>", err);
          });
      } else if (item.name == "导出表格-青岛") {
        //   exportQDMP
        //   发起请求
        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/exportQDMP",
          method: "POST",
          params: {
            id: this.InfoData.id,
          },
        })
          .then((result) => {
            loading.close();
            console.log("result ==>", result);
            if (result.data.code == "200") {
              // http://192.168.1.179:8080/
              // http://www.ec-sigaoyi.com/
              this.ifarmSrc = " http://www.ec-sigaoyi.com/" + result.data.path;
              console.log("this.ifarmSrc ==>", this.ifarmSrc);
              setTimeout(() => {
                this.ifarmSrc = null;
                this.clickSearch(30, 1, true);
              }, 500);
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            } else {
              this.ifarmSrc = null;
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
            this.ifarmSrc = null;
            console.log("err =>", err);
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试!",
              type: "error",
              offset: 50,
            });
          });
      }
    },
    // 同步订单弹出层 确定按钮
    clickSyncbtn() {
      let data = {
        userName: this.InfoData.userName,
        shopid: "",
        Heaven: this.timeList[this.timeIndex].value,
        ShippingStat: this.orderList[this.orderIndex].value,
      };
      // shopid
      let storeSelect = document.querySelector(".storeSelect").children;
      for (let i = 0; i < storeSelect.length; i++) {
        if (storeSelect[i].selected) {
          data.shopid = Number(storeSelect[i].value);
        }
      }
      //  提示
      if (this.orderIndex == 0) {
        this.$message({
          message: "请选择订单状态",
          center: true,
          duration: 600,
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
      this.syncOrderStatus = false;
      this.$axios({
        url: "/sigaoyi/SynchronizeOrders",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.close();
          if (result.data.Code == 200) {
            this.syncOrderStatus = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.clickSearch(30, 1, true);
          } else {
            this.syncOrderStatus = true;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.syncOrderStatus = true;
          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    // 一键付款
    AllPayment() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        console.log(">>>>>>>>>>>>>>>>>订单页面");
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      if (Number(this.InfoData.balance) < Number(this.freightVal)) {
        let alertText = confirm("余额不足,是否前往充值");
        if (alertText) {
          this.$router.push({ name: "RechargeWidthdraw" });
        }
        return;
      }
      //   if (this.value == "请选择") {
      //     this.value = "";
      //   }
      // 发起请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWpayments",
        method: "POST",
        params: {
          price: this.freightVal,
          userName: this.InfoData.userName,
          userId: this.InfoData.id,
          ClientName: this.value,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          setTimeout(() => {
            loading.close();
          }, 500);
          if (result.data.Code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.freightVal = "0.00";
            this.getOrder(30, 1);
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
          }, 500);
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    // 表格 点击付费
    clickPay(index, row) {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        console.log(">>>>>>>>>>>>>>>>>订单页面");
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      console.log(" row.freight ==>", typeof row.freight);
      if (this.InfoData.balance < Number(row.freight)) {
        let alertText = confirm("余额不足,是否前往充值");
        if (alertText) {
          this.$router.push({ name: "RechargeWidthdraw" });
        }
        return;
      }
      let obj = {
        0: "库存件",
        1: "已订货",
        2: "已发货",
        3: "已完成",
        4: "待填采购价",
        5: "待付采购价",
        6: "待填运费",
        7: "待付运费",
        8: "处理跟进中",
        9: "未入库",
      };
      let data = {
        userId: this.InfoData.id,
        userName: this.InfoData.userName,
        id: row.id,
        status: 99,
        price: row.freight,
      };
      for (const key in obj) {
        if (row.status == obj[key]) {
          data.status = key;
        }
      }
      this.tableLoading = true;
      console.log("data ==>", data);
      this.$axios({
        url: "/sigaoyi/NEWpayment",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          if (result.data.code == "200") {
            row.status = "已完成";
            result.data.userinfo.balance = result.data.userinfo.balance.toFixed(
              2
            );
            this.freightVal = (this.freightVal - row.freight).toFixed(2);
            if (this.freightVal > 0) {
              this.AllFreightStatus = true;
              if (this.InfoData.statu > 2) {
                this.uploadOrderStatus = false;
                this.btnList.forEach((e) => {
                  if (e.name == "同步订单" || e.name == "添加") {
                    e.showStatus = false;
                  }
                });
              } else {
                this.uploadOrderStatus = true;
                this.btnList.forEach((e) => {
                  if (e.name == "同步订单" || e.name == "添加") {
                    e.showStatus = true;
                  }
                });
              }
            } else {
              this.AllFreightStatus = false;
              this.uploadOrderStatus = true;
              this.btnList.forEach((e) => {
                if (e.name == "同步订单" || e.name == "添加") {
                  e.showStatus = true;
                }
              });
            }
            // this.setInfoData(this.InfoData);
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
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    // 导入运费 (废弃)
    uploadFreight(e) {
      let files = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      this.loadingUpdateFile = this.$loading({
        lock: false,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sugoiERP/LogisticsImportFreight",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          this.loadingUpdateFile.close();
          this.$refs.uploadFreight.value = null;
          console.log("result ==>", result);
          if (result.data.ResultMsg == "success") {
            this.clickSearch(this.pageSize, this.currentPage, false);
            this.$notify({
              title: "请求成功",
              message: result.data.message,
              type: "success",
              offset: 50,
            });

            this.getOrder(30, 1);
          } else {
            this.$notify({
              title: "请求失败",
              message: result.data.message,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.loadingUpdateFile.close();
          console.log("err ==>", err);
          this.$refs.uploadFreight.value = null;
          this.$notify({
            title: "请求失败",
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 导入订单 录入时间没有时:分:秒
    updateFile(e) {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        console.log(">>>>>>>>>>>>>>>>>订单页面");
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.statu == "5") {
        alert("没有权限");
        return;
      }
      console.log("e.target.files[0] ==>", e.target.files[0]);
      let files = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      formData.append("userName", this.InfoData.userName);
      this.loadingUpdateFile = this.$loading({
        lock: false,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
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
          this.loadingUpdateFile.close();
          this.$refs.uploadOrder.value = null;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            // this.setInfoData(this.InfoData);
            this.clickSearch(30, 1, true);
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
          this.$refs.uploadOrder.value = null;
          this.loadingUpdateFile.close();
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 查看异常原因
    openCause(index, row) {
      // causeText causeMaskStatus
      this.causeMaskStatus = true;
      row.note = row.note.replace(/--/g, "\n");
      this.causeText = row.note;
    },
    // 点击 标记异常 switch change 事件
    changeAbnormal(index, row) {
      this.abnormalStatus = true;
      this.abnormaldioIndex = index;
      this.abnormaldioRow = row;
      row.collecChecked = false;
      row.note = row.note.replace(/--/g, "\n");
      this.textareaText = row.note;
      console.log("row ==>", row);
    },
    // 异常弹出层 set
    changeAbnormalSet(setIndex) {
      this.abnormalList.forEach((e) => {
        e.checked = false;
      });
      this.abnormalList[setIndex].checked = true;
      this.abnormalListIndex = 0;
      if (this.abnormalList[setIndex].name == "请选择") {
        return;
      }
      this.textareaText += "\n" + this.abnormalList[setIndex].name + "\n";
    },
    // 异常弹出层 取消事件
    closeAbnormal() {
      this.abnormalStatus = false;
      this.tableData[this.abnormaldioIndex].collecChecked = true;
    },
    // 异常弹出层 确定事件  //2021-08-10 09:36:22:测试标记订单异常
    SubmitAbnormal() {
      console.log("标记异常!!!!!!");
      this.textareaText +=
        "\n" +
        timestampToTimes.timestampToTime(new Date()) +
        "：" +
        this.InfoData.userName +
        "标记订单异常" +
        "\n";
      this.$axios({
        url: "/sigaoyi/Markanomaly",
        method: "POST",
        params: {
          abnormalId: this.abnormaldioRow.id,
          note: this.textareaText,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.code == "200") {
            //   事件冲突
            this.abnormalStatus = false;
            this.tableData[this.abnormaldioIndex].collecChecked = false;
            this.tableData[this.abnormaldioIndex].followUp = true;
            // 赋值
            this.tableData[this.abnormaldioIndex].note = this.textareaText;
            console.log(
              "this.tableData[this.abnormaldioIndex] ==>",
              this.tableData[this.abnormaldioIndex]
            );
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
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 点击表格处理 按钮
    clickFollowUp(index, row) {
      // 林天长 任治琴 李健明 王杰 hzsugoi
      if (
        this.InfoDataObj.statu == "0" ||
        this.InfoDataObj.userName == "林天长" ||
        this.InfoDataObj.userName == "任治琴" ||
        this.InfoDataObj.userName == "李健明" ||
        this.InfoDataObj.userName == "王杰" ||
        this.InfoDataObj.userName == "hzsugoi" ||
        this.InfoData.statu == "5"
      ) {
        this.FollowUpRow = row;
        this.FollowUpIndex = index;
        this.FollowUpStatus = true;
        //
        this.orderStatusIndex = 0;
        this.FollowUpListIndex = 0;
        this.followList.orderId = row.id;
        this.followList.freight = row.freight;
        row.note = row.note.replace(/--/g, "\n");
        this.FollowUpNote = row.note;
        console.log("this.FollowUpNote ==>", this.FollowUpNote);
      } else {
        // 点击 跟进 弹出层
        this.FollowUpTan = 0;

        this.FollowUp1Status = true;
        row.note = row.note.replace(/--/g, "\n");
        this.FollowUp1Note = row.note;
        this.FollowUp1Row = row;
        this.FollowUp1Index1 = index;
        this.FollowUp1Index = 0;
        console.log("this.FollowUp1Row ==>", this.FollowUp1Row);
      }
    },
    // 点击表格处理按钮 第一个set change事件
    changeOrderStatus(array, setIndex) {
      array.forEach((e) => {
        e.checked = false;
      });
      array[setIndex].checked = true;
      console.log("array ==>", array);
    },
    // 点击表格处理按钮 第二个set change事件
    changeFollowUp(setIndex) {
      this.FollowUplList.forEach((e) => {
        e.checked = false;
      });
      this.FollowUplList[setIndex].checked = true;
      if (this.FollowUplList[setIndex].name == "请选择") {
        return;
      }
      this.FollowUpNote += "\n" + this.FollowUplList[setIndex].name + "\n";
    },
    // 点击表格处理 按钮弹出层 确定按钮
    clickFollowUpStatus() {
      let data = {
        chuliID: this.followList.orderId,
        chulicollectionStatus: Number,
        chulinote: this.FollowUpNote,
        chulifreight: this.followList.freight,
      };
      this.orderStatusData.forEach((e) => {
        if (e.checked) {
          data.chulicollectionStatus = e.value;
        }
      });
      //  处理异常订单 && 已完成
      if (data.chulicollectionStatus == 1) {
        data.chulinote +=
          "\n" +
          timestampToTimes.timestampToTime(new Date()) +
          "：" +
          this.InfoData.userName +
          "处理异常订单" +
          "\n";
      }
      this.$axios({
        url: "/sigaoyi/chuliAnomaly",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.code == "200") {
            console.log(
              "data.chulicollectionStatus ==>",
              data.chulicollectionStatus
            );
            if (data.chulicollectionStatus == 1) {
              this.FollowUpStatus = false;
              this.tableData[this.FollowUpIndex].collecChecked = false;
              this.tableData[this.FollowUpIndex].followUp = true;
              this.tableData[this.FollowUpIndex].note = data.chulinote;
              console.log(
                "this.tableData[this.FollowUpIndex] ==>",
                this.tableData[this.FollowUpIndex]
              );
            } else {
              // 已完成
              this.FollowUpStatus = false;
              this.tableData[this.FollowUpIndex].collecChecked = true;
              this.tableData[this.FollowUpIndex].followUp = false;
              this.tableData[this.FollowUpIndex].note = this.FollowUpNote;
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
          console.log("err ==>", err);
          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 跟进 第一个 set
    changeFollowUp1(array, setIndex) {
      array.forEach((e) => {
        e.checked = false;
      });
      array[setIndex].checked = true;
      if (array[setIndex].name == "请选择") {
        return;
      }
      this.FollowUp1Note += "\n" + array[setIndex].name + "\n";
    },
    // 跟进/申诉 弹出层 确定 按钮
    clickFollowUp1Status() {
      if (this.FollowUpTan == 0) {
        var data = {
          abnormalId: this.FollowUp1Row.id,
          note:
            this.FollowUp1Note +
            "\n" +
            timestampToTimes.timestampToTime(new Date()) +
            "：" +
            this.InfoData.userName +
            "跟进异常订单" +
            "\n",
        };
      } else {
        var data = {
          abnormalId: this.appealRow.id,
          note:
            this.FollowUp1Note +
            "\n" +
            timestampToTimes.timestampToTime(new Date()) +
            "：" +
            this.InfoData.userName +
            "标记订单异常" +
            "\n",
        };
      }
      this.$axios({
        url: "/sigaoyi/Markanomaly",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.code == "200") {
            this.FollowUp1Status = false;
            if (this.FollowUpTan == 1) {
              this.tableData[this.appealIndex].collecChecked = false;
              this.tableData[this.appealIndex].followUp = true;
              this.tableData[this.appealIndex].note = data.note;
            } else {
              console.log(
                "this.tableData[this.FollowUp1Index1] ==>",
                this.tableData[this.FollowUp1Index1]
              );
              this.tableData[this.FollowUp1Index1].note = data.note;
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
          console.log("err ==>", err);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 点击表格 申诉 按钮
    appeal(index, row) {
      // 点击 申诉 弹出层
      this.FollowUpTan = 1;
      this.FollowUp1Status = true;
      row.note = row.note.replace(/--/g, "\n");
      this.FollowUp1Note = row.note;
      this.FollowUp1Index = 0;
      this.appealRow = row;
      this.appealIndex = index;
    },
    // 获取订单
    getOrder(amount, pages) {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登录");
        this.$router.push({ name: "Login" });
        console.log(">>>>>>>>>>>>>>>>>订单页面");
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆时间过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      console.log("进入获取订单了!!!!");
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWtoLogistics",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          amount: amount,
          pages: pages,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          loading.close();
          if (result.data.Code == 200) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            //   用户名
            this.userNameList = result.data.logisticsNames;
            // 表格
            this.freightVal = result.data.freight.toFixed(2);
            // console.log("Number(this.freightVal) ==>",Number(this.freightVal) > 0)
            // 分页 内容
            this.profit = result.data.profit;
            // 已欠运费
            if (Number(this.freightVal) > 0) {
              this.AllFreightStatus = true;
              if (this.InfoData.statu > 2) {
                this.uploadOrderStatus = false;
                this.btnList.forEach((e) => {
                  if (e.name == "同步订单" || e.name == "添加订单") {
                    e.showStatus = false;
                  }
                });
                //  >2 公司名字 + 级别5
                if (
                  this.InfoData.company == "和美国际旅行社有限公司" ||
                  this.InfoData.company == "杭州思高易" ||
                  this.InfoData.statu == "5"
                ) {
                  this.uploadOrderStatus = true;
                  this.btnList.forEach((e) => {
                    if (e.name == "同步订单" || e.name == "添加订单") {
                      e.showStatus = true;
                    }
                  });
                }
                // 沈永鑫
                if (
                  this.InfoData.userName == "沈永鑫" &&
                  result.data.billingPeriodFreight <= 0
                ) {
                  this.uploadOrderStatus = true;
                  this.btnList.forEach((e) => {
                    if (e.name == "同步订单" || e.name == "添加订单") {
                      e.showStatus = true;
                    }
                  });
                }
                //  朴学峰
                if (
                  this.InfoData.userName == "朴学峰" &&
                  Number(this.freightVal) < 5000
                ) {
                  this.uploadOrderStatus = true;
                  this.btnList.forEach((e) => {
                    if (e.name == "同步订单" || e.name == "添加订单") {
                      e.showStatus = true;
                    }
                  });
                }
              } else {
                // 用户等级 0 1
                this.uploadOrderStatus = true;
                this.btnList.forEach((e) => {
                  if (e.name == "同步订单" || e.name == "添加订单") {
                    e.showStatus = true;
                  }
                });
              }
            } else {
              // 不欠运费
              this.AllFreightStatus = false;
              this.uploadOrderStatus = true;
              this.btnList.forEach((e) => {
                if (e.name == "同步订单" || e.name == "添加订单") {
                  e.showStatus = true;
                }
              });
            }
            // 用户级别 5
            if (this.InfoData.statu == "5") {
              this.uploadOrderStatus = false;
              this.btnList.forEach((e) => {
                e.showStatus = false;
                if (e.name == "导出表格-青岛") {
                  e.showStatus = true;
                }
              });
            }
            // 表格数据
            if (result.data.logisticss.length == 0) {
              this.$notify({
                title: "请求成功",
                message: "该账号没有订单",
                type: "success",
                offset: 50,
              });
              this.tableData = result.data.logisticss;
              this.total = result.data.page.total;
              return;
            }
            let obj = {
              0: "库存件",
              1: "已订货",
              2: "已发货",
              3: "已完成",
              4: "待填采购价",
              5: "待付采购价",
              6: "待填运费",
              7: "待付运费",
              8: "处理跟进中",
              9: "未入库",
            };
            result.data.logisticss.forEach((e) => {
              if (e.image == "") {
                e.image =
                  "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
              } else {
                e["image1"] = e.image.split(",")[0];
              }
              if (e.platformorder == "null") {
                e.platformorder = "";
              }
              if (e.purchaseMode == 0) {
                e.purchaseMode = "自采购";
              } else {
                e.purchaseMode = "待采购";
              }
              // 国际单号
              if (e.order_id == "null") {
                e.order_id = "";
              }
              // 国内单号
              if (e.orderId == "null") {
                e.orderId = "";
              }
              for (const key in obj) {
                if (e.status == key) {
                  e.status = obj[key];
                }
              }
              // 运费
              if (e.freight != 0) {
                e.freight = e.freight.toFixed(2);
              }
              // 采购价
              if (e.purchasePrice != 0) {
                e.purchasePrice = e.purchasePrice.toFixed(2);
              }
              // 异常 异常按钮 显示
              if (e.collectionStatus == 1) {
                e["collecChecked"] = false;
                e["followUp"] = true;
              } else {
                e["collecChecked"] = true;
                e["followUp"] = false;
              }

              // 不是管理员不能标记异常
              if (result.data.userinfo.statu != "0") {
                e["collecStatuChecked"] = true;
                if (
                  result.data.userinfo.userName == "林天长" ||
                  result.data.userinfo.userName == "任治琴" ||
                  result.data.userinfo.userName == "李健明" ||
                  result.data.userinfo.userName == "王杰" ||
                  result.data.userinfo.userName == "hzsugoi" ||
                  this.InfoData.statu == "5"
                ) {
                  e["collecStatuChecked"] = false;
                }
              }
            });
            // 判断那些人在这页面是管理员
            // this.getInitial();
            // 设置表格 页数 总数 等
            this.total = result.data.page.total;
            this.tableData = result.data.logisticss;
            this.tableData.forEach((e) => {
              e["image1"] = e.image.split(",")[0];
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
          //   this.loadingUpdateFile.close();
          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    ...homeActions(["setWstateStatus", "setInfoData"]),
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          console.log("val ==>", val);
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>

<style>
</style>