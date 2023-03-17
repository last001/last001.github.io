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
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="150px" label-position="left" >
          <el-collapse model-value="1">
            <el-collapse-item title="默认密码" name="1">
              <el-form-item label="默认密码类型" prop="custom" required>
                <el-radio-group v-model="formData.custom">
                  <el-radio-button :label="true">自定义密码</el-radio-button>
                  <el-radio-button :label="false">随机密码</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="自定义密码" v-show="formData.custom ==true" prop="customPassWord" required>
                <el-input type="password" class="w-200 br-5" v-model="formData.customPassWord"/>
              </el-form-item>

            </el-collapse-item>

            <el-collapse-item title="密码策略" name="2">
              <el-form-item label="启用密码策略" prop="policy" required>
                  <el-switch v-model="formData.policy" />
              </el-form-item>
              <el-form-item label="弱密码校检" prop="verification" required>
                <el-switch v-model="formData.verification" />
              </el-form-item>
              <el-form-item label="强制密码过期" prop="forceExpiration" required>
                <el-switch v-model="formData.forceExpiration" />
              </el-form-item>
              <el-form-item label="密码有效天数" prop="expirationTime" required>
                <el-input type="password" class="w-200 br-5 mr-20" v-model="formData.expirationTime"/>  后密码过期
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
      <p>1、弱密码校验:将会校验密码是否为初始密码或者不符合规则的密码</p>
      <p>2、强制密码过期:用户登录后将会校验密码过期时间</p>
      <p>3、密码有效天数:在用户创建或者修改密码后，将密码过期时间修改至有效天数，-1代表为密码永不过期</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name:"PasswordPolicy",
  path: "/framework/org/passwordpolicy"
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
  custom:true,
  customPassWord:'',
  policy:true,
  verification:true,
  forceExpiration:true,
  expirationTime:''


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