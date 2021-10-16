<template>
  <div class="sheduleNumber">
    <div class="main" v-title :data-title="browserTitle"></div>
    <div class="dandruff">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户跟进</el-breadcrumb-item>
        <el-breadcrumb-item>进度编号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sheduleBigbox">
      <!-- <div class="sheduleTitle">进度编号：</div> -->
      <!-- <hr class="fl"> -->
      <div class="hint"><i class="mustIcon">*</i>为必须填</div>
      <!-- 基本信息 -->
      <div class="besicInfo">
        <div class="besicHeader clearfix">
          <span class="fl">基本信息</span>
          <hr class="fl" />
        </div>
        <div class="besicContent">
          <div>
            <span>客户名称<i class="mustIcon">*</i></span>
            <input type="text" placeholder="必须填" />
          </div>
          <div>
            <span class="threeText"
              >协同号<i class="mustIcon threeIcon">*</i></span
            >
            <input type="text" placeholder="必须填" />
          </div>
          <div>
            <span>店铺平台</span>
            <select>
              <option value="yamasun">亚马逊</option>
              <option value="qutian">趣天</option>
            </select>
          </div>
          <div>
            <span>客户来源</span>
            <select>
              <option value="GZ">广州总部</option>
              <option value="HZ">杭州分公司</option>
              <option value="SY">沈阳分公司</option>
              <option value="ZPF">张鹏飞团队</option>
            </select>
          </div>
          <div>
            <span>客户类型</span>
            <select>
              <option value="geren">个人</option>
              <option value="tuandui">团队</option>
              <option value="qiye">企业</option>
              <option value="puuho">铺货托管</option>
              <option value="Jping">精品托管</option>
            </select>
          </div>
          <div>
            <span>客户性质</span>
            <select>
              <option value="Qzhi">全职</option>
              <option value="Jzhi">兼职</option>
            </select>
          </div>

          <div>
            <span>指导人员</span>
            <select>
              <option
                v-for="(item, index) in ZdaoPepleData"
                :key="index"
                :value="item.value"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <span>阶段节点</span>
            <select>
              <option
                v-for="(item, index) in stageData"
                :key="index"
                :value="item.value"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- 账号情况 -->
      <div class="IDsituation">
        <div class="IDheader clearfix">
          <span class="fl">账号情况</span>
          <hr class="fl" />
        </div>
        <div class="IDContent">
          <div class="lists">
            <div>
              <span class="twoText">欧洲<i class="mustIcon twoIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
            <div>
              <span>阿联酋<i class="mustIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
          </div>
          <div class="lists">
            <div>
              <span class="v-twoText"
                >美亚<i class="mustIcon twoIcon v-twoIcon">*</i></span
              >
              <input type="text" placeholder="必须填" />
            </div>
            <div>
              <span>澳大利亚<i class="mustIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
          </div>
          <div class="lists">
            <div>
              <span class="twoText">日本<i class="mustIcon twoIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
            <div>
              <span>新加坡<i class="mustIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
          </div>
        </div>
      </div>
      <!-- 进度情况 -->
      <div class="progressSituation">
        <div class="progressHeader clearfix">
          <span class="fl">进度情况</span>
          <hr class="fl" />
        </div>
        <div class="progressContent">
          <div class="lists">
            <div>
              <span>原创产品<i class="mustIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
            <div>
              <span>总同步数<i class="mustIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
          </div>
          <div class="lists">
            <div>
              <span>代理产品<i class="mustIcon">*</i></span>
              <input type="text" placeholder="必须填" />
            </div>
            <div>
              <span>出单数量<i class="mustIcon">*</i></span>
              <input type="number" placeholder="必须填" />
            </div>
          </div>
        </div>
      </div>
      <!-- 业绩绩效 -->
      <div class="performance">
        <div class="performanceHeader clearfix">
          <span class="fl">业绩绩效</span>
          <hr class="fl" />
        </div>
        <div class="perrotmanceContent">
          <div class="monthPerformance">
            <span>上上月业绩<i class="mustIcon">*</i></span>
            <input
              type="number"
              ref="inTheLastMonth"
              @blur="inputBlur()"
              placeholder="必须填"
            />
            <span>上月业绩<i class="mustIcon">*</i></span>
            <input
              type="number"
              ref="LastMonth"
              @blur="inputBlur()"
              placeholder="必须填"
            />
            <span>本月业绩<i class="mustIcon">*</i></span>
            <input type="number" placeholder="必须填" />
          </div>
          <div class="cause">
            <div>
              <font
                >{{ text }}{{ upAndDown
                }}<i :class="greenAndRed">{{ percentage }}</i
                >{{ juhao }}</font
              >
              <font>业绩浮动原因：</font>
            </div>
            <div>
              <span>学员原因：</span>
              <input type="text" placeholder="请填写学员原因" />
            </div>
            <div>
              <span>指导原因：</span>
              <input type="text" placeholder="请填写指导原因" />
            </div>
            <div>
              <span>其他原因：</span>
              <input type="text" placeholder="请填写其他因素" />
            </div>
          </div>
        </div>
      </div>
      <!-- 系统默认数据 -->
      <div class="systemDefault">
        <div class="systemDefaultHeader clearfix">
          <span class="fl">系统默认数据</span>
          <hr class="fl" />
        </div>
        <div class="systemDefaultContent">
          <div class="lists">
            <span>跟进次数</span>
            <input type="text" disabled placeholder="0" />
          </div>
          <div class="lists">
            <span>最新跟进次数</span>
            <input type="text" disabled placeholder="2021/02/04" />
          </div>
          <div class="lists">
            <span>创建时间</span>
            <input type="text" disabled placeholder="2020/01/04" />
          </div>
        </div>
      </div>
      <!-- 跟进记录/备注 -->
      <div class="recordComment">
        <div class="recordCommentHeader clearfix">
          <span class="fl">跟进记录/备注<i class="mustIcon">*</i></span>
          <hr class="fl" />
        </div>
        <div class="recordCommentContent">
          <textarea placeholder="必须填" cols="180" rows="15"></textarea>
        </div>
      </div>
      <!-- 图片 -->
      <div class="picture">
        <div class="pictureHeader clearfix">
          <span class="fl">图片</span>
          <hr class="fl" />
        </div>
        <div class="pictrueContent">
          <div
            class="addimg"
            v-show="imgSrcData.length"
            v-for="(item, index) in imgSrcData"
            :key="index"
          >
            <div class="v-img">
              <i class="el-icon-close" @click="deleteImg(item, index)"></i>
              <img :src="item.imgSrc" alt="" />
            </div>
          </div>
          <div class="addPictrue">
            <div class="updata">
              <i class="el-icon-plus"></i>
              <input
                type="file"
                multiple
                accept="image/*"
                title="点击上传图片"
                ref="uploadVal"
                @change="updataImg($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 文档 -->
      <div class="document">
        <div class="documentHeader clearfix">
          <span class="fl">文档</span>
          <hr class="fl" />
        </div>
        <div class="documentContent">
          <div
            class="addimg"
            v-show="documentSrcData.length"
            v-for="(item, index) in documentSrcData"
            :key="index"
          >
            <div class="v-img">
              <img :src="item.imgSrc" alt="" />
            </div>
          </div>
          <div class="addDocument">
            <div class="updata">
              <i class="el-icon-plus"></i>
              <input type="file" multiple accept="image/*" />
            </div>
          </div>
        </div>
      </div>
      <!-- btn -->
      <div class="btnList">
        <el-button plain type="primary" icon="el-icon-back" @click="exit()"
          >返回</el-button
        >
        <el-button type="primary" icon="el-icon-folder-checked">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import titleNavbar from "@/components/titleNavbar.vue";
import sideNavbar from "@/components/sideNavbar.vue";
import "../../../assets/less/customerFollow/scheduleNumber/scheduleNumber.css";
import uploadFiles from "../../../assets/js/uploadFile";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");
export default {
  data() {
    return {
      //   浏览器itle
      browserTitle: "",
      //   指导人员
      ZdaoPepleData: [
        { name: "王娜", value: "WN" },
        { name: "辽宁思高易4", value: "SGY4" },
        { name: "辽宁思高易3", value: "SGY3" },
        { name: "辽宁思高易2", value: "SGY2" },
        { name: "辽宁思高易1", value: "SGY1" },
        { name: "韩睿", value: "HR" },
        { name: "李伟科", value: "LWK" },
        { name: "赵培刚", value: "ZPG" },
        { name: "陈日媚", value: "CRM" },
        { name: "张洁杭", value: "ZJH" },
      ],
      // 阶段节点
      stageData: [
        { name: "开店", value: "KD" },
        { name: "铺货选品", value: "PH" },
        { name: "ERP操作", value: "ERP" },
        { name: "精品选品", value: "JP" },
        { name: "备货+精品listing上架", value: "BH" },
        { name: "制定FBA发货计划", value: "FBA" },
        { name: "对接物流", value: "DJWL" },
        { name: "暗示测评干预", value: "PC" },
        { name: "出单", value: "CD" },
        { name: "站内广告设置培训", value: "PX" },
        { name: "进阶运营指导", value: "ZD" },
      ],
      //   input比较数据显示的字
      text: "",
      //   上升 还是 下降
      upAndDown: "",
      //   上升还是下降的颜色
      greenAndRed: "",
      // 百分比数据
      percentage: "",
      //   句号
      juhao: "",
      //   上传的图片路径
      imgSrcData: [
        { imgSrc: require("../../../assets/img/logo.jpg") },
        { imgSrc: require("../../../assets/img/logo.jpg") },
      ],
      // 文档路径
      documentSrcData: [],
      //   传过来的row
      row: {},
      //   年份
      years: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {
    let d = new Date();
    this.years = d.getFullYear();
    if (this.$route.query.rowStatus) {
      this.browserTitle = "修改进度编号";
      this.row = JSON.parse(this.$route.query.row);
    } else {
      this.browserTitle = "添加进度";
      this.rwo = {};
    }
  },
  methods: {
    // iniput one 失去焦点事件
    inputBlur() {
      let input1 = this.$refs.inTheLastMonth.value.replace(/^0+/, "");
      let input2 = this.$refs.LastMonth.value.replace(/^0+/, "");

      if (input1 == "0" || input2 == "0") {
        input1 = "";
        input2 = "";
      }
      if (input1 == "" || input2 == "") {
        this.text = "有为0数据，业绩无法对比。";
        this.upAndDown = "";
        this.percentage = "";
        this.juhao = "";
        return;
      }

      if (Number(input1) > Number(input2)) {
        this.text = "上月业绩相对上上月业绩";
        this.upAndDown = "下降";
        this.percentage = Math.abs(100 - (input2 / input1) * 100);
        this.percentage = Number(this.percentage.toFixed(2)) + "%";
        this.greenAndRed = "downRed";
        this.juhao = "。";
      } else {
        this.text = "上月业绩相对上上月业绩";
        this.upAndDown = "上升";
        this.percentage = (input2 / input1) * 100;
        this.percentage = Number(this.percentage.toFixed(2)) + "%";
        this.greenAndRed = "upGreen";
        this.juhao = "。";
      }
    },
    // 上传图片
    updataImg(e) {
      // 解决上传同一张图片问题  this.$refs.uploadVal.value = null;
      let files = e.target.files[0];

      // let filesName = files.name.split(".")[1]
      // 检测正则
      let res = /\.(png|jpe?g|gif|svg)(\?.*)?$/;
      if (!res.test(files.name)) {
        this.$message({
          message: "上传文件格式不正确!",
          center: true,
          duration: 800,
          type: "warning",
        });
        this.$refs.uploadVal.value = null;
        return;
      }
      let formData = new FormData();
      formData.append("file", files);
      let loading = this.$loading({
        lock: false,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
      });
      this.$axios(uploadFiles.uploadFile(formData))
        .then((result) => {
          loading.close();

          if (result.data.Code == "200") {
            this.$message({
              message: "上传图片成功!",
              center: true,
              duration: 800,
              type: "success",
            });
            this.$refs.uploadVal.value = null;
          } else {
            this.$message({
              message: "上传图片失败!",
              center: true,
              duration: 800,
              type: "warning",
            });
            this.$refs.uploadVal.value = null;
          }
        })
        .catch((err) => {
          loading.close();

          this.$message({
            message: "系统繁忙,请稍后再试!",
            duration: 800,
            center: true,
            type: "warning",
          });
          this.$refs.uploadVal.value = null;
        });
    },
    // 点击删除图片
    deleteImg(item, index) {},
    // 返回上一级
    exit() {
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
  },
};
</script>