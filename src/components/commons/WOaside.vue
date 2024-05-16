<template>
    <div class="WOaside ps-f" :class="isCollapse ? 'collapse' : 'expand'" style="left:0;top:0;z-index: 999;">
        <div class="logoBox box-sizing ds-fx ai-c jc-c pv-10 transition-3">
            <el-icon class="br-2 p-5 transition-3" color="#FFF" size="26" :style="{backgroundColor: primaryColor}"><Ship /></el-icon>
            <div class="fx-d-cloumn ai-c jc-c ml-10 transition-3" :style="{display:isShow ? 'none' : 'block'}">
                <div class="bold">客户服务管理</div>
                <div class="fs-12">Customer Service</div>
            </div>
        </div>
        <el-menu :default-openeds="defaultOpeneds" :default-active="defaultActive" class="w-220 h-vh" unique-opened :collapse="isCollapse">
            <el-sub-menu :index="item.id" v-for="(item, index) in moduleList" :key="index">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item :index="list.code" v-for="(list, idx) in item.children" :key="idx"
                    @click="toMenu(list)">
                    {{ list.name }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, defineProps, toRefs, computed, watch ,ref, onMounted, onBeforeMount} from 'vue';
import utils from "@/utils/utils";

const store = useStore();
const router = useRouter();

const isCollapse = computed(() => {
    return store.state.isCollapse;
})

const primaryColor = computed(() => {
    return utils.getThemes(store);
})

const isShow = ref(false);

const defaultActive = ref();
const defaultOpeneds = ref();

const moduleList = reactive([
    {
        name: "工单管理",
        id: "1",
        children: [
            { name: "工单一", id: "1", code:"one", url: "/menu/one" },
            { name: "工单二", id: "2", code:"two",url: "/menu/two" },
            { name: "工单三测试时段1111111", id: "3" },
            { name: "工单四", id: "4" },
        ]
    },
    {
        name: "库哥展示管理",
        id: "2",
        children: [
            { name: "工单er---一", id: "1",code:"twoOne", url: "/menu/twoOne" },
            { name: "工单er---二", id: "2", url: "" },
        ]
    }
])

/**
 * toMenu事件参数类型
 */
interface item {
    name: string;
    id: string;
    url?: string;
}

/**
 * @function toMenu 跳转路由
 * @param item 参数
 */
const toMenu = (item: item) => {
    item.url ? router.push(item.url) : router.push("/notFound")
}
onBeforeMount(() =>{
    const path = router.currentRoute.value?.path || null;
    const code = router.currentRoute.value?.meta.code || null;
    if(!path || path == "/"){
        defaultOpeneds.value = [];
    }else{
        let idx = moduleList.findIndex((v:any,i:number) =>{
            if(v.children.some((el:any) => el.url && el.code == code)){
                return i;
            }
        });
        console.log(idx);
        defaultOpeneds.value = [];
        defaultOpeneds.value.push(`${idx}`);
    }
    console.log(defaultOpeneds.value);
    defaultActive.value = code;
})

onMounted(() =>{
    isShow.value = isCollapse.value;
})

watch(isCollapse,(newVal) =>{
    console.log(newVal);
    if(newVal){
        isShow.value = newVal;
    }else{
        setTimeout(() => {
            isShow.value = newVal;
        }, 250);
    }
})

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