<template>
  <div id="tree">
    <el-tree-select
      v-model="optionValue"
      :data="options"
      :render-after-expand="false"
      :check-on-click-node="dsClickNode"
      :multiple="dsMultiple"
      :clearable="dsClearable"
      :filterable="dsFilterable"
      :filter-node-method="dsFilterNodeMethod"
      :size="dsSize"
      :show-checkbox="dsShowCheckbox"
      :check-strictly="dsCheckStrictly"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "DsTreeSelect",
  props: {
    modelValue: { type: String, default: "" },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 绑定数据
    options: {
      type: Array,
      default: () => [],
    },
    // 设置点击全部都可选择
    dsClickNode: {
      type: Boolean,
      default: false,
    },
    // 是否可以多选
    dsMultiple: {
      type: Boolean,
      default: false,
    },
    // 是否可以清空选项
    dsClearable: {
      type: Boolean,
      default: false,
    },
    // 是否开启筛选
    dsFilterable: {
      type: Boolean,
      default: false,
    },
    // 输入框尺寸
    dsSize: {
      type: String,
      default: "default", // large/default/small
    },
    // 显示复选框的情况下，是否严格的遵循父子不互相关联
    dsCheckStrictly: {
      type: Boolean,
      defalut: false,
    },
    // 节点是否可被选择
    dsShowCheckbox: {
      type: Boolean,
      defalut: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  emits: ["nodeClick", "update:modelValue"],
  setup(props, context) {
    const optionValue = ref("");
    const dsFilterNodeMethod = (value, data) => data.label.includes(value);
    return {
      dsFilterNodeMethod,
      optionValue,
    };
  },
});
</script>

<style style="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
#tree {
  display: inline-block;
  padding-right: 10px;
}
</style>
