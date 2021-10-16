<template>
  <div class="tutorialDocument">
    <div class="main" v-title data-title="教程文档"></div>
    <div class="box">
      <div class="dandruff" ref="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="Documen">
        <div class="sreach clearfix">
          <div class="v-sreach fl">
            <span>名称：</span>
            <input
              v-model="inputVal"
              type="text"
              placeholder="请输入"
              @keyup.enter="searchInput(1, 30, true)"
            />
          </div>
          <div class="btn fl">
            <el-button
              type="info"
              icon="el-icon-refresh-right"
              size="small"
              @click="reset()"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="searchInput(1, 30, true)"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="table">
          <div class="v-table">
            <div class="updataFile">
              <el-button icon="el-icon-upload" type="primary"
                >上传文件</el-button
              >
              <input
                type="file"
                name="file"
                accept=".text,.xls,.xlsx,.pptx,.doc"
                multiple="multiple"
                title="点击上传文件"
                @change="updataFile($event)"
              />
              <select
                v-model="optionIndex"
                @change="changeSet(optionList, optionIndex)"
              >
                <option
                  v-for="(item, index) in optionList"
                  :key="index"
                  :value="index"
                  :selected="item.selected"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <!-- 表格 -->
            <div class="tableList">
              <el-table
                :data="tableData"
                stripe
                v-loading="tableLoading"
                style="width: 100%"
                maxHeight="628px"
              >
                <template slot="empty">
                  <span class="iconfont icon-zanwushuju"></span>
                  <div>暂无数据</div>
                </template>
                <el-table-column
                  align="center"
                  prop="id"
                  label="序号"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="fileName"
                  label="文件名称"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="createUser"
                  label="上传用户"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="createDate"
                  label="上传时间"
                >
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button v-if="brwoseStatus" type="text">
                      未开放权限
                    </el-button>
                    <el-button
                      v-else
                      @click="browse(scope.$index, scope.row)"
                      size="mini"
                      type="primary"
                    >
                      浏览
                    </el-button>
                    <el-button
                      v-show="infoData.statu == 0"
                      @click.native.prevent="
                        deleteRow(scope.$index, scope.row, tableData)
                      "
                      type="danger"
                      size="mini"
                    >
                      删除
                    </el-button>
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
                :total="tableData.length"
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
                :total="tableData.length"
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
// import pdf from "vue-pdf";
// import footerDiv from "@/components/footer.vue";
import mammoth from "mammoth";
// import XLSX from "xlsx";
import timestampToTimes from "../../assets/js/timestampToTime";
import "../../assets/less/tutorialDocument/tutorialDocument.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      infoData: {},
      //   表格
      tableData: [],
      tableLoading: false,
      //   分页
      currentPage: 1,
      pageSize: 30,
      // 搜索内容
      inputVal: "",
      //optioonList
      optionIndex: 0,
      optionList: [
        {
          id: "共享",
          name: "共享",
          summary: "cese",
          selected: true,
        },
      ],
      // 浏览按钮状态
      brwoseStatus: true,
    };
  },
  created() {
    this.infoData = this.InfoData;
    if (
      this.InfoData.statu <= 2 ||
      this.InfoData.userName == "裴亚江" ||
      this.InfoData.userName == "马腾"
    ) {
      this.brwoseStatus = false;
    } else {
      this.brwoseStatus = true;
    }
    this.getList();
  },
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    ...homeActions(["setWstateStatus", "setInfoData"]),
    // 获取初始值
    getList() {
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
        pages: 1,
        amount: 30,
        userId: this.InfoData.id,
        fileName: "",
      };

      //   请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$axios({
        url: "/sigaoyi/TutorialFile",
        method: "POST",
        params: data,
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);

          if (result.data.Code == 200) {
            result.data.files.forEach((e) => {
              e.createDate = timestampToTimes.timestampToTime(e.createDate);
            });
            this.tableData = result.data.files;
            result.data.grouptables.forEach((e) => {
              e["selected"] = false;
            });
            let obj = {
              id: "共享",
              name: "共享",
              summary: "cese",
              selected: true,
            };
            result.data.grouptables.unshift(obj);
            this.optionList = result.data.grouptables;
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
          setTimeout(() => {
            loading.close();
          }, 500);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 搜索
    searchInput(pages, amount, flag) {
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
        pages: 1,
        amount: 30,
        userId: this.InfoData.id,
        fileName: this.inputVal,
      };

      this.tableLoading = true;

      this.$axios({
        url: "/sigaoyi/TutorialFile",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableLoading = false;

          if (result.data.Code == 200) {
            result.data.files.forEach((e) => {
              e.createDate = timestampToTimes.timestampToTime(e.createDate);
            });
            result.data.grouptables.forEach((e) => {
              e["selected"] = false;
            });
            let obj = {
              id: "共享",
              name: "共享",
              summary: "cese",
              selected: true,
            };
            result.data.grouptables.unshift(obj);
            this.optionList = result.data.grouptables;
            this.tableData = result.data.files;
            if (flag) {
              this.$notify({
                title: "请求成功",
                message: result.data.msg,
                type: "success",
                offset: 50,
              });
            }
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
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 重置
    reset() {
      this.inputVal = "";
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchInput(this.currentPage, this.pageSize, true);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchInput(this.currentPage, this.pageSize, true);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // option change 事件
    changeSet(array, index) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[index].selected = true;
    },
    // 上传
    updataFile(e) {
      let files = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", files);
      formData.append("userId", this.InfoData.id);
      formData.append("mulv", this.optionList[this.optionIndex].id);

      this.$axios({
        url: "/sigaoyi/NEWupload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((result) => {
          if (result.data.Code == "200") {
            this.searchInput(1, 30, false);
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
    // 浏览
    browse(index, row) {
      let url = encodeURIComponent("http://www.ec-sigaoyi.com/" + row.url);
      window.open("http://ow365.cn/?i=23884&furl=" + url);
      //   window.open("https://61office.com/?src=" + url);
    },
    // 删除
    deleteRow(index, row, rows) {
      this.$confirm("", "是否要删除", {
        dangerouslyUseHTMLString: true,
        center: true,
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        customClass: "delMessage",
      })
        .then(() => {
          this.tableLoading = true;
          this.$axios({
            url: "/sigaoyi/delectfile",
            method: "POST",
            params: {
              id: row.id,
              name: row.fileName,
            },
          })
            .then((result) => {
              this.tableLoading = false;
              if (result.data.Code == 200) {
                this.tableData.splice(index, 1);
                this.tableData.length--;
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
              this.tableLoading = false;
              this.$notify({
                title: "请求错误",
                message: "系统业务繁忙,请稍后再试",
                type: "error",
                offset: 50,
              });
            });

          //
        })
        .catch(() => {});
    },
  },
};
</script>