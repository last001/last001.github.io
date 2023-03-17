<template>
  <el-select
    ref="DsRoomSelect"
    v-bind="$attrs"
    v-model="optionValue"
    :multiple="false"
    :disabled="disabled"
    :clearable="DSclearable"
    :placeholder="DSplaceholder"
    :filterable="DSfilterable"
  >
    <el-option :value="optionValue" :label="optionValue" class="options">
      <el-tree
        id="tree-option"
        ref="tree"
        :default-expand-all="DSdefaultExpandAll"
        :data="options"
        @node-click="handleNodeClick"
        :show-checkbox="DSshowCheckbox"
      />
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "DsRoomSelect",
  props: {
    modelValue: { type: String, default: "" },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 占位符
    DSplaceholder: {
      type: String,
      default: "",
    },
    // 是否默认展开所有节点
    DSdefaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 是否可以清空选项
    DSclearable: {
      type: Boolean,
      default: false,
    },
    // 节点是否可被选择
    DSshowCheckbox: {
      type: Boolean,
      default: false,
    },
    // 否可筛选
    DSfilterable: {
      type: Boolean,
      default: false,
    },
    // 绑定数据
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["nodeClick", "update:modelValue"],
  setup(props, context) {
    const value = ref();
    function getLable(arr, value) {
      let res = "";
      function find(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === value) {
            res = arr[i].label;
          }
          if (arr[i].children && arr[i].children.length) {
            find(arr[i].children, value);
          }
        }
      }
      find(arr, value);
      return res;
    }
    watch(
      () => {
        return props.modelValue;
      },
      () => {
        optionValue.value = getLable(props.options, props.modelValue);
      }
    );
    onMounted(() => {
      optionValue.value = getLable(props.options, props.modelValue);
    });
    const DsRoomSelect = ref();

    const optionValue = ref("");
    function handleNodeClick(node) {
      optionValue.value = node.label;
      DsRoomSelect.value.blur();
      context.emit("nodeClick", node);
      context.emit("update:modelValue", node.value);
    }
    return {
      DsRoomSelect,
      handleNodeClick,
      optionValue,
    };
  },
});
</script>

<style scoped>
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
</style>
