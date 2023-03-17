<template>
  <el-card>
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-position="left">
      <el-form-item label="dsiconselect(图标选择)" prop="dsiconselect">
        <ds-icon-select v-model="formData.dsiconselect"></ds-icon-select>
      </el-form-item>
      <el-form-item label="dsavatar(图标/头像)" prop="dsavatar">
        <ds-avatar v-model="formData.dsavatar" :size="80" fit="cover" shape="square"></ds-avatar>
      </el-form-item>
      <el-form-item label="dsselect(下拉)" prop="dsselect">
        <ds-select class="w-full" :multiple="true" v-model="formData.dsselect" placeholder="选择" data-source="Model" data-source-key="ds_microservice" text-field="description" value-field="name"></ds-select>
      </el-form-item>
      <el-form-item label="dsradio(单选)" prop="dsradio">
        <ds-radio class="w-full" v-model="formData.dsradio" placeholder="选择" data-source="Model" data-source-key="ds_microservice" text-field="description" value-field="name"></ds-radio>
      </el-form-item>
      <el-form-item label="dscheckbox(多选)" prop="dscheckbox">
        <ds-checkbox class="w-full" v-model="formData.dscheckbox" placeholder="选择" data-source="Model" data-source-key="ds_microservice" text-field="description" value-field="name"></ds-checkbox>
      </el-form-item>
      <el-form-item label="dsadminareaselect(省市区选择)" prop="dsadminareaselect">
        <ds-admin-area-select class="w-full" v-model="formData.dscheckbox" placeholder="选择省市区"></ds-admin-area-select>
      </el-form-item>
      <el-form-item label="dsuserselect(用户选择)" prop="dsuserselect">
        <ds-user-select class="w-full" v-model="formData.dsuserselect" placeholder="请选择用户"></ds-user-select>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script lang="ts">
export default {
  name: "ComTest"
}
</script>
<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
import dsmain from '@dscloud/api/dsmain';
import {DsIconSelect,DsSelect,DsAvatar,DsCheckbox,DsRadio,DsAdminAreaSelect,DsUserSelect} from '@dscloud/components';
import router from '@dscloud/router';

const options = reactive({
});
const formRef = ref<FormInstance>();
const formData:any = reactive({
  clientIcon:"",
  clientId: "",
  clientSecret:"",
  remark:"",
  enableFlag: "1",
});
const formRules = reactive<FormRules>({
});
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {

    }
  });
};
</script>

<style scoped>

</style>