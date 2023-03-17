/**
 * Vuex状态管理
 */
// @ts-ignore
import { createStore } from 'vuex'
import mutations from './mutations'
import storage from '@dscloud/utils/storage'

const state:object = {
    authorInfo:"" || storage.getItem("authorInfo"),
    userInfo:"" || storage.getItem("userInfo")
}
export default createStore({
    state,
    mutations
})
