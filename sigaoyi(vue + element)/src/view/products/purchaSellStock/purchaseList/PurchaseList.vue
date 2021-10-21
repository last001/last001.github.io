<template>
  <div class="purchaseList">
    <div class="v-purchaseList">
      <div class="main" v-title data-title="库存列表"></div>
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>库存管理</el-breadcrumb-item>
          <el-breadcrumb-item>库存列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="purchaseListInfo">
        <div class="status-type">
          <div class="statusDiv">
            <span class="text">状态：</span>
            <div
              v-for="(item, index) in radioList"
              :key="index"
              @click="clickRadio(item, index)"
            >
              <input type="radio" :checked="item.checked" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="search">
            <div class="odd">
              <span>单号：</span>
              <input
                type="text"
                v-model="searchList.order"
                placeholder="请输入"
                @keydown.enter="search(1, 30, false)"
              />
            </div>
            <!-- <div class="attributable">
            <span>归属者：</span>
            <input
              type="text"
              v-model="searchList.godownTime"
              placeholder="示例2021-01-01"
            />
          </div> -->
            <div class="godownTime">
              <span>入库时间：</span>
              <input
                type="text"
                v-model="searchList.godownTime"
                placeholder="示例2021-01-01"
                @keydown.enter="search(1, 30, false)"
              />
            </div>
            <div class="updateTime">
              <span>认领人：</span>
              <input
                type="text"
                v-model="searchList.Claimant"
                placeholder="请输入"
                @keydown.enter="search(1, 30, false)"
              />
            </div>
            <div class="btn">
              <el-button
                type="success"
                icon="el-icon-refresh-right"
                size="small"
                @click="reset()"
                >重置</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-search"
                size="small"
                @click="search(1, 30, false)"
                >搜索</el-button
              >
            </div>
          </div>
        </div>
        <div class="pur-bottom">
          <!-- 按钮 -->
          <div class="btn clearfix" v-show="btnStatus">
            <el-button
              class="fr"
              icon="el-icon-delete-location"
              type="danger"
              size="small"
              @click="deleteList()"
              >删除</el-button
            >
            <!-- <el-button
            class="fr"
            icon="el-icon-add-location"
            type="primary"
            size="small"
            @click="addPurchaseCompile()"
            >添加</el-button
          > -->
          </div>
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @select="onTableSelect"
              @select-all="setAll"
              maxHeight="588"
              stripe
              v-loading="tableLoading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                prop="name"
                width="150"
                label="名称/单号"
              ></el-table-column>
              <el-table-column
                prop="orderNo"
                label="订单编号"
              ></el-table-column>
              <el-table-column prop="quantity" label="数量"></el-table-column>
              <el-table-column label="图片">
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
              <el-table-column
                prop="belonger"
                width="150"
                label="认领人"
              ></el-table-column>
              <el-table-column
                prop="storageTime"
                label="入库时间"
              ></el-table-column>
              <el-table-column
                prop="updateTime"
                label="认领时间"
              ></el-table-column>
              <el-table-column label="物件状态">
                <el-table-column
                  prop="inventory"
                  label="待出库"
                ></el-table-column>
                <el-table-column prop="damaged" label="破损"></el-table-column>
                <el-table-column prop="lost" label="丢失"></el-table-column>
                <el-table-column prop="ship" label="已出库"></el-table-column>
              </el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    class="Edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    编辑
                  </el-button>
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
              :pager-count="11"
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
import "../../../../assets/less/authorization/authorization.less";
import dateFormats from "../../../../assets/js/dateFormat";
import uploadPdfs from "../../../../assets/js/uploadPdf";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  //   name: "PurchaseList",
  data() {
    return {
      //   radio数组
      radioList: [
        {
          name: "全部",
          checked: true,
          value: 99,
        },
        {
          name: "待出库",
          checked: false,
          value: 3,
        },
        // {
        //   name: "破损",
        //   checked: false,
        //   value:4,
        // },
        // {
        //   name: "丢失",
        //   checked: false,
        //   value:4,
        // },
        {
          name: "已出库",
          checked: false,
          value: 4,
        },
        {
          name: "已退回",
          checked: false,
          value: 5,
        },
      ],
      // 搜索的列表
      searchList: {
        status: 99,
        order: "",
        godownTime: "",
        Claimant: "",
      },
      //   xls
      tableData: [],
      tableLoading: false,
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      total: 0,
      //   删除按钮状态值
      btnStatus: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    if (from.path == "/purchaSellStock/purchaseCompileDefault") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    document.title = "库存列表";
    this.radioList.forEach((e) => {
      if (e.checked) {
        this.searchList.status = e.value;
      }
    });
    if (!this.$route.meta.isBack) {
      this.reset();
      this.tableData = [];
      this.getData(1, 30);
    } else {
      if (this.$route.query.flag) {
        this.search(1, 30, false);
      }
    }
  },
  created() {
    this.radioList.forEach((e) => {
      if (e.checked) {
        this.searchList.status = e.value;
      }
    });
  },
  computed: {
    ...homeState(["WstateStatus", "InfoData"]),
  },
  methods: {
    // 点击radio
    clickRadio(item, index) {
      if (item.checked) {
        return;
      }
      this.radioList.forEach((e) => {
        e.checked = false;
      });
      item.checked = true;
    },
    // 重置
    reset() {
      this.searchList.order = "";
      this.searchList.godownTime = "";
      this.searchList.Claimant = "";
      //   this.currentPage = 1;
      //   this.pageSize = 30;
      this.radioList.forEach((e) => {
        e.checked = false;
        if (e.value == 99) {
          e.checked = true;
        }
      });
    },
    // 搜索
    search(pages, amount, flag) {
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
      this.radioList.forEach((e) => {
        if (e.checked) {
          this.searchList.status = e.value;
        }
      });
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/NEWinStock",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          pages: pages,
          amount: amount,
          status: this.searchList.status,
          belonger: this.searchList.Claimant,
          invoicingName: this.searchList.order,
          storageTime: this.searchList.godownTime,
        },
      })
        .then((result) => {
          this.tableLoading = false;

          if (result.data.Code == 200) {
            let obj = {
              3: "待出库",
              4: "已出库",
              5: "已退回",
            };
            result.data.invoicings.forEach((e) => {
              e.storageTime = dateFormats.dateFormat(e.storageTime);
            });
            this.total = result.data.page.total;
            this.currentPage = result.data.page.pages;
            this.pageSize = result.data.page.amount;
            this.tableData = result.data.invoicings;
            this.tableData.forEach((e) => {
              for (const key in obj) {
                if (e.status == key) {
                  e.status = obj[key];
                }
              }
              e["selected"] = false;
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
          this.tableLoading = false;

          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 点击添加
    addPurchaseCompile() {
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
        this.$router.push({
          name: "PurchaseCompileDefault",
          query: { row: {}, rowStatus: false, title: "purchaseList" },
        });
      }, 400);
    },
    // 表格select 选择
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;

      this.tableData.forEach((e) => {
        e.selected = false;
      });
      rows.forEach((e) => {
        e.selected = true;
      });
      // 点击合并按钮 的 勾选的订单数量
      //   this.mergeIndex = rows.length;
    },
    // 全选状态值
    setAll(selection) {
      if (selection.length > 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].selected = true;
        }
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].selected = false;
        }
      }
    },
    // 删除
    deleteList() {
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
      let ids = "";
      let indexList = [];
      if (this.tableData.findIndex((target) => target.selected === true) > -1) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].selected) {
            ids += this.tableData[i].id + ",";
            indexList.push(i);
          }
        }
      } else {
        this.$message({
          message: "请勾选要删除的列表",
          center: true,
          duration: 600,
          type: "error",
        });
        return;
      }
      ids = ids.substring(0, ids.length - 1);
      this.$confirm("", "请慎重选择要删除的订单列表", {
        dangerouslyUseHTMLString: true,
        center: true,
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        customClass: "delMessage",
      }).then(() => {
        //   发起请求
        let loading = this.$loading({
          lock: false,
          text: "删除中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios({
          url: "/sigaoyi/delectInvoicing",
          method: "POST",
          params: {
            ids: ids,
          },
        })
          .then((result) => {
            loading.close();
            if (result.data.code == "200") {
              // indexList
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
          });
      });
    },
    // 表格
    // 编辑
    handleEdit(index, row) {
      this.$router.push({
        name: "PurchaseCompileDefault",
        query: {
          id: row.id,
        },
      });
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.clickSearch(this.currentPage, this.pageSize, true);
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search(this.currentPage, this.pageSize, true);
    },
    // 点击确定去哪一页
    clickTrue() {
      this.handleCurrentChange(this.currentPage);
    },
    // 初始获取数据
    getData(pages, amount) {
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
      //
      if (
        this.InfoData.statu == "0" ||
        this.InfoData.userName == "王焕杰" ||
        this.InfoData.userName == "李健明" ||
        this.InfoData.userName == "王杰" ||
        this.InfoData.userName == "hzsugoi" ||
        this.InfoData.userName == "任治琴"
      ) {
        this.btnStatus = true;
      } else {
        this.btnStatus = false;
      }
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios({
        url: "/sigaoyi/NEWinStock",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          pages: pages,
          amount: amount,
        },
      })
        .then((result) => {
          loading.close();

          if (result.data.Code == 200) {
            let obj = {
              3: "待出库",
              4: "已出库",
              5: "已退回",
            };
            result.data.invoicings.forEach((e) => {
              e.storageTime = dateFormats.dateFormat(e.storageTime);
            });
            this.total = result.data.page.total;
            this.tableData = result.data.invoicings;
            this.tableData.forEach((e) => {
              for (const key in obj) {
                if (e.status == key) {
                  e.status = obj[key];
                }
              }
              e["selected"] = false;
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
          this.$notify({
            title: "请求错误",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
        });
    },
    // 表格上传图片
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
          if (result.data.Code == 200) {
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
            row.img = result.data.path;
            this.saveList(row);
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
    // 保存列表
    saveList(row) {
      this.$axios({
        url: "/sigaoyi/updateInvoicingImg",
        method: "POST",
        params: {
          invoicingId: row.id,
          imgUrl: row.img,
        },
      })
        .then((result) => {})
        .catch((err) => {});
    },
  },
};
</script>
<style lang="less" scoped>
.purchaseList {
  .v-purchaseList {
    overflow-x: hidden;
    padding: 20px;
    padding-top: 0;
    padding-bottom: 51px;
    margin-top: 48px;
    .purchaseListInfo {
      position: relative;
      .status-type {
        background: #fff;
        border-radius: 4px;
        padding: 15px;
        padding-bottom: 10px;
        .statusDiv {
          display: flex;
          margin-right: 20px;
          cursor: pointer;
          font-size: 15px;

          div {
            display: flex;
            margin-right: 20px;
            line-height: 20px;
          }
        }

        .search {
          display: flex;
          line-height: 53px;
          font-size: 15px;
          margin-top: 7px;

          div {
            margin-right: 20px;

            input {
              padding: 8px 0;
              text-indent: 8px;
              width: 230px;
              border-radius: 4px;
              outline: none;
              border: 1px solid #c2c2c2;
              &:hover {
                border: 1px solid #409eff;
              }
              &:focus {
                outline-offset: 0px;
                border: 1px solid #409eff;
              }
            }

            select {
              width: 230px;
              padding: 8px 0px;
              text-indent: 4px;
              border-radius: 4px;
              outline: none;
              border: 1px solid #c2c2c2;
              color: #666;
              &:hover {
                border: 1px solid #409eff;
              }
              &:focus {
                outline-offset: 0px;
                border: 1px solid #409eff;
              }
            }
          }

          .btn {
            display: flex;
            padding: 10px 0;
            margin-left: 10px;

            div {
              border: 1px solid #777;
              height: 31px;
              line-height: 34px;
              padding: 0 10px;

              i {
                font-size: 16px;
                color: #3b3b3b;
              }
            }

            button {
              padding: 9px 14px;
              &:first-child {
                margin-right: 13px;
              }
            }
          }
        }
      }

      .pur-bottom {
        background: #fff;
        margin-top: 15px;
        border-radius: 4px;
        padding: 15px;
        .btn {
          button {
            padding: 9px 14px;
          }
        }

        .xls {
          margin-top: 10px;

          .el-table--border {
            border: none;
          }

          .el-table td,
          .el-table th {
            text-align: center;
          }
          .el-button--text:hover {
            text-decoration: underline;
          }

          .updataImg {
            position: relative;
            button {
              padding: 12px 14px;
            }
            input {
              position: absolute;
              left: 14px;
              top: 0px;
              width: 58px;
              height: 40px;
              opacity: 0;
            }
          }
        }

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
</style>
