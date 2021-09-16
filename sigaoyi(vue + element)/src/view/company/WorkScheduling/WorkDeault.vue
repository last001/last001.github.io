<template>
  <div class="workDeault">
    <div class="workSchedulingInfo">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>工作排期</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search">
        <div class="int">
          <span>日期：</span>
          <input type="sreach" placeholder="示例:2021-01" />
        </div>
        <el-button type="info" size="small" icon="el-icon-refresh-right"
          >重置</el-button
        >
        <el-button type="primary" size="small" icon="el-icon-search"
          >搜索</el-button
        >
      </div>
      <div class="table">
        <div class="v-table">
          <div class="btn clearfix">
            <el-button
              class="fr"
              type="primary"
              icon="el-icon-add-location"
              size="small"
              @click="gotoEditPage()"
              >添加</el-button
            >
          </div>
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="name" label="名字"></el-table-column>
              <el-table-column
                prop="content"
                label="具体内容"
              ></el-table-column>
              <el-table-column prop="proportion" label="进度"></el-table-column>
              <el-table-column label="预计周期">
                <el-table-column
                  prop="startTime"
                  label="开始时间"
                ></el-table-column>
                <el-table-column
                  prop="endTime"
                  label="预计结束时间"
                ></el-table-column>
              </el-table-column>
              <el-table-column
                prop="finishTime"
                label="完成情况"
              ></el-table-column>
              <el-table-column
                prop="performance"
                label="完成时间/原因"
              ></el-table-column>
              <el-table-column
                prop="unfinished"
                label="逾期/未完成原因"
              ></el-table-column>
              <el-table-column
                prop="participant"
                label="参与人员"
              ></el-table-column>
              <el-table-column prop="priority" label="优先级"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                </template>
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
import qs from "qs";
import "../../../assets/less/workDeault/workDeault.less";
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
          name: "王者01",
          content: "打包",
          proportion: "100%",
          startTime: "2020-01-01",
          endTime: "2021-12-12",
          finishTime: "已完成",
          performance: "2021-01-18 16:00",
          unfinished: "--",
          participant: "全部",
          priority: "0",
        },
        {
          name: "王者02",
          content: "打包",
          proportion: "40%",
          startTime: "2020-01-01",
          endTime: "2021-12-12",
          finishTime: "进行中",
          performance: "--",
          unfinished: "--",
          participant: "全部",
          priority: "1",
        },
        {
          name: "王者03",
          content: "打包",
          proportion: "0%",
          startTime: "2020-01-01",
          endTime: "2021-12-12",
          finishTime: "未完成",
          performance: "--",
          unfinished: "00000000000000",
          participant: "全部",
          priority: "0",
        },
      ],
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: "",
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
    //    表格
    //    编辑
    handleEdit(index, row) {
      // console.log("index,row ==>", index, row);
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
          name: "WorkEdit",
          query: { row: JSON.stringify(row), rowStatus: true },
        });
      }, 400);
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
    // 添加按钮
    gotoEditPage() {
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
        this.$router.push({ name: "WorkEdit", query: { rowStatus: false } });
      }, 400);
    },
    ...homeActions(["setWstateStatus"]),
  },
};
</script>

<style>
</style>