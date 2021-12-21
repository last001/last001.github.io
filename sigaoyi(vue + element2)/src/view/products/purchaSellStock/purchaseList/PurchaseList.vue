<template>
  <div class="purchaseList">
    <div class="v-purchaseList">
      <div class="main" v-title data-title="库存列表"></div>
      <div class="purchaseListInfo">
        <div class="status-type">
          <div class="search">
            <div>
              <span class="text">物件状态：</span>
              <el-select
                v-model="radioIndex"
                placeholder="请选择"
                @change="search(1, 30)"
              >
                <el-option
                  v-for="item in radioList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="odd">
              <span class="text">订单单号：</span>
              <input
                type="text"
                v-model="searchList.order"
                placeholder="请输入"
                @keydown.enter="search(1, 30)"
              />
            </div>
            <div class="updateTime">
              <span class="text">认领人：</span>
              <input
                type="text"
                v-model="searchList.Claimant"
                placeholder="请输入"
                @keydown.enter="search(1, 30)"
              />
            </div>
            <div class="btn" v-if="openCloseState">
              <el-button size="small" @click="reset()">重置</el-button>
              <el-button type="primary" size="small" @click="search(1, 30)"
                >搜索</el-button
              >
              <!-- 收起 展开 -->
              <div class="open_close" @click="openClose()">
                <span>{{ openCloseText }}</span>
                <span><i :class="openCloseCionSrc"></i></span>
              </div>
            </div>
            <div class="godownTime" v-else>
              <span class="text">入库时间：</span>
              <el-date-picker
                v-model="searchList.godownTime"
                @change="search(1, 30)"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="btns" v-show="!openCloseState">
            <div class="purchaseTime">
              <span class="text">采购时间：</span>
              <!-- <el-date-picker
                v-model="searchList.purchaseTime"
                type="date"
                placeholder="选择日期"
                @change="search(1, 30)"
              >
              </el-date-picker> -->
              <el-date-picker
                v-model="searchList.purchaseTime"
                @change="search(1, 30)"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="v-btn">
              <el-button size="small" @click="reset()">重置</el-button>
              <el-button type="primary" size="small" @click="search(1, 30)"
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
        <div class="pur-bottom">
          <!-- 按钮 + 销毁 -->
          <div class="btn" v-if="btnStatus">
            <el-button
              icon="el-icon-delete-location"
              type="danger"
              size="small"
              @click="deleteList(false)"
              >删除</el-button
            >
            <i class="el-icon-refresh-right" @click="resetSearch()"></i>
          </div>
          <div class="btn" v-else>
            <el-button
              icon="el-icon-delete-location"
              type="danger"
              size="small"
              @click="deleteList(true)"
              >销毁</el-button
            >
            <i class="el-icon-refresh-right" @click="resetSearch()"></i>
          </div>
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @select="onTableSelect"
              @select-all="setAll"
              maxHeight="610"
              stripe
              v-loading="tableLoading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="name"
                width="150"
                label="名称/单号"
              ></el-table-column>
              <el-table-column
                prop="orderNo"
                label="订单编号"
              ></el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                width="50"
              ></el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <div v-if="scope.row.img == ''" class="updataImg">
                    <el-button type="text">上传</el-button>
                    <input
                      type="file"
                      @change="uploading(scope.$index, scope.row, $event)"
                      ref="uploadInt"
                      accept="image/*"
                    />
                  </div>
                  <img
                    v-else
                    :src="scope.row.img"
                    alt=""
                    style="height: 50px; width: 50px"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="storehouse" label="仓库"></el-table-column>
              <el-table-column prop="shelf" label="货架"></el-table-column>
              <el-table-column prop="belonger" label="认领人"></el-table-column>
              <el-table-column
                prop="storageTime"
                width="100"
                label="入库时间"
              ></el-table-column>
              <el-table-column prop="day" label="入库天数"></el-table-column>
              <el-table-column
                prop="purchasePrice"
                label="采购价格"
              ></el-table-column>
              <el-table-column
                prop="deliveuTime1"
                label="采购时间"
                width="100"
              ></el-table-column>
              <el-table-column label="物件状态">
                <el-table-column
                  prop="inventory"
                  label="待出库"
                  width="80"
                ></el-table-column>
                <el-table-column
                  prop="damaged"
                  label="破损"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="lost"
                  label="丢失"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="ship"
                  label="已出库"
                  width="80"
                ></el-table-column>
              </el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <div class="edit">
                    <el-button
                      size="mini"
                      v-if="scope.row.status != '已退回'"
                      @click="sendBack(scope.$index, scope.row)"
                    >
                      退回
                    </el-button>
                    <el-button
                      type="success"
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      编辑
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="block clearfix">
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
            <el-pagination layout="slot" class="fl totalDom">
              <span>总采购金额：{{ totalPurchasePrice }}</span>
            </el-pagination>
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
        <!-- 退回弹出层 -->
        <el-dialog
          title="退回填单"
          :visible.sync="backList.state"
          width="30%"
          custom-class="backMask"
        >
          <div class="content">
            <div>
              <span class="text">姓名：</span>
              <input
                type="text"
                ref="shopName"
                v-model="backList.userName"
                placeholder="请输入"
              />
            </div>
            <div>
              <span class="text">电话：</span>
              <input
                type="text"
                v-model="backList.phone"
                placeholder="请输入"
              />
            </div>
            <div>
              <span class="text">邮编：</span>
              <input
                type="text"
                v-model="backList.mailbox"
                placeholder="请输入"
              />
            </div>
            <div>
              <span class="text">地址：</span>
              <input
                type="text"
                v-model="backList.address"
                placeholder="请输入"
              />
            </div>
            <div>
              <span class="text">品名：</span>
              <input
                type="text"
                v-model="backList.productName"
                placeholder="请输入"
              />
            </div>
            <div>
              <span class="text">方式：</span>
              <el-select
                v-model="backList.transitionIndex"
                placeholder="默认选择国内退货"
              >
                <el-option
                  v-for="item in backList.transitionList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="note">
              <span class="text">备注：</span>
              <textarea
                cols="20"
                rows="5"
                v-model="backList.remarks"
                placeholder="请输入备注"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="confirmBack()"
              >确 定</el-button
            >
            <el-button size="small" @click="backList.state = false"
              >取 消</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../../assets/less/purchaseList/purchaseList.less";
import dateFormats from "../../../../assets/js/dateFormat";
import timestampToTimes from "../../../../assets/js/timestampToTime";
import uploadPdfs from "../../../../assets/js/uploadPdf";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  //   name: "PurchaseList",
  data() {
    return {
      radioIndex: 99,
      //   radio数组
      radioList: [
        {
          name: "全部",
          value: 99,
        },
        {
          name: "待出库",
          value: 3,
        },
        // {
        //   name: "破损",
        //   value:4,
        // },
        // {
        //   name: "丢失",
        //   value:4,
        // },
        {
          name: "已出库",
          value: 4,
        },
        {
          name: "已退回",
          value: 5,
        },
      ],
      // 搜索的列表
      searchList: {
        order: "",
        godownTime: "",
        Claimant: "",
        purchaseTime: "",
      },
      // 收起
      openCloseState: false,
      openCloseText: "收起",
      openCloseCionSrc: "el-icon-arrow-up",
      //   xls
      tableData: [],
      tableLoading: false,
      //  退回弹出层
      backList: {
        state: false,
        // 国内单号 + 数量 + 图片
        id: 0,
        orderNo: "",
        quantity: 1,
        img: "",
        // 00
        userName: "",
        phone: "",
        mailbox: "",
        address: "",
        productName: "",
        remarks: "",
        transitionIndex: "国内退货",
        transitionList: [{ name: "国内退货", value: "国内退货" }],
      },
      rowList: {},
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      total: 0,
      //   删除按钮状态值
      btnStatus: false,
      // 总采购金额
      totalPurchasePrice: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (from.path == "/purchaSellStock/purchaseCompileDefault") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    document.title = "库存列表";
    if (!this.$route.meta.isBack) {
      this.reset();
      this.currentPage = 1;
      this.pageSize = 30;
      this.tableData = [];
      this.getData(this.currentPage, this.pageSize);
    } else {
      if (this.$route.query.flag) {
        this.search(1, 30);
      }
    }
  },
  created() {},
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 重置
    reset() {
      this.searchList.order = "";
      this.searchList.godownTime = "";
      this.searchList.Claimant = "";
      this.searchList.purchaseTime = "";
      if (
        this.InfoData.statu == "0" ||
        this.InfoData.userName == "王焕杰" ||
        this.InfoData.userName == "李健明" ||
        this.InfoData.userName == "王杰" ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.userName == "任治琴"
      ) {
        this.btnStatus = true;
      } else {
        this.btnStatus = false;
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
    // 按钮傍边的重置
    resetSearch() {
      this.reset();
      this.currentPage = 1;
      this.pageSize = 30;
      this.getData(this.currentPage, this.pageSize);
    },
    // 搜索
    search(pages, amount) {
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
      this.tableLoading = true;
      let data = {
        userId: this.InfoData.id,
        pages: pages,
        amount: amount,
        status: this.radioIndex,
        belonger: this.searchList.Claimant,
        invoicingName: this.searchList.order,
        storageTime: "",
        storageTime1: "",
        deliveuTime: "",
        deliveuTime1: "",
      };
      if (
        this.searchList.godownTime == "" ||
        this.searchList.godownTime == null
      ) {
        data.storageTime = "";
        data.storageTime1 = "";
      } else {
        data.storageTime = dateFormats.dateFormat(
          this.searchList.godownTime[0]
        );
        data.storageTime1 = dateFormats.dateFormat(
          this.searchList.godownTime[1]
        );
      }

      if (
        this.searchList.purchaseTime == "" ||
        this.searchList.purchaseTime == null
      ) {
        data.deliveuTime = "";
        data.deliveuTime1 = "";
      } else {
        data.deliveuTime = dateFormats.dateFormat(
          this.searchList.purchaseTime[0]
        );
        data.deliveuTime1 = dateFormats.dateFormat(
          this.searchList.purchaseTime[1]
        );
      }

      console.log("data ==>", data);

      this.$axios({
        url: "/sigaoyi/NEWinStock",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.tableLoading = false;

          if (result.data.Code == 200) {
            let obj = {
              3: "待出库",
              4: "已出库",
              5: "已退回",
            };
            var d = new Date();
            var timer = d.getTime();
            // 表格处理
            result.data.invoicings.forEach((e) => {
              e["storageTime1"] = e.storageTime;
              e.storageTime = dateFormats.dateFormat(e.storageTime);
              if (e.deliveuTime == null) {
                e["deliveuTime1"] = "";
              } else {
                e["deliveuTime1"] = dateFormats.dateFormat(e.deliveuTime);
              }
              e["day"] = timer - e.storageTime1;
              e.day = parseInt(e.day / 1000 / 24 / 60 / 60);
            });
            // 总数 + 分页 + 页数
            this.total = result.data.page.total;
            this.currentPage = result.data.page.pages;
            this.pageSize = result.data.page.amount;
            // 总采购金额
            this.totalPurchasePrice = result.data.sumPurchasePrice;
            // 表格
            this.tableData = result.data.invoicings;
            this.tableData.forEach((e) => {
              for (const key in obj) {
                if (e.status == key) {
                  e.status = obj[key];
                }
              }
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
    // 点击添加
    addPurchaseCompile() {
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
          name: "PurchaseCompileDefault",
          query: { row: {}, rowStatus: false, title: "purchaseList" },
        });
      }, 400);
    },
    // 表格select 选择
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;

      this.tableData.forEach((e) => {
        e.selected = false;
      });
      rows.forEach((e) => {
        e.selected = true;
      });
      // 点击合并按钮 的 勾选的订单数量
      //   this.mergeIndex = rows.length;
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
    // 删除
    deleteList(flag) {
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
      let ids = "";
      let indexList = [];
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].selected) {
            ids += this.tableData[i].id + ",";
            indexList.push(i);
          }
        }
      } else {
        if (flag) {
          this.$message({
            message: "请勾选要销毁的列表",
            center: true,
            duration: 600,
            type: "error",
          });
        } else {
          this.$message({
            message: "请勾选要删除的列表",
            center: true,
            duration: 600,
            type: "error",
          });
        }
        return;
      }
      ids = ids.substring(0, ids.length - 1);
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/delectInvoicing",
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
            if (flag) {
              this.$notify({
                title: "请求成功",
                message: "销毁成功",
                type: "success",
                offset: 50,
              });
            } else {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            }
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
        });
    },
    // 退回
    sendBack(index, row) {
      this.backList.state = true;
      this.backList.id = row.id;
      this.backList.orderNo = row.name;
      this.backList.quantity = row.quantity;
      this.backList.img = row.img;
      this.rowList = row;
    },
    // 确定退回
    confirmBack() {
      var time = timestampToTimes.timestampToTime(new Date());
      var data = {
        id: 0,
        name: this.backList.userName,
        postcode: this.backList.mailbox,
        phone: this.backList.phone,
        address: this.backList.address,
        weight: "1",
        englishName: "",
        productName: this.backList.productName,
        dedare: "18",
        quantity: Number(this.backList.quantity),
        image: this.backList.img,
        note: "",
        clientName: this.InfoData.userName,
        enterDate: time,
        orderId: this.backList.orderNo,
        orderId1: "",
        status: 0,
        attributes: "",
        price: "0",
        purchaseMode: 0,
        purchasePrice: 0,
        collectionStatus: 0,
        shipDate: "",
        consignee_state: "",
        consignee_city: "",
        product_id: "",
        trade_type: this.backList.transitionIndex,
        country: "",
        order_id: "",
        freight: 0,
        link: "",
        platformorder: "",
        trade_type1: "",
        length: 0,
        width: 0,
        high: 0,
        freightprofit: 0,
        userId: this.InfoData.id,
      };

      // 备注
      data.note =
        "--" +
        this.backList.remarks +
        `--订单更新时间：${time}` +
        "操作人：" +
        this.InfoData.userName;

      // 提示
      if (data.phone == "") {
        this.$message({
          message: "请输入收件人手机号码",
          center: true,
          duration: 800,
          type: "error",
        });
        return;
      }
      if (data.name == "") {
        this.$message({
          message: "请输入收件人名字",
          center: true,
          duration: 800,
          type: "error",
        });
        return;
      }
      if (data.postcode == "") {
        this.$message({
          message: "请输入收件人邮箱",
          center: true,
          duration: 800,
          type: "error",
        });
        return;
      }
      if (data.address == "") {
        this.$message({
          message: "请输入收件人地址",
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
      this.backList.state = false;
      this.$axios({
        url: "/sigaoyi/NEWaddlogistics",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.changeStatus(this.backList.id);
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.backList.state = true;
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
          this.backList.state = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 修改状态
    changeStatus(id) {
      this.$axios({
        url: "/sigaoyi/DomesticReturn",
        method: "POST",
        params: {
          invoicingId: id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          this.rowList.status = "已退回";
        })
        .catch((err) => {
          console.log("err ==>", err);
        });
    },
    // 编辑
    handleEdit(index, row) {
      this.$router.push({
        name: "PurchaseCompileDefault",
        query: {
          id: row.id,
        },
      });
      let obj = {
        titleB: `库存${row.id}列表`,
        isChildB: false,
        routerSrc: "PurchaseCompileDefault",
        isRoute: false,
        query: { id: row.id },
      };
      this.setPagingList(obj);
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.clickSearch(this.currentPage, this.pageSize, true);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search(this.currentPage, this.pageSize);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 初始获取数据
    getData(pages, amount) {
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

      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWinStock",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          pages: pages,
          amount: amount,
        },
      })
        .then((result) => {
          console.log(result);
          this.tableLoading = false;
          if (result.data.Code == 200) {
            let obj = {
              3: "待出库",
              4: "已出库",
              5: "已退回",
            };
            var d = new Date();
            var timer = d.getTime();
            // 表格处理
            result.data.invoicings.forEach((e) => {
              e["storageTime1"] = e.storageTime;
              e.storageTime = dateFormats.dateFormat(e.storageTime);
              if (e.deliveuTime == null) {
                e["deliveuTime1"] = "";
              } else {
                e["deliveuTime1"] = dateFormats.dateFormat(e.deliveuTime);
              }
              e["day"] = timer - e.storageTime1;
              e.day = parseInt(e.day / 1000 / 24 / 60 / 60);
            });
            // 总数
            this.total = result.data.page.total;
            // 总采购金额
            this.totalPurchasePrice = result.data.sumPurchasePrice;
            // 表格
            this.tableData = result.data.invoicings;
            this.tableData.forEach((e) => {
              for (const key in obj) {
                if (e.status == key) {
                  e.status = obj[key];
                }
              }
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
    // 表格上传图片
    uploading(index, row, e) {
      // uploadPdf
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let url = "/sigaoyi/invoicingupload";

      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          this.$refs.uploadInt.value = null;
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
            row.img = result.data.path;
            this.saveList(row);
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
          this.$refs.uploadInt.value = null;
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
    // 保存列表
    saveList(row) {
      this.$axios({
        url: "/sigaoyi/updateInvoicingImg",
        method: "POST",
        params: {
          invoicingId: row.id,
          imgUrl: row.img,
        },
      })
        .then((result) => {})
        .catch((err) => {});
    },
    ...homeActions(["setPagingList"]),
  },
};
</script>
<style lang="less" scoped>
</style>
