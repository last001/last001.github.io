<template>
    <div class="main">
        <el-container>
            <Aside></Aside>
            <el-container  :class="isCollapse ? 'collapse' : 'expand'">
                <el-header>
                    <Header1></Header1>
                </el-header>
                <el-main style="background-color: var(--el-bg-color-page);">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isCollapse = computed(() => {
    return store.state.isCollapse;
})
</script>

<style lang='scss' scoped>
.el-header {
    --el-header-padding: 0;
}
</style>