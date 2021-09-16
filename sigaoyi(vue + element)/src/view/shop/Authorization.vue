<template>
  <div class="authorization">
    <div class="main" v-title data-title="授权"></div>
    <div class="v-authorization">
      <div class="box">
        <div class="dandruff" ref="dandruff">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item>授权</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="titleText">
          <div class="departmentList">
            <span>店铺状态：</span>
            <select v-model="setIndex" @change="changeSet(setList, setIndex)">
              <option
                v-for="(item, index) in setList"
                :key="index"
                :value="index"
                :selected="item.selected"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="nameTextList">
            <span>店铺名字：</span>
            <input type="text" placeholder="请输入" v-model="shopNameVal" />
          </div>
          <div class="btn">
            <el-button
              type="success"
              icon="el-icon-refresh-right"
              size="small"
              @click="resetBtn()"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="searchInput(30, 1)"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="authorTalble">
          <div class="btn">
            <el-button
              type="primary"
              icon="el-icon-circle-check"
              size="small"
              @click="Allset()"
              >全选</el-button
            >
            <el-button
              type="success"
              icon="el-icon-add-location"
              size="small"
              @click="addList()"
              >添加</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete-location"
              size="small"
              @click="Alldetele()"
              >删除</el-button
            >
            <!-- <el-button icon="el-icon-s-promotion" size="small" type="primary" 
              >导出</el-button
            > -->
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
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button v-show="shouquan" size="mini" type="primary"
                  >授权</el-button
                >
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
      width="30%"
      center
      custom-class="handleEditFace"
    >
      <div class="content">
        <div>
          <span>店铺名称：</span>
          <input
            type="text"
            ref="shopName"
            v-model="handleEditList.shopuser"
            placeholder="请输入店名"
          />
        </div>
        <div>
          <span>店铺密码：</span>
          <input
            type="text"
            ref="shopPwd"
            v-model="handleEditList.shoppwd"
            placeholder="请输入店铺密码"
          />
        </div>
        <div>
          <span>店铺状态：</span>
          <select
            v-model="handleIndex"
            @change="changeSet(handleLit, handleIndex)"
          >
            <option
              v-for="(item, index) in handleLit"
              :key="index"
              :value="index"
              :selected="item.selected"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div>
          <span>APIkey：</span>
          <input
            type="text"
            ref="APIKey"
            v-model="handleEditList.aPIKey"
            placeholder="请输入QPIkey"
          />
        </div>
        <div class="">
          <span>备注：</span>
          <textarea
            cols="20"
            ref="shopRemarks"
            rows="8"
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
      setIndex: 0,
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
      EditFaceTitle: "变体修改",
      handleIndex: 0,
      handleLit: [
        { name: "全部", selected: true, value: 99 },
        { name: "在售", selected: false, value: 0 },
        { name: "停售", selected: false, value: 1 },
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
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.setWstateStatus(true);
    this.$nextTick(() => {
      this.getStore(this.pageSize, this.currentPage);
    });

    // console.log("this.$route.name ==>", this.$route.name);
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  components: {
    footerDiv,
  },
  methods: {
    // changeSet
    changeSet(array, index) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[index].selected = true;
      console.log("array ==>", array);
    },
    //  重置
    resetBtn() {
      this.setIndex = 0;
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
          status: this.setList[this.setIndex].value,
          shopuser: this.shopNameVal,
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
              offset: 50,
            });
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
          console.log("err ==>", err);
        });
    },
    //   点击表格编辑 按钮
    handleEdit(index, row) {
      this.centerDialogVisible = true;
      this.EditFaceTitle = "修改变体";
      this.handleEditList = row;
      this.handleEditIndex = index;
      this.handleLit.forEach((e, i) => {
        e.selected = false;
        if (e.name == row.status) {
          e.selected = true;
          this.handleIndex = i;
        }
      });
      this.addChangeStatus = false;
      console.log("row ==>", row);
    },
    // 添加page
    addList() {
      this.EditFaceTitle = "添加变体";
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
      if (this.handleLit[this.handleIndex].value == 99) {
        this.$message({
          message: "请选择店铺状态",
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
          status: this.handleLit[this.handleIndex].value,
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
          status: this.handleLit[this.handleIndex].value,
          shopuser: this.handleEditList.shopuser,
          shoppwd: this.handleEditList.shoppwd,
          APIKey: this.handleEditList.aPIKey,
          remarks: this.handleEditList.remarks,
        };
      }
      console.log("data ==>", data);
       this.centerDialogVisible = false;
      // 发起请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/addQoo10shop",
        method: "POST",
        params: data,
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);
          console.log("result ==>", result);
          if (result.data.code == "200") {
            console.log("this.addChangeStatus ==>", this.addChangeStatus);
            if (this.addChangeStatus) {
              // 添加成功
              //   this.tableData.unshift();
              //   this.tableData.forEach((e) => {
              //     if (e.status == 0) {
              //       e.status = "在售";
              //     } else if (e.status == 1) {
              //       e.status = "停售";
              //     }
              //   });
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
              console.log("this.tableData ==>", this.tableData);
            }
            this.centerDialogVisible = false;
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
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
          loading.close();
          this.centerDialogVisible = true;
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    // 全选状态值
    setAll(selection) {
      console.log("selection ==>", selection);
      if (selection.length > 0) {
        this.Allstatus = true;
        console.log("1");
        selection.forEach((e) => {
          e.selected = true;
          console.log("e ==>", e.selected);
        });
      } else {
        console.log("2");
        this.Allstatus = false;
        this.tableData.forEach((e) => {
          e.selected = false;
          console.log("e.selected ==>", e.selected);
        });
      }
      // console.log("this.Allstatus ==>", this.Allstatus);
    },
    //   是否选中的状态值
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;
      // console.log("selected ==>",selected)  // true就是选中，0或者false是取消选中
      console.log("row ==>", row);
      this.tableData.forEach((e) => {
        e.selected = false;
      });
      rows.forEach((e) => {
        e.selected = true;
      });
      console.log("rows ==>", rows);
    },
    // 点击 全选按钮
    Allset() {
      this.tableData.forEach((e) => {
        this.$refs.multipleTable.toggleAllSelection(e);
        e.selected = true;
      });
    },
    // 选择的列表删除
    Alldetele() {
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        this.$confirm("", "是否要删除选中的列表", {
          dangerouslyUseHTMLString: true,
          center: true,
          type: "warning",
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          customClass: "delMessage",
        }).then(() => {
          var ids = "";
          var indexList = [];
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].selected) {
              ids += this.tableData[i].id + ",";
              indexList.push(i);
            }
          }
          ids = ids.substring(0, ids.length - 1);
          //   发起请求
          let loading = this.$loading({
            lock: false,
            text: "删除中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.$axios({
            url: "/sigaoyi/delectQoo10shop",
            method: "POST",
            params: {
              ids: ids,
            },
          })
            .then((result) => {
              loading.close();
              console.log("result ==>", result);
              if (result.data.code == "200") {
                for (let i = indexList.length - 1; i >= 0; i--) {
                  this.tableData.splice(indexList[i], 1);
                }
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
              loading.close();
              console.log("err ==>", err);
              this.$notify({
                title: "请求错误",
                message: "系统业务繁忙,请稍后再试",
                type: "error",
                offset: 50,
              });
            });
        });
      } else {
        this.$message({
          message: "请选择你要删除的列表",
          center: true,
          type: "error",
          duration: 800,
        });
      }
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.searchInput(this.pageSize, this.currentPage);
    },
    // 去第几页
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.searchInput(this.pageSize, this.currentPage);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
      // console.log('cccccccccc ==>', this.currentPage)
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
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWqoo10Shop",
        method: "POST",
        params: {
          amount: amount,
          pages: pages,
          userId: this.InfoData.id,
        },
      })
        .then((result) => {
          console.log("result ==>", result);
          setTimeout(() => {
            loading.close();
          }, 500);
          if (result.data.Code == 200) {
            if (result.data.qoo10shops.length == 0) {
              this.$notify({
                title: "请求成功",
                message: "该用户没有店铺",
                type: "success",
                offset: 50,
              });
            } else {
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
          setTimeout(() => {
            loading.close();
          }, 500);
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    ...homeActions(["setWstateStatus", "setInfoData"]),
  },
};
</script>