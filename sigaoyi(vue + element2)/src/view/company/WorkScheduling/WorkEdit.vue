<template>
  <div class="workEdit">
    <div class="main" v-title :data-title="browserTitle"></div>
    <div class="bigbox">
      <div class="box">
        <div class="workEditInfo">
          <div class="hint"><i class="mustIcon">*</i>为必须填</div>
          <!-- 名字 进度 -->
          <div class="besicInfo">
            <div class="besicHeader clearfix">
              <span class="fl">编号/进度</span>
              <hr class="fl" />
            </div>
            <div class="besicContent">
              <div>
                <span>编号<i class="mustIcon">*</i></span>
                <input type="text" :value="row.name" placeholder="必须填" />
              </div>
              <div>
                <span>进度<i class="mustIcon">*</i></span>
                <input
                  type="text"
                  :value="row.proportion"
                  placeholder="示例 50%"
                />
              </div>
            </div>
          </div>
          <!-- 内容  -->
          <div class="content-pro">
            <div class="besicHeader clearfix">
              <span class="fl">内容描述</span>
              <hr class="fl" />
            </div>
            <div class="besicContent">
              <div :style="{ marginLeft: marginleft + 'px' }">
                <span>工作简述</span>
                <input
                  type="text"
                  value=""
                  placeholder="工作简述"
                  :style="{ width: LeftWidth + 'px' }"
                />
              </div>
              <div :style="{ marginLeft: marginleft + 'px' }">
                <span>具体内容<i class="mustIcon">*</i></span>
                <textarea
                  cols="80"
                  rows="10"
                  :value="row.content"
                  placeholder="必须填"
                  :style="{ width: LeftWidth + 'px' }"
                ></textarea>
              </div>
            </div>
          </div>
          <!-- 预计周期 -->
          <div class="predicDate">
            <div class="besicHeader clearfix">
              <span class="fl">预计周期</span>
              <hr class="fl" />
            </div>
            <div class="besicContent">
              <div>
                <span>开始时间<i class="mustIcon">*</i></span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="请选择开始日期"
                >
                </el-date-picker>
              </div>
              <div>
                <span>预计结束时间<i class="mustIcon">*</i></span>
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="请选择预计结束日期"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
          <!-- 完成情况 -->
          <div class="finish">
            <div class="besicHeader clearfix">
              <span class="fl">完成情况</span>
              <hr class="fl" />
            </div>
            <div class="besicContent">
              <div>
                <span>完成情况<i class="mustIcon">*</i></span>
                <select ref="selectDiv" id="selectDiv" @change="selectChange()">
                  <option
                    :value="item.value"
                    v-for="(item, index) in optionList"
                    :key="index"
                    :selected="item.selected"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div v-if="performShow == '0'">
                <span>实际完成时间<i class="mustIcon">*</i></span>
                <el-date-picker
                  v-model="value3"
                  type="datetime"
                  placeholder="请选择实际完成日期"
                >
                </el-date-picker>
              </div>
              <div v-else-if="performShow == '1'">
                <span>参与人员<i class="mustIcon">*</i></span>
                <input
                  type="text"
                  :value="row.participant"
                  placeholder="必须填"
                />
              </div>
              <div v-else>
                <span>未完成原因<i class="mustIcon">*</i></span>
                <input
                  type="text"
                  :value="row.unfinished"
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
import "../../../assets/less/workDeault/workEdit/workEdit.less";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //   LeftWidth
      LeftWidth: "",
      //   marginleft
      marginleft: "",
      //   浏览器title
      browserTitle: "",
      //   传过来的row
      row: {},
      //   optionList
      optionList: [
        {
          name: "已完成",
          value: "0",
          selected: true,
        },
        {
          name: "进行中",
          value: "1",
          selected: false,
        },
        {
          name: "未完成",
          value: "2",
          selected: false,
        },
      ],
      //   performShow
      performShow: "0",
      // 时间
      value1: "",
      value2: "",
      //   完成时间
      value3: "",
    };
  },

  created() {
    //   区分是点击添加按钮还是点击编辑按钮过来的
    if (this.$route.query.rowStatus) {
      this.browserTitle = "修改进度情况";
      this.row = JSON.parse(this.$route.query.row);

      this.value1 = this.row.startTime;
      this.value2 = this.row.endTime;
      if (this.row.performance == "--") {
        this.row.performance = "";
      }
      this.value3 = this.row.performance;

      this.$nextTick(() => {
        this.getSelected();
      });
    } else {
      this.browserTitle = "添加进度";
    }
    // LeftWidth
    if (this.WstateStatus) {
      this.LeftWidth = 1060;
      this.marginleft = 0;
    } else {
      this.LeftWidth = 1130;
      this.marginleft = 65;
    }
  },
  computed: {
    ...homeState(["WstateStatus"]),
  },
  methods: {
    //   lisenLeft
    lisenLeft() {
      if (this.WstateStatus) {
        this.LeftWidth = 1060;
        this.marginleft = 0;
      } else {
        this.LeftWidth = 1130;
        this.marginleft = 65;
      }
    },
    // 开始 select 的默认值
    getSelected() {
      let selectDiv = document.querySelector("#selectDiv").childNodes;

      this.optionList.forEach((e) => {
        if (e.name == this.row.finishTime) {
          e.selected = true;
        }
      });
      this.selectChange();
    },
    // selecte 改变事件
    selectChange() {
      this.$nextTick(() => {
        let selectDiv = this.$refs.selectDiv;
        this.performShow = selectDiv.selectedIndex;
      });
    },
    // 返回
    GoBack() {
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
        this.$router.back();
      }, 500);
    },

    ...homeActions(["setWstateStatus"]),
  },
  watch: {
    WstateStatus: "lisenLeft",
  },
};
</script>