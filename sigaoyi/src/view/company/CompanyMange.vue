<template>
  <div class="company">
    <div class="main" v-title data-title="公司管理"></div>
    <div class="box">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="companyInfo">
        <div class="company-header">
          <div class="title">
            <span class="title-text">状</span>
            <span>态：</span>
            <div
              v-for="(item, index) in statusData"
              :key="index"
              @click="clickRadio(statusData, item, index)"
            >
              <input type="radio" :checked="item.checked" :value="item.value" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="inputList">
            <div class="companyName">
              <span>公司名字：</span>
              <select ref="options" class="options">
                <option value="0">思高易</option>
                <option value="1">思高易分公司</option>
              </select>
            </div>
            <div class="divisionalName">
              <span>部门名字：</span>
              <input ref="divisionalName" type="text" placeholder="请输入" />
            </div>
            <div class="Administrator">
              <span>管理员：</span>
              <input ref="Administrator" type="text" placeholder="请输入" />
            </div>
            <div class="iconList">
              <!-- <div @click="resetIniput()">
                <i class="el-icon-refresh-right"></i>
              </div>
              <div><i class="el-icon-search"></i></div> -->
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
                @click="searchInput()"
                >搜索</el-button
              >
            </div>
          </div>
        </div>
        <div class="company-table">
          <div class="btn clearfix">
            <div class="fr">
              <el-button
                type="primary"
                icon="el-icon-add-location"
                size="small"
                @click="addDivisional()"
                >添加</el-button
              >
            </div>
            <div class="fr">
              <span>批量操作：</span>
              <select>
                <option value="">删除</option>
                <option value="">停用</option>
                <option value="">正常</option>
              </select>
            </div>
          </div>
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
              @selection-change="handleSelectionChange"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="companyId" label="编号"></el-table-column>
              <el-table-column
                prop="companyName"
                label="公司名"
              ></el-table-column>
              <el-table-column prop="scale" label="规模"></el-table-column>
              <el-table-column
                prop="businessNumber"
                label="营业编号"
              ></el-table-column>
              <el-table-column label="营业执照">
                <template slot-scope="scope">
                  <img :src="scope.row.ImageUrl" style="height: 40px" />
                </template>
              </el-table-column>
              <el-table-column
                prop="principalName"
                label="负责人"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
              ></el-table-column
              >
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="comment" label="备注"></el-table-column>
              <el-table-column label="操作">
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
              :page-sizes="[2, 5, 10, 12]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next, slot,jumper"
              :total="copyTableData.length"
            >
              <span class="ensure-btn fr" @click="clickTrue()">确定</span>
            </el-pagination>
          </div>
        </div>
        <!-- 点击修改或者添加按钮 -->
        <el-dialog
          title="编辑公司"
          :visible.sync="companyDialog"
          width="27%"
          custom-class="comopanyMangeDialog"
          close-on-click-moda
          center
        >
          <div class="content">
            <div>
              <span>公司名：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.companyName"
              />
            </div>
            <div>
              <span>规模：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.scale"
              />
            </div>
            <div>
              <span>营业编号：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.businessNumber"
              />
            </div>
            <div class="imgNumber">
              <span>营业执照：</span>
              <img :src="DialogText.ImageUrl" alt="" />
            </div>
            <div>
              <span>负责人：</span>
              <input
                type="text"
                placeholder="请输入"
                v-model="DialogText.principalName"
              />
            </div>
            <div>
              <span>状态：</span>
              <div class="radio">
                <div v-for="(item, index) in radioList" :key="index">
                  <span>{{ item.name }}</span>
                  <input type="radio" :checked="item.checked" />
                </div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="companyDialog = false">取 消</el-button>
            <el-button type="primary" @click="companyDialog = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- <footerDiv></footerDiv> -->
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
      statusData: [
        { name: "全部", value: "0", checked: true },
        { name: "正常", value: "1", checked: false },
        { name: "停用", value: "2", checked: false },
      ],

      //   表格
      tableData: [],
      copyTableData: [
        {
          companyId: "001",
          companyName: "思高易",
          scale: "11",
          businessNumber: "98595",
          scope: "64641616",
          principalName: "----",
          ImageUrl:
            "http://www.ec-sigaoyi.com/sigaoyi/assets/img/%E5%9B%BE%E7%89%87.jpg",
          createTime:"----",
          status:"正常",
          comment:"主要",
        },
         {
          companyId: "002",
          companyName: "老年人电动车",
          scale: "4546",
          businessNumber: "1151563",
          scope: "798461",
          principalName: "----",
          ImageUrl:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1317576163,911743821&fm=26&gp=0.jpg",
        },
         {
          companyId: "002",
          companyName: "雪糕批发",
          scale: "3",
          businessNumber: "468463",
          scope: "4156543135",
          principalName: "----",
          ImageUrl:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1976503924,3877240699&fm=15&gp=0.jpg",
        },
      ],
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 5,
      //   默认照片路径
      defaulImgSrc: require("../../assets/img/defaultImg.jpg"),
      // 编辑或者添加弹出层的状态值
      companyDialog: false,
      // 弹出层radioList
      radioList: [
        { name: "0", checked: true },
        { name: "1", checked: false },
      ],
      // 弹出层内容
      DialogText: [],
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
    this.$nextTick(() => {
      this.handleSizeChange(this.pageSize);
    });

    // this.getCompany()

    this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
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
      // console.log("this.$refs.options ==>",this.$refs.options.children)
      let options = this.$refs.options.children;
      for (let i = 0; i < options.length; i++) {
        if (options[i].value == 0) {
          options[i].selected = true;
        }
      }
      this.$refs.divisionalName.value = "";
      this.$refs.Administrator.value = "";
    },
    // 搜索
    searchInput() {
      let data = {
        status: "",
        optionVal: "",
        departmentName: this.$refs.divisionalName.value,
        AdministratorVal: this.$refs.Administrator.value,
      };
      // status
      for (let i = 0; i < this.statusData.length; i++) {
        if (this.statusData[i].checked) {
          data.status = Number(this.statusData[i].value);
        }
      }
      // options
      let optionsList = document.querySelector(".options").children;
      for (let i = 0; i < optionsList.length; i++) {
        if (optionsList[i].selected) {
          data.optionVal = Number(optionsList[i].value);
        }
      }
      console.log("data ==>", data);
    },
    // 点击添加按钮
    addDivisional() {
      this.companyDialog = true;
      this.DialogText = {
        ImageUrl: require("../../assets/img/defaultImg.jpg"),
        businessNumber: "",
        companyId: "",
        companyName: "",
        principalName: "",
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
      console.log("row ==>", row);
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(val);
    },
    // 去第几页
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      let abc = this.pageSize * (val - 1);
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(0, abc);
      this.tableData.splice(this.pageSize);
      //   console.log('this.pageSize ==>',this.pageSize)
      //   this.tableData = a.splice(this.pageSize)
      console.log("this.tableData ==>", this.tableData);
      // console.log("a ==>",a)
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
      // console.log('cccccccccc ==>', this.currentPage)
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>