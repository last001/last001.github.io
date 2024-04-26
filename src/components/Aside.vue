<template>
    <div class="Aside ps-f" :class="isCollapse ? 'collapse' : 'expand'" style="left:0;top:0;z-index: 999;">
        <div class="w-full text-center">logo</div>
        <el-menu default-active="1"  class="w-220 h-vh" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose">
            <el-sub-menu :index="item.id" v-for="(item, index) in moduleList" :key="index">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item :index="`${index}-${list.id}`" v-for="(list, idx) in item.children" :key="idx"
                    @click="toMenu(list)">
                    {{ list.name }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, defineProps, toRefs, computed, watch } from 'vue';

const store = useStore();
const router = useRouter();

const isCollapse = computed(() => {
    return store.state.isCollapse
})

const moduleList = reactive([
    {
        name: "工单管理",
        id: "1",
        children: [
            { name: "工单一", id: "1", url: "/menu/one" },
            { name: "工单二", id: "2", url: "/menu/two" },
            { name: "工单三测试时段1111111", id: "3" },
            { name: "工单四", id: "4" },
        ]
    },
    {
        name: "库哥展示管理",
        id: "2",
        children: []
    }
])

// const { isCollapse } = toRefs(props)

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

/**
 * toMenu事件参数类型
 */
interface item {
    name: string;
    id: string;
    url?: string;
}

const toMenu = (item: item) => {
    console.log(item.url);
    item.url ? router.push(item.url) : router.push("/notFound")
}

</script>

<style lang="scss" scoped>
/* :deep(.el-menu--collapse){
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)* 2) !important;
}
.el-sub-menu{
    :deep(.el-sub-menu__title){
        padding-right: 70px !important;
    }
} */
.w-220:not(.el-menu--collapse) {
  width: 220px;
}
</style>