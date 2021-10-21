<template>
  <div class="customerFollowDefault">
    <div class="CustomerFollowInfo">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户跟进</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="customer-header">
        <div class="title">
          <div class="platform">
            <span class="text">店铺平台：</span>
            <div
              v-for="(item, index) in radioPlatformData"
              :key="index"
              @click="clickRadio(radioPlatformData, item, index)"
            >
              <input type="radio" :checked="item.checked" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="accountType">
            <span class="text">客户类型：</span>
            <div
              v-for="(item, index) in accountTypeData"
              :key="index"
              @click="clickRadio(accountTypeData, item, index)"
            >
              <input type="radio" :checked="item.checked" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="accountRootin">
            <span class="text">客户来源：</span>
            <div
              v-for="(item, index) in accountRootinData"
              :key="index"
              @click="clickRadio(accountRootinData, item, index)"
            >
              <input type="radio" :checked="item.checked" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="inputList">
          <div class="inp" v-for="(item, index) in inputList" :key="index">
            <input type="text" :placeholder="item.placeText" :ref="item.ref" />
          </div>
          <div class="blockTime">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
            >
            </el-date-picker>
          </div>
          <div class="deliverData">
            <input type="text" placeholder="协同号" ref="deliverDataInput" />
          </div>
          <div class="iconList">
            <el-button
              type="info"
              icon="el-icon-refresh-right"
              size="small"
              @click="resetIniput()"
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
      </div>
      <div class="customer-table">
        <div class="v-customer-table">
          <div class="btn clearfix">
            <el-button
              class="fr"
              type="success"
              size="small"
              icon="el-icon-s-promotion"
              >导出</el-button
            >
            <el-button
              class="fr"
              type="danger"
              size="small"
              icon="el-icon-delete-location"
              @click="Alldelete()"
              >删除</el-button
            >
            <el-button
              class="fr"
              type="primary"
              size="small"
              icon="el-icon-add-location"
              @click="GotoScheduleNum()"
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
              :maxHeight="tableH + 'px'"
              stripe
              @select="onTableSelect"
              @selection-change="handleSelectionChange"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" fixed></el-table-column>
              <el-table-column
                prop="synergy"
                label="协同号"
                fixed
              ></el-table-column>
              <el-table-column
                prop="customerSource"
                label="客户来源"
              ></el-table-column>
              <el-table-column
                prop="cutomerType"
                label="客户类型"
              ></el-table-column>
              <el-table-column prop="nature" label="性质"></el-table-column>
              <el-table-column
                prop="cutomerName"
                label="客户名称"
              ></el-table-column>
              <el-table-column
                prop="guidancePersonnel"
                label="指导人员"
              ></el-table-column>
              <el-table-column
                prop="phaseNode"
                label="阶段节点"
                width="100"
              ></el-table-column>
              <el-table-column label="账号情况">
                <el-table-column
                  prop="TheEuropean"
                  label="欧"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="America"
                  label="美"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="Japan"
                  label="日"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="Australia"
                  label="澳"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="Chief"
                  label="酋"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="Singpoere"
                  label="坡"
                  width="50"
                ></el-table-column>
              </el-table-column>
              <el-table-column label="进度情况">
                <el-table-column
                  prop="selfBuild"
                  label="自建量"
                ></el-table-column>
                <el-table-column prop="agency" label="待理量"></el-table-column>
                <el-table-column
                  prop="synchronization"
                  label="同步量"
                ></el-table-column>
                <el-table-column prop="order" label="订单量"></el-table-column>
              </el-table-column>
              <el-table-column
                prop="followCount"
                label="跟进次数"
              ></el-table-column>
              <el-table-column
                prop="followTime"
                label="最近跟进时间"
                width="110"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="100"
              ></el-table-column>
              <el-table-column label="操作" width="60" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
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
import "../../../assets/less/customerFollow/customerFollow.css";
import timestampToTimes from "../../../assets/js/timestampToTime";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // 表格的高度
      tableH: "",
      //   radio平台
      radioPlatformData: [
        { name: "全部", checked: true, value: "99" },
        { name: "亚马逊", checked: false, value: "0" },
        { name: "趣天", checked: false, value: "1" },
      ],
      // 客户类型
      accountTypeData: [
        { name: "全部", checked: true, value: "99" },
        { name: "个人", checked: false, value: "0" },
        { name: "团队", checked: false, value: "1" },
        { name: "企业", checked: false, value: "2" },
        { name: "店铺托管", checked: false, value: "3" },
        { name: "精品托管", checked: false, value: "4" },
      ],
      // 客户来源
      accountRootinData: [
        { name: "全部", checked: true, value: "99" },
        { name: "广州总部", checked: false, value: "0" },
        { name: "杭州分公司", checked: false, value: "1" },
        { name: "沈阳分公司", checked: false, value: "2" },
        { name: "张鹏飞团队", checked: false, value: "33" },
      ],
      //   value1
      value1: "",
      // inputList
      inputList: [
        { placeText: "客户名称", ref: "accountName" },
        { placeText: "指导人员", ref: "guidance" },
      ],
      //   表格
      tableData: [],
      copyTableData: [
        {
          synergy: "01",
          customerSource: "广州总部",
          cutomerType: "精品托管",
          nature: "兼职",
          cutomerName: "富海川",
          guidancePersonnel: "王者02",
          phaseNode: "基金近大大1",
          TheEuropean: "0",
          America: "1",
          Japan: "2",
          Australia: "3",
          Chief: "4",
          Singpoere: "5",
          selfBuild: "111",
          agency: "222",
          synchronization: "333",
          order: "444",
          followCount: "0",
          followTime: "2020-02-02",
          createTime: "2020-12-12",
        },
        {
          synergy: "02",
          customerSource: "广州总部",
          cutomerType: "精品托管",
          nature: "兼职",
          cutomerName: "富海川",
          guidancePersonnel: "王者02",
          phaseNode: "基金近大大2",
          TheEuropean: "0",
          America: "1",
          Japan: "2",
          Australia: "3",
          Chief: "4",
          Singpoere: "5",
          selfBuild: "111",
          agency: "222",
          synchronization: "333",
          order: "444",
          followCount: "1",
          followTime: "2020-03-03",
          createTime: "2020-11-11",
        },
        {
          synergy: "03",
          customerSource: "广州总部",
          cutomerType: "精品托管",
          nature: "兼职",
          cutomerName: "富海川",
          guidancePersonnel: "王者03",
          phaseNode: "基金近大大3",
          TheEuropean: "0",
          America: "1",
          Japan: "2",
          Australia: "3",
          Chief: "4",
          Singpoere: "5",
          selfBuild: "111",
          agency: "222",
          synchronization: "333",
          order: "444",
          followCount: "3",
          followTime: "2020-04-04",
          createTime: "2020-10-10",
        },
      ],
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: "",
    };
  },
  created() {
    this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
    this.tableH = 406;
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    // 点击 radio
    clickRadio(arr, item, index) {
      if (item.checked) {
        return;
      }
      arr.forEach((e) => {
        e.checked = false;
      });
      item.checked = true;
    },
    // 重置
    resetIniput() {
      this.$nextTick(() => {
        //   inputList
        this.value1 = "";
        this.$refs.deliverDataInput.value = "";
        let inputList = document.querySelectorAll(".inputList input");
        for (let i = 0; i < inputList.length; i++) {
          inputList[i].value = "";
        }
        //  radioList
        for (let i = 0; i < this.radioPlatformData.length; i++) {
          this.radioPlatformData[i].checked = false;
          if (this.radioPlatformData[i].value == "99") {
            this.radioPlatformData[i].checked = true;
          }
        }
        for (let i = 0; i < this.accountRootinData.length; i++) {
          this.accountRootinData[i].checked = false;
          if (this.accountRootinData[i].value == "99") {
            this.accountRootinData[i].checked = true;
          }
        }
        for (let i = 0; i < this.accountTypeData.length; i++) {
          this.accountTypeData[i].checked = false;
          if (this.accountTypeData[i].value == "99") {
            this.accountTypeData[i].checked = true;
          }
        }
      });
    },
    // 搜索
    search() {
      let data = {
        radioType: "",
        accountType: "",
        accountCome: "",
        accountName: this.$refs.accountName[0].value,
        guidance: this.$refs.guidance[0].value,
        startTime: timestampToTimes.timestampToTime(this.value1[0]),
        endTime: timestampToTimes.timestampToTime(this.value1[1]),
        helpNmber: this.$refs.deliverDataInput.value,
      };
      // 店铺平台
      for (let i = 0; i < this.radioPlatformData.length; i++) {
        if (this.radioPlatformData[i].checked) {
          data.radioType = Number(this.radioPlatformData[i].value);
        }
      }
      // 客户类型
      for (let i = 0; i < this.accountTypeData.length; i++) {
        if (this.accountTypeData[i].checked) {
          data.accountType = Number(this.accountTypeData[i].value);
        }
      }
      // 客户来源
      for (let i = 0; i < this.accountRootinData.length; i++) {
        if (this.accountRootinData[i].checked) {
          data.accountCome = Number(this.accountRootinData[i].value);
        }
      }

      
      // 发请求
    },
    // 表格
    handleSelectionChange() {},
    // 是否是选中的状态
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;
      
    },
    // 编辑
    handleEdit(index, row) {
      
      const loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 400);
      setTimeout(() => {
        this.$router.push({
          name: "ScheduleNumber",
          query: { row: JSON.stringify(row), rowStatus: true },
        });
      }, 500);
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(val);
    },
    // 去第几页
    handleCurrentChange(val) {
      
      this.currentPage = val;
      let abc = this.pageSize * (val - 1);
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(0, abc);
      this.tableData.splice(this.pageSize);
      
      //   this.tableData = a.splice(this.pageSize)
      
      
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
      
    },
    // 去GotoScheduleNum
    GotoScheduleNum() {
      
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 600);

      setTimeout(() => {
        this.$router.push({ name: "ScheduleNumber", rowStatus: false });
      }, 700);
    },
    // 多项删除
    Alldelete() {
      for (let i = this.tableData.length - 1; i >= 0; i--) {
        if (this.tableData[i].selected) {
          
          this.tableData.splice(i, 1);
        }
      }
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>

<style>
</style>