import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style.css'
import '@/assets/css/theme.scss'; // 主题色
import '@/assets/css/dark.scss'; // 暗黑色
import '@/assets/css/index.scss'; // 自定义
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入新建的路由文件
import router from "@/router/index";
import store from '@/store/index'

// 全局注册组件
import Header1 from "@/components/header1.vue";
import Aside from "@/components/Aside.vue";
import Footer from "@/components/footer.vue";

import App from './App.vue';
const app = createApp(App)

app.use(router).use(store)
    .use(ElementPlus, { locale: zhCn, })
    .component('Header1', Header1)
    .component('Aside', Aside)
    .component('Footer', Footer)
    .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
