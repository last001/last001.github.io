<template>
  <div class="godown">
    <div class="v-godown">
      <div class="main" v-title data-title="入库"></div>
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>库存管理</el-breadcrumb-item>
          <el-breadcrumb-item>入库</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="godownInfo">
        <div class="textarea">
          <textarea
            cols="50"
            rows="18"
            placeholder="单号(多个单号换行隔开)  最多一次入库10个"
            v-model="textarea"
          ></textarea>
          <!-- <div>
          <input type="tel" :value="'产品数量：' + linkArrLength" disabled />
        </div> -->
          <div>
            <el-select
              clearable
              popper-class="selectList"
              v-model="value"
              filterable
              placeholder="请选择用户编号"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.userName + '：' + (item.id + 10850)"
                :value="item.userName"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-right" @click="Addxls()"
              >确认</el-button
            >
          </div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-collection"
              @click="godown()"
              >入库</el-button
            >
          </div>
        </div>
        <div class="xlsNum">
          <el-table :data="tableData" stripe border style="width: 100%">
            <template slot="empty">
              <span class="iconfont icon-zanwushuju"></span>
              <div>暂无数据</div>
            </template>
            <el-table-column prop="number" label="单号" align="center">
            </el-table-column>
            <el-table-column label="图片" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.img == ''" class="updataImg">
                  <el-button type="text">上传</el-button>
                  <input
                    type="file"
                    @change="uploading(scope.$index, scope.row, $event)"
                    ref="uploadInt"
                    accept="image/*"
                  />
                </div>
                <img
                  v-else
                  :src="scope.row.img"
                  alt=""
                  style="height: 50px; width: 50px"
                />
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="scope">
                <div class="remask">
                  <input
                    type="text"
                    v-model="scope.row.count"
                    placeholder="请输入"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="scope">
                <div class="remask">
                  <input
                    type="text"
                    v-model="scope.row.remask"
                    placeholder="请输入"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="入库状态" align="center" width="200px">
              <template slot-scope="scope">
                <span :class="scope.row.color">{{
                  scope.row.gatherStatus
                }}</span>
                <el-button
                  v-show="scope.row.slotTbale"
                  size="mini"
                  @click="resetGodown(scope.$index, scope.row)"
                  >重新入库</el-button
                >
              </template>
            </el-table-column>
          </el-table>
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
              :page-sizes="[10]"
              :page-size="5"
              layout="sizes, prev, pager, next, slot,jumper"
              :total="tableData.length"
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
import uploadPdfs from "../../../../assets/js/uploadPdf";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      H: "",
      tableData: [],
      //  中间select 搜索框 初始 value
      value: "",
      textarea: "",
      // 重建select options
      options: [],
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: "",
      //   input value
      linkArrLength: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    // 分页复制对象
    this.getInfoData();
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
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
    // textarea 的输入事件 拿到length
    inputPress() {
      if (this.textarea == "") {
        this.linkArrLength = 0;
        return;
      }
      this.linkArrLength = 1;
      var n = this.textarea.match(/\n/g);
      var textareaList = this.textarea.split(/\n/);
      for (let i = 0; i < textareaList.length; i++) {
        if (textareaList[textareaList.length - 1] == "") {
          this.linkArrLength = n.length;
        } else {
          this.linkArrLength = n.length + 1;
        }
      }
    },
    // 点击确认按钮
    // 转换
    Addxls() {
      let textareaVal = this.textarea.replace(/(\r\n*$)/, "");
      textareaVal = textareaVal.replace(/(\s*)$/g, "");

      if (textareaVal == "") {
        this.$message({
          message: "单号不能为空",
          type: "warning",
          center: true,
          duration: 800,
        });
        this.linkArrLength = 0;
        this.textarea = "";
        return;
      }

      let linkArr = textareaVal.split(/\n/);

      let obj = {
        number: "",
        gatherStatus: "待入库",
        slotTbale: false,
        color: "drk",
        img: "",
        remask: "",
        count: 1,
      };
      linkArr.forEach((e, index) => {
        // 重置对象
        obj = {
          number: "",
          gatherStatus: "待入库",
          slotTbale: false,
          color: "drk",
          img: "",
          remask: "",
          count: 1,
        };
        e = e.replace(/\s*/g, "");

        obj.number = e;
        this.tableData.push(obj);
      });
      this.linkArrLength = 0;
      this.$notify({
        title: "添加表格",
        message: "添加成功",
        type: "success",
        duration: 500,
        offset: 50,
      });
      if (this.tableData.length > 10) {
        this.tableData = this.tableData.splice(this.tableData.length - 10);
        this.$message({
          message: "最多一次入库10个",
          duration: 600,
          center: true,
          type: "warning",
        });
      }
    },
    // 获取所有用户信息
    getInfoData() {
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
      this.$axios({
        url: "/sigaoyi/NEWuserinfos",
        method: "POST",
        params: {},
      })
        .then((result) => {
          if (result.data.Code == 200) {
            this.options = result.data.users;
          }
        })
        .catch((err) => {});
    },
    // 上传图片
    uploading(index, row, e) {
      // uploadPdf
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", e.target.files[0]);

      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let url = "/sigaoyi/invoicingupload";

      this.$axios(uploadPdfs.uploadPdf(url, formData))
        .then((result) => {
          this.$refs.uploadInt.value = null;
          setTimeout(() => {
            loading.close();
          }, 300);
          if (result.data.Code == "200") {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            row.img = result.data.path;
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
          this.$refs.uploadInt.value = null;
          setTimeout(() => {
            loading.close();
          }, 300);

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 入库
    godown() {
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
      if (this.value == "") {
        this.$message({
          message: "请选择用户编号",
          duration: 600,
          center: true,
          type: "error",
        });
        return;
      }
      let data = {
        invoicingName: "",
        userID: this.value,
        number: "",
        image: "",
        remarks: "",
      };

      this.tableData.forEach((e) => {
        if (e.count == "") {
          e.count = 1;
        }
        data.invoicingName = e.number;
        data.number = e.count;
        data.image = e.img;
        data.remarks = e.remask;
        if (e.color == "cg") {
          // 如果已采集成功 则跳过
          return;
        }
        //   请求
        let loading = this.$loading({
          lock: false,
          text: "入库中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/warehousing",
          method: "POST",
          params: data,
        })
          .then((result) => {
            loading.close();

            if (result.data.Code == 200) {
              e.slotTbale = false;
              e.gatherStatus = "成功";
              e.color = "cg";
            } else {
              e.slotTbale = true;
              e.gatherStatus = result.data.msg;
              e.color = "sbai";
            }
          })
          .catch((err) => {
            loading.close();
          });
      });
    },
    // 重新入库
    resetGodown(index, row) {
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
      if (this.value == "") {
        this.$message({
          message: "请选择认领人",
          duration: 600,
          center: true,
          type: "error",
        });
        return;
      }
      if (row.count == "") {
        row.count = 1;
      }
      //   请求
      let loading = this.$loading({
        lock: false,
        text: "入库中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/warehousing",
        method: "POST",
        params: {
          invoicingName: row.number,
          userID: this.value,
          number: row.count,
          image: row.img,
          remarks: row.remask,
        },
      })
        .then((result) => {
          loading.close();

          if (result.data.Code == 200) {
            row.slotTbale = false;
            row.gatherStatus = "成功";
            row.color = "cg";
          } else {
            row.slotTbale = true;
            row.gatherStatus = result.data.msg;
            row.color = "sbai";
          }
        })
        .catch((err) => {
          loading.close();

          this.$notify({
            title: "请求错误",
            message: "系统服务繁忙,请稍后再试!",
            type: "error",
            offset: 50,
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.godown {
  .v-godown {
    padding: 20px;
    padding-top: 0px;
    overflow-x: hidden;
    padding-bottom: 51px;
    margin-top: 48px;

    .godownInfo {
      background: #fff;
      border-radius: 4px;
      position: relative;
      display: flex;
      padding: 20px 15px 100px 15px;
      .textarea {
        width: 20%;
        margin-right: 2%;

        textarea {
          height: 378px;
          width: 100%;
          padding: 0;
          outline: none;
          padding: 4px;
          border: 1px solid #d6d6d6;
          border-radius: 4px;
          &:hover {
            border: 1px solid #409EFF;
          }

          &:focus {
            outline-offset: 0px;
            border: 1px solid #409eff;
          }
        }

        div {
          margin-top: 20px;
          width: 103%;
          button,
          input {
            width: 98%;
            margin-top: 10px;
          }
          button {
            width: 100%;
          }
          input {
            height: 40px;
            text-align: center;
            outline: none;
            border: 1px solid #ddd;
            border-radius: 4px;
            &:disabled {
              background: #fff;
            }
          }
          /deep/ .el-select > {
            width: 100%;
            .el-input {
              input {
                text-align: center;
              }
            }
          }
        }
      }

      .xlsNum {
        width: 78%;

        .cell {
          .drk {
            color: #444;
          }

          .cg {
            color: #409eff;
          }

          .sbai {
            color: red;
          }

          .updataImg {
            position: relative;
            button {
              padding: 12px 20px;
              // border: 1px solid red;
            }
            input {
              width: 70px;
              height: 40px;
              position: absolute;
              left: 83px;
              right: 0;
              opacity: 0;
            }
          }
          // el-table__row
          .remask {
            input {
              height: 34px;
              width: 100%;
              border: none;
              text-align: center;
            }
          }
        }
        // 分页
        .block {
          margin-top: 10px;
          display: flex;

          .blockText {
            font-weight: normal;
          }

          .el-pagination {
            //   width: 30%x;

            &:nth-child(2) {
              width: 100%;
              margin-left: -13px;
            }
          }

          .el-pagination__jump {
            float: right;
            margin-right: 16px;
          }

          .ensure-btn {
            //   margin-right: -170px;
            font-weight: normal;
            border: 1px solid #dcdfe6;
            text-align: center;
            cursor: pointer;
            padding: 0 10px;
            border-radius: 4px;

            &:hover {
              border-color: #40a0ffcc;
              color: #409EFF;
              background: #ecf5ff;
            }
          }
        }
      }
    }
  }
}
.el-select-dropdown {
  ul {
    li {
      text-align: center;
      padding-right: 40px;
    }
  }
  .popper__arrow::after {
    margin-left: 130px;
  }
}
.selectList {
  left: 700px;
}
</style>