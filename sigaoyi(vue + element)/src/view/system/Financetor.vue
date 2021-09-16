<template>
  <div class="financetor">
    <div class="main" v-title data-title="财务管理"></div>
    <div class="box">
      <div class="financeInfo">
        <div class="dandruff">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search">
          <div class="v-search">
            <span>公司名字：</span>
            <input ref="searchInputVal" type="text" placeholder="请输入" />
          </div>
          <div class="btn">
            <el-button type="info" icon="el-icon-refresh-right" size="small"
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
        </div>
        <div class="table">
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              :maxHeight="tableH + 'px'"
              stripe
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="trackingName"
                label="物流单号"
              ></el-table-column>
              <el-table-column
                prop="revolveName"
                label="运转单号"
              ></el-table-column>
              <el-table-column
                prop="addresseeName"
                label="收件人姓名"
              ></el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.ImageUrl" style="height: 50px" />
                </template>
              </el-table-column>
              <el-table-column
                prop="typeSelect"
                label="属性选项"
              ></el-table-column>
              <el-table-column prop="Num" label="数量"></el-table-column>
              <el-table-column
                prop="entryPeople"
                label="录入人"
              ></el-table-column>
              <el-table-column
                prop="deliverTime"
                label="发货时间"
              ></el-table-column>
              <el-table-column
                prop="paidInFreight"
                label="实收运费"
              ></el-table-column>
              <el-table-column
                prop="logisticsProfits"
                label="物流利润"
              ></el-table-column>
              <el-table-column
                prop="actualFreight"
                label="实际运费"
              ></el-table-column>
              <el-table-column
                prop="FreightProfits"
                label="运费利润"
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
    <!-- <footerDiv></footerDiv> -->
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/financetor/financetor.css";
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
      //   copyTableData:[],
      copyTableData: [],
      //  分页 currentPage
      currentPage: 1,
      tableH: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    // 分页复制对象
    this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
    this.tableH = 677;
  },
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
        console.log("searchInputVal ==>", this.$refs.searchInputVal.value);
      });
    },
    // 表格
    // 编辑
    handleEdit(index, row) {
      console.log("index,row ==>", index, row);
    },
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
    ...homeActions(["setWstateStatus"]),
  },
};
</script>