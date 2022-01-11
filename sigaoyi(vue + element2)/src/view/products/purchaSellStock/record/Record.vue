<template>
  <div class="record">
    <div class="v-record">
      <div class="main" v-title data-title="出库"></div>
      <div class="recordInfo">
        <div class="search">
          <input
            type="text"
            v-model="order"
            placeholder="请输入单号"
            @keydown.enter="search()"
          />
          <el-button type="primary" size="medium" @click="search()"
            >查询</el-button
          >
        </div>
        <div class="record-table">
          <div class="table-left">
            <div class="table-title">账号余额不足</div>
            <el-table
              v-loading="tableDataLoading"
              :data="tableData"
              border
              style="width: 100%"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column prop="ClientName" label="名字">
              </el-table-column>
              <el-table-column prop="orderNum" label="单号"></el-table-column>
              <el-table-column prop="" label="提示">
                <template slot-scope="scope">
                  <span :class="scope.row.color">{{ scope.row.msg }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="table-btn">
              <el-button type="primary" size="medium" @click="sendTip()"
                >发送提示</el-button
              >
            </div>
          </div>
          <div class="table-right">
            <el-table
              v-loading="tableData1Loading"
              :data="tableData1"
              border
              style="width: 100%"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column prop="orderNum" label="单号"> </el-table-column>
              <el-table-column prop="trade_type1" label="渠道">
              </el-table-column>
              <el-table-column prop="operator" label="操作人">
              </el-table-column>
              <el-table-column prop="deliveryTime" label="出库时间">
              </el-table-column>
              <el-table-column prop="" label="出库提示">
                <template slot-scope="scope">
                  <span :class="scope.row.color">{{ scope.row.tips }}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="table-btn">
              <el-button type="primary" size="medium" @click="confirmOut()"
                >确认出库</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/less/record/record.less";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //  查询单号
      order: "",
      //   欠费
      tableData: [],
      tableDataLoading: false,
      //  可以出库
      tableData1: [],
      tableData1Loading: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    document.title = "出库";
  },
  computed: {
    ...homeState(["InfoData"]),
  },
  methods: {
    //  查询
    search() {
      if (this.order == "") {
        this.$message({
          message: "请输入要查询的单号",
          duration: 600,
          type: "warning",
          center: true,
        });
        return;
      }

      this.$axios({
        url: "/sigaoyi/ShippingInquiry",
        method: "POST",
        params: {
          order: this.order,
          userName: this.InfoData.userName,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            // 可以出库
            //   检测单号
            if (this.tableData1.length > 0) {
              if (
                this.tableData1.findIndex(
                  (target) => target.orderNum == this.order
                ) > -1
              ) {
                this.$notify({
                  title: "单号重复",
                  message: "该单号已经存在",
                  type: "warning",
                  offset: 50,
                });
                return;
              } else {
                result.data.shipInfo["color"] = "wck";
                result.data.shipInfo["tips"] = "未出库";
                this.tableData1.push(result.data.shipInfo);
                return (this.order = "");
              }
            }
            // else
            result.data.shipInfo["color"] = "wck";
            result.data.shipInfo["tips"] = "未出库";
            this.tableData1.push(result.data.shipInfo);
            this.order = "";
          } else if (result.data.Code == 201) {
            // 欠费
            result.data.arrearsDetails["color"] = "";
            //   检测单号
            if (this.tableData.length > 0) {
              if (
                this.tableData.findIndex(
                  (target) => target.orderNum == this.order
                ) > -1
              ) {
                this.$notify({
                  title: "单号重复",
                  message: "该单号已经存在",
                  type: "warning",
                  offset: 50,
                });
                return;
              } else {
                this.tableData.push(result.data.arrearsDetails);
                return (this.order = "");
              }
            }
            // else
            this.tableData.push(result.data.arrearsDetails);
            this.order = "";
            this.$notify({
              title: "余额不足",
              message: "该账号余额不足",
              type: "warning",
              offset: 50,
              duration: 2000,
            });
          } else {
            // 错误
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
    // 确认出库
    confirmOut() {
      this.tableData1Loading = true;
      this.tableData1.forEach((e) => {
        if (e.color == "cg") {
          return;
        }
        this.$axios({
          url: "/sigaoyi/addshipInfo",
          method: "POST",
          params: {
            order: e.orderNum,
            operator: e.operator,
            trade_type: e.trade_type1,
            deliveryTime: e.deliveryTime,
          },
        })
          .then((result) => {
            this.tableData1Loading = false;
            if (result.data.Code == 200) {
              // if (this.tableData.findIndex((target) => target.orderNum != this.order) > -1){}
              e.tips = result.data.msg;
              e.color = "cg";
            } else {
              e.tips = result.data.msg;
              e.color = "sbai";
            }
          })
          .catch((err) => {
            console.log("err ==>", err);
            this.tableData1Loading = false;
          });
      });
    },
    // 发送提示
    sendTip() {
      var data = {
        code: "",
        userName: "",
      };
      this.tableData.forEach((e) => {
        data.code += e.arrears + ",";
        data.userName += e.ClientName + ",";
      });
      data.code = data.code.substring(0, data.code.length - 1);
      data.userName = data.userName.substring(0, data.userName.length - 1);
      //   console.log("data ==>", data);
      //   loading
      this.tableDataLoading = true;
      this.$axios({
        url: "/sigaoyi/SMSReminder",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableDataLoading = false;
          if (result.data.Code == 200) {
            this.tableData.forEach((e) => {
              e.msg = result.data.message;
              e.color = "cg";
            });
          } else {
            this.tableData.forEach((e) => {
              e.msg = result.data.message;
              e.color = "sbai";
            });
          }
        })
        .catch((err) => {
          this.tableDataLoading = false;
          console.log("err ==>", err);
          this.tableData.forEach((e) => {
            e.msg = "系统业务繁忙,请稍后再试";
            e.color = "sbai";
          });
        });
    },
  },
};
</script>

<style lang="less">
</style>