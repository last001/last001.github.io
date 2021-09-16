<template>
  <div class="staffMangemenDefault">
    <div class="box">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="staffManagementInfo">
        <div class="searchInt">
          <div class="search">
            <span>公司名字：</span>
            <input type="sreach" placeholder="请输入" />
          </div>
          <div class="btn">
            <el-button type="info" icon="el-icon-refresh-right" size="small"
              >重置</el-button
            >
            <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
          </div>
        </div>
        <div class="table">
          <div class="add fr">
            <el-button
              @click="GotoAdd()"
              type="primary"
              size="small"
              icon="el-icon-add-location"
              >添加</el-button
            >
          </div>
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
              @selection-change="handleSelectionChange"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="userName"
                label="账号名字"
              ></el-table-column>
              <el-table-column prop="company" label="公司"></el-table-column>
              <el-table-column prop="phone" label="手机号码"></el-table-column>
              <el-table-column
                prop="AllorderNum"
                label="总订单数"
              ></el-table-column>
              <el-table-column
                prop="AtPersentUnfilledOrder"
                label="当前未发货订单数"
                width="150"
              ></el-table-column>
              <el-table-column
                prop="UnpaidFreightOrder"
                label="未付运费订单"
              ></el-table-column>
              <el-table-column
                prop="PayForAnotherFreight"
                label="代付费用"
              ></el-table-column>
              <el-table-column
                prop="userNameBalance"
                label="账号余额"
              ></el-table-column>
              <el-table-column
                prop="Allrecharge"
                label="累计充值"
              ></el-table-column>
              <el-table-column
                prop="userNameOWEcollection"
                label="账号欠费催收"
              ></el-table-column>
              <el-table-column
                prop="AllConsumption"
                label="累计消费"
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
                  <el-button
                    type="text"
                    @click="collection(scope.$index, scope.row)"
                  >
                    催收
                  </el-button>
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
              :total="copyTableData.length"
            >
              <span class="blockText">显示</span>
            </el-pagination>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 3, 4, 5]"
              :page-size="5"
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
import "../../../assets/less/staffManagement/staffManagement.less";
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
          userName: "王者01",
          company: "思高易有限公司",
          phone: "13888888888",
          AllorderNum: "5000",
          AtPersentUnfilledOrder: "150",
          UnpaidFreightOrder: "200",
          PayForAnotherFreight: "10000",
          userNameBalance: "9999",
          Allrecharge: "999999",
          userNameOWEcollection: "0",
          AllConsumption: "99999",
        },
        {
          userName: "王者02",
          company: "001",
          phone: "13777777777",
          AllorderNum: "5000",
          AtPersentUnfilledOrder: "150",
          UnpaidFreightOrder: "200",
          PayForAnotherFreight: "10000",
          userNameBalance: "9999",
          Allrecharge: "999999",
          userNameOWEcollection: "0",
          AllConsumption: "99999",
        },
        {
          userName: "王者03",
          company: "002",
          phone: "13666666666",
          AllorderNum: "5000",
          AtPersentUnfilledOrder: "150",
          UnpaidFreightOrder: "200",
          PayForAnotherFreight: "10000",
          userNameBalance: "9999",
          Allrecharge: "999999",
          userNameOWEcollection: "0",
          AllConsumption: "99999",
        },
        {
          userName: "王者03",
          company: "002",
          phone: "13666666666",
          AllorderNum: "5000",
          AtPersentUnfilledOrder: "150",
          UnpaidFreightOrder: "200",
          PayForAnotherFreight: "10000",
          userNameBalance: "9999",
          Allrecharge: "999999",
          userNameOWEcollection: "0",
          AllConsumption: "99999",
        },
      ],
      //  分页 currentPage
      currentPage: 1,
    };
  },
  created() {
    // 分页复制对象
    this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    // 表格
    handleSelectionChange() {},
    // 编辑
    handleEdit(index, row) {
      console.log("index,row ==>", index, row);
      this.$router.push({
        name: "StaffManagementEditor",
        query: { flag: false, row: JSON.stringify(row) },
      });
    },
    // 崔收
    collection(index, row) {},
    // 分页事件 每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(val);
    },
    // 去第几页
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      let abc = this.pageSize * (val - 1);
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(0, abc);
      this.tableData.splice(this.pageSize);
      //   console.log('this.pageSize ==>',this.pageSize)
      //   this.tableData = a.splice(this.pageSize)
      console.log("this.tableData ==>", this.tableData);
      // console.log("a ==>",a)
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
      // console.log('cccccccccc ==>', this.currentPage)
    },
    // 添加
    GotoAdd() {
      this.$router.push({
        name: "StaffManagementEditor",
        query: { flag: true },
      });
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>

<style>
</style>