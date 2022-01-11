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
            <el-button size="medium" @click="resetSearchVal()">重置</el-button>
            <el-button size="medium" type="primary" @click="getTableList()"
              >搜索</el-button
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
              >搜索</el-button
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
        <!-- <div class="view_text"></div> -->
        <div class="view_data">
          <div>
            <span>订单数</span>
            <span>{{ total }}单</span>
          </div>
          <div>
            <span>买家付款总额(JPY)</span>
            <span>{{ payTotal }}</span>
          </div>
          <div>
            <span>销售总额(JPY)</span>
            <span>{{ salePrice }}</span>
          </div>
          <div>
            <span>结算总额(JPY)</span>
            <span>{{ resultPrice }}</span>
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
            <el-button type="default" size="medium" @click="mergeGoodes()"
              >合并发货</el-button
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
            @select="onTableSelect"
            @select-all="setAll"
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
                          :data="scope.row.addressList"
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
                    <span>运输费：</span>
                    <span>{{ scope.row.shippingRate }}&nbsp;JPY</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <div class="table_btn">
                  <div v-if="scope.row.shippingStatus1 == '新订购'">
                    <div>
                      <el-button
                        type="text"
                        @click="sendDate(scope.index, scope.row)"
                        >发货预定日</el-button
                      >
                    </div>
                    <div>
                      <el-button type="text" @click="tostbao(scope.row)"
                        >去采购</el-button
                      >
                    </div>
                    <div>
                      <el-button
                        type="text"
                        v-if="scope.row.logisticsId == 0"
                        @click="toShip(scope.row, scope.index)"
                        >去发货</el-button
                      >
                      <el-button type="text" v-else>已发货</el-button>
                    </div>
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
                    <el-button
                      type="text"
                      @click="cacelOrder(scope.index, scope.row)"
                      >取消订单</el-button
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="paging clearfix">
          <el-pagination
            class="fl"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total,slot"
            :total="total"
          >
            <span class="blockText">显示</span>
          </el-pagination>
          <el-pagination
            class="fl"
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
            class="fr"
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
      <!-- 添加运单 -->
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
          <el-button size="medium" type="primary" @click="confrimAddOrder()"
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
      <!-- 发货预定日 -->
      <el-dialog
        title="发货预定日"
        :visible.sync="sendDateList.state"
        custom-class="sendDateListMask"
        width="30%"
      >
        <div>
          <span class="text">日期：</span>
          <el-date-picker
            v-model="sendDateList.time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="comfirmcacel()"
            >确 定</el-button
          >
          <el-button size="medium" @click="sendDateList.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
      <!-- 取消订单 -->
      <el-dialog
        title="取消订单"
        :visible.sync="cacelList.state"
        custom-class="cacelMask"
        width="30%"
      >
        <div>
          <span class="text">原因：</span>
          <el-select v-model="cacelList.reasonIndex" placeholder="请选择">
            <el-option
              v-for="item in cacelList.reasonlist"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="text">说明：</span>
          <textarea
            v-model="cacelList.textVal"
            placeholder="请输入"
            cols="30"
            rows="4"
          ></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="comfirmcacel()"
            >确 定</el-button
          >
          <el-button size="medium" @click="cacelList.state = false"
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
        { label: "批量发货", value: 1 },
        { label: "取消订单", value: 2 },
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
      // 去发货
      apply: {
        state: false,
        id: "",
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
        quantity: "",
        purchasePrice: "",
        total: "",
        link: "",
        note: "",
        imgList: [],
      },
      applyRow: {},
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
      // 发货预定日
      sendDateList: {
        state: false,
        time: "",
      },
      // 取消订单
      cacelList: {
        state: false,
        reasonIndex: 0,
        reasonlist: [{ name: "缺货", value: 0 }],
        textVal: "",
      },
      // 批量发货
      deliveryAll: {
        state: false,
        company: "",
      },
      //   表格
      tableData: [],
      tableLoading: false,
      mergeIndex: 0,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      payTotal: 0,
      salePrice: 0,
      resultPrice: 0,
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
      if (this.tableData.length == 0) {
        this.resetData();
        this.resetSearchVal();
        this.getTableList();
      }
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
        this.deliveryAll.state = true;
      }
    },
    //   是否选中的状态值
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;

      this.tableData.forEach((e) => {
        e["selected"] = false;
      });
      rows.forEach((e) => {
        e["selected"] = true;
      });

      // 点击合并按钮 的 勾选的订单数量
      this.mergeIndex = rows.length;
    },
    // 全选状态值
    setAll(selection) {
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
    // 打印面单
    printSheet() {
      var ids = "";
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].selected) {
            if (this.tableData[i].shippingStatus == "Awaiting shipping(1)") {
              this.$message({
                message: "勾选的选项含有订购处理中的订单",
                center: true,
                duration: 2000,
                type: "error",
              });
              return;
            } else {
              ids += this.tableData[i].id + ",";
            }
          }
        }
      } else {
        this.$message({
          message: "请勾选要打印的订单",
          center: true,
          duration: 800,
          type: "error",
        });
        return;
      }
      ids = ids.substring(0, ids.length - 1);
      window.open(`http://www.ec-sigaoyi.com/sigaoyi/printlabel2?ids=${ids}`);
    },
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
              e["addressList"] = [
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
              ];
              e.addressList.forEach((el, index) => {
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

            this.payTotal = result.data.total;
            this.salePrice = result.data.SettlePrice;
            this.resultPrice = result.data.orderPrice;
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
    // 发货预定日
    sendDate(index, row) {
      this.sendDateList.state = true;
    },
    // 回填单号
    TobackOrder(index, row) {
      this.backOrder.state = true;
      this.backOrder.orderNo = "";
      this.backOrder.listIndex = "";
      this.backOrderRow = row;

      this.$axios({
        url: "/sigaoyi/GetOrderNumber",
        method: "POST",
        params: {
          id: row.logisticsId,
        },
      })
        .then((result) => {
          if (result.data.Code == "200") {
            this.backOrder.orderNo = result.data.orderNum;
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
        });
    },
    // 回填单号  确定按钮
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
    // 取消订单
    cacelOrder(index, row) {
      this.cacelList.state = true;
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

      this.purchaseOrder.state = false;
      this.$axios({
        url: "/sigaoyi/editPurchaseorderInfo",
        method: "POST",
        params: data,
      })
        .then((result) => {
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
      this.apply.imgList = [];
      this.applyRow = row;

      //赋值
      this.apply.total = row.orderPrice;
      this.apply.addressee = row.receiver;
      this.apply.phone = row.receiverTel;
      this.apply.email = row.receiverMobile;
      this.apply.detailAdress = row.shippingAddr;
      this.apply.quantity = row.orderQty;
      this.apply.option = row.option;

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
          if (result.data.code == "200") {
            this.apply.imgList.push(result.data.img);
            this.apply.price = result.data.price;
            if (result.data.link == undefined) {
              this.apply.link = "";
            } else {
              this.apply.link = result.data.link;
            }
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
    // 去发货 确定
    confrimAddOrder() {
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
        qoo10shopId: this.applyRow.shopId,
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
          if (result.data.Code == 200) {
            this.apply.state = false;
            this.changelogisticsId(result.data.logisticsId);
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
    // 去发货修改logisticsId
    changelogisticsId(id) {
      this.$axios({
        url: "/sigaoyi/updateQoo10OrderInfo",
        method: "POST",
        params: {
          shopid: this.applyRow.id,
          logisticsId: id,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.applyRow.logisticsId = id;
          }
        })
        .catch((err) => {
          console.log("err ==>", err);
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

      this.tableLoading = true;
      this.synchrOrder.state = false;
      this.$axios({
        url: "/sigaoyi/RenewQoo10Orders",
        method: "POST",
        params: data,
      })
        .then((result) => {
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
    // 合并发货
    mergeGoodes() {
      var ids = "";
      var nameList = [];
      var shippingAddrList = [];
      var receiverMobileList = [];
      var receiverTelList = [];

      // 订购数量
      var orderQty = 0;
      var option = "";
      var orderPrice = 0;
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].selected) {
            if (this.tableData[i].shippingStatus != "On request(2)") {
              this.$message({
                message: "合并发货 只能是新订购的订单",
                center: true,
                duration: 1000,
                type: "error",
              });
              return;
            }
            ids += this.tableData[i].id + ",";
            nameList.push(this.tableData[i].receiver);
            shippingAddrList.push(this.tableData[i].shippingAddr);
            receiverMobileList.push(this.tableData[i].receiverMobile);
            receiverTelList.push(this.tableData[i].receiverTel);

            orderQty += this.tableData[i].orderQty;
            option += this.tableData[i].option + ",";
            orderPrice += this.tableData[i].orderPrice;
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
      ids = ids.substring(0, ids.lastIndexOf(","));

      // 名字
      for (let i = 0; i < nameList.length; i++) {
        if (nameList[0] != nameList[i]) {
          this.$message({
            message: "收件人名字不相同",
            center: true,
            duration: 600,
            type: "error",
          });
          return;
        }
      }
      // 邮箱
      for (let i = 0; i < receiverMobileList.length; i++) {
        if (receiverMobileList[0] != receiverMobileList[i]) {
          this.$message({
            message: "收件人邮箱不相同",
            center: true,
            duration: 600,
            type: "error",
          });
          return;
        }
      }
      // 地址
      for (let i = 0; i < shippingAddrList.length; i++) {
        if (shippingAddrList[0] != shippingAddrList[i]) {
          this.$message({
            message: "收件人地址不相同",
            center: true,
            duration: 600,
            type: "error",
          });
          return;
        }
      }
      // 电话
      for (let i = 0; i < receiverTelList.length; i++) {
        if (receiverTelList[0] != receiverTelList[i]) {
          this.$message({
            message: "收件人电话不相同",
            center: true,
            duration: 600,
            type: "error",
          });
          return;
        }
      }
      this.apply.state = true;

      // 渲染
      this.apply.addressee = nameList[0];
      this.apply.phone = receiverTelList[0];
      this.apply.email = receiverMobileList[0];
      this.apply.detailAdress = shippingAddrList[0];

      //   orderQty  option
      this.apply.quantity = orderQty;
      this.apply.option = option;
      this.apply.total = orderPrice;

      //   this.confrimAddOrder();
    },
  },
};
</script>

<style>
</style>


