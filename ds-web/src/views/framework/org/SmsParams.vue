<template>
  <div class="ds-wrapper log-wrapper">
    <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">短信参数设置</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--card-->
    <el-card shadow="never" class="mt-20 nobd">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="200px" label-position="left" >
          <el-collapse model-value="1">
            <el-collapse-item  name="1">
              <el-form-item label="短信" prop="message" required>
                  <el-switch v-model="formData.message" />
              </el-form-item>
              <el-form-item label="默认密码类型" prop="custom" required>
                <el-radio-group v-model="formData.custom">
                  <el-radio-button :label="1">阿里云</el-radio-button>
                  <el-radio-button :label="2">腾讯云</el-radio-button>
                </el-radio-group>
              </el-form-item>

             
              <el-form-item label="SignName"  prop="signName" required>
                <el-input type="password" class="w-200 br-5" v-model="formData.signName"/>
              </el-form-item>
              <el-form-item label="AccessKey/Appid"  prop="AccessKey_Appid" required>
                <el-input type="password" class="w-200 br-5" v-model="formData.AccessKey_Appid"/>
              </el-form-item>
              <el-form-item label="AccessSecret/AppKey"  prop="AccessSecret_AppKey" required>
                <el-input type="password" class="w-200 br-5" v-model="formData.AccessSecret_AppKey"/>
              </el-form-item>

            </el-collapse-item>

          </el-collapse>
        <div class="mt-20">
          <el-button type="primary" @click="formSubmit(formRef)">提交</el-button>
        </div>
      </el-form>
    </el-card>
    <!---->
    <div class="mt-20 lh-30 fs-15" style="color:var(--el-color-info)">
      <p>说明</p>
      <p>SignName: 短信签名</p>
      <p>AccessKey: 阿里云中参数， Appid: 腾讯云中参数</p>
      <p>AccessSecret: 阿里云中参数, AppKey: 腾讯云中参数</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name:"SmsParams",
  path: "/framework/org/smsparams"
}
</script>

<script lang="ts" setup>
import { ref,reactive } from 'vue';
import dsmain from '@dscloud/api/dsmain';
import {FormInstance, FormRules} from "element-plus";
import {DsBreadcrumb} from '@dscloud/components';
import router from '@dscloud/router';
const options = reactive({
  drawerVisible:false,
  adFilterBarShow:false
});
const formRef = ref<FormInstance>();
const formData:any = reactive({
  message:true,
  custom:'1',
  signName:'',
  AccessKey_Appid:'',
  AccessSecret_AppKey:'',


});
const formRules = reactive<FormRules>({
  
});
//region 事件、方法
const handler = (command,data,event)=>{
  switch (command) {
 
  }
}
//endregion
</script>

<style scoped>

</style>



