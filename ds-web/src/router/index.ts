import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from '@dscloud/utils/storage'

const routes:any = [
    {
        name:'login',
        path:'/login',
        meta:{
            title:'登录'
        },
        component:()=>import('./../views/Login.vue')
    },
    {
        path:'/framework/:path+',
        redirect: to => {
            return { name: 'home', params: { redirectPath: to.path } }
        }
    },
    {
        name: 'framework',
        path: '/framework/:id',
        meta: {
            title: '一米科技'
        },
        redirect: to => {
            return { name:'home',params:{moduleId:to.params.id} }
        }
    },
    {
        name:'home',
        path:'/',
        alias:"/home",
        meta:{
            title:'首页'
        },
        component:()=>import('./../views/framework/Home.vue'),
        children: [
            {
                name:'portal',
                path:'',
                meta:{
                    title:'门户',
                    menuAside:false
                },
                component:()=>import('../views/framework/Portal.vue')
            },
            {
                name:'comtest',
                path:'/comtest',
                meta:{
                    title:'组件测试',menuAside:false
                },
                component:()=>import('./../views/demo/ComTest.vue')
            },
        ]
    },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((transition) => {
  NProgress.start();
});

router.afterEach((transition) => {
  NProgress.done();
});

export default router;
