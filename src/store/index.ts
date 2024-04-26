import { createStore } from "vuex";
import userInfo from "./modules/userInfo.ts";

export default createStore({
    state:{
        themes:{
            textColor:"",
            textColor_3:"",
            textColor_5:"",
            textColor_7:"",
            textColor_8:"",
            textColor_9:"",
        },
        isCollapse:false
    },
    mutations:{
        setTextColor(state:any,color:string){
            state.themes.textColor = color;
        },
        setTextColor_3(state:any,color:string){
            state.themes.textColor_3 = color;
        },
        setTextColor_5(state:any,color:string){
            state.themes.textColor_5 = color;
        },
        setTextColor_7(state:any,color:string){
            state.themes.textColor_7 = color;
        },
        setTextColor_8(state:any,color:string){
            state.themes.textColor_8 = color;
        },
        setTextColor_9(state:any,color:string){
            state.themes.textColor_9 = color;
        },
        setIsCollapse(state:any,isCollapse:boolean){
            state.isCollapse = isCollapse;
        }
    },
    modules:{
        userInfo
    }
})