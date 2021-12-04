<template>
  <div class="company">
    <div class="main" v-title data-title="公司管理"></div>
    <div class="box">
      <div class="companyInfo">
        <div class="company-header">
          <div>
            <span class="text">营业状态：</span>
            <el-select v-model="statusIndex" clearable placeholder="请选择">
              <el-option
                v-for="item in statusData"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">公司名字：</span>
            <el-select v-model="companyIndex" clearable placeholder="请选择">
              <el-option
                v-for="item in companyList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">负责人：</span>
            <input v-model="administrator" type="text" placeholder="请输入" />
          </div>
          <div class="header-btn">
            <el-button size="medium" @click="resetIniput()">重置</el-button>
            <el-button
              type="primary"
              size="medium"
              @click="searchInput(pageSize, currentPage, true)"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="company-table">
          <div class="btn">
            <el-button type="primary" size="medium" @click="addDivisional()"
              >添加</el-button
            >
            <el-select
              v-model="batchVal"
              @change="changeBatch()"
              popper-class="batchSet"
            >
              <el-option
                v-for="item in batchList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="relaod" @click="getCompanyList()">
              <i class="el-icon-refresh-right"></i>
            </span>
          </div>
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
              v-loading="loading"
              @selection-change="handleSelectionChange"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="id" label="编号"></el-table-column>
              <el-table-column
                prop="companyName"
                label="公司名"
              ></el-table-column>
              <el-table-column prop="scale" label="规模"></el-table-column>
              <el-table-column
                prop="businessNumber"
                label="营业编号"
              ></el-table-column>
              <el-table-column label="营业logo">
                <template slot-scope="scope">
                  <img :src="scope.row.companyImg" style="height: 40px" />
                </template>
              </el-table-column>
              <el-table-column
                prop="companyPrincipal"
                label="负责人"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
              ></el-table-column>
              <el-table-column prop="statusText" label="状态"></el-table-column>
              <el-table-column prop="comment" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="edit">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)"
                      >编辑</el-button
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
        <!-- 点击修改或者添加按钮 -->
        <el-dialog
          title="编辑公司"
          :visible.sync="companyDialog"
          width="35%"
          custom-class="comopanyMangeDialog"
          close-on-click-moda
        >
          <div class="content">
            <div>
              <span class="text">公司名：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.companyName"
              />
            </div>
            <div>
              <span class="text">规模：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.scale"
              />
            </div>
            <div>
              <span class="text">营业编号：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.businessNumber"
              />
            </div>
            <div>
              <span class="text">负责人：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.companyPrincipal"
              />
            </div>
            <div>
              <span class="text">状态：</span>
              <el-select v-model="radioIndex">
                <el-option
                  v-for="item in radioList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="imgNumber">
              <span class="text">营业执照：</span>
              <img
                v-if="DialogText.companyImg"
                :src="DialogText.companyImg"
                alt=""
              />
              <div class="addImg" v-else>
                <input type="file" accept="image/*" />
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="companyDialog = false"
              >确 定</el-button
            >
            <el-button @click="companyDialog = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/company/company.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //   状态
      statusIndex: "0",
      statusData: [
        { name: "全部", value: "0" },
        { name: "正常", value: "1" },
        { name: "停用", value: "2" },
      ],
      companyIndex: 0,
      companyList: [
        { name: "思高易", value: 0 },
        { name: "思高易分公司", value: 1 },
      ],
      // 批量操作
      batchIndex: "",
      batchVal: "批量操作",
      batchList: [
        { label: "正常", value: 0 },
        { label: "停用", value: 1 },
        { label: "删除", value: 2 },
      ],
      //   表格
      tableData: [],
      loading: false,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      total: 0,
      // 编辑或者添加弹出层的状态值
      companyDialog: false,
      // 弹出层radioList
      radioIndex: "0",
      radioList: [
        { name: "正常", value: "0" },
        { name: "停用", value: "1" },
      ],
      // 弹出层内容
      DialogText: [],
      // 负责人
      administrator: "",
    };
  },
  components: {
    // footerDiv,
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    this.getCompanyList();
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 批量操作
    changeBatch() {
      this.batchIndex = this.batchVal;
      this.batchVal = "批量操作";
      //   if (this.batchIndex == 0) {
      //     this.scheduled.state = true;
      //   } else if (this.batchIndex == 1) {
      //     this.apply.state = true;
      //   } else if (this.batchIndex == 2) {
      //     this.deliveryAll.state = true;
      //   }
    },
    // 重置
    resetIniput() {
      this.statusIndex = 0;
      this.companyIndex = 0;
      this.administrator = "";
    },
    // 搜索
    searchInput(amount, pages, flag) {
      let data = {
        userId: this.InfoData.id,
        amount: amount,
        pages: pages,
        status: this.statusIndex,
        companyName: "",
        companyPrincipal: "",
      };

      if (flag) {
        data.amount = 30;
        data.pages = 1;
      }

      this.loading = true;

      console.log("data ==>", data);

      this.$axios({
        method: "POST",
        url: "/sigaoyi/getAllConpanyInfo",
        params: {
          userId: this.InfoData.id,
          amount: 30,
          pages: 1,
          status: 99,
          companyName: "",
          companyPrincipal: "",
        },
      })
        .then((result) => {
          this.loading = false;
          if (result.data.Code == 200) {
            result.data.companies.forEach((e) => {
              if (e.status == 0) {
                e["statusText"] = "正常";
              } else {
                e["statusText"] = "停用";
              }
            });
            this.tableData = result.data.companies;
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
    // 点击添加按钮
    addDivisional() {
      this.companyDialog = true;
      this.DialogText = {
        companyImg: "",
        businessNumber: "",
        companyId: "",
        companyName: "",
        companyPrincipal: "",
        scale: "",
        scope: "",
      };
    },
    // 表格
    handleSelectionChange() {},
    // 编辑
    handleEdit(index, row) {
      this.companyDialog = true;
      this.DialogText = row;
      console.log(row);
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchInput(this.pageSize, this.currentPage, false);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchInput(this.pageSize, this.currentPage, false);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 获取 公司 list
    getCompanyList() {
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

      this.loading = true;

      this.$axios({
        method: "POST",
        url: "/sigaoyi/getAllConpanyInfo",
        params: {
          userId: this.InfoData.id,
          amount: 30,
          pages: 1,
          status: 99,
          companyName: "",
          companyPrincipal: "",
        },
      })
        .then((result) => {
          this.loading = false;
          if (result.data.Code == 200) {
            result.data.companies.forEach((e) => {
              if (e.status == 0) {
                e["statusText"] = "正常";
              } else {
                e["statusText"] = "停用";
              }
            });
            this.tableData = result.data.companies;
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