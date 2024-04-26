<template>
    <div class="main">
        <el-container>
            <Aside></Aside>
            <el-container>
                <el-header>
                    <Header1></Header1>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">

</script>

<style lang='scss' scoped>
.el-header {
    --el-header-padding: 0;
}
</style>