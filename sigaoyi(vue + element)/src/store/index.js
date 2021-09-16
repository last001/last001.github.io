import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import {
  homeStore
} from "./Homestore/store"

export default new Vuex.Store({
  //  在state与保存的数据之间添加一个三目运算
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    ordergoods: {}
  },
  mutations: {},
  actions: {},
  modules: {
    homeStore,
  },
})
