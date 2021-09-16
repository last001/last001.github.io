<template>
  <div class="department">
    <div class="main" v-title :data-title="staffName"></div>
    <div class="dandruff">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        <el-breadcrumb-item>绩效管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{staffName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="v-department">
      <div class="search">
        <span>日期：</span>
        <input type="sreach" placeholder="示例:2021-01" />
        <el-button type="info" size="small" icon="el-icon-refresh-right">重置</el-button>
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="table">
        <div class="v-table">
          <div class="btn clearfix">
            <el-button class="fr" type="danger" icon="el-icon-delete-location" size="small"
              >删除</el-button
            >
            <el-button class="fr" type="success" icon="el-icon-s-promotion" size="small"
              >导出数据</el-button
            >
            <el-button
              class="fr"
              type="primary"
              icon="el-icon-add-location"
              size="small"
              @click="gotoStaffInfo()"
              >添加</el-button
            >
            <el-button class="fr" type="success" icon="el-icon-caret-right" size="small"
              >下一个月</el-button
            >
            <el-button class="fr" type="primary" icon="el-icon-caret-left" size="small"
              >上一个月</el-button
            >
          </div>
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="copyTableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe
              show-summary
              :header-cell-style="getRowClass"
              :summary-method="getSummaries"
            >
              <el-table-column label="财务预算表(2021-02)">
                <template slot="empty">
                  <span class="iconfont icon-zanwushuju"></span>
                  <div>暂无数据</div>
                </template>
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="staffName">
                  <template slot="header">
                    <el-tooltip
                      class="item"
                      effect="Dark"
                      content="点击回到部门"
                      placement="top"
                      popper-class="deparTooltip"
                    >
                      <div class="goback" @click="GoBack()">部门/名字</div>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="工资薪金">
                  <el-table-column
                    prop="PayMoney"
                    label="员工工资"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="管理费用">
                  <el-table-column
                    prop="socialMoney"
                    label="社保费"
                  ></el-table-column>
                  <el-table-column
                    prop="staffMoney"
                    label="职工福利费"
                  ></el-table-column>
                  <el-table-column
                    prop="renMoney"
                    label="租金(水，电费)"
                    width="150"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="销售费用">
                  <el-table-column
                    prop="purchaseMoney"
                    label="采购费"
                  ></el-table-column>
                  <el-table-column
                    prop="logisticsMoney"
                    label="物流费"
                  ></el-table-column>
                  <el-table-column
                    prop="expressageMoney"
                    label="快递费"
                  ></el-table-column>
                  <el-table-column
                    prop="VPSmoney"
                    label="VPS"
                  ></el-table-column>
                  <el-table-column
                    prop="otherMoney"
                    label="其他杂项支出"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="办公费用">
                  <el-table-column
                    prop="workMoney"
                    label="办公费用"
                  ></el-table-column>
                </el-table-column>
                <el-table-column prop="AllMoney" label="合计"></el-table-column>
                <el-table-column
                  prop="proportion"
                  label="部门费用占%比"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="departmentNumber"
                  label="部门人数"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      class="Edit"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <!-- table two -->
            <el-table
              ref="multipleTable1"
              :data="tableData1"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe
              show-summary
              label-class-name="table1"
              :summary-method="getSummaries1"
              max-height="50"
            >
              <el-table-column label="财务预算表(2020-08)">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="部门名字">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      class="staffName"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      {{ scope.row.staffName }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="工资薪金">
                  <el-table-column
                    prop="PayMoney"
                    label="员工工资"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="管理费用">
                  <el-table-column
                    prop="socialMoney"
                    label="社保费"
                  ></el-table-column>
                  <el-table-column
                    prop="staffMoney"
                    label="职工福利费"
                  ></el-table-column>
                  <el-table-column
                    prop="renMoney"
                    label="租金(水，电费)"
                    width="150"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="销售费用">
                  <el-table-column
                    prop="purchaseMoney"
                    label="采购费"
                  ></el-table-column>
                  <el-table-column
                    prop="logisticsMoney"
                    label="物流费"
                  ></el-table-column>
                  <el-table-column
                    prop="expressageMoney"
                    label="快递费"
                  ></el-table-column>
                  <el-table-column
                    prop="VPSmoney"
                    label="VPS"
                  ></el-table-column>
                  <el-table-column
                    prop="otherMoney"
                    label="其他杂项支出"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="办公费用">
                  <el-table-column
                    prop="workMoney"
                    label="办公费用"
                  ></el-table-column>
                </el-table-column>
                <el-table-column prop="AllMoney" label="合计"></el-table-column>
                <el-table-column
                  prop="proportion"
                  label="部门费用占%比"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="departmentNumber"
                  label="部门人数"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      class="Edit"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="total,slot"
              :total="copyTableData.length"
            >
              <span class="blockText">显示</span>
            </el-pagination>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 5, 10, 12]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next, slot,jumper"
              :total="copyTableData.length"
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
import "../../../assets/less/performance/department/department.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //   xls
      tableData: [],
      copyTableData: [
        {
          staffName: "田0",
          PayMoney: "100",
          socialMoney: "138",
          staffMoney: "100",
          renMoney: "1500",
          purchaseMoney: "222",
          logisticsMoney: "10000",
          expressageMoney: "9999",
          VPSmoney: "999999",
          otherMoney: "50",
          workMoney: "99999",
          proportion: "",
          departmentNumber: "2",
        },
        {
          staffName: "田1",
          PayMoney: "200",
          socialMoney: "138",
          staffMoney: "100",
          renMoney: "1500",
          purchaseMoney: "222",
          logisticsMoney: "10000",
          expressageMoney: "9999",
          VPSmoney: "999999",
          otherMoney: "50",
          workMoney: "99999",
          proportion: "",
          departmentNumber: "2",
        },
        {
          staffName: "田2",
          PayMoney: "300",
          socialMoney: "138",
          staffMoney: "100",
          renMoney: "1500",
          purchaseMoney: "222",
          logisticsMoney: "1000",
          expressageMoney: "9999",
          VPSmoney: "999999",
          otherMoney: "50",
          workMoney: "99999",
          proportion: "",
          departmentNumber: "2",
        },
      ],
      tableData1: [
        {
          staffName: "田3",
          PayMoney: "0",
          socialMoney: "138",
          staffMoney: "100",
          renMoney: "1500",
          purchaseMoney: "222",
          logisticsMoney: "10000",
          expressageMoney: "9999",
          VPSmoney: "999999",
          otherMoney: "0",
          workMoney: "99999",
          AllMoney: "0",
          proportion: "20%",
          departmentNumber: "2",
        },
      ],
      //   总计
      AllMoney: 0,
      //   部门费用占%比
      proportion: "",
      //   table footer 第一个 data
      firstData: [],
      //  分页 currentPage
      currentPage: 1,
      //   传过来的部门名字
      staffName: "",
    };
  },
  created() {
    this.setWstateStatus(true);
    this.$nextTick(() => {
      this.firstDataSort();
    });
    this.toalt();

    this.staffName = this.$route.query.name;
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    // 表格颜色
    getRowClass(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex)
      //   console.log("row, column, rowIndex, columnIndex ==>",row, column, rowIndex, columnIndex)
      if (row.rowIndex != 0) {
        return {
          background: "#63acf6",
          color: "#FFF",
        };
      } else {
        return "";
      }
    },
    // 编辑
    handleEdit(index, row) {
      console.log("row ==>", row);

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
          name: "StaffInfo",
          query: {
            row: JSON.stringify(row),
            name: this.staffName,
            rowStatus: true,
          },
        });
      }, 400);
    },
    // table footer 第一个
    getSummaries(param) {
      const { columns, data } = param;
      //   console.log("columns列 ==>", columns);
      //   console.log("data行 ==>", data);
      //   const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          column.colSpan = 2;
          this.firstData[index] = "总价";
        }
        if (index == 1) {
          column.colSpan = 0;
        }
        if (index == columns.length - 2) {
          this.firstData[index] = "--";
        }

        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          this.firstData[index - 1] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
        if (index === 12) {
          return (this.firstData[index] = "100%");
        }
      });
      return this.firstData;
    },
    // table footer 第二个
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          column.colSpan = 2;
          sums[index] = "占预算百分比";
        }
        if (
          index == columns.length - 2 ||
          index == columns.length - 3 ||
          index == columns.length - 4
        ) {
          sums[index] = "--";
          //   console.log("sums ==>", sums);
        }
        // console.log("index ==>",index)
        this.firstData.map((v, i) => {
          // console.log("v ==>",v)
          if (i != 0 && i != 12 && i != 13) {
            if (i == index) {
              v = v / this.firstData[11];
              v = v.toFixed(4) * 100 + "%";
              sums.push(v);
            }
          }
        });
      });
      // console.log('sums ==>',sums)
      return sums;
    },
    // 合计的值
    toalt() {
      this.copyTableData.forEach((e) => {
        this.AllMoney = 0;
        for (const key in e) {
          if (key != "staffName" && key != "departmentNumber") {
            e[key] = Number(e[key]);
            this.AllMoney += e[key];
            e["AllMoney"] = this.AllMoney;
          }
        }
      });
    },
    // this.firstData 排序
    firstDataSort() {
      this.firstData.map((e, index) => {
        if (!isNaN(Number(e))) {
          this.firstData.sort(function (v1, v2) {
            return v2 - v1;
          });
        }
      });
      //   console.log("this.firstData ==>",this.firstData)
      //   console.log("this.firstData[0] ==>", this.firstData[0]);
      this.AllProportion();
    },
    // 百分比
    AllProportion() {
      this.copyTableData.forEach((e) => {
        this.proportion = 0;
        for (const key in e) {
          if (key != "staffName" && key != "departmentNumber") {
            e[key] = Number(e[key]);
            if (this.firstData.length) {
              clearInterval(this.timer);
            }
            this.proportion = e[key] / this.firstData[1];
            e.proportion = Number(this.proportion).toFixed(3) * 100 + "%";
          }
        }
      });
    },
    // 点击添加
    gotoStaffInfo() {
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
        this.$router.push({ name: "StaffInfo", query: { rowStatus: false } });
      }, 400);
    },
    // 返回上一级
    GoBack() {
      let tooltip = (document.querySelector(
        ".el-tooltip__popper"
      ).style.display = "none");
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
        this.$router.back();
      }, 400);
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>