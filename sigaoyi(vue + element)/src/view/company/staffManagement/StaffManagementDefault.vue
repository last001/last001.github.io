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
            <input v-model="companName" type="sreach" placeholder="请输入" />
          </div>
          <div class="btn">
            <el-button type="info" icon="el-icon-refresh-right" size="small"
              >重置</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="getStaffManageList('search')"
              >搜索</el-button
            >
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
              v-loading="loading"
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
              <el-table-column
                prop="phoneNumber"
                label="手机号码"
              ></el-table-column>
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
                label="待付费用"
              ></el-table-column>
              <el-table-column
                prop="balance"
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
      loading: false,
      //   xls
      tableData: [],
      //  分页 currentPage
      currentPage: 1,
      pageSize: 30,
      total: 0,
      // 搜索 val
      companName: "",
    };
  },
  created() {
    // 分页复制对象
    this.getStaffManageList("start");
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.$router.push({
        name: "StaffManagementEditor",
        query: { flag: false, row: JSON.stringify(row) },
      });
    },
    // 崔收
    collection(index, row) {},
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData.splice(val);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      let abc = this.pageSize * (val - 1);
      this.tableData.splice(0, abc);
      this.tableData.splice(this.pageSize);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 添加
    GotoAdd() {
      this.$router.push({
        name: "StaffManagementEditor",
        query: { flag: true },
      });
    },
    getStaffManageList(string) {
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
      if (string == "start") {
        //   发起请求
        var loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }

      let data = {
        userId: this.InfoData.id,
        amount: 30,
        pages: 1,
        status: 99,
        companyName: this.InfoData.company,
        //   this.InfoData.company
        companyPrincipal: "",
      };
      // 公司名字 处理
      if (data.companyName == "") {
        data.companyName = "moll";
      }

      this.$axios({
        method: "POST",
        url: "/sigaoyi/userinfos",
        params: data,
      })
        .then((result) => {
          if (string == "start") {
            loading.close();
          }
          if (result.data.Code == 200) {
            this.tableData = result.data.users;
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
            this.total = result.data.page.total;
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
          if (string == "start") {
            loading.close();
          }

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>

<style>
</style>