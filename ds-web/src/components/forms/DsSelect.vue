<template>
  <el-select v-model="data.modelValue" filterable clearable @change="handler('selectChange',$event,null)">
    <el-option v-for="item in data.options" :key="item.value" :label="item.text" :value="item.value"></el-option>
    <slot />
  </el-select>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from "vue";
import dsmain from "@dscloud/api/dsmain";
export default defineComponent({
  name: "DsSelect",
  props: {
    options:Array,
    modelValue: String,
    dataSource:{
      type:String,
      default:"Options"
    },
    dataSourceKey:String,
    queryInfo:{
      type:Object,
      default:{
        "criteria":null,//查询条件
        "sort":null,//排序
        "includeFields":[],//包含输出字段
        "excludeFields":[],//排除输出字段
        "fields":null,//返回结果字段
        "limit":0,//限制查询记录数量
        "pageSize":9999,//每页显示记录数
        "pageNo":1//页号
      }
    },
    textField:String,
    valueField:String,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const data = reactive({
      modelValue:props.modelValue,
      options:props.options
    });
    if(props.dataSource!=="Options") {
      var param = {
        componentKey: "dsselect",
        datasource: props.dataSource,
        key: props.dataSourceKey,
        queryInfo:props.queryInfo,
        textField:props.textField,
        valueField:props.valueField,
      }
      dsmain.requestComponentData(param).then((res: any) => {
        if (res) {
          data.options = res;
          data.modelValue = props.modelValue;
        }
      });
    }
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
</style>
