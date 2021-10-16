<template>
  <div class="accountAcceptDefault">
    <div class="dandruff">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="accountInfo">
      <div class="account-header">
        <div class="status-type">
          <div class="statusDiv">
            <span class="text">状</span>
            <span class="text1">态：</span>
            <div>
              <select
                v-model="radioStatusIndex"
                @change="changeSet(radioStatusList, radioStatusIndex)"
              >
                <option
                  v-for="(item, index) in radioStatusList"
                  :key="index"
                  :value="index"
                  :selected="item.selected"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="typeDiv">
            <span class="text">类</span>
            <span class="text1">型：</span>
            <div>
              <select
                v-model="radioTypeIndex"
                @change="changeSet(radioTypeList, radioTypeIndex)"
              >
                <option
                  v-for="(item, index) in radioTypeList"
                  :key="index"
                  :value="index"
                  :selected="item.selected"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="comppanyName">
            <span>公司名：</span>
            <select class="companySelect">
              <option value="99">请选择</option>
              <option
                :value="item.companyId"
                v-for="(item, index) in allCompanyList"
                :key="index"
              >
                {{ item.companyName }}
              </option>
            </select>
          </div>
        </div>
        <div class="sreach">
          <div v-for="(item, index) in sreachList" :key="index">
            <span>{{ item.name }}</span>
            <input
              class="Sinput"
              type="text"
              :name="item.name"
              :placeholder="item.placeholder"
              @keydown.enter="resetAndSreach(false, currentPage, pageSize)"
            />
          </div>
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
            @click="resetAndSreach(false, currentPage, pageSize)"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="content">
        <div class="v-content">
          <div class="btn">
            <el-button
              type="success"
              icon="el-icon-circle-check"
              size="small"
              @click="Allset(tableData[1])"
              >全选</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete-location"
              size="small"
              @click="Alldetele()"
              >删除</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-add-location"
              size="small"
              @click="addClick()"
              >添加</el-button
            >
          </div>
          <!-- 表格 -->
          <div class="tableList">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              maxHeight="577px"
              stripe
              @select="onTableSelect"
              @select-all="setAll"
              @selection-change="handleSelectionChange"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"> </el-table-column>
              <el-table-column
                label="编号"
                prop="userId"
                width="60"
              ></el-table-column>
              <el-table-column label="昵称" prop="userName"></el-table-column>
              <el-table-column
                label="用户名"
                prop="actualName"
              ></el-table-column>
              <el-table-column
                label="密码"
                prop="userPassword"
              ></el-table-column>
              <el-table-column
                label="邮箱"
                prop="mailbox"
                width="200"
              ></el-table-column>
              <el-table-column
                label="手机号码"
                prop="phoneNumber"
                width="150"
              ></el-table-column>
              <el-table-column
                label="账号类型"
                prop="userLever"
                width="120"
              ></el-table-column>
              <el-table-column
                label="公司名"
                prop="company_name"
                width="180"
              ></el-table-column>
              <el-table-column
                label="部门名字"
                prop="department_id"
              ></el-table-column>
              <!-- <el-table-column label="余额" prop="balance"></el-table-column>
                <el-table-column label="积分" prop="integral"></el-table-column>
                <el-table-column
                  label="信用度"
                  prop="creditLine"
                ></el-table-column>
                <el-table-column
                  label="登陆IP"
                  prop="LoginIp"
                ></el-table-column>
                <el-table-column
                  label="推荐链接"
                  prop="recommendedLinks"
                ></el-table-column>
                <el-table-column
                  label="推荐次数"
                  prop="recommendedCount"t
                ></el-table-column> -->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="personal(scope.$index, scope.row)"
                    >个人详情</el-button
                  >
                  <!-- <el-button
                    type="text"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  > -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 个人详情 -->
          <el-dialog title="个人详情" center :visible.sync="dialogTableVisible">
            <el-table :data="gridData" border stripe>
              <el-table-column
                property="balance"
                label="余额"
                align="center"
              ></el-table-column>
              <el-table-column
                property="integral"
                label="积分"
                align="center"
              ></el-table-column>
              <el-table-column
                property="creditScore"
                label="信用度"
                align="center"
              ></el-table-column>
              <el-table-column
                property="LoginIP"
                label="登陆IP"
                align="center"
              ></el-table-column>
              <el-table-column
                property="recommendedLinks"
                label="推荐链接"
                align="center"
              ></el-table-column>
              <el-table-column
                property="recommendedTimes"
                label="推荐次数"
                align="center"
              ></el-table-column>
              <el-table-column
                property="recommended"
                label="推荐人"
                align="center"
              ></el-table-column>
            </el-table>
          </el-dialog>
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
  </div>
</template>

<script>
import "../../../assets/less/accountAccept/accountAcceptDefault.css";
import timestampToTimes from "../../../assets/js/timestampToTime";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //   radioStatus
      radioStatusIndex: 0,
      radioStatusList: [
        { name: "全部", selected: true, id: 99 },
        { name: "正常", selected: false, id: 0 },
        { name: "欠费", selected: false, id: 1 },
        { name: "停用", selected: false, id: 2 },
      ],
      // redioType
      radioTypeIndex: 0,
      radioTypeList: [
        { name: "全部", selected: true, id: 99 },
        { name: "系统管理", selected: false, id: 0 },
        { name: "内部公司", selected: false, id: 1 },
        { name: "内部公司员工", selected: false, id: 2 },
        { name: "外部公司", selected: false, id: 3 },
        { name: "外部公司员工", selected: false, id: 4 },
        { name: "个人账号", selected: false, id: 5 },
      ],
      //   select 所有公司
      allCompanyList: [],
      // sreachList
      sreachList: [
        { name: "用户名：", placeholder: "请输入" },
        { name: "手机号：", placeholder: "请输入" },
      ],
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   总页数
      total: 0,
      //   表格
      tableData: [],
      copyTableData: [],
      //   点击个人编辑 弹出表格
      dialogTableVisible: false,
      gridData: [
        {
          balance: "",
          integral: "",
          creditScore: "",
          LoginIP: "",
          recommendedLinks: "",
          recommendedTimes: "",
          recommended: "",
        },
      ],
      //   是否是全选的状态
      //   Allstatus: false,
      // 点击编辑拿到的对象
      compileData: {},
      //   搜索的对象
      searchList: {
        status: 99,
        type: 99,
        companyID: 99,
        userName: "",
        phoneName: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    document.title = "产品订单";
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (from.path == "/personalEditor") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      //false   // 清空原有数据
      this.allCompanyList = [];
      this.copyTableData = [];
      // 获取所有公司
      //   this.getCompany();
      // 获取所有用户
      //   this.getUser(1, 30);
      // 重置
      //   this.resetAndSreach(true);
    } else {
      this.$route.meta.isBack = false;
      if (this.$route.query.firstRouter) {
        // 获取所有公司
        this.getCompany();
        // 获取所有用户
        this.getUser(1, 30);
      }
    }
  },
  created() {
    //   获取所有公司
    this.getCompany();
    //   获取所有用户
    this.getUser(1, 30);
  },

  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    ...homeActions(["setWstateStatus"]),
    changeSet(array, index) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[index].selcted = true;
    },
    // 重置 和 搜索
    resetAndSreach(booleans, pages, val) {
      //   input
      let inputList = document.querySelectorAll(".Sinput");
      if (booleans) {
        for (let i = 0; i < inputList.length; i++) {
          inputList[i].value = "";
        }
        // selected
        let setList = document.querySelector(".companySelect").children;
        for (let i = 0; i < setList.length; i++) {
          setList[i].selected = false;
          if (setList[i].value == "99") {
            setList[i].selected = true;
          }
        }
        // 类型radio
        for (let i = 0; i < this.radioTypeList.length; i++) {
          this.radioTypeList[i].checked = false;
          if (this.radioTypeList[i].id == "99") {
            this.radioTypeList[i].checked = true;
          }
        }
        // 状态radio
        for (let i = 0; i < this.radioStatusList.length; i++) {
          this.radioStatusList[i].checked = false;
          if (this.radioStatusList[i].id == "99") {
            this.radioStatusList[i].checked = true;
          }
        }
      } else {
        this.radioStatusList.forEach((element) => {
          if (element.checked) {
            this.searchList.status = element.id;
          }
        });
        this.radioTypeList.forEach((element) => {
          if (element.checked) {
            this.searchList.type = element.id;
          }
        });
        // 选择所有公司 select
        // companySelect
        let options = document.querySelector(".companySelect").children;

        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            this.searchList.companyID = options[i].value;
          }
        }
        for (let i = 0; i < inputList.length; i++) {
          if (inputList[i].name == "用户名：") {
            this.searchList.userName = inputList[i].value;
          } else {
            this.searchList.phoneName = inputList[i].value;
          }
        }

        let loading = this.$loading({
          lock: false,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sugoiERP/QueryallUserTableInfo",
          method: "POST",
          params: {
            pages: pages,
            amount: val,
            userName: this.searchList.userName,
            phoneNumber: this.searchList.phoneName,
            company_id: this.searchList.companyID,
            userStatus: this.searchList.status,
            userLever: this.searchList.type,
          },
        })
          .then((result) => {
            setTimeout(() => {
              loading.close();
            }, 500);

            if (result.data.ResultMsg == "error") {
              this.$notify({
                title: "请求失败",
                message: result.data.message,
                type: "warning",
                offset: 50,
              });
            } else {
              this.$notify({
                title: "请求成功",
                message: result.data.message,
                type: "success",
                offset: 50,
              });

              this.total = result.data.page.total;

              this.copyTableData = result.data.userTables;
              this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
            }
          })
          .catch((err) => {
            setTimeout(() => {
              loading.close();
            }, 500);

            this.$notify({
              title: "请求错误",
              message: "系统业务,请稍后再试",
              type: "error",
              offset: 50,
            });
          });
      }
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.resetAndSreach(false, this.currentPage, this.pageSize);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.resetAndSreach(false, this.currentPage, this.pageSize);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 表格事件
    handleSelectionChange() {},
    // 是否是选中的状态
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;
    },
    // 点击input type=checked 全选
    setAll(selection) {
      if (selection.length > 0) {
        this.Allstatus = true;
        selection.forEach((e) => {
          e.selected = true;
        });
      } else {
        this.Allstatus = false;
        selection.forEach((e) => {
          e.selected = false;
        });
      }
    },
    // 点击 全选按钮
    Allset(e) {
      this.tableData.forEach((e) => {
        e.selected = true;
        this.$refs.multipleTable.toggleAllSelection(e);
      });
    },
    // 点击添加页面
    addClick() {
      const loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 400);
      let nowDate = timestampToTimes.timestampToTime(new Date().getTime());
      let item = {
        balance: 0,
        creditScore: 0,
        userCreatTime: nowDate,
        recommended: "",
        recommendedTimes: 0,
        integral: 0,
        department_id: 0,
        loginIP: "",
        modifyTime: nowDate,
      };
      this.allCompanyList.forEach((e) => {
        e["selected"] = false;
      });
      let allCompanyList = JSON.stringify(this.allCompanyList);
      let items = JSON.stringify(item);

      setTimeout(() => {
        this.$router.push({
          name: "PersonalEditor",
          query: { saveAdd: true, item: items, allCompanyList: allCompanyList },
        });
      }, 500);
    },
    // 点击个人详情
    personal(index, row) {
      for (const key in row) {
        //   timestampToTimes
        row.userCreatTime = timestampToTimes.timestampToTime(row.userCreatTime);
        row.modifyTime = timestampToTimes.timestampToTime(row.modifyTime);
      }
      //   this.allCompanyList.forEach((e) => {
      //     e["selected"] = false;
      //   });
      //   let item = JSON.stringify(row);
      //   let allCompanyList = JSON.stringify(this.allCompanyList);
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
          name: "PersonalEditor",
          query: { saveAdd: false },
        });
      }, 500);
    },
    // 编辑
    handleEdit(index, row) {
      this.personal(index, row);
    },
    // 输入事件
    inputVal(e, nameVal) {
      // this.compileData.nameVal = e.target.value
      for (const key in this.compileData) {
        this.compileData[nameVal] = e.target.value;
      }
    },
    // 点击修改 0000
    changeStatus(flag) {
      if (flag) {
        // 修改
      } else {
        // 添加
        for (const key in this.compileData) {
          if (this.compileData[key] == "") {
            this.$message({
              message: "必须全部填写",
              center: true,
              type: "warning",
              duration: 800,
            });

            return;
          }
        }
        this.$notify({
          title: "请求成功",
          message: result.data.message,
          type: "success",
          offset: 50,
        });

        this.tableData.push(this.compileData);

        this.AllMask = false;
      }
    },
    // 单项删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 多项删除
    Alldetele() {
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        this.$confirm("", "是否要全部删除", {
          dangerouslyUseHTMLString: true,
          center: true,
          type: "warning",
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          customClass: "delMessage",
        }).then(() => {
          for (let i = this.tableData.length - 1; i >= 0; i--) {
            if (this.tableData[i].selected) {
              this.tableData.splice(i, 1);
            }
          }
          this.$notify({
            title: "请求成功",
            message: "已删除",
            type: "success",
            offset: 50,
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
    // 获取所有用户信息
    getUser(pages, val) {
      if (sessionStorage.getItem("token") == undefined) {
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
        url: "/sugoiERP/QueryallUserTableInfo",
        params: {
          pages: pages,
          amount: val,
          userName: this.searchList.userName,
          phoneNumber: this.searchList.phoneName,
          Company_id: this.searchList.companyID,
          userStatus: this.searchList.status,
          userLever: this.searchList.type,
        },
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);

          if (result.data.ResultMsg == "success") {
            this.total = result.data.page.total;
            this.copyTableData = result.data.userTables;
            this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
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
        });
    },
    // 获取所有的公司
    getCompany() {
      if (sessionStorage.getItem("token") == undefined) {
        alert("请先登陆!");
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
        url: "/sugoiERP/QueryallCompanyInfo",
        method: "POST",
        params: {
          userId: this.InfoData.userId,
        },
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);

          this.allCompanyList = result.data.companies;

          // this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
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
        });
    },
  },
};
</script>

<style>
</style>