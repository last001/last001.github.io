<template>
  <div class="ds-wrapper log-wrapper">
    <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">系统参数。</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--card-->
    <el-card shadow="never" class="mt-20 nobd">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="150px" label-position="left">
        <el-collapse model-value="1">
            <el-collapse-item title="基本设置" name="1">
              <el-form-item label="系统名称" prop="systemName" required>
                <el-input class="w-300" v-model="formData.systemName"/>
                </el-form-item>
            </el-collapse-item>
          </el-collapse>
        <div class="mt-20">
          <el-button type="primary" @click="formSubmit(formRef)">保存</el-button>
        </div>
      </el-form>
    </el-card>
    <div class="mt-20 lh-30 fs-15" style="color:var(--el-color-info)">
      <p >说明:</p> 
      <p >1、学校名称:当前系统所应用学校的名称，内部子系统会引用学校名称</p> 
      <p >2、初始用户密码;批量导入或生成用户时的初始密码，密码规则:字母、数字或者英文符号,8-20位,不能全为字母或数字,不能有下滑线,例如:User12343</p> 
      <p >3、校验密码安全性:登录系统后，系统会校验初始密码以及不符合规则密码，校验成功后会提示修改:</p> 
      <p >4、关键信息加密:启用关键信息加密后，对带加密标识的实体字段进行加密存储</p> 
      <p >5、默认分页记录数:表格分页查询时的默认显示记录数，如:20条</p> 
      <p >6、用户网盘容量:用户网盘容量上限值，如: 200MB</p> 
      <p >7、日志保留天数:系统相关日志信息的保留天数[30-3600]，超过限定值的部分会被删除</p> 
      <p >8、收件箱数量限制:邮件收件箱数量限制，达到限制条数，会提醒清理，并且不能发送新的邮件</p> 
    </div>
    <!---->
  </div>
</template>

<script lang="ts">
export default {
  name:"SystemParams",
  path: "/framework/org/systemparams"
}
</script>

<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';
import dsorg from "@dscloud/api/dsorg";
import {FormInstance, FormRules} from "element-plus";
import {DsBreadcrumb } from '@dscloud/components';
import router from '@dscloud/router';

const formRef = ref<FormInstance>();
const formData:any = reactive({
  systemName:'',
});
const formRules = reactive<FormRules>({
  systemName: [
    {
      required: true,
      message: '请输入系统名称',
      trigger: ['blur', 'change'],
    },
  ],
});
//region 事件、方法
const handler = (command,data,event)=>{
  switch (command) {
   
  }
}
// onMounted(() => {
//   var param={'keyword':'系统名称'}
//   dsorg.getSystemParams(param).then((res) => {
//         console.log(res)
//   })

// });
const formSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      var param={'keyword':'系统名称','value':formData.systemName}
      dsorg.saveSystemParams(param).then((res) => {
        console.log(res)
      })
     
    }
  });
};

//endregion
</script>

<style lang="scss" scoped>

</style>
