import { createApp } from 'vue'
import App from './App.vue'
/*import {router} from './../../es/src'
import './../../es/style.css'*/
import {router} from './../../src'
import './../../src/assets/styles/core.css'
import './../../src/assets/styles/theme-default/index.scss'
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElIcons from '@element-plus/icons-vue';
import VueWechatTitle from 'vue-wechat-title';

const app = createApp(App);
for (let name in ElIcons){
    let comName = name=="Menu"?"IconMenu":name;
    // @ts-ignore
    app.component(comName,ElIcons[name]);
}
app.use(ElementPlus,{locale:zhCn}).use(router).use(VueWechatTitle).mount('#app');
