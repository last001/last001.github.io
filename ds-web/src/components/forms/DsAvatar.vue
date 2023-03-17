<template>
  <el-avatar class="ds-avatar" :size="data.size">
    <el-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <el-image :style="'height:'+data.size+'px;width:'+data.size+'px;'" :fit="data.fit" src="">
        <template #error>
          <div class="ds-fx ai-c jc-c w-full h-full">
            <el-icon :size="30"><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="mask-layer">
        <span>请点击上传</span>
      </div>
    </el-upload>
  </el-avatar>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from "vue";
import dsmain from "@dscloud/api/dsmain";
export default defineComponent({
  name: "DsAvatar",
  props: {
    modelValue: String,
    size:{
      type:Number,
      default:80
    },
    fit:{
      type:String,
      default:""
    }
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const data = reactive({
      modelValue:props.modelValue,
      fit:props.fit,
      size:props.size
    });
    //region 事件处理
    const handler = (command, item, event) => {
      switch (command) {
        case "selectChange":
          context.emit('update:modelValue', item);
          break;
      }
    };
    //endregion
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
    return { data, handler };
  },
});
</script>

<style lang="scss" scoped>
  .ds-avatar{
    position: relative;
    ::v-deep .el-upload{display:flex}
    .mask-layer{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      opacity: 0;
      font-size: 12px;
      background-color: var(--el-overlay-color-lighter);
      transition: opacity var(--el-transition-duration);
    }
    :hover{
      .mask-layer{opacity: 1;}
    }
  }
</style>