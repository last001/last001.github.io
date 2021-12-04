<template>
  <div class="staffMangemenDefault">
    <div class="box">
      <div class="staffManagementInfo">
        <div class="searchInt">
          <div>
            <span class="text">账号名字：</span>
            <input
              v-model="companName"
              type="sreach"
              placeholder="请输入"
              @keydown.enter="
                getStaffManageList('search', pageSize, currentPage, true)
              "
            />
          </div>
          <div class="btn">
            <el-button type="default" size="small" @click="companName = ''"
              >重置</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="getStaffManageList('search', pageSize, currentPage, true)"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="table">
          <div class="add">
            <el-button type="primary" size="medium" @click="GotoAdd()"
              >添加</el-button
            >
            <i
              class="el-icon-refresh-right"
              @click="getStaffManageList('start', pageSize, currentPage)"
            ></i>
          </div>
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
              maxHeight="625"
              v-loading="loading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"></el-table-column>
              <el-table-column
                prop="userName"
                label="账号名字"
              ></el-table-column>
              <el-table-column prop="company" label="公司"></el-table-column>
              <el-table-column
                prop="phoneNumber"
                label="手机号码"
              ></el-table-column>
              <!-- <el-table-column
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
              ></el-table-column> -->
              <el-table-column
                prop="balance"
                label="账号余额"
              ></el-table-column>
              <!-- <el-table-column
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
              ></el-table-column> -->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="table_btn">
                    <el-button
                      type="default"
                      size="mini"
                      class="Edit"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="collection(scope.$index, scope.row)"
                    >
                      催收
                    </el-button>
                  </div>
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
    this.getStaffManageList("start", this.pageSize, this.currentPage);
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
      this.getStaffManageList("search", this.pageSize, this.currentPage, false);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStaffManageList("search", this.pageSize, this.currentPage, false);
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
    // 请求
    getStaffManageList(string, amount, pages, flag) {
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

      let data = {
        userId: this.InfoData.id,
        amount: amount,
        pages: pages,
        status: 99,
        companyName: this.InfoData.company,
        //   this.InfoData.company
        companyPrincipal: "",
        userName: this.companName,
      };
      // 公司名字 处理
      if (data.companyName == "") {
        data.companyName = "moll";
      }

      this.loading = true;
      if (string == "search") {
        if (flag == true) {
          data.amount = 30;
          data.pages = 1;
        }
      }

      console.log("data ==>", data);

      this.$axios({
        method: "POST",
        url: "/sigaoyi/userinfos",
        params: data,
      })
        .then((result) => {
          this.loading = false;
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            this.tableData = result.data.users;
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
            this.total = result.data.page.total;
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
          this.loading = false;
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