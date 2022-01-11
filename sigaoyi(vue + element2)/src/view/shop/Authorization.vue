<template>
  <div class="authorization">
    <div class="main" v-title data-title="授权"></div>
    <div class="v-authorization">
      <div class="box">
        <div class="titleText">
          <div class="search">
            <div>
              <span class="text">店铺状态：</span>
              <el-select v-model="setIndex" clearable placeholder="请选择">
                <el-option
                  v-for="item in setList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span class="text">店铺名字：</span>
              <input type="text" placeholder="请输入" v-model="shopNameVal" />
            </div>
          </div>
          <div class="btn">
            <el-button size="small" @click="resetBtn()">重置</el-button>
            <el-button type="primary" size="small" @click="searchInput(30, 1)"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="authorTalble">
          <div class="btn">
            <el-button type="primary" size="medium" @click="addList()"
              >添加店铺</el-button
            >
            <i
              class="el-icon-refresh-right"
              @click="getStore(pageSize, currentPage)"
            ></i>
          </div>
          <!-- 表格 -->
          <el-table
            ref="multipleTable"
            :data="tableData"
            @select="onTableSelect"
            @select-all="setAll"
            maxHeight="625"
            stripe
            style="width: 100%"
            v-loading="tableLoading"
          >
            <template slot="empty">
              <span class="iconfont icon-zanwushuju"></span>
              <div>暂无数据</div>
            </template>
            <el-table-column type="selection"> </el-table-column>
            <el-table-column
              prop="id"
              label="编号"
              width="105"
            ></el-table-column>
            <el-table-column prop="status" label="状态" width="105">
            </el-table-column>
            <el-table-column prop="shopuser" label="店铺用户名/ID">
            </el-table-column>
            <el-table-column prop="aPIKey" label="APIKEY" width="550">
            </el-table-column>
            <el-table-column prop="remarks" label="简介"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="table_btn">
                  <el-button
                    size="mini"
                    @click="deteleList(scope.$index, scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button v-show="shouquan" size="mini" type="primary"
                    >授权</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
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
              :pager-count="11"
            >
              <span class="ensure-btn fr" @click="clickTrue()">确定</span>
            </el-pagination>
          </div>
        </div>
        <footerDiv></footerDiv>
      </div>
    </div>
    <!-- 点击修改弹出层 -->
    <el-dialog
      :title="EditFaceTitle"
      :visible.sync="centerDialogVisible"
      width="32%"
      center
      custom-class="handleEditFace"
    >
      <div class="content">
        <div>
          <span class="text">趣天账号：</span>
          <input
            type="text"
            ref="shopName"
            v-model="handleEditList.shopuser"
            placeholder="请输入趣天账号"
          />
        </div>
        <div>
          <span class="text">趣天密码：</span>
          <input
            type="text"
            ref="shopPwd"
            v-model="handleEditList.shoppwd"
            placeholder="请输入趣天密码"
          />
        </div>
        <div>
          <span class="text">店铺状态：</span>
          <el-select v-model="handleIndex" placeholder="请选择">
            <el-option
              v-for="item in handleLit"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="text">APIkey：</span>
          <input
            type="text"
            ref="APIKey"
            v-model="handleEditList.aPIKey"
            placeholder="请输入QPIkey"
          />
        </div>
        <div class="note">
          <span class="text">备注：</span>
          <textarea
            cols="20"
            ref="shopRemarks"
            rows="6"
            v-model="handleEditList.remarks"
            placeholder="请输入备注"
          ></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="addAuthor()"
          >确 定</el-button
        >
        <el-button size="small" @click="centerDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import footerDiv from "@/components/footer.vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

import "../../assets/less/authorization/authorization.css";
export default {
  data() {
    return {
      setIndex: 99,
      setList: [
        { name: "全部", selected: true, value: 99 },
        { name: "在售", selected: false, value: 0 },
        { name: "停售", selected: false, value: 1 },
      ],
      shopNameVal: "",
      tableData: [],
      tableLoading: false,
      //  点击修改弹出层的状态值
      centerDialogVisible: false,
      //   点击修改弹出层的title
      EditFaceTitle: "修改店铺",
      handleIndex: 0,
      handleLit: [
        { name: "在售", value: 0 },
        { name: "停售", value: 1 },
      ],
      //   修改List
      handleEditList: {},
      //    修改index
      handleEditIndex: "",
      //   是否是全选的状态
      Allstatus: false,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      //   授权状态值
      shouquan: false,
      // 添加还是修改状态值
      addChangeStatus: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/productOrder/qutianOrder") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    document.title = "授权";
    if (!this.$route.meta.isBack) {
      // 初始
      this.resetBtn();
      this.currentPage = 1;
      this.pageSize = 30;
      this.total = 0;
      this.tableData = [];
      this.getStore(this.pageSize, this.currentPage);
    } else {
      this.$route.meta.isBack = false;
    }
  },
  created() {
    document.title = "授权";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  components: {
    footerDiv,
  },
  methods: {
    //  重置
    resetBtn() {
      this.setIndex = 99;
      this.shopNameVal = "";
    },
    // 搜索
    searchInput(amount, pages) {
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
        url: "/sigaoyi/NEWqoo10Shop",
        method: "POST",
        params: {
          amount: amount,
          pages: pages,
          userId: this.InfoData.id,
          status: this.setIndex,
          shopuser: this.shopNameVal,
          companyPrincipal: this.InfoData.company,
        },
      })
        .then((result) => {
          this.tableLoading = false;

          if (result.data.Code == 200) {
            this.tableData = result.data.qoo10shops;
            this.tableData.forEach((e) => {
              if (e.status == 0) {
                e.status = "在售";
              } else if (e.status == 1) {
                e.status = "停售";
              }
            });
            this.total = result.data.page.total;
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
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
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    //   点击表格编辑 按钮
    handleEdit(index, row) {
      this.centerDialogVisible = true;
      this.EditFaceTitle = "修改店铺";
      this.handleEditList = row;
      this.handleEditIndex = index;
      this.handleLit.forEach((e, i) => {
        if (e.name == row.status) {
          this.handleIndex = e.value;
        }
      });
      this.addChangeStatus = false;
    },
    // 添加page
    addList() {
      this.EditFaceTitle = "添加店铺";
      this.centerDialogVisible = true;
      this.handleEditList = {
        shopuser: "",
        shoppwd: "",
        APIKey: "",
        remarks: "",
      };
      this.handleIndex = 0;
      this.addChangeStatus = true;
    },
    // 点击确定修改或者添加按钮
    addAuthor() {
      // 提示
      if (this.handleEditList.shopuser == "") {
        this.$message({
          message: "请输入趣天账号",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.handleEditList.shoppwd == "") {
        this.$message({
          message: "请输入趣天密码",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      if (this.handleEditList.aPIKey == "") {
        this.$message({
          message: "请输入APIkey",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      let data;
      if (this.addChangeStatus) {
        //   添加
        data = {
          shopid: 0,
          userid: this.InfoData.id,
          status: this.handleIndex,
          shopuser: this.handleEditList.shopuser,
          shoppwd: this.handleEditList.shoppwd,
          APIKey: this.handleEditList.aPIKey,
          remarks: this.handleEditList.remarks,
        };
      } else {
        //   编辑
        data = {
          shopid: this.handleEditList.id,
          userid: this.handleEditList.userid,
          status: this.handleIndex,
          shopuser: this.handleEditList.shopuser,
          shoppwd: this.handleEditList.shoppwd,
          APIKey: this.handleEditList.aPIKey,
          remarks: this.handleEditList.remarks,
        };
      }
      this.tableLoading = true;
      this.centerDialogVisible = false;

      this.$axios({
        url: "/sigaoyi/addQoo10shop",
        method: "POST",
        params: data,
      })
        .then((result) => {
          if (result.data.code == "200") {
            if (this.addChangeStatus) {
              this.searchInput(30, 1);
            } else {
              // 保存成功
              this.tableData[this.handleEditIndex] = data;
              this.tableData.forEach((e) => {
                if (e.status == 0) {
                  e.status = "在售";
                } else if (e.status == 1) {
                  e.status = "停售";
                }
              });
            }
            this.centerDialogVisible = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.tableLoading = false;
            this.centerDialogVisible = true;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          //   loading.close();
          this.tableLoading = false;
          this.centerDialogVisible = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // 全选状态值
    setAll(selection) {
      if (selection.length > 0) {
        this.Allstatus = true;

        selection.forEach((e) => {
          e.selected = true;
        });
      } else {
        this.Allstatus = false;
        this.tableData.forEach((e) => {
          e.selected = false;
        });
      }
    },
    //   是否选中的状态值
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;

      this.tableData.forEach((e) => {
        e.selected = false;
      });
      rows.forEach((e) => {
        e.selected = true;
      });
    },
    // 点击 全选按钮
    Allset() {
      this.tableData.forEach((e) => {
        this.$refs.multipleTable.toggleAllSelection(e);
        e.selected = true;
      });
    },
    // 选择的列表删除
    deteleList(index, row) {
      this.$axios({
        url: "/sigaoyi/delectQoo10shop",
        method: "POST",
        params: {
          ids: row.id,
        },
      })
        .then((result) => {
          if (result.data.code == "200") {
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
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchInput(this.pageSize, this.currentPage);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchInput(this.pageSize, this.currentPage);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 获取所有店铺
    getStore(amount, pages) {
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
        url: "/sigaoyi/NEWqoo10Shop",
        method: "POST",
        params: {
          amount: amount,
          pages: pages,
          userId: this.InfoData.id,
          companyPrincipal: this.InfoData.company,
        },
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.tableData = result.data.qoo10shops;
            this.tableData.forEach((e) => {
              if (e.status == 0) {
                e.status = "在售";
              } else if (e.status == 1) {
                e.status = "停售";
              }
            });
            this.total = result.data.page.total;
            this.pageSize = result.data.page.amount;
            this.currentPage = result.data.page.pages;
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
    ...homeActions(["setWstateStatus", "setInfoData"]),
  },
};
</script>