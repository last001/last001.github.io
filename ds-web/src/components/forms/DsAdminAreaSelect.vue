<template>
  <el-cascader v-model="data.modelValue" :props="cascaderProps" @change="handler('cascaderChange',$event,null)"/>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from "vue";
import dsmain from "@dscloud/api/dsmain";
export default defineComponent({
  name: "DsAdminAreaSelect",
  props: {
    modelValue: Array,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const data = reactive({
      modelValue:props.modelValue,
    });
    const cascaderProps = {
      lazy: true,
      lazyLoad(node, resolve) {
        const { level } = node;
        var param = {
          componentKey: "dsselect",
          datasource: "AdministrativeArea",
          key: level===0?"":node.value
        }
        dsmain.requestComponentData(param).then((res:any) => {
          if(res){
            let nodes = [];
            res.forEach((item,idx,arr)=>{
              nodes.push({value:item.value,label:item.text,leaf:level>1});
            });
            resolve(nodes);
          }
        });
      }
    }
    //region 事件处理
    const handler = (command, item, event) => {
      switch (command) {
        case "cascaderChange":
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
    return { data, handler,cascaderProps };
  },
});
</script>

<style lang="scss" scoped>
</style>
