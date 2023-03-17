<template>
  <div class="ds-wrapper log-wrapper">
    <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">微信参数设置</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
    <!--card-->
    <el-card shadow="never" class="mt-20 nobd">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="200px" label-position="left" >
          <el-collapse model-value="1">
            <el-collapse-item title="服务号参数设置"  name="1">
              <el-form-item label="服务号参数设置" prop="Status_FWH" required>
                  <el-switch v-model="formData.Status_FWH" />
              </el-form-item>
              <el-form-item label="AppID"  prop="AppID" required>
                <el-input  class="w-200 br-5" v-model="formData.AppID_FWH"/>
              </el-form-item>
              <el-form-item label="AppSecret"  prop="AppSecret" required>
                <el-input  class="w-200 br-5" v-model="formData.Secre_FWH"/>
              </el-form-item>
              <el-form-item label="Token"  prop="Token" required>
                <el-input  class="w-200 br-5" v-model="formData.Token_FWH"/>
              </el-form-item>
              <el-form-item label="EncodingAESKey"  prop="EncodingAESKey_FWH" required>
                <el-input  class="w-200 br-5" v-model="formData.EncodingAESKey_FWH"/>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="小程序（智慧校园）参数设置"  name="2">
              <el-form-item label="小程序（智慧校园）" prop="Status_YYH" required>
                  <el-switch v-model="formData.Status_YYH" />
              </el-form-item>
              <el-form-item label="AppID"  prop="AppID_YYH" required>
                <el-input  class="w-200 br-5" v-model="formData.AppID_YYH"/>
              </el-form-item>
              <el-form-item label="Secret"  prop="Secret_YYH" required>
                <el-input  class="w-200 br-5" v-model="formData.Secret_YYH"/>
              </el-form-item>
              <el-form-item label="GHAppID"  prop="GH_AppID_YYH" required>
                <el-input  class="w-200 br-5" v-model="formData.GH_AppID_YYH"/>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="微校（智慧校园）"  name="3">
              <el-form-item label="小程序（智慧校园）" prop="Status_Weixiao" required>
                  <el-switch v-model="formData.Status_Weixiao" />
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="小程序（招生迎新）参数设置"  name="4">
              <el-form-item label="小程序（招生迎新）" prop="Status_XCX_ZS" required>
                  <el-switch v-model="formData.Status_XCX_ZS" />
              </el-form-item>
              <el-form-item label="AppID"  prop="AppID_XCX_ZS" required>
                <el-input  class="w-200 br-5" v-model="formData.AppID_XCX_ZS"/>
              </el-form-item>
              <el-form-item label="Secret"  prop="Secret_XCX_ZS" required>
                <el-input  class="w-200 br-5" v-model="formData.Secret_XCX_ZS"/>
              </el-form-item>
              <el-form-item label="GHAppID"  prop="GH_AppID_XCX_ZS" required>
                <el-input  class="w-200 br-5" v-model="formData.GH_AppID_XCX_ZS"/>
              </el-form-item>
            </el-collapse-item>


            <el-collapse-item title="企业微信参数设置"  name="5">
              <el-form-item label="企业微信）" prop="Status_QYH" required>
                  <el-switch v-model="formData.Status_QYH" />
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="小程序(SAAS)参数设置"  name="6">
              <el-form-item label="小程序(SAAS)" prop="Status_Cloud_YYH" required>
                  <el-switch v-model="formData.Status_Cloud_YYH" />
              </el-form-item>
              <el-form-item label="AppID"  prop="AppID_Cloud_YYH" required>
                <el-input  class="w-200 br-5" v-model="formData.AppID_Cloud_YYH"/>
              </el-form-item>
              <el-form-item label="Secret"  prop="Secret_Cloud_YYH" required>
                <el-input  class="w-200 br-5" v-model="formData.Secret_Cloud_YYH"/>
              </el-form-item>
            </el-collapse-item>

          </el-collapse>
        <div class="mt-20">
          <el-button type="primary" @click="formSubmit(formRef)">提交</el-button>
        </div>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts">
export default {
  name:"WeixinParams",
  path: "/framework/org/weixinparams"
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
// 
Status_FWH:true,
AppID_FWH:'',
Secre_FWH:'',
Token_FWH:'',
EncodingAESKey_FWH:'',
// 
Status_YYH:true,
AppID_YYH:'',
Secret_YYH:'',
GH_AppID_YYH:'',
// 
Status_Weixiao:true,
// 
Status_XCX_ZS:true,
AppID_XCX_ZS:'',
Secret_XCX_ZS:'',
GH_AppID_XCX_ZS:'',
// 
Status_QYH:true,
// 
Status_Cloud_YYH:true,
AppID_Cloud_YYH:'',
Secret_Cloud_YYH:'',



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

