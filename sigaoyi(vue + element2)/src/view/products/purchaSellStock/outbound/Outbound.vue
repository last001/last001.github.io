<template>
  <div class="outbound">
    <div class="v-outbound">
      <div class="main" v-title data-title="出库记录"></div>
      <div class="outboundInfo">
        <div class="search">
          <div class="one">
            <div>
              <span class="text">单号：</span>
              <input
                type="text"
                v-model="searchList.order"
                placeholder="请输入"
                @keydown.enter="search(true)"
              />
            </div>
            <div>
              <span class="text">渠道：</span>
              <el-select
                clearable
                v-model="searchList.tradeTypeIndex"
                placeholder="请选择"
                @change="search(true)"
              >
                <el-option
                  v-for="item in searchList.trade_type"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">操作人：</span>
              <input
                type="text"
                v-model="searchList.operator"
                placeholder="请输入"
                @keydown.enter="search(true)"
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
            <div v-else>
              <span class="text">出库时间：</span>
              <el-date-picker
                v-model="searchList.godownTime"
                @change="search(true)"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="btn" v-show="!openCloseState">
            <el-button size="small" @click="reset()">重置</el-button>
            <el-button type="primary" size="small" @click="search(true)"
              >搜索</el-button
            >
            <!-- 收起 展开 -->
            <div class="open_close" @click="openClose()">
              <span>{{ openCloseText }}</span>
              <span><i :class="openCloseCionSrc"></i></span>
            </div>
          </div>
        </div>
        <div class="pur-bottom">
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @select="onTableSelect"
              @select-all="setAll"
              maxHeight="640"
              stripe
              v-loading="tableLoading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="order" label="单号"></el-table-column>
              <el-table-column
                prop="trade_type1"
                label="渠道"
              ></el-table-column>
              <el-table-column prop="operator" label="操作人"></el-table-column>
              <el-table-column
                prop="deliveryTime"
                label="出库时间"
              ></el-table-column>
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
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/less/outbound/outbound.less";
import dateFormats from "../../../../assets/js/dateFormat";
import timestampToTimes from "../../../../assets/js/timestampToTime";
import uploadPdfs from "../../../../assets/js/uploadPdf";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // search
      searchList: {
        order: "",
        tradeTypeIndex: "",
        trade_type: [
          { name: "全部", value: "" },
          { name: "E特快", value: "ETK" },
          { name: "佐川特货", value: "佐川" },
          //   { name: "佐川普货", value: "RB-DS3" },
          { name: "佐川普货(义达)", value: "JP-DS" },
          //   { name: "佐川加急", value: "RB-DS3" },
          { name: "佐川普货-LTW", value: "LTW" },
          { name: "佐川普货-DPC", value: "DPC" },
          { name: "青岛-免抛", value: "QDMP" },
          { name: "佐川带电", value: "JPSADD" },
          { name: "黑猫3cm", value: "黑猫" },
          { name: "黑猫3cm带电", value: "黑猫带电" },
          { name: "黑猫3cm化妆品", value: "黑猫3cm化妆品" },
          { name: "黑猫普货5cm", value: "黑猫普货5cm" },
          { name: "黑猫带电5cm", value: "黑猫带电5cm" },
          { name: "Qxpress", value: "Qxpress" },
          { name: "EMS", value: "EMS" },
          { name: "免抛", value: "PK0009" },
          { name: "CNE", value: "CNE" },
          { name: "日邮小包", value: "日邮小包" },
          { name: "国内退货", value: "国内退货" },
        ],
        operator: "",
        godownTime: "",
      },
      // 收起
      openCloseState: false,
      openCloseText: "收起",
      openCloseCionSrc: "el-icon-arrow-up",
      //   xls
      tableData: [],
      tableLoading: false,
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      total: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    next();
  },
  created() {
    document.title = "库存记录";
    this.search(true);
  },
  computed: {
    ...homeState(["InfoData"]),
  },
  methods: {
    // 重置
    reset() {
      this.godownTime = "";
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
    // 搜索
    search(flag) {
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
      if (flag) {
        this.currentPage = 1;
        this.pageSize = 30;
      }

      let data = {
        pages: this.currentPage,
        amount: this.pageSize,
        order: this.searchList.order,
        operator: this.searchList.operator,
        trade_type: this.searchList.tradeTypeIndex,
        deliveryTime: "",
        deliveryTime1: "",
      };

      //    开始时间 +  结束时间
      if (
        this.searchList.godownTime == "" ||
        this.searchList.godownTime == null
      ) {
        data.deliveryTime = "";
        data.deliveryTime1 = "";
      } else {
        data.deliveryTime = dateFormats.dateFormat(
          this.searchList.godownTime[0]
        );
        data.deliveryTime1 = dateFormats.dateFormat(
          this.searchList.godownTime[1]
        );
      }

      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/getallshipInfos",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == 200) {
            result.data.ships.forEach((e) => {
              this.searchList.trade_type.forEach((el) => {
                if (e.trade_type == el.value) {
                  e["trade_type1"] = el.name;
                }
              });
            });
            this.tableData = result.data.ships;
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
            this.total = result.data.page.total;
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log("err ==>", err);
        });
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
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(false);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search(false);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },

    ...homeActions(["setPagingList"]),
  },
};
</script>
<style lang="less" scoped>
</style>
