import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import {routes} from './routes'

Vue.use(Router)
// 防止点击同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router =  new Router({
  routes
})

export default router
