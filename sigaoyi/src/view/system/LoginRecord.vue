<template>
  <div class="loginRecord">
    <div class="main" v-title data-title="登录记录"></div>
    <div class="box">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>登陆记录</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="loginRecordInfo">
        <div class="sreach clearfix">
          <div class="inputList fl">
            <div>
              <span>用户姓名：</span>
              <input
                type="text"
                v-model="userName"
                placeholder="请输入"
                @keydown.enter="resetAndSreach(false, pageSize, currentPage)"
              />
            </div>
            <div>
              <span>IP地址：</span>
              <input
                type="text"
                v-model="Ipadd"
                placeholder="请输入"
                @keydown.enter="resetAndSreach(false, pageSize, currentPage)"
              />
            </div>
          </div>
          <div class="searchBtn fl">
            <el-button
              type="info"
              icon="el-icon-refresh-right"
              size="small"
              @click="resetAndSreach(true)"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="resetAndSreach(false, 30, 1)"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="table">
          <div class="v-table">
            <!-- 表格 -->
            <div class="tableList">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                maxHeight="650"
                v-loading="tableLoading"
              >
                <template slot="empty">
                  <span class="iconfont icon-zanwushuju"></span>
                  <div>暂无数据</div>
                </template>
                <el-table-column
                  align="center"
                  prop="id"
                  label="编号"
                  width="150"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="editStatus"
                  label="操作类型"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="editFileName"
                  label="文件名称/登陆IP"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="editUserName"
                  label="操作用户"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="editDate"
                  label="操作时间"
                >
                </el-table-column>
                <!-- <el-table-column align="center" label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="danger"
                      size="mini"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column> -->
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
                :pager-count="11"
              >
                <span class="ensure-btn fr" @click="clickTrue">确定</span>
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/less/loginRecord/loginRecord.less";
import timestampToTimes from "../../assets/js/timestampToTime";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore"); 
export default {
  data() {
    return {
      // 搜索Text
      userName:"",
      Ipadd:"",   
      //   表格
      tableData: [],
      //  表格loading
      tableLoading:false,   
      //   分页
      currentPage: 1,
      //   pageSize
      pageSize: 30,  
      //   总数
      total: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    this.$nextTick(() => {
      this.getLoginRecord(this.pageSize, this.currentPage);
    });
  },
  components: {

  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    ...homeActions(["setWstateStatus"]),
    // 删除
    // deleteRow(index, rows) {
    //   this.$confirm("", "是否要删除", {
    //     dangerouslyUseHTMLString: true,
    //     center: true,
    //     type: "warning",
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //     customClass: "delMessage",
    //   }).then(() => {
    //     console.log("rows ==>", rows);
    //     rows.splice(index, 1);
    //     this.tableData.length--;
    //     this.pageSize--;
    //     this.$message({
    //       type: "success",
    //       message: "已删除",
    //       center: true,
    //       duration: 800,
    //     });
    //   });
    // },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.resetAndSreach(false, this.pageSize, this.currentPage);
    },
    // 去第几页
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.resetAndSreach(false, this.pageSize, this.currentPage);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
      // console.log('cccccccccc ==>', this.currentPage)
    },
    //  true 重置 false 搜索
    resetAndSreach(flag, amount, pages) {
      if (flag) {
        this.userName = "";
        this.Ipadd = "";
        // this.currentPage = 1;
        // this.pageSize = 30;
      } else {
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
        this.tableLoading = true;
        this.$axios({
          method: "POST",
          url: "/sigaoyi/NEWeditrecording",
          params: {
            amount: amount,
            pages: pages,
            userName: this.userName,
            ip: this.Ipadd,
          },
        })
          .then((result) => {
            this.tableLoading = false;
            console.log("result ==>", result);
            if (result.data.Code == 200) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 65,
              });
               result.data.Editrecording.forEach((e) => {
                e.editDate = timestampToTimes.timestampToTime(e.editDate);
              });
              this.total = result.data.page.total;
              this.currentPage = result.data.page.pages;
              this.pageSize = result.data.page.amount;
              this.tableData = result.data.Editrecording;
            } else {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "warning",
                offset: 65,
              });
            }
          })
          .catch((err) => {
            this.tableLoading = false;
            console.log("err ==>", err);
            this.$notify({
              title: "请求失败",
              message: "系统业务繁忙,请稍后再试",
              type: "error",
              offset: 65,
            });
          });
      }
    },
    // 获取登录记录
    getLoginRecord(amount, pages) {
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
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWeditrecording",
        params: {
          amount: this.pageSize,
          pages: this.currentPage,
        },
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);
          console.log("result ==>", result);
          if (result.data.Code == 200) {
            //   console.log("result.data.page.total ==>", result.data.page.total);
            this.total = result.data.page.total;

            result.data.Editrecording.forEach((e) => {
              //   console.log("e.editDate ==>",e.editDate)
              e.editDate = timestampToTimes.timestampToTime(e.editDate);
            });
            this.tableData = result.data.Editrecording;
            //   console.log("this.tableData ==>", this.tableData);
          } else {
            this.$notify({
              title: "请求错误",
              message: result.data.message,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          setTimeout(() => {
            loading.close();
          }, 500);
          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
  },
};
</script>