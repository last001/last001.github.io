<template>
  <div class="ds-icon-select" @click="data.dialogVisible = true">
    <el-icon :size="18"><component :is="modelValue"></component></el-icon>
  </div>
  <el-dialog
    v-model="data.dialogVisible"
    title="选择图标"
    top="8vh"
    width="60%"
    :before-close="handleClose"
  >
    <el-scrollbar max-height="60vh">
      <ul class="icon-list">
        <li
          class="icon-item"
          :class="[item.selected ? 'selected' : '']"
          v-for="item in data.icons"
          @click="handler('iconItemClick', item, $event)"
        >
          <el-icon :size="26"
            ><component :is="item.iconName"></component
          ></el-icon>
          <span class="icon-name">{{ item.iconName }}</span>
        </li>
      </ul>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handler('submit')">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, watch } from "vue";
import * as ElIcons from "@element-plus/icons-vue";
export default defineComponent({
  name: "DsIconSelect",
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const data = reactive({
      dialogVisible: false,
      icons: [],
    });
    for (let name in ElIcons) {
      let iconName = name == "Menu" ? "IconMenu" : name;
      let icon = {
        iconName: iconName,
        selected: false,
      };
      data.icons.push(icon);
    }
    //事件处理
    const handler = (command, item, event) => {
      switch (command) {
        case "iconItemClick":
          item.selected = true;
          data.icons.forEach((value, index, array) => {
            if (item != value) {
              value.selected = false;
            }
          });
          break;
        case "submit":
          data.icons.forEach((value, index, array) => {
            if (value.selected) {
              context.emit("update:modelValue", value.iconName);
            }
          });
          data.dialogVisible = false;
          break;
      }
    };
    //#region 监听属性变化
    watch(() => props.modelValue, (newValue, value) => {
      if (newValue !== value) {
        context.emit('update:modelValue', newValue);
        return true;
      }
      return false;
    });
    //#endregion
    return { data, handler };
  },
});
</script>

<style lang="scss" scoped>
.ds-icon-select {
  width: 32px;
  height: 32px;
  padding: 4px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  .icon-item {
    cursor: pointer;
    text-align: center;
    color: var(--el-text-color-regular);
    height: 90px;
    min-width: 90px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);
    &:hover {
      background-color: var(--el-border-color-extra-light);
    }
    &.selected {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
}
</style>
