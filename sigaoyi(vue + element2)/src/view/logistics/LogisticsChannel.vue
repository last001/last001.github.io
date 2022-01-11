<template>
  <div class="logisticsChannel">
    <div class="v-logisticsChannel">
      <div class="main" v-title data-title="物流渠道"></div>
      <div class="contentLogist">
        <div class="search">
          <div>
            <span class="text">渠道名称：</span>
            <input type="text" placeholder="请输入" v-model="channelName" />
          </div>
          <div>
            <span class="text">渠道类型：</span>
            <el-select
              v-model="channelTypeIndex"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in channelTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="text">状态：</span>
            <el-select
              v-model="channelStateIndex"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in channelStateList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-button size="small" @click="reset()">重置</el-button>
            <el-button type="primary" size="small">搜索</el-button>
          </div>
        </div>
        <div class="list">
          <div class="list_btn">
            <el-button type="primary" size="medium" @click="AdChannelMask()"
              >添加渠道</el-button
            >
            <i class="el-icon-refresh-right" @click="getTable"></i>
          </div>
          <div class="table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              @select="onTableSelect"
              @select-all="setAll"
              maxHeight="645"
              stripe
              style="width: 100%"
              v-loading="tableLoading"
            >
              <template slot="empty">
                <span class="iconfont icon-zanwushuju"></span>
                <div>暂无数据</div>
              </template>
              <el-table-column type="selection"> </el-table-column>
              <el-table-column
                prop="channelName"
                label="名称"
              ></el-table-column>
              <el-table-column prop="channelValue" label="值"></el-table-column>
              <el-table-column prop="channelType" label="类型">
              </el-table-column>
              <el-table-column
                prop="firstWeight"
                label="首重"
              ></el-table-column>
              <el-table-column prop="continuedWeight" label="续重">
              </el-table-column>
              <el-table-column prop="specification" label="规格">
              </el-table-column>
              <el-table-column prop="status" label="状态"> </el-table-column>
              <el-table-column prop="remark" label="备注"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="table_btn">
                    <el-button
                      size="mini"
                      type="default"
                      @click="deleteRow(scope.$index, scope.row)"
                      >删除</el-button
                    >
                    <el-button
                      size="mini"
                      type="primary"
                      @click="edit(scope.$index, scope.row)"
                      >编辑</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
      <!-- 添加渠道 -->
      <el-dialog
        title="添加渠道"
        :visible.sync="channelList.state"
        custom-class="channelMask"
        width="32%"
      >
        <el-tag
          type="warning"
          closable
          v-if="channelList.tagState"
          @close="channelList.tagState = false"
          >请填写完整的渠道信息，以免添加渠道时报错。</el-tag
        >
        <div>
          <span class="text">渠道名称：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="channelList.channelName"
          />
        </div>
        <div>
          <span class="text">渠道值：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="channelList.channelValue"
          />
        </div>
        <div>
          <span class="text">渠道类型：</span>
          <el-select
            v-model="channelList.channelType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelList.channelTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 渠道状态 -->
        <div v-show="shopState">
          <span class="text">渠道状态：</span>
          <el-select
            v-model="channelList.status"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelList.statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="text">渠道首重：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="channelList.firstWeight"
          />
        </div>
        <div>
          <span class="text">渠道续重：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="channelList.continuedWeight"
          />
        </div>
        <div>
          <span class="text">规格：</span>
          <input
            type="text"
            placeholder="请输入"
            v-model="channelList.specification"
          />
        </div>
        <div class="remark">
          <span class="text">渠道备注：</span>
          <textarea
            v-model="channelList.remark"
            placeholder="请输入"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="confirm()"
            >确 定</el-button
          >
          <el-button size="medium" @click="channelList.state = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "@/assets/less/logisticsChannel/logisticsChannel.less";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      // 名字
      channelName: "",
      // 类型
      channelTypeIndex: "",
      channelTypeList: [
        { name: "自发货", value: 0 },
        { name: "待发货", value: 1 },
      ],
      // 状态
      channelStateIndex: "",
      channelStateList: [
        { name: "正常", value: 0 },
        { name: "停用", value: 1 },
      ],
      // 表格
      tableData: [],
      tableLoading: false,
      // 当前页
      currentPage: 1,
      //   每一页多少条
      pageSize: 30,
      //   total
      total: 0,
      // 添加渠道 状态
      channelList: {
        state: false,
        tagState: false,
        id: 0,
        channelName: "",
        channelValue: "",
        channelType: 0,
        channelTypeList: [
          { name: "自发货", value: 0 },
          { name: "待发货", value: 1 },
        ],
        status: 0,
        statusList: [
          { name: "正常", value: 0 },
          { name: "停用", value: 1 },
        ],
        firstWeight: "",
        continuedWeight: "",
        specification: "",
        remark: "",
      },
      shopState: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  activated() {},
  created() {
    this.getTable();
    // this.$nextTick(() => {
    //   this.$parent.$refs.sideNavbar1.testRouter();
    // });
  },
  computed: {
    ...homeState(["InfoData"]),
  },
  methods: {
    // 全选状态值
    setAll(selection) {
      if (selection.length > 0) {
        this.Allstatus = true;

        selection.forEach((e) => {
          e.selected = true;
        });
      } else {
        this.Allstatus = false;
        this.tableData.forEach((e) => {
          e.selected = false;
        });
      }
    },
    //   是否选中的状态值
    onTableSelect(rows, row) {
      row.selected = rows.length && rows.indexOf(row) !== -1;

      this.tableData.forEach((e) => {
        e.selected = false;
      });
      rows.forEach((e) => {
        e.selected = true;
      });
    },
    // 重置
    reset() {},
    // 添加渠道
    AdChannelMask() {
      this.shopState = false;
      for (const key in this.channelList) {
        if (key == "channelTypeList" || key == "statusList") {
          this.channelList.channelTypeList = [
            { name: "自发货", value: 0 },
            { name: "待发货", value: 1 },
          ];
          this.channelList.statusList = [
            { name: "正常", value: 0 },
            { name: "停用", value: 1 },
          ];
        } else if (key == "state") {
          this.channelList.state = true;
        } else if (key == "tagState") {
          this.channelList.tagState = true;
        } else if (key == "id") {
          this.channelList.id = 0;
        } else if (key == "status") {
          this.channelList.status = 0;
        } else {
          this.channelList[key] = "";
        }
      }
    },
    // 编辑
    edit(index, row) {
      this.shopState = true;
      this.channelList.tagState = true;
      this.channelList.state = true;
      for (const key in row) {
        for (const key1 in this.channelList) {
          if (key == key1) {
            this.channelList[key1] = row[key];
          }
        }
      }
    },
    // 分页事件 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTable();
    },
    // 去第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTable();
    },
    // 点击确定去哪一页
    clickTrue() {
      //   this.handleCurrentChange(this.currentPage);
    },
    // 初始 获取表格数据
    getTable() {
      let data = {
        pages: this.currentPage,
        amount: this.pageSize,
        userId: this.InfoData.id,
        channelType: 99,
      };
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/getAllLogisticschannelsInfoPages",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.tableData = result.data.qoo10Orders;
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log("err ==>", err);
        });
    },
    // 添加/编辑 渠道
    confirm() {
      let data = {
        id: this.channelList.id,
        // ==  渠道ID（int类型）
        userId: this.InfoData.id,
        // == 用户ID（int类型）
        channelType: this.channelList.channelType,
        // ==  渠道类型（int类型）
        channelName: this.channelList.channelName,
        // == 渠道名称
        channelValue: this.channelList.channelValue,
        // == 渠道值
        firstWeight: this.channelList.firstWeight,
        // ==  首重（Double类型）
        continuedWeight: this.channelList.continuedWeight,
        // == 续重（Double类型）
        specification: this.channelList.specification,
        // ==  规格
        status: this.channelList.status,
        // ==  状态  （int类型）
        remark: this.channelList.remark,
        // == 备注
      };

      this.channelList.state = false;
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/editLogisticschannels",
        method: "POST",
        params: data,
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == 200) {
            this.channelList.state = false;
            this.getTable();
            this.$notify({
              title: "请求成功",
              message: result.data.msg,
              type: "success",
              offset: 50,
            });
          } else {
            this.channelList.state = true;
            this.$notify({
              title: "请求失败",
              message: result.data.msg,
              type: "warning",
              offset: 50,
            });
          }
        })
        .catch((err) => {
          this.channelList.state = true;
          this.tableLoading = false;
          this.$notify({
            title: "请求失败",
            message: "系统业务繁忙,请稍后再试",
            type: "error",
            offset: 50,
          });
          console.log("err ==>", err);
        });
    },
    // 删除
    deleteRow(index, row) {
      //   发起请求
      this.tableLoading = true;
      this.$axios({
        url: "/sigaoyi/delectLogisticschannels",
        method: "POST",
        params: {
          userId: this.InfoData.id,
          ids: `${row.id}`,
        },
      })
        .then((result) => {
          this.tableLoading = false;
          if (result.data.Code == 200) {
            // indexList
            this.tableData.splice(index, 1);
            this.total--;
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
          this.tableLoading = false;
          this.$notify({
            title: "请求错误",
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