<template>
  <div class="divisional">
    <div class="main" v-title data-title="部门管理"></div>
    <div class="box">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>部门管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="divisionalInfo">
        <div class="division-header">
          <div class="title">
            <span class="title-text">状</span>
            <span>态：</span>
            <div
              v-for="(item, index) in statusData"
              :key="index"
              @click="clickRadio(statusData, item, index)"
            >
              <input type="radio" :checked="item.checked" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="inputList">
            <div class="companyName">
              <span>公司名字：</span>
              <select class="companyName-set">
                <option value="99">请选择</option>
                <option value="0">广州思高易</option>
                <option value="1">思高易分公司</option>
                <option value="2">0</option>
                <option value="3">1</option>
                <option value="4">2</option>
                <option value="5">...</option>
              </select>
            </div>
            <div class="divisionalName">
              <span>部门名字：</span>
              <input
                type="text"
                v-model="searchList.deparmentName"
                placeholder="请输入"
              />
            </div>
            <div class="Administrator">
              <span>管理员：</span>
              <input
                type="text"
                v-model="searchList.Administrator"
                placeholder="请输入"
              />
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
                @click="searchBtn()"
                >搜索</el-button
              >
            </div>
          </div>
        </div>
        <div class="division-table">
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
              <el-table-column prop="number" label="编号"></el-table-column>
              <el-table-column
                prop="companyName"
                label="公司名"
              ></el-table-column>
              <el-table-column
                prop="Administration"
                label="管理员"
              ></el-table-column>
              <el-table-column
                prop="departmentName"
                label="部门名称"
              ></el-table-column>
              <el-table-column prop="comment" label="简介"></el-table-column>
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
              :page-sizes="[2, 3, 4, 5]"
              :page-size="5"
              layout="sizes, prev, pager, next, slot,jumper"
              :total="copyTableData.length"
            >
              <span class="ensure-btn fr" @click="clickTrue()">确定</span>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- <footerDiv></footerDiv> -->
      <div class="departmentMask">
        <el-dialog
          title="编辑部门"
          :visible.sync="departmentStatus"
          width="26%"
        >
          <div class="content">
            <div>
              <span>编号：</span>
              <input placeholder="请输入" v-model="compileRow.number" />
            </div>
            <div>
              <span>公司名称：</span>
              <input placeholder="请输入" v-model="compileRow.departmentName" />
            </div>
            <div>
              <span>部门管理：</span>
              <select>
                <option>部门管理</option>
              </select>
            </div>
            <div>
              <span>状态：</span>
              <select>
                <option>全部</option>
                <option>正常</option>
                <option>停用</option>
              </select>
            </div>
            <div>
              <span>备注：</span>
              <textarea
                v-model="compileRow.comment"
                placeholder="请输入备注"
                cols="29"
                rows="3"
              ></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="departmentStatus = false">取消</el-button>
            <el-button type="primary" @click="clickSave()">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/divisional/divisional.css";
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
        { name: "全部", checked: true },
        { name: "正常", checked: false },
        { name: "停用", checked: false },
      ],
      // 搜索的input
      searchList: {
        deparmentName: "",
        Administrator: "",
      },
      //   表格
      tableData: [],
      copyTableData: [
        {
          number: "01",
          companyName: "wz01",
          Administration: "xxxx",
          departmentName: "yanfabu",
          comment: "简介01",
        },
        {
          number: "02",
          companyName: "wz02",
          Administration: "xxxx",
          departmentName: "renshibu",
          comment: "简介02",
        },
        {
          number: "03",
          companyName: "wz03",
          Administration: "xxxx",
          departmentName: "zongcaiban",
          comment: "简介03",
        },
      ],
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: "",
      // 点击编辑 添加 弹出层 Status
      departmentStatus: false,
      // 点击编辑拿到的row
      compileRow: {},
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
      // 公司名字
      let setList = document.querySelector(".companyName-set").children;
      for (let i = 0; i < setList.length; i++) {
        setList[i].selected = false;
        if (setList[i].value == "99") {
          setList[i].selected = true;
        }
      }
      // searchList
      for (const key in this.searchList) {
        this.searchList[key] = "";
      }
    },
    // 搜索
    searchBtn() {
      let data = {
        companyName: "",
        deparmentName: "",
        Administrator: "",
      };
      let setList = document.querySelector(".companyName-set").children;
      for (let i = 0; i < setList.length; i++) {
        if (setList[i].selected) {
          data.companyName = Number(setList[i].value);
        }
      }
      // deparmentName Administrator
      for (const key in this.searchList) {
        for (const k in data) {
          if (k == key) {
            data[k] = this.searchList[key];
          }
        }
      }
    },
    // 表格
    handleSelectionChange() {},
    // 编辑
    handleEdit(index, row) {
      this.departmentStatus = true;
      this.compileRow = row;
    },
    // 点击添加按钮
    addDivisional() {
      this.departmentStatus = true;
      this.compileRow = {};
    },
    // 点击添加或者编辑按钮弹出层的 save 按钮
    clickSave() {
      // 里面拿3个值
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(val);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      let abc = this.pageSize * (val - 1);
      this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
      this.tableData.splice(0, abc);
      this.tableData.splice(this.pageSize);

      //   this.tableData = a.splice(this.pageSize)
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },

    ...homeActions(["setWstateStatus"]),
  },
};
</script>