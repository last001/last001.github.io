<template>
    <div class="Header1 ds-fx ai-c jc-sb ph-25 ps-s" style="top: 0;left: 0;">
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
            <el-icon :size="18">
                <Search />
            </el-icon>
            <el-text type="primary" class="ml-5 pointer" @click="handler('search')">搜索</el-text>
            <el-text type="primary" class="ml-50 pointer" @click="handler('toHelp')">帮助</el-text>
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
export default defineComponent({
    name: "Header1",
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
            }
        }

        const switchThemes = (color: any) => {
            props.setOptionEcharts();
            utils.setThemes(color, store);
        }

        onMounted(() =>{
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
.Header1 {
    background-color: var(--el-bg-color-overlay);
}
</style>