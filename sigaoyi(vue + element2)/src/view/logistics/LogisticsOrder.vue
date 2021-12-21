<template>
  <div class="logisticsOrder">
    <div class="v-logisticsOrder">
      <div class="main" v-title data-title="产品订单"></div>
      <!-- 内容 -->
      <div class="proTop">
        <iframe :src="ifarmSrc" frameborder="0" style="display: none"></iframe>
        <!-- 搜索 -->
        <div class="order-search" ref="orderSearch">
          <div class="search-one">
            <div>
              <span class="text">发货状态：</span>
              <el-select v-model="shipIndex" placeholder="请选择">
                <el-option
                  v-for="item in shippingStatusData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div v-show="!openCloseState">
              <span class="text">采购方式：</span>
              <el-select v-model="pruchaseIndex" placeholder="请选择">
                <el-option
                  v-for="item in purchaseMethodsData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div v-show="!openCloseState">
              <span class="text">运输方式：</span>
              <el-select v-model="modeMethodsIndex" placeholder="请选择">
                <el-option
                  v-for="item in modeMethodsData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div v-show="!openCloseState">
              <span class="text">异常状态：</span>
              <el-select v-model="abnormalIndex" placeholder="请选择">
                <el-option
                  v-for="item in abnormalData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="user" v-show="openCloseState">
              <span class="text">用户编号：</span>
              <el-select
                v-model="userVal"
                clearable
                filterable
                placeholder="请选择"
                popper-class="setOptions"
                @change="clickSearch(30, 1, true)"
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
            <div v-show="openCloseState">
              <span class="text">订单单号：</span>
              <input
                type="text"
                placeholder="请输入"
                @keydown.enter="clickSearch(30, 1, true)"
                v-model="orderVal"
              />
            </div>
            <div class="btn" v-show="openCloseState">
              <el-button size="medium" type="default" @click="resetIniput()"
                >重置</el-button
              >
              <el-button
                size="medium"
                type="primary"
                @click="clickSearch(30, 1, true)"
                >搜索</el-button
              >
              <!-- 收起 展开 -->
              <div class="open_close" @click="openClose()">
                <span>{{ openCloseText }}</span>
                <span><i :class="openCloseCionSrc"></i></span>
              </div>
            </div>
          </div>
          <div class="search-two" v-show="!openCloseState">
            <div class="user">
              <span class="text">用户编号：</span>
              <el-select
                v-model="userVal"
                clearable
                filterable
                placeholder="请选择"
                popper-class="setOptions"
                @change="clickSearch(30, 1, true)"
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
            <div>
              <span class="text">收件人姓名：</span>
              <input
                type="text"
                @keydown.enter="clickSearch(30, 1, true)"
                placeholder="请输入"
                v-model="address"
              />
            </div>
            <div>
              <span class="text">订单单号：</span>
              <input
                type="text"
                @keydown.enter="clickSearch(30, 1, true)"
                placeholder="请输入"
                v-model="orderVal"
              />
            </div>
            <div>
              <span class="text">平台单号：</span>
              <input
                type="text"
                @keydown.enter="clickSearch(30, 1, true)"
                placeholder="请输入"
                v-model="platformorder"
              />
            </div>
          </div>
          <div class="search-three" v-show="!openCloseState">
            <div class="block">
              <span class="text">录入日期：</span>
              <el-date-picker
                v-model="enterTime"
                type="daterange"
                range-separator="至"
                start-placeholder="录入日期"
                end-placeholder="结束日期"
                unlink-panels
                @change="clickSearch(30, 1, true)"
              >
              </el-date-picker>
            </div>
            <div class="block">
              <span class="text">发货日期：</span>
              <el-date-picker
                v-model="deliverTime"
                type="daterange"
                range-separator="至"
                start-placeholder="发货日期"
                end-placeholder="结束日期"
                unlink-panels
                @change="clickSearch(30, 1, true)"
              >
              </el-date-picker>
            </div>
            <div class="btn">
              <el-button size="medium" type="default" @click="resetIniput()"
                >重置</el-button
              >
              <el-button
                size="medium"
                type="primary"
                @click="clickSearch(30, 1, true)"
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
        <!-- btn table pading-->
        <div class="order-content">
          <div class="btn">
            <div class="file">
              <el-button type="primary" size="medium" v-if="uploadOrderStatus"
                >导入订单</el-button
              >
              <input
                type="file"
                ref="uploadOrder"
                @change="updateFile($event)"
              />
            </div>
            <el-button
              type="default"
              size="medium"
              v-if="uploadOrderStatus"
              @click="addOrder()"
              >添加订单</el-button
            >
            <el-button
              type="default"
              size="medium"
              v-if="uploadOrderStatus"
              @click="syncOrder()"
              >同步订单</el-button
            >
            <el-button
              type="default"
              size="medium"
              v-if="AllFreightStatus"
              @click="AllPayment()"
              >一键付款{{ freightVal }}</el-button
            >
            <el-button
              size="medium"
              type="default"
              v-show="godownStatus"
              @click="godownState = true"
              >入库</el-button
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
            <span class="relaod" @click="getOrder(30, 1)">
              <i class="el-icon-refresh-right"></i>
            </span>
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
              <el-table-column
                type="selection"
                width="50"
                :fixed="screenWidth < 1700 ? 'left' : false"
              ></el-table-column>
              <el-table-column label="编号" width="90">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.id }}&nbsp;<i
                      class="el-icon-document-copy"
                      id="id"
                      :data-clipboard-text="scope.row.id"
                      @click="copyId(scope.row.id)"
                    ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="国内单号">
                <template slot-scope="scope">
                  <!-- scope.row.collecChecked -->
                  <div
                    v-if="scope.row.collecChecked"
                    class="orderId active"
                    @click="openCause1(scope.$index, scope.row)"
                  >
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
              <el-table-column label="国际单号">
                <template slot-scope="scope">
                  <div
                    class="order_id"
                    @click="clickorderId(scope.$index, scope.row)"
                  >
                    {{ scope.row.order_id }}
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="转运单号">
                @click="clickOrder1(scope.$index, scope.row)"
                <template slot-scope="scope">
                  <div class="order1Div">
                    {{ scope.row.orderId1 }}
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="name"
                label="收件人姓名"
                width="110"
              ></el-table-column>
              <el-table-column label="图片">
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
              <el-table-column label="订单状态">
                <template slot-scope="scope">
                  <div
                    class="order_status"
                    :class="
                      (InfoDataObj.statu == '0' ||
                        InfoDataObj.orderStatu == 0) &&
                      abnormalState == true
                        ? 'active'
                        : ''
                    "
                    @click="
                      abnormalState && changeAbnormal(scope.$index, scope.row)
                    "
                  >
                    {{ scope.row.status1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                :fixed="screenWidth < 1700 ? 'right' : false"
                width="150"
              >
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
      </div>
      <!-- 同步订单 -->
      <div class="sync-order">
        <el-dialog title="同步订单" :visible.sync="syncOrderStatus" width="30%">
          <div class="content">
            <div>
              <span class="text">选择店铺：</span>
              <el-select v-model="storeIndex" clearable placeholder="请选择">
                <el-option
                  v-for="item in storeList"
                  :key="item.value"
                  :label="item.shopuser"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">选择订单状态：</span>
              <el-select v-model="orderIndex" clearable placeholder="请选择">
                <el-option
                  v-for="item in orderList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">选择时间段：</span>
              <el-select v-model="timeIndex" clearable placeholder="请选择">
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="clickSyncbtn()">确 定</el-button>
            <el-button @click="syncOrderStatus = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--入库按钮 -->
      <div class="godown">
        <el-dialog title="入库" :visible.sync="godownState" width="30%">
          <div>
            <span class="text">用户名：</span>
            <el-select
              v-model="godownList.userVal"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in godownList.userList"
                :key="index"
                :label="item.userName + '：' + (item.id + 10850)"
                :value="item.userName"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">单号：</span>
            <input
              type="text"
              placeholder="请输入订单单号"
              v-model="godownList.order"
            />
          </div>
          <div>
            <span class="text">仓库：</span>
            <input
              type="text"
              placeholder="请输入仓库名称"
              v-model="godownList.storehouse"
            />
          </div>
          <div>
            <span class="text">货架：</span>
            <input
              type="text"
              placeholder="请输入货架名称"
              v-model="godownList.shelf"
            />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="godown()">确 认</el-button>
            <el-button @click="godownState = false">取 消</el-button>
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
      <!-- 物流追踪 -->
      <div class="causeMask1">
        <el-dialog
          title="物流追踪"
          :visible.sync="causeMaskStatus1"
          width="35%"
        >
          <div class="content">
            <div class="query">
              <div class="set">
                <span class="text">物流公司：</span>
                <el-select
                  v-model="logisticsIndex"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in logisticsList"
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
                  v-model="orderNum"
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
              <div class="loading" v-if="logisticsLoading">
                <span>
                  <i class="el-icon-loading"></i>
                  <i>加载中</i>
                </span>
              </div>
              <textarea
                cols="30"
                rows="28"
                placeholder="物流追踪"
                v-model="logisticsVal"
                v-else
                disabled
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="causeMaskStatus1 = false"
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
          width="35%"
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
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <div class="content">
            <div>
              <span class="text">常见原因：</span>
              <el-select
                v-model="abnormalListIndex"
                clearable
                @change="changeAbnormalSet(abnormalListIndex)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in abnormalList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="note">
              <span class="text">跟进内容：</span>
              <textarea
                rows="20"
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
        >
          <div class="content">
            <div>
              <span class="text">订单ID：</span>
              <input
                type="text"
                v-model="followList.orderId"
                placeholder="订单ID"
                disabled
              />
            </div>
            <div>
              <span class="text">订单运费：</span>
              <input
                type="text"
                v-model="followList.freight"
                placeholder="订单运费"
              />
            </div>
            <div>
              <span class="text">订单状态：</span>
              <el-select
                v-model="orderStatusIndex"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in orderStatusData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">常见原因：</span>
              <el-select
                v-model="FollowUpListIndex"
                clearable
                @change="changeFollowUp(FollowUpListIndex)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in FollowUplList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="active">
              <span class="text">跟进内容：</span>
              <textarea
                rows="20"
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
        >
          <div class="content">
            <div>
              <span class="text">常见问题：</span>
              <el-select
                v-model="FollowUp1Index"
                clearable
                @change="changeFollowUp1(FollowUp1Index)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in FollowUp1Data"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="active">
              <span class="text">备注：</span>
              <textarea
                rows="20"
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
import "../../assets/less/logisticsOrder/logisticsOrder.less";
import dateFormats from "../../assets/js/dateFormat";
import timestampToTimes from "../../assets/js/timestampToTime";
import Clipboard from "clipboard";
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
      shipIndex: 99,
      shippingStatusData: [
        { name: "全部", value: 99 },
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
      // 采购方式
      pruchaseIndex: "99",
      purchaseMethodsData: [
        { name: "全部", value: "99" },
        { name: "自采购", value: "0" },
        { name: "待采购", value: "1" },
      ],
      // 运输方式
      modeMethodsIndex: "99",
      modeMethodsData: [{ name: "全部", value: "99" }],
      // 异常状态
      abnormalIndex: "99",
      abnormalData: [
        { name: "全部", value: "99" },
        { name: "正常订单", value: "0" },
        { name: "异常订单", value: "1" },
        { name: "已处理完成", value: "2" },
      ],
      // 点击订单状态 标记异常
      abnormalState: true,
      //   收件人 + 平台单号 + 单号 + 用户名
      address: "",
      platformorder: "",
      orderVal: "",
      userVal: "",
      // 录入人数组
      userNameList: [],
      // 发货日期
      deliverTime: "",
      // 录入日期
      enterTime: "",
      // 展开/收起
      openCloseState: false,
      openCloseText: "收起",
      openCloseCionSrc: "el-icon-arrow-up",
      //   批量操作
      batchIndex: "",
      batchVal: "批量操作",
      batchList: [],
      // 一键付款状态
      AllFreightStatus: false,
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
      // 导入订单 show and hidden
      uploadOrderStatus: true,
      // 点击合并按钮 勾选的订单数量
      mergeIndex: 0,
      //   xls
      tableData: [],
      // 表格loading
      tableLoading: false,
      errorImage: 'this.src="' + require("../../assets/img/errorImg.png") + '"',
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      // 分页List
      profit: {
        totalFreight: 0,
        totalPrice: 0,
        totalPurchasePrice: 0,
        totalprofit: 0,
      },
      //   footer宽度
      footerW: "",
      // 查看异常原因的status
      causeMaskStatus: false,
      causeText: "",
      //  查看物流信息
      causeMaskStatus1: false,
      //  物流公司
      logisticsIndex: "",
      logisticsList: [
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
      // loading
      logisticsLoading: false,
      orderNum: "",
      logisticsVal: "",
      //   入库状态
      godownState: false,
      godownList: {
        userVal: "",
        userList: {},
        order: "",
        storehouse: "",
        shelf: "",
      },
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
      abnormalListIndex: "",
      //   标记异常弹出层select 的 List
      abnormalList: [
        { name: "请选择", value: "" },
        { name: "未到货", value: "1" },
        { name: "物件与图片不符", value: "2" },
        { name: "多物流单号", value: "3" },
        { name: "PDF问题(没有上传/需重新上传)", value: "4" },
        { name: "订单没有上传图片", value: "5" },
      ],
      //   表格点击处理按钮
      FollowUpStatus: false,
      // 表格处理弹出层 第一set
      orderStatusIndex: 1,
      orderStatusData: [
        { name: "异常订单", value: 1 },
        { name: "已完成处理", value: 2 },
      ],
      // 表格处理弹出层  第二set
      FollowUpListIndex: "",
      FollowUplList: [
        { name: "请选择", value: "" },
        { name: "未到货", value: "1" },
        { name: "物件与图片不符", value: "2" },
        { name: "多物流单号", value: "3" },
        { name: "PDF问题(没有上传/需重新上传)", value: "4" },
        { name: "订单没有上传图片", value: "5" },
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
      FollowUp1Index: "",
      FollowUp1Data: [
        { name: "请选择", value: "" },
        { name: "物流已签收,未发货", value: 1 },
        { name: "物流单号查询不到物流轨迹", value: 2 },
        { name: "运费不符合", value: 3 },
        { name: "发错产品", value: 4 },
        { name: "客户取消不发货", value: 5 },
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
      storeIndex: "",
      storeList: [],
      //  同步订单 timeList  3 7 15 30
      timeIndex: "",
      timeList: [
        { name: "当天", value: 1 },
        { name: "最近七天", value: 7 },
        { name: "最近半个月", value: 15 },
        { name: "最近一个月", value: 30 },
      ],
      //
      orderIndex: "",
      orderList: [
        { name: "新订购", selected: false, value: 2 },
        { name: "等待发货", selected: false, value: 3 },
      ],
      isRouterAilve: true,
      //   导出发货表格 的路径
      ifarmSrc: null,
      // 入库按钮状态值
      godownStatus: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (
      from.path == "/logistics/orderDetail" ||
      from.path == "/productOrder/qutianOrder"
    ) {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    document.title = "物流管理";
    if (!this.$route.meta.isBack) {
      this.resetIniput();
      this.abnormalState = false;
      this.userNameList = [];
      this.storeList = [];
      this.tableData = [];
      //   判断按钮show and hidden
      this.getInitial();
      this.getOrder(30, 1);
    } else {
      this.$route.meta.isBack = false;
      if (this.tableData.length == 0) {
        this.abnormalState = false;
        this.resetIniput();
        this.getInitial();
        this.getOrder(30, 1);
      }
      if (this.$route.query.first) {
        this.clickSearch(30, 1, true);
        this.getInitial();
      }
    }
  },
  created() {
    this.screenWidth = document.documentElement.clientWidth;
    this.resetIniput();
    this.abnormalState = false;
    this.userNameList = [];
    this.storeList = [];
    this.tableData = [];
    this.tableLoading = false;
    this.getInitial();
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.documentElement.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  computed: {
    ...homeState([
      "WstateStatus",
      "InfoData",
      "companyData",
      "shopData",
      "pagingList",
      "purchaseData",
    ]),
  },
  methods: {
    //  获取 初始值
    getInitial() {
      this.InfoDataObj = this.InfoData;
      // 管理员
      if (
        this.InfoDataObj.statu == "0" ||
        this.InfoDataObj.userName == "王焕杰" ||
        this.InfoDataObj.userName == "任治琴" ||
        this.InfoDataObj.userName == "李健明" ||
        this.InfoDataObj.userName == "王杰"
      ) {
        this.InfoDataObj["orderStatu"] = 0;
        this.modeMethodsData = [
          { name: "全部", value: "99" },
          { name: "E特快", value: "ETK" },
          { name: "佐川特货", value: "佐川" },
          //   { name: "佐川普货", value: "RB-DS3" },
          { name: "佐川加急", value: "RB-DS3" },
          { name: "佐川普货-LTW", value: "LTW" },
          { name: "佐川普货-DPC", value: "DPC" },
          { name: "青岛-免抛", value: "QDMP" },
          { name: "佐川带电", value: "JPSADD" },
          { name: "黑猫3cm", value: "黑猫" },
          { name: "黑猫3cm带电", value: "黑猫带电" },
          { name: "黑猫普货5cm", value: "黑猫普货5cm" },
          { name: "黑猫带电5cm", value: "黑猫带电5cm" },
          { name: "Qxpress", value: "Qxpress" },
          { name: "EMS", value: "EMS" },
          { name: "免抛", value: "PK0009" },
          { name: "CNE", value: "CNE" },
          { name: "日邮小包", value: "日邮小包" },
          { name: "国内退货", value: "国内退货" },
        ];
        // 导入订单
        this.uploadOrderStatus = true;
        // 入库
        this.godownStatus = true;
        // 标记异常
        this.abnormalState = true;
        // 批量操作
        this.batchList = [
          { label: "合并订单", value: 0 },
          { label: "导出订单", value: 1 },
          { label: "删除订单", value: 2 },
          { label: "导入模板下载", value: 3 },
          { label: "导出发货表格", value: 4 },
          { label: "导出表格-青岛", value: 5 },
        ];
      } else {
        this.InfoDataObj["orderStatu"] = 1;
        // 入库
        this.godownStatus = false;
        // 导入订单
        this.uploadOrderStatus = true;
        this.modeMethodsData = [
          { name: "全部", value: "99" },
          { name: "佐川", value: "佐川" },
          { name: "佐川加急", value: "RB-DS3" },
          { name: "黑猫", value: "黑猫" },
          { name: "青岛-免抛", value: "QDMP" },
          { name: "带电渠道", value: "JPSADD" },
          { name: "Qxpress", value: "Qxpress" },
          { name: "ETK", value: "ETK" },
          { name: "EMS", value: "EMS" },
          { name: "日邮小包", value: "日邮小包" },
        ];
        // 标记异常
        this.abnormalState = false;
        // 批量操作
        this.batchList = [
          { label: "合并订单", value: 0 },
          { label: "导出订单", value: 1 },
          { label: "导入模板下载", value: 3 },
        ];
        if (this.InfoDataObj.userName == "hzsugoi") {
          this.modeMethodsData = [
            { name: "全部", value: "99" },
            { name: "E特快", value: "ETK" },
            { name: "佐川特货", value: "佐川" },
            //   { name: "佐川普货", value: "RB-DS3" },
            { name: "佐川加急", value: "RB-DS3" },
            { name: "佐川普货-LTW", value: "LTW" },
            { name: "佐川普货-DPC", value: "DPC" },
            { name: "青岛-免抛", value: "QDMP" },
            { name: "佐川带电", value: "JPSADD" },
            { name: "黑猫3cm", value: "黑猫" },
            { name: "黑猫3cm带电", value: "黑猫带电" },
            { name: "黑猫普货5cm", value: "黑猫普货5cm" },
            { name: "黑猫带电5cm", value: "黑猫带电5cm" },
            { name: "Qxpress", value: "Qxpress" },
            { name: "EMS", value: "EMS" },
            { name: "免抛", value: "PK0009" },
            { name: "CNE", value: "CNE" },
            { name: "日邮小包", value: "日邮小包" },
            { name: "国内退货", value: "国内退货" },
          ];
          // 入库
          this.godownStatus = true;
        }
        if (this.InfoDataObj.statu == "5") {
          this.modeMethodsIndex = "QDMP";
          this.modeMethodsData = [{ name: "青岛-免抛", value: "QDMP" }];
          // 批量操作
          this.batchList = [
            { label: "合并订单", value: 0 },
            { label: "导出订单", value: 1 },
            { label: "导入模板下载", value: 3 },
            { label: "导出表格-青岛", value: 5 },
          ];
        }
      }
    },
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
    //   set
    changeSet(array, setIndex, string) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[setIndex].selected = true;

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
      let obj = {
        titleB: `订单${row.id}详情`,
        isChildB: false,
        routerSrc: "OrderDetail",
        isRoute: false,
        query: { id: row.id, rowStatus: true },
      };

      this.setPagingList(obj);
    },
    // 复制id
    copyId(id) {
      var clipboard = new Clipboard("#id");
      clipboard.on("success", (e) => {
        this.$message({
          message: `复制订单编号${id}成功`,
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
    // 国际单号
    clickorderId(index, row) {
      console.log(row);
      //   if(row.trade_type1 == "")
      window.open(
        "http://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=" +
          row.order_id
      );
    },
    // 点击转运单号
    clickOrder1(index, row) {
      this.order1Status = true;
      this.orderLoading = true;
      //  点击前两次是否是相同的订单id
      if (this.order1 == row.orderId1) {
        this.orderLoading = false;
        return;
      }
      //   console.log("row ==>",row);
      // 请求
      this.$axios({
        url: "/sigaoyi/trackOrders",
        method: "POST",
        params: {
          orderId1: row.orderId1,
          trade_type1: row.trade_type1,
        },
      })
        .then((result) => {
          //  console.log("result ==>",result);
          this.orderLoading = false;
          this.order1HTML = result.data.trackingdata;
          this.order1 = row.orderId1;
        })
        .catch((err) => {
          this.orderLoading = false;
          this.order1HTML = "系统业务繁忙,请稍后再试！";
        });
    },
    // 点击表格图片
    openImgLink(index, row) {
      window.open(row.link);
    },
    // 入库
    godown() {
      // 提示
      if (this.godownList.order == "") {
        this.$message({
          message: "请填写单号",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.godownList.userVal == "") {
        this.$message({
          message: "请选择入库人名字",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      let data = {
        invoicingName: this.godownList.order,
        userID: this.godownList.userVal,
        number: 1,
        storehouse: this.godownList.storehouse,
        shelf: this.godownList.shelf,
        image: "",
        remarks: "",
      };

      this.godownState = false;

      this.$axios({
        url: "/sigaoyi/warehousing",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log(result);
          //   loading.close();
          if (result.data.Code == 200) {
            this.godownState = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.godownState = true;

            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.godownState = true;
          //   loading.close();
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
        this.shipIndex = 99;
        this.pruchaseIndex = "99";
        this.modeMethodsIndex = "99";
        this.abnormalIndex = "99";
        // input
        this.address = "";
        this.platformorder = "";
        this.orderVal = "";
        this.userVal = "";
        this.deliverTime = "";
        this.enterTime = "";
      });
    },
    // 搜索
    clickSearch(amount, pages, flag) {
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
      // 参数
      var data = {
        amount: amount,
        pages: pages,
        userId: this.InfoData.id,
        // set
        status: this.shipIndex,
        purchaseMode: this.pruchaseIndex,
        collectionStatus: this.abnormalIndex,
        // 用户名
        ClientName: this.userVal,
        //  收件人姓名 平台单号 单号
        name: this.address,
        platformorder: this.platformorder,
        orderId: this.orderVal,
        // 发货日期 开始 结束 时间
        shipDate: "",
        shipDate1: "",
        startTime: "",
        lastTime: "",
        companyPrincipal: this.companyData.companyName,
      };

      // 发货日期 开始 结束 时间
      if (this.deliverTime == "" || this.deliverTime == null) {
        data.shipDate = "";
        data.shipDate1 = "";
      } else {
        data.shipDate = dateFormats.dateFormat(this.deliverTime[0]);
        data.shipDate1 = dateFormats.dateFormat(this.deliverTime[1]);
      }

      if (this.enterTime == "" || this.enterTime == null) {
        data.startTime = "";
        data.lastTime = "";
      } else {
        data.startTime = dateFormats.dateFormat(this.enterTime[0]);
        data.lastTime = dateFormats.dateFormat(this.enterTime[1]);
      }

      // 运输方式 或者 渠道
      if (this.InfoDataObj.statu == "0" || this.InfoData.statu == "5") {
        data["trade_type1"] = this.modeMethodsIndex;
      } else {
        data["trade_type"] = this.modeMethodsIndex;
      }

      console.log("data ===>", data);

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
            this.godownList.userList = result.data.logisticsNames;
            // 表格
            this.freightVal = result.data.freight.toFixed(2);
            // 分页 内容
            // this.profit = result.data.profit;

            // 已欠运费
            if (Number(this.freightVal) > 0) {
              this.AllFreightStatus = true;
              if (this.InfoData.statu > 2) {
                this.uploadOrderStatus = false;
                //  >2 公司名字 + 级别5
                if (
                  this.InfoData.company == "和美国际旅行社有限公司" ||
                  this.InfoData.company == "杭州思高易" ||
                  this.InfoData.statu == "5"
                ) {
                  this.uploadOrderStatus = true;
                }
                // 沈永鑫
                if (
                  this.InfoData.userName == "沈永鑫" &&
                  result.data.billingPeriodFreight <= 0
                ) {
                  this.uploadOrderStatus = true;
                }
                //  朴学峰
                if (
                  this.InfoData.userName == "朴学峰" &&
                  Number(this.freightVal) < 5000
                ) {
                  this.uploadOrderStatus = true;
                }
                //  韩睿
                if (
                  this.InfoData.userName == "韩睿" &&
                  Number(this.freightVal) < 5000
                ) {
                  this.uploadOrderStatus = true;
                }
              } else {
                // 用户等级 0 1
                this.uploadOrderStatus = true;
              }
            } else {
              // 不欠运费
              this.uploadOrderStatus = true;
              this.AllFreightStatus = false;
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
              for (const key in e) {
                if (e[key] == "null") {
                  e[key] = "";
                }
              }
              for (const key in obj) {
                if (e.status == key) {
                  e["status1"] = obj[key];
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
              if (this.InfoDataObj.orderStatu == 0) {
                e["collecStatuChecked"] = true;
              } else {
                e["collecStatuChecked"] = false;
              }
            });

            if (data.collectionStatus == "1") {
              this.abnormalState = false;
            } else {
              this.abnormalState = true;
            }

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
    // 表格 事件 渲染颜色
    tableRowClassName({ row, rowIndex }) {
      if (!row.collecChecked) {
        return "red";
      }
      if (row.status == 0) {
        return "stock";
      }
      if (row.trade_type == "Qxpress") {
        return "yellow";
      }
    },
    // 属性选项 两行显示
    changeCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 6) {
        return "hideDot";
      }
    },
    // 分页事件
    handleSizeChange(val) {
      this.pageSize = val;
      this.clickSearch(this.pageSize, this.currentPage, true);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.clickSearch(this.pageSize, this.currentPage, true);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 添加订单
    addOrder() {
      this.$router.push({ name: "OrderDetail", rowStatus: false });
      //   let obj = {
      //     titleB: `添加订单`,
      //     isChildB: false,
      //     routerSrc: "OrderDetail",
      //     isRoute: false,
      //   };

      //   this.setPagingList(obj);
    },
    // 同步订单
    syncOrder() {
      if (this.shopData.length == 0) {
        this.$message({
          message: "该用户还没绑定店铺",
          center: true,
          duration: 800,
          type: "error",
        });
        return;
      }
      this.storeList = this.shopData;
      this.syncOrderStatus = true;
    },
    // 合并订单
    mergeOrder() {
      var ids = "";
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
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

      // 发送请求!!!!!!
      // let loading = this.$loading({
      //   lock: false,
      //   text: "加载中...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/CombinedOrder",
        method: "POST",
        params: {
          ids: ids,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.clickSearch(30, 1, true);
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 导出订单
    exportOrder() {
      //   发起请求
      let loading = this.$loading({
        lock: false,
        text: "导出中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let data = {
        userId: this.InfoData.id,
        clientName: "",
        status: this.shipIndex,
        purchaseMode: this.pruchaseIndex,
        collectionStatus: this.abnormalIndex,
        startTime: "",
        lastTime: "",
        shipDate: "",
        shipDate1: "",
        orderId: this.orderVal,
      };

      // 转时间格式
      if (this.deliverTime == "" || this.deliverTime == null) {
        data.shipDate = "";
        data.shipDate1 = "";
      } else {
        data.shipDate = dateFormats.dateFormat(this.deliverTime[0]);
        data.shipDate1 = dateFormats.dateFormat(this.deliverTime[1]);
      }

      if (this.enterTime == "" || this.enterTime == null) {
        data.startTime = "";
        data.lastTime = "";
      } else {
        data.startTime = dateFormats.dateFormat(this.enterTime[1]);
        data.startTime = dateFormats.dateFormat(this.enterTime[0]);
      }

      if (
        this.InfoDataObj.orderStatu == 0 ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.userName == "和美财务" ||
        this.InfoData.statu == "5"
      ) {
        data.clientName = this.userVal;
      } else {
        data.clientName = this.InfoData.userName;
      }

      // 运输方式 或者 渠道

      if (
        this.InfoDataObj.orderStatu == 0 ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.statu == "5"
      ) {
        data["trade_type1"] = this.modeMethodsIndex;
      } else {
        data["trade_type"] = this.modeMethodsIndex;
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

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 删除订单
    deleteOrder() {
      var ids = "";
      var indexList = [];
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
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

      ids = ids.substring(0, ids.length - 1);

      //   发起请求
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/delectlogistics",
        method: "POST",
        params: {
          ids: ids,
        },
      })
        .then((result) => {
          this.tableLoading = false;
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 导出发货表格
    exportDeliverOrder() {
      //   发起请求
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/export",
        method: "POST",
        params: {},
      })
        .then((result) => {
          if (result.data.code == "200") {
            // http://192.168.1.179:8080/
            // http://www.ec-sigaoyi.com/
            this.ifarmSrc = "http://www.ec-sigaoyi.com/" + result.data.path;

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
            this.tableLoading = false;
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
          this.tableLoading = false;
          this.ifarmSrc = null;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 导出表格-青岛
    exportQDorder() {
      //   发起请求
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/exportQDMP",
        method: "POST",
        params: {
          id: this.InfoData.id,
        },
      })
        .then((result) => {
          if (result.data.code == "200") {
            // http://192.168.1.179:8080/
            // http://www.ec-sigaoyi.com/
            this.ifarmSrc = " http://www.ec-sigaoyi.com/" + result.data.path;

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
            this.tableLoading = false;
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
          this.tableLoading = false;
          this.ifarmSrc = null;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 批量操作
    changeBatch() {
      this.batchIndex = this.batchVal;
      this.batchVal = "批量操作";
      if (this.batchIndex == 0) {
        // 合并订单
        this.mergeOrder();
      } else if (this.batchIndex == 1) {
        // 导出订单
        this.exportOrder();
      } else if (this.batchIndex == 2) {
        // 删除订单
        this.deleteOrder();
      } else if (this.batchIndex == 3) {
        // 导入模板下载
        this.ifarmSrc = null;
        this.ifarmSrc =
          "http://www.ec-sigaoyi.com/wenjian/xls/order/%E8%AE%A2%E5%8D%95%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xls";
        setTimeout(() => {
          this.ifarmSrc = null;
        }, 600);
      } else if (this.batchIndex == 4) {
        // 导出发货表格
        this.exportDeliverOrder();
      } else if (this.batchIndex == 5) {
        // 导出表格-青岛
        this.exportQDorder();
      }
    },
    // 同步订单弹出层 确定按钮
    clickSyncbtn() {
      //  提示
      if (this.storeIndex == "") {
        this.$message({
          message: "请选择店铺",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.orderIndex == "") {
        this.$message({
          message: "请选择订单状态",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.timeIndex == "") {
        this.$message({
          message: "请选择时间段",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      let data = {
        userName: this.InfoData.userName,
        shopid: this.storeIndex,
        Heaven: this.timeIndex,
        ShippingStat: this.orderIndex,
      };

      // 发起请求
      //   let loading = this.$loading({
      //     lock: false,
      //     text: "同步中...",
      //     spinner: "el-icon-loading",
      //     background: "rgba(0, 0, 0, 0.7)",
      //   });
      this.tableLoading = true;
      this.syncOrderStatus = false;
      this.$axios({
        url: "/sigaoyi/SynchronizeOrders",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.syncOrderStatus = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.getOrder(30, 1);
          } else {
            this.tableLoading = false;
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 一键付款
    AllPayment() {
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
      if (Number(this.InfoData.balance) < Number(this.freightVal)) {
        let alertText = confirm("余额不足,是否前往充值");
        if (alertText) {
          this.$router.push({ name: "RechargeWidthdraw" });
        }
        return;
      }
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWpayments",
        method: "POST",
        params: {
          price: this.freightVal,
          userName: this.InfoData.userName,
          userId: this.InfoData.id,
          ClientName: this.userVal,
        },
      })
        .then((result) => {
          if (result.data.Code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.freightVal = "0.00";
            this.setInfoData(result.data.user);
            this.resetIniput();
            this.getOrder(30, 1);
          } else {
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 表格 点击付费
    clickPay(index, row) {
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

      this.$axios({
        url: "/sigaoyi/NEWpayment",
        method: "POST",
        params: data,
      })
        .then((result) => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          if (result.data.code == "200") {
            row.status = "已完成";
            result.data.userinfo.balance = result.data.userinfo.balance.toFixed(
              2
            );
            this.freightVal = (this.freightVal - row.freight).toFixed(2);
            this.setInfoData(result.data.userinfo);
            if (this.freightVal > 0) {
              this.AllFreightStatus = true;
              if (this.InfoData.statu > 2) {
                this.uploadOrderStatus = false;
              } else {
                this.uploadOrderStatus = true;
              }
            } else {
              this.AllFreightStatus = false;
              this.uploadOrderStatus = true;
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
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
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

      let files = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      formData.append("userName", this.InfoData.userName);
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWImportxls",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((result) => {
          this.$refs.uploadOrder.value = null;

          if (result.data.Code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
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
          this.$refs.uploadOrder.value = null;
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
    // 查看物流
    openCause1(index, row) {
      this.causeMaskStatus1 = true;
      // 重置
      this.logisticsIndex = "";
      this.orderNum = "";
      this.logisticsVal = "";
      // 去除文字 + 空格
      let orderIdVal;
      orderIdVal = row.orderId.replace(/\s/g, "");
      orderIdVal = orderIdVal.replace(/[\u4e00-\u9fa5]/g, "");
      this.orderNum = orderIdVal;
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
          num: this.orderNum,
          com: this.logisticsIndex,
        },
      })
        .then((result) => {
          this.logisticsLoading = false;
          if (result.data.code == "200") {
            this.logisticsVal = result.data.text;
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
    // 点击 标记异常 switch change 事件
    changeAbnormal(index, row) {
      this.abnormalStatus = true;
      this.abnormaldioIndex = index;
      this.abnormaldioRow = row;
      row.note = row.note.replace(/--/g, "\n");
      this.textareaText = row.note;
    },
    // 异常弹出层 set
    changeAbnormalSet(setIndex) {
      this.abnormalListIndex = "";
      this.textareaText += "\n" + this.abnormalList[setIndex].name + "\n";
    },
    // 异常弹出层 取消事件
    closeAbnormal() {
      this.abnormalStatus = false;
    },
    // 异常弹出层 确定事件  //2021-08-10 09:36:22:测试标记订单异常
    SubmitAbnormal() {
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
          if (result.data.code == "200") {
            //   事件冲突
            this.abnormalStatus = false;
            this.tableData[this.abnormaldioIndex].collecChecked = false;
            this.tableData[this.abnormaldioIndex].followUp = true;
            // 赋值
            this.tableData[this.abnormaldioIndex].note = this.textareaText;
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
        });
    },
    // 点击表格处理 按钮
    clickFollowUp(index, row) {
      // 王焕杰 任治琴 李健明 王杰 hzsugoi
      if (this.InfoDataObj.orderStatu == 0 || this.InfoData.statu == "5") {
        this.FollowUpRow = row;
        this.FollowUpIndex = index;
        this.FollowUpStatus = true;
        //
        this.orderStatusIndex = 1;

        this.FollowUpListIndex = "";
        this.followList.orderId = row.id;
        this.followList.freight = row.freight;
        row.note = row.note.replace(/--/g, "\n");
        this.FollowUpNote = row.note;
      } else {
        // 点击 跟进 弹出层
        this.FollowUpTan = 0;

        this.FollowUp1Index = "";
        this.FollowUp1Status = true;
        row.note = row.note.replace(/--/g, "\n");
        this.FollowUp1Note = row.note;
        this.FollowUp1Row = row;
        this.FollowUp1Index1 = index;
      }
    },
    // 点击表格处理按钮 第二个set change事件
    changeFollowUp(setIndex) {
      this.FollowUpListIndex = "";
      this.FollowUpNote += "\n" + this.FollowUplList[setIndex].name + "\n";
    },
    // 点击表格处理 按钮弹出层 确定按钮
    clickFollowUpStatus() {
      let data = {
        chuliID: this.followList.orderId,
        chulicollectionStatus: this.orderStatusIndex,
        chulinote: this.FollowUpNote,
        chulifreight: this.followList.freight,
      };
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
          if (result.data.code == "200") {
            if (data.chulicollectionStatus == 1) {
              this.FollowUpStatus = false;
              this.tableData[this.FollowUpIndex].collecChecked = false;
              this.tableData[this.FollowUpIndex].followUp = true;
              this.tableData[this.FollowUpIndex].note = data.chulinote;
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
          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 跟进 第一个 set
    changeFollowUp1(setIndex) {
      this.FollowUp1Index = "";
      this.FollowUp1Note += "\n" + this.FollowUp1Data[setIndex].name + "\n";
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
          if (result.data.code == "200") {
            this.FollowUp1Status = false;
            if (this.FollowUpTan == 1) {
              this.tableData[this.appealIndex].collecChecked = false;
              this.tableData[this.appealIndex].followUp = true;
              this.tableData[this.appealIndex].note = data.note;
            } else {
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
      this.FollowUp1Index = "";
      this.appealRow = row;
      this.appealIndex = index;
    },
    // 获取订单
    getOrder(amount, pages) {
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
      this.resetIniput();
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWtoLogistics",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          amount: amount,
          pages: pages,
          companyPrincipal: this.companyData.companyName,
        },
      })
        .then((result) => {
          this.tableLoading = false;
          console.log("result ==>", result);

          if (result.data.Code == 200) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            //   用户名
            this.userNameList = result.data.logisticsNames;
            this.godownList.userList = result.data.logisticsNames;
            // 付款金额
            this.freightVal = result.data.freight.toFixed(2);

            // 分页 内容
            // this.profit = result.data.profit;

            // 已欠运费
            if (Number(this.freightVal) > 0) {
              this.AllFreightStatus = true;
              if (this.InfoData.statu > 2) {
                // 导入 + 添加 + 同步
                this.uploadOrderStatus = false;

                //  >2 公司名字 + 级别5
                if (
                  this.InfoData.company == "和美国际旅行社有限公司" ||
                  this.InfoData.company == "杭州思高易" ||
                  this.InfoData.statu == "5"
                ) {
                  this.uploadOrderStatus = true;
                }
                // 沈永鑫
                if (
                  this.InfoData.userName == "沈永鑫" &&
                  result.data.billingPeriodFreight <= 0
                ) {
                  this.uploadOrderStatus = true;
                }
                //  朴学峰
                if (
                  this.InfoData.userName == "朴学峰" &&
                  Number(this.freightVal) < 5000
                ) {
                  this.uploadOrderStatus = true;
                }
                //  韩睿
                if (
                  this.InfoData.userName == "韩睿" &&
                  Number(this.freightVal) < 5000
                ) {
                  this.uploadOrderStatus = true;
                }
              } else {
                // 用户等级 0 1
                this.uploadOrderStatus = true;
              }
            } else {
              // 不欠运费
              this.uploadOrderStatus = true;
              this.AllFreightStatus = false;
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
              // null
              for (const key in e) {
                if (e[key] == "null") {
                  e[key] = "";
                }
              }
              for (const key in obj) {
                if (e.status == key) {
                  e["status1"] = obj[key];
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
              if (this.InfoDataObj.orderStatu == 0) {
                e["collecStatuChecked"] = true;
              } else {
                e["collecStatuChecked"] = false;
              }
            });
            // 设置表格 页数 总数 等
            this.total = result.data.page.total;
            this.currentPage = result.data.page.pages;
            this.pageSize = result.data.page.amount;
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    ...homeActions(["setWstateStatus", "setInfoData", "setPagingList"]),
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>

<style>
</style>