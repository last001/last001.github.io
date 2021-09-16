<template>
  <div class="staffCommission">
    <div class="main" v-title data-title="员工提成"></div>
    <div class="box">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>财务管理</el-breadcrumb-item>
          <el-breadcrumb-item>消费明细</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="staffCommissionInfo">
        <div class="search">
          <span>员工名字：</span>
          <input ref="searchInputVal" type="text" placeholder="请输入" />
          <el-button type="success" icon="el-icon-refresh-right" size="small"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="search()"
            >搜索</el-button
          >
        </div>
        <div class="table">
          <div class="addBtn clearfix">
            <el-button
              class="fr"
              @click="gotoAdd()"
              size="small"
              type="primary"
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
              border
              @selection-change="handleSelectionChange"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="staffName"
                label="员工名字"
              ></el-table-column>
              <el-table-column
                prop="AllOrder"
                label="总订单量"
              ></el-table-column>
              <el-table-column
                prop="Allmoney"
                label="总采购费用"
              ></el-table-column>
              <el-table-column
                prop="AllFreight"
                label="总运费"
              ></el-table-column>
              <el-table-column prop="AllPrice" label="总售价"></el-table-column>
              <el-table-column
                prop="AllProfit"
                label="总利润"
              ></el-table-column>
              <el-table-column
                prop="CommissionRate"
                label="提成比例"
              ></el-table-column>
              <el-table-column
                prop="CommissionMoney"
                label="提升金额"
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
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="total,slot"
              :total="tableData.length"
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
              :total="tableData.length"
            >
              <span class="ensure-btn fr" @click="clickTrue()">确定</span>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- <footerDiv></footerDiv> -->
    </div>
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/staffCommission/staffCommission.css";
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
      //  分页 currentPage
      currentPage: 1,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {},
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    // 搜索
    search() {
      this.$nextTick(() => {
        console.log("inputVal ==>", this.$refs.searchInputVal.value);
        // 发请求
      });
    },
    // 表格
    handleSelectionChange() {},
    // 编辑
    handleEdit(index, row) {
      console.log("index,row ==>", index, row);
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData.splice(val);
    },
    // 去第几页
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      let abc = this.pageSize * (val - 1);
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
    gotoAdd() {
      // this.$router.push({name:"StaffCommissionEditor",query:{flag:true}})
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>