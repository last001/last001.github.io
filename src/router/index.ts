// 导入router所需的方法
import { createRouter, createWebHashHistory ,createWebHistory} from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 导入路由页面的配置
import routes from './routes'
 

// 路由参数配置
const router = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHistory(),
    routes: routes,
})
 
// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to:any, from:any, next:any) => {
    // 继续前进 next()
    // 返回 false 以取消导航
    const dark = localStorage.getItem("useDarkKEY");
    let html= document.documentElement;
    //判断HTML标签是否有类名dark
    //当按钮为关闭时，设置根节点的className为'',当暗黑模式按钮开启时，根节点的className设置为'dark'
    dark == 'dark' ? html.className = 'dark' : html.className = '';
    // 进度条
    NProgress.start();
    NProgress.configure({ showSpinner: false })
    next()
})
 
// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to:any, from:any) => {
    NProgress.done();
    const _title = to.meta.title
    if (_title) {
        window.document.title = String(_title)
    }
})
 
// 导出默认值
export default router