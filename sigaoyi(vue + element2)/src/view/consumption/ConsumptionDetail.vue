<template>
  <div class="ConsumptionDetail">
    <div class="main" v-title data-title="消费明细"></div>
    <iframe :src="ifarmSrc"></iframe>
    <div class="box">
      <div class="consumptionInfo">
        <div class="viewBox">
          <div class="detailMoney">
            <div v-for="(item, index) in detailMoneyData" :key="index">
              <span>{{ item.text }}</span>
              <span>{{ item.money }}</span>
            </div>
            <div>
              <el-button @click="GotoRDraw(0)">提现</el-button>
              <el-button type="primary" @click="GotoRDraw(1)">充值</el-button>
            </div>
          </div>
        </div>
        <div class="search">
          <div class="one" v-show="!openCloseState">
            <div>
              <span class="text">消费类型：</span>
              <el-select
                v-model="radioTypeIndex"
                placeholder="请选择"
                @change="sreachIcon(currentPage, pageSize, true)"
              >
                <el-option
                  v-for="item in radioTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">审核状态：</span>
              <el-select
                v-model="radioStatusIndex"
                placeholder="请选择"
                @change="sreachIcon(currentPage, pageSize, true)"
              >
                <el-option
                  v-for="item in radioStatusList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">申请时间：</span>
              <el-date-picker
                v-model="inputList.applicationDate"
                clearable
                type="date"
                placeholder="选择日期"
                @change="sreachIcon(currentPage, pageSize, true)"
              >
              </el-date-picker>
            </div>
            <div>
              <span class="text">审核时间：</span>
              <el-date-picker
                v-model="inputList.auditDate"
                clearable
                type="date"
                placeholder="选择日期"
                @change="sreachIcon(currentPage, pageSize, true)"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="two">
            <div>
              <span class="text">申请人：</span>
              <input
                @keydown.enter="sreachIcon(currentPage, pageSize, true)"
                type="text"
                placeholder="请输入"
                v-model="inputList.applicationName"
              />
            </div>
            <div>
              <span class="text">平台单号：</span>
              <input
                type="text"
                placeholder="请输入"
                @keydown.enter="sreachIcon(currentPage, pageSize, true)"
                v-model="inputList.numbering"
              />
            </div>
            <div>
              <span class="text">订单编号：</span>
              <input
                type="text"
                placeholder="请输入"
                @keydown.enter="sreachIcon(currentPage, pageSize, true)"
                v-model="inputList.orderId"
              />
            </div>
            <div class="btn">
              <el-button size="small" @click="resetIniput()">重置</el-button>
              <el-button
                type="primary"
                size="small"
                @click="sreachIcon(currentPage, pageSize, true)"
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
        <div class="xls">
          <div class="xls_btn">
            <el-button
              type="primary"
              icon="el-icon-s-promotion"
              size="small"
              @click="exportDetail()"
              >导出消费明细</el-button
            >
            <i class="el-icon-refresh-right" @click="getDetailsInfo()"></i>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            maxHeight="665"
            stripe
            @selection-change="handleSelectionChange"
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
            <el-table-column
              prop="numbering"
              label="编号"
              align="center"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="costStatus"
              label="消费类型"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="amount"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope">
                <el-popover
                  placement="right-start"
                  popper-class="order-popover"
                  width="200"
                  trigger="hover"
                  :open-delay="1000"
                >
                  <div class="lagerImg">
                    <img :src="scope.row.img" :onerror="errorImage" />
                    <!-- :preview-src-list="srcList" -->
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <img
                      :src="scope.row.img"
                      :onerror="errorImage"
                      width="50"
                      height="50"
                    />
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="简介"
              align="center"
              width="210"
            ></el-table-column>
            <el-table-column
              prop="applicationName"
              label="申请人"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="applicationDate"
              label="申请时间"
              align="center"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="auditStatus"
              label="审核状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="auditName"
              label="审核人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="auditDate"
              label="审核时间"
              align="center"
              width="160"
            ></el-table-column>
            <el-table-column label="操作" align="center" width="150px">
              <template slot-scope="scope">
                <div v-if="scope.row.isActive" class="btn">
                  <div class="btnList" v-if="infoData.statu == '0'">
                    <el-button
                      size="mini"
                      type="success"
                      @click="pass(scope.$index, scope.row)"
                      >通过</el-button
                    >
                    <el-button
                      size="mini"
                      type="default"
                      @click="reject(scope.$index, scope.row)"
                      >驳回</el-button
                    >
                  </div>
                  <div v-else class="text">审核中</div>
                </div>
                <div v-else class="completed">
                  <el-button size="mini" type="text">已完成</el-button>
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
            layout="sizes, prev, pager, next, slot,jumper"
            :total="total"
            :pager-count="11"
          >
            <span class="ensure-btn fr" @click="clickTrue()">确定</span>
          </el-pagination>
        </div>
      </div>
      <!-- 驳回 -->
      <div class="rejectPopups">
        <el-dialog title="驳回" :visible.sync="rejectStatus" width="30%">
          <div class="remark">
            <span class="text">驳回理由：</span>
            <textarea
              v-model="reasonText"
              cols="30"
              rows="6"
              placeholder="请输入"
            ></textarea>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="rejectconfirm">确 定</el-button>
            <el-button @click="rejectStatus = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// navbar 导航栏
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/consumptionDetail/consumptionDetail.css";
import timestampToTimes from "../../assets/js/timestampToTime";
import dateFormats from "../../assets/js/dateFormat";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

export default {
  data() {
    return {
      errorImage: 'this.src="' + require("../../assets/img/errorImg.png") + '"',
      infoData: {
        balance: 0,
        company: "",
        id: "",
        ip: "",
        mac: "",
        mail: "",
        phoneNumber: "",
        referrer: "",
        referrerNumber: "",
        registrationTime: "",
        reviewStatus: "",
        statu: "",
        updateTime: 0,
        userName: "",
        userPassword: "",
      },
      //  detailMoneyData
      detailMoneyData: [
        { text: "我的总资产(元)", money: "0.00" },
        { text: "累计收益(元)", money: "0.00" },
        { text: "今日收益(元)", money: "0.00" },
      ],
      // 企业个人状态码
      accountType: "true",
      // redioType
      radioTypeIndex: "99",
      radioTypeList: [
        { name: "全部", value: "99" },
        { name: "充值", value: 0 },
        { name: "提现", value: 1 },
        { name: "扣款", value: 2 },
      ],
      //   radioStatus
      radioStatusIndex: "99",
      radioStatusList: [
        { name: "全部", value: "99" },
        { name: "审核中", value: "0" },
        { name: "审核通过", value: "1" },
        { name: "驳回", value: "2" },
      ],
      //   inputList
      inputList: {
        applicationName: "",
        numbering: "",
        orderId: "",
        applicationDate: "",
        auditDate: "",
      },
      // 展开/收起
      openCloseState: false,
      openCloseText: "收起",
      openCloseCionSrc: "el-icon-arrow-up",
      //   xls
      tableData: [],
      // 表格loading
      tableLoading: false,
      copyTableData: [],
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      //   驳回弹出层状态值
      rejectStatus: false,
      //   驳回row
      rejectRow: {},
      //  驳回的index
      rejectIndex: "",
      // 驳回弹出层 reasonText
      reasonText: "",
      ifarmSrc: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
      this.getDetailsInfo();
    });
  },
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "num", "InfoData"]),
  },
  methods: {
    // 去充值提现页面
    GotoRDraw(number) {
      this.$router.push({ name: "RechargeWidthdraw", query: { id: number } });
      //   调用sideNavbar的路由检测
      //   this.$parent.$refs.sideNavbar.testRouter();
    },
    //  重置
    resetIniput() {
      for (const key in this.inputList) {
        this.inputList[key] = "";
      }
      this.radioTypeIndex = "99";
      this.radioStatusIndex = "99";
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
    //  搜索
    sreachIcon(pages, amount, flag) {
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
        pages: pages,
        amount: amount,
        costStatus: this.radioTypeIndex,
        auditStatus: this.radioStatusIndex,
        userId: this.InfoData.id,
        applicationName: this.inputList.applicationName,
        numbering: this.inputList.numbering,
        applicationDate: "",
        auditDate: "",
        orderId: this.inputList.orderId,
      };

      //   审核时间 + 申请时间
      if (this.inputList.auditDate == "" || this.inputList.auditDate == null) {
        data.auditDate = "";
      } else {
        data.auditDate = dateFormats.dateFormat(this.inputList.auditDate);
      }

      if (
        this.inputList.applicationDate == "" ||
        this.inputList.applicationDate == null
      ) {
        data.applicationDate = "";
      } else {
        data.applicationDate = dateFormats.dateFormat(
          this.inputList.applicationDate
        );
      }

      if (flag) {
        // 点击搜索按钮或者在input框的键盘事件
        data.pages = 1;
        data.amount = 30;
        this.currentPage = 1;
        this.pageSize = 30;
      } else {
        // 选择页数 或者 每页多少条数
        data.pages = pages;
        // 选择的x条/页 x>总数
        if (pages > this.total) {
          data.pages = 1;
        }
      }

      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWconsumerdetails",
        method: "POST",
        params: data,
      })
        .then((result) => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);

          if (result.data.Code == 200) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            for (let i = 0; i < result.data.finances.length; i++) {
              if (result.data.finances[i].costStatus == 0) {
                result.data.finances[i].costStatus = "充值";
              } else if (result.data.finances[i].costStatus == 1) {
                result.data.finances[i].costStatus = "提现";
              } else if (result.data.finances[i].costStatus == 2) {
                result.data.finances[i].costStatus = "扣款";
              }
              //   时间格式 转化
              result.data.finances[
                i
              ].applicationDate = timestampToTimes.timestampToTime(
                result.data.finances[i].applicationDate
              );
              if (result.data.finances[i].auditDate != undefined) {
                result.data.finances[
                  i
                ].auditDate = timestampToTimes.timestampToTime(
                  result.data.finances[i].auditDate
                );
              }
              //  审核状态
              if (result.data.finances[i].auditStatus == 0) {
                result.data.finances[i].auditStatus = "审核中";
              } else if (result.data.finances[i].auditStatus == 1) {
                result.data.finances[i].auditStatus = "审核通过";
              } else if (result.data.finances[i].auditStatus == 2) {
                result.data.finances[i].auditStatus = "驳回";
              }

              if (result.data.finances[i].img == "") {
                result.data.finances[i].img =
                  "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
              }

              if (result.data.finances[i].auditStatus == "审核中") {
                result.data.finances[i]["isActive"] = true;
              } else {
                result.data.finances[i]["isActive"] = false;
              }
            }
            this.copyTableData = result.data.finances;
            this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
            this.total = result.data.page.total;
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
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 表格
    handleSelectionChange() {},
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.sreachIcon(this.currentPage, this.pageSize, false);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.sreachIcon(this.currentPage, this.pageSize, false);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 导出消费明细 按钮
    exportDetail() {
      let data = {
        userName: this.InfoData.userName,
        auditDate: "",
        applicationDate: "",
      };

      //   审核时间 + 申请时间
      if (this.inputList.auditDate == "" || this.inputList.auditDate == null) {
        data.auditDate = "";
      } else {
        data.auditDate = dateFormats.dateFormat(this.inputList.auditDate);
      }

      if (
        this.inputList.applicationDate == "" ||
        this.inputList.applicationDate == null
      ) {
        data.applicationDate = "";
      } else {
        data.applicationDate = dateFormats.dateFormat(
          this.inputList.applicationDate
        );
      }

      // 请求
      let loading = this.$loading({
        lock: false,
        text: "导出中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWExpenseList",
        method: "POST",
        params: data,
      })
        .then((result) => {
          loading.close();
          if (result.data.code == 200) {
            this.ifarmSrc = "http://www.ec-sigaoyi.com/" + result.data.path;
            setTimeout(() => {
              this.ifarmSrc = null;
            }, 500);
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
            message: "系统业务繁忙,请示后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 获取初始数组
    getDetailsInfo() {
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
      this.pageSize = 30;
      this.currentPage = 1;

      this.infoData = JSON.parse(JSON.stringify(this.InfoData));
      this.infoData.balance = Number(this.infoData.balance).toFixed(2);
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWconsumerdetails",
        method: "POST",
        params: {
          amount: this.pageSize,
          pages: this.currentPage,
          userId: this.InfoData.id,
        },
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.setInfoData(result.data.userinfo);
            this.infoData = result.data.userinfo;
            this.infoData.balance = this.infoData.balance.toFixed(2);
            this.detailMoneyData.forEach((e, i) => {
              if (i == 0) {
                e.money = result.data.userinfo.balance;
              }
            });
            if (result.data.finances.length == 0) {
              this.$notify({
                title: "请求成功",
                message: "该账号没有消费记录",
                type: "success",
                offset: 50,
              });
            } else {
              for (let i = 0; i < result.data.finances.length; i++) {
                if (result.data.finances[i].costStatus == 0) {
                  result.data.finances[i].costStatus = "充值";
                } else if (result.data.finances[i].costStatus == 1) {
                  result.data.finances[i].costStatus = "提现";
                } else if (result.data.finances[i].costStatus == 2) {
                  result.data.finances[i].costStatus = "扣款";
                }
                //   金额
                result.data.finances[i].amount = result.data.finances[
                  i
                ].amount.toFixed(2);
                //   时间格式 转化
                result.data.finances[
                  i
                ].applicationDate = timestampToTimes.timestampToTime(
                  result.data.finances[i].applicationDate
                );
                if (result.data.finances[i].auditDate != undefined) {
                  result.data.finances[
                    i
                  ].auditDate = timestampToTimes.timestampToTime(
                    result.data.finances[i].auditDate
                  );
                }
                //  审核状态
                if (result.data.finances[i].auditStatus == 0) {
                  result.data.finances[i].auditStatus = "审核中";
                } else if (result.data.finances[i].auditStatus == 1) {
                  result.data.finances[i].auditStatus = "审核通过";
                } else if (result.data.finances[i].auditStatus == 2) {
                  result.data.finances[i].auditStatus = "驳回";
                }

                if (result.data.finances[i].img == "") {
                  result.data.finances[i].img =
                    "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg";
                }

                if (result.data.finances[i].auditStatus == "审核中") {
                  result.data.finances[i]["isActive"] = true;
                } else {
                  result.data.finances[i]["isActive"] = false;
                }
                //
              }
              this.copyTableData = result.data.finances;
              this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
              this.total = result.data.page.total;
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
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 驳回
    reject(index, row) {
      this.rejectStatus = true;
      this.rejectRow = row;
      this.rejectIndex = index;
    },
    // 驳回弹出层 确定按钮
    rejectconfirm() {
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
      if (this.reasonText == "") {
        this.$message({
          message: "请输入驳回理由",
          type: "error",
          center: true,
          duration: 800,
        });
        return;
      }
      this.rejectStatus = false;
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWreject",
        method: "POST",
        params: {
          id: this.rejectRow.id,
          userName: this.InfoData.userName,
          remark: this.reasonText,
        },
      })
        .then((result) => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);

          if (result.data.Code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            this.copyTableData[this.rejectIndex].isActive = false;
            this.copyTableData[this.rejectIndex].auditStatus = "驳回";
            this.copyTableData[
              this.rejectIndex
            ].auditName = this.InfoData.userName;
            this.copyTableData[
              this.rejectIndex
            ].auditDate = timestampToTimes.timestampToTime(new Date());
            this.copyTableData[this.rejectIndex].remarks = this.reasonText;
            this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
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
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 通过
    pass(index, row) {
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
        url: "/sigaoyi/NEWthrough",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          id: row.id,
        },
      })
        .then((result) => {
          setTimeout(() => {
            this.tableLoading = false;
          }, 500);
          if (result.data.code == "200") {
            // if (result.data.userInfo.userName == this.InfoData.userName) {
            //   this.infoData.balance = result.data.userInfo.balance.toFixed(2);
            // }
            // this.setInfoData(result.data.userInfo);
            this.copyTableData[index].auditName = this.InfoData.userName;
            this.copyTableData[index].auditStatus = "审核通过";
            this.copyTableData[
              index
            ].auditDate = timestampToTimes.timestampToTime(new Date());
            this.copyTableData[index].isActive = false;
            this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
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
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    ...homeActions(["setWstateStatus", "setNum", "setInfoData"]),
  },
};
</script>