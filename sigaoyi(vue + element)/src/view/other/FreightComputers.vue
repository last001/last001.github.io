<template>
  <div class="freightComputers">
    <div class="main" v-title data-title="运费估算"></div>
    <div class="box">
      <div class="feightInfo">
        <div class="dandruff">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>其他</el-breadcrumb-item>
            <el-breadcrumb-item>运费估算</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content">
          <div class="showFace">
            <div class="transport">
              <span>运输方式：</span>
              <select @change="changeSelect($event)">
                <option
                  :value="item.value"
                  v-for="(item, index) in optionList"
                  :key="index"
                >
                  {{ item.text }}
                </option>
              </select>
            </div>
            <div class="billing">
              <span>计费方式：</span>
              <select
                :disabled="disabledList.freight"
                ref="freightOption"
                @change="changeBilling()"
              >
                <option value="重量">重量</option>
                <option value="体积">体积(计抛)</option>
              </select>
            </div>
            <div class="weight">
              <div>
                <span>重量(kg)：</span>
                <input
                  type="number"
                  placeholder="重量(kg)"
                  ref="weight"
                  value=""
                  :disabled="disabledList.weight"
                />
              </div>
              <div>
                <span>公布价：</span>
                <input type="text" value="50" disabled="disabled" />
              </div>
            </div>
            <div class="volume">
              <span>体积(长*宽*高)：</span>
              <input
                type="text"
                value=""
                placeholder="长(单位:cm)"
                :disabled="disabledList.long"
                ref="long"
              />
              <input
                type="text"
                value=""
                placeholder="宽(单位:cm)"
                :disabled="disabledList.wide"
                ref="wide"
              />
              <input
                type="text"
                value=""
                placeholder="高(单位:cm)"
                :disabled="disabledList.height"
                ref="height"
              />
            </div>
            <div class="radioBox">
              <div class="item" v-for="(item, index) in radioList" :key="index">
                <span>{{ item.text }}：</span>
                <div class="list">
                  <div
                    v-for="(v, i) in item.radio"
                    :key="i"
                    @click="clickInput(item, v, i)"
                  >
                    <input type="radio" :checked="v.radioStatus" />
                    <span>{{ v.radioText }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button type="primary" :icon="iconSrc" @click="clickBtn()"
                >估算</el-button
              >
            </div>
          </div>
          <div class="formula">
            <div class="v-formula">
              <div
                v-for="(item, index) in textList"
                :key="index"
                :class="item.className"
              >
                {{ item.text }}
              </div>
            </div>
            <div class="result">
              计算结果为:<span>{{ resultText }}</span
              >元
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footerDiv></footerDiv> -->
  </div>
</template>
<script>
// navbar 导航栏
// import footerDiv from "@/components/footer.vue";
import "../../assets/less/freightComputers/freightComputers.less";
import { createNamespacedHelpers, mapState, mapActions } from "vuex";
const {
  mapState: homeState,
  mapActions: homeActions,
} = createNamespacedHelpers("homeStore");

export default {
  data() {
    return {
      //   optionList
      optionList: [
        { text: "请选择", value: 0, selected: true },
        { text: "E邮宝", value: 1, selected: false },
        { text: "E邮宝加快", value: 2, selected: false },
        { text: "E特快", value: 3, selected: false },
        { text: "佐川", value: 4, selected: false },
      ],
      //   radioList
      radioList: [
        {
          text: "是否为防疫品",
          radio: [
            { radioText: "是", radioStatus: false },
            { radioText: "否", radioStatus: true },
          ],
        },
        {
          text: "是否带电",
          radio: [
            { radioText: "是", radioStatus: false },
            { radioText: "否", radioStatus: true },
          ],
        },
        {
          text: "偏远地区(冲绳)",
          radio: [
            { radioText: "是", radioStatus: false },
            { radioText: "否", radioStatus: true },
          ],
        },
      ],
      //   textList
      textList: [
        {
          text:
            "**********************************************计算公式**********************************************",
          className: "",
        },
        { text: "E邮宝加急：((重量 * 公布价) + 30 ) * 0.97", className: "" },
        {
          text: "E特快：((重量 - 0.05) / 0.025 + 66.2 ) * 0.97 + 16",
          className: "",
        },
        { text: "佐川：(偏远地区 + 100元)", className: "" },
        {
          text: "普货 = 47.5/0.5 (首重) + 13/0.5 (续重)",
          className: "paddingBox",
        },
        { text: "防疫品 = 55/个 (最多一个)", className: "paddingBox" },
        { text: "带电 = 55/0.5(首重) + 15/0.5(续重)", className: "paddingBox" },
        { text: "计抛：长 * 宽 * 高 / 6000 = 重量", className: "paddingBox" },
        {
          text: "*E邮宝、E邮宝加急要求包裹重量不超过2kg且长 + 宽 + 高 < 90cm",
          className: "",
        },
      ],
      //   disabled 状态
      disabledList: {
        freight: true,
        weight: true,
        long: true,
        wide: true,
        height: true,
      },
      //   options
      options: [],
      //   是否的值
      booleanVal: {
        freight: false,
        electrification: false,
        faraway: false,
      },
      // 点击估算iconSrc
      iconSrc: "el-icon-right",
      //   计算结果
      resultText: "",
      //   点击按钮状态
      flag: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next();
  },
  created() {},
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "num"]),
  },
  methods: {
    // 运输方式改变select 事件
    changeSelect(e) {
      //   let weightVal = (this.$refs.weight.value = "");
      let longVal = (this.$refs.long.value = "");
      let wideVal = (this.$refs.wide.value = "");
      let heightVal = (this.$refs.height.value = "");
      this.options = e.target.childNodes;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].selected) {
          if (this.options[i].value == 0) {
            for (const key in this.disabledList) {
              this.disabledList[key] = true;
            }
            return (this.options = []);
          } else if (
            this.options[i].value == 1 ||
            this.options[i].value == 2 ||
            this.options[i].value == 3
          ) {
            for (const key in this.disabledList) {
              if (key == "weight") {
                this.disabledList[key] = false;
              } else {
                this.disabledList[key] = true;
              }
            }
          } else {
            let freightOptionList = this.$refs.freightOption.children;
            for (let i = 0; i < freightOptionList.length; i++) {
              freightOptionList[i].selected = false;
              if (freightOptionList[i].value == "重量") {
                freightOptionList[i].selected = true;
              }
            }
            for (const key in this.disabledList) {
              if (key == "weight" || key == "freight") {
                this.disabledList[key] = false;
              } else {
                this.disabledList[key] = true;
              }
            }
          }
        }
      }
    },
    // 计费方式改变select 事件
    changeBilling() {
      let weightVal = this.$refs.weight.value;
      let longVal = this.$refs.long.value;
      let wideVal = this.$refs.wide.value;
      let heightVal = this.$refs.height.value;

      let freightOptionList = this.$refs.freightOption.children;

      // 循环 计费方式的 options
      for (let i = 0; i < freightOptionList.length; i++) {
        // 计费方式的 optionVal == 体积
        if (
          freightOptionList[i].selected &&
          freightOptionList[i].value == "体积"
        ) {
          // 设置input的value值
          this.$refs.weight.value = "";
          // input selected 的值
          this.disabledList.weight = true;
          this.disabledList.long = false;
          this.disabledList.wide = false;
          this.disabledList.height = false;
          weightVal = (longVal * wideVal * heightVal) / 6000;

          if (this.flag) {
            // 提示
            if (longVal == "" || wideVal == "" || heightVal == "") {
              this.$message({
                type: "warning",
                message: "长宽高的值不能为空",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            if (longVal == "0" || wideVal == "0" || heightVal == "0") {
              this.$message({
                type: "warning",
                message: "长宽高的值不能为零",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            this.iconSrc = "el-icon-loading";
            setTimeout(() => {
              this.iconSrc = "el-icon-right";
              // 当weightVal大于1斤时
              if (weightVal * 2 > 1) {
                // 为防疫品
                if (this.booleanVal.freight) {
                  this.resultText = (
                    47.5 +
                    13 * (weightVal * 2 - 1) +
                    55
                  ).toFixed(2);
                  // 为防疫品 带电
                  if (this.booleanVal.electrification) {
                    this.resultText = (
                      55 +
                      15 * (weightVal * 2 - 1) +
                      55
                    ).toFixed(2);
                    // 为防疫品  带电  偏远
                    if (this.booleanVal.faraway) {
                      this.resultText = (
                        55 +
                        15 * (weightVal * 2 - 1) +
                        55 +
                        100
                      ).toFixed(2);
                    }
                    // 为防疫品  偏远
                  } else if (this.booleanVal.faraway) {
                    this.resultText = (
                      47.5 +
                      13 * (weightVal * 2 - 1) +
                      55 +
                      100
                    ).toFixed(2);
                  }
                  // 为带电
                } else if (this.booleanVal.electrification) {
                  this.resultText = (55 + 15 * (weightVal * 2 - 1)).toFixed(2);
                  // 为带电  偏远
                  if (this.booleanVal.faraway) {
                    this.resultText = (
                      55 +
                      15 * (weightVal * 2 - 1) +
                      100
                    ).toFixed(2);
                  }
                  // 为偏远
                } else if (this.booleanVal.faraway) {
                  this.resultText = (
                    47.5 +
                    13 * (weightVal * 2 - 1) +
                    100
                  ).toFixed(2);
                } else {
                  // 普货
                  this.resultText = (47.5 + 13 * (weightVal * 2 - 1)).toFixed(
                    2
                  );
                }
                // 当weightVal不足一斤按一斤算
              } else {
                // 为防疫品
                if (this.booleanVal.freight) {
                  this.resultText = (47.5 + 55).toFixed(2);
                  // 为防疫品 带电
                  if (this.booleanVal.electrification) {
                    this.resultText = (55 + 55).toFixed(2);
                    // 为防疫品  带电  偏远
                    if (this.booleanVal.faraway) {
                      this.resultText = (55 + 55 + 100).toFixed(2);
                    }
                    // 为防疫品  偏远
                  } else if (this.booleanVal.faraway) {
                    this.resultText = (47.5 + 55 + 100).toFixed(2);
                  }
                  // 为带电
                } else if (this.booleanVal.electrification) {
                  this.resultText = (55).toFixed(2);
                  // 为带电  偏远
                  if (this.booleanVal.faraway) {
                    this.resultText = (55 + 100).toFixed(2);
                  }
                  // 为偏远
                } else if (this.booleanVal.faraway) {
                  this.resultText = (47.5 + 100).toFixed(2);
                } else {
                  // 普货
                  this.resultText = (47.5).toFixed(2);
                }
              }
            }, 800);
          }

          // 计费方式的 optionVal == 重量
        } else if (
          freightOptionList[i].selected &&
          freightOptionList[i].value == "重量"
        ) {
          // 设置input的value值
          this.$refs.long.value = "";
          this.$refs.wide.value = "";
          this.$refs.height.value = "";
          // input selected 的值
          this.disabledList.weight = false;
          this.disabledList.long = true;
          this.disabledList.wide = true;
          this.disabledList.height = true;

          if (this.flag) {
            // 提示
            if (weightVal == "") {
              this.$message({
                type: "warning",
                message: "请输入重量",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            if (weightVal == "0") {
              this.$message({
                type: "warning",
                message: "重量不能为零",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            this.iconSrc = "el-icon-loading";
            setTimeout(() => {
              this.iconSrc = "el-icon-right";
              // 当weightVal大于1斤时
              if (weightVal * 2 > 1) {
                // 为防疫品
                if (this.booleanVal.freight) {
                  this.resultText = (
                    47.5 +
                    13 * (weightVal * 2 - 1) +
                    55
                  ).toFixed(2);
                  // 为防疫品 带电
                  if (this.booleanVal.electrification) {
                    this.resultText = (
                      55 +
                      15 * (weightVal * 2 - 1) +
                      55
                    ).toFixed(2);
                    // 为防疫品  带电  偏远
                    if (this.booleanVal.faraway) {
                      this.resultText = (
                        55 +
                        15 * (weightVal * 2 - 1) +
                        55 +
                        100
                      ).toFixed(2);
                    }
                    // 为防疫品  偏远
                  } else if (this.booleanVal.faraway) {
                    this.resultText = (
                      47.5 +
                      13 * (weightVal * 2 - 1) +
                      55 +
                      100
                    ).toFixed(2);
                  }
                  // 为带电
                } else if (this.booleanVal.electrification) {
                  this.resultText = (55 + 15 * (weightVal * 2 - 1)).toFixed(2);
                  // 为带电  偏远
                  if (this.booleanVal.faraway) {
                    this.resultText = (
                      55 +
                      15 * (weightVal * 2 - 1) +
                      100
                    ).toFixed(2);
                  }
                  // 为偏远
                } else if (this.booleanVal.faraway) {
                  this.resultText = (
                    47.5 +
                    13 * (weightVal * 2 - 1) +
                    100
                  ).toFixed(2);
                } else {
                  // 普货
                  this.resultText = (47.5 + 13 * (weightVal * 2 - 1)).toFixed(
                    2
                  );
                }
                // 当weightVal不足一斤按一斤算
              } else {
                // 为防疫品
                if (this.booleanVal.freight) {
                  this.resultText = (47.5 + 55).toFixed(2);
                  // 为防疫品 带电
                  if (this.booleanVal.electrification) {
                    this.resultText = (55 + 55).toFixed(2);
                    // 为防疫品  带电  偏远
                    if (this.booleanVal.faraway) {
                      this.resultText = (55 + 55 + 100).toFixed(2);
                    }
                    // 为防疫品  偏远
                  } else if (this.booleanVal.faraway) {
                    this.resultText = (47.5 + 55 + 100).toFixed(2);
                  }
                  // 为带电
                } else if (this.booleanVal.electrification) {
                  this.resultText = (55).toFixed(2);
                  // 为带电  偏远
                  if (this.booleanVal.faraway) {
                    this.resultText = (55 + 100).toFixed(2);
                  }
                  // 为偏远
                } else if (this.booleanVal.faraway) {
                  this.resultText = (47.5 + 100).toFixed(2);
                } else {
                  // 普货
                  this.resultText = (47.5).toFixed(2);
                }
              }
            }, 800);
          }
        }
      }
    },
    // 点击radio
    clickInput(item, v, i) {
      if (v.radioStatus) {
        return;
      }
      item.radio.forEach((e) => {
        e.radioStatus = false;
      });

      v.radioStatus = true;

      //   改变selet 给booleanVal 赋值
      for (const key in item) {
        item.radio.forEach((e) => {
          if (item.text == "是否为防疫品") {
            if (e.radioText == "是" && e.radioStatus == true) {
              this.booleanVal.freight = true;
            } else {
              this.booleanVal.freight = false;
            }
          } else if (item.text == "是否带电") {
            if (e.radioText == "是" && e.radioStatus == true) {
              this.booleanVal.electrification = true;
            } else {
              this.booleanVal.electrification = false;
            }
          } else {
            if (e.radioText == "是" && e.radioStatus == true) {
              this.booleanVal.faraway = true;
            } else {
              this.booleanVal.faraway = false;
            }
          }
        });
      }
    },
    // 点击估算按钮  resultText
    clickBtn() {
      this.flag = true;
      // 重量值 长宽高值
      let weightVal = this.$refs.weight.value;
      let longVal = this.$refs.long.value;
      let wideVal = this.$refs.wide.value;
      let heightVal = this.$refs.height.value;
      //   是否为防疫品 是否带电 偏远地区 booleanVal对象
      this.radioList.forEach((e) => {
        e.radio.forEach((v) => {
          if (v.radioText == "是" && v.radioStatus == true) {
            if (e.text == "是否为防疫品") {
              this.booleanVal.freight = true;
            } else if (e.text == "是否带电") {
              this.booleanVal.electrification = true;
            } else {
              this.booleanVal.faraway = true;
            }
          }
        });
      });
      //   计费方式 的 options
      let freightOptionList = this.$refs.freightOption.children;

      //   提示

      if (this.options.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择运输方式",
          duration: 800,
          center: true,
        });
        this.resultText = "";
        return;
      }

      //   循环 运输方式的 options
      for (let i = 0; i < this.options.length; i++) {
        //   E邮宝 E邮宝加快
        if (this.options[i].selected) {
          if (this.options[i].value == 1 || this.options[i].value == 2) {
            // 提示
            if (weightVal == "") {
              this.$message({
                type: "warning",
                message: "请输入重量",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            if (weightVal == "0") {
              this.$message({
                type: "warning",
                message: "重量不能为零",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            this.iconSrc = "el-icon-loading";
            setTimeout(() => {
              this.iconSrc = "el-icon-right";
              this.resultText = ((weightVal * 50 + 30) * 0.97).toFixed(2);
              this.$notify({
                title: "请求成功",
                message: "估算结果成功",
                type: "success",
                offset: 65,
                duration: 800,
              });
            }, 800);
            //  E特快
          } else if (this.options[i].value == 3) {
            // 提示
            if (weightVal == "") {
              this.$message({
                type: "warning",
                message: "请输入重量",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            if (weightVal == "0") {
              this.$message({
                type: "warning",
                message: "重量不能为零",
                duration: 800,
                center: true,
              });
              this.resultText = "";
              return;
            }
            this.iconSrc = "el-icon-loading";
            setTimeout(() => {
              this.iconSrc = "el-icon-right";
              this.resultText = (
                ((weightVal - 0.05) / 0.025 + 66.2) * 0.97 +
                16
              ).toFixed(2);
              this.$notify({
                title: "请求成功",
                message: "估算结果成功",
                type: "success",
                offset: 65,
                duration: 800,
              });
            }, 800);
            // 佐川
          } else if (this.options[i].value == 4) {
            this.changeBilling();
            setTimeout(() => {
              this.$notify({
                title: "请求成功",
                message: "估算结果成功",
                type: "success",
                offset: 65,
                duration: 800,
              });
            }, 800);
          }
        }
      }

      this.flag = false;
    },
    ...homeActions(["setWstateStatus", "setNum"]),
  },
};
</script>