<template>
  <div class="userInfo">
    <div class="v-userInfo">
      <div class="main" v-title data-title="用户信息"></div>
      <div class="search">
        <div>
          <span class="text">审核状态：</span>
          <el-select
            v-model="radioIndex"
            @clear="radioIndex = 99"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in radioList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="text">用户名：</span>
          <input
            type="text"
            v-model="searchText"
            @keyup.enter="search()"
            placeholder="请输入"
          />
        </div>
        <div class="btn">
          <el-button size="small" type="default" @click="reset()"
            >重置</el-button
          >
          <el-button size="small" type="primary" @click="search()"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="table">
        <div class="tableList">
          <el-table
            ref="tableUserInfo"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            maxHeight="670"
            @select-all="setAll"
            v-loading="tableLoading"
          >
            <template slot="empty">
              <span class="iconfont icon-zanwushuju"></span>
              <div>暂无数据</div>
            </template>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="用户名" prop="userName"></el-table-column>
            <el-table-column label="密码" prop="userPassword"></el-table-column>
            <el-table-column
              label="手机号码"
              prop="phoneNumber"
            ></el-table-column>
            <el-table-column label="邮箱" prop="mail"></el-table-column>
            <el-table-column
              label="注册时间"
              prop="registrationTime"
            ></el-table-column>
            <el-table-column label="公司" prop="company"></el-table-column>
            <el-table-column label="余额" prop="balance"></el-table-column>
            <el-table-column
              label="审核状态"
              prop="reviewStatus"
            ></el-table-column>
            <el-table-column label="推荐人" prop="referrer"></el-table-column>
            <el-table-column
              label="推荐人联系方式"
              prop="referrerNumber"
            ></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <div class="other" v-if="scope.row.reviewStatus == '审核中'">
                  <el-button
                    size="mini"
                    type="success"
                    @click="pass(scope.$index, scope.row)"
                    >通过</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="nopass(scope.$index, scope.row)"
                    >驳回</el-button
                  >
                </div>
                <div class="det" v-else>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="deleteBtn(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </div>
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
</template>

<script>
import "../../assets/less/userInfo/userInfo.less";
import dateFormats from "../../assets/js/dateFormat";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      radioIndex: 99,
      radioList: [
        { name: "全部", checked: true, value: 99 },
        { name: "未填推荐人", checked: false, value: 0 },
        { name: "审核中", checked: false, value: 1 },
        { name: "审核驳回", checked: false, value: 2 },
        { name: "审核通过", checked: false, value: 3 },
      ],
      // 搜索内容
      searchText: "",
      //
      tableData: [],
      // 表格loading
      tableLoading: false,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   总页数
      total: 0,
      sreachList: {
        revirwStatus: 99,
        pages: 1,
        amount: 30,
        userName: "",
      },
      //拿数据loadingList 全屏loading 表格loading
      loadingList: { flag: false, isActive: true },
    };
  },
  created() {
    this.$nextTick(() => {
      this.getInfoData(this.loadingList, this.sreachList);
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
  computed: {
    ...homeState(["InfoData"]),
  },
  methods: {
    // 重置
    reset() {
      this.searchText = "";
      this.radioIndex = 99;
    },
    // 搜素
    search() {
      this.sreachList.revirwStatus = this.radioIndex;
      this.sreachList.pages = 1;
      this.sreachList.amount = 30;
      this.sreachList.userName = this.searchText;
      this.loadingList.isActive = false;
      this.loadingList.flag = true;
      this.getInfoData(this.loadingList, this.sreachList);
    },
    // 表格事件
    // 删除
    deleteBtn(index, row) {
      this.$confirm("", "是否要删除", {
        dangerouslyUseHTMLString: true,
        center: true,
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        customClass: "delMessage",
      }).then(() => {
        this.$axios({
          url: "/sigaoyi/delectuser",
          method: "POST",
          params: {
            id: row.id,
          },
        })
          .then((result) => {
            if (result.data.Code == 200) {
              this.tableData.splice(index, 1);
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
            this.$notify({
              title: "请求错误",
              message: "系统业务繁忙,请稍后再试",
              type: "error",
              offset: 50,
            });
          });
      });
    },
    // 全选
    setAll(selection) {
      if (selection.length > 0) {
        this.Allstatus = true;
        selection.forEach((e) => {
          e.checked = true;
        });
      } else {
        this.Allstatus = false;
        this.tableData.forEach((e) => {
          e.checked = false;
        });
      }
    },
    // 点击 全选按钮
    Allset() {
      this.tableData.forEach((e) => {
        this.$refs.tableUserInfo.toggleAllSelection(e);
        e.checked = true;
      });
    },
    // 点击 删除按钮   0000
    allDelete() {
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
      if (this.tableData.findIndex((target) => target.checked == true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].checked) {
            // this.centerDialogVisibleStatus = true;
          }
        }
      } else {
        this.$message({
          message: "请选择要删除的列表",
          center: true,
          duration: 800,
          type: "error",
        });
      }
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.sreachList.amount = this.pageSize;
      this.loadingList.flag = true;
      this.loadingList.isActive = false;
      this.getInfoData(this.loadingList, this.sreachList);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.sreachList.pages = this.currentPage;
      this.loadingList.flag = true;
      this.loadingList.isActive = false;
      this.getInfoData(this.loadingList, this.sreachList);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 初始拿数据
    getInfoData(loadingList, data) {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登陆!");
        this.$router.push({ name: "Login" });
        return;
      }
      if (this.InfoData.id == undefined) {
        alert("登陆过期,请重新登陆!");
        sessionStorage.removeItem("token");
        this.$router.push({ name: "Login" });
        return;
      }
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/userinfos",
        method: "POST",
        params: data,
      })
        .then((result) => {
          console.log("result ==>", result);
          this.tableLoading = false;
          if (result.data.Code == 200) {
            for (let i = 0; i < result.data.users.length; i++) {
              result.data.users[i]["checked"] = false;
              // 转时间
              result.data.users[i].registrationTime = dateFormats.dateFormat(
                result.data.users[i].registrationTime
              );
              //   转状态
              if (result.data.users[i].reviewStatus == "0") {
                result.data.users[i].reviewStatus = "未填推荐人";
              } else if (result.data.users[i].reviewStatus == "1") {
                result.data.users[i].reviewStatus = "审核中";
              } else if (result.data.users[i].reviewStatus == "2") {
                result.data.users[i].reviewStatus = "审核驳回";
              } else {
                result.data.users[i].reviewStatus = "审核通过";
              }
            }
            // 总数
            this.total = result.data.page.total;
            this.currentPage = result.data.page.pages;
            this.pageSize = result.data.page.amount;
            this.tableData = result.data.users;
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 表格点击通过按钮
    pass(index, row) {
      this.$axios({
        url: "/sigaoyi/reviewStatus",
        method: "POST",
        params: {
          reviewStatus: 3,
          id: row.id,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            row.reviewStatus = "审核通过";
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
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 表格点击驳回按钮
    nopass(index, row) {
      this.$axios({
        url: "/sigaoyi/reviewStatus",
        method: "POST",
        params: {
          reviewStatus: 2,
          id: row.id,
        },
      })
        .then((result) => {
          if (result.data.Code == 200) {
            row.reviewStatus = "审核驳回";
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
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    ...homeActions(["setInfoData"]),
  },
};
</script>

<style>
</style>