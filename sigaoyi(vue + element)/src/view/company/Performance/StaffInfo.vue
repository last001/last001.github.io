<template>
  <div class="staffInfo">
    <div class="main" v-title :data-title="browserTitle"></div>
    <div class="bigbox">
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>绩效管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <div class="staffInfoContent">
          <div class="hint"><i class="mustIcon">*</i>为必须填</div>
          <!-- 员工信息 -->
          <div class="staffBasic">
            <div class="besicHeader clearfix">
              <span class="fl">员工信息</span>
              <hr class="fl" />
            </div>
            <div class="besicContent">
              <div>
                <span>部门</span>
                <select>
                  <option
                    :value="item.value"
                    :selected="item.selected"
                    v-for="(item, index) in optionList"
                    :key="index"
                  >
                    {{ item.text }}
                  </option>
                </select>
              </div>
              <div>
                <span>员工姓名<i class="mustIcon">*</i></span>
                <input
                  type="text"
                  :value="row.staffName"
                  placeholder="必须填"
                />
              </div>
            </div>
          </div>
          <!-- 工资薪金 -->
          <div class="salaryMoney">
            <div class="besicHeader clearfix">
              <span class="fl">工资薪金</span>
              <hr class="fl" />
            </div>
            <div
              class="besicContent"
              :style="{ marginLeft: marginleft + 'px' }"
            >
              <div>
                <span>员工工资<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  :value="row.PayMoney"
                  placeholder="必须填"
                />
              </div>
            </div>
          </div>
          <!-- 管理费用 -->
          <div class="administration">
            <div class="besicHeader clearfix">
              <span class="fl">管理费用</span>
              <hr class="fl" />
            </div>
            <div class="besicContent">
              <div class="firstContent">
                <div>
                  <span>社保费</span>
                  <input
                    type="number"
                    :value="row.socialMoney"
                    placeholder="社保费"
                  />
                </div>
                <div>
                  <span>租金,水电</span>
                  <input
                    type="number"
                    :value="row.renMoney"
                    placeholder="租金,水电"
                  />
                </div>
              </div>
              <div class="twoContent">
                <span>职工福利费</span>
                <input
                  type="number"
                  :value="row.staffMoney"
                  placeholder="职工福利费"
                />
              </div>
            </div>
          </div>
          <!-- 销售费用 -->
          <div class="sell">
            <div class="besicHeader clearfix">
              <span class="fl">销售费用</span>
              <hr class="fl" />
            </div>
            <div class="sellContent">
              <div class="firstContent">
                <div>
                  <span>采购费</span>
                  <input
                    type="number"
                    :value="row.purchaseMoney"
                    placeholder="采购费"
                  />
                </div>
                <div>
                  <span>快递费</span>
                  <input
                    type="number"
                    :value="row.expressageMoney"
                    placeholder="快递费"
                  />
                </div>
                <div>
                  <span>其他</span>
                  <input
                    type="number"
                    :value="row.otherMoney"
                    placeholder="其他费用"
                  />
                </div>
              </div>
              <div class="twoContent">
                <div>
                  <span>物流费</span>
                  <input
                    type="number"
                    :value="row.logisticsMoney"
                    placeholder="物流费"
                  />
                </div>
                <div>
                  <span>VPS费</span>
                  <input
                    type="number"
                    :value="row.VPSmoney"
                    placeholder="VPS费"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 办公费用 -->
          <div class="work">
            <div class="besicHeader clearfix">
              <span class="fl">销售费用</span>
              <hr class="fl" />
            </div>
            <div class="workContent" :style="{ marginLeft: marginleft + 'px' }">
              <div>
                <span>办公用品<i class="mustIcon">*</i></span>
                <input
                  type="number"
                  :value="row.workMoney"
                  placeholder="必须填"
                />
              </div>
            </div>
          </div>
          <!-- btn -->
          <div class="btn">
            <el-button icon="el-icon-back" @click="GoBack()">返回</el-button>
            <el-button icon="el-icon-folder-checked">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/performance/staffInfo/staffInfo.css";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      marginleft: "",
      //   浏览器itle
      browserTitle: "",
      //   传过来的row
      row: {},
      // 传过来的部门名字
      staffName: "",
      // optionList
      optionList: [
        { text: "开发部", value: "开发部", selected: true },
        { text: "人事部", value: "人事部", selected: false },
        { text: "后勤部", value: "后勤部", selected: false },
        { text: "财务部", value: "财务部", selected: false },
      ],
      // 年份
      years: "",
    };
  },
  created() {
    
    // 区分是点击添加按钮进来的是点击编辑
    if (this.$route.query.rowStatus) {
      this.browserTitle = "修改员工信息";
      this.row = JSON.parse(this.$route.query.row);
      this.staffName = this.$route.query.name;
      
      this.getSelected();
    } else {
      this.browserTitle = "添加员工";
      this.row = {};
      
    }

    // marginleft
    if (WstateStatus) {
      this.marginleft = 208;
    } else {
      this.marginleft = 275;
    }
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    ...homeActions(["setWstateStatus"]),
    lisentLeft() {
      if (this.WstateStatus) {
        this.marginleft = 208;
      } else {
        this.marginleft = 275;
      }
    },
    // selected
    getSelected() {
      this.optionList.forEach((e, index) => {
        e.selected = false;
        if (e.value == this.staffName) {
          e.selected = true;
        }
      });
    },
    // 返回上一级
    GoBack() {
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 300);
      setTimeout(() => {
        this.$router.back();
      }, 400);
    },
  },
  watch: {
    WstateStatus: "lisentLeft",
  },
};
</script>