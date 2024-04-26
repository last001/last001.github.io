import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // redirect:{name:"main"},
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
    },
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索'
    },
    component: () => import('@/views/search.vue'),
  },
  {
    path: '/menu',
    name: 'main',
    meta: {
      title: 'main'
    },
    redirect:{name:"one"},
    component: () => import('@/views/main.vue'),
    children: [ // menu
      {
        path: 'one',
        name: 'one',
        meta: { title: '第一'},
        component: () => import('@/views/menu/one.vue'),
      },
      {
        path: 'two',
        name: 'two',
        meta: {title: '第二'},
        component: () => import('@/views/menu/two.vue'),
      },
    ]
  },
  // 404
  {
    path: '/notFound',
    name: 'notFound',
    component: () => import('@/views/notFound.vue'),
  },
  // 未知路由重定向
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound',
  }
]
export default routes