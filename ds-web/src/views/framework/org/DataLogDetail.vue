<template>
  <div class="ds-wrapper datalog-detail-wrapper">
    <ds-breadcrumb class="mb-20" :menu-id="router.currentRoute.value.meta.id"></ds-breadcrumb>
    <!--desc-->
    <div class="ds-desc">
      <h4>{{router.currentRoute.value.meta.title}}</h4>
      <span class="detail">用于记录系统修改、删除、标记删除等操作的详细数据，并可对删除、标记删除操作进行回退。</span>
      <el-icon class="icon"><component :is="router.currentRoute.value.meta.iconName"></component></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DataLogDetail"
}
</script>

<script lang="ts" setup>
import {ref, reactive, nextTick} from 'vue';
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
import dsmain from '@dscloud/api/dsmain';
import { DsTable,DsTablebar,DsBreadcrumb } from '@dscloud/components';
import router from '@dscloud/router';
</script>

<style scoped>

</style>