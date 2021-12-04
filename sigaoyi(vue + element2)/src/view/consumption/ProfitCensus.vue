<template>
  <div class="profitCensus">
    <div class="main" v-title data-title="利润统计"></div>
    <div class="v-profitCensus">
      <div class="search">
        <div>
          <span class="text">日期：</span>
          <el-date-picker
            v-model="profitDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div class="btn">
          <el-button size="small" @click="reset()">重置</el-button>
          <el-button type="primary" size="small" @click="searchInput()"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="profitTable">
        <div class="table_btn">
          <!-- <el-button type="primary" size="medium">添加店铺</el-button> -->
          <i class="el-icon-refresh-right"></i>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          default-expand-all
          :row-class-name="tableRowClassName"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="" label="利润表">
            <el-table-column prop="" label="汇率：0.057" width="160">
              <el-table-column prop="date" label="项目" width="160">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="日元">
              <el-table-column prop="name" sortable label="本月数(单位:日元)">
              </el-table-column>
              <el-table-column
                prop="address"
                sortable
                label="本年计数(单位:日元)"
              >
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="人民币">
              <el-table-column prop="name1" sortable label="本年计数(单位:RMB)">
              </el-table-column>
              <el-table-column
                prop="address1"
                sortable
                label="本年计数(单位:RMB)"
              >
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/profitCensus/profitCensus.less";
export default {
  data() {
    return {
      profitDate: "",
      tableData: [
        {
          id: 1,
          date: "收入",
          name: "0",
          address: "0",
          name1: "0",
          address1: "0",
          children: [
            {
              id: 11,
              date: "商品价格",
              name: "0",
              address: "0",
              name1: "0",
              address1: "0",
            },
            {
              id: 12,
              date: "运费",
              name: "0",
              address: "0",
              name1: "0",
              address1: "0",
            },
            {
              id: 13,
              date: "折购金额",
              name: "0",
              address: "0",
              name1: "0",
              address1: "0",
            },
          ],
        },
        {
          id: 2,
          date: "成本",
          name: "0",
          address: "0",
          name1: "0",
          address1: "0",
          children: [
            {
              id: 21,
              date: "商品成本",
              name: "0",
              address: "0",
              name1: "0",
              address1: "0",
            },
            {
              id: 22,
              date: "运费成本",
              name: "0",
              address: "0",
              name1: "0",
              address1: "0",
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    //   表格行 设置 className
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "total";
      }
    },
    //   重置
    reset() {
      this.profitDate = "";
    },
    // 搜索
    searchInput() {},
  },
};
</script>

<style lang="less">
</style>