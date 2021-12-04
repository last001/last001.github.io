<template>
  <div class="freightComputers">
    <div class="main" v-title data-title="运费估算"></div>
    <div class="box">
      <div class="feightInfo">
        <div class="content">
          <div class="showFace">
            <div class="transport">
              <span>运输方式：</span>
              <el-select
                v-model="optionIndex"
                @change="changeSelect"
                clearable
                @clear="optionIndex = 0"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="billing">
              <span>计费方式：</span>
              <el-select
                v-model="freightIndex"
                @change="changeBilling"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in freightList"
                  :key="item.value"
                  :label="item.text"
                  :disabled="item.disabled"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="weight">
              <div>
                <span>重量(kg)：</span>
                <input
                  type="number"
                  placeholder="重量(kg)"
                  v-model="weightVal"
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
                placeholder="长(单位:cm)"
                :disabled="disabledList.long"
                v-model="longVal"
              />
              <input
                type="text"
                placeholder="宽(单位:cm)"
                :disabled="disabledList.wide"
                v-model="wideVal"
              />
              <input
                type="text"
                placeholder="高(单位:cm)"
                :disabled="disabledList.height"
                v-model="heightVal"
              />
            </div>
            <div class="radioBox">
              <div class="item" v-for="(item, index) in radioList" :key="index">
                <span class="text">{{ item.text }}：</span>
                <div class="list">
                  <el-radio-group
                    v-model="item.radioIndex"
                    @change="clickInput()"
                  >
                    <el-radio
                      :label="v.value"
                      v-for="(v, i) in item.radio"
                      :key="i"
                      >{{ v.radioText }}</el-radio
                    >
                  </el-radio-group>
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
  </div>
</template>
<script>
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
      optionIndex: 0,
      optionList: [
        { text: "请选择", value: 0, selected: true },
        { text: "E邮宝", value: 1, selected: false },
        { text: "E邮宝加快", value: 2, selected: false },
        { text: "E特快", value: 3, selected: false },
        { text: "佐川", value: 4, selected: false },
      ],
      //    freightList
      freightIndex: 0,
      freightList: [
        { text: "重量", value: 0, disabled: false },
        { text: "体积", value: 1, disabled: true },
      ],
      //   radioList
      radioList: [
        {
          text: "是否为防疫品",
          radioIndex: 1,
          radio: [
            { radioText: "是", value: 0 },
            { radioText: "否", value: 1 },
          ],
        },
        {
          text: "是否带电",
          radioIndex: 1,
          radio: [
            { radioText: "是", value: 0 },
            { radioText: "否", value: 1 },
          ],
        },
        {
          text: "偏远地区(冲绳)",
          radioIndex: 1,
          radio: [
            { radioText: "是", value: 0 },
            { radioText: "否", value: 1 },
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
      //  长 宽  高
      weightVal: "",
      longVal: "",
      wideVal: "",
      heightVal: "",
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
  created() {
    this.$nextTick(() => {
      this.$parent.$refs.sideNavbar1.testRouter();
    });
  },
  components: {
    // footerDiv,
  },
  computed: {
    ...homeState(["WstateStatus", "num"]),
  },
  methods: {
    // 运输方式改变select 事件
    changeSelect() {
      if (this.optionIndex == 0) {
        for (const key in this.disabledList) {
          this.disabledList[key] = true;
        }
        this.freightList.forEach((e) => {
          e.disabled = true;
          if (e.value == 1) {
            e.disabled = true;
          }
        });
      } else if (
        this.optionIndex == 1 ||
        this.optionIndex == 2 ||
        this.optionIndex == 3
      ) {
        this.freightList.forEach((e) => {
          e.disabled = false;
          if (e.value == 1) {
            e.disabled = true;
          }
        });

        for (const key in this.disabledList) {
          if (key == "weight") {
            this.disabledList[key] = false;
          } else {
            this.disabledList[key] = true;
          }
        }
      } else {
        this.freightList.forEach((e) => {
          e.disabled = false;
        });

        for (const key in this.disabledList) {
          if (key == "weight" || key == "freight") {
            this.disabledList[key] = false;
          } else {
            this.disabledList[key] = true;
          }
        }
      }
    },
    // 计费方式改变select 事件
    changeBilling() {
      if (this.freightIndex == 1) {
        // input selected 的值
        this.disabledList.weight = true;
        this.disabledList.long = false;
        this.disabledList.wide = false;
        this.disabledList.height = false;
        this.weightVal = (this.longVal * this.wideVal * this.heightVal) / 6000;

        if (this.flag) {
          // 提示
          if (
            this.longVal == "" ||
            this.wideVal == "" ||
            this.heightVal == ""
          ) {
            this.$message({
              type: "warning",
              message: "长宽高的值不能为空",
              duration: 800,
              center: true,
            });
            this.resultText = "";
            return;
          }
          if (
            this.longVal == "0" ||
            this.wideVal == "0" ||
            this.heightVal == "0"
          ) {
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
            if (this.weightVal * 2 > 1) {
              // 为防疫品
              if (this.booleanVal.freight) {
                this.resultText = (
                  47.5 +
                  13 * (this.weightVal * 2 - 1) +
                  55
                ).toFixed(2);
                // 为防疫品 带电
                if (this.booleanVal.electrification) {
                  this.resultText = (
                    55 +
                    15 * (this.weightVal * 2 - 1) +
                    55
                  ).toFixed(2);
                  // 为防疫品  带电  偏远
                  if (this.booleanVal.faraway) {
                    this.resultText = (
                      55 +
                      15 * (this.weightVal * 2 - 1) +
                      55 +
                      100
                    ).toFixed(2);
                  }
                  // 为防疫品  偏远
                } else if (this.booleanVal.faraway) {
                  this.resultText = (
                    47.5 +
                    13 * (this.weightVal * 2 - 1) +
                    55 +
                    100
                  ).toFixed(2);
                }
                // 为带电
              } else if (this.booleanVal.electrification) {
                this.resultText = (55 + 15 * (this.weightVal * 2 - 1)).toFixed(
                  2
                );
                // 为带电  偏远
                if (this.booleanVal.faraway) {
                  this.resultText = (
                    55 +
                    15 * (this.weightVal * 2 - 1) +
                    100
                  ).toFixed(2);
                }
                // 为偏远
              } else if (this.booleanVal.faraway) {
                this.resultText = (
                  47.5 +
                  13 * (this.weightVal * 2 - 1) +
                  100
                ).toFixed(2);
              } else {
                // 普货
                this.resultText = (
                  47.5 +
                  13 * (this.weightVal * 2 - 1)
                ).toFixed(2);
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
      } else {
        // 设置input的value值
        this.long = "";
        this.wide = "";
        this.height = "";
        // input selected 的值
        this.disabledList.weight = false;
        this.disabledList.long = true;
        this.disabledList.wide = true;
        this.disabledList.height = true;

        if (this.flag) {
          // 提示
          if (this.weightVal == "") {
            this.$message({
              type: "warning",
              message: "请输入重量",
              duration: 800,
              center: true,
            });
            this.resultText = "";
            return;
          }
          if (this.weightVal == "0") {
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
            if (this.weightVal * 2 > 1) {
              // 为防疫品
              if (this.booleanVal.freight) {
                this.resultText = (
                  47.5 +
                  13 * (this.weightVal * 2 - 1) +
                  55
                ).toFixed(2);
                // 为防疫品 带电
                if (this.booleanVal.electrification) {
                  this.resultText = (
                    55 +
                    15 * (this.weightVal * 2 - 1) +
                    55
                  ).toFixed(2);
                  // 为防疫品  带电  偏远
                  if (this.booleanVal.faraway) {
                    this.resultText = (
                      55 +
                      15 * (this.weightVal * 2 - 1) +
                      55 +
                      100
                    ).toFixed(2);
                  }
                  // 为防疫品  偏远
                } else if (this.booleanVal.faraway) {
                  this.resultText = (
                    47.5 +
                    13 * (this.weightVal * 2 - 1) +
                    55 +
                    100
                  ).toFixed(2);
                }
                // 为带电
              } else if (this.booleanVal.electrification) {
                this.resultText = (55 + 15 * (this.weightVal * 2 - 1)).toFixed(
                  2
                );
                // 为带电  偏远
                if (this.booleanVal.faraway) {
                  this.resultText = (
                    55 +
                    15 * (this.weightVal * 2 - 1) +
                    100
                  ).toFixed(2);
                }
                // 为偏远
              } else if (this.booleanVal.faraway) {
                this.resultText = (
                  47.5 +
                  13 * (this.weightVal * 2 - 1) +
                  100
                ).toFixed(2);
              } else {
                // 普货
                this.resultText = (
                  47.5 +
                  13 * (this.weightVal * 2 - 1)
                ).toFixed(2);
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
    },
    // 点击radio
    clickInput() {
      //   改变selet 给booleanVal 赋值
      this.radioList.forEach((e) => {
        if (e.text == "是否为防疫品") {
          if (e.radioIndex == 0) {
            this.booleanVal.freight = true;
          } else {
            this.booleanVal.freight = false;
          }
        } else if (e.text == "是否带电") {
          if (e.radioIndex == 0) {
            this.booleanVal.electrification = true;
          } else {
            this.booleanVal.electrification = false;
          }
        } else {
          if (e.radioIndex == 0) {
            this.booleanVal.faraway = true;
          } else {
            this.booleanVal.faraway = false;
          }
        }
      });
    },
    // 点击估算按钮  resultText
    clickBtn() {
      this.flag = true;

      //   是否为防疫品 是否带电 偏远地区 booleanVal对象
      this.radioList.forEach((e) => {
        if (e.radioIndex == 0) {
          if (e.text == "是否为防疫品") {
            this.booleanVal.freight = true;
          } else if (e.text == "是否带电") {
            this.booleanVal.electrification = true;
          } else {
            this.booleanVal.faraway = true;
          }
        }
      });

      //   提示
      if (this.optionIndex == 0) {
        this.$message({
          type: "warning",
          message: "请选择运输方式",
          duration: 800,
          center: true,
        });
        this.resultText = "";
        return;
      }

      console.log("this.optionIndex ==>", this.optionIndex);

      if (this.optionIndex == 1 || this.optionIndex == 2) {
        // 提示
        console.log(this.weightVal);
        if (this.weightVal == "") {
          this.$message({
            type: "warning",
            message: "请输入重量",
            duration: 800,
            center: true,
          });
          this.resultText = "";
          return;
        }
        if (this.weightVal == "0") {
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
          this.resultText = ((this.weightVal * 50 + 30) * 0.97).toFixed(2);
          this.$notify({
            title: "请求成功",
            message: "估算结果成功",
            type: "success",
            offset: 65,
            duration: 800,
          });
        }, 800);
        //  E特快
      } else if (this.optionIndex == 3) {
        // 提示
        if (this.weightVal == "") {
          this.$message({
            type: "warning",
            message: "请输入重量",
            duration: 800,
            center: true,
          });
          this.resultText = "";
          return;
        }
        if (this.weightVal == "0") {
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
            ((this.weightVal - 0.05) / 0.025 + 66.2) * 0.97 +
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
      } else if (this.optionIndex == 4) {
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

      this.flag = false;
    },
    ...homeActions(["setWstateStatus", "setNum"]),
  },
};
</script>