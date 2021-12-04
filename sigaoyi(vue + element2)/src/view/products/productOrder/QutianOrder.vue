<template>
  <div class="qutianOrder">
    <div class="v-qutianOrder">
      <!-- 搜索 -->
      <div class="search">
        <!-- 1 -->
        <div class="search_one">
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
          <div class="set">
            <span class="text">购物车号码：</span>
            <input type="text" v-model="shoppingPhone" placeholder="请输入" />
          </div>
          <div v-show="isPutaway">
            <span class="text">订单状态：</span>
            <el-select v-model="transportState" clearable placeholder="请选择">
              <el-option
                v-for="item in transportList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="set">
            <span class="text">订购号：</span>
            <input
              type="text"
              v-model="orderNumber"
              clearable
              placeholder="请输入"
            />
          </div>
          <div v-show="!isPutaway" class="one_btn">
            <el-button size="medium" @click="resetSearchVal()">重 置</el-button>
            <el-button size="medium" type="primary" @click="getTableList()"
              >查 询</el-button
            >
            <span class="text" @click="putaway()">
              收起
              <i :class="iconSrc"></i>
            </span>
          </div>
        </div>
        <!-- 2 -->
        <div v-show="isPutaway" class="search_two">
          <div class="set">
            <span class="text">运单号：</span>
            <input
              type="text"
              v-model="WaybillNumber"
              clearable
              placeholder="请输入"
            />
          </div>
          <div>
            <span class="text">未处理留言：</span>
            <el-select
              v-model="unhandledMsgIndex"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in unhandledMsgList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">时间条件：</span>
            <el-select v-model="placeIndex" placeholder="请选择">
              <el-option
                v-for="item in placeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="startEndTime">
            <span class="text"></span>
            <!-- <el-date-picker
              v-model="scheduleDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker> -->
            <el-date-picker
              v-model="startEndDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
        <!-- 3 -->
        <div v-show="isPutaway" class="search_three">
          <div>
            <span class="text">运送延期：</span>
            <el-select
              v-model="deliveryDateIndex"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in deliveryDateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="three_btn">
            <el-button size="medium" @click="resetSearchVal()">重置</el-button>
            <el-button size="medium" type="primary" @click="getTableList()"
              >查询</el-button
            >
            <span class="text" @click="putaway()">
              收起
              <i :class="iconSrc"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 进入总览 -->
      <div class="todayView">
        <div class="view_text">今日总览</div>
        <div class="view_data">
          <div>
            <span>订单数</span>
            <span>0单</span>
          </div>
          <div>
            <span>买家付款总额(JPY)</span>
            <span>0</span>
          </div>
          <div>
            <span>销售总额(JPY)</span>
            <span>0</span>
          </div>
          <div>
            <span>结算总额(JPY)</span>
            <span>0</span>
          </div>
        </div>
      </div>
      <!-- 筛选 + table -->
      <div class="screen_table">
        <div class="screen">
          <div class="screen_set">
            <div
              v-for="(item, index) in screenList"
              :key="index"
              @click="clickScreen(item, index)"
            >
              <el-badge :value="item.bage" v-if="item.bage > 0">
                <span :class="item.isActive ? 'active' : ''">{{
                  item.name
                }}</span>
              </el-badge>
              <span v-else :class="item.isActive ? 'active' : ''">{{
                item.name
              }}</span>
            </div>
          </div>
          <div class="screen_btn">
            <el-button
              type="primary"
              size="medium"
              @click="synchrOrder.state = true"
              >同步订单</el-button
            >
            <el-button type="default" size="medium" @click="printSheet()"
              >打印面单</el-button
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
            <span class="relaod" @click="getTableList()">
              <i class="el-icon-refresh-right"></i>
            </span>
          </div>
        </div>
        <div class="qutian_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            style="width: 100%"
            maxHeight="1000px"
            v-loading="tableLoading"
          >
            <template slot="empty">
              <span class="iconfont icon-zanwushuju"></span>
              <div>暂无数据</div>
            </template>
            <el-table-column
              type="selection"
              width="50"
              align="center"
            ></el-table-column>
            <el-table-column width="260" label="订购详情">
              <template slot-scope="scope">
                <div class="orderDetails">
                  <div>
                    <span>店铺：</span>
                    <span>{{ scope.row.sellerID }}</span>
                  </div>
                  <div>
                    <span>订购车号：</span>
                    <span>{{ scope.row.packNo }}</span>
                  </div>
                  <div>
                    <span>订购号：</span>
                    <span>{{ scope.row.orderNo }}</span>
                  </div>
                  <div>
                    <span>买家：</span>
                    <span>{{ scope.row.buyer }}</span>
                  </div>
                  <div>
                    <span>Email：</span>
                    <span>{{ scope.row.buyerEmail }}</span>
                  </div>
                  <div>
                    <span>买家电话：</span>
                    <span>{{ scope.row.buyerTel }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="400" label="订购明细">
              <template slot-scope="scope">
                <div class="purchaseDetails">
                  <div class="product" @click="toProduct(scope.row.itemCode)">
                    <i @click.stop>{{ scope.row.itemCode }}</i
                    >{{ scope.row.itemTitle }}
                    <span
                      @click.stop="toMyproduct(scope.row)"
                      :class="scope.row.sellerItemCode == null ? 'active' : ''"
                      >{{ scope.row.sellerItemCode }}</span
                    >
                  </div>
                  <div>
                    <span>订购数：</span>
                    <span>{{ scope.row.orderQty }}</span>
                  </div>
                  <div>
                    <span>选项信息：</span>
                    <span>{{ scope.row.option }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="发货信息">
              <template slot-scope="scope">
                <div class="shoppingInfo">
                  <div>
                    <span>国家或地区：</span>
                    <span>{{ scope.row.shippingCountry }}</span>
                  </div>
                  <div>
                    <span>预定发货日：</span>
                    <span>{{ scope.row.hopeDate }}</span>
                  </div>
                  <div>
                    <span>发货平台：</span>
                    <span>{{ scope.row.deliveryCompany }}</span>
                  </div>
                  <div>
                    <span>运单号：</span>
                    <span></span>
                  </div>
                  <el-popover
                    placement="top"
                    width="400"
                    trigger="click"
                    popper-class="addressDevelopTip"
                  >
                    <div class="content">
                      <div class="title">收件人信息</div>
                      <div class="v-content">
                        <el-table
                          border
                          :span-method="arraySpanMethod"
                          :data="addressList"
                        >
                          <el-table-column property="typeName" label="类型">
                          </el-table-column>
                          <el-table-column label="姓名">
                            <template slot-scope="scope" class="type">
                              <div>
                                {{ scope.row.two }}
                                <!-- <i
                                  class="el-icon-document-copy"
                                  id="copyAdress1"
                                  @click="copyAdress()"
                                  @mouseenter="copyAdress()"
                                  :data-clipboard-text="scope.row.two"
                                ></i> -->
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            property="three"
                            label="收件人国家"
                          ></el-table-column>
                          <el-table-column
                            property="four"
                            label="国家"
                          ></el-table-column>
                          <el-table-column
                            property="five"
                            label="邮编"
                          ></el-table-column>
                          <el-table-column
                            property="six"
                            label="邮编码"
                          ></el-table-column>
                        </el-table>
                      </div>
                    </div>
                    <el-button type="text" slot="reference"
                      >收件人信息</el-button
                    >
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="采购单"></el-table-column>
            <el-table-column
              prop="shippingStatus1"
              label="订单状态"
            ></el-table-column>
            <el-table-column
              prop="orderDate"
              label="下单日期"
            ></el-table-column>
            <el-table-column width="180" label="订购金额">
              <template slot-scope="scope">
                <div class="purchaseMoney">
                  <div>
                    <span>交易总额：</span>
                    <span>{{ scope.row.total }}&nbsp;JPY</span>
                  </div>
                  <div>
                    <span>销售价格：</span>
                    <span>{{ scope.row.orderPrice }}&nbsp;JPY</span>
                  </div>
                  <div>
                    <span>折扣金额：</span>
                    <span>{{ scope.row.discount }}&nbsp;JPY</span>
                  </div>
                  <div>
                    <span>结算金额：</span>
                    <span>{{ scope.row.settlePrice }}&nbsp;JPY</span>
                  </div>
                  <div>
                    <span>运输费用：</span>
                    <span>{{ scope.row.shippingRate }}&nbsp;JPY</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <div class="table_btn">
                  <div v-if="scope.row.shippingStatus1 == '新订购'">
                    <el-button type="text">发货预定日</el-button>
                  </div>
                  <div v-if="scope.row.shippingStatus1 == '等待发货'">
                    <el-button
                      type="text"
                      @click="TobackOrder(scope.index, scope.row)"
                      >回填单号</el-button
                    >
                  </div>
                  <div
                    v-if="
                      scope.row.shippingStatus1 == '新订购' ||
                      scope.row.shippingStatus1 == '等待发货'
                    "
                  >
                    <el-button type="text">取消订单</el-button>
                  </div>
                  <div v-if="scope.row.shippingStatus1 == '新订购'">
                    <el-button type="text" @click="tostbao(scope.row)"
                      >去采购</el-button
                    >
                  </div>
                  <!-- <div>
                    <el-button
                      type="text"
                      @click="toShip(scope.row, scope.index)"
                      >去发货</el-button
                    >
                  </div> -->
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
            :pager-count="11"
            :current-page="currentPage"
            :page-sizes="[30, 50, 100]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
          <!-- <el-pagination layout="slot" class="totalDom">
              <span>总采购金额：{{ profit.totalPurchasePrice }}</span>
              <span>总运费：{{ profit.totalFreight }}</span>
              <span>总销售金额：{{ profit.totalPrice }}</span>
              <span>总利润：{{ profit.totalprofit }}</span>
            </el-pagination> -->
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
      <!-- 同步订单 -->
      <el-dialog
        title="同步订单"
        :visible.sync="synchrOrder.state"
        custom-class="synchrOrderMask"
        width="30%"
      >
        <div>
          <span class="text">选择店铺：</span>
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
        <div>
          <span class="text">订单状态：</span>
          <el-select v-model="transportState" clearable placeholder="请选择">
            <el-option
              v-for="item in transportList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="text">时间条件：</span>
          <el-select v-model="placeIndex" placeholder="请选择">
            <el-option
              v-for="item in placeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="selectTime">
          <span class="text">选择时间：</span>
          <el-date-picker
            v-model="startEndDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="synchroCfirm()"
            >确 定</el-button
          >
          <el-button size="medium" @click="synchrOrder.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 运送预定日 -->
      <el-dialog
        title="运送预定日输入"
        :visible.sync="scheduled.state"
        custom-class="scheduledMsk"
        width="27%"
      >
        <div class="tips">
          <i class="el-icon-info"></i>
          <el-tag type="warning"
            >发货预定日是在预定日前通知买家进行运送。请注意运送预定日仅限输入一次，后无法修改。</el-tag
          >
        </div>
        <div class="deliver">
          <span class="text">发货预定日：</span>
          <el-date-picker
            v-model="scheduled.time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="deliver">
          <span class="text">发货延期理由：</span>
          <el-select v-model="scheduled.index" placeholder="请选择">
            <el-option
              v-for="item in scheduled.List"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="remask">
          <span class="text">备注：</span>
          <textarea v-model="scheduled.noteVal" cols="40" rows="4"></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="medium"
            type="primary"
            @click="scheduled.state = false"
            >确 定</el-button
          >
          <el-button size="medium" @click="scheduled.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 申请转运 -->
      <el-dialog
        title="添加运单"
        :visible.sync="apply.state"
        custom-class="applyMsk"
        width="47%"
      >
        <div class="createInfo">
          <div>
            <span>发货方式：</span>
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
            <span>物流渠道：</span>
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
        <el-divider content-position="left">海外收信息</el-divider>
        <form action="">
          <div class="overseas">
            <div>
              <span>收件人：</span>
              <input
                type="text"
                placeholder="海外收件人"
                v-model="apply.addressee"
              />
            </div>
            <div>
              <span>联系电话：</span>
              <input
                type="text"
                id="address"
                placeholder="海外联系电话"
                v-model="apply.phone"
              />
            </div>
            <div>
              <span>邮编：</span>
              <input
                type="text"
                id="address"
                placeholder="海外邮编"
                v-model="apply.email"
              />
            </div>
          </div>
          <div class="detailAdress">
            <span>详情地址：</span>
            <input
              type="text"
              id="address"
              placeholder="海外收件人详情地址信息"
              v-model="apply.detailAdress"
            />
          </div>
        </form>
        <el-divider content-position="left">转运信息</el-divider>
        <div class="AddomesticList">
          <div
            class="lists"
            v-for="(item, index) in apply.addomesticList"
            :key="index"
          >
            <div>
              <span>国内物流：</span>
              <el-select
                v-model="item.domesticIndex"
                clearable
                placeholder="请选择国内转运公司"
              >
                <el-option
                  v-for="item in apply.domesticList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span>转运单号：</span>
              <input
                type="text"
                placeholder="请填写转运单号"
                v-model="item.trackNumber"
              />
              <span class="deleteList" @click="removeList(index)">
                <i class="el-icon-remove-outline"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="Addomestic" @click="addList()">
          <i class="el-icon-plus"></i>
          <span> 同一客户购买多个商品有多个国内快递，点这里添加转运单</span>
        </div>
        <el-divider content-position="left">转运商品</el-divider>
        <el-tag type="warning" v-show="apply.warningProduct">
          请准确填写商品名称、规格。不准确的商品信息导致错发、延时等后果，由客户自行承担。
          <i class="el-icon-close" @click="apply.warningProduct = false"></i>
        </el-tag>
        <div class="product" v-show="apply.productList.length > 0">
          <div
            class="productInfo"
            v-for="(item, index) in apply.productList"
            :key="index"
          >
            <div class="name">
              <div>
                <span>商品名称：</span>
                <input
                  type="text"
                  placeholder="请输入商品中文名称"
                  v-model="item.tradeName"
                />
              </div>
              <div>
                <span>英文名称：</span>
                <input
                  type="text"
                  placeholder="请输入商品英文名称"
                  v-model="item.englishName"
                />
              </div>
            </div>
            <div class="weight_count">
              <div>
                <span>商品重量：</span>
                <input
                  type="text"
                  placeholder="请输入商品重量"
                  v-model="item.weight"
                />
              </div>
              <div>
                <span>商品数量：</span>
                <input
                  type="text"
                  placeholder="请输入商品数量"
                  v-model="item.quantity"
                />
              </div>
            </div>
            <div class="img">
              <div class="v-img">
                <span>商品图片：</span>
                <div>
                  <img
                    v-show="item.imgSrc != ''"
                    :src="item.imgSrc"
                    alt="加载失败"
                  />
                  <i class="el-icon-plus"></i>
                </div>
              </div>
              <div class="note">
                <span>备注：</span>
                <textarea
                  placeholder="请输入"
                  v-model="item.note"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div class="deleteProcut" @click="removeProductList(index)">
              <i class="el-icon-delete-solid"></i>
            </div>
          </div>
        </div>
        <div class="AddProduct" @click="addProductList()">
          <i class="el-icon-plus"></i>
          <span> 同一个客户购买多个商品，点这里添加商品信息</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="apply.state = false"
            >确 定</el-button
          >
          <el-button size="medium" @click="apply.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 批量发货 -->
      <el-dialog
        title="发货"
        :visible.sync="deliveryAll.state"
        custom-class="deliveryMsk"
        width="27%"
      >
        <div>
          <span>运送公司：</span>
          <input
            type="text"
            placeholder="海外收件人详情地址信息"
            v-model="deliveryAll.company"
          />
        </div>
        <div>
          <span>运送单号：</span>
          <input
            type="text"
            placeholder="海外收件人详情地址信息"
            v-model="deliveryAll.orderNumber"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="medium"
            type="primary"
            @click="deliveryAll.state = false"
            >确 定</el-button
          >
          <el-button size="medium" @click="deliveryAll.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 回填单号 -->
      <el-dialog
        title="回填单号"
        :visible.sync="backOrder.state"
        custom-class="backOrderMask"
        width="30%"
      >
        <div class="content" v-loading="backOrder.loading">
          <div>
            <span class="text">中国发货：</span>
            <el-select
              v-model="backOrder.listIndex"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in backOrder.list"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">国际单号：</span>
            <input
              type="text"
              placeholder="请输入"
              v-model="backOrder.orderNo"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="comfirmBackOrder()"
            >确 定</el-button
          >
          <el-button size="medium" @click="backOrder.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 去采购 -->
      <el-dialog
        title="添加采购单"
        :visible.sync="purchaseOrder.state"
        custom-class="purchaseMask"
        width="35%"
      >
        <div class="content" v-loading="purchaseOrder.loading">
          <div>
            <span class="text">采购链接：</span>
            <input
              type="text"
              placeholder="请输入"
              v-model="purchaseOrder.link"
            />
          </div>
          <div>
            <span class="text">采购数量：</span>
            <input
              type="text"
              placeholder="请输入"
              v-model="purchaseOrder.count"
            />
          </div>
          <div>
            <span class="text">采购价格：</span>
            <input
              type="text"
              placeholder="请输入"
              v-model="purchaseOrder.price"
            />
          </div>
          <div>
            <span class="text">属性选项：</span>
            <input
              type="text"
              placeholder="请输入"
              v-model="purchaseOrder.attribute"
            />
          </div>
          <div class="remark">
            <span class="text">备注：</span>
            <textarea
              v-model="purchaseOrder.remark"
              cols="40"
              rows="4"
              placeholder="请输入"
            ></textarea>
          </div>
          <div class="file">
            <span class="text">图片：</span>
            <div class="v-file">
              <input type="file" tilte="点击上传图片" accept="image/*" />
              <i
                v-if="purchaseOrder.rechargeImg == ''"
                class="el-icon-plus"
              ></i>
              <img v-else :src="purchaseOrder.rechargeImg" alt="" />
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="purchaseConfirm()"
            >添 加</el-button
          >
          <el-button size="medium" @click="purchaseOrder.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "../../../assets/less/productOrder/qutianOrder/qutianOrder.less";
import dateFormats from "@/assets/js/dateFormat";
import Clipboard from "clipboard";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // one
      shopIndex: "",
      shopList: [],
      orderNumber: "",
      shoppingPhone: "",
      transportState: "",
      transportList: [
        { label: "订购处理中", value: "1" },
        { label: "新订购", value: "2" },
        { label: "等待发货", value: "3" },
        { label: "运输中", value: "4" },
        { label: "已完成订单", value: "5" },
      ],
      addressList: [
        {
          typeName: "收件人",
          two: "adhkasshdald",
          three: "电话",
          four: "99999",
        },
        {
          typeName: "手机",
          two: "shouji1",
          three: "收件人国家",
          four: "收件人国家111",
          five: "邮编",
          six: "邮编1111",
        },
        {
          typeName: "地址",
          two: "地址9999",
        },
      ],
      //   two
      WaybillNumber: "",
      placeIndex: 1,
      placeList: [
        { name: "订购日期", value: 1 },
        { name: "结算完成日期", value: 2 },
        { name: "预发货日期", value: 3 },
        { name: "交易完成日期", value: 4 },
      ],
      startEndDate: "",
      unhandledMsgList: [
        { label: "有", value: 0 },
        { label: "没有", value: 1 },
      ],
      unhandledMsgIndex: "",
      deliveryDateList: [
        { label: "是", value: 0 },
        { label: "否", value: 1 },
      ],
      deliveryDateIndex: "",
      // 收起iconSrc
      isPutaway: true,
      iconSrc: "el-icon-arrow-up",
      // 筛选
      screenList: [
        { name: "全部", isActive: true, bage: "", value: "0" },
        {
          name: "订购处理中",
          isActive: false,
          bage: "",
          value: "Awaiting shipping(1)",
        },
        { name: "新订购", isActive: false, bage: "", value: "On request(2)" },
        {
          name: "等待发货",
          isActive: false,
          bage: "",
          value: "Seller confirm(3)",
        },
        { name: "运输中", isActive: false, bage: "", value: "On delivery(4)" },
        {
          name: "已完成订单",
          isActive: false,
          bage: "",
          value: "Delivered(5)",
        },
        // { name: "运送延期", isActive: false, bage: "", value: "" },
      ],
      batchIndex: "",
      batchVal: "批量操作",
      batchList: [
        { label: "运送预定日", value: 0 },
        { label: "申请转运", value: 1 },
        { label: "批量发货", value: 2 },
        { label: "更新送货", value: 3 },
        { label: "取消订单", value: 4 },
      ],
      // 弹窗 状态
      //   同步订单
      synchrOrder: {
        state: false,
      },
      // 运送预定日
      scheduled: {
        state: false,
        time: "",
        index: 0,
        List: [
          { label: "商家准备中", value: 0 },
          { label: "订购制作", value: 1 },
          { label: "客户要求", value: 2 },
          { label: "其他", value: 3 },
        ],
        noteVal: "",
      },
      // 申请转运
      apply: {
        state: false,
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
        domesticList: [
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
        trackNumber: "",
        detailAdress: "",
        // warning
        warningProduct: true,
        // 商品信息
        productList: [],
      },
      // 添加采购单
      purchaseOrder: {
        loading: false,
        state: false,
        link: "",
        attribute: "",
        price: "",
        count: 1,
        orderNumber: "",
        remark: "",
        rechargeImg: "",
      },
      // 添加采购单  row
      purchaseRow: {},
      // 回填单号
      backOrder: {
        state: false,
        loading: false,
        orderNo: "",
        listIndex: "",
        list: [
          { name: "佐川急便(海外)", value: "佐川急便(海外)" },
          { name: "ネコポス(海外)", value: "ネコポス(海外)" },
          {
            name: "Chinapost registered airmail",
            value: "Chinapost registered airmail",
          },
          { name: "BANRI Express", value: "BANRI Express" },
          { name: "YDH Express", value: "YDH Express" },
          { name: "ゆうパケット(海外)", value: "ゆうパケット(海外)" },
          { name: "ヤマト宅急便 (海外)", value: "ヤマト宅急便 (海外)" },
          { name: "SDM Express", value: "SDM Express" },
          { name: "佐川グローバル", value: "佐川グローバル" },
          { name: "EMS", value: "EMS" },
          { name: "OCS", value: "OCS" },
          { name: "Fedex", value: "Fedex" },
          { name: "UPS", value: "UPS" },
          { name: "DHL", value: "DHL" },
        ],
      },
      // 回填单号  row
      backOrderRow: {},
      // 批量发货
      deliveryAll: {
        state: false,
        company: "",
      },
      //   表格
      tableData: [],
      tableLoading: false,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.path == "/logistics/orderDetail" ||
      from.path == "/shop/authorization" ||
      from.path == "/logistics/logisticsOrder"
    ) {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    document.title = "趣天店铺订单";
    console.log("this.$route.meta.isBack ==>", this.$route.meta.isBack);
    this.shopList = this.shopData;
    if (!this.$route.meta.isBack) {
      // 重置 筛选 数据 + 分页
      this.resetData();
      // 重置 搜索 数据
      this.resetSearchVal();
      // 店铺赋值
      this.tableData = [];
      this.getTableList();
    } else {
      this.$route.meta.isBack = false;
    }
  },
  created() {
    document.title = "趣天店铺订单";
  },
  computed: {
    ...homeState(["InfoData", "shopData"]),
  },
  methods: {
    // 重置 筛选 数据 + 分页
    resetData() {
      this.screenList.forEach((e) => {
        e.isActive = false;
        if (e.name == "全部") {
          e.isActive = true;
        }
      });
      // 当前页
      this.currentPage = 1;
      //   每一页多少条
      this.pageSize = 30;
      //   total
      this.total = 0;
    },
    // 重置 搜索 数据
    resetSearchVal() {
      this.shopIndex = "";
      this.orderNumber = "";
      this.shoppingPhone = "";
      this.transportState = "";
      this.WaybillNumber = "";
      this.placeIndex = 1;
    },
    // 点击收起
    putaway() {
      if (this.iconSrc == "el-icon-arrow-up") {
        this.iconSrc = "el-icon-arrow-down";
        this.isPutaway = false;
      } else {
        this.iconSrc = "el-icon-arrow-up";
        this.isPutaway = true;
      }
    },
    // 点击筛选
    clickScreen(item, index) {
      this.screenList.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      this.pageSize = 30;
      this.currentPage = 1;
      this.getTableList();
    },
    // 批量操作
    changeBatch() {
      this.batchIndex = this.batchVal;
      this.batchVal = "批量操作";
      if (this.batchIndex == 0) {
        this.scheduled.state = true;
      } else if (this.batchIndex == 1) {
        this.apply.state = true;
        this.apply.warningProduct = true;
        this.apply.addomesticList = [];
        this.apply.productList = [];
        this.apply.logisticsIndex = "";
      } else if (this.batchIndex == 2) {
        this.deliveryAll.state = true;
      }
    },
    // 打印面单
    printSheet() {},
    // 分页事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableList();
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 添加转运信息
    addList() {
      let obj = { domesticIndex: "", trackNumber: "" };
      this.apply.addomesticList.push(obj);
    },
    // 移除转运信息
    removeList(index) {
      this.apply.addomesticList.splice(index, 1);
    },
    // 添加商品信息
    addProductList() {
      let obj = {
        tradeName: "",
        englishName: "",
        weight: "",
        quantity: "",
        imgSrc: "",
        note: "",
      };
      this.apply.productList.push(obj);
    },
    // 移除商品信息
    removeProductList(index) {
      this.apply.productList.splice(index, 1);
    },
    // 初始 获取tableList + 查询
    getTableList() {
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
        shopid: this.shopIndex,
        userId: this.InfoData.id,
        pages: this.currentPage,
        amount: this.pageSize,
        // 筛选值
        shippingStatus: "",
      };
      if (data.shopid == "") {
        data.shopid = 0;
      }
      // 筛选值
      this.screenList.forEach((e) => {
        if (e.isActive) {
          data.shippingStatus = e.value;
        }
      });
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/SynchronizeQoo10Orders",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.tableData = result.data.qoo10Orders;
            this.tableData.forEach((e) => {
              // 时间处理
              if (e.hopeDate != "") {
                e.hopeDate = dateFormats.dateFormat(e.hopeDate);
              }
              e.orderDate = dateFormats.dateFormat(e.orderDate);
              // 运送状态
              this.screenList.forEach((el) => {
                if (e.shippingStatus == el.value) {
                  e["shippingStatus1"] = el.name;
                }
              });

              // 收件人信息
              this.addressList.forEach((el, index) => {
                if (index == 0) {
                  el.two = e.receiver;
                  el.four = e.receiverTel;
                } else if (index == 1) {
                  el.two = e.receiverMobile;
                  el.four = e.shippingCountry;
                  el.six = e.zipCode;
                } else {
                  el.two = e.shippingAddr;
                }
              });
            });
            // 分页处理
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
            this.total = result.data.page.total;
            // 筛选 全部
            this.screenList.forEach((e) => {
              if (e.name == "全部") {
                e.bage = result.data.page.total;
              }
            });
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log("err ==>", err);
        });
    },
    // 收件人信息 表格处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex == 1) {
          return [1, 3];
        }
      } else if (rowIndex == 2) {
        if (columnIndex == 1) {
          return [1, 6];
        }
      }
    },
    // 跳转q10产品
    toProduct(itemCode) {
      window.open(
        `https://www.qoo10.jp/GMKT.INC/goods/goods.aspx?goodscode=${itemCode}`
      );
    },
    // 跳转本地产品
    toMyproduct(row) {
      let routeData = this.$router.resolve({
        path: "/ProductDetails",
        query: {
          userID: this.InfoData.id,
          id: row.sellerItemCode,
          language: 0,
          shopData: JSON.stringify(this.shopData),
        },
      });
      window.open(routeData.href, "_blank");
    },
    // 回填单号
    TobackOrder(index, row) {
      this.backOrder.state = true;
      this.backOrderRow = row;
    },
    // 回填单号   确定
    comfirmBackOrder() {
      if (this.backOrder.listIndex == "") {
        this.$message({
          message: "请选择发货渠道",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.backOrder.orderNo == "") {
        this.$message({
          message: "请输入国际单号",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      let data = {
        shopid: this.backOrderRow.shopId,
        orderNo: this.backOrderRow.orderNo,
        shippingCorp: this.backOrder.listIndex,
        trackingNo: this.backOrder.orderNo,
      };

      this.backOrder.state = false;

      this.$axios({
        url: "/sigaoyi/BackfillOrderNumber",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.backOrder.state = true;
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
          this.backOrder.state = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "err",
            offset: 50,
          });
        });
    },
    // 去采购
    tostbao(row) {
      this.purchaseRow = row;
      this.purchaseOrder.state = true;
      this.purchaseOrder.attribute = row.option;
      this.purchaseOrder.loading = true;
      this.$axios({
        url: "/sigaoyi/getdetail_url",
        method: "POST",
        params: {
          id: row.sellerItemCode,
          option: row.option,
          itemCode: row.itemCode,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.purchaseOrder.loading = false;
          if (result.data.code == "200") {
            if (result.data.link == undefined) {
              this.purchaseOrder.link = "";
            } else {
              this.purchaseOrder.link = result.data.link;
            }
            this.purchaseOrder.rechargeImg = result.data.img;
            this.purchaseOrder.price = result.data.price;
          }
        })
        .catch((err) => {
          this.purchaseOrder.loading = false;
          console.log("err ==>", err);
        });
    },
    // 去采购 确定
    purchaseConfirm() {
      let data = {
        id: 0,
        qoo10orderID: this.purchaseRow.id,
        logisticsID: 0,
        shopId: this.purchaseRow.shopId,
        shippingOrderNumber: "",
        img: this.purchaseOrder.rechargeImg,
        optionAttributes: this.purchaseOrder.attribute,
        purchaseLink: this.purchaseOrder.link,
        purchaseQuantity: this.purchaseOrder.count,
        addPersonnelId: this.InfoData.id,
        addPersonnel: this.InfoData.userName,
        addTime: "",
        procurementStaffId: 0,
        procurementStaff: "",
        purchaseTime: "",
        purchasePrice: this.purchaseOrder.price,
        status: 0,
        remark: this.purchaseOrder.remark,
      };

      console.log(data);

      this.purchaseOrder.state = false;
      this.$axios({
        url: "/sigaoyi/editPurchaseorderInfo",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.purchaseOrder.state = false;

            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.purchaseOrder.state = true;
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
          this.purchaseOrder.state = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "err",
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
    // 去发货
    toShip(row, index) {
      this.apply.state = true;
      this.apply.warningProduct = true;
      this.apply.addressee = row.receiver;
      this.apply.phone = row.receiverTel;
      this.apply.email = row.receiverMobile;
      this.apply.detailAdress = row.shippingAddr;
      if (this.apply.addomesticList.length < 1) {
        this.addList();
      }
      if (this.apply.productList.length < 1) {
        this.addProductList();
        this.apply.productList[0].quantity = row.orderQty;
      }
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
    // 同步
    synchroCfirm() {
      if (this.shopIndex == "") {
        this.$message({
          message: "请先绑定店铺",
          center: true,
          duration: 1000,
          type: "error",
        });
        return;
      }
      let data = {
        userId: this.InfoData.id,
        shopid: this.shopIndex,
        status: this.transportState,
        search_condition: this.placeIndex,
        search_Sdate: dateFormats.dateFormat(this.startEndDate[0]),
        search_Edate: dateFormats.dateFormat(this.startEndDate[1]),
      };
      // 为 空
      if (data.status == "") {
        data.status = "0";
      }

      console.log("data ==>", data);
      this.tableLoading = true;
      this.synchrOrder.state = false;
      this.$axios({
        url: "/sigaoyi/RenewQoo10Orders",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.synchrOrder.state = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 60,
            });
            this.getTableList();
          } else {
            this.synchrOrder.state = true;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 60,
            });
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          this.synchrOrder.state = true;
          console.log("err ==>", err);
          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请示后再试",
            type: "error",
            offset: 60,
          });
        });
    },
  },
};
</script>

<style>
</style>