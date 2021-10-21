import Vuex from 'vuex'
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
    //状态管理
    state: {
        // 放大图片路径 + 状态 + 数组
        largeImgStatus:false,
        imgList:[],
        // 标记 处理 申诉 跟进 remakrs + id
        orderState:{
            id:"",
            note:"",
            title:"",
            // 为处理的 1 || 2
            handleIndex:"",
        },
        // 用户列表
        userLists:[],
        // logo footer 的小红点
        isDot:false,
    },       
    //修改state
    mutations: {
        setImgList(state,ImgSrc){
            state.imgList.push(ImgSrc);
        },
        setUserLists(state,array){
            state.userLists = array;
        }
    },   
    //异步操作
    actions: {},    
     //计算属性
    getters:{},   
     //模块 
    modules: {}    
})
export default store