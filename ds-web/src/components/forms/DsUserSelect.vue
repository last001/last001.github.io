<template>
  <div class="ds-user-select ds-fx ai-c">
    <div :class="data.selectFocus?'wrapper fx-size-1 is-focus':'wrapper fx-size-1'">
      <el-select class="w-full" filterable clearable @visible-change="data.selectFocus=$event;"></el-select>
    </div>
    <div class="append"><el-button @click="data.showDialog=true">选择</el-button></div>
    <ds-user-select-dialog v-model="data.showDialog"></ds-user-select-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from "vue";
import DsUserSelectDialog from "./../dialogs/DsUserSelectDialog.vue";
import dsmain from "@dscloud/api/dsmain";
export default defineComponent({
  name: "DsUserSelect",
  components:{ DsUserSelectDialog },
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const data = reactive({
      modelValue: props.modelValue,
      selectFocus:false,
      showDialog:false
    });
    //#region 监听属性变化
    watch(() => props.modelValue, (newValue, value) => {
      if (newValue !== value) {
        data.modelValue = newValue;
        context.emit('update:modelValue', newValue);
        return true;
      }
      return false;
    });
    //#endregion
    return{data}
  },
});
</script>

<style lang="scss" scoped>
  .ds-user-select{
    .wrapper{
      border-radius: var(--el-border-radius-base);
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      color: var(--el-color-info);
      transition: var(--el-transition-box-shadow);
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      &:hover{
        z-index: 1;
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color-hover)) inset;
      }
      &.is-focus{
        z-index: 1;
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color, var(--el-color-primary)) inset;
      }
      .el-select {
        ::v-deep .el-input__wrapper {
          background-color: transparent;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-color: transparent;
          box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset !important;
        }
      }
    }
    .append{
      margin-left:-1px;
      border-radius: var(--el-border-radius-base);
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      background-color: var(--el-fill-color-light);
      color: var(--el-color-info);
      transition: var(--el-transition-box-shadow);
      position: relative;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      &:hover{
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color-hover)) inset;
      }
      .el-button{
        height: 30px;
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
        border-color:transparent;
        background-color: transparent;
        color: inherit;
      }
    }

  }
</style>