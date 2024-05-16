<template>
    <div class="w-full h-vh us-none">
        <div class="h-full fx-d-cloumn ai-c jc-c" v-if="isDark == 'auto'">
            <div>
                <span class="c-red fs-50">404</span>
                <span class="ml-25 fs-45">NOT Found</span>
                <span class="ml-20 fs-45">!</span>
            </div>
            <div class="fs-50">
                <span>你懂的</span>
                <span class="ml-20 c-primary">...</span>
            </div>
            <div>
                <img class="" src="@/assets/img/404.jpg" alt="">
            </div>
            <div class="ds-fx ai-c c-primary">
                <div class="ds-fx ai-c mr-60 pointer" @click="handler('back')">
                    <el-icon>
                        <Back />
                    </el-icon>
                    <span class="ml-5">返回首页</span>
                </div>
                <div class="ds-fx ai-c ml-60 pointer" @click="handler('relaod')">
                    <el-icon>
                        <RefreshRight />
                    </el-icon>
                    <span class="ml-5">刷新一下</span>
                </div>
            </div>
        </div>
        <div class="h-full fx-d-cloumn ai-c jc-c" v-else>
            <div class="c-white mt--70">
                <span class="fs-225">4</span>
                <img class="mh-70" src="@/assets/img/zero.png" alt="">
                <span class="fs-225">4</span>
            </div>
            <p>对不起，您的页面丢失了。</p>
            <div class="ds-fx ai-c mt-50">
                <div class="ds-fx ai-c mr-60 pointer bg-white ph-5" style="border: 1px solid #fff;" @click="handler('back')">
                    <el-icon >
                        <Back />
                    </el-icon>
                    <span class="ml-5">返回首页</span>
                </div>
                <div class="ds-fx ai-c ml-60 pointer ph-5" style="border: 1px solid #fff;" @click="handler('relaod')">
                    <el-icon>
                        <RefreshRight />
                    </el-icon>
                    <span class="ml-5">刷新一下</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

const isDark = computed(() => {
    return localStorage.getItem("useDarkKEY");
})

const handler = (command: string, data?: any) => {
    switch (command) {
        case "back":
            router.back();
            break;
        case "relaod":
        location.reload()
            break;
    }
}
</script>

<style lang="scss" scoped>
.fs-225 {
    font-size: 225px;
}

.mt--70 {
    margin-top: -70px;
}
</style>