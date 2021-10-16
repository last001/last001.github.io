<template>
  <div class="record">
    <div class="v-record">
      <div class="main" v-title data-title="进出库记录"></div>
      <div class="dandruff">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>库存管理</el-breadcrumb-item>
          <el-breadcrumb-item>进出库记录</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="recordInfo">
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
              <input type="text" value="" placeholder="请输入" />
            </div>
            <div class="godownTime">
              <span>认领人：</span>
              <input type="text" value="" placeholder="请输入" />
            </div>
            <div class="updateTime">
              <span>入库时间：</span>
              <input type="text" value="" placeholder="示例2021-01-01" />
            </div>
            <div class="btn">
              <!-- <div>
            <i class="el-icon-refresh-right"></i>
          </div>
          <div><i class="el-icon-search"></i></div> -->
              <el-button type="success" icon="el-icon-refresh-right"
                >重置</el-button
              >
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
          </div>
        </div>
        <div class="record-table">
          <!-- 表格 -->
          <div class="xls">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              stripe
              border
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="odd" label="名称/单号"></el-table-column>
              <el-table-column
                prop="orderID"
                label="订单编号"
              ></el-table-column>
              <el-table-column prop="claimant" label="认领人"></el-table-column>
              <el-table-column prop="number" label="数量"></el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.imgSrc" alt="" style="height: 50px" />
                </template>
              </el-table-column>
              <el-table-column
                prop="godownTime"
                label="入库时间"
              ></el-table-column>
              <el-table-column label="物件状态">
                <el-table-column
                  prop="stockPending"
                  label="待出库"
                ></el-table-column>
                <el-table-column prop="broken" label="破损"></el-table-column>
                <el-table-column prop="lossOf" label="丢失"></el-table-column>
                <el-table-column
                  prop="haveOutbound"
                  label="已出库"
                ></el-table-column>
              </el-table-column>
              <el-table-column
                prop="claimTime"
                label="认领时间"
              ></el-table-column>
              <el-table-column label="状态" prop="status"></el-table-column>
              <el-table-column label="备注" prop="remask"></el-table-column>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   radio数组
      radioList: [
        {
          name: "全部",
          checked: true,
        },
        {
          name: "待出库",
          checked: false,
        },
        {
          name: "已出库",
          checked: false,
        },
        {
          name: "已退回",
          checked: false,
        },
      ],
      //   xls
      tableData: [],
      copyTableData: [],
      //  分页 currentPage
      currentPage: 1,
      //   每一页多少条
      pageSize: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    // 分页复制对象
    this.tableData = JSON.parse(JSON.stringify(this.copyTableData));
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
    // 表格
    // 编辑
    handleEdit(index, row) {
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
          query: { row: JSON.stringify(row), rowStatus: true, title: "record" },
        });
      }, 400);
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
  },
};
</script>

<style lang="less" scoped>
.record {
  .v-record {
    position: relative;
    overflow-x: hidden;
    padding: 20px;
    padding-top: 0;
    padding-bottom: 51px;
    margin-top: 48px;
    .recordInfo {
      .status-type {
        background: #fff;
        border-radius: 4px;
        padding: 15px;

        .statusDiv {
          display: flex;
          margin-right: 20px;
          cursor: pointer;
          font-size: 15px;

          div {
            display: flex;
            margin-right: 15px;
          }
        }

        .search {
          margin-top: 10px;
          display: flex;
          line-height: 53px;
          font-size: 15px;

          div {
            margin-right: 15px;

            input {
              padding: 8px 0;
              width: 230px;
              text-indent: 8px;
              border-radius: 4px;
              border: 1px solid #c2c2c2;
              outline: none;
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
              text-indent: 8px;
              border-radius: 4px;
              border: 1px solid #c2c2c2;
              color: #666;
              outline: none;
              &:hover {
                border: 1px solid #409eff;
              }
              &:focus {
                outline-offset: 0px;
                border: 1px solid #409eff;
              }
            }

            button {
              padding: 9px 14px;
              &:first-child {
                margin-right: 5px;
              }
            }
          }

          .btn {
            display: flex;
            padding: 10px 0;

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
          }
        }
      }

      .record-table {
        background: #fff;
        border-radius: 4px;
        padding: 15px;
        margin-top: 15px;
        .xls {
          margin-top: 10px;

          .el-table td,
          .el-table th {
            text-align: center;
          }

          .el-button--text:hover {
            text-decoration: underline;
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