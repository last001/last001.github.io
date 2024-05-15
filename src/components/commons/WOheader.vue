<template>
    <div class="WOheader ds-fx ai-c jc-sb ph-25 ps-s" style="top: 0;left: 0;">
        <div class="ds-fx ai-c pointer">
            <el-icon size="22">
                <component :is="options.isCollapse" @click="handler('switchAsideW')"></component>
            </el-icon>
            <h3 class="ml-15 us-none" @click="handler('toHome')">工单系统后台</h3>
        </div>
        <div class="ds-fx ai-c">
            <div class="ds-fx ai-c mr-25">
                <el-color-picker v-model="primaryColor" :predefine="predefineColors" @change="switchThemes($event)" />
                <p class="c-primary ml-10 pointer">主题</p>
            </div>
            <div class="ds-fx ai-c mr-25">
                <el-switch v-model="isDark" />
                <p class="c-primary ml-5 pointer" @click.stop="toggleDark()">暗黑</p>
            </div>
            <div class="ds-fx ai-c">
                <img class="wh-10 br-circle mr-10" src="@/assets/img/header.png" alt="">
                <el-popover ref="popover" placement="bottom" :width="140" trigger="hover">
                    <template #reference>
                        <div class="ds-fx ai-c pointer">
                            <div class="">王老师</div>
                            <el-icon>
                                <component :is="options.isheaderIconShow" @click="handler('switchAsideW')"></component>
                            </el-icon>
                        </div>
                    </template>
                    <template #default>
                        <div class="bg-white fs-14">
                            <div class="ds-fx ai-c pt-5 pb-10">
                                <el-icon size="16">
                                    <Bell />
                                </el-icon>
                                <div class="ml-15 pointer list">消息中心</div>
                            </div>
                            <div class="ds-fx ai-c pv-10 b-t-info">
                                <el-icon size="16">
                                    <User />
                                </el-icon>
                                <div class="ml-15 pointer list">个人设置</div>
                            </div>
                            <div class="ds-fx ai-c pv-10 b-t-info">
                                <el-icon size="16">
                                    <EditPen />
                                </el-icon>
                                <div class="ml-15 pointer list">修改密码</div>
                            </div>
                            <div class="ds-fx ai-c pv-10 b-t-info">
                                <el-icon size="16">
                                    <QuestionFilled />
                                </el-icon>
                                <div class="ml-15 pointer list">帮助中心</div>
                            </div>
                            <div class="ds-fx ai-c pt-10 b-t-info" @click="handler('logout')">
                                <el-icon size="16">
                                    <SwitchButton />
                                </el-icon>
                                <div class="ml-15 pointer list">退出登录</div>
                            </div>
                        </div>
                    </template>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, reactive, onMounted } from 'vue';
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { ref } from "vue";
import utils from "@/utils/utils";
import woApi from "@/api/woApi";
export default defineComponent({
    name: "WOheader",
    props: {
        setOptionEcharts: {
            type: Function,
            default: null
        }
    },
    // emits: ['switchThemes'],
    setup(props: any, context) {
        const store = useStore();
        const isDark = useDark({
            storageKey: 'useDarkKEY',
            // 暗黑class名字
            valueDark: 'dark',
            // 高亮class名字
            valueLight: 'light',
        });
        const toggleDark = useToggle(isDark);
        const router = useRouter();
        const primaryColor = computed(() => {
            return utils.getThemes(store);
        })
        const predefineColors = ref([
            "#008000", "#05C0AB", "#409eff", "#c62424", "#159920", "#0f1b9d", "#ac17ba", "#f66c09"
        ])
        const isCollapse = computed(() => {
            return store.state.isCollapse;
        })
        const options = reactive({
            isCollapse: "Expand", // Fold Expand 
            isheaderIconShow: "CaretBottom",
        })
        const handler = (command: string, data?: any, event?: any) => {
            switch (command) {
                case "toHome":
                    router.push("/");
                    break;
                case "toHelp":
                    router.push("/help")
                    break;
                case "search":
                    router.push("/search")
                    break;
                case "switchAsideW":
                    let isCollapse = false;
                    if (options.isCollapse == "Fold") {
                        options.isCollapse = "Expand";
                        isCollapse = true;
                    } else {
                        options.isCollapse = "Fold";
                        isCollapse = false;
                    }
                    store.commit("setIsCollapse", isCollapse)
                    break;
                case "logout":
                    router.push("/login")
                    break;
            }
        }

        const switchThemes = (color: any) => {
            if(props.setOptionEcharts){
                props.setOptionEcharts();
            }
            utils.setThemes(color, store);
        }

        onMounted(() => {
            options.isCollapse = isCollapse.value ? "Expand" : "Fold";
        })

        return {
            isDark,
            primaryColor,
            predefineColors,
            toggleDark,
            handler,
            switchThemes,
            options
        }
    }
})
</script>

<style lang="scss" scoped>
.WOheader {
    background-color: var(--el-bg-color-overlay);
}

.wh-10 {
    width: 30px;
    height: 30px;
}

.list {
    &:hover {
        color: var(--el-color-primary);
    }
}
</style>