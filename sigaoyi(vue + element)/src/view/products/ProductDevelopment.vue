<template>
  <div class="productDevelopment" :style="{ minHeight: H + 'px' }">
    <div class="v-productDevelopment" :style="{ minHeight: minHeight + 'px' }">
      <div class="main" v-title data-title="产品采集"></div>
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品采集</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <div ref="productDevelopmentInfo" class="productDevelopmentInfo">
          <!-- <div class="title">产品采集</div> -->
          <div class="content clearfix">
            <div class="inputRadio">
              <span>平</span>
              <span>台：</span>
              <div
                class="v-radio"
                v-for="(item, index) in inputList"
                :key="index"
                @click="clikcInput(item, index)"
              >
                <input
                  type="radio"
                  :checked="item.checked"
                  :value="item.value"
                />
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="set">
              <div class="v-set">
                <span>分类：</span>
                <select
                  v-model="largeIndex"
                  @change="changeSet(largeList, largeIndex, 'largeList')"
                >
                  <option
                    v-for="(item, index) in largeList"
                    :value="index"
                    :key="index"
                    :selected="item.selected"
                  >
                    {{ item.catalogName }}
                  </option>
                </select>
                <select
                  v-model="middleIndex"
                  @change="changeSet(middleList, middleIndex, 'middleList')"
                >
                  <option
                    v-for="(item, index) in middleList"
                    :value="index"
                    :key="index"
                    :selected="item.selected"
                  >
                    {{ item.catalogName }}
                  </option>
                </select>
                <select
                  v-model="smallIndex"
                  @change="changeSet(smallList, smallIndex, 'smallList')"
                >
                  <option
                    v-for="(item, index) in smallList"
                    :value="index"
                    :key="index"
                    :selected="item.selected"
                  >
                    {{ item.catalogName }}
                  </option>
                </select>
              </div>
              <div class="v-int">
                <span>关键词：</span>
                <input type="text" placeholder="请输入" v-model="nick" />
              </div>
              <div class="btn">
                <div>
                  <input
                    type="file"
                    accept=".xlsx"
                    ref="fileText"
                    @change="uploadFile($event)"
                  />
                  <el-button type="primary" icon="el-icon-upload"
                    >导入表格</el-button
                  >
                </div>
                <div>
                  <input
                    type="file"
                    ref="fileText"
                    @change="uploadFile($event)"
                  />
                  <el-button type="success" icon="el-icon-upload"
                    >导入text</el-button
                  >
                </div>
                <div>
                  <el-button
                    type="info"
                    icon="el-icon-delete-solid"
                    @click="tableData = []"
                    >清空表格</el-button
                  >
                </div>
              </div>
            </div>
            <div class="pro-bottom clearfix">
              <div class="inputText fl">
                <textarea
                  cols="30"
                  placeholder="单品链接(多个链接换行隔开)"
                  v-model="textarea"
                ></textarea>
                <el-button type="primary" icon="el-icon-cpu" @click="Addxls()"
                  >转换</el-button
                >
              </div>
              <div class="xls fr">
                <el-table :data="tableData" stripe border style="width: 100%">
                  <template slot="empty">
                    <span class="iconfont icon-zanwushuju"></span>
                    <div>暂无数据</div>
                  </template>
                  <el-table-column prop="link" label="链接" align="center">
                  </el-table-column>
                  <el-table-column
                    v-if="cookieStatus"
                    label="Cookie"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="remask">
                        <input
                          type="text"
                          v-model="scope.row.cookie"
                          placeholder="必须填"
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="采集状态"
                    align="center"
                    width="200px"
                  >
                    <template slot-scope="scope">
                      <span :class="scope.row.color">{{
                        scope.row.gatherStatus
                      }}</span>
                      <el-button
                        v-show="scope.row.slotTbale"
                        size="mini"
                        @click="resetGather(scope.row)"
                        >重新采集</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="block">
                  <el-pagination
                    :current-page="currentPage"
                    layout="total,slot"
                    :total="tableData.length"
                  >
                    <span class="blockText">显示</span>
                  </el-pagination>
                  <el-pagination
                    :current-page="currentPage"
                    :page-sizes="pageSize"
                    layout="sizes, prev, pager, next, slot,jumper"
                    :total="tableData.length"
                  >
                    <span class="ensure-btn fr">确定</span>
                  </el-pagination>
                </div>
              </div>
              <div class="btn-gather fr">
                <el-button
                  type="primary"
                  icon="el-icon-collection"
                  @click="gather()"
                  >开始采集</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerDiv></footerDiv>
  </div>
</template>
<script>
import "../../assets/less/productDevelopment/productDevelopment.css";
// navbar 导航栏
import footerDiv from "@/components/footer.vue";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // sideNavbar 的状态
      chilrenVal: "",
      // 传给子元素的状态值
      flag: "",
      H:"",
      minHeight: "",
      // inputList
      inputList: [
        { name: "1688", value: "1", checked: true },
        { name: "淘宝/天猫", value: "2", checked: false },
        { name: "搜款网", value: "3", checked: false },
        { name: "速卖通", value: "4", checked: false },
        { name: "拼多多", value: "5", checked: false },
        { name: "亚马逊日本站", value: "6", checked: false },
        { name: "乐天", value: "7", checked: false },
        { name: "雅虎商场", value: "8", checked: false },
      ],
      //   xls
      tableData: [],
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: [0],
      //   链接数组
      linkArr: [],
      textarea: "",
      // 表格cookieStatus
      cookieStatus: false,
      //  分类
      largeIndex: 0,
      largeList: [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ],
      middleIndex: 0,
      middleList: [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ],
      smallIndex: 0,
      smallList: [
        {
          catalogId: 99,
          catalogLevel: 0,
          catalogName: "全部",
          superiorId: 0,
          selected: true,
        },
      ],
      // 关键字
      nick: "",
    };
  },
  components: {
    footerDiv,
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    this.H = document.documentElement.clientHeight;
    this.getclassfly();
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.minHeight = document.documentElement.clientHeight;
        that.minHeight = window.minHeight;
      })();
    };
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 子组件向父组件 传过来的状态值
    getWstate(v) {
      this.chilrenVal = v;
    },
    // 监听 侧边栏的状态
    Wchange() {
      //   传给子元素的值
      this.flag = this.chilrenVal;
      if (this.chilrenVal) {
        this.setWstateStatus(true);
      } else {
        this.setWstateStatus(false);
      }
    },
    //   获取分类
    getclassfly() {
      // 发起请求
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/GetCatalogs",
        method: "POST",
        params: {},
      })
        .then((result) => {
          setTimeout(() => {
            loading.close();
          }, 500);

          let classObj = {
            catalogId: 99,
            catalogLevel: 0,
            catalogName: "全部",
            superiorId: 0,
            selected: true,
          };
          result.data.catalogs.forEach((e) => {
            e["selected"] = false;
          });
          this.largeList = result.data.catalogs;
          this.largeList.unshift(classObj);
        })
        .catch((err) => {
          loading.close();
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
    // changeSet
    changeSet(array, index, string) {
      array.forEach((e) => {
        e.selected = false;
      });
      array[index].selected = true;
      if (string == "largeList") {
        if (this.largeIndex == 0) {
          this.middleIndex = 0;
          this.smallIndex = 0;
          this.middleList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          this.smallList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: array[index].catalogId,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.middleList = result.data.catalogs;
          })
          .catch((err) => {});
      } else if (string == "middleList") {
        if (this.middleIndex == 0) {
          this.smallIndex = 0;
          this.smallList = [
            {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            },
          ];
          return;
        }
        this.$axios({
          url: "/sigaoyi/superior",
          method: "POST",
          params: {
            sortid: array[index].catalogId,
          },
        })
          .then((result) => {
            let classObj = {
              catalogId: 99,
              catalogLevel: 0,
              catalogName: "全部",
              superiorId: 0,
              selected: true,
            };
            result.data.catalogs.forEach((e) => {
              e["selected"] = false;
            });
            result.data.catalogs.unshift(classObj);
            this.smallList = result.data.catalogs;
          })
          .catch((err) => {});
      }
    },
    // 导入
    uploadFile(e) {
      alert("正在维护中..........");
      setTimeout(() => {
        this.$refs.fileText.value = "";
      }, 500);
    },
    // 点击input 事件
    clikcInput(item, index) {
      if (item.checked) {
        return;
      }
      this.inputList.forEach((e) => {
        e.checked = false;
        this.cookieStatus = false;
      });
      item.checked = true;
      if (item.name == "拼多多") {
        this.cookieStatus = true;
      }
    },
    // 转换
    Addxls() {
      this.pageSize = [];
      let textareaVal = this.textarea.replace(/(\r\n*$)/, "");
      textareaVal = textareaVal.replace(/(\s*)$/g, "");
      const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      if (textareaVal == "") {
        this.$message({
          message: "转换地址不能为空",
          type: "warning",
          center: true,
          duration: 800,
        });
        return (this.textarea = "");
      }
      let linkArr = textareaVal.split(/\n/);
      for (let i = linkArr.length - 1; i >= 0; i--) {
        if (linkArr[i] == "") {
          linkArr.splice(i, 1);
        }
      }

      let obj = {
        link: "",
        gatherStatus: "未采集",
        slotTbale: false,
        color: "wcj",
        cookie: "",
      };
      linkArr.map((e, index) => {
        // 重置对象
        obj = {
          link: "",
          gatherStatus: "未采集",
          slotTbale: false,
          color: "wcj",
          cookie: "",
        };
        e = e.replace(/\s*/g, "");
        obj.link = e;
        this.tableData.push(obj);
      });
      this.pageSize.push(this.tableData.length);
      this.$message({
        message: `转换成功`,
        type: "success",
        center: true,
        duration: 800,
      });
      this.textarea = "";
    },
    // 开始采集
    gather() {
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
      var data = {
        platform: "",
        link: "",
        cookie: "",
        userId: this.InfoData.id,
        nick: this.nick,
        sortid: this.smallList[this.smallIndex].catalogId,
      };
      // 平台
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].checked) {
          data.platform = this.inputList[i].value;
        }
      }

      if (this.tableData.length == 0) {
        this.$message({
          message: "暂无采集的产品链接!",
          center: true,
          duration: 800,
          type: "warning",
        });
        return;
      }
      // 链接
      this.tableData.forEach((e) => {
        if (e.color == "cg") {
          // 如果已采集成功 则跳过
          return;
        }
        for (let i = 0; i < this.inputList.length; i++) {
          if (this.inputList[i].checked && this.inputList[i].name == "拼多多") {
            if (e.cookie == "") {
              this.$message({
                message: "请填写cookie",
                duration: 600,
                center: true,
                type: "error",
              });
              return false;
            }
            data.cookie = e.cookie;
          }
        }
        data.link = e.link;

        // 发请求
        let loading = this.$loading({
          lock: false,
          text: "采集中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          method: "POST",
          url: "/sigaoyi/NEWgatheringproducts",
          params: data,
        })
          .then((result) => {
            loading.close();

            if (result.data.code == 200) {
              e.gatherStatus = result.data.msg;
              e.slotTbale = false;
              e.color = "cg";
            } else {
              e.gatherStatus = result.data.msg;
              e.slotTbale = true;
              e.color = "sbai";
            }
          })
          .catch((err) => {
            loading.close();
            e.gatherStatus = "系统业务繁忙,请稍后再试";
            e.slotTbale = true;
            e.color = "sbai";
          });
      });
    },
    // 重新采集
    resetGather(row) {
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

      var data = {
        platform: "",
        link: row.link,
        cookie: "",
        userId: this.InfoData.id,
        nick: this.nick,
        sortid: this.smallList[this.smallIndex].catalogId,
      };
      // 平台
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].checked) {
          data.platform = this.inputList[i].value;
        }
      }
      //   拼多多
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].checked && this.inputList[i].name == "拼多多") {
          if (row.cookie == "") {
            this.$message({
              message: "请填写cookie",
              duration: 600,
              center: true,
              type: "error",
            });
            return false;
          }
          data.cookie = row.cookie;
        }
      }

      // 发请求
      let loading = this.$loading({
        lock: false,
        text: "采集中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        method: "POST",
        url: "/sigaoyi/NEWgatheringproducts",
        params: data,
      })
        .then((result) => {
          loading.close();

          if (result.data.code == 200) {
            row.gatherStatus = result.data.msg;
            row.slotTbale = false;
            row.color = "cg";
          } else {
            row.gatherStatus = result.data.msg;
            row.slotTbale = true;
            row.color = "sbai";
          }
        })
        .catch((err) => {
          loading.close();

          row.gatherStatus = "系统业务繁忙,请稍后再试";
          row.slotTbale = true;
          row.color = "sbai";
        });
    },
    ...homeActions(["setWstateStatus"]),
  },
  watch: {
    chilrenVal: "Wchange",
    minHeight(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 400);
      }
    },
  },
};
</script>